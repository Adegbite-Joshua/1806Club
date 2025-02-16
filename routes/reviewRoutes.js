const express = require('express');
const { createReview, getReviews, deleteReview } = require('../controllers/reviewController');

const router = express.Router();

router.post('/', createReview);
router.get('/', getReviews);
router.delete('/:id', deleteReview);

module.exports = router;
