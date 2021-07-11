

document.querySelector(".noidaclass").addEventListener('click',function(){
    document.querySelector("#all").style.display="none";
    document.querySelector("#connaught").style.display="none";
    document.querySelector("#rohini").style.display="none";
    document.querySelector("#shahdara").style.display="none";
    document.querySelector("#dwarka").style.display="none";
    document.querySelector("#noida").style.display="block";
    
})
document.querySelector(".rohiniclass").addEventListener('click',function(){

    document.querySelector("#all").style.display="none";
    document.querySelector("#connaught").style.display="none";
    document.querySelector("#noida").style.display="none";
    document.querySelector("#shahdara").style.display="none";
    document.querySelector("#dwarka").style.display="none";
    document.querySelector("#rohini").style.display="block";
})
document.querySelector(".connaughtclass").addEventListener('click',function(){
    document.querySelector("#all").style.display="none";
    document.querySelector("#noida").style.display="none";
    document.querySelector("#rohini").style.display="none";
    document.querySelector("#shahdara").style.display="none";
    document.querySelector("#dwarka").style.display="none";
    document.querySelector("#connaught").style.display="block";
})
document.querySelector(".shahdaraclass").addEventListener('click',function(){

    document.querySelector("#all").style.display="none";
    document.querySelector("#noida").style.display="none";
    document.querySelector("#rohini").style.display="none";
    document.querySelector("#connaught").style.display="none";
    document.querySelector("#dwarka").style.display="none";
    document.querySelector("#shahdara").style.display="block";
})
document.querySelector(".dwarkaclass").addEventListener('click',function(){

    document.querySelector("#all").style.display="none";
    document.querySelector("#noida").style.display="none";
    document.querySelector("#rohini").style.display="none";
    document.querySelector("#shahdara").style.display="none";
    document.querySelector("#connaught").style.display="none";
    document.querySelector("#dwarka").style.display="block";
})
document.querySelector(".allclass").addEventListener('click',function(){
    document.querySelector("#connaught").style.display="none";
    document.querySelector("#noida").style.display="none";
    document.querySelector("#rohini").style.display="none";
    document.querySelector("#shahdara").style.display="none";
    document.querySelector("#dwarka").style.display="none";
    document.querySelector("#all").style.display="block";
   
})
