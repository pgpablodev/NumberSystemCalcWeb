function decBin(valorDecimal){
    valorDecimal = parseInt(valorDecimal);
    let exp = 0;
    let valorBinario = 0.0;
    if(valorDecimal>=0){
        while(valorDecimal!=0){
            valorBinario += (valorDecimal%2)*Math.pow(10, exp);
            exp++;
            valorDecimal = Math.floor(valorDecimal/2);
        }
    }
    return valorBinario;
}

function binDec(valorBinario){
    valorBinario = parseInt(valorBinario);
    let posicion = 0;
    let valorDecimal = 0;
    while(valorBinario>0){
        valorDecimal += (valorBinario - (Math.floor(valorBinario/10)*10))*Math.pow(2, posicion);
		posicion++;
		valorBinario = Math.floor(valorBinario/10);
    }
    return valorDecimal;
}

function cifraOctal(bin){
    switch(bin.toString()){
        case "0":
			return "0";
		case "1":
			return "1";
		case "10":
			return "2";
		case "11":
			return "3";
		case "000":
			return "0";
		case "001":
			return "1";
		case "010":
			return "2";
		case "011":
			return "3";
		case "100":
			return "4";
		case "101":
			return "5";
		case "110":
			return "6";
		case "111":
			return "7";
		default:
			return "";
    }
}

function cifraHex(bin){
	switch(bin.toString()){
		case "0":
			return "0";
		case "1":
			return "1";
		case "10":
			return "2";
		case "11":
			return "3";
		case "100":
			return "4";
		case "101":
			return "5";
		case "110":
			return "6";
		case "111":
			return "7";
		case "0000":
			return "0";
		case "0001":
			return "1";
		case "0010":
			return "2";
		case "0011":
			return "3";
		case "0100":
			return "4";
		case "0101":
			return "5";
		case "0110":
			return "6";
		case "0111":
			return "7";
		case "1000":
			return "8";
		case "1001":
			return "9";
		case "1010":
			return "A";
		case "1011":
			return "B";
		case "1100":
			return "C";
		case "1101":
			return "D";
		case "1110":
			return "E";
		case "1111":
			return "F";
		default:
			return "";
	}
}

function binOct(valorBinario){
	let cadena = valorBinario.toString();
	if(cadena.length>3){
		while(!(cadena.length%3==0)){
			cadena = "0"+cadena;
		}
	}
	let resultado = "";
	if(cadena.length>3){
		for(let i=0;i<cadena.length-2;i+=3){
			resultado += cifraOctal(cadena.substring(i,i+3));
		}
	}else{
		resultado = cifraOctal(cadena);
	}
    let ceros = 0;
    while(resultado.charAt(ceros)=='0'){
        ceros++;
    }
    resultado = resultado.slice(ceros,resultado.length);
	return resultado;
}

function binHex(valorBinario){
	let cadena = valorBinario.toString();
	if(cadena.length>4){
		while(!(cadena.length%4==0)){
			cadena = "0"+cadena;
		}
	}
	let resultado = "";
	if(cadena.length>4){
		for(let i=0;i<cadena.length-3;i+=4){
			resultado += cifraHex(cadena.substring(i,i+4));
		}
	}else{
		resultado = cifraHex(cadena);
	}
    let ceros = 0;
    while(resultado.charAt(ceros)=='0'){
        ceros++;
    }
    resultado = resultado.slice(ceros,resultado.length);
	return resultado;
}

function cifraBin3Bits(oct){
	switch(oct.toString()){
		case '0':
			return "000";
		case '1':
			return "001";
		case '2':
			return "010";
		case '3':
			return "011";
		case '4':
			return "100";
		case '5':
			return "101";
		case '6':
			return "110";
		case '7':
			return "111";
		default:
			return "";
	}
}

function cifraBin4Bits(hex){
	switch(hex.toString()){
		case '0':
			return "0000";
		case '1':
			return "0001";
		case '2':
			return "0010";
		case '3':
			return "0011";
		case '4':
			return "0100";
		case '5':
			return "0101";
		case '6':
			return "0110";
		case '7':
			return "0111";
		case '8':
			return "1000";
		case '9':
			return "1001";
		case 'A':
			return "1010";
		case 'B':
			return "1011";
		case 'C':
			return "1100";
		case 'D':
			return "1101";
		case 'E':
			return "1110";
		case 'F':
			return "1111";
		default:
			return "";
	}
}

