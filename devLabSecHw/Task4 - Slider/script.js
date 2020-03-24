let container = document.querySelector('.container');
let allImages = document.querySelectorAll('img');
let nextBtn = document.querySelector('.fa-chevron-right');
let leftBtn = document.querySelector('.fa-chevron-left');
let close = document.querySelector('#close'); 

leftBtn.addEventListener('click', showImageBefore);
nextBtn.addEventListener('click', showImageAfter);
mouseOverContainer = false;

let index = 0;
showImage(index);

function showImage(index){
	allImages.forEach(function(item){item.style.display = "none";});
	//display:none for every image except image with passed index
	allImages[index].style.display = 'block';
}

function showImageBefore(){
//first find index of image which is currently displayed
	let curIndex = -1;
	for (let i=0; i<[...allImages].length; i++){
		if ([...allImages][i].style.display == "block"){
			curIndex = i;
			break;
		}};
	let newIndex = curIndex-1;
	if (curIndex === 0){
		newIndex = allImages.length - 1;
	}
	showImage(newIndex);
}

function showImageAfter(){
	let curIndex = -1;
	for (let i=0; i<[...allImages].length; i++){
		if ([...allImages][i].style.display == "block"){
			curIndex = i;
			break;
		}};
	let newIndex = curIndex+1;
	if (curIndex === allImages.length-1){
		newIndex = 0;
	}
	showImage(newIndex);
}

container.addEventListener('mouseenter', function(){
	mouseOverContainer = true;
})
container.addEventListener('mouseleave', function(){
mouseOverContainer = false;
})

document.addEventListener('keydown', function(e){
if (mouseOverContainer){ //
	if (e.keyCode == 37){
	 	showImageBefore();
	}else if (e.keyCode == 39){
	 	showImageAfter();
	}
}
})

for (let i = 0 ; i <[...allImages].length; i++){
	(function(){
		[...allImages][i].addEventListener('click', imageExpand);
	})();
	
}

function imageExpand(e){
	close.style.display='block'; //show x button on top right//show x button on top right
	container.style.width= "initial";
	allImages.forEach(function(x){x.classList="expand"});
	// e.target.classList = "expand";
	close.addEventListener('click', imageShrink)
}

function imageShrink(){
	close.style.display ='none';
	container.style.width = '65vw';
	allImages.forEach(function(x){x.classList.remove("expand")});
}