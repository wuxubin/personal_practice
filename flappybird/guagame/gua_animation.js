class GuaAnimation {
    constructor(game) {
        this.game = game
        // 为了省事，在这里hard code一套动画
        this.animations = {
            idle: [],
        }
        for (let i = 1; i <= 3; i++) {
            let name = `b${i}`
            let t = game.textureByName(name)
            this.animations['idle'].push(t)
        }
        this.AnimationName = 'idle'
        this.texture = this.frames()[0]
        // ....
        this.w = this.texture.width
        this.h = this.texture.height

        this.framsIndex = 0
        this.frameCount = 3
        this.flipx = false
        // 重力和加速度
        this.gy = 10
        this.vy = 0
        this.rotation = 0
    }
    frames() {
        return this.animations[this.AnimationName]
    }
    jump() {
        this.vy = -10
        this.rotation = -45
    }
    update() {
        // 更新受力
        this.y += this.vy
        this.vy += this.gy * 0.1
        let h = 835
        if (this.y > h) {
            this.y = h
        }
        // 更新角度
        if (this.rotation < 45) {
            this.rotation += 5
        }

        this.frameCount--
        if (this.frameCount == 0) {
            this.frameCount = 3
            this.AnimationName = this.AnimationName
            this.framsIndex = (this.framsIndex + 1) % this.frames().length
            this.texture = this.frames()[this.framsIndex]
        }
    }
    draw() {
        let context = this.game.context
        context.save()
        let w2 = this.w / 2
        let h2 = this.h / 2
        context.translate(this.x + w2, this.y + h2)
        if (this.flipx) {
            context.scale(-1, 1)
        }
        context.rotate(this.rotation * Math.PI / 180)
        context.translate(-w2, -h2)
        context.drawImage(this.texture, 0, 0)
        context.restore()

    }
    move(x, keyStatus) {
        this.flipx = (x < 0)
        this.x += x
        // console.log(this.x);

        // var animationNames = {
        //     down: 'idle',
        //     up: 'idle',
        // }
        // let name = animationNames[keyStatus]
        // this.changeAnimation(name)
    }
    changeAnimation(name) {
        this.AnimationName = name
    }
}