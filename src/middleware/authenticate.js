const jwt = require('jsonwebtoken');

const authenticate = (req,res,next) => {
    try{
        const token = req.headers.authorization.split(' ')[1];
        const decode = jwt.verify(token, process.env.SECRET_KEY);

        req.user = decode;
        req.token = token;
        next();
    }
    catch(err){
        res.status(201).json({message: 'Authentication Failed!'})
    }
}

module.exports = authenticate;