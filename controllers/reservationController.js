const Reservation = require('../models/Reservation');

exports.addReservation = async (req, res) => {
    try {
        const { name, email, date, guests } = req.body;
        const newReservation = new Reservation({ name, email, date, guests });
        await newReservation.save();
        res.status(201).json(newReservation);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getReservations = async (req, res) => {
    try {
        const reservations = await Reservation.find().sort({ createdAt: -1 });
        res.json(reservations);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
