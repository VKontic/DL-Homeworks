function palindrome(str) {
  let anStrig = str.trim().toLowerCase().replace(/[^a-z0-9]/ig, ''); 
  //an string - sadrzi samo alfanumericke znake, trimovan i sadrzi samo mala slova
  console.log(anStrig);

let reverseString = "";
for (let i = anStrig.length-1; i>=0; i--){
  reverseString += anStrig[i];
}

if (anStrig === reverseString){
  return true;
}
return false;
}

palindrome("RAtwewd fe43r f@#R%23523 "); //test