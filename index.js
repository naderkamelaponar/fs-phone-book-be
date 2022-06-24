// بسم الله الرحمن الرحيم
const express =require("express");
const morgan = require("morgan");
const cors = require('cors');
const PhoneBook =require('./models/phone-book');
const router =require('./api/v1')
const app= express();
const PORT = process.env.PORT || 3001
app.use(express.json())
app.use(express.static('build'))
app.use(morgan('tiny'));
app.get('/api/persons',(_,res)=>{
    
   PhoneBook.find({}).then(persons=>{
    if (persons) {
    res.status(200).json(persons)
    return
    }else{
    res.status(404).end()
    return 
    }
   }).catch((err)=>{
    res.status(500).end()
    return;
})
})

app.post('/api/persons',(req,res,next)=>{
    const newPerson=req.body;
    if(!newPerson.name || !newPerson.number ){
        res.status(400).json({error:"name or number missing"});
        return
    }
    if (newPerson.name=='Nader') {
        
       res.status(400).json({error:"you can't use my name"}).end()
        return
    }
    const person= new PhoneBook({
        name:newPerson.name,
        number:newPerson.number,
    })
    person.save().then((dbPerson)=>{
       if(dbPerson){
        res.status(201).json(dbPerson)
        return
       }else{
        res.status(400).end()
        return
        
       }
    }).catch((err)=>{
        next(err)
        
    })

    
})
app.get('/api/persons/:id',(req,res,next)=>{
    const id=req.params.id?req.params.id:null;
     PhoneBook.findById(id).then((p)=>{
        if(p){
            res.status(200).json(p)
            return
        }else{
            res.status(404).end()
            return
        }
        
        
    }).catch((err)=>{next(err)})
        
    })

    app.delete('/api/persons/:id',(req,res,next)=>{
        const id=req.params.id?req.params.id:null;
        PhoneBook.findById(id).then(nader=>{
            

            if(nader && nader.name=='Nader'){
                res.status(400).json({error:"you can't delete my name"}).end()
                return
            }
        })
        PhoneBook.findByIdAndDelete(id).then(p=>{
            if(p){
                res.status(204).end()
            }else{
                res.status(404).end()
            }
        })
        })
        app.put('/api/persons/:id',(req,res,next)=>{
            const id=req.params.id?req.params.id:null;
            const {name,number}=req.body;
            const person={name,number};
            PhoneBook.findByIdAndUpdate(id,person,{new:true})
            .then(p=>{
                if(p) res.status(200).json(p)
                else res.status(404).end()
            })
        })
app.get('/info',(_,res)=>{
    let   msg =`<p>Phonebook has info for ${PhoneBook.length} people</p>`;
    msg +=`<p>${new Date()}</p>`;
    res.send(msg );
})
app.listen(PORT,()=>{
console.log(`b-e is live @ http:localhost:${PORT}`);
})