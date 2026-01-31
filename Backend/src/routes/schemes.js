const express = require('express');
const router = express.Router();
const { listSchemes } = require('../controllers/schemeController');

router.get('/', listSchemes);

module.exports = router;
