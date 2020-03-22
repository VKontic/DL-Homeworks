function convertToRoman(num) {
  let numArr = [1,4,5,9,10,40,50,90,100,400,500,900,1000]; 
  let romanArr =[ "I","IV","V","IX","X","XL","L","XC","C","CD","D","CM","M"]; 
 let roman = "";

while(num>0){
    if (num>=1000){
        let a = Math.floor(num / 1000);
        for (let j = 0; j<a; j++){
	         roman += "M";
	         num = num % 1000;
     	} 
    }else{
 		for (let i = 0; i<numArr.length-1; i++){
     		if (num>=numArr[i] && num<numArr[i+1]){
			    let a = Math.floor(num/numArr[i]);
			    for (let j = 0; j<a; j++){
			        roman += romanArr[i];
			    }
			     num = num%numArr[i];
			}
 		}
   	}
}
console.log(roman);
return roman;
}

convertToRoman(901);
