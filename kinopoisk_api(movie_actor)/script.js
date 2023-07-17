const API_KEY = "QW1D0VB-ESW49MR-QRNWZQ4-C6VN7NE";
const API_URL = "https://api.kinopoisk.dev";

const MOVIE_CONTAINER = document.querySelector("#movies");
const SEARCH_FORM = document.querySelector("#search__form");

function render_to_html(movie) {
  //создание html элементов начало
  let movie__block = document.createElement("div");
  movie__block.classList.add("movie");

  let movie__img = document.createElement("div");
  movie__img.classList.add("movie__img");

  let movie__poster = document.createElement("img");
  movie__poster.classList.add("movie__poster");

  let movie__name = document.createElement("h1");
  movie__name.classList.add("movie__name");

  let movie__enname = document.createElement("h3");
  movie__enname.classList.add("movie__enname");

  let actor_block = document.createElement("div");
  actor_block.classList.add("actor");

  //задаем значения для html элементов - начало
  movie__poster.setAttribute("src", movie.poster.url);
  movie__name.innerText = movie.name;

  movie__enname.innerText = movie.enName ? movie.enName : movie.alternativeName;
  //задаем значения для html элементов - конец

  movie__block.onclick = () => {
    localStorage.setItem("movie_id", movie.id);
    window.location.href = "movie_info.html";
  };

  actor_block.onclick = () => {
    localStorage.setItem("actor_id", actor.id);
    window.location.href = "actor_info.html";
  };

  //добавляем созданные html элементы в DOM
  movie__img.append(movie__poster);
  movie__block.append(movie__img);
  movie__block.append(movie__name);
  movie__block.append(movie__enname);
  MOVIE_CONTAINER.append(movie__block);
}

function load_movies() {
  fetch(`${API_URL}/v1.3/movie`, {
    method: "GET",
    headers: {
      "X-API-KEY": API_KEY,
    },
  })
    .then((res) => res.json())
    .then((response) => {
      console.log("success");
      console.log(response);
      localStorage.setItem("temp_movies", JSON.stringify(response));
      response.docs.forEach((movie) => {
        render_to_html(movie);
      });
    })
    .catch((e) => {
      console.log("error");
    });
}

function search_movie(search) {
  fetch(`${API_URL}/v1.3/movie?name=${search}`, {
    method: "GET",
    headers: {
      "X-API-KEY": API_KEY,
    },
  })
    .then((res) => res.json())
    .then((response) => {
      MOVIE_CONTAINER.innerHTML = "";
      response.docs.forEach((movie) => {
        render_to_html(movie);
      });
    })
    .catch((e) => {
      console.log("error");
    });
}

SEARCH_FORM.addEventListener("submit", (event) => {
  event.preventDefault();
  search_movie(SEARCH_FORM.query.value);
});

load_movies();

const response = JSON.parse(localStorage.getItem("temp_movies"));
response.docs.forEach((movie) => {
  render_to_html(movie);
});
