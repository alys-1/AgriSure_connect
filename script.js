const farmerForm = document.getElementById("farmerForm");
const buyerForm = document.getElementById("buyerForm");
const farmerList = document.getElementById("farmerList");
const buyerList = document.getElementById("buyerList");
const contractList = document.getElementById("contractList");

let farmers = [];
let buyers = [];
let contracts = [];

// Farmer Registration
farmerForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const farmerName = document.getElementById("farmerName").value;
    const produce = document.getElementById("produce").value;
    const quantity = document.getElementById("quantity").value;

    const farmer = { farmerName, produce, quantity };
    farmers.push(farmer);
    displayFarmers();
    checkContracts();
});

function displayFarmers() {
    farmerList.innerHTML = "";
    farmers.forEach((farmer, index) => {
        const farmerDiv = document.createElement("div");
        farmerDiv.classList.add("farmer-item");
        farmerDiv.innerHTML = `<strong>Farmer:</strong> ${farmer.farmerName} | <strong>Produce:</strong> ${farmer.produce} | <strong>Quantity:</strong> ${farmer.quantity}kg`;
        farmerList.appendChild(farmerDiv);
    });
}

// Buyer Registration
buyerForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const buyerName = document.getElementById("buyerName").value;
    const requirement = document.getElementById("requirement").value;
    const requiredQuantity = document.getElementById("requiredQuantity").value;

    const buyer = { buyerName, requirement, requiredQuantity };
    buyers.push(buyer);
    displayBuyers();
    checkContracts();
});

function displayBuyers() {
    buyerList.innerHTML = "";
    buyers.forEach((buyer, index) => {
        const buyerDiv = document.createElement("div");
        buyerDiv.classList.add("buyer-item");
        buyerDiv.innerHTML = `<strong>Buyer:</strong> ${buyer.buyerName} | <strong>Requirement:</strong> ${buyer.requirement} | <strong>Quantity:</strong> ${buyer.requiredQuantity}kg`;
        buyerList.appendChild(buyerDiv);
    });
}

// Match Contracts
function checkContracts() {
    contractList.innerHTML = "";
    contracts = [];

    farmers.forEach(farmer => {
        buyers.forEach(buyer => {
            if (farmer.produce.toLowerCase() === buyer.requirement.toLowerCase() && farmer.quantity >= buyer.requiredQuantity) {
                const contract = {
                    farmer: farmer.farmerName,
                    buyer: buyer.buyerName,
                    produce: farmer.produce,
                    quantity: buyer.requiredQuantity
                };
                contracts.push(contract);
            }
        });
    });

    displayContracts();
}

function displayContracts() {
    contracts.forEach(contract => {
        const contractDiv = document.createElement("div");
        contractDiv.classList.add("contract-item");
        contractDiv.innerHTML = `<strong>Farmer:</strong> ${contract.farmer} | <strong>Buyer:</strong> ${contract.buyer} | <strong>Produce:</strong> ${contract.produce} | <strong>Quantity:</strong> ${contract.quantity}kg`;
        contractList.appendChild(contractDiv);
    });
}
