const contactForm = document.querySelector("#contact-form");
const submitButton = contactForm.querySelector('button[type="submit"]');
const feedback = document.querySelector("#form-feedback");

contactForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const fullName = document.querySelector("#full-name").value.trim();
  const message = document.querySelector("#message").value.trim();

  if (!fullName || !message) {
    feedback.textContent = "Please enter your name and a message.";
    return;
  }

  feedback.textContent = "Your enquiry passed validation. This is a demo form.";
  contactForm.reset();
});

contactForm.addEventListener("input", () => {
  feedback.textContent = "";
});

submitButton.disabled = false;