class GuaScene {
    constructor(game) {
        this.game = game
        this.debugModeEnabled = true
        this.elements = []
    }
    draw() {
        for (let i = 0; i < this.elements.length; i++) {
            const e = this.elements[i];
            // this.game.drawImage(e)
            e.draw()
        }
    }
    update() {
        if (this.debugModeEnabled) {
            for (let i = 0; i < this.elements.length; i++) {
                const e = this.elements[i];
                e.debug && e.debug()
            }
        }
        for (let i = 0; i < this.elements.length; i++) {
            const e = this.elements[i];
            e.update()
        }
    }
    addElement(img) {
        //
        img.scene = this

        this.elements.push(img)
    }
}
