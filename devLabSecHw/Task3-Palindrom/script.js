document.querySelector('.myButton').addEventListener('click', createFields);
let container = document.querySelector('.container');

function reportResult(result){
	let body = document.querySelector('body');
	//first, delete old message
	if (body.lastElementChild.classList.contains('resultMessage')){
		body.lastElementChild.remove();
	}
	let message = "String is palindrom!";
	if (!result){
		message = "String is not palindrom!"
	}
	let textEl = document.createElement('h2');
	textEl.innerText = message;
	textEl.classList = "resultMessage";
	body.appendChild(textEl);
}

function checkIfPalindrom(){
	let inputString = [...document.querySelectorAll('.field')].map(x => x.value)
	.map(x => x === "" ? "+" : x)
	.reduce((x, y) => x + y);

	let reverseString = "";
	for (let i = inputString.length - 1; i >= 0; i--) {
	    reverseString += inputString[i];
	}
	reverseString === inputString ? reportResult(true) : reportResult(false);
}

function createFields(){
  //first, delete all contaiter childs - clear all
 container.innerHTML = "";

 let fieldNumber = Number(document.querySelector('#charNumber').value);
 if (fieldNumber>0 && fieldNumber<=15){
	let container = document.querySelector('.container');
 	for (let i=0; i<fieldNumber; i++){
 		(function(){
 			createSingleField();
 		})();
 	}
 	let plus = document.createElement('i');
 	plus.classList = "fas fa-plus-circle";
 	container.appendChild(plus);
 	document.querySelector('.fa-plus-circle').addEventListener('click', function(){
 		createSingleField();
 		checkIfPalindrom();
 	});

 }else{
 	alert("You should enter number beetween 1 and 15!");
 	let fieldNumber = document.querySelector('#charNumber').value = "";
 }
}


function createSingleField(){
	if (container.childElementCount <= 15){
		let div = document.createElement('div');
		div.classList="wrapper";
		let singleField = document.createElement('input');
	 	singleField.type="text";
		singleField.classList = "field";
		singleField.maxLength = 1;

		singleField.addEventListener('input', function(){
			
			if (! /^$|^[a-zA-Z0-9\s]/.test(singleField.value)){
				let errorSpan = document.createElement('span');
				errorSpan.innerText = "bad input!";
				errorSpan.classList = "errorMessage";
				singleField.parentElement.appendChild(errorSpan);
				if (document.querySelector('body').lastElementChild.classList.contains('resultMessage')){
					document.querySelector('body').lastElementChild.remove(); //remove messagea "It is (not) palindrom"
				}
			}else{
				//here we have valid input in field
				if (singleField.parentElement.childElementCount === 3){
					singleField.parentElement.lastElementChild.remove();
					//remove error message if exists
				}
				//check if it is palindrom
				checkIfPalindrom();
			}

		})
		let minus = document.createElement('i');
	 	minus.classList = "fas fa-minus-circle";
	 	minus.addEventListener('click', function(e){
	 		e.target.parentElement.remove() //clik on minus button delete parent element
			document.querySelector('.wrapper') !== null ? checkIfPalindrom() : document.querySelector('body').lastElementChild.remove();
		    //after deleting one field check if string is palindrom now, but only if it was not last item
	 	});
	 	div.appendChild(singleField);
	 	div.appendChild(minus);
	 	//container.appendChild(div);
	 	container.insertBefore(div, container.childNodes[container.childNodes.length-1]);
	}else{
		alert("Maximum number of fields is 15!");
	}
}
