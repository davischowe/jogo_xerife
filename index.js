let des = document.getElementById('des').getContext('2d')

let xerife = new Xerife(455,635,87,102,'imgs/xerife.png')
let civil = new Civilhomem(120,800,87,102,'imgs/civil_H.png')
let civilMule = new Civilmulher(1200,800,87,102,'imgs/civil_M.png')
let carregador = new Ajudas(120,800,67,52,'imgs/imagem_cartucho.png')
let coracao = new Ajudas (120,800, 57, 52, 'imgs/heart.png')


let tempoDeJogo = 0;  
let tempoAjuda = 0;   
let ajudaDisponivel = false;
let ajudaAtual = null; // nova variável para controlar qual ajuda está ativa




let txt_pnts = new Texto()
let txt_vida = new Texto()
let bg = new Image();
bg.src = 'imgs/canva3.png';

let fase = 1;
let velocidadeGlobal = 1;

let gameover = false
let jogoIniciado = false;
let jogoPausado = false;

let somTiro = new Audio('sounds/pistola.mp3');
somTiro.volume = 0.5;

let grupoTiros = [] 
let tiros = {
    des(){
        grupoTiros.forEach((tiro)=>{
            tiro.des_tiro()
        })
    },
    atual(){
        grupoTiros.forEach((tiro, index) => {
            tiro.mov()
            if (tiro.y <= -10) {
                grupoTiros.splice(index, 1);  
            }
        })
    }
}


let grupoDiscos = []
let discos = {
    time1: 0, 
    time2: 0,
    time3: 0,



    criaDisco() {
    this.time1 += 1;
    this.time2 += 1;
    this.time3 += 1;
          
    let tempoMin1 = (fase === 1) ? 120 : 60; 
    let tempoMin2 = (fase === 1) ? 150 : 85;

    let pos_x = (Math.random() * (900 - 2 + 1) + 2);
    let pos_x2 = (Math.random() * (900 - 2 + 1) + 2);
    let pos_x3 = (Math.random() * (900 - 2 + 1) + 2); 
    
    if (this.time1 >= tempoMin1) {
        this.time1 = 0
        grupoDiscos.push(new Disco(pos_x, -200, 87,102, 'imgs/sprintB_01.png'))
    }

    if (this.time2 >= tempoMin2) {
        this.time2 = 0
        grupoDiscos.push(new Disco(pos_x2, -300, 87,102, 'imgs/sprintB_01.png'))
    }

    if (fase >= 2 && this.time3 >= 135) {
        this.time3 = 0
        grupoDiscos.push(new Disco(pos_x3, -400, 87,102, 'imgs/sprintB_01.png'))
    }
},

    des() {
        grupoDiscos.forEach((disc) => {
            disc.des_obj();  
        });
    },

    destroiDisco() {
        grupoTiros.forEach((tiro) => {
            grupoDiscos.forEach((disc) => {
                if (tiro.colid(disc)) {
                    grupoTiros.splice(grupoTiros.indexOf(tiro), 1);
                    grupoDiscos.splice(grupoDiscos.indexOf(disc), 1);
                    xerife.pontos += 1;
                }
            });
        });
    },

    atual() {
        this.criaDisco(); 
        this.destroiDisco();  
        grupoDiscos.forEach((disc) => {
            disc.mov(); 
        });
    }
}

function destruirCivil(){
    grupoTiros.forEach((tiro) => {
        if(tiro.colid(civilMule)){
            grupoTiros.splice(grupoTiros.indexOf(tiro), 1);
            xerife.vida -= 1;
            civilMule.y = 2000;
        }else if(tiro.colid(civil)){
            grupoTiros.splice(grupoTiros.indexOf(tiro), 1);
            xerife.vida -= 1;
            civil.y = 2000;
        }
    });
}



function spawnAjuda() {
    if (!ajudaDisponivel) return; 

    let sorteio = Math.random(); // número entre 0 e 1
    if (sorteio < 0.5) {
        carregador.recomeca();
        coracao.y = 2000; 
        ajudaAtual = carregador; // define o carregador como ativo
    } else {
        coracao.recomeca();
        carregador.y = 2000; 
        ajudaAtual = coracao; // define o coração como ativo
    }
}

document.addEventListener('keypress', (ev)=>{
    if (ev.key === 'l') {
        if (xerife.municao > 0) {
            grupoTiros.push(new Tiro(xerife.x - 10 + xerife.w / 2, xerife.y, 26, 42, 'imgs/tiro.png'));
            xerife.municao -= 1;
        }
    }
})
document.addEventListener('keypress', (ev)=>{
    if (ev.key === 'L') {
        if (xerife.municao > 0) {
            grupoTiros.push(new Tiro(xerife.x - 10 + xerife.w / 2, xerife.y, 26, 42, 'imgs/tiro.png'));
            xerife.municao -= 1;

            somTiro.currentTime = 0;
            somTiro.play()
        }
    }
})
document.addEventListener('keydown', (e) => {
    if (e.key === 'r') {
        if(xerife.cartucho > 0){
            xerife.municao = xerife.maxMunicao;
            xerife.cartucho -= 1;
        }
    }
});
document.addEventListener('keydown', (e) => {
    if (e.key === 'R') {
        if(xerife.cartucho > 0){
            xerife.municao = xerife.maxMunicao;
            xerife.cartucho -= 1;
        }
    }
});
    
