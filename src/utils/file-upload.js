const fs = require('fs');
const sharp = require('sharp');
const moment = require('moment');
var ObjectID = require('mongodb').ObjectID;

const uploadFile = async (files) => {
    try {
        if(files)
        {
            fs.access("./public/picture/", (error) => {
                if (error) {
                    fs.mkdirSync("./public/picture/");
                }
            });

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
        throw error
    }
}

const singleUpload = async (files) => {
    const buffer = files.data
    const originalname = files.name
    const fileName = originalname.replace(/\s/g, '');
    const filterFileName = fileName.replace(/\.[^/.]+$/, "");
    const date = moment().format('YYYY-MM-DD-hh-mm-ss');
    const ref = date+'-'+filterFileName.toLowerCase()+new ObjectID().toString()+'.webp';
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
    uploadFile,
    singleUpload
}