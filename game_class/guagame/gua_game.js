
class Guagame {
    constructor(images, runCallBack) {
        window.fps = 30
        this.images = images
        this.runCallback = runCallback
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
        var actions = Object.keys(g.actions)
        for (var i = 0; i < actions.length; i++) {
            var key = actions[i]
            if (g.keydowns[key]) {
                // 如果按键被按下, 调用注册的 action
               this.actions[key]()
            }
        }
        // update
       this.update()
        // clear
        context.clearRect(0, 0, canvas.width, canvas.height)
        // draw
       this.draw()
        // next run loop
        setTimeout(function () {
            runloop()
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
        var loads = []
        var names = Object.keys(images)
        for (let i = 0; i < names.length; i++) {
            const name = names[i];
            let path = images[name]
            let img = new Image()
            img.src = path
            img.onload = function () {
               this.images[name] = img
                loads.push(1)
                if (loads.length == names.length) {
                   this.run()
                }
            }
        }


    }
    imageByName(name) {
        var img =this.images[name]
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
        setTimeout(function () {
            runloop()
        }, 1000 / fps)
    }
    run(scene) {
        runCallBack(g)
    }
}