const router = require('express').Router();
const { getAll, getOne } = require('../controllers/food.controller');
const authenticate = require('../middleware/authenticate');

router.get('/:foodId', authenticate, getOne);
router.get('/', authenticate, getAll);

module.exports = router;