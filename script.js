const movieSelect =document.getElementById("movie");
const count = document.getElementById("count");
const total =document.getElementById("total");
const film =document.getElementById("film");
const container =document.querySelector(".container");
const notOccupiedSeats = document.querySelectorAll(".row .seat:not(.occupied)");
let price = movieSelect.options[movieSelect.selectedIndex].value;

window.addEventListener("load",()=>{
    
    getLocal();
    let price = movieSelect.options[movieSelect.selectedIndex].value;//movienin indexnumarası ile seçilen optionun valuesi yakalandı
    
    resultInfo(price);
});
const getLocal=()=>{
    const selectedFilmNameIndexs = JSON.parse(localStorage.getItem("selectedMovieName"));
    movieSelect.selectedIndex = selectedFilmNameIndexs;
    const getLocalSeat=JSON.parse(localStorage.getItem("selectedSeat"));
    console.log(getLocalSeat);
     if(getLocalSeat.length>0) {
         notOccupiedSeats.forEach((seat,index)=>{
             if(getLocalSeat.indexOf(index)>-1){
                 seat.classList.add("selected");
             }
         })
     }
}
movieSelect.addEventListener("change" ,e =>{
    let price = movieSelect.options[movieSelect.selectedIndex].value;
    let filmName =movieSelect.options[movieSelect.selectedIndex].innerText.split(" (")[0];
    console.log(filmName);
    resultInfo(price,filmName);
console.log(price);

});
const resultInfo = (price)=>{
   localStorage.setItem("selectedMovieName", JSON.stringify(movieSelect.selectedIndex)); //seçili movienin index numaradı selectedIndex ile yakalandı local storageye set edildi
   let filmName =movieSelect.options[movieSelect.selectedIndex].innerText.split(" (")[0];
   const selectedSeat =document.querySelectorAll(".row .seat.selected");
//   console.log([...selectedSeat]);
    const local= [...selectedSeat].map((seat)=>[...notOccupiedSeats].indexOf(seat));
    localStorage.setItem("selectedSeat",JSON.stringify(local));
    film.innerText=filmName;
    total.innerText= price*selectedSeat.length;
    count.innerText= selectedSeat.length;


}

container.addEventListener("click", e=>{
    let price = movieSelect.options[movieSelect.selectedIndex].value;
    if(!e.target.classList.contains("selected") && !e.target.classList.contains("occupied")&& e.target.classList.contains("seat")){
        e.target.classList.add("selected");
        
        // count.innerText=counter;
    }
    else if(!e.target.classList.contains("occupied")&& e.target.classList.contains("seat")){
        e.target.classList.remove("selected");
        
        // count.innerText=counter;
    }
    
    
    resultInfo(price);


});