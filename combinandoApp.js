
//UI Y LOGICA SEPARADOS
//ALL CONSOLE LOGS ARE UI
//MAKE DOT BUTTON
//MAKE MORE UNIT TESTS
//CREATE HISTORY THROUGH ARRAY CLASSES
class UI {
    constructor() {
        this.isOn = false
        this.display;
        this.repeatsEqual = false;
        this.wasEqualBefore = false;
    }

}
class History {
    constructor() {
        this.anyDigit = [];
        this.total = [];
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
    sum(a, b) {
        v.total = a + b
        return v.total
    }
    substract(a, b) {
        v.total = a - b
        return v.total
    }
    multiply(a, b) {
        v.total = a * b
        return v.total
    }
    divide(a, b) {
        v.total = a / b
        return v.total
    }
    equals() {
    }
}

const v = new Value()
const ui = new UI()
const h = new History()
const operation = new Operation()

function asignDigit(digit) {
    //Esto va a traer un bug pero lo arreglo con un counter
    if (v.total == 0) {
        v.total = ""
    }
    if (!v.operator && isNumber(digit)) {
        v.total += "" + parseFloat(digit);
        v.numA = parseFloat(v.total)
        ui.display = v.total;
        console.log("assigned numA: " + v.numA)

    } else if (v.operator && isNumber(digit)) {
        v.lastDigit = digit;
        //COMO HAGO QUE SE AÑADAN DIGITOS EN NUMB HASTA QUE TOQUE OTRA VEZ UN SIMBOLO?
        if (!v.numB) {
            v.numB = ""
        }
        ui.display = "";
        v.numB += "" + parseFloat(digit);
        ui.display += v.numB;
        v.numB = parseFloat(v.numB)
        console.log("assigned numB: " + v.numB)
        // "NUM A TOMA EL LUGAR DE TOTAL PARA VOLVER A RECIBIR NUMB QUE NO TIENE QUE EXISTIR"
        whichOperationIs(v.operator)
        v.numA = v.total
        console.log("Result: " + v.total)
    } else if (v.numA && isSymbol(digit)) {
        ui.display = v.total
        v.operator = digit
        if (v.lastOperator == v.operator && isSymbol(v.lastDigit) && !digit.includes('=')) {
            alert("repeats " + v.lastOperator)

        } else if (digit.includes('=')) {
           
            ui.display = ""
            console.log("Reassigned operator through equal: " + v.lastOperator)
            if(ui.wasEqualBefore){
                v.numB = parseFloat(v.lastDigit)
                whichOperationIs(v.lastOperator)
                v.numA = v.total
            }else{
                v.numA = v.total
            }
            ui.wasEqualBefore = true
        } else if (!digit.includes('=')) {
            ui.wasEqualBefore = false
            v.lastOperator = v.operator
            console.log("assigned operator: " + v.operator)
            v.numB = ""
        }
        ui.display = v.total
    } else if (v.numA && v.numB && isSymbol(digit)) {
        // if (isNumber(v.lastDigit)) {
        //     console.log("Corresponde ingresar un operador")
        // } else {
        console.log()

    }
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

