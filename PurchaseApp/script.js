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

closeModalBtn.addEventListener('click', closeModalWindow);
btnAddProduct.addEventListener('click', addProduct);
document.querySelector('.btnPurchase').addEventListener('click', openPurchaseModal);
document.querySelector('.btnClosePurchaseModal').addEventListener('click', closeModalWindow);

function addProduct(e){
	if (productName.value.trim() !== "" && productDesc.value.trim()!= "" && productImg.value.trim() != "" && productPrice.value.trim() != ""){
		e.preventDefault();
		let productItem = document.createElement('div');
		productItem.classList.add('product');

		let img = document.createElement('img');
		img.src = productImg.value;

		let name = document.createElement('p');
		name.innerText =productName.value;
		let desc = productDesc.value.trim();
		
		let price = document.createElement('p');
		price.innerText = `$${productPrice.value}`;

		let btn1 = createElem('btn', 'details-button', 'Details');
		btn1.addEventListener('click', ()=>openModal(productName.value, productImg.value, productDesc.value.trim(), productPrice.value));

		let btn2 = createElem('btn', 'buy-button', 'Buy');
		btn2.addEventListener('click', addToShoppingCard);

		appendAll(productItem, [img, name, price, btn1, btn2] );
		listProducts.appendChild(productItem);
	}else{
		alert('Please fill out all fields')
	}
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
	console.log('test');
	let shoppingCardProduct = createElem('div', 'shopping-cart-product');
	let divProductInfo = createElem('div', 'product-info');
	let container = document.createElement('div');

	let imgPath = e.target.parentNode.children[0].src;
	let img = document.createElement('img');
	img.src = imgPath;

	let name = e.target.parentNode.children[1].innerText;
	let price = e.target.parentNode.children[2].innerText.substring(1);
	console.log("price " + price);
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

	appendAll(shoppingCardProduct, [divProductInfo, divProductCount]);
	shoppingCardProduct.style.opacity = 0;
	shoppingCardProducts.appendChild(shoppingCardProduct);
	shoppingCardProduct.classList.add('shopping-cart-FadeIn');
}

function decrementAmount(e){

}
function incrementAmount(e){
	let currAmount = e.target.parentElement.children[1].innerText;
	if (currAmount<10){
		let price = Number(e.target.parentElement.parentElement.children[0].children[0].children[1].children[0].innerText);
		let newTotalPrice = Number(totalPrice.innerText.substring(1))+price;
		totalPrice.innerText = `$${newTotalPrice}`;
		e.target.parentElement.children[1].innerText = Number(currAmount) + 1;
		e.target.parentElement.parentElement.children[0].children[0].children[1].children[1].innerText = Number(currAmount) + 1;
	}
}

function decrementAmount(e){
	let currAmount = e.target.parentElement.children[1].innerText;
	if (currAmount>1){
		let price = Number(e.target.parentElement.parentElement.children[0].children[0].children[1].children[0].innerText);
		let newTotalPrice = Number(totalPrice.innerText.substring(1))-price;
		totalPrice.innerText = `$${newTotalPrice}`;
		e.target.parentElement.children[1].innerText = Number(currAmount) - 1;
		e.target.parentElement.parentElement.children[0].children[0].children[1].children[1].innerText = Number(currAmount) - 1;
	}else{
		e.target.parentElement.parentElement.classList.add('shopingCardRemove');
		setTimeout(function(){
			e.target.parentElement.parentElement.remove();
		}, 600);
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
