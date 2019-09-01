"use strict";
console.log("hot-and-cold active");
let art = document.getElementById("interactive-art-1");
let cellTemplate = (row, col) => {
  return `<div id="hc-${row}-${col}" class="hc-cell"></div>\n`
};
const DIMENSIONS_IN_PIXELS = 600;
const DIMENSIONS_UPPER_LIMIT = function() {
  return Math.floor((Math.random() * 15) + 5);
}();
// set dimensions
console.log(`creating grid of size ${DIMENSIONS_UPPER_LIMIT}`);
art.style.gridTemplateColumns = `repeat(${DIMENSIONS_UPPER_LIMIT}, ${DIMENSIONS_IN_PIXELS / DIMENSIONS_UPPER_LIMIT}px)`;
art.style.gridTemplateRows = `repeat(${DIMENSIONS_UPPER_LIMIT}, ${DIMENSIONS_IN_PIXELS / DIMENSIONS_UPPER_LIMIT}px)`;
// populate the piece with cells
// nested for, outer for letters a-h
// inner for numbers 1-8
for (var i = 1; i <= DIMENSIONS_UPPER_LIMIT; i++) {
  for (var j = 1; j <= DIMENSIONS_UPPER_LIMIT; j++) {
    console.log("debug");
    art.innerHTML += cellTemplate(String.fromCharCode(96 + i), j);
  }
}

// format cells
function spawnRandom() {

}
