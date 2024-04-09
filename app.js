const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
canvas.width = 1024;
canvas.height = 576;

const collisionMap = []
for (let i = 0; i < collision.length - 1; i += 70) {
    collisionMap.push(collision.slice(i, i + 70))
}

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

const boundaries = []

const offset = {
    x: -735,
    y: -650
}

collisionMap.forEach((row, i) => {
    row.forEach((symbol, j) => {
        if (symbol !== 0) {
            boundaries.push(
                new Boundary(
                    {
                        position: {
                            x: j * 48 + offset.x,
                            y: i * 48 + offset.y
                        }
                    }
                )
            )
        }
    })
})

const img = new Image() //const img = new Image();

img.src = './img/Pellet Town.png';

const playerImage = new Image()
playerImage.src = './img/playerDown.png'

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



const backGround = new Sprite({
    position: {
        x: offset.x,
        y: offset.y,
    },
    image: img
}
)

const player = new Sprite(
    {
        image: playerImage,
        position: {
            x: canvas.width / 2 - (192 / 4) / 2,
            y: canvas.height / 2 - 68 / 2,
        },
        frames: {
            max: 4
        }
    }
)

const keys = {
    w: {
        press: false,
        last: false
    },
    a: {
        press: false,
        last: false
    },
    s: {
        press: false,
        last: false
    },
    d: {
        press: false,
        last: false
    },
}



const moveable = [backGround, ...boundaries]
function rectCollide({ rect1, rect2 }) {


    return (
        rect1.position.x + rect1.width >= rect2.position.x &&
        rect2.position.x + rect2.width >= rect1.position.x &&
        rect1.position.y <= rect2.position.y + rect2.height &&
        rect1.position.y + rect1.height >= rect2.position.y
    )
}
function animate() {
    window.requestAnimationFrame(animate)

    backGround.draw()
    boundaries.forEach((obj) => {
        obj.draw()
        if (
            rectCollide({
                rect1: player,
                rect2: obj
            })
        ) {
            console.log("colide")
        }
    })

    player.draw()

    ctx.imageSmoothingEnabled = false;
    let moving = true
    if (keys.w.press && lastPress === 'w') {
        for (let i = 0; i < boundaries.length; i++) {
            const boundary = boundaries[i]
            if (
                rectCollide({
                    rect1: player,
                    rect2: {
                        ...boundary,
                        position: {
                            x: boundary.position.x,
                            y: boundary.position.y + 2
                        }

                    }

                })
            ) {
                moving = false
                break;
            }
        }
        if (moving)
            moveable.forEach((obj) => obj.position.y += 2)
    }
    else if (keys.a.press && lastPress === 'a') {
        for (let i = 0; i < boundaries.length; i++) {
            const boundary = boundaries[i]
            if (
                rectCollide({
                    rect1: player,
                    rect2: {
                        ...boundary,
                        position: {
                            x: boundary.position.x + 2,
                            y: boundary.position.y
                        }

                    }

                })
            ) {
                moving = false
                break;
            }
        }
        if (moving)
            moveable.forEach((obj) => obj.position.x += 2)
    }
    else if (keys.s.press && lastPress === 's') {
        for (let i = 0; i < boundaries.length; i++) {
            const boundary = boundaries[i]
            if (
                rectCollide({
                    rect1: player,
                    rect2: {
                        ...boundary,
                        position: {
                            x: boundary.position.x,
                            y: boundary.position.y - 2
                        }

                    }

                })
            ) {
                moving = false
                break;
            }
        }
        if (moving)
            moveable.forEach((obj) => obj.position.y -= 2)
    }
    else if (keys.d.press && lastPress === 'd') {
        for (let i = 0; i < boundaries.length; i++) {
            const boundary = boundaries[i]
            if (
                rectCollide({
                    rect1: player,
                    rect2: {
                        ...boundary,
                        position: {
                            x: boundary.position.x - 2,
                            y: boundary.position.y
                        }

                    }

                })
            ) {
                moving = false
                break;
            }
        }
        if (moving)
            moveable.forEach((obj) => obj.position.x -= 2)
    }

}

animate()
let lastPress = '';
window.addEventListener('keydown', (e) => {

    switch (e.code) {
        case 'KeyW':
            keys.w.press = true;
            lastPress = 'w';
            break;
        case 'KeyA':
            keys.a.press = true;
            lastPress = 'a';
            break;
        case 'KeyS':
            keys.s.press = true;
            lastPress = 's';
            break;
        case 'KeyD':
            keys.d.press = true;
            lastPress = 'd';
            break;
    }
    //console.log(keys)
})

window.addEventListener('keyup', (e) => {
    let lastPress = '';
    switch (e.code) {
        case 'KeyW':
            keys.w.press = false;

            break;
        case 'KeyA':
            keys.a.press = false;

            break;
        case 'KeyS':
            keys.s.press = false;

            break;
        case 'KeyD':
            keys.d.press = false;

            break;
    }
    //console.log(keys)
})



