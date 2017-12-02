var heart = document.getElementById('heart');
for(var i = 0;i < 36;i++){
	var oDiv = document.createElement('div');
	oDiv.className = 'heart';
	oDiv.style.transform = "rotateY(" + i*10 + "deg) rotateZ(45deg) translateX(30px)";
	heart.appendChild(oDiv);
}