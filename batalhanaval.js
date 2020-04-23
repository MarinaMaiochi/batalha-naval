let sentido = 'HORI';
let navio;
let qtd1 = 4;
let qtd2 = 3;
let qtd3 = 2;
let qtd4 = 1;

document.querySelector('.info').addEventListener('click', info);
document.querySelector('.limpa').addEventListener('click', limpar);
document.querySelector('.comeca').addEventListener('click', comecar);
document.querySelector('.sentido').addEventListener('click', Sentido);
function info(event){
    const infoBut = document.querySelector(".mostraInfos");
    if(infoBut.classList.contains('some')){
        infoBut.classList.remove('some');
    } else {
        infoBut.classList.add('some');
    }
}
function limpar(){
    const naviosColocados = document.querySelectorAll(".navio");
    for (let i = 0; i < naviosColocados.length; i++) {
        naviosColocados[i].classList.remove('navio');
        naviosColocados[i].classList.remove('navio1');
        naviosColocados[i].classList.remove('vertical');
        naviosColocados[i].classList.remove('navioPonta');
        naviosColocados[i].classList.remove('traz');
        naviosColocados[i].classList.remove('navioMeio');
    }
    qtd1 = 4; document.querySelector('.qtdTam1').innerText = qtd1 ;
    qtd2 = 3; document.querySelector('.qtdTam2').innerText = qtd2 ;
    qtd3 = 2; document.querySelector('.qtdTam3').innerText = qtd3 ;
    qtd4 = 1; document.querySelector('.qtdTam4').innerText = qtd4 ;
}
function comecar(){
    if (qtd1 == 0 && qtd2 == 0 && qtd3 == 0 && qtd4 == 0){
        deixaEscuro();
    }
}
function deixaEscuro(){
    document.querySelector(".sentido").classList.add('escuro');
    document.querySelector(".limpa").classList.add('escuro');
    document.querySelector(".qtdTam1").classList.add('escuro');
    document.querySelector(".qtdTam2").classList.add('escuro');
    document.querySelector(".qtdTam3").classList.add('escuro');
    document.querySelector(".qtdTam4").classList.add('escuro');
    document.querySelector(".nav1").classList.add('escuro');
    document.querySelector(".nav2").classList.add('escuro');
    document.querySelector(".nav3").classList.add('escuro');
    document.querySelector(".nav4").classList.add('escuro');
    document.querySelector(".nav1").classList.remove('highlight');
    document.querySelector(".nav2").classList.remove('highlight');
    document.querySelector(".nav3").classList.remove('highlight');
    document.querySelector(".nav4").classList.remove('highlight');
}
function Sentido(event){
    if(event.target.classList.contains('vert')){
        event.target.classList.remove('vert');
        sentido = 'HORI';
    } else {
        event.target.classList.add('vert');
        sentido = 'VERT';
    }
}
function setTabuleiroJog (){
    const tabuleiro = document.querySelector(".tabuleiroJog");         
    for (let j = 0; j < 10; j++) {             
        const divColuna = document.createElement('div');
        for (let i = 0; i < 10; i++) {
            const celula = document.createElement('div');
            celula.classList.add('celula');
            celula.classList.add('agua');
            celula.setAttribute("data-coluna" , j);
            celula.setAttribute("data-linha" , i);
            celula.addEventListener('click', colocaNavio, false);
            divColuna.appendChild(celula);
        }  
        tabuleiro.appendChild(divColuna);
    }
}
document.querySelector('.nav1').addEventListener('click', tamanhoNavio);
document.querySelector('.nav2').addEventListener('click', tamanhoNavio);
document.querySelector('.nav3').addEventListener('click', tamanhoNavio);
document.querySelector('.nav4').addEventListener('click', tamanhoNavio);

