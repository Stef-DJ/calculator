
function isDigit(character){
    return ((character >= '0') && (character <= '9')) || character === '.';
}

let add = {
    stringValue: "+",
    numberOfOperands: 2,
    operatorPrecedence: 1,
    apply: function(numbers) {
        return numbers[1] + numbers[0];
    }
};
let minus = {
    stringValue: "-",
    numberOfOperands: 2,
    operatorPrecedence: 0,
    apply: function(numbers) {
        return numbers[1] - numbers[0];
    }
};
let multiply = {
    stringValue: "x",
    numberOfOperands: 2,
    operatorPrecedence: 2,
    apply: function(numbers) {
        return numbers[1] * numbers[0];
    }
};
let divide = {
    stringValue: "/",
    numberOfOperands: 2,
    operatorPrecedence: 3,
    apply: function(numbers) {
        return numbers[1] / numbers[0];
    }
};

let openBracket = {
    stringValue: "(",
    numberOfOperands: 0,
    operatorPrecedence: 5,
};

let closeBracket = {
    stringValue: ")",
    numberOfOperands: 0,
    operatorPrecedence: 5,
};

let power = {
    stringValue: "^",
    numberOfOperands: 2,
    operatorPrecedence: 4,
    apply: function(numbers) {
        return Math.pow(numbers[1], numbers[0]);
    }
};

let sin = {
    stringValue: "sin",
    numberOfOperands: 1,
    operatorPrecedence: 4.5,
    apply: function(num) {
        return Math.sin(num[0]*(Math.PI/180));
    }
};

let cos = {
    stringValue: "cos",
    numberOfOperands: 1,
    operatorPrecedence: 4.5,
    apply: function(num) {
        return Math.cos(num[0]*(Math.PI/180));
    }
};

let tan = {
    stringValue: "tan",
    numberOfOperands: 1,
    operatorPrecedence: 4.5,
    apply: function(num) {
        return Math.tan(num[0]*(Math.PI/180));
    }
};

let mod = {
    stringValue: "%",
    numberOfOperands: 2,
    operatorPrecedence: 2,
    apply: function(num) {
        return num[0]%num[1];
    }
};

let factorial = {
    stringValue: "!",
    numberOfOperands: 1,
    operatorPrecedence: 2.5,
    apply: function(numbers) {
        let output = numbers[0];
        for(let i = 0;i<numbers[0]-1;i++){
            output *= numbers[0];
        }
        return output;
    }
};

let ln = {
    stringValue: "ln",
    numberOfOperands: 1,
    operatorPrecedence: 4.5,
    apply: function(num) {
        return Math.log(num[0]);
    }
};

let sqrt = {
    stringValue: "√",
    numberOfOperands: 1,
    operatorPrecedence: 4.5,
    apply: function(num) {
        return Math.sqrt(num[0]);
    }
};

const operators = new Map([
    ["+", add],
    ["-", minus],
    ["x", multiply],
    ["/", divide],
    ["(", openBracket],
    [")", closeBracket],
    ["^", power],
    ["sin", sin],
    ["cos", cos],
    ["tan", tan],
    ["%", mod],
    ["!", factorial],
    ["ln", ln],
    ["√", sqrt]
]);

function convertExpressionToArray(express){
    let expression = express.replace(/ /g,"");
    let expressionArr = [];
    let arrayIndex = 0;
    let characterIndex = 0;
    while(characterIndex < expression.length){
        if((characterIndex == 0 || (!isDigit(expression[characterIndex-1]) && ((expression[characterIndex-1] !== ")") || expression[characterIndex-1] !== "^"))) && expression[characterIndex] === "-"){
            expressionArr[arrayIndex]===undefined ? expressionArr[arrayIndex] = expression[characterIndex++] : expressionArr[arrayIndex] += expression[characterIndex++];
            while(isDigit(expression[characterIndex])){
                expressionArr[arrayIndex]===undefined ? expressionArr[arrayIndex] = expression[characterIndex++] : expressionArr[arrayIndex] += expression[characterIndex++];
            }
            arrayIndex++;
        }
        if(isDigit(expression[characterIndex])){
            while(isDigit(expression[characterIndex])){
                expressionArr[arrayIndex]===undefined ? expressionArr[arrayIndex] = expression[characterIndex++] : expressionArr[arrayIndex] += expression[characterIndex++];
            }
            arrayIndex++;
        }
        if(characterIndex < expression.length){
            if(expression[characterIndex] === "s" || expression[characterIndex] === "c" || expression[characterIndex] === "t" ){
                expressionArr[arrayIndex]===undefined ? expressionArr[arrayIndex] = expression[characterIndex++] : expressionArr[arrayIndex] += expression[characterIndex++];
                expressionArr[arrayIndex] += expression[characterIndex++];
                expressionArr[arrayIndex] += expression[characterIndex++];
                arrayIndex++;
            }
            else if(expression[characterIndex] === "p"){
                expressionArr[arrayIndex]===undefined ? expressionArr[arrayIndex] = expression[characterIndex++] : expressionArr[arrayIndex] += expression[characterIndex++];
                expressionArr[arrayIndex++] += expression[characterIndex++];
            }
            else if(expression[characterIndex] === "l"){
                expressionArr[arrayIndex]===undefined ? expressionArr[arrayIndex] = expression[characterIndex++] : expressionArr[arrayIndex] += expression[characterIndex++];
                expressionArr[arrayIndex++] += expression[characterIndex++];
            }
            else{
                expressionArr[arrayIndex]===undefined ? expressionArr[arrayIndex++] = expression[characterIndex++] : expressionArr[arrayIndex++] += expression[characterIndex++];
            }
        }
    }
    return expressionArr;
}

