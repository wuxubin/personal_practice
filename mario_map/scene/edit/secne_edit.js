class GuaTileMap {
    constructor(game) {
        this.game = game
        this.tiles = [
            1, 1, 1, 0, 1,
            1, 2, 3, 0, 1,
            1, 2, 3, 0, 1,
        ]
        this.th = 5
        this.tw = this.tiles.length / this.th
        this.tileImages = [
            new GuaImage(game, 't1'),
            new GuaImage(game, 't2'),
            new GuaImage(game, 't3'),
            new GuaImage(game, 't4'),
        ]
        this.tileSize = 32
    }
    update() {

    }
    draw() {
        let h = this.th
        for (let i = 0; i < this.tiles.length; i++) {
            const index = this.tiles[i];
            if (index != 0) {
                let x = Math.floor(i / h) * this.tileSize
                let y = (i % h) * this.tileSize
                let image = this.tileImages[index]
                this.game.context.drawImage(image.texture, x, y)
            }
        }
    }
}
class SceneEdit extends GuaScene {
    constructor(game) {
        super(game)
        // let bg = new GuaImage(game, 'bg')
        // this.addElement(bg)
        let map = new GuaTileMap(game)
        this.addElement(map)
        // mario
        let mario = new GuaNexSprite(game)
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