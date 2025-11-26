const mongoose = require("mongoose");

const reservationSchema = new mongoose.Schema({
  numReservation: {
    type: Number,
    required: true,
    unique: true
  },
  nomReservation: {
    type: String,
    required: true
  },
  dateLivraison: {
    type: Date,
    required: true
  },
  prixReservation: {
    type: Number,
    required: true
  },
  // client: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: "Client",
  //   required: true
  // },
  plat: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Plat",
    required: true
  }
}, { timestamps: true });

const Reservation = mongoose.model("Reservation", reservationSchema);

module.exports = { Reservation };

// Le client qui a réservé ?
