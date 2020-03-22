function checkCashRegister(price, cash, cid) {

let cidChange = {}; //objekat koji vracamo
cidChange.status="OPEN";
cidChange.change = [];

let valueCourse = {
  "PENNY": 0.01,
  "NICKEL": 0.05,
  "DIME":0.1,
  "QUARTER": 0.25,
  "ONE": 1,
  "FIVE": 5,
  "TEN": 10,
  "TWENTY": 20,
  "ONE HUNDRED": 100
}
let cidEmpty = 0; //koristimo da provjerimo je li kasa stala prazna
let change = cash-price; //ukupan kusur

for (let i = cid.length-1; i>=0; i--){
	let cash = valueCourse[cid[i][0]]; //prevod iz "twenty" i slicno u numericku vrijednost

	if ( change >= cid[i][1] ){
		change = (change - cid[i][1]).toFixed(2);
		let a = [cid[i][0], cid[i][1]];
		cidChange.change.push(a);
	}else{
		let banknotesNumber = Math.floor(change / valueCourse[cid[i][0]]); 
		//banknotestNumber - //broj novcanica datog tipa koji cemo iskoristiti za vracanje kusura
		change = (change - ( banknotesNumber * valueCourse[cid[i][0]] ) ).toFixed(2);
		cidEmpty = 1; //kasa nije prazna
		if ( banknotesNumber * valueCourse[cid[i][0]] != 0){
			let a = [cid[i][0],  banknotesNumber * valueCourse[cid[i][0]] ];
			cidChange.change.push(a);
		}
	}
}
if (change > 0){
  cidChange.status = "INSUFFICIENT_FUNDS";
  cidChange.change = [];
}
else if (cidEmpty == 0){
	cidChange.status = "CLOSED";
	cidChange.change = [];
	cidChange.change = cid;
}
return cidChange;
}


checkCashRegister(19.5, 20, [["PENNY", 1.01], 
["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], 
["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]]);

checkCashRegister(3.26, 100, [["PENNY", 1.01], ["NICKEL", 2.05], 
	["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], 
	["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]]) ;

checkCashRegister(19.5, 20, [["PENNY", 0.01], ["NICKEL", 0],
 ["DIME", 0], ["QUARTER", 0], ["ONE", 1], ["FIVE", 0], 
	["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]]);

checkCashRegister(19.5, 20, [["PENNY", 0.5], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], 
	["ONE", 0], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]]);