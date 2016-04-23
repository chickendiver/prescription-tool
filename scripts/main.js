
var sphereVal = 0;
var sphereImage = document.querySelector('img');
var sphereImageFile = sphereImage.getAttribute('src');
//var sphereButton = document.querySelector('button');
/*sphereButton.onclick = function() {
  getInputForSphere();
}*/

$("#slider").slider({
        orientation: "horizontal",
        range: false,
        min: -20.00,
        max: 20.00,
        value: 0,
        step: .001,
        animate: true,
        slide: function (event, ui) {
            //$("#sphere_text__field").val(ui.value);
            $("#sphere_text").val(ui.value);
            chooseImage(ui.value);
            //$("#sphere_text").text(ui.value);
        }
    });

$("#sphere_text").change(function () {
    var sphereVal = this.value;
    if(isNumber(parseFloat(sphereVal))){
      console.log(sphereVal);
      $("#slider").slider("value", parseInt(sphereVal));
      chooseImage(sphereVal);
    }
    else{
      console.log("NOT A NUMBER");
    }
});

function getSphereValue(){
	sphereVal = localStorage.getItem('sphere');
}

function getInputForSphere(){
	sphereVal = prompt('Please enter a sphere value');
  	localStorage.setItem('sphere', sphereVal);
  	isNumber(parseFloat(sphereVal));
  	chooseImage(sphereVal);
}

function isNumber(numToCheck){
	return true
}

function chooseImage(sphereNum){
	if ((parseFloat(sphereNum) >= -20.00) & (parseFloat(sphereNum) <= -0.005)){
		sphereImageFile = "images/sphere_image_1.jpg";
		//alert("Your eyes are myopic (nearsighted)!");
	}
	else if ((parseFloat(sphereNum) >= 0.005) & (parseFloat(sphereNum) <= 20.00)){
		sphereImageFile = "images/sphere_image_2.jpg";
		//alert("Your eyes are hyperopic (farsighted)!");
	}
	else if ((parseFloat(sphereNum) > -0.005) & (parseFloat(sphereNum) < 0.005)){
		sphereImageFile = "images/sphere_image_3.jpg";
		//alert("You have normal vision!");
	}

	sphereImage.setAttribute('src', sphereImageFile);
}