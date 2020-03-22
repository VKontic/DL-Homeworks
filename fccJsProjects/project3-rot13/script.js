function rot13(str) {
	let alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
	let rot13 = "NOPQRSTUVWXYZABCDEFGHIJKLM";
	let decodedString = "";
	for (let i = 0; i<str.length; i++){
		if (rot13.indexOf(str[i]) == -1){
			decodedString += str[i];
		}else{
			decodedString += alphabet[rot13.indexOf(str[i])];
		}
	}
	return decodedString;
}

rot13("SERR PBQR PNZC"); //test passed
