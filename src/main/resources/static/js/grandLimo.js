window.onload = init;

var weather;

function init() {
    setWeather();
    w3IncludeHTML();
}

function setWeather() {
    var url = "https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22chicago%2C%20il%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys";
        var request = new XMLHttpRequest();
        request.open("GET", url);
        request.onload = function () {
            if (request.status == 200) {
                weather = JSON.parse(request.responseText);
            } else {
                console.log(request.responseText);
                alert("beda");
            }
        };
        request.send(null);
}

function showPhoto(event) {
    var select = event.target;
    var option = select.options[select.selectedIndex];
    option.setAttribute("selected", "selected");

    var imageName = getImageByName(option.value);

    var img = document.getElementById("image");
    img.src = imageName;
    img.alt = option.value;
}

function getImageByName(name) {
    switch (name) {
        case "Cadillac XTS":
            return "images/2013-Cadillac-XTS-103.jpg";
        case "Lincoln MKT":
            return "images/mkt14_highlight_lg_epas.jpg";
        case "Chevrolet Suburban":
            return "images/2015-chevrolet-suburban-texas-edition-03.jpg";
        case "Lincoln Stretch":
            return "images/l.jpg";
        case "Mercedes Benz S550":
            return "images/mb.jpg";
        case "Hummer H2 Stretch":
            return "images/hummer.jpg";
        case "36 Passenger Party Bus":
            return "images/36-Passenger-Limo-Bus.jpg";
        case "22 Passenger Party Bus":
            return "images/22-Passenger-Bus-Limo.jpg";
        case "Mercedes Sprinter Limo":
            return "images/Mercedes-Sprinter-Limo2.jpg";
        default:
            return "";
    }
}

function handleClick(input) {
    if (input.value === "arrive") {
        disable(document.getElementById("airline"));
        disable(document.getElementById("flight"));
    } else if (input.value === "depart") {
        enable(document.getElementById("airline"), "AirFrance");
        enable(document.getElementById("flight"), "AM3555");
    }
}

function disable(element) {
    element.disabled = true;
    element.required = false;
    element.placeholder = "";
    element.value = "";
}

function enable(element, text) {
    element.disabled = false;
    element.required = true;
    element.placeholder = text;
}

function Order(vehicle, place, date) {
    this.vehicle = vehicle;
    this.place = place;
    this.date = date;
    this.depart = false;
    this.airline = "";
    this.flightNumber = "";
    this.phoneNumber = "";
    this.company = "";
}

function dataAsJson() {
    var select = document.getElementById("vehicles");
    var option = select.options[select.selectedIndex];
    var vehicle = option.value;
    var place = document.querySelector('input[name="place"]:checked').value;
    var date = document.getElementById("date").value;

    var order = new Order(vehicle, place, date);
    var type = document.querySelector('input[name="type"]:checked').value;
    if (type === "depart") {
        order.depart = true;
        order.airline = document.getElementById("airline").value;
        order.flightNumber = document.getElementById("flight").value;
    }
    var phone = document.getElementById("phone").value;
    order.phoneNumber = phone;
    var company = document.getElementById("company").value;
    order.company = company;

    return JSON.stringify(order);
}

function sendData() {
    var url = "http://localhost:8080/api/orders";
    var request = new XMLHttpRequest();
    request.open("POST", url);
    request.setRequestHeader("Content-Type", "application/json");
    request.onload = function () {
        if (request.status == 201) {
            var modal = document.getElementById("modal");
            modal.removeAttribute("hidden");
            var date = document.getElementById("weatherDate");
            date.innerHTML = weather.query.results.channel.lastBuildDate;
            var link = document.getElementById("link");
            var s = weather.query.results.channel.link;
            var a = document.createElement('a');
            a.href = s.substring(s.search("\\*")+1, s.length);
            var linkText = document.createTextNode(s.substring(s.search("\\*")+1, s.length));
            a.appendChild(linkText);
            link.appendChild(a);

            var temperatureLow = document.getElementById("temperatureLow");
            temperatureLow.innerHTML = weather.query.results.channel.item.forecast[0].low;
            var temperatureHigh = document.getElementById("temperatureHigh");
            temperatureHigh.innerHTML = weather.query.results.channel.item.forecast[0].high;
            var text = document.getElementById("text");
            text.innerHTML = weather.query.results.channel.item.forecast[0].text;
            var wind = document.getElementById("wind");
            wind.innerHTML = weather.query.results.channel.wind.speed;
            document.body.replaceChild(modal, document.getElementById("reservation-container"));
        } else {
            alert(request.responseText);
        }
    };
    request.send(dataAsJson());
}