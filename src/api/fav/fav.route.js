const express = require('express');
const { list, update, create, destroy, show } = require('./fav.controller');
const { authenticate } = require('../middlewares/auth');

const router = express.Router();

router.post('/', authenticate, create);
router.get('/', authenticate, list);
router.get('/:favId', authenticate, show);
router.put('/:favId', authenticate, update);
router.delete('/:favId', authenticate, destroy);

module.exports = router;
