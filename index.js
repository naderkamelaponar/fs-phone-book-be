// بسم الله الرحمن الرحيم
const express =require("express");
const morgan = require("morgan");
const cors = require('cors');
const PhoneBookOps = require('./models/phone-book-ops');
const PhoneBook =require('./models/phone-book');
const app= express();
const PORT = process.env.PORT || 3001
app.use(cors('*'))
app.use(express.json())
app.use(express.static('build'))
app.use(morgan('tiny'));
app.get('/api/persons',PhoneBookOps.getPersons)
app.post('/api/persons',PhoneBookOps.addPerson)
app.get('/api/persons/:id',PhoneBookOps.getPersons)
app.delete('/api/persons/:id',PhoneBookOps.deletePerson)
app.put('/api/persons/:id',PhoneBookOps.updatePerson)
app.get('/info',(_,res)=>{
    let   msg =`<p>Phonebook has info for ${PhoneBook.length} people</p>`;
    msg +=`<p>${new Date()}</p>`;
    res.send(msg );
})
app.get('',(_,res)=>{
    res.status(404).send({error:"Page not found"})
})
app.listen(PORT,()=>{
console.log(`b-e is live @ http:localhost:${PORT}`);
})