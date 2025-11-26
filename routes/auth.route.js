const express = require('express');
const { register, login, logout } = require("../controllers/auth.controller.js");
const auth=require('../middlewares/authMiddleware.js');
const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout",auth, logout);

module.exports = router;