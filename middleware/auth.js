// import jwt from 'jsonwebtoken';

// const auth = async (req, res, next) => {
//   try {
//     const headerToken = req?.headers?.authorization?.split(" ")[1];
//     const token = headerToken || req.cookies.accessToken;

//     if (!token) {
//       return res.status(401).json({ message: "Token missing" });
//     }

//     const decoded = jwt.verify(token, process.env.SECRET_KEY_ACCESS_TOKEN);
//     req.user = decoded;
//     next();
//   } catch (error) {
//     console.error("Auth Middleware Error:", error.message);
//     return res.status(401).json({ message: "Invalid or expired token" });
//   }
// };





import jwt from "jsonwebtoken";

const auth = async (req, res, next) => {
    try {
        const headerToken = req?.headers?.authorization?.split(" ")[1];
        const token = headerToken || req.cookies.accessToken;
        if (!token) {
            return res.status(401).json({ message: "Provide token" })
        }
        const decode = await jwt.verify(token, process.env.SECRET_KEY_ACCESS_TOKEN);
        if (!decode) {
            return res.status(401).json({
                message: "Unauthorized access",
                error: true,
                success: false
            })
        }
        req.userId = decode.id;
        next()



    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error: true,
            success: false

        })
    }
}
export default auth
