// Header Scroll 
let nav = document.querySelector(".navbar");
window.onscroll = function() {
    if(document.documentElement.scrollTop > 50){
        nav.classList.add("header-scrolled"); 
    }else{
        nav.classList.remove("header-scrolled");
    }
}

// nav hide  
let navBar = document.querySelectorAll(".nav-link");
let navCollapse = document.querySelector(".navbar-collapse.collapse");
navBar.forEach(function(a){
    a.addEventListener("click", function(){
        navCollapse.classList.remove("show");
    })
})

// ----------------------------------------------
// landing page start


// landing page end 


// ----------------------------------------------

// about section start 


// about section end  
// ----------------------------------------------

// donation process section start 
const stepButtons = document.querySelectorAll('.step-button');
const progress = document.querySelector('#progress');

Array.from(stepButtons).forEach((button,index) => {
    button.addEventListener('click', () => {
        progress.setAttribute('value', index * 100 /(stepButtons.length - 1) );//there are 3 buttons. 2 spaces.

        stepButtons.forEach((item, secindex)=>{
            if(index > secindex){
                item.classList.add('done');
            }
            if(index < secindex){
                item.classList.remove('done');
            }
        })
    })
})

const stepButton1 = document.getElementsByClassName('step-button')[0];
const stepButton2 = document.getElementsByClassName('step-button')[1];
const stepButton3 = document.getElementsByClassName('step-button')[2];


let card1 = document.getElementById("collapseOne");
let card2 = document.getElementById("collapseTwo");
let card3 = document.getElementById("collapseThree");

card2.parentNode.style.display= "none"
card3.parentNode.style.display= "none"

stepButton1.onclick = function (){
   stepButton1.classList.remove("collapsed")
   stepButton2.classList.add("collapsed") 
   stepButton3.classList.add("collapsed") 

   stepButton1.setAttribute("aria-expanded", "true")
   stepButton2.setAttribute("aria-expanded", "false")
   stepButton3.setAttribute("aria-expanded", "false")

   card1.classList.add("show")
   card2.classList.remove("show") 
   card3.classList.remove("show") 

    card1.parentNode.style.display = "block"
    card2.parentNode.style.display = "none"
    card3.parentNode.style.display = "none"

}
stepButton2.onclick = function (){
    stepButton2.classList.remove("collapsed")
    stepButton1.classList.add("collapsed") 
    stepButton3.classList.add("collapsed") 

    stepButton2.setAttribute("aria-expanded", "true")
    stepButton1.setAttribute("aria-expanded", "false")
    stepButton3.setAttribute("aria-expanded", "false")

    card2.classList.add("show")
    card1.classList.remove("show") 
    card3.classList.remove("show") 

    card2.parentNode.style.display = "block"
    card1.parentNode.style.display = "none"
    card3.parentNode.style.display = "none"
 
 }
 stepButton3.onclick = function (){
    stepButton3.classList.remove("collapsed")
    stepButton2.classList.add("collapsed") 
    stepButton1.classList.add("collapsed") 


    stepButton3.setAttribute("aria-expanded", "true")
    stepButton2.setAttribute("aria-expanded", "false")
    stepButton1.setAttribute("aria-expanded", "false")
 
    card3.classList.add("show")
    card1.classList.remove("show") 
    card2.classList.remove("show") 

    card3.parentNode.style.display = "block"
    card1.parentNode.style.display = "none"
    card2.parentNode.style.display = "none"
 }


// donation process section end 

// donation section start 
const mydonationbtn = document.getElementsByClassName("special-donation-button")[0];
const domlocation1 = document.getElementsByClassName("location-1")[0]
const domlocation2 = document.getElementsByClassName("location-2")[0]
const domlocation3 = document.getElementsByClassName("location-3")[0]
const special_map_collapse = document.getElementsByClassName("special-map-collapse")[0]
const myorglocations = [ ['مركز الاغاثة التركية',31.516266,34.435918],
                       ['المسجد العمري الكبير',31.504280,34.464449],
                      
                       ['مسجد الحبيب محمد',31.528397,34.453490]]

