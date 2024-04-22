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

class Sprite {
    constructor({ position, image, frames = { max: 1, hold: 15 }, sprites, moving = false, isEnemy = false, rotation = 0, name }) {
        this.position = position
        this.image = image
        this.frames = { ...frames, val: 0, elapased: 0 }
        this.image.onload = () => {
            this.width = this.image.width / this.frames.max
            this.height = this.image.height
        }
        this.moving = moving
        this.sprites = sprites
        this.opacity = 1
        this.health = 100
        this.isEnemy = isEnemy
        this.rotation = rotation
        this.name = name
    }
    draw() {
        ctx.save()
        ctx.globalAlpha = this.opacity
        ctx.translate(this.position.x + this.width / 2, this.position.y + this.height / 2)
        ctx.rotate(this.rotation)
        ctx.translate(-this.position.x - this.width / 2, -this.position.y - this.height / 2)
        ctx.drawImage(
            this.image,
            this.width * this.frames.val,
            0,
            this.image.width / this.frames.max,
            this.image.height,
            this.position.x,
            this.position.y,
            this.image.width / this.frames.max,
            this.image.height
        )
        ctx.restore()
        if (!this.moving) return

        if (this.frames.max > 1) {
            this.frames.elapased++
            if (this.frames.elapased % this.frames.hold === 0) {
                this.frames.elapased = 0
                if (this.frames.val < this.frames.max - 1) this.frames.val++
                else this.frames.val = 0
            }
        }

    }
    attack({ attack, recv, battleSprites }) {
        document.querySelector('#dialougeBox').style.display = 'block'
        document.querySelector('#dialougeBox').innerHTML = this.name + ' used ' + attack.name
        let target = '#enemy'
        if (this.isEnemy) target = '#player'
        let rotation = 1
        if (this.isEnemy) rotation = -2.2
        recv.health -= attack.damage
        if (attack.name === 'Tackle') {
            let attackmovement = 20
            if (this.isEnemy) attackmovement = -20

            const tl = gsap.timeline()
            console.log(this.health)
            tl.to(this.position, {
                x: this.position.x - attackmovement
            })
                .to(this.position, {
                    x: this.position.x + attackmovement * 2,
                    duration: 0.1,
                    onComplete: () => {
                        gsap.to(target, {
                            width: recv.health - attack.damage + '%'
                        })

                        gsap.to(recv.position, {
                            x: recv.position.x + 10,
                            yoyo: true,
                            repeat: 5,
                            duration: 0.08
                        })
                        gsap.to(recv, {
                            opacity: 0,
                            repeat: 5,
                            yoyo: true,
                            duration: 0.08
                        })
                    }
                })
                .to(this.position, {
                    x: this.position.x
                })
        } else {

            const fireballImg = new Image()
            fireballImg.src = './img/fireball.png'
            const fireball = new Sprite({
                position: {
                    x: this.position.x,
                    y: this.position.y
                },
                image: fireballImg,
                frames: {
                    max: 4,
                    hold: 5
                },
                moving: true,
                rotation
            })
            battleSprites.splice(1, 0, fireball)
            gsap.to(fireball.position, {
                x: recv.position.x,
                y: recv.position.y,
                onComplete: () => {
                    gsap.to(target, {
                        width: recv.health - attack.damage + '%'
                    })

                    gsap.to(recv.position, {
                        x: recv.position.x + 10,
                        yoyo: true,
                        repeat: 5,
                        duration: 0.08
                    })
                    gsap.to(recv, {
                        opacity: 0,
                        repeat: 5,
                        yoyo: true,
                        duration: 0.08
                    })
                    battleSprites.splice(1, 1)
                    console.log(emby.health, draggle.health)
                }
            })
        }
    }
}