const {uploadFile} = require('../utils/file-upload')

const files = async (req, res, next ) => {
    try {
        if(!req.files)
        {
            throw "Files not found!"
        }
        if(!req.files.files)
        {
            throw "Invalid files name 'files'"
        }
        const urls =  await uploadFile(req.files.files)
        res.json(urls)
    } catch (error) {
        res.status(400).json({message: error.toString()})
    }
}

module.exports = {
    files
}