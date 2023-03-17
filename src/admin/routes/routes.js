const router = require('express').Router();
const dashboardRouter = require('../routes/dashboard.route')
const userRouter = require('../routes/user.route')
const foodRouter = require('../routes/food.route')
const cultureRouter = require('../routes/culture.route')
const {ensureAuthenticated} = require('../../middleware/auth');

router.use('/dashboard', ensureAuthenticated, dashboardRouter);
router.use('/foods', ensureAuthenticated, foodRouter);
router.use('/cultures',  ensureAuthenticated, cultureRouter);
router.use('/users', userRouter);

module.exports = router;