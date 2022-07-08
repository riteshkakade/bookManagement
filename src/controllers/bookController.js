const book=require("../models/bookModel")
const user=require("../models/userModel")
const review=require("../models/reviewModel")
const jwt=require("jsonwebtoken")
const {isValid, 
    isValidName,
    isValidRequest,
    isValidMail,
    isValidMobile,
    isValidUser,
isValidTitle,
checkPassword,
isValidObjectId,
extraspace,
isValidISBN,
checkarray,
isValidDate}=require("../validator/validator")
const { type } = require("express/lib/response")




const createBook = async function(req, res) {
    try {
        const data = req.body;

        if (!isValidRequest(data)) {
            return res.status(400).send({ status: false, message: "please enter a valid input" })
        }

        //extracting params
        let { title, excerpt, userId, ISBN, category, subcategory, reviews, releasedAt } = data
        let newBook={}
        newBook.userId=userId


         //validating title
        if (!isValid(title)) {
            return res.status(400).send({ status: false, message: "Title is required" })
        }

        let isTitleAlreadyExist=await book.findOne({title:title,isDeleted:false})
        if(isTitleAlreadyExist){
            return res.status(409).send({ status: false, message: "book with this title already exist" }) 
        }
        title=extraspace(title)
        newBook.title=title

        //validating excerpt
        if (!isValid(excerpt)) {
            return res.status(400).send({ status: false, message: "excerpt is required" })
        }
        excerpt=extraspace(excerpt)
        newBook.excerpt=excerpt

       //validating ISBN
        if(!isValid(ISBN)){
            return res.status(400).send({status:false,message:"ISBN is required!"})
        }

        if(!isValidISBN(ISBN)){
            return res.status(400).send({status:false,message:"invalid ISBN code"})   
        }

        let isISBNAlreadyExist=await book.findOne({ISBN:ISBN,isDeleted:false})
        if(isISBNAlreadyExist){
            return res.status(409).send({ status: false, message: "book with this ISBN code already exist" }) 
        }
        newBook.ISBN=ISBN


        //validating category
        if(!isValid(category)){
            return res.status(400).send({status:false,message:"category is required!"})
        }

        newBook.category=category

        //validating subcategory
    
           
       if(Array.isArray(subcategory)){
           let result=checkarray(subcategory)
           if(result!=true){
            return res.status(400).send({status:false,message:result})
           }
       }   
       
       if(typeof(subcategory)=="string"){
       if(!isValid(subcategory))
        return res.status(400).send({status:false,message:"subcategory is required!"})
       }

       newBook.subcategory=subcategory

       if(reviews){
        return res.status(400).send({status:false,message:"you cannot set reviews"})
       }

       //validating releasedAt
       if(!releasedAt){
        return res.status(400).send({status:false,message:"releasedAt field  is required!"})
       }
       
       if(!isValidDate(releasedAt)){
        return res.status(400).send({status:false,message:"Date should be in this format(YYYY-MM-DD)"})
       }
       newBook.releasedAt=releasedAt

       //Creating book
        const newbook = await book.create(newBook)
        res.status(201).send({status : true,message:"success",data : newbook})
    } catch (error) {
        res.status(500).send({status : false,message : error.message})
    }
}



const getBooks=async function(req,res){
    try{
        const data=req.query
        let {userId,category,subcategory}=data
        const filter={}
        filter.isDeleted=false
        if(!isValidRequest(data)){
            const getbooks=await book.find(filter).select({_id:1,title:1,excerpt:1,userId:1,
                category:1,reviews:1,releasedAt:1}).sort({title:1})
            if(getbooks.length==0){
                return res.status(404).send({status:false,message:"No books found"})
            }
           return  res.status(200).send({status:true,message:"Books list",data:getbooks})

        }
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
    }}

const getBookById=async function(req,res){
    try{
        let bookId=req.params.bookId
        const bookdetail=await book.findOne({_id:bookId,isDeleted:false})
        if(!bookdetail){
            return res.status(404).send({status:false,message:"No books found"}) 
        }
        const reviews=await review.find({bookId:bookId,isDeleted:false})
        
        bookdetail._doc["reviewsData"]=reviews
        res.status(200).send({status:true,message:"Books list",data:bookdetail})

    }
    catch(err){
        res.status(500).send({status:false,message:err.message})
    }
}



const updateBookById = async (req, res) => {
    try {
        const bookId = req.params.bookId
        const condition = req.body
        if(!isValidRequest(condition)){
            return res.status(400).send({ status: false, message: "please enter a valid input" })
        }

        let {title,excerpt,releasedAt,ISBN}=condition//extracting parms
        let update={}
        
        //validation starts
        if(title){
            if(title.trim()==0){
                return res.status(400).send({ status: false, message: "please send some value in title to update" })
            }
            let isTitleAlreadyExist=await book.findOne({title:title,isDeleted:false})
            if(isTitleAlreadyExist){
                return res.status(409).send({ status: false, message: "book with this title already exist" }) 
            }
            title=extraspace(title)
            update.title=title
          }

          if(excerpt){
              if(excerpt.trim()==0){
                return res.status(400).send({ status: false, message: "please send some value in excerpt to update" })   
              }
              excerpt=extraspace(excerpt)
              update.excerpt=excerpt
          }

          if(releasedAt){
            if(!isValidDate(releasedAt)){
                return res.status(400).send({status:false,message:"Date should be in this format(YYYY-MM-DD)"})
               }
              update.releasedAt=releasedAt
            }

            if(ISBN){
                if(!isValidISBN(ISBN)){
                    return res.status(400).send({status:false,message:"invalid ISBN code"})
                }
                update.ISBN=ISBN
            }
            //validation ends
        const data = await book.findOneAndUpdate({_id : bookId, isDeleted : false}, update, {new : true})
        res.status(200).send({status : true,message:"success",data : data})
    } 
    catch (error) {
        res.status(500).send({status : false,message : error.message})
    }
}

const deleteBookById = async function(req, res) {
    try {
        
        const bookId = req.params.bookId
         
        
        const deletedbook = await book.findOneAndUpdate({_id : bookId, isDeleted : false}, {isDeleted : true}, {new : true})
        if(deletedbook){
            res.status(200).send({status : true,
            message : "Data Deleted Successfully"})
        }
        else{
            res.status(404).send({status : true,
            message : "No Data with this book Id Found"})
        }

    } catch (error) {
        res.status(500).send({status : false,
        message: error.message}) 
    }
}
module.exports={createBook,getBooks,getBookById,updateBookById,deleteBookById}