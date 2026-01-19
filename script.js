let orders = [];

function addOrder() {
    let order = {
        orderId: document.getElementById("orderId").value,
        restaurantName: document.getElementById("restaurantName").value,
        itemCount: parseInt(document.getElementById("itemCount").value),
        isPaid: document.getElementById("isPaid").value === "true",
        deliveryDistance: parseFloat(document.getElementById("deliveryDistance").value)


    };

    if (!order.orderId || !order.restaurantName || isNaN(order.itemCount) || isNaN(order.deliveryDistance)) {
        alert("Please fill all details correctly");
        return;
    }



    orders.push(order);




    // Automatically switch filter to "All" so the user sees their new order
    document.getElementById("filterPaid").value = "all";




    displayOrders();
    clearFields();
}




function displayOrders() {


    let table = document.getElementById("orderTable");
    let filterValue = document.getElementById("filterPaid").value;


    
    
    table.innerHTML = "";

    
    orders.forEach(o => {
    
        // Filter Logic
        if (filterValue === "true" && !o.isPaid) return;
        if (filterValue === "false" && o.isPaid) return;


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
    let filterValue = document.getElementById("filterPaid").value;






    if (isNaN(maxDist)) {
        document.getElementById("output").innerText = "Please enter specific max distance";
        return;
    }





   
    let visibleOrders = orders.filter(o => {
        if (filterValue === "true" && !o.isPaid) return false;
        if (filterValue === "false" && o.isPaid) return false;
        return true;
    });


    let eligibleOrders = visibleOrders.filter(o => !o.isPaid && o.deliveryDistance <= maxDist);

    if (eligibleOrders.length === 0) {
        document.getElementById("output").innerText = "No unpaid order available in current view within " + maxDist + " KM";
        return;
    }

    // Find nearest
    let nearest = eligibleOrders.reduce((a, b) =>
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

document.addEventListener("DOMContentLoaded", function () {
    let filter = document.getElementById("filterPaid");
    if (filter) {
        filter.addEventListener("change", function () {
            displayOrders();
           
            
            document.getElementById("output").innerText = "";
        });
    }
});

if (document.readyState === "complete" || document.readyState === "interactive") {
    let filter = document.getElementById("filterPaid");
    if (filter) {
        filter.addEventListener("change", function () {
            displayOrders();
            document.getElementById("output").innerText = "";
        });
    }
}
