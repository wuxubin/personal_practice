var SceneEnd = function (game) {
    var s = {
        game: game,
    }
    game.registerAction('r', function () {
        var s = SceneTitle(game)
        game.replaceScene(s)
    })
    s.draw = function () {
        game.context.fillText('游戏结束，按r返回标题界面', 100, 290)
    }
    s.update = function () {

    }
    return s
}