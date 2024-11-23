const express = require('express');
const router = express.Router();

const branchControllers = require('../controllers/branchController');

router.post('/change-branch', branchControllers.postBranch);

module.exports = router;