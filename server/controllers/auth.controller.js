const User = require("../models/User.model");
const generateToken = require("../utils/jwt");
const sendEmail = require("../utils/emailService");
const generateStrongPassword = require("../utils/generatePassword");

// @desc   signin user
// @route  POST /auth/signin
exports.signin = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: "User Not Found" });
        } else {
            if (!(await user.matchPassword(password))) {
                return res.status(401).json({ message: "Wrong password" });
            }
        }

        res.status(200).json({
            id: user._id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id),
        });
    } catch (error) {
        next(error);
    }
};

// @desc   signup new user
// @route  POST /auth/signup
exports.signup = async (req, res, next) => {
    try {
        const { name, email } = req.body;

        
        const userExists = await User.findOne({ email });
        if (userExists) return res.status(400).json({ message: "User already exists" });
        
        // generate random password
        const password = generateStrongPassword();

        const user = await User.create({ name, email, password });

        await sendEmail({
            templateName: "welcome",
            to: user.email,
            variables: { name: user.name, password: password }
        });

        res.status(201).json({
            id: user._id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id),
        });
    } catch (error) {
        next(error);
    }
};