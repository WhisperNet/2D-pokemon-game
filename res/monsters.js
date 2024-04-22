const monsters = {
    emby: {
        position: {
            x: 280,
            y: 330
        },
        image: {
            src: './img/embySprite.png'
        },
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
        image: {
            src: './img/draggleSprite.png'
        },
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