let myneworglocation = []


// ---------- map 
const key = 'JfbSbp5OOjuDEf8cVutY';
const map = new maplibregl.Map({
    container: 'map',
    style: `https://api.maptiler.com/maps/f8e63fe2-6cb8-4e10-928f-7dfad731b034/style.json?key=JfbSbp5OOjuDEf8cVutY`,
    center: [34.464449, 31.504280],
    zoom: 12
});

// for( let n = 0 ; n < myorglocations.length ; n++){

//     const place1 = new maplibregl.Marker()
//     .setLngLat([myorglocations[n][2], myorglocations[n][1]])
//     .addTo(map);
// map.on('error', function(err) {
//     throw new Error("To load the map, you must replace YOUR_MAPTILER_API_KEY_HERE first, see README");
// });

// }




maplibregl.setRTLTextPlugin(
'https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-rtl-text/v0.2.3/mapbox-gl-rtl-text.js',
null,
true // Lazy load the plugin
);






// ---------- map 




mydonationbtn.onclick = function getLocation() {
    myneworglocation = [ ]
domlocation1.textContent = ""
domlocation2.textContent = ""
domlocation3.textContent = ""
    mydonationbtn.textContent =" اعادة بحث";
    special_map_collapse.style.display= "block"
        if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
    } else {
      console.log("Geolocation is not supported by this browser.");
    }



}

  
  
  function showPosition( position ) {

    for( let i = 0 ; i< myorglocations.length ; i++ ){ 

    let userlat =  position.coords.latitude;
    let userlong =  position.coords.longitude;


    var radlat1 = Math.PI * userlat/180;
    var radlat2 = Math.PI * myorglocations[i][1]/180;

    var theta = userlong-myorglocations[i][2];

    var radtheta = Math.PI * theta/180;

    var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
    dist = Math.acos(dist);
    dist = dist * 180/Math.PI;
    dist = dist * 60 * 1.1515;
    dist = dist * 1.609344 
    const orglocationwithnouns = [dist , myorglocations[i][0] , myorglocations[i][2],myorglocations[i][1] ]
    myneworglocation.push(orglocationwithnouns);
    console.log(myneworglocation)
}



myneworglocation.sort(function(a,b){return a[0] - b[0]})



domlocation1.append(myneworglocation[0][1] + "  ويبعد عنك بمقدار " + parseFloat(myneworglocation[0][0]).toFixed(2)  + " كيلو مترا")
domlocation2.append(myneworglocation[1][1] + "  ويبعد عنك بمقدار " + parseFloat(myneworglocation[1][0]).toFixed(2)  + " كيلو مترا")
domlocation3.append(myneworglocation[2][1] + "  ويبعد عنك بمقدار " + parseFloat(myneworglocation[2][0]).toFixed(2)  + " كيلو مترا")


const favplace1 =   new maplibregl.Marker()
.setLngLat([myneworglocation[0][2], myneworglocation[0][3]])
.addTo(map);
map.on('error', function(err) {
throw new Error("To load the map, you must replace YOUR_MAPTILER_API_KEY_HERE first, see README");
});

const favplace2 =   new maplibregl.Marker()
.setLngLat([myneworglocation[1][2], myneworglocation[1][3]])
.addTo(map);
map.on('error', function(err) {
throw new Error("To load the map, you must replace YOUR_MAPTILER_API_KEY_HERE first, see README");
});


const favplace3 =   new maplibregl.Marker()
.setLngLat([myneworglocation[2][2], myneworglocation[2][3]])
.addTo(map);
map.on('error', function(err) {
throw new Error("To load the map, you must replace YOUR_MAPTILER_API_KEY_HERE first, see README");
});

}






// donation section end 


// ----------------------------------------------

// contact section start 

// contact section end 

