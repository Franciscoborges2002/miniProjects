//Create an array put all in the array, when he hits the "=" make the operation

var values = [];
var display = document.getElementById("total");
var equal = document.getElementById("equal");

function getValue(clickedValue){
    values.push(clickedValue);
    display.innerHTML = values.toString();
    console.log(values.toString().replace('3', '1'));
}

function displayOnScreen(){
    display.innerHTML = values.toString().replace(",", "");
}


//Need to make a little algorithm to go to the first operator
equal.addEventListener("click", () =>{
    displayOnScreen();
});