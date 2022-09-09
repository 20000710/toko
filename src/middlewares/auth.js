const jwt = require('jsonwebtoken')
const createError = require('http-errors')

const protect =(req,res,next)=>{
  try{
    let token
    if(req.headers.authorization){
        token = req.headers.authorization.split(" ")[1];
        let decoded = jwt.verify(token, process.env.SECRET_KEY_JWT);
        req.payload = decoded
        console.log('payload: ', req.payload)
        next()
    }else{
        res.json({
            message : "server need token"
        })
    }
  }catch(error){
    console.log(error);
    if(error && error.name ==='JsonWebTokenError'){
      next(new createError(400,'Token invalid'))
    }else if(error && error.name ==='TokenExpiredError'){
      next(new createError(400,'Token expired'))
    }else{
      next(new createError(400,'Token not active'))
    }
  }
}

const admin =(req,res,next)=>{
  try{
    let token
    if(req.headers.authorization){
        token = req.headers.authorization.split(" ")[1];
        let decoded = jwt.verify(token, process.env.SECRET_KEY_JWT);
        req.payload = decoded
        console.log('payload: ', req.payload)
        if (decoded.role != "admin") {
          res.json({
            message: "access only for admin",
          });
        }
        next()
    }else{
        res.json({
            message : "server need token"
        })
    }
  }catch(error){
    console.log(error);
    if(error && error.name ==='JsonWebTokenError'){
      next(new createError(400,'Token invalid'))
    }else if(error && error.name ==='TokenExpiredError'){
      next(new createError(400,'Token expired'))
    }else{
      next(new createError(400,'Token not active'))
    }
  }
}

const buyer =(req,res,next)=>{
  try{
    let token
    if(req.headers.authorization){
        token = req.headers.authorization.split(" ")[1];
        let decoded = jwt.verify(token, process.env.SECRET_KEY_JWT);
        req.payload = decoded
        console.log('payload: ', req.payload)
        if (decoded.role != "buyer") {
          res.json({
            message: "access only for buyer",
          });
        }
        next()
    }else{
        res.json({
            message : "server need token"
        })
    }
  }catch(error){
    console.log(error);
    if(error && error.name ==='JsonWebTokenError'){
      next(new createError(400,'Token invalid'))
    }else if(error && error.name ==='TokenExpiredError'){
      next(new createError(400,'Token expired'))
    }else{
      next(new createError(400,'Token not active'))
    }
  }
}

const seller =(req,res,next)=>{
  try{
    let token
    if(req.headers.authorization){
        token = req.headers.authorization.split(" ")[1];
        let decoded = jwt.verify(token, process.env.SECRET_KEY_JWT);
        req.payload = decoded
        console.log('payload: ', req.payload)
        if (decoded.role != "seller") {
          res.json({
            message: "access only for seller",
          });
        }
        next()
    }else{
        res.json({
            message : "server need token"
        })
    }
  }catch(error){
    console.log(error);
    if(error && error.name ==='JsonWebTokenError'){
      next(new createError(400,'Token invalid'))
    }else if(error && error.name ==='TokenExpiredError'){
      next(new createError(400,'Token expired'))
    }else{
      next(new createError(400,'Token not active'))
    }
  }
}

module.exports = {protect, admin, buyer, seller}