document.addEventListener('keydown', (e)=>{
    if((e.key === 'a' )||(e.key === 'ArrowLeft')){
        xerife.dir =- 7
    }else if((e.key === 'd')||(e.key === 'ArrowRight')){
       xerife.dir = 7
    }
})

document.addEventListener('keyup', (e)=>{
        if ((e.key === 'a')||(e.key === 'ArrowLeft')) {
            xerife.dir = 0
        }else if((e.key === 'd')||(e.key === 'ArrowRight')){
            xerife.dir = 0
        }
} )
document.addEventListener('keydown', (e)=>{
    if((e.key === 'A' )||(e.key === 'ArrowLeft')){
        xerife.dir =- 7
    }else if((e.key === 'D')||(e.key === 'ArrowRight')){
       xerife.dir = 7
    }
})

document.addEventListener('keyup', (e)=>{
        if ((e.key === 'A')||(e.key === 'ArrowLeft')) {
            xerife.dir = 0
        }else if((e.key === 'D')||(e.key === 'ArrowRight')){
            xerife.dir = 0
        }
} )

function perderVida(){
    grupoDiscos.forEach((disc) => {
        if (xerife.vidas(disc)) {
            xerife.vida -= 1
            grupoDiscos.splice(grupoDiscos.indexOf(disc), 1)
        }
    })

    if (xerife.vida <= 0) {
        window.location.href = 'gameover.html';
    }

}

function carregarCartucho(){
    grupoTiros.forEach((tiro) => {
        if(tiro.colid(carregador)){  
            grupoTiros.splice(grupoTiros.indexOf(tiro), 1);
            xerife.cartucho += 1;
            carregador.y = 2000;  
        }
    });
}
function ganharmaisVidas(){
    grupoTiros.forEach((tiro) => {
        if(tiro.colid(coracao)){  
            grupoTiros.splice(grupoTiros.indexOf(tiro), 1);
            xerife.vida += 1;
            coracao.y = 2000;  
        }
    });
}


document.addEventListener('keydown', (e) => {
    if (e.key === 'g') {
        jogoIniciado = true;
    }

    if (e.key === 'p') {
        jogoPausado = !jogoPausado;
    }
});

function checarFase() {
    if (xerife.pontos >= 10 && fase === 1) {
        fase = 2;
        velocidadeGlobal += 0.5;
        discos.time3 = 0; 
    }
    if (xerife.pontos >= 20 && fase === 2) {
        fase = 3;
        velocidadeGlobal += 0.5;
    }
}


function desenhar(){
des.drawImage(bg, 0, 0, 1300, 750);
xerife.des_obj();
tiros.des()
discos.des()
civil.des_obj();
civilMule.des_obj();
carregador.des_obj();
coracao.des_obj();
txt_vida.des_text('Vidas:', 40, 28, 'white', '20px Arial')
txt_vida.des_text(xerife.vida, 90, 28, 'white', '20px Arial')
txt_pnts.des_text('Pontos:', 910, 30, 'white', '20px Arial')
txt_pnts.des_text(xerife.pontos, 970, 30, 'white', '20px Arial')
txt_vida.des_text('Munição:', 200, 28, 'white', '20px Arial');
txt_vida.des_text(xerife.municao + '/' + xerife.maxMunicao, 280, 28, 'white', '20px Arial');
txt_vida.des_text('Cartucho', 580, 28, 'white', '20px Arial');
txt_vida.des_text(xerife.cartucho,680, 28, 'white', '20px Arial');
}


function atualizar(){
    xerife.x += xerife.dir 
    xerife.mov_xerife();
    civil.mov_civil();
    civilMule.mov_civil_M();
    tiros.atual();
    discos.atual();

    if (ajudaAtual) {
        ajudaAtual.mov_ajuda();
    }

    carregarCartucho();
    perderVida();
    destruirCivil();
    checarFase();
    ganharmaisVidas();

    if (jogoIniciado && !jogoPausado) {
        tempoDeJogo++;
    }

    // libera ajuda depois de 25 segundos (25 * 60 = 1500 frames)
    if (tempoDeJogo >= 600) {
        ajudaDisponivel = true;
    }

    if (ajudaDisponivel) {
        tempoAjuda++;
        if (tempoAjuda >= 300) { 
            spawnAjuda();
            tempoAjuda = 0;
        }
    }
}
function main(){
    des.clearRect(0, 0, 1300, 750);

    if (jogoIniciado && !jogoPausado) {
        desenhar();
        atualizar();
    } else {
        des.font = "30px Arial";
        des.fillStyle = "white";
        des.textAlign = "center";
        des.fillText(
            jogoPausado ? "Jogo Pausado - Pressione P para continuar" : "Pressione G para iniciar",
            515, 375
        );
    }

    requestAnimationFrame(main);;
}

main()