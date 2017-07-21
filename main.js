var first, second, symbol, temp;
var afterCalc = false;
var symbols = ["/", "*", "-", "+"];

function setNum(n) {

    if (afterCalc) {
        temp = undefined;
        afterCalc = false;
    }

    if (typeof(temp) === "undefined") {
        temp = n;
    } else {
        if (n === "0" && temp === "0") {
            temp = n;
        } else {
            temp += n;
        }
    }
}

function setSymbol(s) {

    afterCalc = false;

    if (typeof(first) !== "undefined") {
        if (typeof(temp) !== "undefined") {

            if (temp.length > 10) {
                second = Number(temp).toPrecision(10);
            } else {
                second = Number(temp);
            }
            getTotal();
            first = Number(temp);
            temp = undefined;
        }
        symbol = s;

    } else {
        if (typeof(temp) !== "undefined") {
            if (temp.length > 10) {
                first = Number(temp).toPrecision(10);
            } else {
                first = Number(temp);
            }
            temp = undefined;
            symbol = s;
        }
    }

}

function setDot() {

    if (afterCalc) {
        temp = undefined;
        afterCalc = false;
    }

    if (typeof(temp) === "undefined") {
        temp = "0";
    }
    if (temp.indexOf(".") === -1) {
        temp += ".";
    }
}

function setPercent() {
    if (typeof(temp) !== "undefined") temp = div(temp, 100);
    if (typeof(temp) === "undefined" && typeof(first) !== undefined) {
        first = div(first, 100);
    }
}

function update() {
    var display = "";
    var result = "0";

    if (typeof(first) !== "undefined") {
        display = first;
        if (typeof(temp) === "undefined") {
            result = first;
        }
    }
    if (typeof(symbol) !== "undefined") {
        var symbolString = "";
        switch (symbol) {
            case "/":
                symbolString = "&divide;";
                break;
            case "*":
                symbolString = "&times;";
                break;
            case "-":
                symbolString = "&minus;";
                break;
            case "+":
                symbolString = "+";
                break;
        }
        display += " " + symbolString + " ";
    }

    if (typeof(second) !== "undefined") {
        display += second;
    }

    if (typeof(temp) !== "undefined") {
        display += temp;
        result = temp;
    }

    if (display === "") display = "0";

    console.log([
        "first: " + first,
        "second: " + second,
        "symbol: " + symbol,
        "temp: " + temp
    ]);
    $(".calc-display").html(display);
    $(".calc-result").html(result);
}

function clearAll() {
    first = second = temp = symbol = undefined;
    afterCalc = false;
}

function clearOne() {

    if (typeof(temp) !== "undefined") {
        temp = undefined;
    } else if (typeof(second) !== "undefined") {
        second = undefined;
    } else if (typeof(first) !== "undefined") {
        first = undefined;
        symbol = undefined;
    }
}

function getTotal() {

    var result = 0;

    if (typeof(first) !== "undefined" && typeof(second) === "undefined" && typeof(temp) !== "undefined") {
        second = Number(temp);
    }

    if (typeof(second) !== "undefined") {
        switch (symbol) {
            case "/":
                result = div(first, second);
                break;
            case "*":
                result = mul(first, second);
                break;
            case "-":
                result = sub(first, second);
                break;
            case "+":
                result = add(first, second);
                break;
        }

        if (result.toString().length > 10) {
            temp = result.toPrecision(10).toString();
        } else {
            temp = result.toString();
        }

        first = symbol = second = undefined;
        afterCalc = true;
    }
}

function add(a, b) {
    var c, d, e;
    try {
        c = a.toString().split(".")[1].length;
    } catch (f) {
        c = 0;
    }
    try {
        d = b.toString().split(".")[1].length;
    } catch (f) {
        d = 0;
    }
    return e = Math.pow(10, Math.max(c, d)), (mul(a, e) + mul(b, e)) / e;
}

function sub(a, b) {
    var c, d, e;
    try {
        c = a.toString().split(".")[1].length;
    } catch (f) {
        c = 0;
    }
    try {
        d = b.toString().split(".")[1].length;
    } catch (f) {
        d = 0;
    }
    return e = Math.pow(10, Math.max(c, d)), (mul(a, e) - mul(b, e)) / e;
}

function mul(a, b) {
    var c = 0,
        d = a.toString(),
        e = b.toString();
    try {
        c += d.split(".")[1].length;
    } catch (f) {}
    try {
        c += e.split(".")[1].length;
    } catch (f) {}
    return Number(d.replace(".", "")) * Number(e.replace(".", "")) / Math.pow(10, c);
}

function div(a, b) {
    var c, d, e = 0,
        f = 0;
    try {
        e = a.toString().split(".")[1].length;
    } catch (g) {}
    try {
        f = b.toString().split(".")[1].length;
    } catch (g) {}
    return c = Number(a.toString().replace(".", "")), d = Number(b.toString().replace(".", "")), mul(c / d, Math.pow(10, f - e));
}

$(document).ready(function() {

    $("button").on("click", function() {

        if (this.id === "AC") {
            clearAll();
            update();
        } else if (this.id === "CE") {
            clearOne();
            update();
        } else if (this.id === "=") {
            getTotal();
            update();
        } else if (symbols.includes(this.id)) {
            setSymbol(this.id);
            update();
        } else if (this.id === ".") {
            setDot();
            update();
        } else if (this.id === "%") {
            setPercent();
            update();
        } else {
            setNum(this.id);
            update();
        }

    });

});