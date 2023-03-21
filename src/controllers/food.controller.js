const ObjectId = require('mongodb').ObjectId;
const Food = require('../models/food.model')

const getAll = async (req, res, next) => {
    try {
        const foods = await Food.find().sort({createAt: -1})
        return res.json(foods)
        
    } catch (error) {
        res.status(400).json({message: error.toString()})
    }
}

const getOne = async (req, res, next) => {
    try {
        const foodId = req.params.foodId
        const food = await Food.findOne({_id: ObjectId(foodId)})
        if(!food){
            throw "Food not found!"
        }
        return res.json(food)
    } catch (error) {
        res.status(400).json({message: error.toString()})
    }
}


module.exports = {
    getAll,
    getOne
}