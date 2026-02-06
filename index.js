const express = require('express');

require('dotenv').config();

const connectDB = require('./config/db');
const router = require('./routes/user.routes');
const cookieParser = require('cookie-parser');
const cors = require("cors");

const app = express();
connectDB();

const allowedOrigins = [
    "http://localhost:5173",
    "https://socialix-backend.onrender.com",
];

app.use(cors({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    exposedHeaders: ["Set-Cookie"],

}))
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send('API is running....');
})

// Routes
app.use('/api', router);



const PORT = process.env.PORT || 5000;
app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server is running on PORT ${PORT}`);

});