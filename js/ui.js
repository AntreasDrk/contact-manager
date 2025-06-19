"use strict";

export function removePlaceholder() {
  document.getElementById("placeholder-message").classList.add("hide-placeholder");
}

export function showPlaceholder() {
  document.getElementById("placeholder-message").classList.remove("hide-placeholder");
}
