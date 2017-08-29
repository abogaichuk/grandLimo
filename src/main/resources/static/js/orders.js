window.onload = init;

function init() {
    getOrders();
}

function getOrders() {
    var url = "http://localhost:8080/getOrders";
    var request = new XMLHttpRequest();
    request.open("GET", url);
    request.onload = function () {
        if (request.status == 200) {
            updateOrders(request.responseText);
        } else {
            console.log(request.responseText);
            alert("beda");
        }
    };
    request.send(null);
}

function updateOrders(responseText) {
    var table = document.getElementById("ordersTable");
    var orders = JSON.parse(responseText);

    for (var i = 0; i < orders.length; i++) {
        var order = orders[i];
        var tr = document.createElement("tr");

        var cell1 = document.createElement("td");
        var cell2 = document.createElement("td");
        var cell3 = document.createElement("td");
        var cell4 = document.createElement("td");
        var cell5 = document.createElement("td");
        var cell6 = document.createElement("td");
        var cell7 = document.createElement("td");
        var cell8 = document.createElement("td");

        cell1.innerHTML = order.vehicle;
        cell2.innerHTML = order.place;
        cell3.innerHTML = order.date;
        cell4.innerHTML = order.depart;
        cell5.innerHTML = order.airline;
        cell6.innerHTML = order.flightNumber;
        cell7.innerHTML = order.phoneNumber;
        cell8.innerHTML = order.company;

        tr.appendChild(cell1);
        tr.appendChild(cell2);
        tr.appendChild(cell3);
        tr.appendChild(cell4);
        tr.appendChild(cell5);
        tr.appendChild(cell6);
        tr.appendChild(cell7);
        tr.appendChild(cell8);
        table.appendChild(tr);
    }
}