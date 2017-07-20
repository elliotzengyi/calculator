$(document).ready(function(){

	$(".left-panel-2 button").on("click", function(){

	});

	$(".gocalc").on("click", function(){

	});

	$(".goresult").on("click", function(){

	});

	$(".left-panel-1 button").on("click", function(){

		switch(this.id) {
			case "AC":

		}

	});

	function gocalc(a, b, c) {

		switch (c) {
			case "/":
				result = a / b;
				break;
			case "*":
				result = a * b;
				break;
			case "-":
				result = a - b;
				break;
			case "+":
				result = a + b;
				break;
		}

	}

});