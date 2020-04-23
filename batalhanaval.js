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
function info(){
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
    const coord = normalizaEspaco(colI,linI,navio, sentido);
    const disp = checaEspacosDisponiveis(coord.colunaInicial, coord.colunaFinal, coord.linhaInicial, coord.linhaFinal, '.tabuleiroJog');
    if (!disp){  return;   }
    
    if (navio == 1 && qtd1 > 0){
        
        qtd1--;
        document.querySelector('.qtdTam1').innerText = qtd1 ;
        celula.classList.add('navio', 'navio1');
        if (sentido == 'VERT'){
            celula.classList.add('vertical');
        }
           
    } else if (navio == 2 && qtd2 > 0){   
        if (sentido == 'HORI'){ 
            aplicaNavioHori(coord.colunaInicial, coord.colunaFinal, coord.linhaInicial, '.tabuleiroJog');
        } else if (sentido == 'VERT'){
            aplicaNavioVert(coord.colunaInicial,coord.linhaInicial, coord.linhaFinal, '.tabuleiroJog');
        }
        qtd2--;
        document.querySelector('.qtdTam2').innerText = qtd2 ;
        
    } else if (navio == 3 && qtd3 > 0){
        if (sentido == 'HORI'){
            aplicaNavioHori(coord.colunaInicial, coord.colunaFinal, coord.linhaInicial, '.tabuleiroJog');             
        } else if (sentido == 'VERT'){
            aplicaNavioVert(coord.colunaInicial,coord.linhaInicial, coord.linhaFinal, '.tabuleiroJog');               
        } 
        qtd3--;
        document.querySelector('.qtdTam3').innerText = qtd3 ;  

    } else if (navio == 4 && qtd4 > 0){
        if (sentido == 'HORI'){
            aplicaNavioHori(coord.colunaInicial, coord.colunaFinal, coord.linhaInicial, '.tabuleiroJog');               
        } else if (sentido == 'VERT'){
            aplicaNavioVert(coord.colunaInicial,coord.linhaInicial, coord.linhaFinal, '.tabuleiroJog');                
        }
        qtd4--;
        document.querySelector('.qtdTam4').innerText = qtd4 ;
    }
}
function aplicaNavioHori(colI, colF, linI, parent){
   document.querySelector(`${parent} [data-coluna="${colI}"][data-linha="${linI}"]`).classList.add('navio', 'navioPonta');
   document.querySelector(`${parent} [data-coluna="${colF}"][data-linha="${linI}"]`).classList.add('navio', 'navioPonta', 'traz');
   if (colF-colI>1){
        for (let j = colI+1; j < colF; j++) {
            document.querySelector(`${parent} [data-coluna="${j}"][data-linha="${linI}"]`).classList.add('navio', 'navioMeio');
        } 
    }           
}
function aplicaNavioVert(colI, linI, linF, parent){
    document.querySelector(`${parent} [data-coluna="${colI}"][data-linha="${linI}"]`).classList.add('navio', 'navioPonta', 'vertical');
    document.querySelector(`${parent} [data-coluna="${colI}"][data-linha="${linF}"]`).classList.add('navio', 'navioPonta', 'traz', 'vertical');
    if (linF-linI>1){
         for (let i = linI+1; i < linF; i++) {
             document.querySelector(`${parent} [data-coluna="${colI}"][data-linha="${i}"]`).classList.add('navio', 'navioMeio', 'vertical');
         } 
     }           
}
function checaEspacosDisponiveis(colI, colF, linI, linF, parent){
    let disponivel = true;
    for (let j = colI; j <= colF; j++) {
        for (let i = linI; i <= linF; i++) {
            const celula = !document.querySelector(`${parent} [data-coluna="${j}"][data-linha="${i}"]`).classList.contains('navio');
            disponivel = disponivel && celula;
        }
    }
    return disponivel;
}
function normalizaEspaco(colI,linI,tamanho, orientacao){
    let colF ;
    let linF;
    if (orientacao == 'HORI'){
        if (10-colI >= tamanho){
            colF = colI + tamanho -1;
            linF = linI ;
        } else {
            colF = 9 ;
            colI = colF - tamanho + 1;
            linF = linI ;
        }
    } else  if (orientacao == 'VERT'){
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
        colunaFinal: colF,
        linhaInicial: linI,
        linhaFinal: linF
    };
}
function setTabuleiroPc(){
    const tabuleiro = document.querySelector(".tabuleiroPc");         
    for (let j = 0; j < 10; j++) {             
        const divColuna = document.createElement('div');
        for (let i = 0; i < 10; i++) {
            const celula = document.createElement('div');
            celula.classList.add('celula');
            celula.classList.add('agua');
            celula.setAttribute("data-coluna" , j);
            celula.setAttribute("data-linha" , i);
            celula.addEventListener('click', confereBombaTabPc, false);
            divColuna.appendChild(celula);
        }  
        tabuleiro.appendChild(divColuna);
    }
    colocaNavioPc();
}
function colocaNavioPc(){  
    let qtd1Pc = 4;
    let qtd2Pc = 3;
    let qtd3Pc = 2;
    let qtd4Pc = 1;

    while (qtd4Pc > 0) {
        let sentidoAleat = Math.floor(Math.random() *2);
        const sentidoStr = sentidoAleat==0?'HORI':'VERT';
        let colI = Math.floor(Math.random() *10);
        let linI = Math.floor(Math.random() *10);
        
        const coord = normalizaEspaco(colI,linI,4,sentidoStr);
        if (sentidoAleat == 0){
            aplicaNavioHori(coord.colunaInicial, coord.colunaFinal, coord.linhaInicial , '.tabuleiroPc');             
        } else if (sentidoAleat == 1){
            aplicaNavioVert(coord.colunaInicial,coord.linhaInicial, coord.linhaFinal, '.tabuleiroPc');               
        } 
        qtd4Pc--;   
    }
    while (qtd3Pc > 0) {
        let sentidoAleat = Math.floor(Math.random() *2);
        const sentidoStr = sentidoAleat==0?'HORI':'VERT';
        let colI = Math.floor(Math.random() *10);
        let linI = Math.floor(Math.random() *10);
        
        const coord = normalizaEspaco(colI,linI,3,sentidoStr);
        const disp = checaEspacosDisponiveis(coord.colunaInicial, coord.colunaFinal, coord.linhaInicial, coord.linhaFinal, '.tabuleiroPc');
        if (disp){   
            if (sentidoAleat == 0){
                aplicaNavioHori(coord.colunaInicial, coord.colunaFinal, coord.linhaInicial, '.tabuleiroPc');             
            } else if (sentidoAleat == 1){
                aplicaNavioVert(coord.colunaInicial,coord.linhaInicial, coord.linhaFinal, '.tabuleiroPc');               
            } 
            qtd3Pc--;   
        }
    }
    while (qtd2Pc > 0) {
        let sentidoAleat = Math.floor(Math.random() *2);
        const sentidoStr = sentidoAleat==0?'HORI':'VERT';
        let colI = Math.floor(Math.random() *10);
        let linI = Math.floor(Math.random() *10);
        
        const coord = normalizaEspaco(colI,linI,2,sentidoStr);
        const disp = checaEspacosDisponiveis(coord.colunaInicial, coord.colunaFinal, coord.linhaInicial, coord.linhaFinal, '.tabuleiroPc');
        if (disp){  
            if (sentidoAleat == 0){
                aplicaNavioHori(coord.colunaInicial, coord.colunaFinal, coord.linhaInicial, '.tabuleiroPc');             
            } else if (sentidoAleat == 1){
                aplicaNavioVert(coord.colunaInicial,coord.linhaInicial, coord.linhaFinal, '.tabuleiroPc');               
            } 
            qtd2Pc--; 
        }
    }
    while (qtd1Pc > 0) {
        let sentidoAleat = Math.floor(Math.random() *2);
        const sentidoStr = sentidoAleat==0?'HORI':'VERT';
        let colI = Math.floor(Math.random() *10);
        let linI = Math.floor(Math.random() *10);
        
        const coord = normalizaEspaco(colI,linI,1,sentidoStr);
        const disp = checaEspacosDisponiveis(coord.colunaInicial, coord.colunaFinal, coord.linhaInicial, coord.linhaFinal, '.tabuleiroPc');
        if (disp){            
            document.querySelector(`${'.tabuleiroPc'} [data-coluna="${colI}"][data-linha="${linI}"]`).classList.add('navio', 'navio1');
            if (sentidoAleat == 1){
                document.querySelector(`${'.tabuleiroPc'} [data-coluna="${colI}"][data-linha="${linI}"]`).classList.add('vertical');
            }
            qtd1Pc--; 
        }   
    }
}
function confereBombaTabPc(event){
    const celula = event.target;
    if (celula.classList.contains('navio')){
        celula.classList.add('bomba');
    } else {
        celula.classList.add('bombaagua');
    }
}
setTabuleiroPc();
setTabuleiroJog();