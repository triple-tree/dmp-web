const isIdCard = (idCard) =>{
  let regIdCard=/^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/;
  if(regIdCard.test(idCard)){
    if(idCard.length === 18){
      let idCardWi = new Array( 7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2 );
      let idCardY = new Array( 1, 0, 10, 9, 8, 7, 6, 5, 4, 3, 2 );
      let idCardWiSum = 0
      for(let i=0;i<17;i++){
        idCardWiSum+=idCard.substring(i,i+1)*idCardWi[i];
      }
      let idCardMod=idCardWiSum%11
      let idCardLast=idCard.substring(17)
      if(idCardMod === 2){
        if(idCardLast === "X"||idCardLast === "x"){
          return true;
        }else{
          //Vue.prototype.$message.warning('身份证号码错误!，请重新输入')
          return false;
        }
      }else{
        if(idCardLast === idCardY[idCardMod]){
          return true;
        }else{
          //Vue.prototype.$message.warning('身份证号码错误!，请重新输入')
          return false;
        }
      }
    }
  }else{
    //Vue.prototype.$message.warning('身份证格式不正确!，请重新输入')
    return false
  }
}

export default isIdCard