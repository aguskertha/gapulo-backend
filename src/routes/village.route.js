const router = require('express').Router();
const { getAll, getOne } = require('../controllers/village.controller');
const authenticate = require('../middleware/authenticate');

router.get('/:villageId', authenticate, getOne);
router.get('/', authenticate, getAll);

module.exports = router;