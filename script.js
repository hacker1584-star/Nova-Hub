const searchInput = document.getElementById("searchInput");
const cards = document.querySelectorAll(".tool-card");
const noResults = document.getElementById("noResults");
const toolCount = document.getElementById("toolCount");
const themeBtn = document.getElementById("themeBtn");


// SEARCH

searchInput.addEventListener("input", () => {

  const query = searchInput.value.toLowerCase().trim();

  let visible = 0;

  cards.forEach(card => {

    const name = card.dataset.name;

    if (name.includes(query)) {

      card.style.display = "";

      visible++;

    } else {

      card.style.display = "none";

    }

  });

  toolCount.textContent = `${visible} tool${visible === 1 ? "" : "s"}`;

  noResults.style.display =
    visible === 0 ? "block" : "none";

});


// DARK / LIGHT MODE

themeBtn.addEventListener("click", () => {

  document.body.classList.toggle("light");

  if (document.body.classList.contains("light")) {

    themeBtn.textContent = "☾";

  } else {

    themeBtn.textContent = "☀";

  }

});
function openCalculator() {
  alert("Calculator coming next 🚀");
}
