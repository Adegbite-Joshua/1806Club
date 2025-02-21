const Reservation = require('../models/Reservation');

exports.addReservation = async (req, res) => {
    try {
        console.log(req.body);
        
        const { name, email, date, guests, tables } = req.body;
        const newReservation = new Reservation({ name, email, date, guests, tables });
        await newReservation.save();
        res.status(201).json(newReservation);
    } catch (err) {
        console.log(err);
        
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

exports.deleteReservation = async (req, res) => {
    try {
        const { id } = req.params;
        const reservation = await Reservation.findByIdAndDelete(id);

        if (!reservation) {
            return res.status(404).json({ message: "Reservation not found" });
        }

        res.json({ message: "Reservation deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
