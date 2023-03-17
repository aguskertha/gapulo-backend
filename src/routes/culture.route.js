const router = require('express').Router();
const { GetAll, GetOne } = require('../controllers/culture.controller');
const authenticate = require('../middleware/authenticate');

router.get('/:cultureId', authenticate, GetOne);
router.get('/', authenticate, GetAll);

module.exports = router;