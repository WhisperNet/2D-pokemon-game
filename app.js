const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
canvas.width = 1024;
canvas.height = 576;

const collisionMap = []
for (let i = 0; i < collision.length - 1; i += 70) {
    collisionMap.push(collision.slice(i, i + 70))
}

const battleZonesMap = []
for (let i = 0; i < battleZoneData.length - 1; i += 70) {
    battleZonesMap.push(battleZoneData.slice(i, i + 70))
}




const boundaries = []
const battleZones = []

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

battleZonesMap.forEach((row, i) => {
    row.forEach((symbol, j) => {
        if (symbol !== 0) {
            battleZones.push(
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
            max: 4,
            hold: 15
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



const moveable = [backGround, ...boundaries, foreground, ...battleZones]
function rectCollide({ rect1, rect2 }) {


    return (
        rect1.position.x + rect1.width >= rect2.position.x &&
        rect2.position.x + rect2.width >= rect1.position.x &&
        rect1.position.y <= rect2.position.y + rect2.height &&
        rect1.position.y + rect1.height >= rect2.position.y
    )
}
const battle = {
    initiated: false
}

function animate() {
    const animationId = window.requestAnimationFrame(animate)
    //console.log(animationId)
    backGround.draw()
    boundaries.forEach((obj) => {
        obj.draw()
    })

    battleZones.forEach((obj) => obj.draw())
    player.draw()
    foreground.draw()
    ctx.imageSmoothingEnabled = false;
    let moving = true
    player.moving = false
    if (battle.initiated) return;
    if (keys.w.press || keys.a.press || keys.s.press || keys.d.press) {
        for (let i = 0; i < battleZones.length; i++) {
            const battleBlock = battleZones[i]
            const overlap = ((Math.min(
                player.position.x + player.width,
                battleBlock.position.x + battleBlock.width))
                - Math.max(
                    player.position.x, battleBlock.position.x))
                *
                (
                    Math.min(
                        player.position.y + player.height,
                        battleBlock.position.y + battleBlock.height) - Math.max(player.position.y, battleBlock.position.y))
            if (
                rectCollide({
                    rect1: player,
                    rect2: battleBlock

                }) && overlap > ((player.width * player.height) / 2)
                && Math.random() <= 0.01
            ) {
                window.cancelAnimationFrame(animationId)

                audio.Map.stop()
                audio.InitBattle.play()
                audio.Battle.play()

                battle.initiated = true;
                console.log("Battle Activated")
                gsap.to('#animate', {
                    opacity: 1,
                    repeat: 3,
                    yoyo: true,
                    duration: 0.4,
                    onComplete() {
                        gsap.to('#animate', {
                            opacity: 1,
                            duration: 0.4,
                            onComplete() {
                                initBattle()
                                battleAnimate(),
                                    gsap.to('#animate', {
                                        opacity: 0,
                                        duration: 0.4
                                    })

                            }
                        })
                        //onComplete
                    }
                })
                break;
            }
        }
    }
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

let clicked = false
window.addEventListener('keydown', () => {
    if (!clicked) {
        audio.Map.play()
        clicked = true
    }
})


