let des = document.getElementById('des').getContext('2d')




let xerife = new Xerife(300,650,100,45,'imgs/xerife.png')
let bandido = new Bandido(100,700,100,45,'imgs/bandido.png')
let bandido2 = new Bandido(200,400,100,45,'imgs/bandido2.png')
let civil = new Civilhomem(400,200,100,45,'imgs/civil_H.png')
let civilMule = new Civilmulher(100,700,100,45,'imgs/civil_M.png')

let bg = new Image();
bg.scr = 'imgs/bg_guard_bank.jpg'



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

}










function main(){
    des.clearRect(0,0,1300,750)
desenhar();
atualizar();
requestAnimationFrame(main);


}

main()