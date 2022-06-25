// بسم الله الرحمن الرحيم

const PhoneBook= require('./phone-book')
const getPersons =(req,res,next)=>{
    const search=req.params.id?PhoneBook.findById(req.params.id):PhoneBook.find();
    search.then(persons=>{
        if (persons) {
        res.status(200).json(persons)
        return
        }else{
        res.status(404).end()
        return 
        }
       }).catch((err)=>{
        next(err)
    })
}

const addPerson =(req,res,next)=>{
    const newPerson=req.body;
    if(!newPerson.name || !newPerson.number ){
        res.status(400).json({error:"name or number missing"});
        return
    }
    PhoneBook.findOne({name:'Nader'})
    .then((nader)=>{
        
 if (nader && newPerson.name=='Nader'){
    res.status(400).json({"No":"you can't use my name"})
    return
 } else{
    const person= new PhoneBook({
        name:newPerson.name,
        number:newPerson.number,
    })
    person.save().then((dbPerson)=>{
       if(dbPerson){
        res.status(201).json(dbPerson).end()
        return
       }else{
        res.status(400).end()
        return
        
       }
    }).catch((err)=>{
        next(err)
    })
 }
})

}

const deletePerson = (req,res,next)=>{
    const id=req.params.id?req.params.id:null;
    PhoneBook.findById(id).then(nader=>{
    
        if(nader && nader.name=='Nader'){
           res.status(400).json({error:"you can't delete my name"}).end()
            return
        }else{
            PhoneBook.findByIdAndDelete(id).then(p=>{
                if(p){
                    res.status(204).end()
                }else{
                    res.status(404).end()
                }
            })
        }
    }).catch((err)=>{next(err)})
  
    
}
const updatePerson = (req,res,next)=>{
    const id=req.params.id?req.params.id:null;
            const {name,number}=req.body;
            const person={name,number};
            PhoneBook.findByIdAndUpdate(id,person,{new:true})
            .then(p=>{
                if(p) res.status(200).json(p)
                else res.status(404).end()
            })
}
module.exports={getPersons,addPerson,deletePerson, updatePerson};