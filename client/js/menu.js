// guarantee convention
"use strict";
// JavaScript which will rearrange and reformat buttons based on location in page
console.log("menu.js is active");
// list of menu items
let menuItems = document.getElementById("menu-items").getElementsByClassName("button");
// parallel arrays of ids, sections and hrefs
let sectionIds = ["current-page-button", "info-button", "art-button", "music-button"];
let sectionHrefs = ["home", "info", "gallery", "music"];
let sectionNames = ["Home", "Introduction", "Art Gallery", "Musical Anthology"];
// used to construct a button div
let menuItemTemplate = (id, isCurrentSection, sectionHref, sectionName) => {
  let classAttributes =
    isCurrentSection ? "button button-main" : "button";
  // buttonDiv to return
  let buttonDiv =
    (`<a id="${id}" class="${classAttributes}" href="#${sectionHref}">\n` +
      `\t<span>${sectionName}</span>\n` +
      `</a>`);
  return buttonDiv;
};
// test to see if template works
console.log("default button positions:");
for (var i = 0; i < sectionHrefs.length; i++) {
  console.log(menuItemTemplate(sectionIds[i], 0, sectionHrefs[i], sectionNames[i]));
}

// Import statments do not work in browser so excuse my hygine

// All the main page sections
let primaryPageSections = document.getElementById("page-center").getElementsByClassName("primary-section");

function divInViewport(div) {
  // top position (in pixels) relative to top of offsetParent element
  let top = div.offsetTop;
  let height = div.offsetHeight;
  // get vertical entirety of div
  while (div = div.offsetParent)
    top += div.offsetTop;
  let maxHeight = top + height;
  // return visibility as boolean
  let isVisible = (top < (window.pageYOffset + window.innerHeight)) && (maxHeight >= window.pageYOffset);
  return isVisible;
}

function mutateMenu() {
  let opactityLimit = 1;
  if (!divInViewport(primaryPageSections[0])) {
    for (var i = 0; i < menuItems.length; i++) {
      menuItems[i].style.backgroundColor = `rgba(255, 255, 255, 1)`;
      menuItems[i].style.color = `black`;
    }
  } else {
    for (var i = 0; i < menuItems.length; i++) {
      menuItems[i].style.backgroundColor = "rgba(255, 255, 255, 0)";
      menuItems[i].style.color = `rgb(255, 224, 128)`;
    }
  }
}
