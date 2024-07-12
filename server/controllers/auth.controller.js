import bcrypt from "bcrypt"
export const register= async(req,res)=>{
    const {username, email, password}= req.body;
    // HASH THE PASSWORD
    const hashPassword= await bcrypt.hash(password, 10);

    console.log(hashPassword);

    //CREAT A NEW USER

    //SAVE IT TO DATABASE
}

export const login= (req,res)=>{
    
}

export const logout= (req,res)=>{
    
}