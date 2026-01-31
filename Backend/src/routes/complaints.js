const express = require('express');
const router = express.Router();
const { createComplaint, listComplaints } = require('../controllers/complaintController');

router.post('/', createComplaint);
router.get('/', listComplaints);

module.exports = router;
