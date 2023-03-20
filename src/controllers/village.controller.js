const ObjectId = require('mongodb').ObjectId;
const Village = require('../models/village.model')

const getAll = async (req, res, next) => {
    try {
        const villages = await Village.find().sort({createAt: -1})
        return res.json(villages)
        
    } catch (error) {
        res.status(400).json({message: error.toString()})
    }
}

const getOne = async (req, res, next) => {
    try {
        const villageId = req.params.villageId
        const village = await Village.findOne({_id: ObjectId(villageId)})
        if(!village){
            throw "Village not found!"
        }
        return res.json(village)
    } catch (error) {
        res.status(400).json({message: error.toString()})
    }
}


module.exports = {
    getAll,
    getOne
}