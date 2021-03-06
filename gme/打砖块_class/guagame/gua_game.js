
class Guagame {
    constructor(images, runCallBack) {
        window.fps = 30
        this.images = images
        this.runCallBack = runCallBack
        this.actions = {}
        this.keydowns = {}
        this.canvas = document.querySelector('#id-canvas')
        this.context = this.canvas.getContext('2d')
        window.addEventListener('keydown', (event) => {
            this.keydowns[event.key] = true
        })
        window.addEventListener('keyup', (event) => {
            this.keydowns[event.key] = false
        })
        this.init()
    }
    static instance(...args) {
        this.i = this.i || new this(...args)
        return this.i
    }
    runloop() {
        // events
        let actions = Object.keys(this.actions)
        for (let i = 0; i < actions.length; i++) {
            let key = actions[i]
            if (this.keydowns[key]) {
                // 如果按键被按下, 调用注册的 action
                this.actions[key]()
            }
        }
        // update
        this.update()
        // clear
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)
        // draw
        this.draw()
        // next run loop
        setTimeout(() => {
            this.runloop()
        }, 1000 / window.fps)
    }

    registerAction(key, callback) {
        this.actions[key] = callback
    }
    drawImage(guaImage) {
        this.context.drawImage(guaImage.image, guaImage.x, guaImage.y)
    }
    replaceScene(scene) {
        this.scene = scene
    }
    init() {
        let loads = []
        let names = Object.keys(this.images)
        for (let i = 0; i < names.length; i++) {
            const name = names[i];
            let path = this.images[name]
            let img = new Image()
            img.src = path
            img.onload = () => {
                this.images[name] = img
                loads.push(1)
                if (loads.length == names.length) {
                    this.run()
                }
            }
        }
    }
    imageByName(name) {
        let img = this.images[name]
        let image = {
            w: img.width,
            h: img.height,
            image: img,
        }
        return image
    }
    update() {
        this.scene.update()
    }
    draw() {
        this.scene.draw()
    }
    runWithScene(scene) {
        this.scene = scene
        setTimeout(() => {
            this.runloop()
        }, 1000 / fps)
    }
    run(scene) {
        this.runCallBack(this)
    }
}