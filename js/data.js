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
