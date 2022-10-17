
if(localStorage.getItem('level4')){
	var level4 = localStorage.getItem('level4')
}
if(localStorage.getItem('level3')){
	var level3 = localStorage.getItem('level3')
}
if(localStorage.getItem('level2')){
	var level2 = localStorage.getItem('level2')
}
if(localStorage.getItem('level1')){
    var level1 = localStorage.getItem('level1')
}
document.querySelector('#cont4').innerText = level4 + "\n";
document.querySelector('#cont3').innerText = level3 + "\n";
document.querySelector('#cont1').innerText = level2 + "\n";
document.querySelector('#cont2').innerText = level1 + "\n";