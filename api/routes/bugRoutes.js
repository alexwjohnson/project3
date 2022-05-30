const express = require('express');
const router = express.Router();
const { getBugs, createBug, updateBug, deleteBug } = require('../controllers/bugController');
const { protect } = require('../middleware/authMiddleware');
//read all and create   - DRY
console.log('bugRoutes.js createBug...',createBug)
router.route('/').get(protect, getBugs).post(protect, createBug);
//update and delete     - DRY
router.route('/:id').put(protect, updateBug).delete(protect, deleteBug);

module.exports = router;