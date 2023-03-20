const router = require('express').Router();
const { getAll, getOne } = require('../controllers/culture.controller');
const authenticate = require('../middleware/authenticate');

router.get('/:cultureId', authenticate, getOne);
router.get('/', authenticate, getAll);

module.exports = router;