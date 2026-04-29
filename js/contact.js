const form = document.getElementById("contactForm");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const messageInput = document.getElementById("message");
const charCounter = document.getElementById("charCounter");
const successMsg = document.getElementById("successMsg");

const nameError = document.getElementById("nameError");
const emailError = document.getElementById("emailError");
const messageError = document.getElementById("messageError");

const MAX_CHARS = 300;

messageInput.addEventListener("input", () => {
  const remaining = MAX_CHARS - messageInput.value.length;
  charCounter.textContent = `${remaining} characters remaining`;
  charCounter.style.color = remaining < 20 ? "#e53e3e" : "";
});

function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function clearErrors() {
  nameError.textContent = "";
  emailError.textContent = "";
  messageError.textContent = "";
  successMsg.textContent = "";
}

function validate() {
  let valid = true;

  if (nameInput.value.trim() === "") {
    nameError.textContent = "Name is required.";
    valid = false;
  }

  if (emailInput.value.trim() === "") {
    emailError.textContent = "Email is required.";
    valid = false;
  } else if (!validateEmail(emailInput.value.trim())) {
    emailError.textContent = "Please enter a valid email.";
    valid = false;
  }

  if (messageInput.value.trim() === "") {
    messageError.textContent = "Message is required.";
    valid = false;
  }

  return valid;
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  clearErrors();

  if (!validate()) return;

  console.log({
    name: nameInput.value.trim(),
    email: emailInput.value.trim(),
    message: messageInput.value.trim(),
  });

  successMsg.textContent = "Your message has been sent successfully!";
  form.reset();
  charCounter.textContent = `${MAX_CHARS} characters remaining`;
});