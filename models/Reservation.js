const mongoose = require('mongoose');

const ReservationSchema = new mongoose.Schema({
    // name: { type: String, required: true }, // User name
    // email: { type: String, required: true }, // User email
    date: { type: Date, required: true }, // Reservation date
    guests: { type: Number, required: true, min: 1 }, // Number of guests
    tables: { type: Number, required: true, min: 1 }, // Number of guests
    status: { type: String, enum: ['pending', 'confirmed'], default: 'pending' }, // Status
    preferredTime: { type: String, enum: ['day', 'night'], default: 'day' }, // Status
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Reservation', ReservationSchema);
