// بسم الله الرحمن الرحيم
const express = require('express');
const phoneBook=require('../models/phone-book');
const app = express.Router();
app.get('/persons',(_,res)=>{

const persons=phoneBook.find({})
persons.then((dbRes)=>{
    const dbres= dbRes ? dbRes : 'No Data';
    res.status(200).res.send(dbres)
})
})
