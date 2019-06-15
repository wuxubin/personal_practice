
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
        var actions = Object.keys(this.actions)
        for (var i = 0; i < actions.length; i++) {
            var key = actions[i]
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
        var g = this
        var loads = []
        // 预先载入所有图片
        var names = Object.keys(g.images)
        for (var i = 0; i < names.length; i++) {
            let name = names[i]
            var path = g.images[name]
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
    //     var loads = []
    //     var names = Object.keys(this.images)
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
        var img = this.images[name]
        var image = {
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