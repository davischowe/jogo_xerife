let des = document.getElementById('des').getContext('2d')

let xerife = new Xerife(300,650,100,45,'imgs/xerife.png')
let bandido = new Bandido(100,700,100,45,'imgs/bandido.png')
let bandido2 = new Bandido(200,400,100,45,'imgs/bandido2.png')
let civil = new Civilhomem(400,200,100,45,'imgs/civil_H.png')
let civilMule = new Civilmulher(100,700,100,45,'imgs/civil_M.png')

let bg = new Image();
bg.scr = 'imgs/bg_guard_bank.jpg'

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
        let pos_x = (Math.random() * (438 - 2 +1)+2)
        let pos_x2 = (Math.random() * (438 - 2 +1)+2)
        let pos_x3 = (Math.random() * (438 - 2 +1)+2)
        if(this.time1 >=60){
            this.time1 = 0
            grupoDiscos.push(new Disco(pos_x,-200,50,50,'/imgs/tiro.png'))
            console.log(grupoDiscos)
        }
        if(this.time2 >=85){
            this.time2 = 0
            grupoDiscos.push(new Disco(pos_x2,-300,50,50,'/imgs/tiro.png'))
            console.log(grupoDiscos)
        }
        if(this.time3 >=135){
            this.time3 = 0
            grupoDiscos.push(new Disco(pos_x3,-400,50,50,'/imgs/tiro.png'))
            console.log(grupoDiscos)
        }
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
            if(disc.y >= 710){
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





function desenhar(){
xerife.des_obj();
tiros.des()
discos.des()
bandido.des_obj();
bandido2.des_obj();
civil.des_obj();
civilMule.des_obj();


}







function atualizar(){
    xerife.x += xerife.dir 


    bandido2.mov_bandido();
bandido.mov_bandido();
xerife.mov_xerife();
civil.mov_civil();
civilMule.mov_civil_M()
tiros.atual()
 discos.atual()
}










function main(){
    des.clearRect(0,0,1300,750)
desenhar();
atualizar();
requestAnimationFrame(main);


}

main()