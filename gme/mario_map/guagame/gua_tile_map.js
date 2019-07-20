class GuaTileMap {
    constructor(game) {
        this.game = game
        this.offsetX = 10
        this.tiles = [
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 2, 2,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 2, 2,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 2, 2,
            4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 2, 2,
            4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 2, 2,
            4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2,
            4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2,
            4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2,
            4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2,
            4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2,
            4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2,
            4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2,
            4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2,
            4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2,
            4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2,
            4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2,
            4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2,
            4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2,
            4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2,
            4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2,
            4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2,
            4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2,
            4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2,
            4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2,
            4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 3, 4, 2, 2,
        ]
        this.th = 15
        this.tw = this.tiles.length / this.th
        this.tileImages = [
            new GuaImage(game, 't1'),
            new GuaImage(game, 't2'),
            new GuaImage(game, 't3'),
            new GuaImage(game, 't4'),
        ]
        this.tileSize = 32
    }
    onTheGround(i, j) {
        let index = i * this.th + j
        let tile = this.tiles[index]
        return tile != 0
    }
    update() {
        this.offsetX -= 1
    }
    draw() {
        let h = this.th
        let offsetIndex = Math.abs(parseInt(this.offsetX / this.tileSize))
        let numberOfTiles = h * (12 + 1)
        if (offsetIndex + numberOfTiles < this.tiles.length) {
            numberOfTiles = this.tiles.length
        }
        for (let i = offsetIndex; i < numberOfTiles; i++) {
            const index = this.tiles[i];
            if (index != 0) {
                let x = Math.floor(i / h) * this.tileSize
                x += this.offsetX
                let y = (i % h) * this.tileSize
                let image = this.tileImages[index - 1]
                this.game.context.drawImage(image.texture, x, y)
            }
        }
    }
}