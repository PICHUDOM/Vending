// var saleschart = document.getElementById("sales");
// var myChart2 = new Chart(saleschart, {
//     type: "bar",
//     data: {
//         labels: [
//             "Jan",
//             "Feb",
//             "Mar",
//             "Apr",
//             "May",
//             "Jun",
//             "Jul",
//             "Aug",
//             "Sep",
//             "Oct",
//             "Nov",
//             "Dec",
//         ],
//         datasets: [
//             {
//                 label: "Income",
//                 data: [
//                     "280",
//                     "300",
//                     "400",
//                     "600",
//                     "450",
//                     "400",
//                     "500",
//                     "550",
//                     "450",
//                     "650",
//                     "950",
//                     "1000",
//                 ],
//                 backgroundColor: "#0066CB",
//                 borderColor: "#0066C",
//                 borderWidth: 1,
//             },
//             {
//                 label: "Expense",
//                 data: [
//                     "200",
//                     "220",
//                     "250",
//                     "300",
//                     "280",
//                     "300",
//                     "320",
//                     "350",
//                     "300",
//                     "380",
//                     "400",
//                     "420",
//                 ],
//                 backgroundColor: "#FF6608",
//                 borderColor: "#FF6608",
//                 borderWidth: 1,
//             },
//         ],
//     },
//     options: {
//         animation: {
//             duration: 2000,
//             easing: "easeOutQuart",
//         },
//         plugins: {
//             legend: {
//                 display: true,
//                 position: "top",
//             },
//             title: {
//                 display: true,
//                 text: "Income vs Expense",
//                 position: "left",
//             },
//         },
//         scales: {
//             y: {
//                 beginAtZero: true,
//             },
//         },
//         aspectRatio: 1,
//         maintainAspectRatio: false,
//     },
// });
//Piechart
var pieChartElement = document.getElementById("pieChart");
var myPieChart;

function updatePieChart(labels, data) {
    if (myPieChart) {
        myPieChart.data.labels = labels;
        myPieChart.data.datasets[0].data = data;
        myPieChart.update();
    } else {
        myPieChart = new Chart(pieChartElement, {
            type: "pie",
            data: {
                labels: labels,
                datasets: [
                    {
                        data: data,
                        backgroundColor: [
                            "#0066CB",
                            "#FF6608",
                            "#FC1D1D",
                            "#4CAF50",
                            "#FF9800",
                        ],
                    },
                ],
            },
            options: {
                animation: {
                    duration: 2000,
                    easing: "easeOutQuart",
                },
                plugins: {
                    legend: {
                        position: "bottom",
                    },
                    title: {
                        display: true,
                        text: "Distribution of Categories",
                        position: "left",
                    },
                },
                aspectRatio: 1,
                maintainAspectRatio: false,
            },
        });
    }
}

document
    .getElementById("filterForm")
    .addEventListener("submit", function (event) {
        event.preventDefault();

        const startDate = document.getElementById("start_date").value;
        const endDate = document.getElementById("end_date").value;
        fetchData(startDate, endDate);
    });
//Top product
function fetchData(startDate, endDate) {
    fetch('/api/machine-created')
    .then((response) => response.json())
    .then((data) => {
        // Extract installation date from the response
        const defaultStartDate = data.machineCreated[0].created_at;
        const today = new Date();
        const defaultEndDate = today.toISOString().slice(0, 10);
        if (!startDate) {
            startDate = defaultStartDate;
        }
        if (!endDate) {
            endDate = defaultEndDate;
        }

        fetch(`/api/update?start_date=${startDate}&end_date=${endDate}`)
        .then((response) => response.json())
        .then((data) => {
            let html = "";
            if (data && data.data && data.data.length > 0) {
                const sortedData = data.data.sort(
                    (a, b) => a["Top Number"] - b["Top Number"]
                );

                sortedData.slice(0, 5).forEach((product, index) => {
                    const topNumber = index + 1;
                    html += `<span id="product_${index}" class="number-top" style="display: ${
                        index === 0 ? "inline" : "none"
                    };">${topNumber}<span style="font-size: 15px;">. ${
                        product["Product Name"]
                    } (${product["count same slot"]})</span></span>`;
                });
            } else {
                html = "<span>0</span>";
            }
            document.getElementById("productData").innerHTML = html;
            switchProducts();
        })
        .catch((error) => {
            console.error("Error fetching data:", error);
        });

        fetch(`/api/patient?start_date=${startDate}&end_date=${endDate}`)
        .then((response) => response.json()) // Parse response as JSON
        .then((response) => {
            const data = response.data;

            const labels = data.map((item) => item["Type Gategories"]);
            const values = data.map((item) => parseInt(item["count same slot"]));
            updatePieChart(labels, values);
        })
        .catch((error) => {
            console.error("Error fetching data:", error);
        });
    })
    .catch((error) => {
        console.error("Error fetching installation date:", error);
    });
}

function switchProducts() {
    let currentProductIndex = 0;
    const products = document.querySelectorAll(".number-top");

    setInterval(() => {
        products[currentProductIndex].style.display = "none";
        currentProductIndex = (currentProductIndex + 1) % products.length;
        products[currentProductIndex].style.display = "inline";
    }, 3000);
}

fetchData();







