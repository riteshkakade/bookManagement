const mongoose=require("mongoose")
const isValid = function (value) {
    if (typeof value == "undefined" || value == null) return false;
    if (typeof value == "string" && value.trim().length == 0) return false;
    if (typeof value !== "string") return false;
    return true;
  };

  const isValidName = function (name) {
    return /^[A-Za-z]+$/.test(name);
  };
  
  const isValidRequest = function (data) {
    if (Object.keys(data).length == 0) return false;
    return true;
  };
  
  const isValidMail = function (v) {
    return /^([0-9a-z]([-_\\.]*[0-9a-z]+)*)@([a-z]([-_\\.]*[a-z]+)*)[\\.]([a-z]{2,9})+$/.test(v);
  };
  
  const isValidMobile = function (num) {
    return /^[6789]\d{9}$/.test(num);
  };
  
  const isValidUser = function (user) {
    return /^[a-zA-Z ]{2,30}$/.test(user);
  };
  
  const isValidISBN = function (ISBN){
    return /^(?=(?:\D*\d){10}(?:(?:\D*\d){3})?$)[\d-]+$/.test(ISBN);
  };

  const isValidTitle=function(title){
      return ['Mr','Mrs','Miss'].indexOf(title)!=-1
  }

  const checkPassword=function(password){
      let len=password.length
      if(8 <= len && 15 >= len){
          return true
      }
      return false
  }
  const extraspace=function(value){
    const res=value.split(" ").filter(word=>word).join(" ")
    return res
}

const isValidObjectId = function (objectId) {
    return mongoose.Types.ObjectId.isValid(objectId)
}
  module.exports = {
    isValid,
    isValidName,
    isValidRequest,
    isValidMail,
    isValidMobile,
    isValidISBN,
    isValidUser,
    isValidTitle,
    checkPassword,
    extraspace,
    isValidObjectId
  };