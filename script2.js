var r1 = 'X';
var r2 = 'X';
var r3 = 'X';
var r4 = 'X';
var r5 = 'X';

if(localStorage.getItem('s1') == 20){
	r1 = 'O';
}
if(localStorage.getItem('s2') == 20){
	r2 = 'O';
}
if(localStorage.getItem('s3') == 20){
	r3 = 'O';
}
if(localStorage.getItem('s4') == 20){
	r4 = 'O';
}
if(localStorage.getItem('s5') == 20){
	r5 = 'O';
}

document.querySelector('#ox1').innerText = "......... " + r1;
document.querySelector('#ox2').innerText = "......... " + r2;
document.querySelector('#ox3').innerText = "......... " + r3;
document.querySelector('#ox4').innerText = "......... " + r4;
document.querySelector('#ox5').innerText = "......... " + r5;