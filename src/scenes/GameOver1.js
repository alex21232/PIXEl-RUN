export default class GameOver extends Phaser.Scene{

    constructor(){
        super({key: "gameover"})
    }
    init(date){
        this.puntos = date
    }

    create(){
        //Titulo y boton
        const configText = {
            x: 170,
            y: 200,
            text: "Game Over",
            style: {
                fontFamily: "font",
                color: "#DB3636",
                fontSize: 96,
            }

        }
        this.make.text(configText)

        const configTextPoints = {
            x: 400,
            y: 300,
            text: "Your score was: ",
            style:{
                fontFamily: "font",
                color: "#ffffff",
                fontSize: 20,
            }

        }
        this.make.text(configTextPoints)

        this.totalpoints = this.add.text(500, 300, "0",{fontFamily: "font", fontSize:20, })
        this.totalpoints.setText(this.puntos)

        this.button = this.add.sprite(490,400,"start")
        this.button.setInteractive()  
        this.button.on("pointerdown", () =>{
            this.scene.start("game")
            this.scene.stop()
        })
    }


}