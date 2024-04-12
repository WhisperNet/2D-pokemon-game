class Boundary {
    constructor({ position }) {
        this.position = position;
        this.width = 48; // multiply zoom level reference (3X)
        this.height = 48;
    }

    draw() {
        ctx.fillStyle = 'rgba(255,0,0,0)';
        ctx.fillRect(this.position.x, this.position.y, this.width, this.height)
    }
}

class Sprite {
    constructor({ position, image, frames = { max: 1 }, sprites }) {
        this.position = position
        this.image = image
        this.frames = { ...frames, val: 0, elapased: 0 }
        this.image.onload = () => {
            this.width = this.image.width / this.frames.max
            this.height = this.image.height
        }
        this.moving = false
        this.sprites = sprites

    }
    draw() {
        ctx.drawImage(
            this.image,
            this.width * this.frames.val,
            0,
            this.image.width / this.frames.max,
            this.image.height,
            this.position.x,
            this.position.y,
            this.image.width / this.frames.max,
            this.image.height
        )
        if (!this.moving) return

        if (this.frames.max > 1) {
            this.frames.elapased++
            if (this.frames.elapased % 15 === 0) {
                this.frames.elapased = 0
                if (this.frames.val < this.frames.max - 1) this.frames.val++
                else this.frames.val = 0
            }
        }

    }
}