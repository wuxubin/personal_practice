
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
        let g = this
        let loads = []
        // 预先载入所有图片
        let names = Object.keys(g.images)
        for (let i = 0; i < names.length; i++) {
            let name = names[i]
            let path = g.images[name]
            let img = new Image()
            img.src = path
            img.onload = function () {
                // 存入 g.images 中
                g.images[name] = img
                // 所有图片都成功载入之后, 调用 run
                loads.push(1)
                if (loads.length == names.length) {
                    g.run()
                }
            }
        }
    }
    // init() {
    //     let loads = []
    //     let names = Object.keys(this.images)
    //     for (let i = 0; i < names.length; i++) {
    //         const name = names[i];
    //         let path = this.images[name]
    //         let img = new Image()
    //         img.src = path
    //         img.onload = function () {
    //            this.images[name] = img
    //             loads.push(1)
    //             if (loads.length == names.length) {
    //                this.run()
    //             }
    //         }
    //     }


    // }
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