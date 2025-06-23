"use strict";

// imports files from the ui.js
import { showPlaceholder, removePlaceholder, showContactInfo, removeContactInfo } from "./ui.js";

showPlaceholder(); // shows the placeholder when no contact is pressed
removeContactInfo();

import { getContacts, storeContact, clearContacts } from "./data.js";

// Grab the form by its ID
const form = document.getElementById("contact-form");

// Modal add button
const addBtn = document.getElementById("add-contact-btn");
const modal = document.getElementById("modal");

// Modal close button
const closeBtn = document.getElementById("close-modal-btn");

closeBtn.addEventListener("click", function () {
  modal.classList.add("modal-hidden");
  modal.classList.remove("modal-show");
});

// event listener for the modal button
addBtn.addEventListener("click", function () {
  modal.classList.toggle("modal-show");
  modal.classList.toggle("modal-hidden");
});

// Contact List
const listContainer = document.getElementById("contact-list");

// Grabbing the search bar id
const SEARCH_BAR = document.getElementById("search-input");

const contacts = getContacts();
contacts.forEach(displayContactCard);

// Function so i can display contacts without reloading the page
function displayContactCard(contact) {
  // Contact Card (this will be used to create a div inside the container for the list)
  const contactCard = document.createElement("div");
  contactCard.classList.add("contact-card");

  contactCard.innerHTML = `
      <input type="checkbox" />
      <h5> ${contact.firstName} ${contact.lastName} </h5>
    `;

  listContainer.appendChild(contactCard);

  // will remove the placeholder and later add information about the user
  contactCard.addEventListener("click", function () {
    removePlaceholder();
    // later add logic to show contact information
    showContactInfo();
  });
}

// Stops submit button from reloading the page
form.addEventListener("submit", function (event) {
  event.preventDefault();

  // Grab the values from the input fields by their ID
  const first_Name_field = document.getElementById("first-name").value;
  const last_Name_field = document.getElementById("last-name").value;
  const email_field = document.getElementById("email").value;
  const phone_Number_field = document.getElementById("phone-number").value;

  console.log("Form Submitted!");

  const NEW_CONTACT = storeContact(first_Name_field, last_Name_field, email_field, phone_Number_field);

  // Show it immediately in the DOM
  displayContactCard(NEW_CONTACT);

  modal.classList.toggle("modal-show");
  modal.classList.toggle("modal-hidden");

  // clear form fields
  form.reset();
});

// Clear button to reset localstorage
const CLEAR_BTN = document.getElementById("clear-contacts-btn");

CLEAR_BTN.addEventListener("click", function () {
  clearContacts(); // removes contacts
  document.getElementById("contact-list").innerHTML = ""; // clears UI
});

// EDIT BUTTON TO CHANGE THE IMAGE OF THE PROFILE PICTURE

const editButton = document.getElementById("edit-image");
const fileInput = document.getElementById("image-upload");
const profileImg = document.querySelector(".profile-image-container img");

// When button is clicked, trigger hidden file input field
editButton.addEventListener("click", () => {
  fileInput.click();
});

// When a file is selected, load it into the <img> tag
fileInput.addEventListener("change", () => {
  const file = fileInput.files[0];
  if (file) {
    const reader = new FileReader();

    reader.onload = function (e) {
      profileImg.src = e.target.result; // Sets new image
    };

    reader.readAsDataURL(file);
  }
});

// To hide the information once clicked outside of left/right panels in contact display
const detailsContainer = document.getElementById("contact-details");

document.addEventListener("click", function (event) {
  // event.target is the element clicked

  // Check if click is inside the containers
  const clickInsideList = listContainer.contains(event.target);
  const clickInsideDetails = detailsContainer.contains(event.target);

  // if not clicked inside then show placeholder hide info
  if (!clickInsideList && !clickInsideDetails) {
    showPlaceholder();
    removeContactInfo();
  }
});

// SEARCH BAR
SEARCH_BAR.addEventListener("input", (event) => {
  // make everything lowercase to make sure we can grab everything
  const query = event.target.value.toLowerCase();

  // turning the contacts to lowercase and searching for contacts
  const filteredContacts = contacts.filter((contact) => {
    return contact.firstName.toLowerCase().includes(query);
  });

  // clear the old list
  listContainer.innerHTML = "";

  // show matches
  filteredContacts.forEach(displayContactCard);
});
