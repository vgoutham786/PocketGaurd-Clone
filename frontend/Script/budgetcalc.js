const inc = document.getElementById("inc");
const myRange = document.getElementById("myRange");
let calc = document.getElementById("calc");
const savings = document.getElementById("savings");
const myRange1 = document.getElementById("myRange1");
const escinc = document.querySelectorAll(".escinc")
const mexp = document.getElementById("mexp")
const bal = document.getElementById("bal")
const sav = document.getElementById("sav")
let token = JSON.parse(localStorage.getItem("token"))
console.log(escinc)
let fields = ["income", "rent", "insurance", "property tax", "electricity", "gas", "water", "internet serviece", "cellphone", "subscription", "other", "home", "groceries", "auto & transport", "eating out", "entertainment", "health & medical", "personal care", "gift donation", "clothing", "education", "electronics & software", "insurance", "kids", "pet", "shopping", "sports & fitness", "travel", "credit card", "loan", "mortrage", "insurance debt", "savings"];


inc.addEventListener("keypress", () => {
    myRange.value = inc.value
    display()
    //total()
})

myRange.addEventListener("change", () => {
    inc.value = myRange.value
    display()
    //total()
})
savings.addEventListener("keypress", () => {
    myRange1.value = savings.value
    //total()
})

myRange1.addEventListener("change", () => {
    savings.value = myRange1.value
})

let val = [];
let obj = {};
//let id = "id"
calc.addEventListener("click", () => {

    val[0] = +inc.value || 0;
    obj[fields[0]] = val[0]
    for (let i = 1; i <= 31; i++) {
        val[i] = +document.getElementById(`id${i}`).value || 0;
        obj[fields[i]] = val[i]
        //val.push(`id${i}`.value)
    }
    val[32] = +savings.value || 0;
    obj[fields[32]] = val[32]
    console.log(val);
    postData(obj)
    // display()
    //document.getElementById("dummy").innerText = JSON.stringify(obj)
    console.log(obj)

    console.log(total())

})

function total() {
    let sum = 0;
    let debt = 0;
    let bills = 0;
    let budget = 0
    for (let i = 0; i < 33; i++) {
        if (i == 0) {
            sum += val[i]
        } else {
            if (i >= 1 && i <= 10) {
                bills += val[i]
            } else if (i > 10 && i < 28) {
                budget += val[i]
            } else if (i > 27 && i <= 31) {
                debt += val[i]
            }
            sum -= val[i]

        }
    }
    display()
    mexp.innerHTML = ``
    sav.innerHTML = ``
    bal.innerHTML = ``
    mexp.innerText = (bills + budget + debt) || 0;
    sav.innerText = savings.value || 0;
    bal.innerText = sum || 0
     piechart(+inc.value, bills, budget, debt, +savings.value)
    return sum
}
function display() {

    escinc.forEach((e) => {
        e.innerHTML = ``
        e.innerText = +inc.value
    })


}

getData()

async function postData(obj) {
    try {

        let res = fetch("https://budget-boost.onrender.com/bugcal/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                // 'Content-Type': 'application/x-www-form-urlencoded',
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(obj),
        });
        let reply = res.json();
        console.log(reply)
    } catch (error) {
        console.log(error)
    }
}
async function getData() {
    try {
        // let res = await fetch("https://budget-boost.onrender.com/bugcal/",{
        //     method: "GET",
        //     headers: {
        //         "Content-Type": "application/json",
        //         // 'Content-Type': 'application/x-www-form-urlencoded',
        //         "Authorization": `Bearer ${token}`
        //     }
        // });
        // let val = await res.json();
        // console.log(val)
        // let data = val.data;
        let data = null
        if (data) {
            let ans = Object.values(data);
            inc.value = ans[0];
            savings.value = ans[32]
            for (let i = 1; i <= 31; i++) {
                document.getElementById(`id${i}`).value = ans[i - 1];
                //obj[fields[i]] = val[i]
                //val.push(`id${i}`.value)
            }
        } else {
            inc.value = 0;
            savings.value = 0;
            for (let i = 1; i <= 31; i++) {
                document.getElementById(`id${i}`).value = 0;
                //obj[fields[i]] = val[i]
                //val.push(`id${i}`.value)
            }
        }
        total()

    } catch (error) {
        console.log(error)
    }

}

// Include the Chart.js library in your HTML file if you haven't already:
 

function createRadarChart(income, bills, budgets, debt, savings) {
    var ctx = document.getElementById("myChart").getContext("2d");

    var myChart = new Chart(ctx, {
        type: 'radar', // Set the chart type to 'radar' for a radar chart
        data: {
            labels: ["Income", "Bills", "Budgets", "Debt", "Savings"],
            datasets: [{
                label: 'Amount',
                data: [income, bills, budgets, debt, savings],
                backgroundColor: 'rgba(75, 192, 192, 0.2)', // Fill color
                borderColor: 'rgba(75, 192, 192, 1)', // Border color
                borderWidth: 2
            }]
        },
        options: {
            scale: {
                angleLines: {
                    display: false // Hide the lines radiating from the center
                },
                ticks: {
                    beginAtZero: true,
                    max: Math.max(income, bills, budgets, debt, savings) + 500 // Adjust the maximum scale value
                }
            }
        }
    });
}

// Call the createRadarChart function with your data
//createRadarChart(5000, 2000, 3000, 1000, 1500); // Replace these values with your actual data
// Initialize the pie chart
var ctx = document.getElementById("myChart").getContext("2d");
var myChart = new Chart(ctx, {
    type: 'pie',
    data: {
        labels: ["In my pocket", "Bills", "Budgets", "Debt", "Savings"],
        datasets: [{
            backgroundColor: [
                "#2ecc71",
                "#3498db",
                "#95a5a6",
                "#9b59b6",
                "#f1c40f",
                "#e74c3c",
                "#34495e"
            ],
            data: [0, 0, 0, 0, 0]
        }]
    }
});

function updatePieChart(income, bills, budgets, debt, savings) {
    myChart.data.datasets[0].data = [income, bills, budgets, debt, savings];
    myChart.update(); // Update the chart with new data
}

// Call the updatePieChart function with your data when needed
// updatePieChart(5000, 2000, 3000, 1000, 1500);

function piechart(i, b, bd, d, s) {
    // var cont = document.querySelector(".container");
    // cont.innerText = ``
    var ctx = document.getElementById("myChart");
    //ctx.innerHTML = ``
    var myChart = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: ["In my pocket", "Bills", "Budgets", "Debt", "Savings"],
            datasets: [{
                backgroundColor: [
                    "#2ecc71",
                    "#3498db",
                    "#95a5a6",
                    "#9b59b6",
                    "#f1c40f",
                    "#e74c3c",
                    "#34495e"
                ],
                data: [i, b, bd, d, s]
            }]
        }
    });

}

const tab_item = document.querySelectorAll(".tab_item");
const border = document.getElementById("border");
const moving_container = document.getElementById("moving_container");
const text_moving_wrapper = document.getElementById("text_moving_wrapper");

for (let i = 0; i < tab_item.length; i++) {
    tab_item[i].addEventListener("click", () => {
        border.style.transform = `translateX(${100 * i}%)`;
        moving_container.style.transform = `translateY(-${100 * i}%)`;
        text_moving_wrapper.style.transform = `translateY(-${1000 * i}%)`;
    });
}