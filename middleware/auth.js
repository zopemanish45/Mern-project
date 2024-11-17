const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

const auth = (req, res, next) => {
    const token = req.header('Authorization');

    if (!token) {
        return res.status(401).json({ error: "no token ,Authorization dennied" })
    }
    try {
        const tokenwithoutBearer = token.split(' ')[1];
        const decoded = jwt.verify(tokenwithoutBearer, process.env.JWT_SECRET)
        req.user = decoded.id;
        next();
    } catch (error) {
        res.status(400).json({ error: 'token is not valid' });

    }


};

module.exports = auth;
