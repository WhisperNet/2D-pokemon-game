const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
canvas.width = 1024;
canvas.height = 576;

const collisionMap = []
for (let i = 0; i < collision.length - 1; i += 70) {
    collisionMap.push(collision.slice(i, i + 70))
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

const playerDown = new Image()
playerDown.src = './img/playerDown.png'
const playerUp = new Image()
playerUp.src = './img/playerUp.png'
const playerRight = new Image()
playerRight.src = './img/playerRight.png'
const playerLeft = new Image()
playerLeft.src = './img/playerLeft.png'

const foregroundImg = new Image() //const img = new Image();
foregroundImg.src = './img/foreground.png';





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
        image: playerDown,
        position: {
            x: canvas.width / 2 - (192 / 4) / 2,
            y: canvas.height / 2 - 68 / 2,
        },
        frames: {
            max: 4
        },
        sprites: {
            up: playerUp,
            down: playerDown,
            left: playerLeft,
            right: playerRight
        }
    }
)

const foreground = new Sprite({
    position: {
        x: offset.x,
        y: offset.y,
    },
    image: foregroundImg
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



const moveable = [backGround, ...boundaries, foreground]
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
    foreground.draw()
    ctx.imageSmoothingEnabled = false;
    let moving = true
    player.moving = false
    if (keys.w.press && lastPress === 'w') {
        player.moving = true
        player.image = player.sprites.up
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
        player.moving = true
        player.image = player.sprites.left
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
        player.moving = true
        player.image = player.sprites.down
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
        player.moving = true
        player.image = player.sprites.right
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
    //let lastPress = '';
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