function tamanhoNavio(event) {
   
    if (event.target.classList.contains('nav1')) {
        navio = 1;    
    } else if (event.target.classList.contains('nav2')) {
        navio = 2;      
    }else if (event.target.classList.contains('nav3')) {
        navio = 3;       
    }else { (event.target.classList.contains('nav4')) 
        navio = 4;       
    }
    document.querySelector('.nav1').classList.remove('highlight');
    document.querySelector('.nav2').classList.remove('highlight');
    document.querySelector('.nav3').classList.remove('highlight');
    document.querySelector('.nav4').classList.remove('highlight');
    event.target.classList.add('highlight'); 
}
function colocaNavio(event) {
    const celula = event.target;
    const colI = parseInt(celula.getAttribute('data-coluna'),10);
    const linI = parseInt(celula.getAttribute('data-linha'),10); 
    const coord = normalizaEspaco(colI,linI,navio);
    const disp = checaEspacosDisponiveis(coord.colunaInicial, coord.culunaFinal, coord.linhaInicial, coord.linhaFinal);
    if (!disp){  return;   }
    const coluna = coord.colunaInicial;
    const linha = coord.linhaInicial;

    if (navio == 1 && qtd1 > 0){
        
        qtd1--;
        document.querySelector('.qtdTam1').innerText = qtd1 ;
        celula.classList.add('navio', 'navio1');
        if (sentido == 'VERT'){
            celula.classList.add('vertical');
        }
           
    } else if (navio == 2 && qtd2 > 0){   
        if (sentido == 'HORI'){ 
            aplicaNavioHori(coord.colunaInicial, coord.culunaFinal, coord.linhaInicial);
        } else if (sentido == 'VERT'){
            aplicaNavioVert(coord.colunaInicial,coord.linhaInicial, coord.linhaFinal);
        }
        qtd2--;
        document.querySelector('.qtdTam2').innerText = qtd2 ;
        
    } else if (navio == 3 && qtd3 > 0){
        if (sentido == 'HORI'){
            aplicaNavioHori(coord.colunaInicial, coord.culunaFinal, coord.linhaInicial);             
        } else if (sentido == 'VERT'){
            aplicaNavioVert(coord.colunaInicial,coord.linhaInicial, coord.linhaFinal);               
        } 
        qtd3--;
        document.querySelector('.qtdTam3').innerText = qtd3 ;  

    } else if (navio == 4 && qtd4 > 0){
        if (sentido == 'HORI'){
            aplicaNavioHori(coord.colunaInicial, coord.culunaFinal, coord.linhaInicial);               
        } else if (sentido == 'VERT'){
            aplicaNavioVert(coord.colunaInicial,coord.linhaInicial, coord.linhaFinal);                
        }
        qtd4--;
        document.querySelector('.qtdTam4').innerText = qtd4 ;
    }
}
function aplicaNavioHori(colI, colF, linI){
   document.querySelector(`[data-coluna="${colI}"][data-linha="${linI}"]`).classList.add('navio', 'navioPonta');
   document.querySelector(`[data-coluna="${colF}"][data-linha="${linI}"]`).classList.add('navio', 'navioPonta', 'traz');
   if (colF-colI>1){
        for (let j = colI+1; j < colF; j++) {
            document.querySelector(`[data-coluna="${j}"][data-linha="${linI}"]`).classList.add('navio', 'navioMeio');
        } 
    }           
}
function aplicaNavioVert(colI, linI, linF){
    document.querySelector(`[data-coluna="${colI}"][data-linha="${linI}"]`).classList.add('navio', 'navioPonta', 'vertical');
    document.querySelector(`[data-coluna="${colI}"][data-linha="${linF}"]`).classList.add('navio', 'navioPonta', 'traz', 'vertical');
    if (linF-linI>1){
         for (let i = linI+1; i < linF; i++) {
             document.querySelector(`[data-coluna="${colI}"][data-linha="${i}"]`).classList.add('navio', 'navioMeio', 'vertical');
         } 
     }           
 }
function checaEspacosDisponiveis(colI, colF, linI, linF){
    let disponivel = true;
    for (let j = colI; j <= colF; j++) {
        for (let i = linI; i <= linF; i++) {
            const celula = !document.querySelector(`[data-coluna="${j}"][data-linha="${i}"]`).classList.contains('navio');
            disponivel = disponivel && celula;
        }
    }
    return disponivel;
}
function normalizaEspaco(colI,linI,tamanho){
    let colF ;
    let linF;
    if (sentido == 'HORI'){
        if (10-colI >= tamanho){
            colF = colI + tamanho -1;
            linF = linI ;
        } else {
            colF = 9 ;
            colI = colF - tamanho + 1;
            linF = linI ;
        }
    } else  if (sentido == 'VERT'){
        if (10-linI >= tamanho){
            linF = linI + tamanho -1;
            colF = colI ;
        } else {
            linF = 9 ;
            linI = linF - tamanho + 1;
            colF = colI ;
        }
    }
    return {
        colunaInicial: colI ,
        culunaFinal: colF,
        linhaInicial: linI,
        linhaFinal: linF
    };
}


// function inicializaMatrizPc(){
//     const matrizPc = [];
//     for (let i = 0; i < 10; i++) {                                   
//         const linha = [];
//         for (let j = 0; j < 10; j++) {
//             linha.push(' ')
//         }
//         matrizPc.push(linha);
//     }
//     colocaNavioPc(matrizPc);
//     return matrizPc;
// }

// function colocaNavioPc(matrizPc){
//     math.floor(math.random() * (max - min)) + min


// }



setTabuleiroJog();