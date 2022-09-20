
const container = document.querySelector(".container");
const count = document.getElementById("count");
const amount = document.getElementById("amount");
const select = document.getElementById("movie");
const seats = document.querySelectorAll(".seat:not(.reserved)");

getFromLocalStorage();
calculatedTotal();

container.addEventListener("click", function (e) {
    if (e.target.classList.contains("seat") && !e.target.classList.contains("reserved")) {
        e.target.classList.toggle("selected");
        calculatedTotal();

    };
});

select.addEventListener("change", function (e) {
    calculatedTotal();
});


function calculatedTotal() {
    const selectedSeat = container.querySelectorAll(".seat.selected")

    const selectedSeatsArr = [];
    const seatsArr = [];

    selectedSeat.forEach(function (seat) {
        selectedSeatsArr.push(seat);
    });

    // spread methodu ile daha kolay yapılıyor

    seats.forEach(function (seat) {
        seatsArr.push(seat);
    });


    //[1,3,5] seçilen elemanlar kaçıncı index numaraları selectedSeatIndex içine atar
    let selectedSeatIndexs = selectedSeatsArr.map(function (seat) {
        return seatsArr.indexOf(seat);
    });

    // console.log(selectedSeatIndexs);

    let selectedSeatCount = selectedSeat.length;
    count.innerText = selectedSeatCount;
    amount.innerText = selectedSeatCount * select.value;

    saveToLocalStorage(selectedSeatIndexs);
};

function getFromLocalStorage() {
    const selectedSeats = JSON.parse(localStorage.getItem("selectedSeats"));

    if (selectedSeats != null && selectedSeats.length > 0) {
        seats.forEach(function (seat, index) {
            if (selectedSeats.indexOf(index) > -1) {
                seat.classList.add("selected");
            };
        });
    };


    const selectedMovieIndex = localStorage.getItem("selectedMovieIndex");

    if (selectedMovieIndex != null) {
        select.selectedIndex = selectedMovieIndex;
    };
};

function saveToLocalStorage(indexs) {
    localStorage.setItem("selectedSeats", JSON.stringify(indexs));
    localStorage.setItem("selectedMovieIndex", select.selectedIndex);
};




