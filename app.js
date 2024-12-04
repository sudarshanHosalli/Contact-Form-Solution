const checkBoxes = document.querySelectorAll(".single-checkbox");
const checkboxContainers = document.querySelectorAll(".checkbox-container");
const customCheckbox = document.querySelectorAll(".custom-checkbox");
const customCheckboxDot = document.querySelectorAll(".dot");
const agreeCheckbox = document.querySelector(".agree-checkbox");
const agreeImg = document.querySelector(".check");
const agreeCustomCheckbox = document.querySelector(".agree-custom-checkbox");
const inputs = document.querySelectorAll(".input");
const inputsForm = document.querySelectorAll(".form-row");
const messageContainer = document.querySelector(".message-container");
const firstName = document.querySelector(".firstName");
const lastName = document.querySelector(".lastName");
const email = document.querySelector(".email");
const checkboxGroup = document.querySelector(".checkbox-group");
const submitButton = document.querySelector(".submit-button");
const message = document.querySelector(".message");
const consentCheckbox = document.querySelector(".agree-checkbox");
const agreeCheckboxContainer = document.querySelector(
  ".agree-checkbox-container"
);
const modalContainer = document.querySelector(".modal-container");
const generalEnquiry = document.querySelector("#generalEnquiry");
const supportRequest = document.querySelector("#supportRequest");

let hasErrors = false;

function checkBoxesEvents() {
  checkBoxes.forEach((checkBox, idx) => {
    checkBox.addEventListener("change", () => {
      handleCheckboxChange(idx, checkBox.checked);
    });
  });
}

checkboxContainers.forEach((checkboxContainer, idx) => {
  checkboxContainer.addEventListener("click", () => {
    const checkBox = checkBoxes[idx];
    checkBox.checked = !checkBox.checked;
    handleCheckboxChange(idx, checkBox.checked);
  });
});

function handleCheckboxChange(idx, isChecked) {
  if (isChecked) {
    applyStyleCheckBoxes(idx);
    checkBoxes.forEach((cb, cbIdx) => {
      if (cbIdx !== idx) {
        cb.checked = false;
        removeStyleCheckBoxes(cbIdx);
      }
    });
  } else {
    removeStyleCheckBoxes(idx);
  }
}

function applyStyleCheckBoxes(idx) {
  checkboxContainers[idx].style.outline = "2px solid  hsl(169, 82%, 27%)";
  checkboxContainers[idx].style.background = "hsl(148, 38%, 91%)";
  customCheckbox[idx].style.outline = "2px solid  hsl(169, 82%, 27%)";
  customCheckboxDot[idx].style.display = "flex";
}

function removeStyleCheckBoxes(idx) {
  checkboxContainers[idx].style.outline = "1.5px solid hsl(186, 15%, 59%)";
  customCheckbox[idx].style.outline = "2px solid  hsl(186, 15%, 59%)";
  checkboxContainers[idx].style.background = "hsl(0, 0%, 100%)";
  customCheckboxDot[idx].style.display = "none";
}

function agreeConsent() {
  agreeCheckbox.addEventListener("change", () => {
    stylesForAgreeCustomCheckbox(agreeCheckbox.checked);
  });
  agreeCustomCheckbox.addEventListener("click", () => {
    agreeCheckbox.checked = !agreeCheckbox.checked;
    stylesForAgreeCustomCheckbox(agreeCheckbox.checked);
  });
}

function stylesForAgreeCustomCheckbox(consentCheckbox) {
  if (consentCheckbox) {
    agreeImg.style.display = "flex";
    agreeCustomCheckbox.style.outline = "1px solid  hsl(169, 82%, 27%)";
  } else {
    agreeImg.style.display = "none";
    agreeCustomCheckbox.style.outline = "1px solid hsl(186, 15%, 59%)";
  }
}

function submitBtn() {
  submitButton.addEventListener("click", (e) => {
    e.preventDefault();
    document.querySelectorAll(".error-msg").forEach((errorMsg) => {
      errorMsg.remove();
    });

    ErrorMsg();

    const isAnyCheckboxChecked = Array.from(checkBoxes).some(
      (checkbox) => checkbox.checked
    );

    if (!isAnyCheckboxChecked) {
      hasErrors = true;
      if (!document.querySelector(".checkbox-error")) {
        checkboxGroup.insertAdjacentHTML(
          "afterend",
          `<span class="error-msg checkbox-error">Please select a query type</span>`
        );
      }
    }

    if (!consentCheckbox.checked) {
      hasErrors = true;
      agreeCheckboxContainer.insertAdjacentHTML(
        "afterend",
        `<span class="error-msg checkbox-error">To submit this form, please consent to being contacted</span>`
      );
    }

    if (!hasErrors) {
      removeErrorMsg();
      storeInfo()
      successModal();
    }

    setTimeout(() => {
      removeErrorMsg();
    }, 5000);
  });
}

function ErrorMsg() {
  let hasErrors = false;

  inputs.forEach((input, idx) => {
    const errorMsg = input.nextElementSibling;
    if (errorMsg && errorMsg.classList.contains("error-msg")) {
      errorMsg.remove();
    }

    const value = input.value.trim();
    if (!value && value === "") {
      input.style.outline = "1.5px solid hsl(0, 66%, 54%)";
      input.insertAdjacentHTML(
        "afterend",
        `<span class="error-msg">This field is required</span>`
      );
      hasErrors = true;
    }
  });
  return hasErrors;
}

function removeErrorMsg() {
  document.querySelectorAll(".error-msg").forEach((errorMsg) => {
    errorMsg.remove();
  });
  inputs.forEach((input, idx) => {
    input.style.outline = "1.5px solid hsl(186, 15%, 59%)";
  });
}

function storeInfo() {
  const personInfo = {
    name: firstName.value,
    lastname: lastName.value,
    email: email.value,
    queryType: generalEnquiry.checked ? "General Enquiry" : "Support Request",
    message: message.value,
    consent: agreeCheckbox.checked ? true : false,
  };
  localStorage.setItem("person", JSON.stringify(personInfo));
}

function successModal() {
  modalContainer.style.transform = "translateY(0px)";
  setTimeout(() => {
    modalContainer.style.transform = "translateY(-150px)";
  }, 3000);
}

submitBtn();
agreeConsent();
checkBoxesEvents();
