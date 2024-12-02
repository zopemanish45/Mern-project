const dotenv = require('dotenv')
const express = require('express')
const { dbConnect } = require('../config/dbConnection');
const User = require('../models/User');
const router = require('../routes/userRoutes');
const cors = require('cors')
const app = express();



dotenv.config();
dbConnect();


app.use(cors())
app.options('*', cors());

const port = process.env.PORT || 4000;
const hostname = process.env.HOST_NAME || 'localhost'
// app.get('/api/v1/users', (req, res) => {
//     res.status(200).json({ message: "hello form MERN Application" })

// })
// middleares
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.use('/api/v1',router)



app.listen(port, () => {
    console.log(`http://${hostname}:${port}`)
})