const router = require('express').Router();
const { getAll, getOne, create } = require('../controllers/restaurant.controller');
const authenticate = require('../middleware/authenticate');

router.get('/:restaurantId', authenticate, getOne);
router.get('/', authenticate, getAll);
router.post('/', authenticate, create);

module.exports = router;