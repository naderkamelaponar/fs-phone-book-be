// بسم الله الرحمن الرحيم
const mongoose = require('mongoose')    
const dotenv = require('dotenv')
dotenv.config()
const dbUri = process.env.DB_URI;
mongoose.connect(dbUri).then((res)=>{
    console.log('connected to db')
})
const phoneBookSchema= new mongoose.Schema({
    name:{type:String,minLength: 10,required:true},
    number:{type:String,minLength:7,
    validate:{
        validator:(v)=>{
        //eg. 1234556, 1-22334455 and 10-22-334455 are invalid
        return !/\d{2}-\d{2}-\d{6}/.test(v) &&  !/\d{1}-\d{8}/.test(v) && !/\d{7}/.test(v) 
    },
    message: (m)=>{return `${m.value} is not a vaild number`},
    required: [true, 'User phone number required']
    },required:true
},
})
phoneBookSchema.set('toJSON',{
    transform:(document,returnedObject)=>{
        returnedObject.id=returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})
module.exports=mongoose.model('PhoneBook',phoneBookSchema)