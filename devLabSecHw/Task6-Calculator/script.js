let numBtns = document.querySelectorAll ('.numBtns');
let operatorsElements = document.querySelectorAll(".operator");
let inputField = document.querySelector('input');
let deleteBtn = document.querySelector('.delete'); //DOUBLE CLICK to clear ALL
let operatorsAndDot = ['+', '-', '*', '', '.'];

numBtns.forEach(function(x){
x.addEventListener('click',function(){
	inputField.value = inputField.value + x.innerText;
} );
})

operatorsElements.forEach(function(x){
x.addEventListener('click',function(){
	if ( (operatorsAndDot.indexOf(inputField.value[inputField.value.length-1]) == -1)  && (inputField.value !== "" || x.innerText == "-" )){
		//two operators one after another is not allowed
		//also operator at the begining is not allowed except for minus
		inputField.value = inputField.value + x.innerText;
	}
} );
})

document.querySelector('.dot').addEventListener('click', function(){
	if ( operatorsAndDot.indexOf(inputField.value[inputField.value.length-1]) == -1 && inputField.value !== "" && dotInNumber(inputField.value) ){
	inputField.value = inputField.value + '.';
	}
})

function dotInNumber(ex){
	let operators = ['+', '-',''/'*'];
	for (let i = ex.length-1; i>=0; i--){
		if ( operators.indexOf(ex[i]) > -1 ){
			return true;
		}
		if (ex[i] === '.'){
			return false;
		}
	}
	return true;
}

deleteBtn.addEventListener('click', function(){
	if (inputField.value != ""){
		inputField.value = inputField.value.substring(0,inputField.value.length-1);
	}
})

document.querySelector('.equal').addEventListener('click', function(){
	//validation to be sure that expr doesnt end with operator or dot
	if (inputField.value !=="" && operatorsAndDot.indexOf(inputField.value[inputField.value.length-1]) == -1 ){
		try{
			let result = eval(inputField.value).toFixed(2);
		inputField.value = result;
		}
		catch{
			alert("Wrong expression format!")
			inputField.value = "";
		}
	}
})

deleteBtn.addEventListener('dblclick', function(){
	inputField.value = "";
})