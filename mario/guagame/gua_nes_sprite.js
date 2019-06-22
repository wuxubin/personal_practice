class GuaNexSprite {
    constructor(game) {
        this.game = game
        this.tileOffset = 32784
        this.data = window.bytes.slice(this.tileOffset)
        // 为了省事，在这里hard code一套动画
        this.animations = {
            idle: [],
        }

        // this.AnimationName = 'idle'
        // this.texture = this.frames()[0]
        // ....
        this.pixelWidth = 3

        this.rowsOfSprite = 4
        this.columnsOfSprite = 2

        this.w = this.pixelWidth * this.columnsOfSprite * 8
        this.h = this.pixelWidth * this.columnsOfSprite * 8
        this.framsIndex = 0
        this.frameCount = 4
        this.flipx = false
        // 重力和加速度
        this.gy = 10
        this.vy = 0
        // 角度
        this.rotation = 0
        // 透明度
        this.alpha = 1
    }
    // frames() {
    //     return this.animations[this.AnimationName]
    // }
    drawBlock(context, data, x, y, pixelWidth) {
        const colors = [
            'white',
            'rgb(188, 25, 0)',
            'rgb(247, 180, 0)',
            'rgb(91, 106, 0)',
        ]

        let w = pixelWidth
        let h = pixelWidth
        for (let i = 0; i < 8; i++) {
            let p1 = data[i]
            let p2 = data[i + 8]
            for (let j = 0; j < 8; j++) {
                // 8 bits per line
                // 78 69  ==  0100 1110 0100 0101
                // 在j循环中，每一次画一个像素点
                let c1 = (p1 >> (7 - j)) & 0b00000001
                let c2 = (p2 >> (7 - j)) & 0b00000001
                let pixel = (c2 << 1) + c1
                if (pixel == 0) {
                    continue
                }
                let color = colors[pixel]
                context.fillStyle = color
                let px = x + j * w
                let py = y + i * h
                context.fillRect(px, py, w, h)
            }

        }
    }

    drawSprite() {
        let bytesPerBlock = 16
        let dataOffset = this.framsIndex * bytesPerBlock * 8
        let data = this.data.slice(dataOffset)
        let context = this.game.context
        let pixelsPerBlock = 8
        let pixelWidth = this.pixelWidth
        let blockSize = pixelsPerBlock * pixelWidth
        let offset = 0
        for (let i = 0; i < this.rowsOfSprite; i++) {
            for (let j = 0; j < this.columnsOfSprite; j++) {
                let x = j * blockSize
                let y = i * blockSize
                let pixels = data.slice(offset)
                this.drawBlock(context, pixels, x, y, pixelWidth)
                offset += 16
            }

        }
    }

    jump() {
        this.vy = -10
        // this.rotation = -45
    }
    update() {
        // 更新受力
        this.y += this.vy
        this.vy += this.gy * 0.1
        let h = 800
        if (this.y > h) {
            this.y = h
        }

        this.frameCount--
        if (this.frameCount == 0) {
            this.frameCount = 6
            this.framsIndex++
            this.framsIndex %= 3
            // this.AnimationName = this.AnimationName
            // this.framsIndex = (this.framsIndex + 1) % this.frames().length
            // this.texture = this.frames()[this.framsIndex]
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
        context.globalAlpha = this.alpha
        context.rotate(this.rotation * Math.PI / 180)
        context.translate(-w2, -h2)
        // draw mario
        this.drawSprite()
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