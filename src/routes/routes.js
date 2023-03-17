const router = require('express').Router();
const authRouter = require('./auth.route')
const cultureRouter = require('./culture.route')

router.use('/auth', authRouter);
router.use('/culture', cultureRouter);

module.exports = router;