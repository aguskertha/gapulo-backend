const router = require('express').Router();
const { renderFoodPage, registerFoodPage, renderCreateFoodPage, renderEditFoodPage, updateFoodPage, deleteFood } = require('./../controllers/food-page.controller');

router.get('/', renderFoodPage);
router.get('/:foodId/edit', renderEditFoodPage);
router.post('/:foodId/edit', updateFoodPage);
router.post('/create', registerFoodPage);
router.get('/create', renderCreateFoodPage);
router.get('/:foodId/delete', deleteFood);

module.exports = router;