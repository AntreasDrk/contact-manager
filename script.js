// Grab the form by its ID
const form = document.getElementById("contact-form");

// Stored Contacts
let contacts = [];

function storeContacts(firstName, lastName, email, phone) {
  const contact = {
    firstName: firstName,
    lastName: lastName,
    email: email,
    phone: phone,
  };

  contacts.push(contact);
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
