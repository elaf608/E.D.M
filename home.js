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

// Past Events carousel
const photos = document.querySelectorAll("#past-events .featured figure");
const controls = document.querySelector("#featured-controls");

if (photos.length > 1 && controls) {
  const previous = document.querySelector("#featured-prev");
  const next = document.querySelector("#featured-next");
  const count = document.querySelector("#featured-count");
  let currentPhoto = 0;

  function showPhoto(index) {
    currentPhoto = (index + photos.length) % photos.length;

    photos.forEach((photo, position) => {
      photo.hidden = position !== currentPhoto;
    });

    count.textContent = `${currentPhoto + 1} of ${photos.length}`;
  }

  previous.addEventListener("click", () => showPhoto(currentPhoto - 1));
  next.addEventListener("click", () => showPhoto(currentPhoto + 1));

  showPhoto(0);
  controls.hidden = false;
}