const battleImg = new Image()
battleImg.src = './img/battleBackground.png'
const battleBackground = new Sprite(
    {
        position: {
            x: 0,
            y: 0
        },
        image: battleImg
    }
)

const draggleImg = new Image()
draggleImg.src = './img/draggleSprite.png'
const draggle = new Sprite(
    {
        position: {
            x: 800,
            y: 100
        },
        image: draggleImg,
        frames: {
            max: 4,
            hold: 35
        },
        moving: true,
        isEnemy: true,
        name: 'Chikorita'
    }
)

const embyImg = new Image()
embyImg.src = './img/embySprite.png'
const emby = new Sprite(
    {
        position: {
            x: 280,
            y: 330
        },
        image: embyImg,
        frames: {
            max: 4,
            hold: 35
        },
        moving: true,
        name: 'Moltres'
    }
)
const battleSprites = [draggle, emby]
function battleAnimate() {
    window.requestAnimationFrame(battleAnimate)
    battleBackground.draw()

    battleSprites.forEach(sprite => sprite.draw())
    //console.log("animating new battle")
}
const queue = []
//animate()
battleAnimate()
document.querySelectorAll('button').forEach(button => {
    button.addEventListener('click', (e) => {
        const selectedAttack = attacks[e.currentTarget.innerHTML]
        emby.attack({
            attack: selectedAttack,
            recv: draggle,
            battleSprites
        })
        queue.push(() => {
            draggle.attack({
                attack: attacks.Tackle,
                recv: emby,
                battleSprites
            })
        })
    })
})

document.querySelector('#dialougeBox').addEventListener('click', e => {
    console.log("CLICK")
    if (queue.length > 0) {
        queue[0]()
        queue.shift()
    } else {
        e.currentTarget.style.display = 'none'
    }
})



