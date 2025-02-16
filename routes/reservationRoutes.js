const express = require('express');
const { addReservation, getReservations } = require('../controllers/reservationController');

const router = express.Router();

router.post('/', addReservation);
router.get('/', getReservations);

module.exports = router;
