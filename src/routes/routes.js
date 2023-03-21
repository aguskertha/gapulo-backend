const router = require('express').Router();
const authRouter = require('./auth.route')
const cultureRouter = require('./culture.route')
const foodRouter = require('./food.route')
const restaurantRouter = require('./restaurant.route')
const villageRouter = require('./village.route')
const uploadRouter = require('./upload.route')

router.use('/auth', authRouter);
router.use('/cultures', cultureRouter);
router.use('/villages', villageRouter);
router.use('/foods', foodRouter);
router.use('/restaurants', restaurantRouter);
router.use('/uploads', uploadRouter);

module.exports = router;