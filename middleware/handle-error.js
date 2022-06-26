// بسم الله الرحمن الرحيم
const errorHandler=(err,_,res,next)=>{
  if (err.name === 'CastError') {
    return res.status(400).send({ error: 'malformatted id' })
  } else if (err.name === 'ValidationError') {
    return res.status(400).json({ error: err.message })
  }
  next(err)
}
exports.module=errorHandler