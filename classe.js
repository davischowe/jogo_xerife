class Obj{
    constructor(x,y,w,h,a){
        this.x = x
        this.y = y
        this.w = w
        this.h = h
        this.a = a
    }

    des_obj(){
        let img = new Image()
        img.src = this.a
        des.drawImage(img,this.x,this.y,this.w,this.h)
    }

    colid(objeto){
        if((this.x < objeto.x + objeto.w)&&
        (this.x + this.w > objeto.x)&&
        (this.y < objeto.y + objeto.h)&&
        (this.y + this.h > objeto.y)){
             return true
         }else{
             return false
         }
    }
  
}



class Xerife extends Obj{
    dir = 0
    pontos = 0
    vida = 10
    cartucho = 3;
    municao = 30; 
    maxMunicao = 30; 

    constructor(x, y, w, h, a) {
        super(x, y, w, h, a);
        this.time = 0;
        this.frame = 0;
    }

    mov_xerife(){
        this.time++;
        this.x += this.dir
        if(this.x <= 4){
            this.x = 4
        }else if(this.x >= 900){
            this.x = 900
        }
        if(this)
        

         if (this.time >= 10) {
            this.time = 0;  

          
            this.frame = (this.frame + 1) % 3;  
            if (this.frame === 0) {
                this.a = 'imgs/xerife.png';  
            } else if (this.frame === 1) {
                this.a = 'imgs/xerife_02.png';  
            } else if (this.frame === 2){
                this.a = 'imgs/xerife_03.png'
            }
        }
    }
    vidas(objeto) {
        if (!objeto.pontuacao && objeto.y >= 680 && objeto.y <= 1000) {
            objeto.pontuacao = true; 
            return true;
        }
        if (objeto.y > 700) {
            objeto.pontuacao = false;
        }

        return false;
    }
}

class Bandido extends Obj{
    frame = 0; 
    mov() {
        this.y += 2;
        this.frame += 1; 
        if (this.frame >= 10) { 
            this.a = this.a.includes('imgs/sprintB_01.png') ? 'imgs/sprintB_02.png' : 'imgs/campones2.png'; 
            this.frame = 0; 
        } 
        if (this.x >= 1300) {
            this.recomeca();
        }
    }
    recomeca() {
        this.y = -100;
        this.y = Math.floor(Math.random() * ((416 - 2 + 1) + 2));
    }

}

class Ajudas extends Obj{
    mov_ajuda(){
        this.y += 2
        if(this.y >= 780){
            this.recomeca()
        }
    }
    recomeca(){
        this.y = -100
        this.x = Math.floor(Math.random() * ((416 - 2 + 1) + 2))
    }

}


class Civilhomem extends Obj{
    constructor(x, y, w, h, a) {
        super(x, y, w, h, a);
        this.time = 0;
        this.frame = 0;
    }

    mov_civil(){
        this.x += 2 * velocidadeGlobal; 
        if(this.x >= 1300){
            this.recomeca()
        }
        this.time++;  

        
        if (this.time >= 10) {
            this.time = 0;  

          
            this.frame = (this.frame + 1) % 3;  
            if (this.frame === 0) {
                this.a = 'imgs/civil_H.png';  
            } else if (this.frame === 1) {
                this.a = 'imgs/civil_H2.png';  
            } else if(this.frame === 3){
                this.a = 'imgs/civil_H3.png'
            }
        }
    }
    recomeca(){
        this.x = -100
        this.y = Math.floor(Math.random() * ((416 - 2 + 1) + 2))
    }


}


class Civilmulher extends Obj{
    constructor(x, y, w, h, a) {
        super(x, y, w, h, a);
        this.time = 0;
        this.frame = 0;
    }
    mov_civil_M(){
        this.x += 2 * velocidadeGlobal; 
        if(this.x >= 1300){
            this.recomeca()
        }
        this.time++;  
        if (this.time >= 10) {
            this.time = 0;  
            this.frame = (this.frame + 1) % 3;  
            if (this.frame === 1) {
                this.a = 'imgs/civil_M.png';  
            } else if (this.frame === 2) {
                this.a = 'imgs/civil_M2.png';  
            } 
        }
    }
    recomeca(){
        this.x = -100
        this.y = Math.floor(Math.random() * ((416 - 2 + 1) + 2))
    }


}

class Tiro extends Obj{
    constructor(x, y, w, h, at) {
        super(x, y, w, h, 'imgs/tiro.png'); 
        this.at = at; 
    }

    des_tiro() {
        let img = new Image();
        img.src = this.a;
        des.drawImage(img, this.x, this.y, this.w, this.h);
    }

    mov() {
        this.y -= 10;
    }
}
    class Disco extends Obj {
        vel = Math.random() * (6 - 3) + 3; 
        time = 0;  
        frame = 0; 
        
        mov() {
            this.y += this.vel * velocidadeGlobal; 
            this.time++;  
    
            if (this.time >= 10) {
                this.time = 0;  
    
                this.frame = (this.frame + 1) % 3;  
                if (this.frame === 0) {
                    this.a = 'imgs/sprintB_01.png';  
                } else if (this.frame === 1) {
                    this.a = 'imgs/sprintsB_02.png';  
                } else if (this.frame === 2) {
                    this.a = 'imgs/sprintsB_03.png';  
                }
            }
        }
    }

class Texto{
    des_text(texto,x,y,cor,font){
        des.font = font
        des.lineWidth = 2
        des.fillStyle = cor
        des.fillText(texto,x,y)
    }
}


