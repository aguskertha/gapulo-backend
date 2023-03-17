const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const moment = require('moment');

const cultureSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    link: {
        type: String,
        required: true
    },
    foodPictures: [
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

cultureSchema.pre('save', function(next){
    this.createdAt = moment().format();
    this.updatedAt = moment().format();
    next();
});

cultureSchema.pre('updateOne', function(next){
    this.update({},{ $set: { updatedAt: moment().format() } });
    next();
});

const culture = mongoose.model('culture', cultureSchema);

module.exports = culture;