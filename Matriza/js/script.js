(() => {

	const PROPERTIES = {
		spaceDiametr	: 32,
		dotDiametr		: 14,
		waveLength		: 100,
		velocity		: .03,
		direction		: -1,
		displacement	: 50
	}

	const canvas = document.querySelector('#canvas');
	const ctx = canvas.getContext('2d');

	let w = canvas.width = innerWidth;
	let h = canvas.height = innerHeight;

	let dotsList;

	canvas.style.backgroundColor = 'rgba(17, 17, 23, 1)';

	window.onresize = function() {
		w = canvas.width = innerWidth;
		h = canvas.height = innerHeight;
		init();
	}


	class Dot {
		constructor(x, y, num) {
			this.x = x;
			this.y = y;
			this.radius = PROPERTIES.dotDiametr / 2;
			this.scale = getDistance(x, y) / PROPERTIES.waveLength;
			this.text = num;
		}

		update() {
			this.resize();
			this.draw();
		}

		resize() {
			this.scale = this.scale - PROPERTIES.velocity * PROPERTIES.direction;
		}

		draw() {

			let s = (1 - Math.abs(Math.sin(this.scale)));
			let o = (1 - s) * 255;
			let r = this.radius * s;

			// ctx.beginPath();
			// ctx.arc(this.x, this.y, r, 0, 2 * Math.PI, false);
			// ctx.closePath();
			ctx.fillStyle = 'rgba(' + o + ', 255, ' + o + ', ' + s + ')';
			ctx.fillText(this.text, this.x, this.y);
		}
	}

	

	function init() {
		dotsList = [];

		const dotsCountX = w / PROPERTIES.spaceDiametr | 0;
		const dotsCountY = h / PROPERTIES.spaceDiametr | 0;

		const startX = (PROPERTIES.spaceDiametr + w - dotsCountX * PROPERTIES.spaceDiametr) / 2;
		const startY = (PROPERTIES.spaceDiametr + h - dotsCountY * PROPERTIES.spaceDiametr) / 2;

		let displacement = PROPERTIES.spaceDiametr / 4 * PROPERTIES.displacement;

		for (let j = 0; j < dotsCountY; j++) {

			displacement = - displacement;

			let y = startY + j * PROPERTIES.spaceDiametr

			for (let i = 0; i < dotsCountX; i++) {
				let x = startX + i * PROPERTIES.spaceDiametr + displacement;
				dotsList.push(new Dot(x, y, i + j));
			}
		}
	}

	function loop() {

		ctx.clearRect(0, 0, w, h);

		for (let a in dotsList) {
			dotsList[a].update();
		}

		requestAnimationFrame(loop);
	}

	function getDistance(x, y) {
		let dx = w / 2 - x;
		let dy = h / 2 - y;

		return Math.sqrt((dx * dx) + (dy * dy));
	}

	init();
	loop();
})();