const jwt = require('jsonwebtoken')
const generateToken = async(payload)=>{
    const token = await jwt.sign(payload, process.env.SECRET_KEY_JWT)
    return token;
}

const generateRefershToken = (payload)=>{
  const verifyOpts = { expiresIn: '1 day' }
  const token = jwt.sign(payload, process.env.SECRET_KEY_JWT, verifyOpts)
  return token;
}


 
module.exports = {generateToken, generateRefershToken}