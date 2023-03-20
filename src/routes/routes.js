const router = require('express').Router();
const authRouter = require('./auth.route')
const cultureRouter = require('./culture.route')
const villageRouter = require('./village.route')

router.use('/auth', authRouter);
router.use('/cultures', cultureRouter);
router.use('/villages', villageRouter);

module.exports = router;