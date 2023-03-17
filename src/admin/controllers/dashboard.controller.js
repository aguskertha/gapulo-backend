

const getDashboards = async (req, res, next) => {
    try {
        
        console.log(req.session)
        
        res.render('./Dashboard/dashboard', {
            layout: 'layouts/main-layout',
            user: req.user
        })
    } catch (error) {
        res.status(400).json({message: error.toString()})
    }
}


module.exports = {
    getDashboards,
}