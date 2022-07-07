const book=require("../models/bookModel")
const user=require("../models/userModel")
const review=require("../models/reviewModel")
const {isValid, 
    isValidName,
    isValidRequest,
    isValidMail,
    isValidMobile,
    isValidUser,
isValidTitle,
checkPassword,
isValidObjectId}=require("../validator/validator")


const bookModel = require('../model/bookModel')
const reviewModel = require('../model/reviewModel')
const { validate } = require("../models/userModel")

const createBook = async (req, res) => {
    try {
        const data = req.body;

        if (!isValidRequest(data)) {
            return res.status(400).send({ status: false, message: "please enter a valid input" })
        }
        let { title, excerpt, userId, ISBN, category, subcategory, reviews, releasedAt } = req.body

        if (!isValid(title)) {
            return res.status(400).send({ status: false, message: "Title is required" })
        }

        if (!isValid(excerpt)) {
            return res.status(400).send({ status: false, message: "excerpt is required" })
        }

        if (!validate.isValid(userId)){
            return res.status(400).send({status:false,message:"userId is required!"})
        }


        if(!validate.isValidObjectId(userId)) {
        return res.status(400).send({status:false,message:"invalid userId"})
        }

        const userExist = await user.findById(userId)
        if (!userExist) {
            return res.status(404).send({status:false,message:"user not found! please check userId"})
        }


        const newBook = await bookModel.create(data)
        res.status(201).send({status : true,
        data : newBook})
    } catch (error) {
        res.status(500).send({status : false,
        Error : error})
    }
}

module.exports.createBook = createBook

const getBooks=async function(req,res){
    try{
        const data=req.query
        let {userId,category,subcategory}=data
        const filter={}
        filter.isDeleted=false
        if(isValid(userId)){
            if(!isValidObjectId(userId)){
                return res.status(400).send({status:false,message:"Invalid user Id"})
            }
           let  validuser=await user.findById(userId)
            if(!validuser){
                return res.status(404).send({status:false,message:"user with this Id not found"})
            }
            filter.userId=userId

        }
        if(isValid(category)){
            filter.category=category
        }
        if(isValid(subcategory)){
            filter.subcategory=subcategory
        }

        const getbooks=await book.find(filter).select({_id:1,title:1,excerpt:1,userId:1,
            category:1,reviews:1,releasedAt:1}).sort({title:1})
        if(getbooks.length==0){
            return res.status(404).send({status:false,message:"No books found"})
        }
        res.status(200).send({status:true,message:"Books list",data:getBooks})
     }
    catch(err){
        res.status(500).send({status:false,message:err.message})
    }
}

const getBookById=async function(req,res){
    try{
        let bookId=req.params.bookId
        const bookdetail=await book.findOne({_id:bookId,isDeleted:false})
        if(!bookdetail){
            return res.status(404).send({status:false,message:"No books found"}) 
        }
        const {...reviews}=await review.find({bookId:bookId,isDeleted:false})
        
        bookdetail._doc["reviewsData"]=reviews
        res.status(200).send({status:true,message:"Books list",data:bookdetail})

    }
    catch(err){
        res.status(500).send({status:false,message:err.message})
    }
}