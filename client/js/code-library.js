// guarantee convention
"use strict";
// A repository of useful functions

// TODO: IMPORT / EXPORT FUNCTIONS
// All the main page sections
let primaryPageSections = document.getElementById("page-center").getElementsByClassName("primary-section");
// returns a boolean based on if a div is visible in the viewport
export function divInViewport(div) {
  // top position (in pixels) relative to top of offsetParent element
  let top = div.offsetTop;
  let height = div.offsetHeight;
  // get vertical entirety of div
  while( div = div.offsetParent)
    top += div.offsetTop;
  let maxHeight = top + height;
  // return visibility as boolean
  let isVisible = (top < (window.pageYOffset + window.innerHeight)) && (maxHeight >= window.pageYOffset);
  return isVisible;
}