function octBin(valorOctal){
	valorOctal.toString();
	let resultado = "";
	for(let i=0;i<valorOctal.length;i++){
		resultado += cifraBin3Bits(valorOctal.charAt(i));
	}
    let ceros = 0;
    while(resultado.charAt(ceros)=='0'){
        ceros++;
    }
    resultado = resultado.slice(ceros,resultado.length);
	return resultado;
}

function hexBin(valorHex){
	valorHex.toString();
	let resultado = "";
	for(let i=0;i<valorHex.length;i++){
		resultado += cifraBin4Bits(valorHex.charAt(i));
	}
    let ceros = 0;
    while(resultado.charAt(ceros)=='0'){
        ceros++;
    }
    resultado = resultado.slice(ceros,resultado.length);
	return resultado;
}

let display = document.getElementById('display');
display.innerText = '0';
let modeButtons = Array.from(document.getElementsByClassName('modebutton'));
let buttons = Array.from(document.getElementsByClassName('button'));
let lastValue = 0;
let lastOp;
let baseActual = 10;
let btnHex = document.getElementsByClassName('span-fractionrow');
let btnOct = document.getElementsByClassName('non-octal');
let btnBin = document.getElementsByClassName('non-binary');
for(i=0;i<btnHex.length;i++){
    btnHex[i].classList.remove('button');
    btnHex[i].classList.add('disabled');
}
btnMode = document.getElementsByClassName('modebutton');
modeButtons.map(modebutton => {
    modebutton.addEventListener('click',(e) => {
        switch(e.target.innerText){
            case 'HEX':
                if(display.innerText!='' && display.innerText!='0'){
                    if(baseActual==2){
                        display.innerText = binHex(display.innerText);
                    }else if(baseActual==8){
                        display.innerText = binHex(octBin(display.innerText));
                    }else if(baseActual==10){
                        display.innerText = binHex(decBin(display.innerText));
                    }
                }else{
                    display.innerText = '0';
                }
                for(i=0;i<btnHex.length;i++){
                    btnHex[i].classList.add('button');
                    btnHex[i].classList.remove('disabled');
                }
                for(i=0;i<btnOct.length;i++){
                    btnOct[i].classList.add('button');
                    btnOct[i].classList.remove('disabled');
                }  
                for(i=0;i<btnBin.length;i++){
                    btnBin[i].classList.add('button');
                    btnBin[i].classList.remove('disabled');
                }
                baseActual = 16;
                btnMode[0].classList.add('selected');
                btnMode[1].classList.remove('selected');
                btnMode[2].classList.remove('selected');
                btnMode[3].classList.remove('selected');
                break;
            case 'DEC':
                if(display.innerText!='' && display.innerText!='0'){
                    if(baseActual==16){
                        display.innerText = binDec(hexBin(display.innerText));
                    }else if(baseActual==8){
                        display.innerText = binDec(octBin(display.innerText));
                    }else if(baseActual==2){
                        display.innerText = binDec(display.innerText);
                    }
                }else{
                    display.innerText = '0';
                }
                for(i=0;i<btnHex.length;i++){
                    btnHex[i].classList.remove('button');
                    btnHex[i].classList.add('disabled');
                }
                for(i=0;i<btnOct.length;i++){
                    btnOct[i].classList.add('button');
                    btnOct[i].classList.remove('disabled');
                }  
                for(i=0;i<btnBin.length;i++){
                    btnBin[i].classList.add('button');
                    btnBin[i].classList.remove('disabled');
                } 
                baseActual = 10;
                btnMode[0].classList.remove('selected');
                btnMode[1].classList.add('selected');
                btnMode[2].classList.remove('selected');
                btnMode[3].classList.remove('selected');
                break;
            case 'OCT':
                if(display.innerText!='' && display.innerText!='0'){
                    if(baseActual==16){
                        display.innerText = binOct(hexBin(display.innerText));
                    }else if(baseActual==2){
                        display.innerText = binOct(display.innerText);
                    }else if(baseActual==10){
                        display.innerText = binOct(decBin(display.innerText));
                    }
                }else{
                    display.innerText = '0';
                }
                for(i=0;i<btnHex.length;i++){
                    btnHex[i].classList.remove('button');
                    btnHex[i].classList.add('disabled');
                }    
                for(i=0;i<btnOct.length;i++){
                    btnOct[i].classList.remove('button');
                    btnOct[i].classList.add('disabled');
                }  
                for(i=0;i<btnBin.length;i++){
                    btnBin[i].classList.add('button');
                    btnBin[i].classList.remove('disabled');
                } 
                baseActual = 8;
                btnMode[0].classList.remove('selected');
                btnMode[1].classList.remove('selected');
                btnMode[2].classList.add('selected');
                btnMode[3].classList.remove('selected');
                break;              
            case 'BIN':
                if(display.innerText!='' && display.innerText!='0'){
                    if(baseActual==16){
                        display.innerText = hexBin(display.innerText);
                    }else if(baseActual==8){
                        display.innerText = octBin(display.innerText);
                    }else if(baseActual==10){
                        display.innerText = decBin(display.innerText);
                    }
                }else{
                    display.innerText = '0';
                }
                for(i=0;i<btnHex.length;i++){
                    btnHex[i].classList.remove('button');
                    btnHex[i].classList.add('disabled');
                }   
                for(i=0;i<btnOct.length;i++){
                    btnOct[i].classList.remove('button');
                    btnOct[i].classList.add('disabled');
                }  
                for(i=0;i<btnBin.length;i++){
                    btnBin[i].classList.remove('button');
                    btnBin[i].classList.add('disabled');
                }   
                baseActual = 2;
                btnMode[0].classList.remove('selected');
                btnMode[1].classList.remove('selected');
                btnMode[2].classList.remove('selected');
                btnMode[3].classList.add('selected');
                break;
        }
    });
});
buttons.map(button => {
    button.addEventListener('click',(e) => {
        if(baseActual==10){
            switch(e.target.innerText){
                case 'CE':
                    display.innerText = '0';
                    break;
                case '÷':
                    lastValue = parseInt(display.innerText);                
                    lastOp = '÷';
                    display.innerText = '0';
                    break;
                case '×':
                    lastValue = parseInt(display.innerText);                
                    lastOp = '×';
                    display.innerText = '0';
                    break;
                case '←':
                    if(display.innerText!=0){
                        if(display.innerText.length>1)
                            display.innerText = display.innerText.slice(0,-1);
                        else
                            display.innerText = '0';
                    }
                    break;
                case '-':
                    lastValue = parseInt(display.innerText);                
                    lastOp = '-';
                    display.innerText = '0';
                    break;
                case '+':
                    lastValue = parseInt(display.innerText);                
                    lastOp = '+';
                    display.innerText = '0';
                    break;
                case '=':
                        switch(lastOp){
                            case '+':
                                display.innerText = Math.floor(lastValue + parseInt(display.innerText)); 
                                break;
                            case '-':                           
                                if(lastValue>=parseInt(display.innerText)){
                                    display.innerText = Math.floor(lastValue - parseInt(display.innerText));
                                }else{
                                    display.innerText = '0';
                                } 
                                break;
                            case '×':                            
                                display.innerText = Math.floor(lastValue * parseInt(display.innerText)); 
                                break;
                            case '÷':
                                display.innerText = Math.floor(lastValue / parseInt(display.innerText)); 
                                break;
                        }
                    break;
                case 'A':
                case 'B':
                case 'C':
                case 'D':
                case 'E':
                case 'F':
                    break; 
                default:
                    if(display.innerText!='0')
                        display.innerText+=e.target.innerText;
                    else
                        display.innerText=e.target.innerText;
                break;
            }
        }else if(baseActual==2){
            switch(e.target.innerText){
                case 'CE':
                    display.innerText = '0';
                    break;
                case '÷':
                    lastValue = parseInt(display.innerText,2);                
                    lastOp = '÷';
                    display.innerText = '0';
                    break;
                case '×':
                    lastValue = parseInt(display.innerText,2);               
                    lastOp = '×';
                    display.innerText = '0';
                    break;
                case '←':
                    if(display.innerText!=0){
                        if(display.innerText.length>1)
                            display.innerText = display.innerText.slice(0,-1);
                        else
                            display.innerText = '0';
                    }
                    break;
                case '-':
                    lastValue = parseInt(display.innerText,2);                
                    lastOp = '-';
                    display.innerText = '0';
                    break;
                case '+':
                    lastValue = parseInt(display.innerText,2);                
                    lastOp = '+';
                    display.innerText = '0';
                    break;
                case '=':
                        switch(lastOp){
                            case '+':
                                display.innerText = Math.floor(decBin(lastValue + binDec(display.innerText))); 
                                break;
                            case '-':                           
                                display.innerText = Math.floor(decBin(lastValue - binDec(display.innerText))); 
                                break;
                            case '×':                            
                                display.innerText = Math.floor(decBin(lastValue * binDec(display.innerText))); 
                                break;
                            case '÷':
                                display.innerText = Math.floor(decBin(lastValue / binDec(display.innerText))); 
                                break;
                        }
                    break;
                case 'A':
                case 'B':
                case 'C':
                case 'D':
                case 'E':
                case 'F':
                case '2':
                case '3':
                case '4':
                case '5':
                case '6':
                case '7':
                case '8':
                case '9':
                    break; 
                default:
                    if(display.innerText!='0')
                        display.innerText+=e.target.innerText;
                    else
                        display.innerText=e.target.innerText;
                break;
            }
        }else if(baseActual==8){
            switch(e.target.innerText){
                case 'CE':
                    display.innerText = '0';
                    break;
                case '÷':
                    lastValue = parseInt(display.innerText,8);                
                    lastOp = '÷';
                    display.innerText = '0';
                    break;
                case '×':
                    lastValue = parseInt(display.innerText,8);                
                    lastOp = '×';
                    display.innerText = '0';
                    break;
                case '←':
                    if(display.innerText!=0){
                        if(display.innerText.length>1)
                            display.innerText = display.innerText.slice(0,-1);
                        else
                            display.innerText = '0';
                    }
                    break;
                case '-':
                    lastValue = parseInt(display.innerText,8);                
                    lastOp = '-';
                    display.innerText = '0';
                    break;
                case '+':
                    lastValue = parseInt(display.innerText,8);                
                    lastOp = '+';
                    display.innerText = '0';
                    break;
                case '=':
                        switch(lastOp){
                            case '+':
                                display.innerText = binOct(decBin(Math.floor(lastValue + binDec(octBin(display.innerText)))));  
                                break;
                            case '-':                           
                                display.innerText = binOct(decBin(Math.floor(lastValue - binDec(octBin(display.innerText)))));
                                break;
                            case '×':                            
                                display.innerText = binOct(decBin(Math.floor(lastValue * binDec(octBin(display.innerText)))));    
                                break;
                            case '÷':
                                display.innerText = binOct(decBin(Math.floor(lastValue / binDec(octBin(display.innerText)))));   
                                break;
                        }
                    break;
                case 'A':
                case 'B':
                case 'C':
                case 'D':
                case 'E':
                case 'F':
                case '8':
                case '9':
                    break;   
                default:
                    if(display.innerText!='0')
                        display.innerText+=e.target.innerText;
                    else
                        display.innerText=e.target.innerText;
                break;
            }
        }else if(baseActual==16){
            switch(e.target.innerText){
                case 'CE':
                    display.innerText = '0';
                    break;
                case '÷':
                    lastValue = parseInt(display.innerText,16);                
                    lastOp = '÷';
                    display.innerText = '0';
                    break;
                case '×':
                    lastValue = parseInt(display.innerText,16);                
                    lastOp = '×';
                    display.innerText = '0';
                    break;
                case '←':
                    if(display.innerText!=0){
                        if(display.innerText.length>1)
                            display.innerText = display.innerText.slice(0,-1);
                        else
                            display.innerText = '0';
                    }
                    break;
                case '-':
                    lastValue = parseInt(display.innerText,16);                
                    lastOp = '-';
                    display.innerText = '0';
                    break;
                case '+':
                    lastValue = parseInt(display.innerText,16);                
                    lastOp = '+';
                    display.innerText = '0';
                    break;
                case '=':
                        switch(lastOp){
                            case '+':
                                display.innerText = binHex(decBin(Math.floor(lastValue + binDec(hexBin(display.innerText))))); 
                                break;
                            case '-':                           
                                display.innerText = binHex(decBin(Math.floor(lastValue - binDec(hexBin(display.innerText))))); 
                                break;
                            case '×':                            
                                display.innerText = binHex(decBin(Math.floor(lastValue * binDec(hexBin(display.innerText))))); 
                                break;
                            case '÷':
                                display.innerText = binHex(decBin(Math.floor(lastValue / binDec(hexBin(display.innerText)))));  
                                break;
                        }
                    break;
                default:
                    if(display.innerText!='0')
                        display.innerText+=e.target.innerText;
                    else
                        display.innerText=e.target.innerText;
                break;
            }
        }
    });
});

let btnDark = document.getElementsByClassName('gg-moon');
btnDark[0].addEventListener('click',(e) => {
    if(document.getElementById('lightskin').media != 'none'){
        let lightSkin = document.getElementById('lightskin');
        let darkSkin = document.getElementById('darkskin');
        let fondo = document.getElementById('page-body');
        lightSkin.media = 'none';
        darkSkin.media = '';
        fondo.classList.add('bg');
    }else if(document.getElementById('lightskin').media = 'none'){
        let lightSkin = document.getElementById('lightskin');
        let darkSkin = document.getElementById('darkskin');
        let fondo = document.getElementById('page-body');
        lightSkin.media = '';
        darkSkin.media = 'none';
        fondo.classList.remove('bg');
    }
});