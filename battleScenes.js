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
animate()
battleAnimate()
document.querySelectorAll('button').forEach(button => {
    button.addEventListener('click', (e) => {
        const selectedAttack = attacks[e.currentTarget.innerHTML]
        emby.attack({
            attack: selectedAttack,
            recv: draggle,
            battleSprites
        })
        if (draggle.health <= 25) {
            queue.push(() => {
                draggle.faint()
            })
            return
        }

        randAttack = draggle.attacks[Math.floor(Math.random() * draggle.attacks.length)]
        queue.push(() => {
            draggle.attack({
                attack: randAttack,
                recv: emby,
                battleSprites
            })
            if (emby.health <= 25) {
                queue.push(() => {
                    emby.faint()
                })
                return
            }
        })
    })
    button.addEventListener('mouseenter', e => {
        const selectedAttack = attacks[e.currentTarget.innerHTML]
        document.querySelector('#attack h1').innerHTML = selectedAttack.type
        document.querySelector('#attack h1').style.color = selectedAttack.color

    })
})

document.querySelector('#dialougeBox').addEventListener('click', e => {
    if (queue.length > 0) {
        queue[0]()
        queue.shift()
    } else {
        e.currentTarget.style.display = 'none'
    }
})



