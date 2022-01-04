//Create an array put all in the array, when he hits the "=" make the operation

var values = ["+"];
var display = document.getElementById("total");
var equal = document.getElementById("equal");

function getValue(clickedValue){
    str = "";
    values.push(clickedValue);
    for(let i = 0; i < values.length; i++){
        str += values[i];
    }
    display.innerHTML = str;
    console.log(str);
}

function clearDisplay(){
    values = [];
    display.innerHTML = "0";
}

//Need to make a little algorithm to go to the first operator
equal.addEventListener("click", () =>{
    var res = 0;
    var firstNumber = "", secondNumber = "";
    var operator = "";
    //Separate the first Number and second number and the operator
    for(let i = 0; i < values.length; i++){
        if(operator == ""){
            firstNumber += values[i].toString();
        }else{
            secondNumber += values[i].toString();
        }

        console.log(values[i]);

        if(values[i].toString() === "+" && operator == ""){
            operator = "+";
        } else if(values[i].toString() == "-"  && operator == ""){
            operator = "-";
        } else if(values[i].toString() == "*"  && operator == ""){
            operator = "*";
        }else if(values[i].toString() == "/"  && operator == ""){
            operator = "/";
        }
    }

    console.log("1stNumber: " + firstNumber);
    //Remove the operator from the firstNumber
    firstNumber = firstNumber.substring(0, firstNumber.length -1);


    console.log("operator: " + operator);
    console.log("1stNumber: " + firstNumber);
    console.log("2ndNumber: " + secondNumber);

    switch(operator){
        case '+':
            res = parseInt(firstNumber) + parseInt(secondNumber);
        break;
        case '-':
            res = parseInt(firstNumber) - parseInt(secondNumber);
        break;
        case '*':
            res = parseInt(firstNumber) * parseInt(secondNumber);
        break;
        case '/':
            res = parseInt(firstNumber) / parseInt(secondNumber);
        break;
    }

    display.innerHTML = res;
});