//Create an array put all in the array, when he hits the "=" make the operation

var values = ["+"];
var display = document.getElementById("total");
var equal = document.getElementById("equal");
var history = document.getElementById("history");

//Function to add the value clicked to the array
function getValue(clickedValue){
    str = "";
    valuesLen = values.length;

    //To dont put 2 signals in a row
    if(valuesLen >= 1 && (clickedValue == '-' || clickedValue == '+' || clickedValue == '-'|| clickedValue == '+')){
        if(values[valuesLen - 1] == '-' || values[valuesLen -1] == '+' || values[valuesLen -1] == '-'|| values[valuesLen -1] == '+'){
            console.log("Don't put 2 signals in a row. Learn math :)");
            return;
        }
    }

    values.push(clickedValue);//put in the array

    for(let i = 0; i < valuesLen; i++){
        str += values[i];
    }

    displayUpdate(str);
}

//Function to clear the display
function clearDisplay(){
    values = ["+"];
    displayUpdate(0);
}

//Function to update the display of the calculator
function displayUpdate(valuesToUpdate){
    display.innerHTML = valuesToUpdate;

    console.log(values)
    
}

function undoValue(){
    str = "";

    if(values.length == 1){//If values array only have 1 number
        values = ["+"];
    }else{
        values.splice(values.length -1, values.length -1)
    }

    console.log(values);
    for(let i = 0; i < values.length; i++){
        str += values[i];
    }
    displayUpdate(str);

}

//Function to invert the signal
function operatorInversion(){
    if(values[0] == "+"){
        values.shift();
        values.unshift("-");
    }else{
        values.shift();
        values.unshift("+");
    }

    console.log(values);
}

//Function to make the actual count
//Need to make a little algorithm to go to the first operator
equal.addEventListener("click", () =>{
    var res = 0;
    var firstNumber = "", secondNumber = "";
    var operator = "";
    //Separate the first Number and second number and the operator
    //start in the second place at the array
    for(let i = 1; i < values.length; i++){
        if(operator == ""){
            firstNumber += values[i].toString();
        }else{
            secondNumber += values[i].toString();
        }

        if(values[i].toString() === "+" && operator == ""){
            operator = "+";
        } else if(values[i].toString() == "-"  && operator == ""){
            operator = "-";
        } else if(values[i].toString() == "*"  && operator == ""){
            operator = "*";
        }else if(values[i].toString() == "/"  && operator == ""){
            operator = "/";
        }

        console.log(values[i]);
        
    }

    console.log("1stNumber: " + firstNumber);
    //Remove the operator from the firstNumber
    firstNumber = values[0] + firstNumber;
    firstNumber = firstNumber.substring(0, firstNumber.length -1);
    newHis = document.createElement('li');


    console.log("operator: " + operator);
    console.log("1stNumber: " + firstNumber);
    console.log("2ndNumber: " + secondNumber);

    switch(operator){
        case '+':
            res = parseFloat(firstNumber) + parseFloat(secondNumber);
            textnode = parseFloat(firstNumber) + "+" + parseFloat(secondNumber) + "=" + res;
        break;
        case '-':
            res = parseFloat(firstNumber) - parseFloat(secondNumber);
            textnode = parseFloat(firstNumber) + "-" + parseFloat(secondNumber) + "=" + res;
        break;
        case '*':
            res = parseFloat(firstNumber) * parseFloat(secondNumber);
            textnode = parseFloat(firstNumber) + "*" + parseFloat(secondNumber) + "=" + res;
        break;
        case '/':
            res = parseFloat(firstNumber) / parseFloat(secondNumber);
            textnode = parseFloat(firstNumber) + "/" + parseFloat(secondNumber) + "=" + res;
        break;
    }

    newHis.appendChild(textnode);

    history.appendChild(newHis);

    displayUpdate(res);
});