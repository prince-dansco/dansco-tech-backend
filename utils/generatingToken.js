import jwt from "jsonwebtoken"


export const generatingToken = async (res, userId)=>{
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: '7d',
  })

 res.cookie('token', token, {
    httpOnly: true, 
        secure: true,
        sameSite: "none",
        // maxAge: 5 * 60 * 60 * 1000,
    maxAge: 7 * 24 * 60 * 60 * 1000,
  })
  return token
}
