import jwt from 'jsonwebtoken';
import FireOfficer from '../models/FireOfficer.js';
const generatedRefreshToken = async(userId) => {
    const token = await jwt.sign({id:userId},
        process.env.SECRET_KEY_REFRESH_TOKEN,{ expiresIn:'15d'}
    )
    const updateRefreshTokenUser = await FireOfficer.updateOne({_id:userId},{refresh_token:token})
    return token
 
}

export default generatedRefreshToken