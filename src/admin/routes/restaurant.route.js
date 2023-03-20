const router = require('express').Router();
const { renderRestaurantPage, registerRestaurantPage, renderCreateRestaurantPage, renderEditRestaurantPage, updateRestaurantPage, deleteRestaurant } = require('../controllers/restaurant-page.controller');

router.get('/', renderRestaurantPage);
router.get('/:restaurantId/edit', renderEditRestaurantPage);
router.post('/:restaurantId/edit', updateRestaurantPage);
router.post('/create', registerRestaurantPage);
router.get('/create', renderCreateRestaurantPage);
router.get('/:restaurantId/delete', deleteRestaurant);

module.exports = router;