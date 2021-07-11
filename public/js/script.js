
document.querySelector(".readmore").addEventListener('click',function(){
    document.querySelector("#readless").style.display="none"; 
    document.querySelector("#readmore").style.display="flex";
})
document.querySelector(".readless").addEventListener('click',function(){
    document.querySelector("#readless").style.display="flex"; 
    document.querySelector("#readmore").style.display="none";
})
document.querySelector(".veg").addEventListener('click',function(){

    document.querySelector(".plates").innerHTML=document.querySelector("#guests").value*3000;
    document.querySelector(".guestsno").innerHTML=document.querySelector("#guests").value;
       console.log(document.getElementById('guests').value*3000)+60000;
    document.querySelector(".pricess").style.display="block";
    document.querySelector(".bookform").style.display="none";
  document.querySelector(".totalno").innerHTML=(document.getElementById('guests').value*3000)+60000;

  document.querySelector('#amount').value=(document.getElementById('guests').value*3000)+60000;


})

document.querySelector(".nonveg").addEventListener('click',function(){


    document.querySelector(".plates").innerHTML=document.querySelector("#guests").value*3600;

    document.querySelector(".guestsno").innerHTML=document.querySelector("#guests").value;
       console.log(document.getElementById('guests').value*3600)+60000;
    document.querySelector(".pricess").style.display="block";
    document.querySelector(".bookform").style.display="none";
 document.querySelector(".totalno").innerHTML=(document.getElementById('guests').value*3600)+60000;
 document.querySelector('#amount').value=(document.getElementById('guests').value*3600)+60000;


})

document.querySelector(".cancelbtn").addEventListener('click',function(){
    document.querySelector(".pricess").style.display="none";
    document.querySelector(".bookform").style.display="none";
})
document.querySelector('#booking').addEventListener('click',function(){
document.querySelector('.bookform').style.display="flex";
document.querySelector(".pricess").style.display="none";
document.querySelector('#bookguest').value = document.querySelector('#guests').value;

document.querySelector('#banq').value;
})


var today = new Date();
var dd = today.getDate();
var mm = today.getMonth()+1; 
var yyyy = today.getFullYear();
if(dd<10){
  dd='0'+dd
} 
if(mm<10){
  mm='0'+mm
} 

today = yyyy+'-'+mm+'-'+dd;
document.getElementById("dateseven").setAttribute("min", today);