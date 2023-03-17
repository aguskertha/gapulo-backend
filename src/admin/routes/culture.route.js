const router = require('express').Router();
const { renderCulturePage, registerCulturePage, renderCreateCulturePage, renderEditCulturePage, updateCulturePage, deleteCulture } = require('../controllers/culture-page.controller');

router.get('/', renderCulturePage);
router.get('/:cultureId/edit', renderEditCulturePage);
router.post('/:cultureId/edit', updateCulturePage);
router.post('/create', registerCulturePage);
router.get('/create', renderCreateCulturePage);
router.get('/:cultureId/delete', deleteCulture);

module.exports = router;