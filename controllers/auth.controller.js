const asyncHandler = require("express-async-handler");
const { User } = require("../models/user.model.js");
const jwt = require('jsonwebtoken');
const bcrypt = require("bcryptjs");
const { validateLoginUser, validateRegisterUser } = require("../validations/auth.validation.js");


const register = asyncHandler(async (req, res) => {
    // if (this.item === undefined) { return }
    const { error } = validateRegisterUser(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    let userExists = await User.findOne({ email: req.body.email });
    if (userExists) return res.status(400).json({ message: "Email déjà existant" });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    let user = new User({
        username: req.body.username,
        email: req.body.email,
        numCDI: req.body.numCDI,
        typeUser: req.body.typeUser,
        password: hashedPassword
    });

    const savedUser = await user.save();

    savedUser.utilisateur = savedUser._id;
    await savedUser.save();

    const { password, ...other } = savedUser._doc;
    res.status(201).json({ ...other, token: null });
});

const login = asyncHandler(async (req, res) => {
    const { error } = validateLoginUser(req.body)
    if (error) return res.status(400).json({ message: error.details[0].message });

    let user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).json({ message: "Invalid email or password" })

    const isPasswordMatch = await bcrypt.compare(req.body.password, user.password);
    if (!isPasswordMatch) return res.status(400).json({ message: "Invalid email or password" });

    const token = jwt.sign({ id: user._id, username: user.username }, "secretKey", { expiresIn: '1d' });

    const { password, ...other } = user._doc;
    res.status(200).json({ ...other, token })
});

module.exports = { register, login };