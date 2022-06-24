// بسم الله الرحمن الرحيم
const Router =require("express");
const router = Router();
const PhoneBook =require('../models/phone-book');
router.route('/persons').get((req,res,next)=>{
    PhoneBook.find({}).then(persons=>{
        return res.send('ss')
    })
})
exports.module=router;