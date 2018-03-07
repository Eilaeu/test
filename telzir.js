var origem;
var destino;
var plano;
var tempo;
var valmin;

var total_pagar; 
var sem_plano;

var arr;
var ddd; 
var planos;
  

function getValues(e){
	
	if(e.which === 1 || e.which === 13 )
	{
		//Função que confere os valores para o calculo do valor por ligação.
		origem  = document.getElementById("origem") .value;
		destino = document.getElementById("destino").value;
		plano   = document.getElementById("planos") .value;
		tempo   = document.getElementById("tempo")  .value;

		console.log(origem+' '+destino+' '+plano +' tempo '+tempo);

		//verificando se o usuario preencheu o tempo, caso não focus on input tempo.

		if (tempo!=''){
			
			searchPlan(); 
			
			// conferindo estilos para objetos.
			document.querySelector("#tempo").style.borderColor = 'initial';
			document.querySelector(".vertical-center").className += " move-top";
			document.querySelector(".planos").style.opacity = "1";

		}
		else {
			//chamar atenção do usuario.
			document.querySelector("#tempo").focus();
			document.querySelector("#tempo").style.borderColor = 'red';
		}
	}
}


function appendOptions (selector, array){

	//Função que popula os selects.

	for(var i = 0; i < array.length; i++) 
	{

		var sel  = document.getElementById(selector); 
	    var opt  = document.createElement('option');
	    
	    opt.innerHTML  = selector == 'planos'?  "FALE MAIS "+ array[i] :  array[i];
	    opt.value      = array[i];

	    sel.appendChild(opt);

	}

}

function searchPlan(){

	//função que varre o array de planos em busca do valor do minuto de ligação.

	for(i = 0; i != arr.length; i++)
	{
		if( arr[i][0] == origem && arr [i][1] == destino)
			valmin = arr [i][2];			
	}

	totalVal();
}

function totalVal() {

	total_pagar = tempo - plano;

	sem_plano   = tempo * valmin;

	valor       = Number(tempo) > Number(plano) ?  total_pagar * (valmin+valmin * 10 / 100) : 0;

	//atribuindo valores no html com duas casas apos a virgula
	document.querySelector('#fale').innerHTML   = valor.toFixed(2);  
	document.querySelector('#n_fale').innerHTML = sem_plano.toFixed(2); 
}

function init(){

	// Caso tivesse de alimentar esses arrays por uma fonte estena as funções responsaveis seriam chamadas aqui :v

	arr     = [['011','011',1.9],
			   ['011','016',1.9],
 			   ['011','017',1.7],
 			   ['011','018',0.9],
		   	   ['016','011',2.9],
		   	   ['016','016',2.9],
		   	   ['016','017',2.9],
		   	   ['016','018',2.9],
		       ['017','011',2.7],
		       ['017','016',2.7],
		       ['017','017',2.7],
		       ['017','018',2.7],
		       ['018','011',1.9],
		       ['018','016',1.9],
		       ['018','017',1.9],
		       ['018','018',1.9]];
	
	ddd    = ['011','016','017','018']; 

	planos = [30, 60, 120];

	appendOptions( 'origem' ,  ddd);
	appendOptions( 'destino',  ddd);
	appendOptions( 'planos' ,  planos);

	document.getElementById("btn_calculate").addEventListener("click", getValues);
	document.getElementById("tempo").addEventListener("keypress", getValues);
}

init();