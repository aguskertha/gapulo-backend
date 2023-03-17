const fs = require('fs');
const sharp = require('sharp');
const moment = require('moment');

const uploadFile = async (req, res, next) => {
    try {
        if(req.files.files)
        {
            fs.access("./public/picture/", (error) => {
                if (error) {
                    fs.mkdirSync("./public/picture/");
                }
            });

            const files = req.files.files
            if(typeof files.length != 'undefined' )
            {

                return await multipleUpload(files)
            }
            else
            {
                return await singleUpload(files)
            }
        }

        throw "Files not found!"
    } catch (error) {
        res.status(400).json({message: error.toString()})
    }
}

const singleUpload = async (files) => {
    const buffer = files.data
    const originalname = files.name
    const fileName = originalname.replace(/\s/g, '');
    const filterFileName = fileName.replace(/\.[^/.]+$/, "");
    const date = moment().format('YYYY-MM-DD-hh-mm-ss');
    const ref = date+'-'+filterFileName.toLowerCase()+'.webp';
    await sharp(buffer)
        .webp({ quality: 20 })
        .toFile("./public/picture/" + ref);
    url = `/public/picture/${ref}`;

    return url
}

const multipleUpload = async (files) => {
    let urls = []

    await Promise.all(

        files.map(async (file) => {
            urls.push(await singleUpload(file))
        })
    );

    return urls

}

module.exports = {
    uploadFile
}