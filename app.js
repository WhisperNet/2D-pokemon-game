const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
canvas.width = 1024;
canvas.height = 576;
ctx.fillStyle = 'white';

ctx.fillRect(0, 0, canvas.width, canvas.height)


const img = new Image() //const img = new Image();
img.classList.add('focus')
img.src = './img/Pellet Town.png';

const playerImage = new Image()
playerImage.src = './img/playerDown.png'

class Sprite {
    constructor({ position, velocity, image }) {
        this.position = position
        this.image = image
    }
    draw() {
        ctx.drawImage(this.image, this.position.x, this.position.y, canvas.width * 3, canvas.height * 3)
    }
}

const backGround = new Sprite({
    position: {
        x: -630,
        y: -515,
    },
    image: img
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

function animate() {
    window.requestAnimationFrame(animate)

    backGround.draw()
    ctx.drawImage(playerImage,
        0,
        0,
        playerImage.width / 4,
        playerImage.height,
        canvas.width / 2 - (playerImage.width / 4) / 2,
        canvas.height / 2 - playerImage.height / 2,
        playerImage.width / 4,
        playerImage.height)

    ctx.imageSmoothingEnabled = false;
    if (keys.w.press && lastPress === 'w') backGround.position.y += 3;
    else if (keys.a.press && lastPress === 'a') backGround.position.x += 3;
    else if (keys.s.press && lastPress === 's') backGround.position.y -= 3;
    else if (keys.d.press && lastPress === 'd') backGround.position.x -= 3;

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
    console.log(keys)
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
    console.log(keys)
})



