const API_KEY = "M29QGWD-MNW4Z1W-GMSVS3N-ZSMEEAF";
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

function render_to_html(actor) {
  const actor_poster = document.querySelector("#actor_poster_id");
  actor_poster.setAttribute("src", actor.photo);

  const actor_name = document.querySelector("#actor_name");
  actor_name.innerText = `${actor.name}`;

  const actor_enname = document.querySelector("#actor_enname");
  actor_enname.innerText = `${actor.enName}`;

  const actor_career = document.querySelector("#actor_career");
  actor_career.innerText = actor.profession.map((p) => p.value).join(", ");

  const actor_sex = document.querySelector("#actor_sex");
  actor_sex.innerText = `${actor.sex}`;

  const actor_height = document.querySelector("#actor_height");
  actor_height.innerText = `${actor.growth} см`;

  const actor_birthday = document.querySelector("#actor_birthday");
  actor_birthday.innerText = `${new Date(actor.birthday).toLocaleDateString()}`;

  const actor_birthday_place = document.querySelector("#actor_birthday_place");
  actor_birthday_place.innerHTML = `${actor.birthPlace
    .map((p) => p.value)
    .join(", &nbsp;")}`;

  const actor_deathday = document.querySelector("#actor_deathday");
  if (actor.death) {
    actor_deathday.innerText = new Date(actor.death).toLocaleDateString();
  } else {
    actor_deathday.parentElement.style.display = "none";
  }

  const actor_deathday_place = document.querySelector("#actor_deathday_place");
  if (actor.deathPlace.length) {
    actor_deathday_place.innerText = actor.deathPlace
      .map((p) => p.value)
      .join(", ");
  } else {
    actor_deathday_place.parentElement.style.display = "none";
  }

  const actor_count_awards = document.querySelector("#actor_count_awards");
  if (actor.countAwards) {
    actor_count_awards.innerText = actor.countAwards;
  } else {
    actor_count_awards.parentElement.style.display = "none";
  }

  const actor_facts = document.querySelector("#actor_facts");
  actor_facts.innerHTML = `${actor.facts.map((f) => f.value).join(", ")}`;
  render_expand(actor_facts);

  const actor_movies = document.querySelector("#actor_movies");
  actor_movies.innerHTML = `${actor.movies
    .sort((m1, m2) => m1.rating >= m2.rating)
    .slice(0, 10)
    .map((m) => (m.name ? m.name : m.alternativeName))
    .join(", ")}`;
  render_expand(actor_movies);
}

function search_actor(id) {
  fetch(`${API_URL}/v1/person/${id}`, {
    method: "GET",
    headers: {
      "X-API-key": API_KEY,
      accept: "application/json",
    },
  })
    .then((res) => res.json())
    .then((response) => {
      console.log("success");
      console.log(response);
      localStorage.setItem("temp", JSON.stringify(response));
      render_to_html(response);
    })
    .catch((e) => {
      console.log("error");
    });
}

search_actor(localStorage.getItem("actor_id"));

const response = JSON.parse(localStorage.getItem("temp"));
render_to_html(response);
