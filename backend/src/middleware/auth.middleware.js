import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export const protectRoute = async (req, res, next) => {
    try {

        const token = req.cookies.jwt;
        
        if(!token){
            return res.status(401).json({message:"Unauthorized - no token provided"})
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY); 

        if(!decoded){
            return res.status(401).json({message:"Unauthorized - invalid token"})
        }


        const user = await User.findById(decoded.userId).select("-password"); //-password means exclude password field ( if we add this in postman this will not apear)

        if(!user){
            return res.status(401).json({message:"Unauthorized - user not found"})
        }
        req.user = user;
        
        next();

        // next() is used to call the next middleware or route handler in the stack
        //router.post('/onboarding',protectRoute, onboard); --->>> to call the next method onboard

    } catch (error) {
        
        console.log("Error in protectRoute middleware", error);
        return res.status(401).json({message:"Internal server error"})
    }
}