let orders = [];

function addOrder() {

    let order = {
        orderId: document.getElementById("orderId").value,
        restaurantName: document.getElementById("restaurantName").value,
        itemCount: parseInt(document.getElementById("itemCount").value),
        isPaid: document.getElementById("isPaid").value === "true",
        
        deliveryDistance: parseFloat(document.getElementById("deliveryDistance").value)


    };

    if (!order.orderId || !order.restaurantName) {
        alert("Please fill all details");
        return;



    }

    orders.push(order);
    displayOrders();
    clearFields();
}

function displayOrders() {
    let table = document.getElementById("orderTable");


    table.innerHTML = "";

    orders.forEach(o => {
        let row = `<tr>
            <td>${o.orderId}</td>
            <td>${o.restaurantName}</td>
            <td>${o.itemCount}</td>
            <td>${o.isPaid ? "Yes" : "No"}</td>
            <td>${o.deliveryDistance}</td>
        </tr>`;
        table.innerHTML += row;


    });


}

function assignDelivery() {
    let maxDist = parseFloat(document.getElementById("maxDistance").value);
    let unpaidOrders = orders.filter(o => !o.isPaid && o.deliveryDistance <= maxDist);





    if (unpaidOrders.length === 0) {
        document.getElementById("output").innerText = "No order available";
        return;

    }


    let nearest = unpaidOrders.reduce((a, b) =>

        a.deliveryDistance < b.deliveryDistance ? a : b


    );

    document.getElementById("output").innerText =


        "Assigned Order ID: " + nearest.orderId +

        " (" + nearest.restaurantName + ")";
}

function clearFields() {
    document.getElementById("orderId").value = "";

    document.getElementById("restaurantName").value = "";
    document.getElementById("itemCount").value = "";


    document.getElementById("deliveryDistance").value = "";


}
