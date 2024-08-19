game.player = {
		x: 54,
		y: 0,
		height: 24,
		highestY: 0,
		score : 0,
		direction: "left",
		jumpCounter : 0,
		isInAir: false,
		startedJump: false,
		moveInterval: null,
		maxHeight : 0,
		fallTimeout: function(startingY, time, maxHeight) {
			setTimeout( function () {
				if (this.isInAir) {
					if ( this.jumpCounter == 2 ) {
						this.y = startingY - maxHeight - 121 + Math.pow((-time / 3 + 11), 2)
					} else {
						this.y = startingY - maxHeight + Math.pow((-time / 3 + 11), 2)
					}
					
					if (this.y < this.highestY) {
						this.highestY = this.y
					}
					if (time > 37) {
						this.startedJump = false
						game.checkCollisions()
						this.jumpCounter = 0;
					}
					if (time < 150) {
						time++
						this.fallTimeout(startingY, time, maxHeight)
					} else {
						game.isOver = true
					}
					if (this.y > 40) {
						game.isOver = true
					}
					game.requestRedraw()
				}
			}.bind(this, startingY, time, maxHeight), 12)
		},
		animationFrameNumber: 0,
		collidesWithGround: true,
		animations: {
			// Describe coordinates of consecutive animation frames of objects in textures
			// left: [{tileColumn: 4, tileRow: 0}, {tileColumn: 5, tileRow: 0}, {tileColumn: 4, tileRow: 0}, {tileColumn: 6, tileRow: 0}],
			// right: [{tileColumn: 9, tileRow: 0}, {tileColumn: 8, tileRow: 0}, {tileColumn: 9, tileRow: 0}, {tileColumn: 7, tileRow: 0}]
			left: [{tileColumn: 0, tileRow: 0}, {tileColumn: 0, tileRow: 2}, {tileColumn: 3, tileRow: 2}, {tileColumn: 1, tileRow: 2}],
			right: [{tileColumn: 0, tileRow: 0}, {tileColumn: 0, tileRow: 3}, {tileColumn: 3, tileRow: 3}, {tileColumn: 1, tileRow: 3}]
		},
		jump: function (type) {
			if (!this.isInAir) {
				clearInterval(this.fallInterval)
				game.sounds.jump.play()
				this.isInAir = true
				this.startedJump = true
				var startingY = this.y
				var time = 1
				maxHeight = 121
				if (type == "fall") {
					time = 30
					maxHeight = 0
				}
				this.fallTimeout(startingY, time, maxHeight)
			}
		}
	}
