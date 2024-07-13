import bcrypt from "bcrypt"
import prisma from "../lib/prisma.js"
import jwt from "jsonwebtoken"

export const register= async(req,res)=>{
    const {username, email, password}= req.body;
    try{// HASH THE PASSWORD
    const hashPassword= await bcrypt.hash(password, 10);

    console.log(hashPassword);

    //CREAT A NEW USER
    const newUser= await prisma.user.create({
        data: {
            username,
            email,
            password: hashPassword,
        },
    });

    console.log(newUser)
    res.status(201).json({message: "User created successfully"});
  }catch(err){
    console.log(err)
    res.status(500).json({message: "failed to create user !!"})
} 
};

export const login= async(req,res)=>{
    const {username, password}= req.body;

    try{
    //check if user exists
    const user= await prisma.user.findUnique({
        where: {username}
    })

    if(!user) return res.status(401).json({message:"Invalid credentials"});

    //check user password is correct

    const isPasswordValid= await bcrypt.compare(password, user.password);

    if(!isPasswordValid) return res.status(401).json({message:"Invalid credentials"})

        // res.setHeader("Set-Cookie", "test="+ "myvalue").json("success")

    // res.cookie("test", "myvalue").json("success")

        const age=1000 * 60 * 60 * 24 *7;
        const token=jwt.sign({
            id: user.id
        },process.env.JWT_SECRET_KEY, {expiresIn: age})

        
        res.cookie("token",token,{
            httpOnly: true,
            // secure: true
            maxAge: age,
        }).status(200).json({message:"login successfully"})
    //generate cookie token and send to user
    }catch(err){
        console.log(err)
        res.status(500).json({message:"failed to login"})
    }

}

export const logout= (req,res)=>{
    
}