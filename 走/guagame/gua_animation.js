class GuaAnimation {
    constructor(game) {
        this.game = game
        // 为了省事，在这里hard code一套动画
        this.frames = []
        for (let i = 1; i <= 10; i++) {
            let name = `w${i}`
            let t = game.textureByName(name)
            this.frames.push(t)
        }
        this.texture = this.frames[0]
        this.framsIndex = 0
        this.frameCount = 4
    }
    update() {
        this.frameCount--
        if (this.frameCount == 0) {
            this.frameCount = 4
            this.framsIndex = (this.framsIndex + 1) % this.frames.length
            this.texture = this.frames[this.framsIndex]
        }
    }
    draw() {
        this.game.drawImage(this)
    }
    move(x) {
        this.x += x
    }
}