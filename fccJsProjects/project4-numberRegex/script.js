function telephoneCheck(str) {
   let reg = /^(1\s?)?(\d{3}|\(\d{3}\))[\s\-]?\d{3}[\s\-]?\d{4}$/;
   return reg.test(str);
}
telephoneCheck("1 555-555-5555"); //test
