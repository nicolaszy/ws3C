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
            div.className = "agendaentry";

            let description = document.createElement('div');
            description.className = "agendatitle";
            description.innerHTML = entry.getElementsByTagName('description')[0].innerHTML;

            let loc = entry.getElementsByTagName('location')[0];
            let address = document.createElement('address');
            let street = loc.getElementsByTagName('street')[0].innerHTML;
            let plz = loc.getElementsByTagName('plz')[0].innerHTML;
            let city = loc.getElementsByTagName('city')[0].innerHTML;
            console.log(street);
            address.innerHTML = street + '<br/>' + plz + " " + city;

            div.append(description, address);
            agenda.appendChild(div);
        }


    }
}
