var mainImage = document.querySelector('#mainImg');
var sphereImageFile = mainImage.getAttribute('src');
var sphereTabDiv = document.querySelector('#sphereTab');
var pdTabDiv = document.querySelector('#pdTab');
var segmentTitle = document.querySelector('#sectionTitle');

var sphereVal = 0.00;
var pdVal = 60.00;
var maxVal = 20.00;
var minVal = -20.00;
var defaultVal = 0.00;
var stepVal = 0.01;
var currentVal = 0;

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
  setValues(sphereVal);
  chooseImage(sphereVal);
  resetSlider();
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
  setValues(pdVal);
  chooseImage(pdVal);
  resetSlider();
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
        value: currentVal,
        step: stepVal,
        animate: true,
        slide: function (event, ui) {
            //$("#sphere_text__field").val(ui.value);
            setValues(ui.value);
            chooseImage(ui.value);
            //$("#sphere_text").text(ui.value);
        }
    });

$("#main_text").change(function () {
    var changedValue = this.value;
    if(isNumber(parseFloat(changedValue))){
      console.log(changedValue);
      $("#slider").slider("value", parseInt(changedValue));
      setValues(changedValue);
      chooseImage(changedValue);
    }
    else{
      console.log("NOT A NUMBER");
    }
});

function setValues(value){
  if($("#sectionTitle").text() == "Spherical") {
    sphereVal = value;
    currentVal = sphereVal;
    $("#main_text").val(value);
    $("#sphereTabVal").text(value);
  }
  else if($("#sectionTitle").text() == "Pupillary Distance") {
    pdVal = value;
    currentVal = pdVal;
    $("#main_text").val(value);
    $("#pdTabVal").text(value);
  }
  
}

/*
function getSphereValue(){
	sphereVal = localStorage.getItem('sphere');
}*/

function getInputForSphere(){
	sphereVal = prompt('Please enter a sphere value');
  	localStorage.setItem('sphere', sphereVal);
  	isNumber(parseFloat(sphereVal));
  	chooseImage(sphereVal);
}

function isNumber(numToCheck){
  //TODO: Make this actually check if the value is a number
	return true
}

function resetSlider(){
  $("#slider").slider({
        orientation: "horizontal",
        range: false,
        min: minVal,
        max: maxVal,
        value: currentVal,
        step: stepVal,
        animate: true,
        slide: function (event, ui) {
            //$("#sphere_text__field").val(ui.value);
            setValues(ui.value);
            chooseImage(ui.value);
            //$("#sphere_text").text(ui.value);
        }
    });
}

//TODO: Refactor to be more efficient
function getValueIndex(value){
  var imgChangeThreshold = 5;
  var valueIndex = 4;
  if (value < defaultVal){
    if ((value >= minVal) && (value < (minVal + imgChangeThreshold))){
      valueIndex = 0;
    }
    else if((value >= (minVal + imgChangeThreshold*2)) && (value < (minVal + imgChangeThreshold*3))){
      valueIndex = 1;
    }
    else if((value >= (minVal + imgChangeThreshold*3)) && (value < (minVal + imgChangeThreshold*4))){
      valueIndex = 2;
    }
    else if(value >= (minVal + imgChangeThreshold*4)){
      valueIndex = 3;
    }
  }
  else if (value > defaultVal){
    if ((value <= maxVal) && (value > (maxVal - imgChangeThreshold))){
      valueIndex = 5;
    }
    else if((value <= (maxVal - imgChangeThreshold*2)) && (value > (maxVal - imgChangeThreshold*3))){
      valueIndex = 6;
    }
    else if((value <= (maxVal - imgChangeThreshold*3)) && (value > (maxVal - imgChangeThreshold*4))){
      valueIndex = 7;
    }
    else if(value <= (maxVal - imgChangeThreshold*4)){
      valueIndex = 8;
    }
  }

  return valueIndex;

}

function chooseImage(val){
  mainImageFile = mainImageArray[getValueIndex(val)];
  /*
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
*/
	mainImage.setAttribute('src', mainImageFile);
}