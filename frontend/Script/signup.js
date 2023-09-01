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
    
    if(name&&email&&age&&contact&&password&&cp){
        if (cp == password) {
            let obj = new reg(name, email, age, contact, password);
            console.log(obj)
            register(obj)
        } else {
            alert("Password Missmatch. Please Enter Correct Password")
    
        }
    }else{
        alert("Please fill all the details")
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
        if(data.msg!="user already exists!!"){
//alert("User Registered Successfully")
        location.href="./login.html"
        }
        
    } catch (error) {
        console.log(error)
    }
}