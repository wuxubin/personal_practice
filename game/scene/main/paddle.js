
var Paddle = function (game) {
    var o = game.imageByName('paddle')
    // var o = {
    //     image: image,
    //     x: 100,
    //     y: 250,
    //     speed: 5,
    // }
    o.x = 100
    o.y = 250
    o.speed = 5
    o.moveLeft = function () {
        o.x -= o.speed
        if (o.x < 0) {
            o.x = 0
        }
    }
    o.moveRight = function () {
        o.x += o.speed
        if (o.x > 400 - o.w) {
            o.x = 400 - o.w
        }
    }
    var aInb = function (x, x1, x2) {
        return x >= x1 && x <= x2
    }
    o.collide = function (ball) {
        // if (ball.y + ball.h > o.y) {
        //     if (ball.x > o.x && ball.x < o.x + o.h) {
        //         return true
        //     }
        // }
        // return false
        var a = o
        var b = ball
        if (aInb(a.x, b.x, b.x + b.w) || aInb(b.x, a.x, a.x + a.w)) {
            if (aInb(a.y, b.y, b.y + b.h) || aInb(b.y, a.y, a.y + a.h)) {
                return true
            }
        }
        return false
    }
    return o
}
