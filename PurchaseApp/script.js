let productName = document.querySelector('.inputProductName');
let productDesc = document.querySelector('.inputProductDesc');
let productImg = document.querySelector('.inputProductImg');
let productPrice = document.querySelector('.inputProductPrice');
let btnAddProduct = document.querySelector('.btnAddProduct');
let listProducts = document.querySelector('.list-products');
let totalPrice = document.querySelector('b');
let modalContent = document.querySelector('.modalContent');
let modalImage = document.querySelector('.modalImage');
let modalProductInfo = document.querySelector('.modalProductInfo');
let closeModalBtn = document.querySelector('.closeModalBtn');
let shoppingCardProducts = document.querySelector('.shopping-cart-products');
let jsonUrl = 'https://jsonblob.com/api/b0cbdf1f-8157-11ea-acec-8b85d8e6a095' ;
let localJson = [];

closeModalBtn.addEventListener('click', closeModalWindow);
btnAddProduct.addEventListener('click', addProduct);
document.querySelector('.btnPurchase').addEventListener('click', openPurchaseModal);
document.querySelector('.btnClosePurchaseModal').addEventListener('click', closeModalWindow);

function addProduct(e){
	if (productName.value.trim() !== "" && productDesc.value.trim()!= "" && productImg.value.trim() != "" && productPrice.value.trim() != ""){
		e.preventDefault();

		let imgUrl= productImg.value;
		let name = productName.value;
		let description = productDesc.value.trim();
		let price = productPrice.value;
		clearForm();
		appendProductElem(name,imgUrl,description,price);

		let newProduct = { "name":name, "imgUrl":imgUrl, "description":description,"price":price, "inCard": false  };
		localJson.push(newProduct);
		updateJSON();

	}else{
		alert('Please fill out all fields')
	}
}

function clearForm(){
	productImg.value="";
	productName.value="";
	productDesc.value="";
	productPrice.value="";
}
async function updateJSON(){
	try {
		let response = await fetch('https://jsonblob.com/api/b0cbdf1f-8157-11ea-acec-8b85d8e6a095', {
			method: 'PUT',
				headers: {
	      	'Content-Type': 'application/json',
	      	"Accept": 'application/json'
	    	},
	    	body: JSON.stringify(localJson)
			});
		}
	catch(err) {
		alert(err); 
	}
}

function appendProductElem(name, imgUrl, description, price){
	let productItem = document.createElement('div');
	productItem.classList.add('product');

	let imgElem = document.createElement('img');
	imgElem.src = imgUrl;

	let nameElem = document.createElement('p');
	nameElem.innerText = name;
	
	let priceElem = document.createElement('p');
	priceElem.innerText = `$${price}`;

	let btn1 = createElem('btn', 'details-button', 'Details');
	btn1.addEventListener('click', ()=>openModal(name, imgUrl, description, price));

	let btn2 = createElem('btn', 'buy-button', 'Buy');
	btn2.addEventListener('click', addToShoppingCard);
	
	appendAll(productItem, [imgElem, nameElem, priceElem, btn1, btn2] );
	listProducts.appendChild(productItem);
}

function createElem (elem, className, text){
	let element = document.createElement(elem);
	element.className=className;
	if (text != undefined){
		element.innerText = text;
	}
	return element;
}

function appendAll(parentElement, arrayOfChilds){
	arrayOfChilds.forEach(child => parentElement.appendChild(child));
}

function openModal(name, img, desc, price){

	modalContent.classList.remove('modalFadeOut');
	modalImage.classList.remove('invisibleElement');
	modalProductInfo.classList.remove('invisibleElement');
	closeModalBtn.classList.remove('invisibleElement');

	modalImage.src=img;
	document.querySelector('.modalProductInfo h1').innerText = name;
	document.querySelector('.modalDesc').innerText = desc;
	document.querySelector('.modalPrice').innerText = `Price: ${price}$`;

	document.querySelector('.modal').style.display = "block";
}

function openPurchaseModal(){
	document.querySelector('.purchaseModalHeader').classList.remove('invisibleElement');
	document.querySelector('.purchaseModalBody').classList.remove('invisibleElement');
	document.querySelector('.purchaseModalFooter').classList.remove('invisibleElement');

	document.querySelector('.purchaseModalContent').classList.remove('modalFadeOut');
	document.querySelector('.purchaseModal').style.display="block";
}

function addToShoppingCard(e){
	let imgUrl = e.target.parentNode.children[0].src;
	let name = e.target.parentNode.children[1].innerText;
	let price = e.target.parentNode.children[2].innerText.substring(1);

	for (let i = 0; i <localJson.length; i++){
		if (name.trim().toLowerCase() == localJson[i].name.trim().toLowerCase()){
			if (localJson[i].inCard == false){
				//add product to third column only if it is not already there
				appendToShoppingCard(name, imgUrl, price, 'true');
				localJson[i].inCard = true;
				updateJSON();
				break;
			}else{
				alert("Product is already in shopping card!")
			}
		}
	}
}

