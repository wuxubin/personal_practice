class SceneTitle extends GuaScene {
    constructor(game) {
        super(game)
        game.registerAction('k', () => {
            let s = new Scene(game)
            game.replaceScene(s)
        })
    }
    draw() {
        this.game.context.fillText('按k开始游戏', 100, 190)
    }
}
