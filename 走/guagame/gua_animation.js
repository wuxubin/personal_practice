class GuaAnimation {
    constructor(game) {
        this.game = game
        // 为了省事，在这里hard code一套动画
        this.animations = {
            idle: [],
            walk: [],
        }
        for (let i = 1; i <= 10; i++) {
            let name = `walk${i}`
            let t = game.textureByName(name)
            this.animations['walk'].push(t)
        }
        for (let i = 1; i <= 15; i++) {
            let name = `idle${i}`
            let t = game.textureByName(name)
            this.animations['idle'].push(t)
        }
        this.AnimationName = 'idle'
        this.texture = this.frames()[0]
        // ....
        this.w=this.texture.width
        this.h=this.texture.height
        
        this.framsIndex = 0
        this.frameCount = 4
        this.flipx = false
    }
    frames() {
        return this.animations[this.AnimationName]
    }
    update() {
        this.frameCount--
        if (this.frameCount == 0) {
            this.frameCount = 4
            this.AnimationName = this.AnimationName
            this.framsIndex = (this.framsIndex + 1) % this.frames().length
            this.texture = this.frames()[this.framsIndex]
        }
    }
    draw() {
        let context = this.game.context
        if (this.flipx) {
            context.save()
            var x = this.x + this.w / 2
            context.translate(x, 0)
            context.scale(-1, 1)
            context.translate(-x, 0)
            context.drawImage(this.texture, this.x, this.y)
            context.restore()
        } else {
            context.drawImage(this.texture, this.x, this.y)
        }

    }
    move(x, keyStatus) {
        console.log(x);
        this.flipx = (x < 0)
        this.x += x
        console.log(this.x);

        var animationNames = {
            down: 'walk',
            up: 'idle',
        }
        let name = animationNames[keyStatus]
        this.changeAnimation(name)
    }
    changeAnimation(name) {
        this.AnimationName = name
    }
}