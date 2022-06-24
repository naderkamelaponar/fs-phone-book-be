// بسم الله الرحمن الرحيم
const express =require("express");
const morgan = require("morgan");
const cors = require('cors');
const PhoneBook =require('./models/phone-book');
const app= express();
const PORT = process.env.PORT || 3001


//app.use(cors());

app.use(express.json())
app.use(express.static('build'))
app.use(morgan('tiny'));
app.get('/api/persons',(_,res)=>{
    
   PhoneBook.find({}).then(persons=>{
    console.log('res',persons)
    res.status(200).json(persons)
    return
   }).catch((err)=>{
    res.status(400).json({error:"error"});
    return;
})

})

app.post('/api/persons',(req,res)=>{
    const newPerson=req.body;
    if(!newPerson.name || !newPerson.number ){
        res.status(400).json({error:"name or number missing"});
        return;
    }
    
    const person= new PhoneBook({
        personName:newPerson.name,
        personNumber:newPerson.number,
    })
    person.save().then((dbRes)=>{
        res.status(201).json(dbRes);
      return 
    }).catch((err)=>{
        res.status(400).json({error:"error"});
        return;
    })

    
})
app.get('/api/persons/:id',(req,res)=>{
    const id=req.params.id?req.params.id:null;
     PhoneBook.findById(id).then((p)=>{
        if(p.length===0){
            res.status(404).json({error:"person not found"});
            return
        }else{
            res.status(200).json(p);
            return    
        }
        
        
    })
        
    })
app.delete('/api/persons/:id',(req,res)=>{
    const pId=req.params.id?Number(req.params.id):null;
    const person=pId ? phoneBook.find(p=>p.id===pId):null;
    if(person){
        phoneBook = phoneBook.filter(p => p.id !== pId)  
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
console.log(`b-e is live @ http:localhost:${PORT}`);
})