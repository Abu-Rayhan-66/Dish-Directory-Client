import jwt, { JwtPayload } from "jsonwebtoken"
import { jwtDecode } from "jwt-decode"

export const jwtVerify = (token:string)=>{
    try{
       
       return jwt.verify(token, process.env.JWT_ACCESS_SECRETS as string) as JwtPayload
    }catch(error){
        console.log(error)
        return null
    }
}

export const decode = (token:string)=>{
    const decode = jwtDecode(token) as JwtPayload
    return decode
}