function addStackToQueueUntilBracket(queue, stack){
    let bracketFound = false;
    while(stack.length != 0 && !bracketFound){
        let character = stack.pop();
        if(character === "(")
            bracketFound = true;
        else
            queue.push(character);
    }
    return queue, stack;
}

function shuntingAlgorithmThirdCase(queue, stack, operator){
    queue, stack = addStackToQueueUntilBracket(queue, stack);
    stack.push(operator);
    return queue, stack;
}

function checkForHigherPrecedence(stack, character){
    let hasHigherPrecedence = false;
    let reversedStack = Array.from(stack).reverse();
    for(val of reversedStack){
        if(val=="(")
            break;
        if(operators.get(val).operatorPrecedence >= operators.get(character).operatorPrecedence)
            hasHigherPrecedence = true;
    }
    return hasHigherPrecedence;
}


function shuntingYardAlgorithm(expressionArr){
    let queue = [];
    let stack = [];

    expressionArr.map(character => {
        const pattern = /^-?\d+(\.\d+)?$/; 
        if(pattern.test(character)){
            queue.push(character);
        }
        else if(character=="pi"){
            queue.push(Math.PI);
        }
        else if(character=="e"){
            queue.push(Math.E);
        }
        else{
            if(stack.length==0){
                stack.push(character);
            }
            else{
                if(character === ")"){
                    queue, stack = addStackToQueueUntilBracket(queue, stack);
                }
                else{
                    const doAnyInStackHaveHigherPrecedence = checkForHigherPrecedence(stack, character);
                    if(doAnyInStackHaveHigherPrecedence){
                        queue, stack = shuntingAlgorithmThirdCase(queue, stack, character);
                    }
                    else{
                        stack.push(character);
                    }
                }
            }
        }
    });

    queue, stack = addStackToQueueUntilBracket(queue, stack);
    return queue;
}

function postFixEvaluation(expression){
    let stack = [];
    for(val of expression){
        const pattern = /^-?\d+(\.\d+)?$/; 
        if(pattern.test(val)){
            stack.push(val);
        }
        else{
            let numbers = []
            for(let i = 0;i<operators.get(val).numberOfOperands;i++){
                numbers.push(Number(stack.pop()))
            }
            let calculatedValue = operators.get(val).apply(numbers);
            stack.push(calculatedValue);
        }
    }
    return stack;
}


function putCharacterToScreen(value){
    let screen = document.getElementById("screen-input");

    if(value==="pi" && screen.value.length!==0 && !isNaN(screen.value.slice(-1))){
        screen.value += "x" + value;
        return;
    }

    if(!isNaN(value) && screen.value.length!==0 && screen.value[screen.value.length-1]===")"){
        screen.value += "x" + value;
        return;
    }

    if(!isNaN(value) && screen.value.length!==0 && screen.value[screen.value.length-1]==="i"){
        screen.value += "x" + value;
        return;
    }

    if(value==="^" && screen.value.length==0)
        return;
    if(value==="(" && (!isNaN(screen.value.slice(-1)) || screen.value[screen.value.length-1]===")")){
        if(screen.value.length==0){
            screen.value +='(';
            return;
        }
        screen.value += 'x(';
    }
    else{
        screen.value += value;
    }

}

function allClear(){
    let screen = document.getElementById("screen-input");
    screen.value = "";
}

function clearEntry(){
    let screen = document.getElementById("screen-input");
    screen.value = screen.value.slice(0,-1);
}

function areParenthesesBalanced(expression) {
    const stack = [];
    const openingBrackets = ['('];
    const closingBrackets = [')'];

    for (let char of expression) {
        if (openingBrackets.includes(char)) {
            stack.push(char);
        } else if (closingBrackets.includes(char)) {
            const lastOpeningBracket = stack.pop();
            const expectedOpeningBracket = openingBrackets[closingBrackets.indexOf(char)];
            
            if (!lastOpeningBracket || lastOpeningBracket !== expectedOpeningBracket) {
                return false;
            }
        }
    }

    return stack.length === 0;
}


function equals(){
    let screen = document.getElementById("screen-input");
    if(!areParenthesesBalanced(screen.value)){
        alert("Brackets don't match");
        return;
    }
    let rawExpression = convertExpressionToArray(screen.value);
    let postProcessExpression = shuntingYardAlgorithm(rawExpression);
    let answer = postFixEvaluation(postProcessExpression);
    screen.value = answer[0];
}








