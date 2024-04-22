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

const draggle = new Monster(
    monsters.draggle
)


const emby = new Monster(
    monsters.emby
)

const battleSprites = [draggle, emby]
emby.attacks.forEach(attack => {
    const button = document.createElement('button')
    button.innerHTML = attack.name
    document.querySelector("#attackBox").append(button)
})

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



