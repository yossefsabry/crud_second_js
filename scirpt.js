// get Doms variable
let Inputname = document.getElementById("name");
let price = document.getElementById("price");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let total = document.getElementById("total");
let count = document.getElementById("count");
let category = document.getElementById("category");

let create = document.getElementById("create");

// start variable
let mood = "create";
let tmp;

// chectTotal call
price.addEventListener("keyup", checkTotal);
ads.addEventListener("keyup", checkTotal);
discount.addEventListener("keyup", checkTotal);
count.addEventListener("keyup", checkTotal);

function checkTotal() {
    /**
     ** the function for chect total for the price and ads and discount and count and add total
     ** first the price input must have value
     ** and check the count in equl "" make the multaplicaion for one else in the count value
     ** if the price is null return the the total background and to value is nulll
     */
    if (price.value !== "") {
        if (count.value == "") {
            let results = (+price.value + +ads.value - +discount.value) * 1;
            total.innerHTML = results;
            total.style.background = "rgb(66, 105, 7)";
        } else {
            let results =
                (+price.value + +ads.value - +discount.value) * +count.value;
            total.innerHTML = results;
            total.style.background = "rgb(66, 105, 7)";
        }
    } else {
        total.innerHTML = "";
        total.style.background = "brown";
    }
}
checkTotal();

// start storage the data in localstorage
create.addEventListener("click", collectData);

let dataStorage;

// check for the dataStorage is empty or none
if (localStorage.product != null) {
    dataStorage = JSON.parse(localStorage.product);
} else {
    dataStorage = [];
}
function collectData() {
    let newProduct = {
        Inputname: Inputname.value.toLowerCase(),
        price: price.value,
        ads: ads.value,
        discount: discount.value,
        count: count.value,
        total: total.innerHTML,
        category: category.value,
    };
    if (mood == "create" && Inputname.value != "") {
        dataStorage.push(newProduct);
    } else {
        dataStorage[tmp] = newProduct;
        mood = "create";
        create.innerHTML = "create";
    }
    localStorage.setItem("product", JSON.stringify(dataStorage));
    showData();
}
// start clear inputs
create.addEventListener("click", clearInputs);
function clearInputs() {
    Inputname.value = "";
    price.value = "";
    ads.value = "";
    discount.value = "";
    total.innerHTML = "";
    count.value = "";
    category.value = "";
}

// start show data
function showData() {
    checkTotal();
    let table = "";
    for (let i = 0; i < dataStorage.length; i++) {
        table += `
        <tr>
            <td>${i + 1}</td>
            <td>${dataStorage[i].Inputname}</td>
            <td>${dataStorage[i].price}</td>
            <td>${dataStorage[i].ads}</td>
            <td>${dataStorage[i].discount}</td>
            <td>${dataStorage[i].count}</td>
            <td>${dataStorage[i].total}</td>
            <td>${dataStorage[i].category}</td>
            <td><button id="update" onclick="updateRow(${i})">update</button></td>
            <td><button id="deleta" onclick="deleteRow(${i})">delete</button></td>
        </tr>
        `;
    }
    document.getElementById("tbody").innerHTML = table;

    // add button for delete all
    let btnDeletaAll = document.getElementById("delete_all");
    if (dataStorage.length > 0) {
        btnDeletaAll.innerHTML = `
        <button onclick="deleteAll()">Delete All</button>
        `;
    } else {
        btnDeletaAll.innerHTML = ''
    }
}
showData();

// deleteAll
function deleteAll() {
    localStorage.clear(); // clear the localstorage
    dataStorage.splice(0); // clear the array
    showData();
}

// delete row
function deleteRow(i) {
    dataStorage.splice(i, 1); //remove from localstorage
    // add the new datastorage to the array that show the the table after delete the row
    localStorage.product = JSON.stringify(dataStorage);
    //refresh the table
    showData();
}

// updata function
function updateRow(i) {
    Inputname.value = dataStorage[i].Inputname;
    price.value = dataStorage[i].price;
    ads.value = dataStorage[i].ads;
    discount.value = dataStorage[i].discount;
    count.value = dataStorage[i].count;
    total.value = dataStorage[i].total;
    category.value = dataStorage[i].category;

    scroll({
        top: 0,
        behavior: "smooth",
    });
    create.innerHTML = "update";
    mood = "update";
    tmp = i;
    checkTotal();
}

