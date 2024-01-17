import jwt, { decode } from 'jsonwebtoken';
import dotenv from 'dotenv';

//Get the key 
dotenv.config()
const secretKey = process.env.SECRET_KEY


const auth = async (req, res,next) => {

  if (!req.headers.authorization || !req.headers.authorization.startsWith("Bearer ")){
    return res.status(400).send({ message: 'Your session is not valid! not in authorization'})}
  try {
    const Header = req.headers.authorization;
    console.log(Header)
    const token = Header.split(' ')[1]
    console.log ("The token is :",token)
    const decode_token = jwt.verify(token,secretKey)
    console.log("The decode token is :",decode_token)
    console.log(decode_token["userId"])
    console.log(decode_token["role"])
    req.body = decode_token
    next()
       
  } catch (err){
    return res.status(400).send({ message: 'Your session is not valid!'})
  }
  
 
}

export default auth
