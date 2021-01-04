"use strict";
let pixabayKey = "12000491-41fc68d8c365df909e022ceb6";
const myUrl =
  "https://pixabay.com/api/?key=12000491-41fc68d8c365df909e022ceb6&q=";
window.onload = () => {
  // any code written here will be executed,after all page is loaded

  // get search input
  const searchInput = document.querySelector("#searchInput");
  // add keypress event listener
  searchInput.addEventListener("keyup", function (e) {
    if (e.key == "Enter") {
      //   console.log(searchInput.value);
      searchFunction();
    }
  });
  // get search button
  const searchBtn = document.querySelector("#searchBtn");
  // searchBtn click event
  searchBtn.addEventListener("click", searchFunction);
  let content = document.querySelector("#pictures");
  // select Color
  const selectColor = document.querySelector("#colorSelect");
  //! my searching(handler) function which i can use whenever i need
  function searchFunction() {
    //? remove old pics
    const keyWord = searchInput.value;
    console.log(selectColor.value);
    fetch(
      `${myUrl}${keyWord}${
        selectColor.value ? `&colors=+${selectColor.value}` : ""
      }`
    )
      .then((response) => response.json())
      .then((data) => {
        //! Normal way
        // for (let i = 0; i < data.totalHits; i++) {
        //   let div = document.createElement("div");
        //   div.classList.add("col-lg-3");
        //   let img = document.createElement("img");
        //   img.src = data.hits[i].largeImageURL;
        //   img.style.cssText = `max-width:100%;
        //   height:300px;
        //   padding-top:5px`;
        //   div.appendChild(img);
        //   document.querySelector("#pictures").append(div);
        // }

        //! Bootstrap way
        for (let i = 0; i < data.totalHits; i++) {
          let cards = `<div class="card col-sm-6 col-md-3 px-2 my-1">
        <img src=${data.hits[i].largeImageURL} class="card-img-top w-100 h-50" alt="..." />
        <div class="card-body">
          <h5 class="card-title"><b>${data.hits[i].user}</b></h5>
          <p class="card-text">
            Some quick example text to build on the card title and make up the
            bulk of the card's content.
            <p>
            <b>Likes:</b>${data.hits[i].likes}
            <br>
            <b>Comments:</b> ${data.hits[i].comments}
            </p>
            <p>Tags: ${data.hits[i].tags}</p>
          </p>
          <a href="#" id="openModal" class="btn btn-primary" data-toggle="modal"
          data-target=".bd-example-modal-lg" 
          onclick="showModal('${data.hits[i].largeImageURL}')">Show</a>
        </div>
        </div>`;
          content.insertAdjacentHTML("afterbegin", cards);
        }
      })
      .catch((error) => {
        console.log(error, "Data could not be gotten!");
      });
  }
};
function showModal(imgUrl) {
  document.querySelector("#largeImage").src = imgUrl;
}
