const BASE_PRICES = {
  "bridal-shower": 1500,
  "themed-party": 1200,
  "birthday": 1000,
  "engagement": 2000,
  "henna-night": 1800,
  "baby-shower": 1300,
  "classy-event": 2500,
  "ramadan-gathering": 1600,
  "winter-outdoor": 2200
};

const PRICE_PER_GUEST = 25;

const EXTRAS_PRICES = {
  "Cake": 300,
  "Photography": 500,
  "Extra-decorations": 400
};


const form = document.querySelector("#build-form");
const typeSelect = document.querySelector("#type");
const guestsInput = document.querySelector("#number");
const dateInput = document.querySelector("#date");
const resultBox = document.querySelector("#estimate-result");


dateInput.min = new Date().toISOString().split("T")[0];

function calculateEstimate() {
  const guests = Number(guestsInput.value);
  const base = BASE_PRICES[typeSelect.value] || 0;
  const guestsCost = guests * PRICE_PER_GUEST;

  let extrasCost = 0;
  const chosenExtras = [];

  Object.keys(EXTRAS_PRICES).forEach((id) => {
    const checkbox = document.getElementById(id);
    if (checkbox && checkbox.checked) {
      extrasCost += EXTRAS_PRICES[id];
      chosenExtras.push(id.replace("-", " "));
    }
  });

  return {
    base,
    guests,
    guestsCost,
    extrasCost,
    chosenExtras,
    total: base + guestsCost + extrasCost
  };
}

function showEstimate() {
  if (!form.checkValidity()) {
    form.reportValidity();
    return;
  }

  const e = calculateEstimate();
  const typeName = typeSelect.options[typeSelect.selectedIndex].text;

  resultBox.innerHTML = `
    <h3>Your Estimate</h3>
    <ul>
      <li>${typeName} (base): AED ${e.base}</li>
      <li>${e.guests} guests × AED ${PRICE_PER_GUEST}: AED ${e.guestsCost}</li>
      <li>Extras (${e.chosenExtras.length ? e.chosenExtras.join(", ") : "none"}): AED ${e.extrasCost}</li>
    </ul>
    <p class="total">Estimated total: AED ${e.total}</p>
    <p class="note">This is an estimate only. We will confirm your final quotation.</p>
  `;
  resultBox.classList.add("visible");
}

document.querySelector("#estimate-button").addEventListener("click", showEstimate);

form.addEventListener("reset", () => {
  resultBox.innerHTML = "";
  resultBox.classList.remove("visible");
});


form.addEventListener("input", () => {
  if (resultBox.classList.contains("visible")) {
    showEstimate();
  }
});


const params = new URLSearchParams(window.location.search);
const decorChoices = params.getAll("decor");
if (decorChoices.length) {
  const note = document.querySelector("#decor-note");
  note.textContent = "Your selected décor: " + decorChoices.join(", ").replace(/-/g, " ");
}

const feedback = document.querySelector("#form-feedback");

form.addEventListener("submit", (event) => {
  event.preventDefault();

  if (!form.checkValidity()) {
    form.reportValidity();
    return;
  }

  showEstimate();
  feedback.textContent = "Thank you! Your quotation request was received. This is a demo form.";
});

form.addEventListener("reset", () => {
  feedback.textContent = "";
});


const dateFromHome = params.get("date");
if (dateFromHome) {
  dateInput.value = dateFromHome;
}