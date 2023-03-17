const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const moment = require('moment');

const villageSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    rangeHour: {
        type: String,
        required: true
    },
    pictures: [
        {
            type: String,
            required: true
        }
    ],
    link: {
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
    facility: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    website: {
        type: String,
        required: true
    },
    
    createdAt: {
        type: String
    },
    updatedAt: {
        type: String
    }
});

villageSchema.pre('save', function(next){
    this.createdAt = moment().format();
    this.updatedAt = moment().format();
    next();
});

villageSchema.pre('updateOne', function(next){
    this.update({},{ $set: { updatedAt: moment().format() } });
    next();
});

const village = mongoose.model('village', villageSchema);

module.exports = village;