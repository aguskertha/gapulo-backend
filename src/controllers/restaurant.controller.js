const ObjectId = require('mongodb').ObjectId;
const Restaurant = require('../models/restaurant.model')
const {uploadFile} = require('../utils/file-upload')

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

const create = async (req, res, next) => {
    try {
        const {name, description, location, openHour, closeHour, lowestPrice, highestPrice, foods, drinks, menuPictures} = req.body
        if(!name) throw "Name required!"
        if(!description) throw "Description required!"
        if(!location) throw "Location is required!"
        if(!openHour) throw "Open Hour is required!"
        if(!closeHour) throw "Close Hour is required!"
        if(!lowestPrice) throw "Lowest Price is required!"
        if(!highestPrice) throw "Highest Price is required!"
        if(!foods) throw "Foods is required!"
        if(!drinks) throw "Drinks is required!"
        if(!menuPictures) throw "Menu Pictures is required!"

        let restaurant = {name, description, location, openHour, closeHour, lowestPrice, highestPrice, foods, drinks, menuPictures}

        const newRestaurant = new Restaurant(restaurant)
        newRestaurant.save()

        return res.json({message: "Successfully created Restaurant!"})

    } catch (error) {
        res.status(400).json({message: error.toString()})
    }
}


module.exports = {
    getAll,
    getOne,
    create
}