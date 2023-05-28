const path = require('path');
const express=require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const userRouter = require('./routes/user');
const inventoryRouter = require('./routes/inventory');

const app = express()

mongoose.connect("mongodb+srv://soham958:phDgLtpYrKpCUojy@cluster0.ajolg.mongodb.net/mean?retryWrites=true&w=majority").then(()=>{
    console.log('Connected to database');
})
.catch(()=>{
    console.log('Connection Error');
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

app.use((req,res,next)=>{
    res.setHeader("Access-Control-Allow-Origin","*");
    res.setHeader("Access-Control-Allow-Headers","Origin,X-Requested-With,Content-Type,Accept,Authorization");
    res.setHeader("Access-Control-Allow-methods","GET,POST,PUT,PATCH,DELETE,OPTIONS");
    next();
});

app.use("/api/user",userRouter);
app.use("/api/inventory",inventoryRouter);

module.exports = app;

