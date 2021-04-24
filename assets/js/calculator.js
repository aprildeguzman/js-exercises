function calculate () {
    var num1 = parseInt(document.getElementById('num1').value);
    var num2 = parseInt(document.getElementById('num2').value);
    console.log(num1+num2);

    var arithmetic = document.getElementById('arithmetic').value;
    console.log(arithmetic);

    document.getElementById('result').innerHTML = (num1+num2);

    var output = 0;

    switch(arithmetic){
        case 'addition':
            output = num1 + num2;
            document.getElementById('container-answer').style.color = 'red';
            document.getElementById('result').innerHTML = output;
            break;
        case 'subtraction': 
            output = num1 - num2;
            document.getElementById('container-answer').style.color = 'blue';
            document.getElementById('result').innerHTML = output;
            break;
        case 'multiplication':
            output = num1 * num2;
            document.getElementById('container-answer').style.color = 'green';
            document.getElementById('result').innerHTML = output;
            break;
        case 'division':
            output = num1 / num2;
            document.getElementById('container-answer').style.color = 'orange';
            document.getElementById('result').innerHTML = output;
            break;
    }
}

function reset(){
    document.getElementById('num1').value = "";
    document.getElementById('num2').value = "";
    document.getElementById('result').innerHTML = ' ';
}