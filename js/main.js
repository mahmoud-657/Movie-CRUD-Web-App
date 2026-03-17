document.body.classList.add("bg-black", "m-5");
var movies = [];

var webTitle = document.createElement("div");
webTitle.textContent = "MOVIES LIBRARY";
webTitle.classList.add("text-white", "fw-bold", "text-center", "fs-1", "mb-4");
document.body.append(webTitle);

var inputs = document.createElement("div");
inputs.classList.add("container");
document.body.append(inputs);

var row1 = document.createElement("div");
row1.classList.add("row");

var col1 = document.createElement("div");
col1.classList.add("col", "d-flex", "gap-2", "mb-4");

var movieName = document.createElement("input");
movieName.classList.add("form-control");
movieName.placeholder = "Movie Name";

var movieDirector = document.createElement("input");
movieDirector.classList.add("form-control");
movieDirector.placeholder = "Director";

var movieType = document.createElement("input");
movieType.classList.add("form-control");
movieType.placeholder = "Type";

var movieYear = document.createElement("input");
movieYear.classList.add("form-control");
movieYear.placeholder = "Year";
movieYear.type = "number";

col1.append(movieName, movieDirector, movieType, movieYear);
row1.append(col1);
inputs.append(row1);

var row2 = document.createElement("div");
row2.classList.add("row");
var col2 = document.createElement("div");
col2.classList.add("col", "w-100", "mb-4");
var imgLabel = document.createElement("label");
imgLabel.textContent = "Movie Poster";
imgLabel.classList.add("fs-6", "text-white", "fw-semibold");

var movieImg = document.createElement("input");
movieImg.classList.add("form-control");
movieImg.type = "file";

col2.append(imgLabel, movieImg);
row2.append(col2);
inputs.append(row2);

var row3 = document.createElement("div");
row3.classList.add("row");
var col3 = document.createElement("div");
col3.classList.add("col");
var addButton = document.createElement("button");
addButton.textContent = "Add Movie";
addButton.classList.add(
  "btn",
  "btn-success",
  "fw-semibold",
  "text-white",
  "w-100",
  "mb-5",
);

col3.append(addButton);
row3.append(col3);
inputs.append(row3);

var row4 = document.createElement("div");
row4.classList.add("row");
var col4 = document.createElement("div");
col4.classList.add("col", "mb-3", "d-flex", "gap-2");

var searchInput = document.createElement("input");
searchInput.classList.add("form-control");
searchInput.placeholder = "search input...";

var searchType = document.createElement("select");
searchType.classList.add("w-50", "form-select");

var defoption = document.createElement("option");
defoption.textContent = "Search By";
defoption.value = "";
defoption.disabled = true;
defoption.selected = true;

searchType.append(defoption);

var options = ["name", "director", "type", "year"];
options.forEach(function (opt) {
  var option = document.createElement("option");
  option.value = opt.toLowerCase();
  option.textContent = opt;
  searchType.append(option);
});

var resetButton = document.createElement("button");
resetButton.textContent = "Reset";
resetButton.classList.add("btn", "btn-secondary", "w-50");

var searchButton = document.createElement("button");
searchButton.textContent = "Search";
searchButton.classList.add("btn", "btn-primary", "w-50");

col4.append(searchInput, searchType, searchButton, resetButton);
row4.append(col4);
inputs.append(row4);

var movieList = document.createElement("div");
movieList.classList.add("container");
document.body.append(movieList);

var listTitle = document.createElement("div");
listTitle.textContent = "Movies List";
listTitle.classList.add(
  "row",
  "text-white",
  "text-center",
  "fw-bold",
  "fs-2",
  "m-3",
);
movieList.append(listTitle);

var cardsRow = document.createElement("div");
cardsRow.classList.add("row", "gy-3");
movieList.append(cardsRow);

// جزء زر الااد

addButton.addEventListener("click", function () {
  if (
    movieName.value === "" ||
    movieDirector.value === "" ||
    movieType.value === "" ||
    movieYear.value === "" ||
    movieImg.files.length === 0
  ) {
    alert("please fill all fields");
    return;
  }

  //عشان الصوره تتحفظ فال لوكل ستوردج

  var reader = new FileReader();
  reader.readAsDataURL(movieImg.files[0]);

  reader.onload = function () {
    var movie = {
      name: movieName.value,
      director: movieDirector.value,
      type: movieType.value,
      year: movieYear.value,
      image: reader.result, //خلى بالك منها هنا هى ف صيغه حاجه اسمها base64  عشان تتحفظ ل لوكال
    };

    movies.push(movie);

    localStorage.setItem("movies", JSON.stringify(movies));

    displayMovies();

    //عشان نفضى ال انبوت
    movieName.value = "";
    movieDirector.value = "";
    movieType.value = "";
    movieYear.value = "";
    movieImg.value = "";
  };
});

// local storage جزء ال

var storedMovies = localStorage.getItem("movies");
if (storedMovies) {
  movies = JSON.parse(storedMovies);
  displayMovies();
}

//قايمه عشان فلتره السيرش
function displayMovies(filteredList = movies) {
  cardsRow.innerHTML = "";

  filteredList.forEach(function (movie, index) {
    var movieCol = document.createElement("div");
    movieCol.classList.add("col-12", "col-md-6", "col-lg-3");

    var moviecard = document.createElement("div");
    moviecard.classList.add(
      "card",
      "bg-dark",
      "shadow-lg",
      "text-white",
      "border-0",
      "rounded-4",
    );

    var img = document.createElement("img");
    img.src = movie.image;
    img.classList.add("card-img-top");
    img.style.height = "300px";
    img.style.objectFit = "cover";

    var body = document.createElement("div");
    body.classList.add("card-body");

    var name = document.createElement("h6");
    name.textContent = movie.name;
    name.classList.add("fw-bold", "text-white", "fs-4", "mb-3");

    var director = document.createElement("p");
    director.textContent = "Director: " + movie.director;
    director.classList.add("text-light");

    var type = document.createElement("p");
    type.textContent = "Type: " + movie.type;
    type.classList.add("text-light");

    var year = document.createElement("p");
    year.textContent ="Year :" + movie.year;
    year.classList.add("text-info", "fw-bold");

    // المسح

    var deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.classList.add("btn", "btn-danger", "fw-bold");

    deleteBtn.addEventListener("click", function () {
      movies.splice(index, 1);
      localStorage.setItem("movies", JSON.stringify(movies));
      displayMovies();
    });

    body.append(name, director, type, year, deleteBtn);
    moviecard.append(img, body);
    movieCol.append(moviecard);
    cardsRow.append(movieCol);
  });
}
// السيرش والريست
searchButton.addEventListener("click", function () {
  var selectedType = searchType.value;
  var searchText = searchInput.value.toLowerCase().trim(); // النص اللى هبحث عنه ولازم اخليه يتجاهل حاله الحروف والمسافات

  if (selectedType === "") {
    alert("choose search type first");
    return;
  }

  var filtered = movies.filter(function (movie) {
    return movie[selectedType].toLowerCase().includes(searchText);
  });
  displayMovies(filtered);
  searchInput.value = "";
  searchType.selectedIndex = 0;
});

resetButton.addEventListener("click", function () {
  searchType.selectedIndex = 0;
  searchInput.value = "";

  displayMovies();
});
