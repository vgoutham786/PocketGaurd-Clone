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
    const nameRegex = /^[a-zA-Z]+$/;
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    const passwordRegex = /^.{8,}$/;

    if (!name.match(nameRegex)) {
        alert("Name should only contain alphabets.");
    } else if (!email.match(emailRegex)) {
        alert("Invalid email address.");
    } else if (isNaN(age) || age < 0) {
        alert("Invalid age.");
    } else if (isNaN(contact) || contact.length !== 10) {
        alert("Invalid phone number. It should be 10 digits.");
    } else if (!password.match(passwordRegex)) {
        alert("Password should be at least 8 characters long.");
    } else if (cp !== password) {
        alert("Password mismatch. Please enter the same password.");
    } else {
        let obj = new reg(name, email, age, contact, password);
        register(obj);
    }
});

// Rest of your code...

function reg(name, email, age, contact, password) {
    this.name = name,
        this.email = email,
        this.age = age,
        this.contact = contact,
        this.password = password

}


async function register(obj) {
    try {
        let res = await fetch("https://budget-boost.onrender.com/user/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(obj)
        })

        let data = await res.json();
        //console.log(data)
        alert(data.msg)
        if (data.msg != "user already exists!!") {
            //alert("User Registered Successfully")
            location.href = "./login.html"
        }

    } catch (error) {
        console.log(error)
    }
}