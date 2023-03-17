const Culture = require('../../models/culture.model')
const {uploadFile} = require('../../utils/file-upload')

const registerCulturePage = async (req, res, next) => {
    try {
        let culture = {
            name : req.body.name,
            link : req.body.link,
            description: req.body.description,
        }

        if(!req.files)
        {
            throw "Files required!"
        }

        culture.foodPictures = await uploadFile(req, res, next)

        const newCulture = new Culture(culture)
        newCulture.save()
        req.flash('success_msg', 'Successfully created Culture!');
        res.redirect('/admin/cultures')
        
    } catch (error) {
        req.flash('error_msg', 'Failed: '+error);
        res.redirect('/admin/cultures/create')
    }
}
const updateCulturePage = async (req, res, next) => {
    try {
        const cultureId = req.params.cultureId
        const culture = await Culture.findById(cultureId)
        if(!culture)
        {
            throw "Culture not found!"
        }
        let newCulture = {
            _id: cultureId,
            name : req.body.name,
            link : req.body.link,
            description: req.body.description
        }

        if(req.files)
        {
            newCulture.foodPictures = await uploadFile(req, res, next)
        }

        await Culture.updateOne(
            {_id: cultureId},
            {
                $set: newCulture
            }
        )
        req.flash('success_msg', 'Successfully updated Culture!');
        res.redirect('/admin/cultures')
    } catch (error) {
        req.flash('error_msg', 'Failed: '+error);
        res.redirect('/admin/cultures')
    }
}

const renderCreateCulturePage = async (req, res, next) => {
    try {
        res.render('Culture/create', {
            layout: 'layouts/main-layout',
            user: req.user
        })
    } catch (error) {
        
    }
}
const renderEditCulturePage = async (req, res, next) => {
    try {
        const cultureId = req.params.cultureId
        const culture = await Culture.findById(cultureId)
        if(!culture)
        {
            throw "Culture not found!"
        }

        res.render('Culture/create', {
            layout: 'layouts/main-layout',
            user: req.user,
            culture: culture,
            APP_HOST: process.env.APP_HOST
        })
    } catch (error) {
        
    }
}

const renderCulturePage = async (req, res, next) => {
    try {
        const cultures = await Culture.find().sort({createAt: -1})
        res.render('Culture/culture-page', {
            layout: 'layouts/main-layout',
            user: req.user,
            cultures: cultures
        })
    } catch (error) {
        
    }
}

const deleteCulture = async (req, res, next) => {
    try {
        const cultureId = req.params.cultureId
        const culture = await Culture.findById(cultureId)
        if(!culture)
        {
            throw "Culture not found!"
        }

        await Culture.findByIdAndDelete(cultureId)
        req.flash('success_msg', 'Successfully deleted Culture!');
        res.redirect('/admin/cultures')
        
    } catch (error) {
        req.flash('error_msg', 'Failed: '+error);
        res.redirect('/admin/cultures')
    }
}

module.exports = {
    renderCulturePage,
    registerCulturePage,
    renderCreateCulturePage,
    renderEditCulturePage,
    updateCulturePage,
    deleteCulture
}