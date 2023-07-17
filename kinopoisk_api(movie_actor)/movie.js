const API_KEY = "VTZ5WJG-VWT43SJ-M49W8YP-QNDKYTF";
const API_URL = "https://api.kinopoisk.dev";

function render_expand(el) {
  const btn = document.createElement("div");
  btn.innerHTML = `<i class="bi bi-arrows-angle-expand"></i>`;
  btn.classList.add("toggle_btn");
  btn.addEventListener("click", () => {
    el.classList.toggle("text-ellipsis");
  });
  el.append(btn);
  el.classList.add("toggle-links");
  el.classList.add("text-ellipsis");
}

function openImageWindow(src) {
  let image = new Image();
  image.src = src;
  let width = image.width;
  let height = image.height;
  window.open(src, "Image", "width=" + width + ",height=" + height);
}

function render_to_html(movie) {
  const movie_poster = document.querySelector("#movie_poster_id");
  movie_poster.setAttribute("src", movie.poster.url);

  const movie_trailer = document.querySelector("#movie_trailer");
  movie_trailer.src = movie.videos.trailers[0].url;

  const date = new Date(movie.premiere.world);
  const movie_name = document.querySelector("#movie_name");
  movie_name.innerText = `${movie.name} (${date.getFullYear()})`;

  const movie_name_en = document.querySelector("#movie_name-en");
  movie_name_en.innerText = `${
    movie.enName ? movie.enName : movie.alternativeName
  } ${movie.ageRating}+`;

  const movie_short_desc = document.querySelector("#movie_short_desc");
  movie_short_desc.innerText = `${movie.shortDescription}`;

  const movie_year = document.querySelector("#movie_year");
  movie_year.innerText = `${movie.year}`;

  const movie_genre = document.querySelector("#movie_genre");
  movie_genre.innerText = `${movie.genres.map((e) => e.name).join(", ")}`;

  const movie_country = document.querySelector("#movie_country");
  movie_country.innerText = `${movie.countries.map((c) => c.name).join(", ")}`;

  const movie_slogan = document.querySelector("#movie_slogan");
  movie_slogan.innerText = `${movie.slogan}`;

  const movie_director = document.querySelector("#movie_director");
  movie_director.innerText = `${movie.persons
    .filter((p) => p.enProfession === "director")
    .map((p) => p.name)
    .join(", ")}`;

  const movie_scenario = document.querySelector("#movie_scenario");
  movie_scenario.innerText = `${movie.persons
    .filter((p) => p.enProfession === "writer")
    .map((p) => p.name)
    .join(", ")}`;

  const movie_producer = document.querySelector("#movie_producer");
  movie_producer.innerText = `${movie.persons
    .filter((p) => p.enProfession === "producer")
    .map((p) => p.name)
    .join(", ")}`;

  const movie_operator = document.querySelector("#movie_operator");
  movie_operator.innerText = `${movie.persons
    .filter((o) => o.enProfession === "operator")
    .map((o) => o.name)
    .join(", ")}`;

  const movie_composer = document.querySelector("#movie_composer");
  movie_composer.innerText = `${movie.persons
    .filter((c) => c.enProfession === "composer")
    .map((c) => c.name)
    .join(", ")}`;

  const movie_designer = document.querySelector("#movie_designer");
  movie_designer.innerText = `${movie.persons
    .filter((d) => d.enProfession === "designer")
    .map((d) => d.name)
    .join(", ")}`;

  const movie_editor = document.querySelector("#movie_editor");
  movie_editor.innerText = `${movie.persons
    .filter((e) => e.enProfession === "editor")
    .map((e) => e.name)
    .join(", ")}`;

  const movie_budget = document.querySelector("#movie_budget");
  movie_budget.innerText =
    movie.budget.value.toLocaleString("en-US", {
      currency: "USD",
    }) +
    " " +
    movie.budget.currency;

  const movie_fees = document.querySelector("#movie_fees");
  movie_fees.innerText =
    movie.fees.world.value.toLocaleString("en-US", {
      currency: "USD",
    }) +
    " " +
    movie.fees.world.currency;

  const movie_premiere = document.querySelector("#movie_premiere");
  movie_premiere.innerText = new Date(
    movie.premiere.world
  ).toLocaleDateString();

  const movie_ageRating = document.querySelector("#movie_ageRating");
  movie_ageRating.innerText = movie.ageRating + '+';

  const movie_movieLength = document.querySelector("#movie_movieLength");
  movie_movieLength.innerText = movie.movieLength + ' мин.';

  const movie_actors = document.querySelector("#movie_actors");
  movie.persons
    .filter((p) => p.enProfession === "actor")
    .forEach((actor) => {
      let a = document.createElement("a");
      a.href = "actor_info.html";
      a.addEventListener("click", () => {
        localStorage.setItem("actor_id", actor.id);
      });
      a.innerText = actor.name;
      a.classList.add("movie_actor");
      movie_actors.append(a);
    });
  render_expand(movie_actors);

  const movie_fact = document.querySelector("#movie_fact");
  movie_fact.innerHTML = `${movie.facts.map((f) => f.value).join("")}`;
  render_expand(movie_fact);

  const movie_description = document.querySelector("#movie_description");
  movie_description.innerText = movie.description;
}

function search_movie(id) {
  fetch(`${API_URL}/v1.3/movie/${id}`, {
    method: "GET",
    headers: {
      "X-API-KEY": API_KEY,
    },
  })
    .then((res) => res.json())
    .then((response) => {
      localStorage.setItem("temp", JSON.stringify(response));
      render_to_html(response);
    })
    .catch((e) => {
      console.log("error");
    });
}

search_movie(localStorage.getItem("movie_id"));

const response = JSON.parse(localStorage.getItem("temp"));
render_to_html(response);
