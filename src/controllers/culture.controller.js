const ObjectId = require('mongodb').ObjectId;
const Culture = require('./../models/culture.model')

const getAll = async (req, res, next) => {
    try {
        const cultures = await Culture.find().sort({createAt: -1})
        return res.json(cultures)
        
    } catch (error) {
        res.status(400).json({message: error.toString()})
    }
}

const getOne = async (req, res, next) => {
    try {
        const cultureId = req.params.cultureId
        const culture = await Culture.findOne({_id: ObjectId(cultureId)})
        if(!culture){
            throw "Culture not found!"
        }
        return res.json(culture)
    } catch (error) {
        res.status(400).json({message: error.toString()})
    }
}


module.exports = {
    getAll,
    getOne
}