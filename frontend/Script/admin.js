let sideMenu=document.querySelector("aside")
let menuBtn=document.querySelector("#menu-btn")
let closeBtn=document.querySelector("#close-btn")
let themeToggler=document.querySelector(".theme-toggle")

menuBtn.addEventListener("click",()=>{
    sideMenu.style.display="block"

})
closeBtn.addEventListener("click",()=>{
    sideMenu.style.display="none"
})
themeToggler.addEventListener("click",()=>{
    document.body.classList.toggle("dark-theme-variables")
    themeToggler.querySelector("span:nth-child(1)").classList.toggle("active")
    themeToggler.querySelector("span:nth-child(2)").classList.toggle("active")
})
// =====================================    =============================================//
const totalCustomer=document.querySelector("#totalCustomer h1")



async function display(){
          try {
            const data= await fetch("http://localhost:3000/admin")
                  data=await data.json()
                  totalCustomer.innerHTML=data.count
                  console.log(data)
          } catch (error) {
               console.log(error)
          }

}
display()