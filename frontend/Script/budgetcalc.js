const inc = document.getElementById("inc");
const myRange = document.getElementById("myRange");
let calc = document.getElementById("calc");
const savings = document.getElementById("savings");
const myRange1 = document.getElementById("myRange1");

let fields = ["income", "rent", "insurance", "property tax", "electricity", "gas", "water", "internet serviece", "cellphone", "subscription", "other", "home", "groceries", "auto & transport", "eating out", "entertainment", "health & medical", "personal care", "gift donation", "clothing", "education", "electronics & software", "insurance", "kids", "pet", "shopping", "sports & fitness", "travel", "credit card", "loan", "mortrage", "insurance debt", "savings"];
inc.addEventListener("keypress", () => {
    myRange.value = inc.value
})

myRange.addEventListener("change", () => {
    inc.value = myRange.value
})
savings.addEventListener("keypress", () => {
    myRange1.value = inc.value
})

myRange1.addEventListener("change", () => {
    savings.value = myRange.value
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

    //document.getElementById("dummy").innerText = JSON.stringify(obj)
    console.log(obj)

    console.log(total())

})

function total() {
    let sum = 0;
    let debt = 0
    for (let i = 0; i < 33; i++) {
        if (i == 0) {
            sum += val[i]
        } else {
            sum -= val[i]
            debt += val[i]
        }
    }
    piechart(+inc.value, 3, 400, 5, +savings.value)
    return sum
}
getData()
async function getData() {
    //let res = fetch("http://localhost:8080/bugcal/");
    //let val = await res.json();
    //let data = val.data;
    let data = null
    if (data) {
        let ans = Objects.values(data);
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
    piechart(+inc.value, 3, 400, 5, +savings.value)

}


function piechart(i, b, bd, d, s) {
    var ctx = document.getElementById("myChart").getContext('2d');
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
