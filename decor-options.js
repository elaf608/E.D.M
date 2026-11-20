const decorCheckboxes = document.querySelectorAll('input[name="decor"]');
const selectedList = document.querySelector("#selected-decor-list");
const decorCount = document.querySelector("#decor-count");

function updateSelectedDecor() {
  const selectedDecor = [];

  decorCheckboxes.forEach((checkbox) => {
    if (checkbox.checked) {
      const card = checkbox.closest(".decor-card");
      selectedDecor.push(card.querySelector("h2").textContent);
    }
  });

  selectedList.replaceChildren();

  selectedDecor.forEach((decorName) => {
    const item = document.createElement("li");
    item.textContent = decorName;
    selectedList.append(item);
  });

  decorCount.textContent =
    `${selectedDecor.length} options selected`;
}

decorCheckboxes.forEach((checkbox) => {
  checkbox.addEventListener("change", updateSelectedDecor);
});

updateSelectedDecor();