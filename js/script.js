// https://www.w3schools.com/howto/howto_css_smooth_scroll.asp#section1

$(document).ready(function () {
    parseAgenda();


    // Add smooth scrolling to all links
    $("a").on('click', function (event) {

        // Make sure this.hash has a value before overriding default behavior
        if (this.hash !== "") {
            // Prevent default anchor click behavior
            event.preventDefault();

            // Store hash
            var hash = this.hash;

            // Using jQuery's animate() method to add smooth page scroll
            // The optional number (800) specifies the number of milliseconds it takes to scroll to the specified area
            $('html, body').animate({
                scrollTop: $(hash).offset().top
            }, 800, function () {

                // Add hash (#) to URL when done scrolling (default click behavior)
                window.location.hash = hash;
            });
        } // End if
    });
});


function parseAgenda() {
    let request = new XMLHttpRequest();
    request.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            read(this);
        }
    };
    request.open('GET', 'data/agenda.xml', true);
    request.send();

    function read(xml) {
        let doc = xml.responseXML;
        let agenda = document.getElementById('agenda');
        let entries = doc.getElementsByTagName("entry");

        for (let i = 0; i < entries.length; i++) {
            let entry = entries[i];

            let div = document.createElement('div');
            div.className = 'column';

            let box = document.createElement('div');
            box.className = 'box';

            let title = document.createElement('h3');
            title.className = "agendatitle has-background-info";
            title.innerHTML = entry.getElementsByTagName('title')[0].innerHTML;

            let date = document.createElement('p');
            let d = entry.getElementsByTagName("date")[0];
            if (d) {
                let from = d.getAttribute('from');
                let to = d.getAttribute('to');
                let time = d.getAttribute('time');
                date.innerHTML = createDateString(from, to, time);
            }

            let recuring = document.createElement('p');
            let r = entry.getElementsByTagName('recuring')[0];
            if (r) {
                recuring.innerHTML = r.getAttribute('r');
            }


            let description = document.createElement('p');
            description.innerHTML = entry.getElementsByTagName('description')[0].innerHTML;


            let loc = entry.getElementsByTagName('location')[0];
            let address = document.createElement('address');
            let street = loc.getElementsByTagName('street')[0].innerHTML;
            let plz = loc.getElementsByTagName('plz')[0].innerHTML;
            let city = loc.getElementsByTagName('city')[0].innerHTML;
            address.innerHTML = street + '<br/>' + plz + " " + city;

            box.append(title, date, recuring, description, address);
            div.appendChild(box);
            agenda.appendChild(div);
        }


    }

    function createDateString(from, to, time) {
        let result = "";
        if (from) {
            result += new Date(from).toLocaleDateString('de-CH');
            if (to) {
                result += " - " + new Date(to).toLocaleDateString('de-CH');
            }
        }

        if (time) {
            result += result.length > 0 ? " " : "";
            result += time;
        }
        return result;
    }
}
