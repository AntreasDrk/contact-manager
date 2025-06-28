"use strict";

// This array will hold all contacts in memory
let contacts = [];

/**
 * Loads contacts from localStorage into memory.
 * @returns {Array} contacts - the array of contact objects
 */
export function getContacts() {
  const savedContacts = localStorage.getItem("contacts");
  contacts = savedContacts ? JSON.parse(savedContacts) : [];
  return contacts;
}

/**
 * Stores a new contact in localStorage and memory.
 * @param {string} firstName 
 * @param {string} lastName 
 * @param {string} email 
 * @param {string} phone 
 * @returns {Object} contact - the newly created contact
 */
export function storeContact(firstName, lastName, email, phone) {
  const contact = {
    firstName,
    lastName,
    email,
    phone,
  };

  contacts.push(contact); // add to memory
  localStorage.setItem("contacts", JSON.stringify(contacts)); // save to storage
  return contact;
}

/**
 * Clears all contacts from localStorage and memory.
 */
export function clearContacts() {
  contacts = [];
  localStorage.removeItem("contacts");
}

/**
 * Grouping contacts by first letter
 */
export function groupContactsByFirstLetter(contactsArray) {
  let group = {};
  contactsArray.forEach((contact) => {
    const letter = contact.firstName[0].toUpperCase();

      if (/^[A-Z]$/.test(letter)) {
        if(group[letter]) {
          group[letter].push(contact);
        } else {
          group[letter] = [contact];
        }
      } else {
          if (group["0-9"]) {
            group["0-9"].push(contact);
          } else {
            group["0-9"] = [contact];
          }
      }
  })

  return group;
}