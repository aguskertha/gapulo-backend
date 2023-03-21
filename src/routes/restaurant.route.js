const router = require('express').Router();
const { getAll, getOne } = require('../controllers/restaurant.controller');
const authenticate = require('../middleware/authenticate');

router.get('/:restaurantId', authenticate, getOne);
router.get('/', authenticate, getAll);

module.exports = router;