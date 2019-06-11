var Guagame = function (images, runCallBack) {
    var g = {
        keydowns: {},
        actions: {},
        images: {},
    }
    var canvas = document.querySelector("#id-canvas")
    var context = canvas.getContext('2d')
    g.canvas = canvas
    g.context = context

    window.addEventListener('keydown', function (event) {
        g.keydowns[event.key] = true
    })
    window.addEventListener('keyup', function (event) {
        g.keydowns[event.key] = false
    })
    g.registerAction = function (key, callback) {
        g.actions[key] = callback
    }
    g.drawImage = function (guaImage) {
        g.context.drawImage(guaImage.image, guaImage.x, guaImage.y)

    }
    window.fps = 30
    var runloop = function () {
        // events
        var actions = Object.keys(g.actions)
        for (var i = 0; i < actions.length; i++) {
            var key = actions[i]
            if (g.keydowns[key]) {
                // 如果按键被按下, 调用注册的 action
                g.actions[key]()
            }
        }
        // update
        g.update()
        // clear
        context.clearRect(0, 0, canvas.width, canvas.height)
        // draw
        g.draw()
        // next run loop
        setTimeout(function () {
            runloop()
        }, 1000 / window.fps)
    }
    var loads = []
    var names = Object.keys(images)
    for (let i = 0; i < names.length; i++) {
        const name = names[i];
        let path = images[name]
        let img = new Image()
        img.src = path
        img.onload = function () {
            g.images[name] = img
            loads.push(1)
            if (loads.length == names.length) {
                g.run()
            }
        }
    }
    g.imageByName = function (name) {
        console.log(name,'name');
        
        var img = g.images[name]
        console.log('img',img);
        
        var image = {
            w: img.width,
            h: img.height,
            image: img,
        }
        return image
    }
    g.run = function () {
        runCallBack(g)
        setTimeout(function () {
            runloop()
        }, 1000 / fps)
    }
    return g
}

