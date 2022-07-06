const isValid = function (value) {
    if (typeof value == "undefined" || value == null) return false;
    if (typeof value == "string" && value.trim().length == 0) return false;
    else if (typeof value == "string") return true;
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
  
  const isValidUser = function (intern) {
    return /^[a-zA-Z ]{2,30}$/.test(intern);
  };
  

  const isValidTitle=function(title){
      return ['Mr','Mrs','Miss'].indexOf(title)!=-1
  }

  const checkPassword=function(password){
      let len=password.length
      if(len>8&&len<15){
          return true
      }
      return false
  }
  const extraspace=function(value){
    const res=value.split(" ").filter(word=>word).join(" ")
    return res
}
  module.exports = {
    isValid,
    isValidName,
    isValidRequest,
    isValidMail,
    isValidMobile,
    isValidUser,
    isValidTitle,
    checkPassword
  };