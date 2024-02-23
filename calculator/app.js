window.onload=function(){
  var input = document.getElementById('input'),
  operator = document.querySelectorAll('.operators div'),
  number = document.querySelectorAll('.numbers div'),
  clear = document.getElementById('clear')
  result = document.getElementById('result');

  input.style.fontSize="1.5rem";
  input.style.overflow="auto";
  input.style.letterSpacing="0.5rem"

  var resultDisplayed= false;

  for ( var i=0; i< number.length; i++ ){
    number[i].addEventListener('click',(e)=>{

      var currentString = input.innerHTML
      var lastChar = currentString[currentString.length-1]

      if (resultDisplayed === false){
        input.innerHTML += e.target.innerHTML
        input.scrollLeft = input.scrollWidth
      }
      //result is displayed and user entered an operator--> append
      else if(resultDisplayed===true && lastChar === "+" || lastChar === "-" || lastChar === "×" || lastChar === "÷"){
        resultDisplayed = false;
        input.innerHTML += e.target.innerHTML;
        input.scrollLeft = input.scrollWidth
      }
      //result is displayed and then user entered a number --> clear and input new number
      else{
        resultDisplayed = false;
        input.innerHTML = "";
        input.innerHTML = e.target.innerHTML
      }



    });
  }

  for ( var i=0; i<operator.length; i++){
    operator[i].addEventListener('click',(e)=>{
      var currentString = input.innerHTML
      lastChar = currentString[currentString.length-1]
      
      //if nothing in input , log that you have to enter a number first
      if(currentString.length== 0) {
        console.log("Enter a number first")
      }
      
      //lastchar is an operator - replace
      else if((lastChar==="+") || (lastChar==="-") || (lastChar==="÷") || (lastChar=== "×")){
        var newString = currentString.substring(0,currentString.length-1)+e.target.innerHTML;
        input.innerHTML = newString;
      }

      //else last char is a number , append
      else{
        input.innerHTML += e.target.innerHTML;
      }

    });
  }

  clear.addEventListener('click',()=>{
    input.innerHTML = "";
  });

  result.addEventListener('click',(e)=>{
    var inputString = input.innerHTML;
    var numbers = inputString.split(/\+|\-|\×|\÷/g);
    var operators = inputString.replace(/[0-9]|\./g,"").split("");

    console.log(inputString);
    console.log(operators);
    console.log(numbers);
    console.log("----------------------------");

    //10*3/5+2-2

    var divide = operators.indexOf("÷");
    while(divide!=-1){
      numbers.splice(divide,2,numbers[divide]/numbers[divide+1]);
      operators.splice(divide,1);
      divide = operators.indexOf("÷");
    }

    var multiply = operators.indexOf("×");
  while (multiply != -1) {
    numbers.splice(multiply, 2, numbers[multiply] * numbers[multiply + 1]);
    operators.splice(multiply, 1);
    multiply = operators.indexOf("×");
  }

  var subtract = operators.indexOf("-");
  while (subtract != -1) {
    numbers.splice(subtract, 2, numbers[subtract] - numbers[subtract + 1]);
    operators.splice(subtract, 1);
    subtract = operators.indexOf("-");
  }

  var add = operators.indexOf("+");
  while (add != -1) {
    // parsefloat(due to concatenation)
    numbers.splice(add, 2, parseFloat(numbers[add]) + parseFloat(numbers[add + 1]));
    operators.splice(add, 1);
    add = operators.indexOf("+");
  }

  input.innerHTML = numbers[0]; // displaying the output
  input.scrollLeft = 0;
  

  resultDisplayed = true;

  });

}
