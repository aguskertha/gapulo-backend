const router = require('express').Router();
const { renderVillagePage, registerVillagePage, renderCreateVillagePage, renderEditVillagePage, updateVillagePage, deleteVillage } = require('../controllers/village-page.controller');

router.get('/', renderVillagePage);
router.get('/:villageId/edit', renderEditVillagePage);
router.post('/:villageId/edit', updateVillagePage);
router.post('/create', registerVillagePage);
router.get('/create', renderCreateVillagePage);
router.get('/:villageId/delete', deleteVillage);

module.exports = router;