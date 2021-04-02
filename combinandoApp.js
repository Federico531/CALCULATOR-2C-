//MAKE BUTTON  NEGATE +/-
//ADD CURRENT DIGIT FOR DECIMAL
//UI Y LOGICA SEPARADOS
//ALL CONSOLE LOGS ARE UI
//MAKE DOT BUTTON
//MAKE MORE UNIT TESTS
//CREATE HISTORY THROUGH ARRAY CLASSES
//VER BIEN DECIMALES NECESITARIA SER BEFORE DI
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
        // this.repeatsEqual = false;
        this.wasEqualBefore = false;
        this.wasNumberBefore = false;
        this.isFloat = false;
    }
}
class Value {
    constructor(numA, numB, operator, lastOperator, lastDigit, total, currentDigit) {
        this.numA = numA
        this.numB = numB
        this.operator = operator
        this.lastOperator = lastOperator
        this.lastDigit = lastDigit
        this.currentDigit = currentDigit
        this.total = total
        this.secondSymbolExists = false;
    }
}
class Operation {
    sum(a, b) { return v.total = a + b }
    substract(a, b) { return v.total = a - b }
    multiply(a, b) { return v.total = a * b }
    divide(a, b) { return v.total = a / b }
    equals() { }
    decimal() {
        if (!v.currentDigit) {
            v.currentDigit = "0."
            console.log("quiso asignar el 0 decimal")
        } else {
            v.currentDigit += "."
        }

    }
}
const v = new Value()
const ui = new UI()
const h = new History()
const operation = new Operation()

function asignDigit(digit) {
    //separar lo que hay adentro en funciones
    if (!v.numA && isNumber(digit)) { v.total = "" }
    if (!v.operator && isNumber(digit) || digit.includes('.') && !v.operator) { firstDigitIs(digit) }
    else if (v.operator && isNumber(digit) || digit.includes('.')) { secondDigitIs(digit) }
    else if (v.numA && isSymbol(digit)) { doOperation(digit) }

}

let firstDigitIs = (digit) => {
    h.wasNumberBefore = true;
    if (!digit.includes('.')) {
        v.total += "" + parseFloat(digit);
        v.numA = parseFloat(v.total)
        v.currentDigit = v.numA
    } else if (digit.includes('.') && !h.isFloat) {
        h.isFloat = true;
        console.log("paso por aca firstDigit")
        operation.decimal()
        v.numA = v.currentDigit
        v.total = v.numA
        console.log("esto es numA" + v.numA)
    }
    ui.display = v.total;
    v.lastDigit = v.numA;
    console.log("assigned numA: " + v.numA)
}




let secondDigitIs = (digit) => {
    console.log("asi quedo numA cuando llega a secondDigit " + v.numA)
    h.wasNumberBefore = true;
    v.currentDigit = v.numB
    if (!digit.includes('.') ) {
        v.numB += "" + parseFloat(digit);
        
    } else if (digit.includes('.')) {
        if (h.isFloat == true){
            console.log("B ya tiene decimales, ingrese un numero")
        }else{
            h.isFloat = true;
            operation.decimal()
            v.numB = v.currentDigit
            v.lastDigit = v.numB;
            operation.decimal()
            v.numA = v.currentDigit
            v.total = v.numA
        }
    }
    ui.display = "";
    ui.display += v.numB;
    console.log("assigned numB: " + v.numB)
    if (v.secondSymbolExists == true) {
        whichOperationIs(v.operator)
        v.numA = v.total //esto se debería asignar si second symbol exists
        v.numB = parseFloat(v.numB);
        console.log("second Symbol exists")
        console.log("Result: " + v.total)
    }
}

let doOperation = (digit) => {
    v.numA = parseFloat(v.numA)
    if (v.operator) {
        v.secondSymbolExists = true
    }
    v.operator = digit
    h.isFloat = false;

    //repeatsOperator()
    if (v.lastOperator == v.operator
        && !digit.includes('=')
        && !h.wasEqualBefore
        && !h.wasNumberBefore) {
        alert("repeats " + v.lastOperator)

    } else if (digit.includes('=')) {
        console.log("Reassigned operator" + v.lastOperator + "through equal")
        //reOperatesWith(v.lastOperator){} 
        if (h.wasEqualBefore) {
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
        case digit.includes("."): alert('es un punto');
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