const ObjectId = require('mongodb').ObjectId;
const Restaurant = require('../models/restaurant.model')

const getAll = async (req, res, next) => {
    try {
        const restaurants = await Restaurant.find().sort({createAt: -1})
        return res.json(restaurants)
        
    } catch (error) {
        res.status(400).json({message: error.toString()})
    }
}

const getOne = async (req, res, next) => {
    try {
        const restaurantId = req.params.restaurantId
        const restaurant = await Restaurant.findOne({_id: ObjectId(restaurantId)})
        if(!restaurant){
            throw "Restaurant not found!"
        }
        return res.json(restaurant)
    } catch (error) {
        res.status(400).json({message: error.toString()})
    }
}


module.exports = {
    getAll,
    getOne
}