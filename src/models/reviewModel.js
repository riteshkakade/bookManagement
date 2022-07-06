const { default: mongoose } = require("mongoose");
const objectId=mongoose.Schema.Types.ObjectId

const reviewSchema=new mongoose.Schema({
    bookId:{
        type:objectId,
        ref:"Book",
        required:true
    },
    reviewedBy:{
        type:String,
        required:true,
        default:"Guest",

    },
    reviewedAt:{
        type:Date,
        required:true
    },
    rating:{
        type:Number,
        required:true,
        min:1,
        max:5
    },
    review:{
        type:String,

    },
    isDeleted:{
        type:Boolean,
        default:false
    },
    deletedAt:{
        type:Date
    }

},{timestamps:true})

module.exports=mongoose.model("Review",reviewSchema)