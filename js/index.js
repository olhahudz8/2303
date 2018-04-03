window.onload = function () {

    let calc = {
		
		"+":function (a, b){
			return a + b;
		},
		"-":function (a, b){
			return a - b;
		},
		"*":function (a, b){
			return a * b;
		},
		"/":function (a, b){
			return a / b;
		},
		"1/x":function (a) {
			return 1 / a;
		},
		
		numberClick: function (n, input) {
			let str = input.value;
			let pos = str.indexOf('.');
			if(pos!==-1 && !this.exp){
				input.value += n;
				return;
			}
			if(+input.value==0 || this.exp){
				input.value = n;
				this.exp = false;
			}
			else
			input.value += n;
		},
		
		operationClick: function (oper,exp,bottom) {
			if(calc.operation=="sqrt") {
			    exp.value += oper;
			}   else {
			        exp.value += bottom.value+oper;
			    }
			if(calc.operation=="sqrt" || calc.operation=="") {
					this.expvalue =+ bottom.value;
			}   else {
				    this.expvalue = this.equalClick(this.operation,this.expvalue,+bottom.value);
				    bottom.value = this.expvalue;
				}
			this.operation = oper;
			this.exp = true;
		},
		
		equalClick: function (oper, a, b) {
			let func = this[oper];
			return func (a, b);
		},
	
		exp: false,
		expvalue: 0,
		operation: ""
    };


	buttons.onclick = function(event) {
		var target = event.target;
		if (target.tagName!=="INPUT") return;
		
		var n = parseInt(target.value);
	
		if(!isNaN(n)) {
			calc.numberClick (n, bottom);
			return;
		}

		if(target.value=="+"||target.value=="-"||target.value=="*"||target.value=="/") {
			calc.operationClick(target.value, exp, bottom);
			return;
		}

		if(target.value=="=") {
			if(calc.operation=="") return;
			if(calc.operation!=="sqrt") {
				let key = calc.operation;
				bottom.value = calc.equalClick(key,calc.expvalue,+bottom.value);
			}
			
			if(calc.operation!=="x2") {
				let key = calc.operation;
				bottom.value=calc.equalClick(key,calc.expvalue,+bottom.value);
			}
			
			if(calc.operation!=="1/x") {
				let key = calc.operation;
				bottom.value=calc.equalClick(key,calc.expvalue,+bottom.value);
			}
			
			
			
			exp.value = "";
			calc.exp = true;
			calc.expvalue = 0;
			calc.operation = "";
			return;
		}

		if(target.value=="C") {
			bottom.value = 0;
			exp.value = "";
			calc.exp = false;
			calc.expvalue = 0;
			calc.operation = "";
			return;
		}

		if(target.value==",") {
			let str  =bottom.value;
			let pos = str.indexOf(".");
			if(calc.exp ){
				bottom.value = "0."
				calc.exp = false;
				return;
			}
			if(pos!==-1) return;
			
			bottom.value += ".";
			return;
		}

		if(target.value=="sqrt") {	
			calc.operation = "sqrt";
			exp.value = "sqrt ( "+bottom.value+" )";
			bottom.value=Math.sqrt(+bottom.value);
		}
		
		if(target.value=="x2") {	
			calc.operation = "x2";
			exp.value = "x2 ( "+bottom.value+" )";
			bottom.value = Math.pow(+bottom.value, 2);
		}

	};
	
};















