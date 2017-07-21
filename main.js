$(document).ready(function() {

    var first, second, symbol, temp;
    var afterCalc = false;
    var symbols = ["/", "*", "-", "+"];
    var lastNum, lastSymbol;
    var positive = "";

    function setNum(n) {

        lastNum = lastSymbol = undefined;

        if (afterCalc) {
            temp = undefined;
            afterCalc = false;
        }

        if (typeof(temp) === "undefined" || temp === "0") {
            temp = n;
        } else {
            if (temp.length < 10) {
                temp += n;
            }

        }
    }

    function setSymbol(s) {

        afterCalc = false;
        lastNum = lastSymbol = undefined;

        if (typeof(first) !== "undefined") {
            if (typeof(temp) !== "undefined") {

                second = positive + temp;
                positive = "";

                getTotal();

                first = temp;
                temp = undefined;
            }
            symbol = s;

        } else {

            if (typeof(temp) !== "undefined") {
                first = positive + temp;
                positive = "";
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

        lastNum = lastSymbol = undefined;

        if (typeof(temp) === "undefined") {
            temp = "0";
        }
        if (temp.indexOf(".") === -1) {
            temp += ".";
        }
    }

    function setPositive() {
        lastNum = lastSymbol = undefined;
        afterCalc = false;

        if (positive === "") {
            positive = "-";
        } else {
            positive = "";
        }
    }

    function update() {
        var display = "";
        var result = "";

        if (typeof(first) !== "undefined") {

            var firstDisplay = "";

            if (first.length > 10) {
                firstDisplay = Number(first).toPrecision(10);
            } else {
                firstDisplay = first;
            }

            display += firstDisplay;

            if(typeof(temp) === "undefined") {
            	result = firstDisplay;

            	if (positive === "-") {
            		result = "-";
            	}
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

            var tempDisplay = "";
            var pSymbol = "";

            if (temp.length > 10) {
                tempDisplay = Number(temp).toPrecision(10);
            } else {
                tempDisplay = temp;
            }

            display += positive + tempDisplay;
            result = positive + tempDisplay;
        }

        if(display === "" ) {
        	if (positive === "-") {
        		display = "-";
        	} else {
        		display = "&nbsp;";
        	}
        }
        if(result === "") {
        	if (positive === "-") {
        		result = "-";
        	} else {
        		result = "0";
        	}
        }

        console.log([
            "first: " + first + " " + typeof(first),
            "second: " + second + " " + typeof(second),
            "symbol: " + symbol,
            "temp: " + temp + " " + typeof(temp)
        ]);
        $(".calc-display").html(display);
        $(".calc-result").html(result);
    }

    function clearAll() {
        first = second = temp = symbol = undefined;
        positive = "";
        afterCalc = false;
    }

    function clearOne() {

        positive = "";
        afterCalc = false;

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
            second = positive + temp;
            positive = "";
        }

        if (typeof(second) !== "undefined") {
            switch (symbol) {
                case "/":
                    result = div(Number(first), Number(second));
                    break;
                case "*":
                    result = mul(Number(first), Number(second));
                    break;
                case "-":
                    result = sub(Number(first), Number(second));
                    break;
                case "+":
                    result = add(Number(first), Number(second));
                    break;
            }

            temp = result.toString();

            lastNum = second;
            lastSymbol = symbol;

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

    $("button").on("click", function() {

        if (this.id === "AC") {
            clearAll();
            update();
        } else if (this.id === "CE") {
            clearOne();
            update();
        } else if (this.id === "=") {
            if (typeof(lastNum) !== "undefined" &&
                typeof(lastSymbol) !== "undefined") {
                symbol = lastSymbol;
                second = lastNum;
                first = temp;
                temp = undefined;
            }
            getTotal();
            update();
        } else if (symbols.includes(this.id)) {
            setSymbol(this.id);
            update();
        } else if (this.id === ".") {
            setDot();
            update();
        } else if (this.id === "positive") {
            setPositive();
            update();
        } else {
            setNum(this.id);
            update();
        }

    });

});