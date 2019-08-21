// guarantee convention
"use strict";
// JavaScript which will rearrange and reformat buttons based on location in page
console.log("menu.js is active");
// list of menu items
let menuItems = document.getElementById("menu-items").getElementsByClassName("button");
// All the main page sections
let primaryPageSections = document.getElementById("page-center").getElementsByClassName("primary-section");
// parallel arrays of button ids, sections and hrefs
let sectionHrefs = function(){
  var temp = [];
  for(var i = 0; i < primaryPageSections.length; i++) {
    temp = [...temp, primaryPageSections[i].id];
  }
  return temp;
}();
// Href + "button tag"
let sectionIds = function() {
  var temp = [];
  for(var i = 0; i < sectionHrefs.length; i++) {
    temp = [...temp, `${sectionHrefs[i]}-button`];
  }
  return temp;
}();
// All button names
// FIXME (NEED TO USE TITLE CASE)
let sectionNames = function() {
  var temp = [];
  for(var i = 0; i < sectionHrefs.length; i++) {
    let sectionTitleRaw =
        document.getElementById(`${sectionHrefs[i]}-title`).
        getElementsByTagName('SPAN')[0].
        innerHTML;
    let sectionTitleProcessed = function() {
      return sectionTitleRaw.charAt(0) +
          sectionTitleRaw.slice(1).toLowerCase();
    }();
    console.log(sectionTitleProcessed);
    temp = [...temp, sectionTitleProcessed];
  }
  // special case: 0th section is always home
  temp[0] = 'Home';
  return temp;
}();
// Test arrays
console.log("sectionHrefs:\n" + sectionHrefs);
console.log("sectionIds:\n" + sectionIds);
console.log("sectionNames:\n" + sectionNames);
// used to construct a button div
let menuItemTemplate = (id, sectionHref, sectionName) => {
  // buttonDiv to return
  let buttonDiv =
    (`<a id="${id}" class="button" href="#${sectionHref}">\n` +
      `\t<span>${sectionName}</span>\n` +
      `</a>`);
  return buttonDiv;
};

// Create menu using section divs
for(var i = 0; i < sectionNames.length; i++) {
  document.getElementById("menu-items").innerHTML +=
      menuItemTemplate(sectionIds[i], sectionHrefs[i], sectionNames[i]);

}
// test to see if template works
// console.log("default button positions:");
// for (var i = 0; i < sectionHrefs.length; i++) {
//   console.log(menuItemTemplate(sectionIds[i], 0, sectionHrefs[i], sectionNames[i]));
// }

// Import statments do not work in browser so excuse my hygine
console.log(primaryPageSections.length);

function divInViewport(div) {
  // console.log(div);
  // top position (in pixels) relative to top of offsetParent element
  let top = div.offsetTop;
  let height = div.offsetHeight;
  // get vertical entirety of div
  while (div = div.offsetParent) {
    top += div.offsetTop;
  }
  let maxHeight = top + height;
  // return visibility as boolean
  let isVisible = (top < (window.pageYOffset + window.innerHeight)) && (maxHeight >= window.pageYOffset);
  return isVisible;
}
// a function which changes the appearance of the menu
// based on visible area in page
function mutateMenu() {
  // allows changes to all menu items
  function changeInnerDiv(backgroundColor, textColor) {
    for (var i = 0; i < menuItems.length; i++) {
      // Mutate color elements
      menuItems[i].style.backgroundColor = `rgba${backgroundColor}`;
      menuItems[i].style.color = `${textColor}`;
      menuItems[i].style.borderRightColor = `${textColor}`;
      if(menuItems[i].classList.contains("button-main"))
        menuItems[i].style.borderLeftColor = `${textColor}`;
      // mutate font weight based on section
      if(divInViewport(primaryPageSections[i]))
        // primaryPageSections[i].getElementsByClassName("section-title"
        menuItems[i].style.fontWeight = `bold`;
      else
        menuItems[i].style.fontWeight = `lighter`;
      // Animation
      menuItems[i].style.transition = `350ms`;
      menuItems[i].style.transitionProperty = `background-color fontWeight`;
      menuItems[i].style.transitionTimingFunction = `ease-out`;

    }
  }
  let opacityLimit = .8;
  if (!divInViewport(primaryPageSections[0]))
    changeInnerDiv(`(255, 255, 255, ${opacityLimit})`, 'black');
  else
    changeInnerDiv('(255, 255, 255, 0)', 'rgb(255, 224, 128)');
}
