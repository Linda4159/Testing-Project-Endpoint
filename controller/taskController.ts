import taskModel from "../model/taskModel";
import express,{Request,Response} from "express"
import bcrypt from "bcrypt"
import  Jwt  from "jsonwebtoken";

export const regOwner= async(req:Request,res:Response):Promise<Response>=>{
    try{
        const{name,email,password} = req.body
        if(!name || !email || !password){
return res.status(500).json({message:"all fields required"})
        }
        const checkEmail = await taskModel.findOne({email:email})
        if(checkEmail){
            return res.status(404).json({message:"email already in use"})
        }
        const salt = await bcrypt.genSalt(10)
        const hash = await bcrypt.hash(password,salt)
        const regUser = await taskModel.create({
            name,
            email,
            password:hash

        })
return res.status(201).json({
    success:1,
    message:"registration successful",
    data:regUser
})
    }catch(error:any){
return res.status(404).json({
    success:0,
    message:error.message
})
    }
}
export const loginOwner = async(req:Request,res:Response):Promise<Response>=>{
    try{
        const{email,password} = req.body
        if (!email || !password){
return res.status(500).json({message:"please fill all fields"})
        }
        const checkEmail = await taskModel.findOne({email:email})
        if(checkEmail){
            const checkPassword = await bcrypt.compare(password,checkEmail.password)
            if(checkPassword){
                const token = Jwt.sign({_id:checkEmail._id,name:checkEmail.name},"ivannaorezikomelinda1234567890",{expiresIn:"10m"})
                console.log("linda",token)
                res.cookie("sessionId",token)
                console.log(req.headers["cookie"])
                return res.status(201).json({
                    success:1,
                    message:"login successful"
                    
                
                })
            }else{
                return res.status(500).json({message:"incorrect password"})
            }
        }else{
            return res.status(500).json({message:"user not found"})
        }

    }catch(error:any){
        return res.status(404).json({
            success:0,
        message:error.message})
    }
}
export const getOwners = async(req:Request,res:Response):Promise<Response>=>{
    try{
        const getAll = await taskModel.find()
return res.status(200).json({
    success:1,
    mesage:"all owners file",
    data:getAll
})
    }catch(error:any){
        return res.status(404).json({
            success:0,
            message:error.message
        })
    }
}



export const getSingleUser = async(req:Request,res:Response):Promise<Response>=>{
    try{
        const {id} = req.params
        const singleUser = await taskModel.findOne()
return res.status(200).json({
    success:1,
    message:"hotel owner data",
    data:singleUser
})
    }catch(error:any){
        return res.status(404).json({
            success:0,
            message:error.message
        })
    }
}



export const logOut = async(req:Request,res:Response):Promise<Response>=>{
    try{
res.clearCookie("sessionId")
return res.status(200).json({message:"log out successful"})
    }catch(error:any){
        return res.status(404).json({message:error.message})
    }
}



export const updateUser = async(req:Request, res:Response):Promise<Response>=>{
    try{
        
        const userUpdate = await taskModel.findByIdAndUpdate(req.params.id,req.body,{new:true})
return res.status(200).json({
    success:1,
    message:"data successfully updated"
})
    }catch(error:any){
        return res.status(500).json({
message:error.message
        })
    }
}



export const deleteUser = async (req:Request,res:Response):Promise<Response>=>{
    try{
        const deleteAccount = await taskModel.findByIdAndRemove(req.params.id)
return res.status(200).json({
    success:1,
    message:"account successfully deleted"
})
    }catch(error:any){
        return res.status(404).json({message:error.message})
    }
}

