const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const moment = require('moment');

const foodSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    history: {
        type: String,
        required: true
    },
    historyPictures: [
        {
            type: String,
            required: true
        }
    ],
    culturePictures: [
        {
            cultureId: {
                type: String,
                required: true
            },
            picture: {
                type: String,
                required: true
            },
        }
    ],
    link: {
        type: String,
        required: true
    },
    ingredients: [
        {
            name : {
                type: String,
            },
            items : [
                {
                    type: String,
                }
            ]
        }
    ],
    howToMakes: [
        {
            type: String,    
        }
    ],
    howToMakePictures: [
        {
            type: String,    
        }
    ],
    nutritions: [
        {
            type: String,    
        }
    ],
    createdAt: {
        type: String
    },
    updatedAt: {
        type: String
    }
});

foodSchema.pre('save', function(next){
    this.createdAt = moment().format();
    this.updatedAt = moment().format();
    next();
});

foodSchema.pre('updateOne', function(next){
    this.update({},{ $set: { updatedAt: moment().format() } });
    next();
});

const food = mongoose.model('food', foodSchema);

module.exports = food;