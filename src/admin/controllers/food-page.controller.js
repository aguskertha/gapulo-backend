const {uploadFile, uploadHistoryPicture} = require('../../utils/file-upload')

const Food = require('../../models/food.model')
const Culture = require('../../models/culture.model')
const ObjectId = require('mongodb').ObjectId;

const registerFoodPage = async (req, res, next) => {
    try {
        let food = {
            name : req.body.name,
            link : req.body.link,
            description: req.body.description,
            history : req.body.history,
        }
        let ingredients = []
        for (let i = 1; i <= Number(req.body.ingredientTypeNumber); i++) {
            let ingredient = {
                name : req.body['ingredient'+i]
            }
            if(ingredient.name)
            {
                let items = []
                for (let j = 1; j <= Number(req.body['itemNumber'+i]); j++) {
                    let item = req.body['item'+i+j]
                    if(item)
                    {
                        items.push(item)
                    }
                }
                ingredient.items = items
                ingredients.push(ingredient)
            }
        }
        food.ingredients = ingredients;

        let howToMakes = []
        for (let i = 1; i <= Number(req.body['howToMakeNumber']); i++) {
            let howToMake = req.body['howToMake'+i]
            if(howToMake)
            {
                howToMakes.push(howToMake)
            }
        }
        food.howToMakes = howToMakes

        let nutritions = []
        for (let i = 1; i <= Number(req.body['nutritionNumber']); i++) {
            let nutrition = req.body['nutrition'+i]
            if(nutrition)
            {
                nutritions.push(nutrition)
            }
        }
        food.nutritions = nutritions
        console.log(req.files)
        if(req.files)
        {
            if(req.files.historyPictures)
            {
                food.historyPictures = await uploadFile(req.files.historyPictures)
                console.log(food.historyPictures)
            }
            if(req.files.howToMakePictures)
            {
                food.howToMakePictures = await uploadFile(req.files.howToMakePictures)
                console.log(food.howToMakePictures)
            }
            if(req.files.culturePictures)
            {
                let cultures = []
                const culturePictures = await uploadFile(req.files.culturePictures)
            
                if(Array.isArray(req.body.selectCultures))
                {
                    for (let i = 0; i < req.body.selectCultures.length; i++) {
                        const selectCulture = req.body.selectCultures[i]
                        cultures.push({
                            cultureId: selectCulture,
                            picture: culturePictures[i]
                        })
                    }
                }
                else
                {
                    cultures.push({
                        cultureId: req.body.selectCultures,
                        picture: culturePictures
                    })
                }
                
                food.culturePictures = cultures
            }
        }
        const newFood = new Food(food)
        newFood.save()
        req.flash('success_msg', 'Successfully created Food!');
        res.redirect('/admin/foods')

    } catch (error) {
        res.render('Food/create', {
            layout: 'layouts/main-layout',
            user: req.user,
            cultures: await Culture.find({}, {name: 1}).sort({createdAt: -1})
        })
    }
}
const updateFoodPage = async (req, res, next) => {
    try {

        const foodId = req.params.foodId
        const food = await Food.findById(foodId)
        if(!food)
        {
            throw "Food not found!"
        }

        let newFood = {
            _id: foodId,
            name : req.body.name,
            link : req.body.link,
            description: req.body.description,
            history : req.body.history,
        }
        let ingredients = []
        for (let i = 1; i <= Number(req.body.ingredientTypeNumber); i++) {
            let ingredient = {
                name : req.body['ingredient'+i]
            }
            if(ingredient.name)
            {
                let items = []
                for (let j = 1; j <= Number(req.body['itemNumber'+i]); j++) {
                    let item = req.body['item'+i+j]
                    if(item)
                    {
                        items.push(item)
                    }
                }
                ingredient.items = items
                ingredients.push(ingredient)
            }
        }
        newFood.ingredients = ingredients;

        let howToMakes = []
        for (let i = 1; i <= Number(req.body['howToMakeNumber']); i++) {
            let howToMake = req.body['howToMake'+i]
            if(howToMake)
            {
                howToMakes.push(howToMake)
            }
        }
        newFood.howToMakes = howToMakes

        let nutritions = []
        for (let i = 1; i <= Number(req.body['nutritionNumber']); i++) {
            let nutrition = req.body['nutrition'+i]
            if(nutrition)
            {
                nutritions.push(nutrition)
            }
        }
        newFood.nutritions = nutritions

        if(req.files)
        {
            if(req.files.historyPictures)
            {
                newFood.historyPictures = await uploadFile(req.files.historyPictures)
            }
            if(req.files.howToMakePictures)
            {
                newFood.howToMakePictures = await uploadFile(req.files.howToMakePictures)
            }
            if(req.files.culturePictures)
            {
                let cultures = []
                const culturePictures = await uploadFile(req.files.culturePictures)
            
                if(Array.isArray(req.body.selectCultures))
                {
                    for (let i = 0; i < req.body.selectCultures.length; i++) {
                        const selectCulture = req.body.selectCultures[i]
                        cultures.push({
                            cultureId: selectCulture,
                            picture: culturePictures[i]
                        })
                    }
                }
                else
                {
                    cultures.push({
                        cultureId: req.body.selectCultures,
                        picture: culturePictures
                    })
                }

                newFood.culturePictures = cultures
            }
        }

        await Food.updateOne(
            {_id: foodId},
            {
                $set: newFood
            }
        )
        req.flash('success_msg', 'Successfully updated Food!');
        res.redirect('/admin/foods')
        
    } catch (error) {
        res.render('Food/create', {
            layout: 'layouts/main-layout',
            user: req.user,
            cultures: await Culture.find({}, {name: 1}).sort({createdAt: -1})
        })
    }
}

const renderCreateFoodPage = async (req, res, next) => {
    try {

        res.render('Food/create', {
            layout: 'layouts/main-layout',
            user: req.user,
            cultures: await Culture.find({}, {name: 1}).sort({createdAt: -1})
        })
    } catch (error) {
        
    }
}

const renderEditFoodPage = async (req, res, next) => {
    try {
        const foodId = req.params.foodId
        const food = await Food.findById(foodId)
        if(!food) throw "Food not found!"

        await Promise.all(
            food.culturePictures.map(async (culturePicture, index) => {
                const culture = await Culture.findById(culturePicture.cultureId)
                food.culturePictures[index].culture = culture
            })
        );

        res.render('Food/create', {
            layout: 'layouts/main-layout',
            user: req.user,
            food,
            APP_HOST: process.env.APP_HOST,
            cultures : await Culture.find({}, {name: 1}).sort({createdAt: -1}),
        })
    } catch (error) {
        
    }
}

const renderFoodPage = async (req, res, next) => {
    try {
        const foods = await Food.find({}, {name: 1}).sort({createdAt: -1})
        res.render('Food/food-page', {
            layout: 'layouts/main-layout',
            user: req.user,
            foods: foods
        })
    } catch (error) {
        
    }
}


const deleteFood = async (req, res, next) => {
    try {
        const foodId = req.params.foodId
        const food = await Food.findById(foodId)
        if(!food)
        {
            throw "Food not found!"
        }

        await Food.findByIdAndDelete(foodId)
        req.flash('success_msg', 'Successfully deleted Food!');
        res.redirect('/admin/foods')
        
    } catch (error) {
        req.flash('error_msg', 'Failed: '+error);
        res.redirect('/admin/foods')
    }
}


module.exports = {
    renderFoodPage,
    registerFoodPage,
    renderCreateFoodPage,
    renderEditFoodPage,
    updateFoodPage,
    deleteFood
}