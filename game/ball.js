var Ball = function (game) {
    var o = game.imageByName('ball')
    console.log('ball',o);
    
    o.x = 100
    o.y = 200
    o.speedX = 5
    o.speedY = 5
    o.fired = false
    o.fire = function () {
        o.fired = true
    }
    o.move = function () {
        if (o.fired) {
            if (o.x < 0 || o.x > 400) {
                o.speedX = -o.speedX
            }
            if (o.y < 0 || o.y > 300) {
                o.speedY = -o.speedY
            }
            o.x += o.speedX
            o.y += o.speedY
        }
    }
    o.反弹 = function () {
        o.speedY *= -1
    }
    return o
}