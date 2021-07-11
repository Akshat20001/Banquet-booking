

document.querySelector(".thaneclass").addEventListener('click',function(){
    document.querySelector("#all").style.display="none";
    document.querySelector("#navi").style.display="none";
    document.querySelector("#thane").style.display="block";
    
})
document.querySelector(".naviclass").addEventListener('click',function(){

    document.querySelector("#all").style.display="none";
    document.querySelector("#navi").style.display="block";
    document.querySelector("#thane").style.display="none";
})
document.querySelector(".allclass").addEventListener('click',function(){

    document.querySelector("#all").style.display="block";
    document.querySelector("#navi").style.display="none";
    document.querySelector("#thane").style.display="none";
})