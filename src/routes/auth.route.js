const router = require('express').Router();
const authController = require('../controllers/auth.controller');
const authenticate = require('../middleware/authenticate');
router.get('/', authenticate, authController.getUsers);
router.delete('/logout', authenticate, authController.logout);
router.post('/edit/password', authenticate, authController.editPassword);
router.post('/register', authController.register);
router.post('/token', authController.newToken);
router.post('/login', authController.login);

module.exports = router;