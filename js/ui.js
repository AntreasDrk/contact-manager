"use strict";

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
