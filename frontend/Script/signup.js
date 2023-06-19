let form = document.querySelector("#form");
let submit = document.getElementById("submit");
console.log(form)
//console.log("hi")
form.addEventListener("submit", (e) => {
    console.log("hiii")
    e.preventDefault();
    let name = form.names.value;
    let email = form.email.value;
    let age = form.age.value;
    let contact = form.phnum.value;
    let password = form.password.value;
    let cp = form.cp.value

    if (cp == password) {
        let obj = new reg(name, email, age, contact, password);
        console.log(obj)
        register(obj)
    } else {
        alert("Password Missmatch. Please Enter Correct Password")

    }
})

function reg(name, email, age, contact, password) {
    this.name = name,
        this.email = email,
        this.age = age,
        this.contact = contact,
        this.password = password

}


async function register(obj) {
    try {
        let res = await fetch("https://magnificent-bandanna-moth.cyclic.app/user/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(obj)
        })

        let data = await res.json();

        alert("User Registered Successfully")
    } catch (error) {
        console.log(error)
    }
}