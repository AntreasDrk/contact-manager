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

// Stored Contacts
let contacts = [];

// Grabs the saved contacts to read it
const savedContacts = localStorage.getItem("contacts");

// checks if its not empty and if not it will save it back to contacts array
if (savedContacts) {
  contacts = JSON.parse(savedContacts);
}

// Function to store contacts when called
function storeContacts(firstName, lastName, email, phone) {
  const contact = {
    firstName: firstName,
    lastName: lastName,
    email: email,
    phone: phone,
  };

  contacts.push(contact); // updates the array with a contact
  localStorage.settItem("contacts", JSON.stringify(contacts)); // save updated array
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

  storeContacts(first_Name_field, last_Name_field, email_field, phone_Number_field);
  console.log(contacts);
});
