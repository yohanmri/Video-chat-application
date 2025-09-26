import { upsertStreamUser } from '../lib/stream.js';
import User from '../models/User.js';
import jwt from 'jsonwebtoken';

export async function signup(req, res) {
    const {fullName, email, password} = req.body;

    try {
        if(!email || !password || !fullName ){
            return res.status(400).json({message:"All fields are required"})};
        if(password.length < 6){
            return res.status(400).json({message:"Password must be at least 6 characters"});
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(!emailRegex.test(email)){
            return res.status(400).json({message:"Invalid email format"});
        }

        const existingUser = await User.findOne({email});
        if(existingUser){
            return res.status(400).json({message:"Email already exists please use a different email"});
        }

        const idx =  Math.floor(Math.random() * 100) + 1;
        const randomAvatar = `https://avatar.iran.liara.run/public/${idx}.png`;

        const newUser = await User.create({
            fullName,
            email,
            password,
            profilePic: randomAvatar,


        });
        


        // CREATE THE USER IN STREAM -----------------------------------------
        try {
            await upsertStreamUser({
            id:newUser._id.toString(),
            name:newUser.fullName,
            image:newUser.profilePic || "",
        });
            console.log(`Stream user created for ${newUser.fullName}`) 
        } catch (error) {
           console.log("Error in creating stream user", error);
        }

        // CREATE THE USER IN STREAM  - end  -----------------------------------------



        const token = jwt.sign({userId:newUser._id},process.env.JWT_SECRET_KEY,{
            expiresIn:'7d',
        })
        res.cookie("jwt", token,{
            maxAge: 7*24*60*60*1000, //7 days
            httpOnly:true, //Prevent XSS attacks
            sameSite:'strict', //CSRF protection
        })
        
        return res.status(201).json({message:"User created successfully"})
    } catch (error) {
        console.log("Error in signup controller", error);
        res.status(500).json({message:"Server Error"}); 
        
    }
}

export async function login(req, res) {
    try {
        const {email,password} = req.body;

        if(!email || !password){
            return res.status(400).json({message:"All fields are required"});
        }

        //400 is bad request
        //401 is unauthorized
        const user = await User.findOne({email});
        if(!user) return res.status(401).json({message:"Invalid email"});

        const isPasswordCorrect = await user.matchPassword(password);

        if(!isPasswordCorrect) return res.status(401).json({message:"Invalid password"});


                
        const token = jwt.sign({userId:user._id},process.env.JWT_SECRET_KEY,{
            expiresIn:'7d',
        })
        res.cookie("jwt", token,{
            maxAge: 7*24*60*60*1000, //7 days
            httpOnly:true, //Prevent XSS attacks
            sameSite:'strict', //CSRF protection
        })

        res.status(200).json({success:true, user});

    } catch (error) {
      console.log("Error in login controller", error);
      res.status(500).json({message:"Server Error"});  
    }
}

export async function logout(req, res) {
   res.clearCookie("jwt")
   res.status(200).json({success:true, message:"Logged out successfully"});
}

export async function getData(req, res){
    res.send('Get Data');
}

//onboard means to collect additional information about the user after signup
export async function onboard(req, res){
   try {
    
    const userId = req.user._id;
    const {fullName, bio, nativeLanguage, learningLanguage, location} = req.body;

    if(!fullName || !bio || !nativeLanguage || !learningLanguage || !location){
        return res.status(400).json({
            message:"All fields are required",
            missingFields:[
                !fullName && "fullName",
                !bio && "bio",
                !nativeLanguage && "nativeLanguage",
                !learningLanguage && "learningLanguage",
                !location && "location",
            ].filter(Boolean),
        });
    }

    await User.findByIdAndUpdate(userId,{
        ...req.body,
        isOnboarded:true,
    }), {new:true};

    const updatedUser = await User.findById(userId).select("-password");

    if(!updatedUser){
        return res.status(404).json({message:"User not found"});
    }

    //update the user in stream also

    try {
        
    await upsertStreamUser({
        id: updatedUser._id.toString(),
        name: updatedUser.fullName,
        image: updatedUser.profilePic || "",
    }); 
    console.log(`Stream user updated after onboarding for ${updatedUser.fullName}`);
    } catch (StreamError) {
        console.log("Error in updating stream user during onboarding", StreamError.message);
    }


try {
        await upsertStreamUser({
        id: updatedUser._id.toString(),
        name: updatedUser.fullName,
        image: updatedUser.profilePic || "",
    });
} catch (StreanError) {
    console.log("Error in updating stream user during onboarding", StreanError);
}

    res.status(200).json({success:true, message:"Onboarding completed successfully", user:updatedUser});
   } catch (error) {
    console.log("Error in onboard controller", error);
    res.status(500).json({message:"Server Error"});
   }
}