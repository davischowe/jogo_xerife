let des = document.getElementById('des').getContext('2d')

let xerife = new Xerife(300,650,150,65,'imgs/xerife.png')
//let bandido = new Bandido(100,60,100,45,'imgs/bandido.png')
//let bandido2 = new Bandido(200,400,100,45,'imgs/bandido2.png')
let civil = new Civilhomem(120,800,87,102,'imgs/civil_H.png')
let civilMule = new Civilmulher(1200,800,87,102,'imgs/civil_M.png')

let txt_pnts = new Texto()
let txt_vida = new Texto()

let bg = new Image();
bg.scr = 'imgs/bg_guard_bank.jpg'

let jogoIniciado = false;
let jogoPausado = false;

let grupoTiros = [] 
let tiros = {
    des(){
        grupoTiros.forEach((tiro)=>{
            tiro.des_tiro()
        })
    },
    atual(){
        grupoTiros.forEach((tiro)=>{
            tiro.mov()
            if(tiro.y <= -10){
                grupoTiros.splice(tiro[0],1)
            }
        })
    }
}


let grupoDiscos = []
let discos = {
    time1: 0, 
    time2: 0,
    time3: 0,

    criaDisco(){
        this.time1 += 1
        this.time2 += 1
        this.time3 += 1
        let pos_x = (Math.random() * (900 - 2 +1)+2)
        // let pos_x2 = (Math.random() * (900 - 2 +1)+2)
        // let pos_x3 = (Math.random() * (900 - 2 +1)+2)
        if(this.time1 >=60){
            this.time1 = 0
            grupoDiscos.push(new Disco(pos_x,-200,75,75,'/imgs/bandido.png'))
            console.log(grupoDiscos)
        }
        // if(this.time2 >=85){
        //     this.time2 = 0
        //     grupoDiscos.push(new Disco(pos_x2,-300,50,50,'/imgs/bandido2.png'))
        //     console.log(grupoDiscos)
        // }
        // if(this.time3 >=135){
        //     this.time3 = 0
        //     grupoDiscos.push(new Disco(pos_x3,-400,50,50,'/imgs/bandido.png'))
        //     console.log(grupoDiscos)
        // }
    },
    des(){
        grupoDiscos.forEach((disc)=>{
            disc.des_obj()
        })
    },
    destroiDisco(){
        grupoTiros.forEach((tiro)=>{
            grupoDiscos.forEach((disc)=>{
                if(tiro.colid(disc)){
                    grupoTiros.splice(grupoTiros.indexOf(tiro), 1)
                    grupoDiscos.splice(grupoDiscos.indexOf(disc), 1)
                    // xerife.pts +=1
                }
            })
        })
    },
    atual(){
        this.criaDisco()
        this.destroiDisco()
        grupoDiscos.forEach((disc)=>{
            disc.mov()
            if(disc.y >= 1010){
                grupoDiscos.splice(grupoDiscos.indexOf(disc),1)
            }
        })
    }
}





document.addEventListener('keypress', (ev)=>{
    if (ev.key === 'l') {
        grupoTiros.push(new Tiro(xerife.x - 4 + xerife.w / 2, xerife.y, 8, 16, 'red'))
        // console.log(grupoTiros)
    }

    
})
    
document.addEventListener('keydown', (e)=>{
    if((e.key === 'a' )||(e.key === 'ArrowLeft')){
        xerife.dir = -5
    }else if((e.key === 'd')||(e.key === 'ArrowRight')){
       xerife.dir = 5
    }
})

document.addEventListener('keyup', (e)=>{
        if ((e.key === 'a')||(e.key === 'ArrowLeft')) {
            xerife.dir = 0
        }else if((e.key === 'd')||(e.key === 'ArrowRight')){
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
}

document.addEventListener('keydown', (e) => {
    if (e.key === 'g') {
        jogoIniciado = true;
    }

    if (e.key === 'p') {
        jogoPausado = !jogoPausado; // Alterna entre pausado e não pausado
    }
});






function desenhar(){
xerife.des_obj();
tiros.des()
discos.des()
civil.des_obj();
civilMule.des_obj();
txt_vida.des_text('Vidas:', 40, 28, 'white', '20px Arial')
txt_vida.des_text(xerife.vida, 90, 28, 'white', '20px Arial')
txt_pnts.des_text('Pontos:', 910, 30, 'white', '20px Arial')
txt_pnts.des_text(xerife.pontos, 970, 30, 'white', '20px Arial')
}


function atualizar(){
xerife.x += xerife.dir 
xerife.mov_xerife();
civil.mov_civil();
civilMule.mov_civil_M();
tiros.atual();
discos.atual();
perderVida();
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