const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const Transaction = require("./model/Transaction");
const mongoose = require("mongoose");
const PORT = process.env.PORT || 4000;
const mongoURL = process.env.MONGO_URL;

const apiRouter = express.Router();
app.use(cors());
app.use(express.json());

// POST method
app.post('/transaction', async (req, res) => {
    await mongoose.connect(mongoURL);
    const {name, price, description, datetime} = req.body;
    const transaction = await Transaction.create({name, price, description, datetime});
    res.json(transaction);
})

// GET method
apiRouter.get('/transactions', async (req, res) => {
    await mongoose.connect(mongoURL);
    const transactions = await Transaction.find({});
    res.json(transactions);
})

app.use('/api', apiRouter);
app.listen(PORT, ()=> console.log("Server is running on : ", PORT));
