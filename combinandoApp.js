//FIX "123" "+" "321" "=" (479) (=) (480)
//NUM B = 1
//UI Y LOGICA SEPARADOS
//ALL CONSOLE LOGS ARE UI
//MAKE DOT BUTTON
//MAKE MORE UNIT TESTS
//CREATE HISTORY THROUGH ARRAY CLASSES
class UI {
    constructor() {
        this.isOn = false
        this.display;
    }
}
class History {
    constructor() {
        this.anyDigit = [];
        this.total = [];
        //        this.repeatsEqual = false;
        this.wasEqualBefore = false;
        this.wasNumberBefore = false;
    }
}
class Value {
    constructor(numA, numB, operator, lastOperator, lastDigit, total) {
        this.numA = numA
        this.numB = numB
        this.operator = operator
        this.lastOperator = lastOperator
        this.lastDigit = lastDigit
        this.total = total
    }
}
class Operation {
    sum(a, b) { return v.total = a + b }
    substract(a, b) { return v.total = a - b }
    multiply(a, b) { return v.total = a * b }
    divide(a, b) { return v.total = a / b }
    equals() { }
}
const v = new Value()
const ui = new UI()
const h = new History()
const operation = new Operation()

function asignDigit(digit) {
    //separar lo que hay adentro en funciones
    if (!v.numA) return v.total = "";
    if (!v.operator && isNumber(digit)) return firstDigitIs(digit)
    else if (v.operator && isNumber(digit)) return secondDigitIs(digit)
    else if (isSymbol(digit)) return doOperation(digit)
}

let firstDigitIs = (digit) => {
    h.wasNumberBefore = true;
    v.total += "" + parseFloat(digit);
    v.numA = parseFloat(v.total)
    ui.display = v.total;
    v.lastDigit = v.numA;
    console.log("assigned numA: " + v.numA)
}
let secondDigitIs = (digit) => {
    h.wasNumberBefore = true;
    ui.display = "";
    v.numB += "" + parseFloat(digit);
    ui.display += v.numB;
    v.numB = parseFloat(v.numB);
    v.lastDigit = v.numB;
    console.log("assigned numB: " + v.numB)
    whichOperationIs(v.operator)
    v.numA = v.total
    console.log("Result: " + v.total)
}

let doOperation = (digit) => {
    ui.display = v.total
    v.operator = digit

    if (v.lastOperator == v.operator && !digit.includes('=') && !h.wasEqualBefore && !h.wasNumberBefore) {
        alert("repeats " + v.lastOperator)
    } else if (digit.includes('=')) {
        h.display = ""
        console.log("Reassigned operator" + v.lastOperator + "through equal: ")
        if (h.wasEqualBefore) {
            console.log("pasa por aca")
            v.numB = parseFloat(v.lastDigit)
            whichOperationIs(v.lastOperator)
            v.numA = v.total
        } else {
            v.numA = v.total
        }
        h.wasEqualBefore = true
    } else if (!digit.includes('=')) {
        h.wasEqualBefore = false
        v.lastOperator = v.operator
        console.log("assigned operator: " + v.operator)
        v.numB = ""
    }
    ui.display = v.total
    h.wasNumberBefore = false;
}
function isNumber(digit) {
    for (var i = 0; i < 10; i++) {
        var number = digit.includes(i.toString());
        if (!number) {
        } else {
            return true
        }
    }
}
function isSymbol(digit) {
    //crep que se puede armar algun objeto con metodos, y hacer map de esos metodos hasta que alguno de true?
    const sums = digit.includes("+");
    const substracts = digit.includes("-");
    const multiplies = digit.includes("X");
    const divides = digit.includes("/");
    const percentages = digit.includes("%");
    const equals = digit.includes("=");
    if (sums || substracts || multiplies || divides || percentages || equals) {
        return true;
    } else {
        return false;
    }
}
function whichOperationIs(digit) {
    switch (true) {
        case digit.includes("+"): operation.sum(v.numA, v.numB);
            break;
        case digit.includes("-"): operation.substract(v.numA, v.numB);
            break;
        case digit.includes("X"): operation.multiply(v.numA, v.numB);
            break;
        case digit.includes("/"): operation.divide(v.numA, v.numB);
            break;
        case digit.includes("%"): alert('es un porcentaje!');
            break;
        // case digit.includes("="): operation.equals();
        //     break;
        default: alert('Typed a number when should have typed symbol');
    }
}
document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('calculator').addEventListener('click', (e) => {
        var digit = e.target.childNodes[0].nodeValue
        asignDigit(digit);
        document.getElementById("display").value = ui.display
        e.preventDefault();
        /*
            if (isOn) {
                if (isNumber(digit)) return numberPressed(digit)
                if (isSymbol(digit)) return symbolPressed(digit);
            }
        */
    })
});
document.getElementById("ON/C").addEventListener('click', () => {
    //esto se podria meter en una funcion luego
    v.total = 0;
    ui.display = 0
    h.values = [];
    console.log("prendido")
})
document.getElementById("OFF").addEventListener('click', () => {
    //MAKE TOAST SI NO PRENDE EN 10 SEGUNDOS O HACEN CLICK CON LA CALCU APAGADA
    v.total = "";
    v.numA = "";
    v.numB = "";
    v.operator = "";
    ui.display = "";
    h.values = [];
    console.log("apagado")
})
const operatione = new Operation()

module.exports = {
    sum: operatione.sum,
    substract: operatione.substract,
    multiply: operatione.multiply,
    divide: operatione.divide,
};

/*
//PUNTO DE PARTIDA PARA EL UI, VER DESPUES
function operation(numA, operator, numB) {
    if (operator == "+") {
        display.value = numA + numB
    }
}
*/

