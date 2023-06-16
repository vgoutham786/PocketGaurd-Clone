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
        if (i == 0 || i == 32) {
            sum += val[i]
        } else {
            sum -= val[i]
            debt += val[i]
        }
    }
    return sum
}
getData()
async function getData() {
    //let res = fetch("http://localhost:8080/bugcal/");
    //let val = await res.json();
    //let data = val.data;
    let data = null
    if (data) {

    } else {
        inc.value = 0;
        savings.value = 0;
        for (let i = 1; i <= 31; i++) {
            document.getElementById(`id${i}`).value = 0;
            //obj[fields[i]] = val[i]
            //val.push(`id${i}`.value)
        }
    }
}


