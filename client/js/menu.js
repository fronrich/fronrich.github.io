// JavaScript which will rearrange buttons based on location in page
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
  let buttonDiv =
      (`<a id="${id}" class="${classAttributes}" href="#${sectionHref}">\n` +
      `\t<span>${sectionName}</span>\n` +
      `</a>`);
  return buttonDiv;
};
// test to see if template works
console.log("default button positions:");
for(let i = 0;  i < sectionHrefs.length; i++) {
  console.log(menuItemTemplate(sectionIds[i], 0, sectionHrefs[i], sectionNames[i]));
}
