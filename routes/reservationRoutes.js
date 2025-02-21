const express = require('express');
const { addReservation, getReservations, deleteReservation } = require('../controllers/reservationController');

const router = express.Router();

router.post('/', addReservation);
router.get('/', getReservations);
router.delete("/:id", deleteReservation);


module.exports = router;
