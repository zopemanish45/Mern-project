const User = require("../models/User");

exports.createUser = async (req, res) => {
    try {

        const { userName, dateOfBirth, email, password } = req.body;

        const userData = new User({
            userName,
            dateOfBirth,
            email,
            password
        });
        await userData.save();
        res.status(201).json(userData)
    } catch (error) {
        res.status(400).json({ error: error.message });
    }

}
exports.getUser = async (req, res) => {

    try {
        const searchedUser = await User.findById(req.params.id)
        if (!searchedUser) {
            res.status(404).json({ error: "user not found" })
        }
        res.json(searchedUser)

    } catch (error) {
        res.status(400).json({ error: error.message })

    }



}
exports.getAllUsers = async (req, res) => {

    try {
        const searchedUser = await User.find()
        if (!searchedUser) {
            res.status(404).json({ error: "user not found" })
        }
        res.json(searchedUser)

    } catch (error) {
        res.status(400).json({ error: error.message })

    }



}

exports.updateUser = async (req, res) => {
    try {
        const { userName, dateOfBirth, email, password } = req.body;
        const updateData = {
            userName,
            dateOfBirth,
            email,
            password,
            updatedAt: Date.now(),
        };

        const userData = await User.findByIdAndUpdate(req.params.id, updateData, { new: true })
        if (!userData) {
            return res.status(400).json({ error: "user not found" })
        }
        res.json(userData)
    } catch (error) {
        res.status(400).json({ error: error.message })

    }

}
exports.deleteUser = async (req, res) => {
    try {
        const deletedUser = await User.findByIdAndDelete(req.params.id);
        if (!deletedUser) {
            res.status(404).json({ message: "user not found" });
        }
        res.json({ message: "user Deleted" })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

