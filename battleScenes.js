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

let draggle
let emby
let battleSprites
let queue = []
let battleAnimateId = null

function initBattle() {
    document.querySelector('#ui').style.display = 'block'
    document.querySelector('#dialougeBox').style.display = 'none'
    document.querySelector('#enemy').style.width = '100%'
    document.querySelector('#player').style.width = '100%'
    document.querySelector('#attackBox').replaceChildren()
    draggle = new Monster(
        monsters.draggle
    )
    emby = new Monster(
        monsters.emby
    )
    battleSprites = [draggle, emby]
    queue = []
    emby.attacks.forEach(attack => {
        const button = document.createElement('button')
        button.innerHTML = attack.name
        document.querySelector("#attackBox").append(button)
    })
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
                queue.push(() => {
                    gsap.to('#animate', {
                        opacity: 1,
                        onComplete: () => {
                            cancelAnimationFrame(battleAnimateId)
                            animate()
                            document.querySelector('#ui').style.display = 'none'
                            gsap.to("#animate", {
                                opacity: 0
                            })
                            battle.initiated = false
                        }
                    })
                })
                // return
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
                    queue.push(() => {
                        gsap.to('#animate', {
                            opacity: 1,
                            onComplete: () => {
                                cancelAnimationFrame(battleAnimateId)
                                animate()
                                document.querySelector('#ui').style.display = 'none'
                                gsap.to("#animate", {
                                    opacity: 0
                                })
                                battle.initiated = false
                            }
                        })
                    })
                    // return
                }
            })
        })
        button.addEventListener('mouseenter', e => {
            const selectedAttack = attacks[e.currentTarget.innerHTML]
            document.querySelector('#attack h1').innerHTML = selectedAttack.type
            document.querySelector('#attack h1').style.color = selectedAttack.color

        })
    })
}


function battleAnimate() {
    battleAnimateId = window.requestAnimationFrame(battleAnimate)
    console.log(battleAnimateId)
    battleBackground.draw()

    battleSprites.forEach(sprite => sprite.draw())
    //console.log("animating new battle")
}

//animate()
initBattle()
battleAnimate()

document.querySelector('#dialougeBox').addEventListener('click', e => {
    if (queue.length > 0) {
        queue[0]()
        queue.shift()
    } else {
        e.currentTarget.style.display = 'none'
    }
})



