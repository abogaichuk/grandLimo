function showPhoto(event) {
    var select = event.target;
    var option = select.options[select.selectedIndex];
    option.setAttribute("selected", "selected");

    var imageName = getImageByName(option.value);

    var img = document.getElementById("image");
    img.src = imageName;
    img.alt = option.value;
}

w3IncludeHTML();

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
    var url = "http://localhost:8080/orders";
    var request = new XMLHttpRequest();
    request.open("POST", url);
    request.setRequestHeader("Content-Type", "application/json");
    request.onload = function () {
        if (request.status == 201) {
            var modal = document.getElementById("modal");
            modal.removeAttribute("hidden");
            document.body.replaceChild(modal, document.getElementById("reservation-container"));
        } else {
            alert(request.responseText);
        }
    };
    request.send(dataAsJson());
}