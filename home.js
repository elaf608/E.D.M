const BOOKED_DATES = [
  "2026-11-20",
  "2026-11-27",
  "2026-12-04",
  "2026-12-18",
  "2026-12-25"
];

const checkDate = document.querySelector("#check-date");
const checkButton = document.querySelector("#check-button");
const result = document.querySelector("#availability-result");


checkDate.min = new Date().toISOString().split("T")[0];

function checkAvailability() {
  const chosen = checkDate.value;

  if (!chosen) {
    result.textContent = "Please choose a date first.";
    return;
  }

  if (BOOKED_DATES.includes(chosen)) {
    result.textContent = "Sorry, this date is already booked. Please try another date.";
    return;
  }

  result.innerHTML =
    "Good news, this date is available! " +
    '<a href="build-event.html?date=' + chosen + '">Request a Quotation</a>';
}

checkButton.addEventListener("click", checkAvailability);


checkDate.addEventListener("input", () => {
  result.textContent = "";
});