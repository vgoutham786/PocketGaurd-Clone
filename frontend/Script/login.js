let form = document.querySelector("#form");
let submit = document.getElementById("submit");


form.addEventListener("submit", (e) => {
    e.preventDefault();

    let email = form.email.value;

    let password = form.password.value;
    if (email && password) {
        let obj = new log(email, password);
        console.log(obj)
        login(obj)
    } else {
        alert("Please fill all the details")
    }


})

function log(email, password) {
    this.email = email,
        this.password = password

}


async function login(obj) {
    try {
        let res = await fetch("https://budget-boost.onrender.com/user/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(obj)
        })

        let data = await res.json();
        console.log(data)
        if (data.msg != "Invalid password" && data.msg != "Invalid Credentials") {
            let token = data.token;
            localStorage.setItem("token", JSON.stringify(token))
            alert("User Login Successfull");
            if (data.role == "admin") {
                location.replace("admin.html")
            } else {
                location.replace("index.html")
            }

        } else {
            alert("Invalid Credentials")
        }

    } catch (error) {
        console.log(error)
    }
}