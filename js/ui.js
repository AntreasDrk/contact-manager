"use strict";

const listContainer = document.getElementById("contact-list");

export function removePlaceholder() {
  document.getElementById("placeholder-message").classList.add("hide-placeholder");
}

export function showPlaceholder() {
  document.getElementById("placeholder-message").classList.remove("hide-placeholder");
}

export function removeContactInfo() {
  document.getElementById("info-sections-container").classList.add("hide-info");
}

export function showContactInfo() {
  document.getElementById("info-sections-container").classList.remove("hide-info");
}

export function renderGroupContacts(groupedContacts) {
  listContainer.innerHTML = ""; // clearing the container

  for (let letter in groupedContacts) {
    // create sticky header for each letter
    const header = document.createElement("div");
    header.classList.add("sticky-header");
    header.textContent = letter;
    listContainer.appendChild(header);

    // loop through each contact in that group
    groupedContacts[letter].forEach((contact) => {
      const contactCard = document.createElement("div");
      contactCard.classList.add("contact-card");

      contactCard.innerHTML = `
        <input type="checkbox" />
        <h5>${contact.firstName} ${contact.lastName}</h5>
      `;

      // Optional: show details on click
      contactCard.addEventListener("click", function () {
        removePlaceholder();
        showContactInfo();
      });

      listContainer.appendChild(contactCard);
    });
  }
}

// Function so i can display contacts without reloading the page
export function displayContactCard(contact) {
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
