// require('dotenv').config();
// import express from 'express';
const express = require('express');
// import mongoose from 'mongoose';
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const connectToDB=require("./config/db.js");
const app = express();
const port = 5000;
const authRoutes = require("./routes/auth.route");
app.use(express.json());
// import authRoutes from "routes/auth.route.js";
// MONGO_URI = "mongodb://localhost:27017/restoDB"
dotenv.config();
connectToDB();

app.use(cors({
  origin: ['http://localhost:3000'], 
  credentials: true
}));
console.log('CORS configuré avec origin http://localhost:3000');

// try {
//   mongoose.connect(process.env.MONGO_URI)
//     .then(() => console.log("Connected to DataBase successfully"))
//     .catch(error => console.error("Could not connect to mongoDB", error));
// } catch (error) {
//   console.error("Could not connect to mongoDB", error);
// }

app.use("/auth", authRoutes);

app.listen(port, () => {
  console.log(`Serveur connecté au port ${port}`);
})