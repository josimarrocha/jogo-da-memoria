(function () {
	'use strict'
	const imgCard = [
		'svg1.svg',
		'svg2.svg',
		'svg3.svg',
		'svg4.svg',
		'svg5.svg',
		'svg6.svg',
		'svg7.svg',
		'svg8.svg',
		'svg9.svg'
	]
	const $game = document.querySelector('.game-memory')
	const $btnCategoria = document.querySelector('.categoria--btn')
	const $categoriaMenu = document.querySelector('.categoria__menu')
	const $radioCategoria = document.querySelectorAll('.categoria--radio')
	const $congratulations = document.querySelector('.congratulations')
	const countPares = []
	$btnCategoria.addEventListener('click', openMenuCategoria)

	function openMenuCategoria() {
		$btnCategoria.classList.toggle('openMenu')
		$categoriaMenu.classList.toggle('-active')
	}

	function app(categoria){
		imgCard.forEach((img) => {
			const cards = `
			<div class="card" data-js='${img}'>
				<div class="card__back">
					<img src='img/${categoria}/${img}' class='card__img' />
				</div>
				<div class="card__front">
					<img src='img/${categoria}/capa.svg' class='card__img' />
				</div>
			</div>`
			$game.innerHTML += cards + cards
		})

		$radioCategoria.forEach((radio) => {
			radio.addEventListener('click', () => {
				$game.innerHTML = ''
				app(radio.getAttribute('data-radio'))
			})
		})

		let $card = document.querySelectorAll('.card')

		function spreadCards() {
			$card.forEach((card) => {
				setTimeout(() => card.classList.toggle(`-animacao`), 400)
				card.addEventListener('click', handleOpenCard)
			})
		}

		(function () {
			$card.forEach((card) => {
				let random = Math.floor(Math.random() * 12 + 1)
				card.style.order = random
				random = ''
			})
		})()

		let firstCart;
		let secondCart;

		function handleOpenCard() {
			$btnCategoria.classList.remove('openMenu')
			$categoriaMenu.classList.remove('-active')
			if (!secondCart) {
				this.classList.add('-flip')
				if (firstCart) {
					secondCart = this
					firstCart.addEventListener('click', handleOpenCard)
					isEqualsCards()
					return false
				}
				firstCart = this
				firstCart.removeEventListener('click', handleOpenCard)
			}
		}

		function isEqualsCards() {
			firstCart.getAttribute('data-js') !== 
			secondCart.getAttribute('data-js') ?
				disableFlip() : removeEventClick()
		}

		function disableFlip() {
			setTimeout(() => {
				secondCart.classList.remove('-flip')
				firstCart.classList.remove('-flip')
				firstCart = ''
				secondCart = ''
			}, 2000)
		}

		function removeEventClick() {
			countPares.push(1)
			if(imgCard.length === countPares.length){
				$congratulations.style.display = 'block'
			}
			firstCart.removeEventListener('click', handleOpenCard);
			secondCart.removeEventListener('click', handleOpenCard);
			firstCart = '';
			secondCart = '';
		}	
		spreadCards()
	}
	app('TI')
})(window)



