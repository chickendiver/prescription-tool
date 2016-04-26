var sphereImage = document.querySelector('#mainImg');
var sphereImageFile = sphereImage.getAttribute('src');
var sphereTabDiv = document.querySelector('#sphereTab');
var pdTabDiv = document.querySelector('#pdTab');
var segmentTitle = document.querySelector('#sectionTitle');

var sphereVal = 0.00;
var pdVal = 60.00;
var maxVal = 20.00;
var minVal = -20.00;
var defaultVal = 0.00;
var stepVal = 0.01;

var mainImageArray = [];

var sphereImageArray = ["images/sphere0.png", "images/sphere1.png", 
                      "images/sphere2.png", "images/sphere3.png",
                      "images/sphere4.png", "images/sphere5.png",
                      "images/sphere6.png", "images/sphere7.png",
                      "images/sphere8.png"]; 

var pdImageArray = ["images/pd0.png", "images/pd1.png", 
                      "images/pd2.png", "images/pd3.png",
                      "images/pd4.png", "images/pd5.png",
                      "images/pd6.png", "images/pd7.png",
                      "images/pd8.png"];

var mainImageArray = sphereImageArray;
//var sphereButton = document.querySelector('button');
/*sphereButton.onclick = function() {
  getInputForSphere();
}*/


//Listens for activity on the Spherical tab
sphereTabDiv.style.cursor = 'pointer';
sphereTabDiv.onclick = function(){
  //alert('Clicked on sphere');
  $("#sectionTitle").text("Spherical");
  mainImageArray = sphereImageArray;
  maxVal = 20.00;
  minVal = -20.00;
  defaultVal = 0.00;
  stepVal = 0.01;
}
sphereTabDiv.onmouseover = function(){
  this.style.backgroundColor = 'red';
}
sphereTabDiv.onmouseout = function(){
  this.style.backgroundColor = 'white';
}

//Listens for activity on the Pupillary Distance tab
pdTabDiv.style.cursor = 'pointer';
pdTabDiv.onclick = function(){
  //alert('Clicked on pupillary distance');
  $("#sectionTitle").text("Pupillary Distance");
  mainImageArray = pdImageArray;
  maxVal = 80.00;
  minVal = 40.00;
  defaultVal = 60.00;
  stepVal = 0.01;
}
pdTabDiv.onmouseover = function(){
  this.style.backgroundColor = 'red';
}
pdTabDiv.onmouseout = function(){
  this.style.backgroundColor = 'white';
}

$("#slider").slider({
        orientation: "horizontal",
        range: false,
        min: minVal,
        max: maxVal,
        value: defaultVal,
        step: stepVal,
        animate: true,
        slide: function (event, ui) {
            //$("#sphere_text__field").val(ui.value);
            setValues(ui.value);
            chooseImage(ui.value);
            //$("#sphere_text").text(ui.value);
        }
    });

$("#sphere_text").change(function () {
    var sphereVal = this.value;
    if(isNumber(parseFloat(sphereVal))){
      console.log(sphereVal);
      $("#slider").slider("value", parseInt(sphereVal));
      $("#sphereTabVal").text(sphereVal);
      chooseImage(sphereVal);
    }
    else{
      console.log("NOT A NUMBER");
    }
});

function setValues(value){
  $("#sphere_text").val(value);
  $("#sphereTabVal").text(value);
}

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

function resetSlider(){
  //reset slider here
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