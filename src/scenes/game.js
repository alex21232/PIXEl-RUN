import Dino from "../GameObjects/dino.js"
import Cactus from "../GameObjects/cactus.js"
import Bird from "../GameObjects/bird.js"

let gameOverAudio = document.getElementById("gameOver")
let jumpAudio = document.getElementById("jump")
export default class GameScene extends Phaser.Scene{

    constructor(){
        super({key:"game"})
    }

    create(){
        //creating sprites 
        this.ground = this.physics.add.image(80,470, "ground")
        this.ground2 = this.physics.add.image(700,610, "ground")
        this.ground.setGravityY(1500)
        this.ground2.setGravityY(1500) 

        this.puntos = 0
        this.puntosText = this.add.text(130, 0, "0", {fontFamily: "font", fontSize: 30})
        this.add.text(0, 0, "Score: ", {fontFamily: "font", fontSize: 30})

        this.puntosInterval = setInterval(() => {this.puntos++; this.puntosText.setText(this.puntos)},130)        

        this.dino = new Dino (this, 100, 390, "Dino", 0).setScale(1.9)
        this.dino.setInteractive()
        this.jumping = false

        this.cactus = this.physics.add.group()
        this.bird = this.physics.add.group()

        this.cactusInterval = setInterval(() => {this.cactus.add(new Cactus (this, 1000, 387, "cactus").setScale(1.4))
                            this.timeBird = setTimeout(() => {this.bird.add(new Bird (this, 1000, 300, "bird").setScale(3.0))}, 800)
                            this.bird.playAnimation("fly")}
        , Math.floor((Math.random()* (3000 - 2000 +1) ) + 2000))
        //animation
        this.anims.create({
            key:"fly",
            frames:this.anims.generateFrameNumbers("bird", {
                frames: [0,1,2]
            }),
            repeat: -1,
            frameRate: 10,
            duration: 0

        })

        this.anims.create({
            key:"walk",
            frames:this.anims.generateFrameNumbers("Dino", {
                frames: [0,1,2]
            }),
            repeat: -1,
            frameRate: 10,
            duration: 0

        })

        this.anims.create({
            key: "jump",
            frames: this.anims.generateFrameNumbers("DinoJump", {
                frames:[0]
            }),
            repeat: -1,
            frameRate: 10,
            duration: 0
        })

        this.dino.anims.play("walk")

        //colisiones
        this.ground.setCollideWorldBounds(true)
        this.ground2.setCollideWorldBounds(true)
        this.colide = this.physics.add.collider(this.ground, this.dino, this.jump, null, this)

        this.colideCactus = this.physics.add.collider(this.ground, this.cactus.getChildren())
        this.colideCactus = this.physics.add.collider(this.ground2, this.cactus.getChildren())

        this.gameOver = this.physics.add.collider(this.dino, this.cactus.getChildren(), this.stop, null, this
        )
        this.gameOver2 = this.physics.add.collider(this.dino, this.bird.getChildren(), this.stop, null, this
        )
        //movement
        this.cursorSpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP)
    }
    jump(){
        this.jumping = true
        


    }

    stop() {
        clearInterval(this.cactusInterval)
        clearInterval(this.puntosInterval)
        clearTimeout(this.timeBird)
        this.scene.start("gameover", this.puntos)
        
        this.bird.clear(true, true)
    }

    update(){
        if (this.cursorSpace.isDown && this.jumping ===true){
            this.dino.body.setVelocityY(-500)
            this.dino.anims.play("jump")
            jumpAudio.play()
            let timer = setTimeout(() => {
                this.jumping = false
                let timer2 = setTimeout(() => {this.dino.anims.play("walk")},700)
            }, 170);
        }
        if (this.jumping === true) {
            this.dino.on("pointerup", () => {
                if (this.cursorSpace.isDown && this.jumping ===true){
                    this.dino.body.setVelocityY(-600)
                    this.dino.anims.play("jump")
                    jumpAudio.play()
                    let timer = setTimeout(() => {
                        this.jumping = false
                        let timer2 = setTimeout(() => {this.dino.anims.play("walk")},700)
                    }, 170);
                }
            })
        }
        switch(true){
            case this.puntos > 100 && this.puntos < 300:
                this.cactus.setVelocityX(-500)
                this.bird.setVelocityX(-500)
                break;

            case this.puntos > 300 && this.puntos < 500:
                this.cactus.setVelocityX(-700)
                this.bird.setVelocityX(-700)
                break;

            case this.puntos > 500 && this.puntos < 700:
                this.cactus.setVelocityX(-900)
                this.bird.setVelocityX(-900)
                break;

                default:
                    this.cactus.setVelocityX(-300)
                    this.bird.setVelocityX(-300)
                    break;
                    
        }   

    }
}