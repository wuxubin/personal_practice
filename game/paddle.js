
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
        if (o.x > 400 - o.image.width) {
            o.x = 400 - o.image.width
        }
    }
    o.collide = function (ball) {
        if (ball.y + ball.image.height > o.y) {
            if (ball.x > o.x && ball.x < o.x + o.image.width) {
                return true
            }
        }
        return false
    }
    return o
}