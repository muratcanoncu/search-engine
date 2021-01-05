"use strict";
const myUrl =
  "https://pixabay.com/api/?key=12000491-41fc68d8c365df909e022ceb6&q=";
window.onload = () => {
  // any code written here will be executed,after all page is loaded
  // get search input
  const searchInput = document.querySelector("#searchInput");
  let pageNumberInput = document.querySelector("#pageNumInp");
  let previousButton = document.querySelector(".previous");

  // add keypress event listener
  searchInput.addEventListener("keyup", function (e) {
    if (e.key == "Enter") {
      pageNumberInput.value = 1;
      previousButton.classList.add("disabled");
      searchFunction();
    }
  });

  // clear searchInput content
  searchInput.addEventListener("focus", function () {
    searchInput.value = "";
  });

  // get search button
  const searchBtn = document.querySelector("#searchBtn");
  // searchBtn click event
  searchBtn.addEventListener("click", function () {
    pageNumberInput.value = 1;
    previousButton.classList.add("disabled");
    searchFunction();
  });

  let content = document.querySelector("#pictures");

  //! Fetch parts

  // select Color
  const selectColor = document.querySelector("#colorSelect");
  selectColor.addEventListener("change", searchFunction);

  // select category
  let selectCategory = document.querySelector("#categorySelect");
  selectCategory.addEventListener("change", searchFunction);

  // how many result
  let results = document.querySelector("#perPage");
  results.addEventListener("change", searchFunction);

  // pagination
  // let pageNumberInput = document.querySelector("#pageNumInp");
  pageNumberInput.addEventListener("keyup", function (e) {
    if (e.keyCode === 13) {
      searchFunction();
    }
  });

  // pagination Next
  let nextButton = document.querySelector(".next");
  nextButton.addEventListener("click", function () {
    if (!nextButton.classList.contains("disabled")) {
      pageNumberInput.value = Number(pageNumberInput.value) + 1;
      previousButton.classList.remove("disabled");
      searchFunction();
    }
  });
  // Pagination Previous

  previousButton.addEventListener("click", function () {
    if (Number(pageNumberInput.value) > 1) {
      pageNumberInput.value = Number(pageNumberInput.value) - 1;
      searchFunction();
      if (Number(pageNumberInput.value) == 1) {
        previousButton.classList.add("disabled");
      }
    }
  });

  pageNumberInput.addEventListener("change", searchFunction);
  // hide pagination
  let paginationNav = document.querySelector("nav");
  paginationNav.classList.add("d-none");
  //! Searching(handler) function which i can use whenever i need
  function searchFunction() {
    //? remove old pics
    const keyWord = searchInput.value;
    fetch(
      `${myUrl}${keyWord}
       ${selectColor.value ? `&colors=+${selectColor.value}` : ""}
       ${selectCategory.value ? `&category=+${selectCategory.value}` : ""}
       ${results.value ? `&per_page=+${results.value}` : ""}
       ${pageNumberInput.value ? `&page=+${pageNumberInput.value}` : ""}`
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

        nextButton.classList.remove("disabled");
        // show/hide pagination buttons
        if (data.total > Number(results.value)) {
          paginationNav.classList.remove("d-none");
        } else {
          paginationNav.classList.add("d-none");
        }
        // disable next button when no need
        if (
          Math.ceil(data.total / Number(results.value)) == pageNumberInput.value
        ) {
          nextButton.classList.add("disabled");
          nextButton.disabled = true;
        } else {
          nextButton.classList.remove("disabled");
          nextButton.disabled = false;
        }
        //! Bootstrap way
        for (let i = 0; i < data.totalHits; i++) {
          let cards = `<div class="card col-sm-6 col-md-3 px-2 my-1 py-1">
        <img src=${data.hits[i].previewURL} class="card-img-top w-100 h-50" alt="..." />
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
