// بسم الله الرحمن الرحيم
const mongoose = require('mongoose')    
const dotenv = require('dotenv')
dotenv.config()
const dbUri = process.env.DB_URI;
mongoose.connect(dbUri).then((res)=>{
    console.log('connected to db')
})
const phoneBookSchema= new mongoose.Schema({
    personName:String,
    personNumber:String,
})
phoneBookSchema.set('toJSON',{
    transform:(document,returnedObject)=>{
        returnedObject.id=returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})
module.exports=mongoose.model('PhoneBook',phoneBookSchema)