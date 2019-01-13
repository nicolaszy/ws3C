/* global $ bulmaCarousel */
/* exported send */

$(document).ready(function () {
	parseAgenda()
	parsePartner()
	parseGallery()

	// https://www.w3schools.com/howto/howto_css_smooth_scroll.asp#section1
	$('a').on('click', function (event) {

		if (this.hash !== '') {
			event.preventDefault()

			let hash = this.hash

			$('html, body').animate({
				scrollTop: $(hash).offset().top
			}, 800, function () {
				window.location.hash = hash
			})
		}
	})


})

document.addEventListener('DOMContentLoaded', () => {

	const $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0)
	if ($navbarBurgers.length > 0) {

		$navbarBurgers.forEach(element => {
			element.addEventListener('click', () => {

				const target = element.dataset.target
				const $target = document.getElementById(target)

				element.classList.toggle('is-active')
				$target.classList.toggle('is-active')
			})
		})
	}
})

function validateEmail(value) {

	let classes = document.getElementById('email').classList
	let emailok = document.getElementById('email-ok')
	let emailnok = document.getElementById('email-nok')

	let regex = new RegExp(/([\w.\-_]+)?\w+@[\w-_]+(\.\w+)+/, 'igm')
	if (regex.test(value)) {
		classes.remove('is-danger')
		classes.add('is-primary')
		emailok.style.display = 'inline-flex'
		emailnok.style.display = 'none'
		return true
	} else {
		classes.remove('is-primary')
		classes.add('is-danger')
		emailok.style.display = 'none'
		emailnok.style.display = 'inline-flex'
		return false
	}
}

function send() {// eslint-disable-line no-unused-vars

	let name = document.getElementById('name').value
	let email = document.getElementById('email').value
	let phone = document.getElementById('phone').value
	let subject = document.getElementById('subject').value
	let question = document.getElementById('question').value

	let to = 'exemple@email.com'

	let body = 'Anfrage von feac.ch %0D%0A%0D%0A' +
		`Name: ${name}%0D%0A` +
		`Email: ${email}%0D%0A` +
		`Telefon: ${phone}%0D%0A%0D%0A` +
		`Betreff: ${subject}%0D%0A%0D%0A` +
		`Anfrage: ${question}`

	if (validateEmail(email)) {
		window.open(`mailto:${to}?cc=${email}&subject=${subject}&body=${body}`)
	}

}

function parseGallery() {
	let request = new XMLHttpRequest()
	request.onreadystatechange = function () {
		if (this.readyState === 4 && this.status === 200) {
			read(this)
		}

	}
	request.open('GET', 'data/gallery.xml', true)
	request.send()

	function read(xml) {
		let doc = xml.responseXML
		let gallery = document.getElementById('gallery')
		let slides = doc.getElementsByTagName('slide')
		for (let i = 0; i < slides.length; i++) {
			let slide = slides[i]

			let div = document.createElement('div')
			div.className = i === 0 ? 'carousel-item has-background is-active' : 'carousel-item has-background'

			let t = slide.getElementsByTagName('title')[0].innerHTML
			let img = document.createElement('img')
			img.className = 'is-background'
			img.setAttribute('src', 'images/gallery/' + slide.getElementsByTagName('image')[0].innerHTML)
			img.setAttribute('height', '300')
			img.setAttribute('alt', t)

			let title = document.createElement('div')
			title.className = 'title'
			title.innerText = t

			div.append(img, title)
			gallery.appendChild(div)
		}
		bulmaCarousel.attach()
	}
}

/*
*  <div class='carousel-item has-background is-active'>
*      <img class="is-background" src="https://wikiki.github.io/images/merry-christmas.jpg" alt=""  width="640"
 *      height="310"/>
 *      <div class="title">Merry Christmas</div>
 *  </div>
* */

