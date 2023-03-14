const User = require('../models/user.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const validator = require('validator');
const ObjectID = require('mongodb').ObjectID;

const register = async (req, res, next) => {
    try {
        const {name, email, password, password2} = req.body;
        let errors = [];
        if(!name || !email || !password || !password2){
            errors.push({message: 'Please fill in all fields!'});
        }
        
        if(password !== password2){
            errors.push({message: 'Password not matched!'});
        }
        
        if(password.length < 6){
            errors.push({message: 'Password should be at least 6 characters!'});
        }

        if(errors.length > 0 ){
            return res.status(400).json(errors);
        }
        else{
            const user = await User.findOne({email: email});
            if(user){
                errors.push({message: 'User already exist!'});
                return res.status(400).json(errors);
            }
            else{
                const newUser = new User({name, email, password});
                bcrypt.hash(password, 10, async (err, hashedPassword) => {
                    if(err){
                        errors.push({message: err});
                        return res.status(400).json(errors);
                    }
                    else{
                        newUser.password = hashedPassword;
                        await newUser.save();
                        res.json({message: 'User already created!'});
                    }
                })
            }
        }

    } catch (error) {
        res.status(400).json({message: error.toString()})
    }
}

const getUsers = async (req, res, next) => {

    try {
        const users = await User.find().sort({createdAt : -1})
        res.json(users)
    } catch (error) {
        res.status(400).json({message: error.toString()})
    }
}

const editPassword = async (req,res,next) => {
    try {
        const userId = req.body.userId;
        const newPassword = req.body.newPassword;
        const user = await User.findOne({_id: ObjectID(userId)});
        bcrypt.hash(newPassword, 10, (err, hashedPassword) => {
            if(err){
                res.json({message: err});
                return false;
            }
            User.updateOne(
                { _id: ObjectID(user._id)},
                {
                    $set: {
                        password: hashedPassword
                    }
                }
            )
            .then((result)=>{
                res.json({message: 'Password changed successfully'});
            })
            .catch((err) => res.status(400).json({message: 'Error: '+err}));
        });
    } catch (error) {
        res.status(400).json({message: error.toString()})
    }
    
}

const login = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;

    if(!validator.isEmail(email)){
        res.status(400).json({
            message: 'Invalid email'
        })
        return false;
    }

    User.findOne({email: email})
        .then((user) => {
            if(user){
                bcrypt.compare(password, user.password, (err, result) => {
                    if(err){
                        res.json({message: 'Error: '+err});
                    }
                    if(result){
                        const token = generateToken(user);
                        res.json({userId: user._id, message: 'Login successfully', token});
                    }
                    else{
                        res.json({message: 'Password does not matched!'});
                    }
                })
            }
            else{
                res.json({message: 'No user found!'});
            }
        });
}


const newToken = async (req,res,next) => {
    const refreshToken = req.body.refreshToken;
    const userId = req.body.userId;
    const user = await User.findOne({_id: ObjectID(userId)});
    if(user.refreshToken == '' || refreshToken == ''){
        res.status(400).json({message: 'Login first'});
        return false;
    }
    if(refreshToken == user.refreshToken){
        jwt.verify(refreshToken, process.env.SECRET_KEY, (err, user) => {
            if(err){
                res.status(400).json({message: 'Invalid refresh token'});
                return false;
            }
            const token = generateToken(user);
            res.json({token});
        })
    }
    else{
        return res.status(400).json({message: 'Invalid refresh token'})
    }
}

const generateToken = (user) => {
    return jwt.sign({userId: user._id}, process.env.SECRET_KEY, 
        {expiresIn: '3600s'}
    );
}

const logout = async (req, res, next) => {
    // const userId = req.body.userId;
    // const user = await User.findOne({_id: ObjectID(userId)});
    // User.updateOne(
    //     { _id: ObjectID(userId)},
    //     {
    //         $set: {
    //             refreshToken: ''
    //         }
    //     }
    // )
    // .then((result)=>{
    //     res.json({message: 'Logout successfully'});
    // })
    // .catch((err) => res.status(400).json({message: 'Error: '+err}));

}

module.exports = {
    register,
    getUsers,
    login,
    logout,
    newToken,
    editPassword
}