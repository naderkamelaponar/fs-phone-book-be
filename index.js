// بسم الله الرحمن الرحيم
const express =require("express");
const morgan = require("morgan");
const cors = require('cors');
const app= express();
const PORT = process.env.PORT || 3001
const getId =()=>{
    return Math.floor(Math.random()*1000000);
}
let PhoneBook=[
    {
        "name": "Nader",
        "number": "+201100390905",
        "id": 1
      },
      { 
        "id": 2,
        "name": "Ada Lovelace", 
        "number": "39-44-5323523"
      },
      { 
        "id": 3,
        "name": "Dan Abramov", 
        "number": "12-43-234345"
      },
      { 
        "id": 4,
        "name": "Mary Poppendieck", 
        "number": "39-23-6423122"
      }
]
app.use(cors());
app.use(express.json())
app.use(morgan('tiny'));
app.get('/api/persons',(_,res)=>{
    res.send(JSON.stringify(PhoneBook));

})
app.post('/api/persons',(req,res)=>{
    const newPerson=req.body;
    if(!newPerson.name || !newPerson.number ){
        res.status(400).json({error:"name or number missing"});
        return;
    }
    if ( PhoneBook.filter(p=>p.name===newPerson.name).length>0){
        res.status(400).json({error:"name already exists"});
        return;
    }
    newPerson.id=getId();
    PhoneBook=PhoneBook.concat(newPerson);
    res.status(200).send(newPerson)
})
app.get('/api/persons/:id',(req,res)=>{
    const pId=req.params.id?Number(req.params.id):null;
    const person=pId ? PhoneBook.find(p=>p.id==pId):null;
    
    if(person) res.send(person)
    else res.status(404).send('Not Found')
    

})
app.delete('/api/persons/:id',(req,res)=>{
    const pId=req.params.id?Number(req.params.id):null;
    const person=pId ? PhoneBook.find(p=>p.id===pId):null;
    if(person){
        PhoneBook = PhoneBook.filter(p => p.id !== pId)  
    res.status(204).end()
    }else{
        res.status(404).send('Not Found')
    }

})

app.get('/info',(_,res)=>{
    let   msg =`<p>Phonebook has info for ${PhoneBook.length} people</p>`;
    msg +=`<p>${new Date()}</p>`;
    res.send(msg );
})
app.listen(PORT,()=>{
console.log(`b-e is live @ http://172.0.0.1:${Port}`);
})