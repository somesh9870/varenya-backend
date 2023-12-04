import Jwt from "jsonwebtoken";

export const jwttoken=(id)=>{
  try{
    
    const token = Jwt.sign(
        { userId:id.toString() },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRY  }
      );
      
      return {token}
  }
  catch(error)
    {
        console.log(error);
 // eslint-disable-next-line no-undef
 return res.status(500).send({status:false,message:error.message})
    }

}