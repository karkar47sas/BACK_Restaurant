const mongoose = require("mongoose");
const { Reservation } = require("../models/reservation.model");
const { Client } = require("../models/client.model");
const { Plat } = require("../models/plat.model");

// const getAllReservations = async (req, res) => {
//     try {
//         const reservations = await Reservation.find()
//             .populate('client', 'prenom nom')
//             .populate('service', 'titre');
//         res.status(200).json(reservations);
//     } catch (error) {
//         console.error("Erreur lors de la récupération des réservations :", error);
//         res.status(500).json({ error: "Erreur serveur lors de la récupération des réservations." });
//     }
// };

// 

// const getReservation = async (req, res) => {
//     try {
//         const reservationId = req.params.id;
//         const reservation = await Reservation.findById(reservationId);
//         if (!reservation) {
//             return res.status(404).json({ message: 'Réservation non trouvée' });
//         }
//         res.json(reservation);
//     } catch (error) {
//         console.error('Erreur getReservationDetails:', error);
//         res.status(500).json({ message: 'Erreur serveur' });
//     }
// }

const addReservation = async (req, res) => {
    try {
        const { titre, dateLivraison, status, prix, serviceId } = req.body;

        const clientId = req.user._id;

        if (!mongoose.Types.ObjectId.isValid(platId) || !mongoose.Types.ObjectId.isValid(clientId)) {
            return res.status(400).json({ error: "ID du plat ou du client invalide." });
        }

        const foundPlat = await Plat.findById(platId);
        if (!foundPlat) {
            return res.status(404).json({ error: "Plat non trouvé." });
        }

        if (titre !== foundService.nom) {
            return res.status(400).json({ error: "Le titre de la réservation ne correspond pas au nom du service." });
        }

        if (prix !== foundService.prix) {
            return res.status(400).json({ error: "Le prix ne correspond pas au service." });
        }

        const lastReservation = await Reservation.findOne().sort({ numCommande: -1 });
        const nextNumCommande = lastReservation ? lastReservation.numCommande + 1 : 1;

        const newReservation = new Reservation({
            numCommande: nextNumCommande,
            titre,
            dateLivraison,
            status,
            prix,
            service: serviceId,
            client: clientId,
        });

        await newReservation.save();

        await Client.findByIdAndUpdate(clientId, {
            $push: { reservations: newReservation._id }
        });

        res.status(201).json({ message: 'Réservation ajoutée avec succès', reservation: newReservation });
    } catch (error) {
        console.error('Erreur lors de l’ajout de la réservation :', error);
        res.status(500).json({ message: 'Erreur serveur' });
    }
};

const updateReservation = async (req, res) => {
    try {
        const { id } = req.params;
        const { dateLivraison, status, message } = req.body;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: "ID de réservation invalide." });
        }

        const updateData = {};
        if (dateLivraison) updateData.dateLivraison = dateLivraison;
        if (status) updateData.status = status;
        if (message) updateData.message = message;

        const updated = await Reservation.findByIdAndUpdate(id, updateData, { new: true });

        if (!updated) {
            return res.status(404).json({ error: "Réservation non trouvée." });
        }

        res.status(200).json({ message: "Réservation mise à jour avec succès.", reservation: updated });
    } catch (error) {
        console.error("Erreur lors de la mise à jour :", error);
        res.status(500).json({ error: "Erreur serveur lors de la mise à jour." });
    }
};


const deleteReservation = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: "ID de réservation invalide." });
        }

        const reservation = await Reservation.findById(id);
        if (!reservation) {
            return res.status(404).json({ error: "Réservation non trouvée." });
        }

        await Client.findByIdAndUpdate(reservation.client, {
            $pull: { reservations: id }
        });

        await Reservation.findByIdAndDelete(id);

        res.status(200).json({ message: "Réservation supprimée avec succès." });
    } catch (error) {
        console.error("Erreur lors de la suppression :", error);
        res.status(500).json({ error: "Erreur serveur lors de la suppression." });
    }
};

module.exports = { addReservation, updateReservation, deleteReservation };