// // middleware/auth.js
// import jwt from 'jsonwebtoken';

// export const authMiddleware = (req, res, next) => {
//   try {
//     const token = req.headers.authorization?.split(" ")[1];

//     if (!token) {
//       return res.status(401).json({ message: "Token missing" });
//     }

//     const decoded = jwt.verify(token, process.env.JWT_SECRET); // ✅ use correct secret
//     req.user = decoded;
//     next();
//   } catch (error) {
//     console.error("Auth Middleware Error:", error);
//     return res.status(401).json({ message: "Invalid or expired token" });
//   }
// };

import jwt from "jsonwebtoken";

const auth =async (req,res,next)=>{
    try{
        const token = req.cookies.accessToken || req?.headers?.authorization?.split(" ")[1]
        if(!token)
            { 
                return res.status(401).json({message:"Provide token"})
    }
    const decode = await jwt.verify(token,process.env.SECRET_KEY_ACCESS_TOKEN);
    if(!decode){
        return res.status(401).json({message:"Unauthorized access",
            error:true,
            success:false
        })
    }
    req.userId = decode.id;
    next()
        


    }catch(error){
       return res.status(500).json({
        message: error.message || error,
        error: true,
        success:false

       })
    }
}
export default auth
