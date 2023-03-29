let bgMusic = document.getElementById("bg")
export default class Menu extends Phaser.Scene{

    constructor(){
        super({key: "menu", activate: true})
    }

    create(){
        //Titulo y boton
        const configText = {
            x: 170,
            y: 200,
            text: "Pixel Run",
            style: {
                fontFamily: "font",
                color: "#ffffff",
                fontSize: 96,
            }

        }
        this.make.text(configText)
        // this.add.text(100,200, "Runner", { fill: "#ffffff", fontFamily:"font", fontSize: "96px",})

        this.button = this.add.sprite(490,400,"start")
        this.button.setInteractive()  
        this.button.on("pointerdown", () =>{
            this.scene.launch("game")
            bgMusic.loop = true
            bgMusic.play()
            this.scene.stop()
        })
    }


}