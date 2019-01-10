/* global $ */


$(document).ready(function () {
	parseAgenda()
	parsePartner()

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
				if (entry.getElementsByTagName('url').length > 0) {
					let url = document.createElement('a')
					url.setAttribute('href', entry.getElementsByTagName('url')[0].innerHTML)
					url.setAttribute('target', '_blank')

					let image = document.createElement('img')
					image.setAttribute('src', 'images/' + entry.getElementsByTagName('image')[0].innerHTML)
					image.setAttribute('title', entry.getElementsByTagName('title')[0].innerHTML)
					url.appendChild(image)
					box.appendChild(url)
				} else {
					let image = document.createElement('img')
					image.setAttribute('src', 'images/' + entry.getElementsByTagName('image')[0].innerHTML)
					image.setAttribute('title', entry.getElementsByTagName('title')[0].innerHTML)
					box.appendChild(image)
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
				if (entry.getElementsByTagName('url').length > 0) {
					let url = document.createElement('a')
					url.setAttribute('href', entry.getElementsByTagName('url')[0].innerHTML)
					url.setAttribute('target', '_blank')

					let image = document.createElement('img')
					image.setAttribute('src', 'images/' + entry.getElementsByTagName('image')[0].innerHTML)
					image.setAttribute('title', entry.getElementsByTagName('title')[0].innerHTML)
					url.appendChild(image)
					box.appendChild(url)
				} else {
					let image = document.createElement('img')
					image.setAttribute('src', 'images/' + entry.getElementsByTagName('image')[0].innerHTML)
					image.setAttribute('title', entry.getElementsByTagName('title')[0].innerHTML)
					box.appendChild(image)
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
			div.className = 'column'

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
