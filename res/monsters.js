const draggleImg = new Image()
draggleImg.src = './img/draggleSprite.png'

const embyImg = new Image()
embyImg.src = './img/embySprite.png'

const monsters = {
    emby: {
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
        name: 'Moltres',
        attacks: [attacks.Tackle, attacks.Fireball]
    },
    draggle: {
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
        name: 'Chikorita',
        attacks: [attacks.Tackle, attacks.Fireball]
    }
}