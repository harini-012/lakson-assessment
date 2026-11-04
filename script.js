
const products = [
    {
        id: 1,
        name: "Premium Savings Account",
        category: "savings",
        categoryName: "Savings Account",
        status: "Active",
        metricLabel: "Account Balance",
        metric: "₹2,45,000",
        secondary: "Interest Rate: 4.5% p.a.",
        icon: "bi-wallet2",
        color: "#e9f0ff",
        iconColor: "#4979d2"
    },
    {
        id: 2,
        name: "Platinum Credit Card",
        category: "card",
        categoryName: "Credit Card",
        status: "Active",
        metricLabel: "Available Credit Limit",
        metric: "₹75,000",
        secondary: "Total Limit: ₹1,00,000",
        icon: "bi-credit-card",
        color: "#f0eaff",
        iconColor: "#8062d6"
    },
    {
        id: 3,
        name: "Home Loan",
        category: "loan",
        categoryName: "Loan",
        status: "Active",
        metricLabel: "Outstanding Amount",
        metric: "₹18,50,000",
        secondary: "Interest Rate: 8.5% p.a.",
        icon: "bi-house",
        color: "#fff2df",
        iconColor: "#e99b37"
    },
    {
        id: 4,
        name: "Investment Portfolio",
        category: "wealth",
        categoryName: "Wealth Management",
        status: "Pending",
        metricLabel: "Portfolio Value",
        metric: "₹5,00,000",
        secondary: "Expected Return: 10% p.a.",
        icon: "bi-graph-up-arrow",
        color: "#e3f7ef",
        iconColor: "#239a72"
    }
];

const productContainer = document.getElementById("productContainer");
const searchInput = document.getElementById("searchInput");
const filterButtons = document.querySelectorAll(".filter-btn");
const noResults = document.getElementById("noResults");

let selectedCategory = "all";

function displayProducts(productList) {

    productContainer.innerHTML = "";

    if (productList.length === 0) {
        noResults.style.display = "block";
        return;
    }

    noResults.style.display = "none";

    productList.forEach(product => {

        const card = document.createElement("div");

        card.className = "product-card";

        const statusClass =
            product.status.toLowerCase() === "active"
                ? "active"
                : "pending";

        card.innerHTML = `
            <div class="product-top">

                <div class="product-icon"
                     style="background:${product.color};
                            color:${product.iconColor}">

                    <i class="bi ${product.icon}"></i>

                </div>

                <span class="status ${statusClass}">
                    ${product.status}
                </span>

            </div>

            <p class="product-category">
                ${product.categoryName}
            </p>

            <h4 class="product-name">
                ${product.name}
            </h4>

            <div class="product-metric">

                <small>${product.metricLabel}</small>

                <h4>${product.metric}</h4>

                <small>${product.secondary}</small>

            </div>

            <div class="product-bottom">

                <span class="status ${statusClass}">
                    ${product.status}
                </span>

                <button class="view-btn"
                    onclick="viewDetails(${product.id})">

                    View Details
                    <i class="bi bi-arrow-right"></i>

                </button>

            </div>
        `;

        productContainer.appendChild(card);

    });

}

const statusFilter = document.getElementById("statusFilter");

function filterProducts() {

    const searchValue = searchInput.value.toLowerCase().trim();
    const selectedStatus = statusFilter.value;

    const filteredProducts = products.filter(product => {

        const matchesCategory =
            selectedCategory === "all" ||
            product.category === selectedCategory;

        const matchesStatus =
            selectedStatus === "all" ||
            product.status.toLowerCase() === selectedStatus;

        const matchesSearch =
            product.name.toLowerCase().includes(searchValue) ||
            product.categoryName.toLowerCase().includes(searchValue) ||
            product.status.toLowerCase().includes(searchValue) ||
            product.metricLabel.toLowerCase().includes(searchValue) ||
            product.metric.toLowerCase().includes(searchValue) ||
            product.secondary.toLowerCase().includes(searchValue);

        return matchesCategory && matchesStatus && matchesSearch;

    });

    displayProducts(filteredProducts);
}

statusFilter.addEventListener("change", filterProducts);

filterButtons.forEach(button => {

    button.addEventListener("click", () => {

        filterButtons.forEach(btn =>
            btn.classList.remove("active")
        );

        button.classList.add("active");

        selectedCategory = button.dataset.category;

        filterProducts();

    });

});

searchInput.addEventListener("input", filterProducts);

function viewDetails(id) {

    const product = products.find(item => item.id === id);

    const modalContent = document.getElementById("modalContent");

    modalContent.innerHTML = `

        <h5>${product.name}</h5>

        <hr>

        <p><strong>Category:</strong> ${product.categoryName}</p>

        <p><strong>Status:</strong> ${product.status}</p>

        <p><strong>${product.metricLabel}:</strong>
            ${product.metric}
        </p>

        <p><strong>Additional Information:</strong>
            ${product.secondary}
        </p>

        <p class="text-muted">
            This is a sample banking product.
        </p>

    `;

    const modal = new bootstrap.Modal(
        document.getElementById("productModal")
    );

    modal.show();

}

function showApplyMessage() {

    alert(
        "Thank you for your interest! Product application functionality can be integrated here."
    );

}

document.getElementById("totalProducts").textContent =
    products.length;

document.getElementById("activeProducts").textContent =
    products.filter(p => p.status === "Active").length;

document.getElementById("pendingProducts").textContent =
    products.filter(p => p.status === "Pending").length;

displayProducts(products);
function saveSettings() {
    const notifications = document.getElementById("notifications").checked;
    const statements = document.getElementById("statements").checked;

    alert("Changes saved successfully!");

    const settingsModal = bootstrap.Modal.getInstance(
        document.getElementById("settingsModal")
    );

    settingsModal.hide();
}
const applicationForm = document.getElementById("applicationForm");

applicationForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const name = document.getElementById("appName").value;
    const email = document.getElementById("appEmail").value;
    const phone = document.getElementById("appPhone").value;
    const product = document.getElementById("appProduct").value;
    const details = document.getElementById("appDetails").value;

    document.getElementById("applicationForm").style.display = "none";
    document.getElementById("applicationSuccess").style.display = "block";

    console.log({
        name,
        email,
        phone,
        product,
        details
    });
});

document.getElementById("applyModal").addEventListener("hidden.bs.modal", function() {
    applicationForm.reset();
    applicationForm.style.display = "block";
    document.getElementById("applicationSuccess").style.display = "none";
});
const notificationBtn = document.getElementById("notificationBtn");
const notificationPopup = document.getElementById("notificationPopup");

notificationBtn.addEventListener("click", function(event) {
    event.stopPropagation();
    notificationPopup.classList.toggle("show");
});

document.addEventListener("click", function(event) {
    if (!notificationPopup.contains(event.target) &&
        !notificationBtn.contains(event.target)) {
        notificationPopup.classList.remove("show");
    }
});