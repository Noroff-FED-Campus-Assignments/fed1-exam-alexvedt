const formEl = document.querySelector("#formField");
const nameEl = document.querySelector("#nameField");
const emailEl = document.querySelector("#emailField");
const subjectEl = document.querySelector("#subjectField");
const addressEl = document.querySelector("#addressField");
const messageEl = document.querySelector("#messageField");
const buttonEl = document.querySelector("#submitButton");
const successMessageEl = document.querySelector("#successMessage");

const disallowedCharacters = {
  name: /[/[\]{}()*+?^$|]/,
  email: /[/[\]{}()*+?^$|]/,
  subject: /[/[\]{}()*+?^$|]/,
  address: /[/[\]{}()*+?^$|]/,
};

const regexName = /^[a-zA-Z\s]{2,}$/;
const regexEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const regexSubject = /^[a-zA-Z0-9\s]{10,}$/;
const regexAddress = /^[a-zA-Z0-9\s]{25,}$/;

const errorName = document.querySelector("#error-name");
const errorEmail = document.querySelector("#error-email");
const errorSubject = document.querySelector("#error-subject");
const errorAddress = document.querySelector("#error-address");

let nameElIsValid = false;
let emailElIsValid = false;
let subjectElIsValid = false;
let addressElIsValid = false;

function validateName() {
  if (
    regexName.test(nameEl.value) &&
    !disallowedCharacters.name.test(nameEl.value)
  ) {
    nameEl.classList.add("is-valid");
    nameEl.classList.remove("is-invalid");

    errorName.innerHTML = "";

    nameElIsValid = true;
  } else {
    nameEl.classList.remove("is-valid");
    nameEl.classList.add("is-invalid");
    nameEl.classList.remove("valid-input");
    nameElIsValid = false;

    const invalidCharacter = nameEl.value.match(disallowedCharacters.name);
    const errorMessage = invalidCharacter
      ? `Your name must be more than two letters and only characters A-Z. The character "${invalidCharacter[0]}" is not allowed.`
      : `Your name must be more than two letters and only characters A-Z.`;

    errorName.innerHTML = `<p class="errormessage">${errorMessage}</p>`;
  }

  updateButtonState();
}

function validateEmail() {
  if (
    regexEmail.test(emailEl.value) &&
    !disallowedCharacters.email.test(emailEl.value)
  ) {
    emailEl.classList.add("is-valid");
    emailEl.classList.remove("is-invalid");
    emailElIsValid = true;
    errorEmail.innerHTML = "";
  } else {
    emailEl.classList.add("is-invalid");
    emailEl.classList.remove("is-valid");

    emailElIsValid = false;

    const invalidCharacter = emailEl.value.match(disallowedCharacters.email);
    const errorMessage = invalidCharacter
      ? `Please enter a correct email. The character "${invalidCharacter[0]}" is not allowed.`
      : `Please enter a correct email.`;

    errorEmail.innerHTML = `<p class="errormessage">${errorMessage}</p>`;
  }

  updateButtonState();
}

function validateSubject() {
  if (
    regexSubject.test(subjectEl.value) &&
    !disallowedCharacters.subject.test(subjectEl.value)
  ) {
    subjectEl.classList.add("is-valid");
    subjectEl.classList.remove("is-invalid");
    subjectElIsValid = true;
    errorSubject.innerHTML = "";
  } else {
    subjectEl.classList.add("is-invalid");
    subjectEl.classList.remove("is-valid");
    subjectElIsValid = false;

    const invalidCharacter = subjectEl.value.match(
      disallowedCharacters.subject
    );
    const errorMessage = invalidCharacter
      ? `Subject needs to be a minimum of 10 characters. The character "${invalidCharacter[0]}" is not allowed.`
      : `Subject needs to be a minimum of 10 characters.`;

    errorSubject.innerHTML = `<p class="errormessage">${errorMessage}</p>`;
  }

  updateButtonState();
}

function validateAddress() {
  if (
    regexAddress.test(addressEl.value) &&
    !disallowedCharacters.address.test(addressEl.value)
  ) {
    addressEl.classList.add("is-valid");
    addressEl.classList.remove("is-invalid");
    addressElIsValid = true;
    errorAddress.innerHTML = "";
  } else {
    addressEl.classList.add("is-invalid");
    addressElIsValid = false;

    const invalidCharacter = addressEl.value.match(
      disallowedCharacters.address
    );
    const errorMessage = invalidCharacter
      ? `Address needs to be a minimum of 25 characters. The character "${invalidCharacter[0]}" is not allowed.`
      : `Address needs to be a minimum of 25 characters.`;

    errorAddress.innerHTML = `<p class="errormessage">${errorMessage}</p>`;
  }

  updateButtonState();
}

function updateButtonState() {
  if (
    !nameElIsValid ||
    !emailElIsValid ||
    !subjectElIsValid ||
    !addressElIsValid ||
    messageEl.value.trim().length < 2
  ) {
    buttonEl.disabled = true;
    buttonEl.textContent = "Fill out form";
  } else {
    buttonEl.disabled = false;
    buttonEl.textContent = "Submit";
  }
}

function submitForm() {
  buttonEl.textContent = "Submitting...";
  buttonEl.classList.add("submitting");

  setTimeout(() => {
    formEl.style.display = "none";
    successMessageEl.textContent = "Form submitted successfully!";
    successMessageEl.classList.add("show");
  }, 2000);
}

nameEl.addEventListener("keyup", validateName);
emailEl.addEventListener("keyup", validateEmail);
subjectEl.addEventListener("keyup", validateSubject);
addressEl.addEventListener("keyup", validateAddress);
messageEl.addEventListener("keyup", updateButtonState);

formEl.addEventListener("submit", (event) => {
  event.preventDefault();

  if (buttonEl.disabled) {
    alert("Please fill out the form correctly");
  } else {
    submitForm();
  }
});
