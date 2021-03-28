//TO DO AT THE END

//BIG BUG
//"F5" "ON" "1"" + "1" (11) <-- WRONG ! "1" "+" (12) <-- OK!

var currentValue;
var currentOperation;
var values = [];
var total = 0;
var symbol = [];
var repeatsSymbol = true;
var repeatsEqual = false;
var wasEqualBefore = false;
//Refactor values not asigned 
var lastSymbol = symbol[symbol.length - 1];
var anyDigit = [];


class Operation {
    sum() {
        if (symbol.length == 0) {
            //Don't operate when first symbol
        } else {
            if (numA && !repeatsSymbol) {
                //   operatore = "+" //crear variable operator
                //   operation(numA, operatore) //cuando queremos ejecutar la funcion
                values.push(parseInt(numA))
                display.value = total;
                currentValue = 0;
                total += values[values.length - 1]; //ESTO DELEGARLO a operation()
                display.value = total;
            }
            if (repeatsSymbol) {
                console.log("nada")
            }
        }
    }
    substract() {
        if (symbol.length == 0) {
            //Don't operate when first symbol
        } else {
            if (numA && !repeatsSymbol) {
                //   operatore = "+" //crear variable operator
                //   operation(numA, operatore) //cuando queremos ejecutar la funcion
                values.push(parseInt(numA))
                display.value = total;
                currentValue = 0;
                total -= values[values.length - 1]; //ESTO DELEGARLO a operation()
                display.value = total;
            }
            if (repeatsSymbol) {
                console.log("nada")
            }
        }
    }
    multiply() {
    }
    divide() {
    }
    equals() {
        //sirve de algo este codigo?
        console.log(symbol.length)
        if (symbol[symbol.length - 1].includes("+")) {
            this.sum()
        }
    }
}

