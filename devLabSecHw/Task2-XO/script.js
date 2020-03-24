let curPlayer = "X";
let curState = ["", "", "", "", "", "", "", "", ""];

let fields = document.querySelectorAll('td');
for (let i = 0; i <fields.length; i++){
	(function(){
		fields[i].addEventListener ('click', cellClick)
	})()
}

function changePlayer(){
	if (curPlayer === "X"){
		curPlayer = "O";
	}else{
		curPlayer = "X";
	}
}

function cellClick(e){
	let cellIndex = e.currentTarget.cellIndex + (e.currentTarget.parentElement.rowIndex*3);
	//cellIndex - 0,1,2...,8
	if (curState[cellIndex] !== ""){
		alert("Polje je vec popunjeno!");
	}else{
		curState[cellIndex] = curPlayer; //update current game state
		if (curPlayer === "X"){
			e.currentTarget.innerHTML = "<i class='fas fa-times'></i>"
		}else{
			e.currentTarget.innerHTML = "<i class='far fa-circle'></i>"
		}
		setTimeout(function(){
		checkResult()}, 10);
	}
}

function checkResult(){
	for (let i = 0; i<=6; i+=3){
		if ( (curState[i] === curState[i+1] && curState[i+1] === curState[i+2]) && curState[i]!==""){
			alert("Player " +curPlayer + " won the game!");
			clearBoard();
			return;
		}
	}
	for (let i = 0; i<=2; i++){
		if ( (curState[i] === curState[i+3] && curState[i+3] === curState[i+6]) && curState[i]!==""){
			alert("Player " +curPlayer + " won the game!");
			clearBoard();
			return;
		}
	}
	if ( ((curState[0] === curState[4] && curState[4]=== curState[8]) | 
		(curState[2] === curState[4] && curState[4] === curState[6])) && curState[4]!=="" ){
		alert("Player " +curPlayer + " won the game!");
			clearBoard();
			return;
	}
	if (!curState.includes("")){
		alert("No winner, draw!");
			clearBoard();
			return;
	}
	changePlayer();
}

function clearBoard(){
	curPlayer = "X";
	curState = ["", "", "", "", "", "", "", "", ""];
	fields.forEach( item=>item.innerHTML="");
}