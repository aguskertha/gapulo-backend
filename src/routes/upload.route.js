const router = require('express').Router();
const { files } = require('../controllers/upload.controller');
const authenticate = require('../middleware/authenticate');

router.post('/files', authenticate, files );

module.exports = router;