let tabs = document.querySelectorAll('.tab');
let shortBreak = document.querySelector('.shortBreak');
let longBreak = document.querySelector('.longBreak');
let pomodoro = document.querySelector('.pomodoro');

let reset = document.querySelector('.reset');
let stop = document.querySelector('.stop');
let start = document.querySelector('.start');

let minutes = document.querySelector('.minutes');
let seconds = document.querySelector('.seconds');

var counter ;
let counterSet = false;

function resetTime(min, sec){
	clearInterval(counter);
	counterSet = false;
	minutes.innerText = min;
	seconds.innerText = sec;
}
function btnActiveClass(elem){
	tabs.forEach(function(x){
		x.classList.remove('active');
	})
	elem.classList.add('active');
}
shortBreak.addEventListener('click', function(e){
	resetTime("5", "00");
	btnActiveClass(e.target);
})

longBreak.addEventListener('click', function(e){
	resetTime("10", "00");
	btnActiveClass(e.target);
})

pomodoro.addEventListener('click', function(e){
	resetTime("25", "00");
	btnActiveClass(e.target);
})

start.addEventListener('click', function(){
	if (!counterSet){
		counter = setInterval(setTime, 1000);
		counterSet = true;
	}
})

function setTime(){
	counterSet = true;
	let sec = Number(seconds.innerText);
	let min = Number (minutes.innerText);
	sec > 0 ? seconds.innerText = sec-1 : seconds.innerText = 59;
	if (sec === 0){
		minutes.innerText = min - 1 ;
	}
	if (sec === 1 && min === 0){
		//play some sound
		clearInterval(counter);
		counterSet = false;
		new Audio('sounds/sound.mp3').play()
	}
}

stop.addEventListener('click', function(){
	clearInterval(counter);
	counterSet = false;
})
reset.addEventListener('click', function(){
	clearInterval(counter);
	counterSet = false;
	for (let i =0; i<tabs.length;i++){
		if (tabs[i].classList.contains('active')){
			let activeTabIndex = i;
			if (activeTabIndex ==0 ){
				resetTime("25", "00");
			}else if (activeTabIndex == 1){
				resetTime("5", "00")
			}else if(activeTabIndex == 2){
				resetTime("10", "00");
			}
			break;
		}
	}
})