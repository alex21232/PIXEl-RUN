import Bootloader from "./Bootloader.js"
import GameScene from "./scenes/game.js"
import Menu from "./scenes/menu.js"
import GameOver from "./scenes/GameOver1.js"


const config = {
    witht: 710,
    height: 500,
    parent: "contenedor",
    backgroundColor: "#0x2F2F2F",
    physics: {
        default: "arcade",
        arcade: {
            debug: true,

        }
    },
    scene: [
        Bootloader,
        Menu,
        GameScene,
        GameOver


    ],
    scale:{
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scene.CENTER_BOTH
    }
}

new Phaser.Game(config)