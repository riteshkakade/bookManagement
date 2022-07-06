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

const getBook=async function(req,res){
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
        res.status(200).send({status:true,message:"Books list",data:getbooks})
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