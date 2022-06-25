// بسم الله الرحمن الرحيم
const express=require("express");
const errorHandler=(err,req,res,next)=>{
    console.log(err.message)
    res.status(562).json({error:err.message})
    return
}
exports.module=errorHandler;