//ARITHMETICS
document.getElementById('calculator').addEventListener('click', (e) => {
    var digit = e.target.childNodes[0].nodeValue
    if (isOn) {
        if (isNumber(digit)) return numberPressed(digit)
        if (isSymbol(digit)) return symbolPressed(digit);
    }
})
document.getElementById('+').addEventListener('click', () => {
    const operation = new Operation();

    wasEqualBefore = false;

    if (anyDigit[anyDigit.length - 1] && anyDigit[anyDigit.length - 2] && anyDigit[anyDigit.length - 2].includes("+") && anyDigit[anyDigit.length - 1].includes("+")) {
        console.log("el ultimo fue un igual por tanto aceptamos otro numero normalmente")
        repeatsSymbol = true;

        //REDUNDANTE Y MAL PORQUE DE POR SI SI ENTRAMOS ACA HABRIA SIDO PUSHEADO EL SIMBOLO
        if (symbol[symbol.length - 1].includes("+")) {
            //WHAT FOR?
        }
    } else if (anyDigit[anyDigit.length - 2] && anyDigit[anyDigit.length - 2].includes("=")) {
        wasEqualBefore = true;
        console.log("Before + there was =")

    }

    // operation.sum
    //YA SE ESTA REASIGNANDO BIEN EL ULTIMO NUMERO
    // ESTE CODIGO VA DENTRO DE OPERATION.SUM O ESTA BIEN ACA? YA QUE BLOQUEA SUM DE HACER ALGO Y REASIGNA EL VALOR
    //O NO REASIGNA NADA? VER BIEN
    if (wasEqualBefore) {
        console.log("total +=  Last value entered after +")
        numA = currentValue
        console.log("Este es el operando que se recicla " + numA)
        if (repeatsSymbol) {
            console.log("hacer nada")
        } else {
        }
    } else {
        wasEqualBefore = false
        operation.sum();
    }
    wasEqualBefore = false
})
document.getElementById('-').addEventListener('click', () => {
    const operation = new Operation();

    wasEqualBefore = false;

    if (anyDigit[anyDigit.length - 1] && anyDigit[anyDigit.length - 2] && anyDigit[anyDigit.length - 2].includes("-") && anyDigit[anyDigit.length - 1].includes("-")) {
        console.log("el ultimo fue un igual por tanto aceptamos otro numero normalmente")
        repeatsSymbol = true;
        //REDUNDANTE Y MAL PORQUE DE POR SI SI ENTRAMOS ACA HABRIA SIDO PUSHEADO EL SIMBOLO
        if (symbol[symbol.length - 1].includes("+")) {

        }
    } else if (anyDigit[anyDigit.length - 2] && anyDigit[anyDigit.length - 2].includes("=")) {
        wasEqualBefore = true;
        console.log("Before + there was =")
    }

    // operation.sum
    //YA SE ESTA REASIGNANDO BIEN EL ULTIMO NUMERO
    // ESTE CODIGO VA DENTRO DE OPERATION.SUM O ESTA BIEN ACA? YA QUE BLOQUEA SUM DE HACER ALGO Y REASIGNA EL VALOR
    //O NO REASIGNA NADA? VER BIEN
    if (wasEqualBefore) {
        console.log("total +=  Last value entered after +")
        numA = currentValue
        console.log("Este es el operando que se recicla " + numA)
        if (repeatsSymbol) {
            console.log("hacer nada")
        } else {
        }
    } else {
        wasEqualBefore = false
        operation.substract();
    }
    wasEqualBefore = false
})
document.getElementById('X')
document.getElementById('/')
document.getElementById('%')
document.getElementById('.')
document.getElementById('=').addEventListener('click', () => {
    anyDigit.push('=')
    equalOperation();
    display.value = total;
})
//make operation receive digit
function equalOperation(digit) {
    const operation = new Operation();
    switch (true) {
        case currentOperation.includes("+"): operation.sum();
            break;
        case currentOperation.includes("-"): operation.substract();
            break;
        case currentOperation.includes("X"): alert('es una multiplicación!');
            break;
        case currentOperation.includes("/"): alert('es una division!');
            break;
        case currentOperation.includes("%"): alert('es un porcentaje!');
            break;
        case anydigit[anyDigit.length - 1].includes("="): operation.equals();
            break;
        default: alert('no es un simbolo valido');
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
function numberPressed(digit) {
    repeatsSymbol = false;
    digit = parseInt(digit);

    if (display.value === "0") {
        display.value = ""
        display.value += digit
    } else {
        /*BUG
        a- Cuando trato de escribir 11 + 111 --> se borra al 3er numero
        b- porque se cumple la condicion abajo porque
        c- en la operación sum se asigna y se mezclan los 3 valores
        */
        if (values[values.length - 1] == display.value || display.value == total) {
            display.value = "";
            display.value += digit
        } else {
            display.value += digit
        }
    }
    numA = display.value
    anyDigit.push(numA);
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
function symbolPressed(digit) {
    if (!digit.includes("=")) {
        anyDigit.push(digit);
        symbol.push(digit)
        console.log("incluimos este simbolo" + symbol[symbol.length - 1])
        currentOperation = symbol[symbol.length - 1];
    } else {
        anyDigit.push(digit);
    }

    if (symbol[symbol.length - 1] == symbol[symbol.length - 2] && !digit.includes("=") && digit == symbol[symbol.length - 1]) {
        console.log("repitio")
        repeatsSymbol = true;

    } else if (!symbol || digit !== symbol[symbol.length - 1] || anyDigit[anyDigit.length - 1] !== symbol[symbol.length - 1]) {
        //WHAT FOR?
    }
}

document.getElementById("OFF").addEventListener('click', () => {
    isOn = false;
    display.value = ""
    if (!isOn) {
        //MAKE TOAST SI NO PRENDE EN 10 SEGUNDOS O HACEN CLICK CON LA CALCU APAGADA
        console.log("apagado")
    }
})
//meter dentro de un loop para que funcione 3 veces?? pero como iria recibiendo
//ASSIGNING OPERATOR AND OPERANDUM


/*
TODO
----------------------------------
ESTA PASANDO QUE
"F5" + "ON"
"1" "+" "1" (11) <-- SE CONCATENA EN VEZ DE RECIBIR SEGUNDO PARAMETRO

PLAN

RECIBE numA --> se pushea numA cuando se ingresa el operator
RECIBE Operator --> numA = anyDigit[anyDigit.length - 2]
            operator = anyDigit[anyDigit.length - 1]
RECIBE numB
RECIBE operator --> numA= numB; operator = ""; numB = undefined;


//BOCETO B DE CONDICIONALES DE OPERATION
function operation(a, operator, b) {
    //Si el
    if (!operator && !b) {
        numA = a;
    } else if (!b) {
        var simbolo = operator
    } else if (a & operator & b) {
        var numB = b;
    }
    if (operator == "+") {
    }
}

---------------------------------

"" when I press the button
() --> result
FIX THIS BUGS!!
------------------------------------------
B- FUNCIONA ASI           "2" "+" "3" "=" (5) "4" "=" (9)
                                    -->5 + 4 (MAL)

DEBERIA FUNCIONAR ASI  "2" "+" "3" "=" (5) "4" "=" (7)
                                        --> 4 + 3 (Es decir que numB hace la misma operación sobre el nuevo numero)
                                        --> Y siempre que presione "=" "numero" se genera esta sustitución

--------------------------------------------

//DONDE EJECUTAMOS ESTO?
//EN operation.equal o en click.("=")??


                            B. 2 "+" "=" (4) "+" (8)
          <--OK  "+" Should take new input and sum it with previous total

IS NOT BUG
C. 2 "+" "=" (4)
D. 2 "+" 2 "+" (4) "+" "=" (8) "="  "=" alert(=)
                     <--OK "="

*/
/*
REFACTOR -->Cuando tengo que cambiar variable symbola a operation,
tengo que cambiarla en todos lados porque entra siempre como variable global
en vez de como parametro de una funcion
-------------------------------------------


//DONDE IRIA ESTE CODIGO?
// EN ('=') PODRIA IR (PODRIA VOLVERSE UNA FUNCION LUEGO PARA NO REPETIR EL CODIGO)
// 
//

//NO REALICE ESTA ACCIÓN YA? REVISAR
if (symbol[symbol.length - 2] == symbol[symbol.length - 1]) {
    //HACER NADA
} else if (symbol[symbol.length - 2] != symbol[symbol.lenth - 1] && symbol.length > 2) {
    //REALIZAR LA OPERACIÓN QUE CORRESPONDA AL ULTIMO SIMBOLO
}

*/