function appendToShoppingCard(name, imgUrl, price, animation){

	let shoppingCardProduct = createElem('div', 'shopping-cart-product');
	let divProductInfo = createElem('div', 'product-info');
	let container = document.createElement('div');

	let img = document.createElement('img');
	img.src = imgUrl;

	let pPrice = document.createElement('p');
	pPrice.innerHTML = `$<span>${price}</span> &times; <span>1<span>`;

	let h3 = document.createElement('h3');
	h3.innerText = name;
	appendAll(container, [h3, pPrice]);
	appendAll(divProductInfo, [container, img]);
	
	let divProductCount = createElem('div',"product-count" );
	let btnDecrement = createElem('button', "btnDecrement", '-');
	btnDecrement.addEventListener('click', decrementAmount);
	let btnIncrement = createElem('button', "btnIncrement", '+');
	btnIncrement.addEventListener('click', incrementAmount);
	let spanAmount = document.createElement('span');
	spanAmount.innerText = 1;
	appendAll(divProductCount, [btnDecrement, spanAmount,  btnIncrement]);

	let newTotalPrice = Number(totalPrice.innerText.substring(1)) + Number(price);
	totalPrice.innerText = `$${newTotalPrice}`;

	appendAll(shoppingCardProduct, [divProductInfo, divProductCount]);
	if (animation == true){
		shoppingCardProduct.style.opacity = 0;
		shoppingCardProduct.classList.add('shopping-cart-FadeIn');
	}
	shoppingCardProducts.appendChild(shoppingCardProduct);
}

function incrementAmount(e){
	let currAmount = e.target.parentElement.children[1].innerText;
	if (currAmount<10){
		if(currAmount==9){
			e.target.parentElement.children[1].classList.add('countMax','animated', 'shake');
			setTimeout(x=>{
			let span = createElem('span','validationMessage', "Max number of items is 10!");
			e.target.parentElement.appendChild(span);
			},600);
		}
		let price = Number(e.target.parentElement.parentElement.children[0].children[0].children[1].children[0].innerText);
		let newTotalPrice = Number(totalPrice.innerText.substring(1))+price;
		totalPrice.innerText = `$${newTotalPrice}`;
		e.target.parentElement.children[1].innerText = Number(currAmount) + 1;
		e.target.parentElement.parentElement.children[0].children[0].children[1].children[1].innerText = Number(currAmount) + 1;
	}
}

function decrementAmount(e){
	let currAmount = e.target.parentElement.children[1].innerText;

	let price = Number(e.target.parentElement.parentElement.children[0].children[0].children[1].children[0].innerText);
	let newTotalPrice = Number(totalPrice.innerText.substring(1))-price;
	totalPrice.innerText = `$${newTotalPrice}`;
	if (currAmount>1){
		if (currAmount==10){
			e.target.parentElement.children[1].classList.remove('countMax', 'animated', 'shake');
			e.target.parentElement.lastChild.remove();
		}
		e.target.parentElement.children[1].innerText = Number(currAmount) - 1;
		e.target.parentElement.parentElement.children[0].children[0].children[1].children[1].innerText = Number(currAmount) - 1;
	}else{
		e.target.parentElement.parentElement.classList.add('shopingCardRemove');
		setTimeout(function(){
			e.target.parentElement.parentElement.remove();
		}, 600);
		let name = e.target.parentElement.parentElement.children[0].children[0].children[0].innerText;
		//and in json set inCard to false
		for (let i = 0; i<localJson.length; i++){
			if (localJson[i].name.trim().toLowerCase() == name.trim().toLowerCase()){
				localJson[i].inCard = false;
				updateJSON();
				break;
			}
		}
	}
}

function closeModalWindow(){

	closeModalBtn.classList.add('invisibleElement');
	modalImage.classList.add('invisibleElement');
	modalProductInfo.classList.add('invisibleElement');	

	document.querySelector('.purchaseModalHeader').classList.add('invisibleElement');
	document.querySelector('.purchaseModalBody').classList.add('invisibleElement');
	document.querySelector('.purchaseModalFooter').classList.add('invisibleElement');

	document.querySelector('.modalContent').classList.add('modalFadeOut');
	document.querySelector('.purchaseModalContent').classList.add('modalFadeOut');

	setTimeout(()=>{
		document.querySelector('.modal').style.display = 'none';
		document.querySelector('.purchaseModal').style.display='none';	
	}, 500)
}


(async function readJson(){
	try{
		let response = await fetch(jsonUrl, {
		headers:{'Content-Type': 'application/json'},
		});
		let json = await response.json();
		fillSecondColumn(json);
	}
	catch(err){
		alert(err);
	} 
})()

function fillSecondColumn(json){
	localJson = json;
	json.forEach(product => {
		let name = product.name;
		let imgUrl = product.imgUrl;
		let description = product.description;
		let price = product.price;
		let inCard = product.inCard;
		appendProductElem(name,imgUrl,description,price);

		if (inCard == true){
			 appendToShoppingCard(name, imgUrl, price, false);
		}
	})
}