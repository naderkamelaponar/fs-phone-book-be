// بسم الله الرحمن الرحيم
const mongoose = require('mongoose');
const dotenv = require('dotenv')
dotenv.config()

//console.log(process.env.DB_URI);
const PhoneBookSchema = new mongoose.Schema({
    name: String,
    number:String 
})
const mongoUri = process.env.DB_URI;
const PhoneBook= mongoose.model('PhoneBook',PhoneBookSchema);
const addPerson = ({name,number})=>{
mongoose.connect(mongoUri).then((res)=>{
    console.log('connected')
    if (name && number){
        const newPerson = new PhoneBook({
            name:name,number:number
        })
        return newPerson.save()
    }
}).then((res)=>{
    console.log(`Added ${res.name} number ${res.number} to phonebook`)
    return mongoose.connection.close()
})
}


const getPersons=(person)=>{
    const search = person? {name:person}:{}
    mongoose.connect(mongoUri).then((res)=>{
        console.log('connected')
        PhoneBook.find(search).then((res)=>{
            console.log(res)
        }).then((res)=>{
            console.log('res',res)
            return mongoose.connection.close()
        })}
        )
    
}
if (process.argv.length>2 ){
    const pName=process.argv[2]?process.argv[2]:null;
    const pNumer=process.argv[3]?process.argv[3]:null;
    if (pName && pNumer){
        const pData= {
            name: pName,
            number: pNumer
        }
        addPerson(pData)
    }
    else getPersons(pName)
}
