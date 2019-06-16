class GuaImage {
    constructor(game, name) {
        this.game = game        
        this.texture = game.textureByName(name)
        this.x = 0
        this.y = 0
        this.w = this.texture.width
        this.h = this.texture.height
    }
    draw() {

    }
    update() {

    }
}

// 逻辑上来看不应该继承，但是就暂时这样做吧
class player extends GuaImage {
    constructor(game, name) {
        super(game, name)

    }
}