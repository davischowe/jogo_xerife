let des = document.getElementById('des').getContext('2d')



let xerife = new Xerife(300,650,100,45,'imgs/xerife.png')
let bandido = new Bandido(100,700,100,45,'imgs/bandido.png')




document.addEventListener('keydown', (e)=>{
    if(e.key === 'a'){
        xerife.dir -= 5
    }else if(e.key === 'd'){
       xerife.dir += 5
    }
})



function desenhar(){
xerife.des_obj();
bandido.des_obj()


}







function atualizar(){
bandido.mov_bandido()
xerife.mov_xerife()

}










function main(){
    des.clearRect(0,0,1300,750)
desenhar();
atualizar();
requestAnimationFrame(main);


}

main()