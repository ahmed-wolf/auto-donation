$(document).ready(function () {
    $('#example').DataTable();
});

// -------------------
let mybutton = document.getElementById("button-addon2");

let mytextboxtext = document.getElementsByClassName("text-box");

let mytbody = document.getElementsByTagName("tbody")[0];
const toastLiveExample = document.getElementById('liveToast');




mybutton.onclick = function (){


      if (mytextboxtext[0].value !== "" && mytextboxtext[1].value !== "" && mytextboxtext[2].value !== ""){
     console.log(" success");

     let mytr = document.createElement("tr");

     let mytd1 = document.createElement("td");
     let mytd2 = document.createElement("td");
     let mytd3 = document.createElement("td");
     let myspan1 =document.createElement("span")
     let myspan2 =document.createElement("span")
     let myspan3 =document.createElement("span")

     let closebutton = document.createElement("button")
     closebutton.type= "button";
     closebutton.classList.add("btn-close");
     closebutton.ariaLabel = "Close";
     closebutton.setAttribute("data-bs-toggle", "modal"); 
     closebutton.setAttribute("data-bs-target", "#exampleModal"); 

     myspan1.innerHTML= mytextboxtext[2].value;   
     myspan2.innerHTML= mytextboxtext[1].value;   
     myspan3.innerHTML= mytextboxtext[0].value;   
         
     mytd1.classList.add("text-break");
     mytd1.classList.add("text-break");
     mytd1.classList.add("text-break");

     
     mytd1.append(myspan1);
     mytd1.prepend(closebutton);
     mytd2.append(myspan2);
     mytd3.append(myspan3);
    
     mytr.append(mytd1);
     mytr.append(mytd2);
     mytr.append(mytd3);

     mytbody.append(mytr);
    

    if (mybutton ) {
        mybutton.addEventListener('click', () => {
          const toast = new bootstrap.Toast(toastLiveExample)
      
          toast.show()
        })
      }
}

    }
 


// ------------------------------- modal area
let Changebtn = document.getElementsByClassName("modal-change2")[0];
let modal = document.getElementsByClassName("modal")[0];
let myclose_btns = document.getElementsByClassName("btn-close")



 for (const myclose_btn of myclose_btns) {
  myclose_btn.addEventListener('click', (event) => {
    event.target.parentNode.parentNode.remove();
  });
}


// ------------------------------- people-section-start
$(document).ready(function () {
  $('#nophone-table').DataTable();
});


let mybutton2 = document.getElementById("button-addon3");
const toastLiveExample2 = document.getElementById('liveToast2');
let mytbody2 = document.getElementsByTagName("tbody")[1];



mybutton2.onclick = function (){


  if (mytextboxtext[03].value !== "" && mytextboxtext[4].value !== "" && mytextboxtext[5].value !== ""){
 console.log(" success");

 let mytr = document.createElement("tr");

 let mytd1 = document.createElement("td");
 let mytd2 = document.createElement("td");
 let mytd3 = document.createElement("td");
 let myspan1 =document.createElement("span")
 let myspan2 =document.createElement("span")
 let myspan3 =document.createElement("span")

 let closebutton = document.createElement("button")
 closebutton.type= "button";
 closebutton.classList.add("btn-close");
 closebutton.ariaLabel = "Close";
 closebutton.setAttribute("data-bs-toggle", "modal"); 
 closebutton.setAttribute("data-bs-target", "#exampleModal"); 

 myspan1.innerHTML= mytextboxtext[5].value;   
 myspan2.innerHTML= mytextboxtext[4].value;   
 myspan3.innerHTML= mytextboxtext[3].value;   
     
 mytd1.classList.add("text-break");
 mytd1.classList.add("text-break");
 mytd1.classList.add("text-break");

 
 mytd1.append(myspan1);
 mytd1.prepend(closebutton);
 mytd2.append(myspan2);
 mytd3.append(myspan3);

 mytr.append(mytd1);
 mytr.append(mytd2);
 mytr.append(mytd3);

 mytbody2.append(mytr);


 if (mybutton2 ) {
  mybutton2.addEventListener('click', () => {
    const toast = new bootstrap.Toast(toastLiveExample2)

    toast.show()
  })
}
}

}
// ------------------------------- people-section-end