function parsePartner() {
	let request = new XMLHttpRequest()
	request.onreadystatechange = function () {
		if (this.readyState === 4 && this.status === 200) {
			read(this)
		}
	}
	request.open('GET', 'data/partner.xml', true)
	request.send()

	function read(xml) {

		let doc = xml.responseXML
		let sponsors = document.getElementById('sponsors')
		let friends = document.getElementById('friends')

		let sponsorEntries = doc.getElementsByTagName('sponsor')
		for (let i = 0; i < sponsorEntries.length; i++) {
			let entry = sponsorEntries[i]
			let div = document.createElement('div')
			div.className = 'column is-half'

			let box = document.createElement('div')
			box.className = 'box'

			if (entry.getElementsByTagName('image').length > 0) {
				let figure = document.createElement('figure')
				figure.className = 'image is-3by1'

				let image = document.createElement('img')
				image.setAttribute('src', 'images/' + entry.getElementsByTagName('image')[0].innerHTML)
				image.setAttribute('title', entry.getElementsByTagName('title')[0].innerHTML)

				figure.appendChild(image)

				if (entry.getElementsByTagName('url').length > 0) {
					let url = document.createElement('a')
					url.setAttribute('href', entry.getElementsByTagName('url')[0].innerHTML)
					url.setAttribute('target', '_blank')
					url.appendChild(figure)
					box.appendChild(url)
				} else {
					box.appendChild(figure)
				}
			} else {
				if (entry.getElementsByTagName('url').length > 0) {
					let url = document.createElement('a')
					url.setAttribute('href', entry.getElementsByTagName('url')[0].innerHTML)
					url.setAttribute('target', '_blank')
					url.innerText = entry.getElementsByTagName('title')[0].innerHTML

					box.appendChild(url)
				} else {
					box.innerText = entry.getElementsByTagName('title')[0].innerHTML
				}
			}
			div.appendChild(box)
			sponsors.appendChild(div)
		}


		let friendEntries = doc.getElementsByTagName('friend')
		for (let i = 0; i < friendEntries.length; i++) {
			let entry = friendEntries[i]
			let div = document.createElement('div')
			div.className = 'column is-half'

			let box = document.createElement('div')
			box.className = 'box'

			if (entry.getElementsByTagName('image').length > 0) {
				let figure = document.createElement('figure')
				figure.className = 'image is-1by1'
				let image = document.createElement('img')
				image.setAttribute('src', 'images/' + entry.getElementsByTagName('image')[0].innerHTML)
				image.setAttribute('title', entry.getElementsByTagName('title')[0].innerHTML)

				figure.appendChild(image)

				if (entry.getElementsByTagName('url').length > 0) {
					let url = document.createElement('a')
					url.setAttribute('href', entry.getElementsByTagName('url')[0].innerHTML)
					url.setAttribute('target', '_blank')

					url.appendChild(figure)
					box.appendChild(url)
				} else {
					box.appendChild(figure)
				}
			} else {
				if (entry.getElementsByTagName('url').length > 0) {
					let url = document.createElement('a')
					url.setAttribute('href', entry.getElementsByTagName('url')[0].innerHTML)
					url.setAttribute('target', '_blank')
					url.innerText = entry.getElementsByTagName('title')[0].innerHTML

					box.appendChild(url)
				} else {
					box.innerText = entry.getElementsByTagName('title')[0].innerHTML
				}
			}
			div.appendChild(box)
			friends.appendChild(div)
		}

	}
}

function parseAgenda() {
	let request = new XMLHttpRequest()
	request.onreadystatechange = function () {
		if (this.readyState === 4 && this.status === 200) {
			read(this)
		}
	}
	request.open('GET', 'data/agenda.xml', true)
	request.send()

	function read(xml) {
		let doc = xml.responseXML
		let agenda = document.getElementById('agenda')
		let entries = doc.getElementsByTagName('entry')

		for (let i = 0; i < entries.length; i++) {
			let entry = entries[i]

			let div = document.createElement('div')
			div.className = 'column is-4'

			let box = document.createElement('div')
			box.className = 'box'

			let title = document.createElement('h3')
			title.className = 'agendatitle has-background-info'
			title.innerHTML = entry.getElementsByTagName('title')[0].innerHTML

			let date = document.createElement('p')
			let d = entry.getElementsByTagName('date')[0]
			if (d) {
				let from = d.getAttribute('from')
				let to = d.getAttribute('to')
				let time = d.getAttribute('time')
				let r = entry.getElementsByTagName('recuring')[0]

				date.innerHTML = createDateString(from, to, time, r)
			}

			let description = document.createElement('p')
			description.innerHTML = entry.getElementsByTagName('description')[0].innerHTML

			let loc = entry.getElementsByTagName('location')[0]
			let location = loc.getAttribute('name')
			let address = document.createElement('address')
			let street = loc.getElementsByTagName('street')[0].innerHTML
			let plz = loc.getElementsByTagName('plz')[0].innerHTML
			let city = loc.getElementsByTagName('city')[0].innerHTML

			address.innerHTML = location + '<br/>' + street + '<br/>' + plz + ' ' + city

			box.append(title, date, description, address)
			div.appendChild(box)
			agenda.appendChild(div)
		}


	}

	function createDateString(from, to, time, recurence) {
		let result = ''
		if (from) {
			result += new Date(from).toLocaleDateString('de-CH')
			if (to) {
				result += ' - ' + new Date(to).toLocaleDateString('de-CH')
			}
		}
		if (recurence) {
			result += result.length > 0 ? ' ' : ''
			result += recurence.getAttribute('r')
		}
		if (time) {
			result += result.length > 0 ? ' ' : ''
			result += time
		}

		return result
	}
}
