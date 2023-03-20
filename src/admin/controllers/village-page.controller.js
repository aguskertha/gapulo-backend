const Village = require('../../models/village.model')
const {uploadFile} = require('../../utils/file-upload')

const registerVillagePage = async (req, res, next) => {
    try {
        let village = {
            name : req.body.name,
            rangeHour : req.body.rangeHour,
            link : req.body.link,
            description: req.body.description,
            address: req.body.address,
            location: req.body.location,
            facility: req.body.facility,
            phone:  req.body.phone,
            website: req.body.website,
        }

        if(!req.files)
        {
            throw "Files required!"
        }

        village.pictures = await uploadFile(req, res, next)

        const newVillage = new Village(village)
        newVillage.save()
        req.flash('success_msg', 'Successfully created Village!');
        res.redirect('/admin/villages')
        
    } catch (error) {
        req.flash('error_msg', 'Failed: '+error);
        res.redirect('/admin/villages/create')
    }
}
const updateVillagePage = async (req, res, next) => {
    try {
        const villageId = req.params.villageId
        const village = await Village.findById(villageId)
        if(!village)
        {
            throw "Village not found!"
        }
        let newVillage = {
            _id: villageId,
            name : req.body.name,
            rangeHour : req.body.rangeHour,
            link : req.body.link,
            description: req.body.description,
            address: req.body.address,
            location: req.body.location,
            facility: req.body.facility,
            phone:  req.body.phone,
            website: req.body.website,
        }

        if(req.files)
        {
            newVillage.pictures = await uploadFile(req, res, next)
        }

        await Village.updateOne(
            {_id: villageId},
            {
                $set: newVillage
            }
        )
        req.flash('success_msg', 'Successfully updated Village!');
        res.redirect('/admin/villages')
    } catch (error) {
        req.flash('error_msg', 'Failed: '+error);
        res.redirect('/admin/villages')
    }
}

const renderCreateVillagePage = async (req, res, next) => {
    try {
        res.render('Village/create', {
            layout: 'layouts/main-layout',
            user: req.user
        })
    } catch (error) {
        
    }
}
const renderEditVillagePage = async (req, res, next) => {
    try {
        const villageId = req.params.villageId
        const village = await Village.findById(villageId)
        if(!village)
        {
            throw "Village not found!"
        }

        res.render('Village/create', {
            layout: 'layouts/main-layout',
            user: req.user,
            village: village,
            APP_HOST: process.env.APP_HOST
        })
    } catch (error) {
        
    }
}

const renderVillagePage = async (req, res, next) => {
    try {
        const villages = await Village.find().sort({createAt: -1})
        res.render('Village/village-page', {
            layout: 'layouts/main-layout',
            user: req.user,
            villages: villages
        })
    } catch (error) {
        
    }
}

const deleteVillage = async (req, res, next) => {
    try {
        const villageId = req.params.villageId
        const village = await Village.findById(villageId)
        if(!village)
        {
            throw "Village not found!"
        }

        await Village.findByIdAndDelete(villageId)
        req.flash('success_msg', 'Successfully deleted Village!');
        res.redirect('/admin/villages')
        
    } catch (error) {
        req.flash('error_msg', 'Failed: '+error);
        res.redirect('/admin/villages')
    }
}

module.exports = {
    renderVillagePage,
    registerVillagePage,
    renderCreateVillagePage,
    renderEditVillagePage,
    updateVillagePage,
    deleteVillage
}