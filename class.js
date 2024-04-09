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
    constructor({ position, image, frames = { max: 1 } }) {
        this.position = position
        this.image = image
        this.frames = frames
        this.image.onload = () => {
            this.width = this.image.width / this.frames.max
            this.height = this.image.height
        }

    }
    draw() {
        ctx.drawImage(
            this.image,
            0,
            0,
            this.image.width / this.frames.max,
            this.image.height,
            this.position.x,
            this.position.y,
            this.image.width / this.frames.max,
            this.image.height
        )
    }
}