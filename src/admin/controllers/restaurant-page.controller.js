const Restaurant = require('../../models/restaurant.model')
const {uploadFile, singleUpload} = require('../../utils/file-upload')

const registerRestaurantPage = async (req, res, next) => {
    try {
        let restaurant = {
            name : req.body.name,
            description: req.body.description,
            location: req.body.location,
            openHour: req.body.openHour,
            closeHour:  req.body.closeHour,
            lowestPrice: req.body.lowestPrice,
            highestPrice: req.body.highestPrice,
        }

        if(!req.files)
        {
            throw "Files required!"
        }

        if(req.files)
        {
            if(req.files.menuPictures)
            {
                restaurant.menuPictures = await uploadFile(req.files.menuPictures)
            }
            if(req.files.picture)
            {
                restaurant.picture = await singleUpload(req.files.picture)
            }
        }

        let foods = []
        for (let i = 1; i <= Number(req.body['foodNumber']); i++) {
            let food = req.body['food'+i]
            if(food)
            {
                foods.push(food)
            }
        }
        restaurant.foods = foods

        let drinks = []
        for (let i = 1; i <= Number(req.body['drinkNumber']); i++) {
            let drink = req.body['drink'+i]
            if(drink)
            {
                drinks.push(drink)
            }
        }
        restaurant.drinks = drinks

        const newRestaurant = new Restaurant(restaurant)
        newRestaurant.save()
        req.flash('success_msg', 'Successfully created Restaurant!');
        res.redirect('/admin/restaurants')
        
    } catch (error) {
        req.flash('error_msg', 'Failed: '+error);
        res.redirect('/admin/restaurants/create')
    }
}
const updateRestaurantPage = async (req, res, next) => {
    try {
        const restaurantId = req.params.restaurantId
        const restaurant = await Restaurant.findById(restaurantId)
        if(!restaurant)
        {
            throw "Restaurant not found!"
        }
        let newRestaurant = {
            _id: restaurantId,
            name : req.body.name,
            description: req.body.description,
            location: req.body.location,
            openHour: req.body.openHour,
            closeHour:  req.body.closeHour,
            lowestPrice: req.body.lowestPrice,
            highestPrice: req.body.highestPrice,
        }

        if(req.files)
        {
            if(req.files.menuPictures)
            {
                newRestaurant.menuPictures = await uploadFile(req.files.menuPictures)
            }
            if(req.files.picture)
            {
                newRestaurant.picture = await singleUpload(req.files.picture)
            }
        }

        let foods = []
        for (let i = 1; i <= Number(req.body['foodNumber']); i++) {
            let food = req.body['food'+i]
            if(food)
            {
                foods.push(food)
            }
        }
        newRestaurant.foods = foods

        let drinks = []
        for (let i = 1; i <= Number(req.body['drinkNumber']); i++) {
            let drink = req.body['drink'+i]
            if(drink)
            {
                drinks.push(drink)
            }
        }
        newRestaurant.drinks = drinks

        await Restaurant.updateOne(
            {_id: restaurantId},
            {
                $set: newRestaurant
            }
        )
        req.flash('success_msg', 'Successfully updated Restaurant!');
        res.redirect('/admin/restaurants')
    } catch (error) {
        req.flash('error_msg', 'Failed: '+error);
        res.redirect('/admin/restaurants')
    }
}

const renderCreateRestaurantPage = async (req, res, next) => {
    try {
        res.render('Restaurant/create', {
            layout: 'layouts/main-layout',
            user: req.user
        })
    } catch (error) {
        
    }
}
const renderEditRestaurantPage = async (req, res, next) => {
    try {
        const restaurantId = req.params.restaurantId
        const restaurant = await Restaurant.findById(restaurantId)
        if(!restaurant)
        {
            throw "Restaurant not found!"
        }

        res.render('Restaurant/create', {
            layout: 'layouts/main-layout',
            user: req.user,
            restaurant: restaurant,
            APP_HOST: process.env.APP_HOST
        })
    } catch (error) {
        
    }
}

const renderRestaurantPage = async (req, res, next) => {
    try {
        const restaurants = await Restaurant.find().sort({createdAt: -1})
        res.render('Restaurant/restaurant-page', {
            layout: 'layouts/main-layout',
            user: req.user,
            restaurants: restaurants
        })
    } catch (error) {
        
    }
}

const deleteRestaurant = async (req, res, next) => {
    try {
        const restaurantId = req.params.restaurantId
        console.log(restaurantId)
        const restaurant = await Restaurant.findById(restaurantId)
        if(!restaurant)
        {
            throw "Restaurant not found!"
        }

        await Restaurant.findByIdAndDelete(restaurantId)
        req.flash('success_msg', 'Successfully deleted Restaurant!');
        res.redirect('/admin/restaurants')
        
    } catch (error) {
        req.flash('error_msg', 'Failed: '+error);
        res.redirect('/admin/restaurants')
    }
}

module.exports = {
    renderRestaurantPage,
    registerRestaurantPage,
    renderCreateRestaurantPage,
    renderEditRestaurantPage,
    updateRestaurantPage,
    deleteRestaurant
}