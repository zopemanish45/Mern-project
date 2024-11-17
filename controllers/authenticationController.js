const User = require('../models/User');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const nodemailer = require('nodemailer');

dotenv.config()

exports.register = async (req, res) => {
    try {
        const { userName, dateOfBirth, email, password } = req.body;
        const newUser = new User({ userName, dateOfBirth, email, password });
        await newUser.save();
        res.status(201).json({ message: "user registered successfully" })
    } catch (error) {
        res.status(400).json({ error: error.message })

    }
}
exports.login = async (req, res) => {
    try {
      const { email, password } = req.body;
      const existingUser = await User.findOne({ email })
  
      if (!existingUser) {
        return res.status(404).json({ error: "User not Found" })
      }
      const isMatch = await existingUser.comparePassword(password);
      if (!isMatch) {
        return res.status(400).json({ error: "Invalid Credentials" })
      }
      const token = jwt.sign({ id: existingUser._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
      res.json({ token })
    } catch (error) {
      res.status(400).json({ error: error.message })
    }
  }
  exports.forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ error: "User not found" });

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        user.resetPasswordToken = token;
        user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
        await user.save();

        const transporter = nodemailer.createTransport({
            service: process.env.EMAIL_SERVICE,
            auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS },
        });

        const mailOptions = {
            to: user.email,
            from: process.env.EMAIL_USER,
            subject: 'Password Reset',
            text: `Please use this token to reset your password: ${token}`,
        };

        await transporter.sendMail(mailOptions);
        res.status(200).json({ message: "Reset email sent" });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.resetPassword = async (req, res) => {
    try {
        const { token, password } = req.body;
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const user = await User.findOne({ _id: decoded.id, resetPasswordToken: token, resetPasswordExpires: { $gt: Date.now() } });
        if (!user) return res.status(400).json({ error: "Token invalid or expired" });

        user.password = password;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpires = undefined;
        await user.save();

        res.status(200).json({ message: "Password reset successful" });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};