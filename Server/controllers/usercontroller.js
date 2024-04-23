const userModel=require('../models/user')

//login callback
const logincontroller=async(req,res)=>{
    try{
        const {email,password}=req.body
       const user= await userModel.findOne({email,password})
       if(!user){
        res.tatus(404).send('user not found')
       }
       res.status(200).json({
        sucess:true,
        user,
       });
    }
    catch(error){
        res.status(400).json({
            sucess:false,
            error
        })
    }
}

//register callback
const registercontroller=async(req,res)=>{
    try{

        const newUser=new userModel(req.body)
        await newUser.save()
        res.status(201).json({
            sucess:true,
            newUser
        })

    }
    catch(error){
        res.status(400).json({
            sucess:false,
            error
        })
    }
}

module.exports={logincontroller,registercontroller};