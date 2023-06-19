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
// =================================================== other functionality=================================///
const totalCustomer=document.querySelector("#totalCustomer h1")
const bodyData=document.getElementById("bodyData")
const bodyarray=document.getElementsByClassName("delete")


async function display(){
          try {
            let data= await fetch("https://magnificent-bandanna-moth.cyclic.app/admin")
                  data=await data.json()
                  totalCustomer.innerHTML=data.count-1
                  console.log(data)
                  addData(data.data)
                  deleteUser(bodyarray)
          } catch (error) {
               console.log(error)
          }

}
display()

function addData(arr){
    let userData=arr.map(el=>{
        if(el.role==="user"){
            return data(el.time,el.email,el.name,el.contact,el.active,el._id)
        }
    })
   
    bodyData.innerHTML=userData.join("")
    console.log(bodyData)
    
}
function data(time,email,name,contact,active,_id){
    let Fulldata=new Date(time)
    let date=Fulldata.getDate()
    let month=Fulldata.getMonth()
    let year=Fulldata.getFullYear()
    let hours=Fulldata.getHours()
    let second=Fulldata.getSeconds()
    let dateString=date+"/"+month+"/"+year+", "+(hours>12?`${hours-12}:${second}pm`:`${hours}:${second}am`)
    let status=active?`success delete`:"warning delete"
    let obj=`<tr>
    <td>${email}</td>
    <td>${name}</td>
    <td>${dateString}</td>
    <td>${contact}</td>
    <td class="delete" style="color:${active?"#41f1b6":"#ffbb55"}" data-id=${_id}>${active?"Active":"Not Active"}</td>
  </tr>`
  return obj
}

function deleteUser(array){
      for(let i=0;i<array.length;i++){
        array[i].addEventListener("click",(el)=>{
            const dataConfirm=confirm("Are you sure you want to delete")
            if(dataConfirm){
                deletefetch(array[i].getAttribute("data-id"))
            }
        })
      }
}

async function deletefetch(deleteID){
    try {
           let data= await fetch(`https://magnificent-bandanna-moth.cyclic.app/user/delete/${deleteID}`,{
            method:"DELETE"
           })
           data= await data.json()
           alert("User Deleted Successfully")
           location.reload()
       } catch (error) {
        console.log(error)
       }
}

