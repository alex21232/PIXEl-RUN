export default class Bootloader extends Phaser.Scene{
    constructor(){
        super({key: "Bootloader"})
    }

    preload(){
        this.load.on("complete", () => {
            this.scene.start("menu")
        })
        this.load.spritesheet("Dino", "../assets/mariosheet.png", {frameWidth:40, frameHeight:40} )
        this.load.image("ground", "../assets/suelo.png")
        this.load.image("start","../assets/START.png")
        this.load.spritesheet("DinoJump", "./assets/marioJump.png", {frameWidth:50, frameWidth:43})
        this.load.image("cactus", "../assets/goompa.png",{frameHeight:50, frameWidth:40})
        this.load.image("bird", "../assets/bullet.png",{frameHeight:17, frameWidth:20} )
        this.load.image("play again","../assets/play_again.png")

    }
}