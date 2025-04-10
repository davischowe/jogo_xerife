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
            (this.y < objeto.y + objeto.x)&&
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
    vida = 3

    mov_xerife(){
        this.x += this.dir
        if(this.x <=2){
            this.x = 2
        }else if(this.x >= 920){
            this.x = 920
        }
    }

}

class Bandido extends Obj{


    mov_bandido(){
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
    mov_civil(){
        this.x += 2
        if(this.x >= 1300){
            this.recomeca()
        }
    }
    recomeca(){
        this.x = -100
        this.y = Math.floor(Math.random() * ((416 - 2 + 1) + 2))
    }


}


class Civilmulher extends Obj{
    mov_civil_M(){
        this.x += 2
        if(this.x >= 1300){
            this.recomeca()
        }
    }
    recomeca(){
        this.x = -100
        this.y = Math.floor(Math.random() * ((416 - 2 + 1) + 2))
    }


}

class Tiro extends Obj{
    des_tiro(){
        des.fillStyle = this.at
        des.fillRect(this.x, this.y, this.w, this.h)
    }

    mov(){
        this.y -= 10
    }
}
class Disco extends Obj{
    vel = Math.random() * (6 - 3) + 3

    mov(){
        this.y += this.vel
    }
    
}
