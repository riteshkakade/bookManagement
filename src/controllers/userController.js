//const { is } = require("express/lib/request")
const user=require("../models/userModel")
const {isValid, 
    isValidName,
    isValidRequest,
    isValidMail,
    isValidMobile,
    isValidUser,
isValidTitle,
checkPassword}=require("../validator/validator")

const registerUser=async function(req,res){
    try{
         const data=req.body
        if(!isValidRequest(data)){
            return res.status(400).send({status:false,message:"please enter a valid input"})
        }

        //extracting params
        let {title,name,phone,email,password,address}=data
        const newuser={}

        //validation starts
        if(!isValid(title)){
            return res.status(400).send({status:false,message:"Title is required"})
        }

        console.log(!isValidTitle(title))

        if(!isValidTitle(title)){
            return res.status(400).send({status:false,message:"Title must be among [Mr,Mrs,Miss]"})
        }

        newuser.title=title

        if(!isValid(name)){
            return res.status(400).send({status:false,message:"name is required"})
        }

        if(!isValidUser(name)){
            return res.status(400).send({status:false,message:"Please enter a valid name"})
        }

        newuser.name=name

        if(!isValid(phone)){
            return res.status(400).send({status:false,message:"phone is required"})
        }

        if(!isValidMobile(phone)){
            return res.status(400).send({status:false,message:"Please enter a valid indian phone number"})
        }

        if(!isValid(email)){
            return res.status(400).send({status:false,message:"email is required"})
        }

        if(!isValidMail(email)){
            return res.status(400).send({status:false,message:"Please enter a valid email"})
        }

        const {...ifAlreadyExist}=await user.findOne({$or: [{ email: email }, { phone: phone }]})
        console.log(ifAlreadyExist)



        if(ifAlreadyExist){
            return res.status(400).send({status:false,message:"Email or Phone number already in use"})
        }

        newuser.email=email
        newuser.phone=phone

        if(!isValid(password)){
            return res.status(400).send({status:false,message:"email is required"})
        }

        if(!checkPassword(password)){
            return res.status(400).send({status:false,message:"password length should be between 8-15 characters"})
        }

        newuser.password=password

        // if(isValid(address)){
        //      if(isValid(address.street)||isValid(address.city)||isValid(address.pincode))
            newuser.address=address

        //}
        //valdation ends

        const newUser=await user.create(data)
        res.status(201).send({status:true,message:"sucess",data:newUser})


    }
    catch(err){
        res.status(500).send({status:false,message:err.message})
    }
}

const login=async function(req,res){
    try{
        let data=req.data
        let 
    }
    catch(err){
        res.status(500).send({status:false,message:err.message})
    }

}
module.exports={registerUser,login}