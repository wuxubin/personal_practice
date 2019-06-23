
class SceneEdit extends GuaScene {
    constructor(game) {
        super(game)
        // let bg = new GuaImage(game, 'bg')
        // this.addElement(bg)
        let map = new GuaTileMap(game)
        this.addElement(map)
        // mario
        let mario = new GuaNexSprite(game, map)
        mario.x = 100
        mario.y = 100
        this.mario = mario
        this.addElement(mario)

        this.setupInputs()
    }
    update() {
        super.update()
        // this.skipCount--
        // let offset = -2
        // if (this.skipCount == 0) {
        //     this.skipCount = 8
        //     offset = 14
        // }
        // for (let i = 0; i < 21; i++) {
        //     let g = this.grounds[i]
        //     g.x += offset
        // }
    }
    debug() {
        this.birdSpeed = config.bird_speed.value
    }
    setupInputs() {
        let playerSpeed = 5
        this.game.registerAction('a', (keyStatus) => {
            this.mario.move(-playerSpeed, keyStatus)
        })
        this.game.registerAction('d', (keyStatus) => {
            this.mario.move(playerSpeed, keyStatus)
        })
        this.game.registerAction('j', (keyStatus) => {
            this.mario.jump()
        })
    }
}