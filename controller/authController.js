import User from "../model/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";



export const checkAuth = (req,res)=>{
    try {
        res.status(200).json({
            success: true,
            user: req.user,
            message: "User is authenticated sucessfully",})

    } catch (error) {
            res.status(401).json({
            success: false,
            message: 'Token verification failed',
            error: error.message
        });
    }
}



const register = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        if (!name || !email || !password) {
            return res.status(400).json({ 
                success: false,
                message: "Please provide all required fields" 
            });
        }

        const existUser = await User.findOne({ email });
        if (existUser) {
            return res.status(400).json({ 
                success: false,
                message: "User already exists" 
            });
        }
        
        const hashPass = await bcrypt.hash(password, 10);

        const user = await User.create({
            name,
            email,
            password: hashPass
        });
        
        await user.save();
        
        res.status(201).json({ 
            success: true,
            message: "User registered successfully", 
            user 
        });
    } catch (error) {
        return res.status(500).json({ 
            success: false,
            message: 'Server error', 
            error: error.message 
        });
    }
}



const login = async (req, res)=>{
const { email, password } = req.body;
    try {
        const existUser = await User.findOne({email});
        if(!existUser)
        {
            return res.status(400).json({ message: "User does not exist" });
        }
        const isMatch = await bcrypt.compare(password, existUser.password);
        if(!isMatch)
        {
            return res.status(400).json({ message: "Invalid credentials" });
        }
const token = jwt.sign({
    UserId: existUser._id,
    email: existUser.email
},
process.env.JWT_SECRET,
{ expiresIn: '10h' });

return res.status(200).json({
            message: "Login successful",
            token,
            user: {
                id: existUser._id,
                name: existUser.name,
                email: existUser.email
            }
        });
    } catch (error) {
        return res.status(500).json({ message: 'Server error', error: error.message });
    }
}


export { register, login };