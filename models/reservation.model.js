const mongoose = require("mongoose");

const reservationSchema = new mongoose.Schema({
nomPlat: {
    type: String,
    required: true
  },
   prix: {
    type: Number,
    required: true
  },
}, { timestamps: true });

const Reservation = mongoose.model("Reservation", reservationSchema);

module.exports = { Reservation };

// Le client qui a réservé ?
