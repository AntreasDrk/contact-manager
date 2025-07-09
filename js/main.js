"use strict";

// imports files from the ui.js
import { showPlaceholder, removeContactInfo, renderGroupContacts, displayContactCard } from "./ui.js";

showPlaceholder(); // shows the placeholder when no contact is pressed
removeContactInfo();

// imports files from data.js
import { getContacts, storeContact, clearContacts, groupContactsByFirstLetter } from "./data.js";

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

// holds contacts here
const contacts = getContacts();
// groups them and then clears old ui to re-render them
const grouped = groupContactsByFirstLetter(contacts);
listContainer.innerHTML = "";
renderGroupContacts(grouped);

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

  // 🔁 Rerender the whole list with sticky headers
  const updatedContacts = getContacts();
  // this will grap the contacts and group them alphabeticaly and also display
  // the letters of the grouped contacts A . B . C . D....
  const grouped = groupContactsByFirstLetter(updatedContacts);
  listContainer.innerHTML = "";
  renderGroupContacts(grouped);

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
