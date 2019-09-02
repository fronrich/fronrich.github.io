"use strict";
console.log("hot-and-cold active");
// random whole number generator
let randRange = (lowerLimit, upperLimit) => {
  return Math.floor((Math.random() * (upperLimit - lowerLimit)) + lowerLimit)
};
// converts number to corresponding character
// 0 based indexing
let numToLetter = (distanceFromA) => {
  return String.fromCharCode(97 + distanceFromA);
};
let art = document.getElementById("interactive-art-1");
let cellTemplate = (row, col) => {
  return `<div id="hc-${row}-${col}" class="hc-cell"></div>\n`
};
// find individual cell by id
let cellAt = (row, col) => {
  return `hc-${row}-${col}`;
}
const MIN_CELLS = 8;
const MAX_CELLS = 15;
const DIMENSIONS_IN_PIXELS = 600;
const DIMENSIONS_UPPER_LIMIT = function() {
  return randRange(MIN_CELLS, MAX_CELLS);
}();

// set dimensions
console.log(`creating ${DIMENSIONS_UPPER_LIMIT} X ${DIMENSIONS_UPPER_LIMIT} ` +
  `grid of size ${DIMENSIONS_UPPER_LIMIT * DIMENSIONS_UPPER_LIMIT}`);
art.style.gridTemplateColumns = `repeat(${DIMENSIONS_UPPER_LIMIT},` +
  `${DIMENSIONS_IN_PIXELS / DIMENSIONS_UPPER_LIMIT}px)`;
art.style.gridTemplateRows = `repeat(${DIMENSIONS_UPPER_LIMIT},` +
  `${DIMENSIONS_IN_PIXELS / DIMENSIONS_UPPER_LIMIT}px)`;

// populate the piece with cells
// nested for, outer for letters a-[j, o]
// inner for numbers 1-[10, 15]
for (var i = 1; i <= DIMENSIONS_UPPER_LIMIT; i++) {
  // 1 based indexing
  for (var j = 1; j <= DIMENSIONS_UPPER_LIMIT; j++) {
    art.innerHTML += cellTemplate(i, j);
  }
}

// Target cell [row, col]
const TARGET_CELL_CORDS = [
  Math.floor(randRange(1, DIMENSIONS_UPPER_LIMIT)),
  Math.floor(randRange(1, DIMENSIONS_UPPER_LIMIT))
];

const TARGET_CELL = document.getElementById(
  cellAt(
    TARGET_CELL_CORDS[0], TARGET_CELL_CORDS[1]
  )
);
console.log(`Target cell located at ${JSON.stringify(TARGET_CELL_CORDS)}`);
console.log(cellAt(TARGET_CELL_CORDS[0], TARGET_CELL_CORDS[1]));

// TODO REMOVE
// TEMP DEBUG:
// Make target cell red
// red 100%, blue 0%
TARGET_CELL.style.backgroundColor = `rgb(255,0,0)`;

// Max gradient distance should be 1/n grid size
const RENDER_DISTANCE = DIMENSIONS_UPPER_LIMIT;

// calculate the distance between a cell and the target cell
let getDist = (cellRow, cellCol) => {
  var rowDiff = Math.abs(TARGET_CELL_CORDS[0] - cellRow);
  var colDiff = Math.abs(TARGET_CELL_CORDS[1] - cellCol);
  return Math.sqrt(Math.pow(rowDiff, 2) + Math.pow(colDiff, 2));
};

// format cells
for (var i = 1; i <= DIMENSIONS_UPPER_LIMIT; i++) {
  // 1 based indexing
  for (var j = 1; j <= DIMENSIONS_UPPER_LIMIT; j++) {
    var distFromTarget = getDist(i, j);
    if(distFromTarget > RENDER_DISTANCE) {
      // out of render distance display transparent
      document.getElementById(cellAt(i, j)).style.backgroundColor = 'rgb(0,0,255)';
    } else {
      // within render distance display
      // the further from target the more cyan
      var percentB = 255 * (distFromTarget / RENDER_DISTANCE);
      var percentR = 255 - percentB;
      document.getElementById(cellAt(i, j)).style.backgroundColor = `rgb(${percentR}, 0, ${percentB})`;
    }

  }
}
