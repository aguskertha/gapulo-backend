const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const moment = require('moment');

const restaurantSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    picture: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    openHour: {
        type: String,
        required: true
    },
    closeHour: {
        type: String,
        required: true
    },
    lowestPrice: {
        type: Number,
        required: true
    },
    highestPrice: {
        type: Number,
        required: true
    },
    menuPictures: [
        {
            type: String,
            required: true
        }
    ],
    foods: [
        {
            type: String,
            required: true
        }
    ],
    drinks: [
        {
            type: String,
            required: true
        }
    ],
    
    createdAt: {
        type: String
    },
    updatedAt: {
        type: String
    }
});

restaurantSchema.pre('save', function(next){
    this.createdAt = moment().format();
    this.updatedAt = moment().format();
    next();
});

restaurantSchema.pre('updateOne', function(next){
    this.update({},{ $set: { updatedAt: moment().format() } });
    next();
});

const restaurant = mongoose.model('restaurant', restaurantSchema);

module.exports = restaurant;