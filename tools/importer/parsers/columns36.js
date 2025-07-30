/* global WebImporter */
export default function parse(element, { document }) {
  // Get the grid layout inside the container (two columns: left = content, right = images)
  const grid = element.querySelector('.w-layout-grid.grid-layout');
  if (!grid) return;
  const colDivs = Array.from(grid.children);
  if (colDivs.length < 2) return;

  // LEFT column: content (heading, subheading, buttons)
  const leftCol = colDivs[0];
  const leftContent = [];
  // Heading (h1-h6)
  const heading = leftCol.querySelector('h1, h2, h3, h4, h5, h6');
  if (heading) leftContent.push(heading);
  // Subheading (p)
  const subheading = leftCol.querySelector('p');
  if (subheading) leftContent.push(subheading);
  // Button group (contains 1 or more a.button)
  const buttonGroup = leftCol.querySelector('.button-group');
  if (buttonGroup) leftContent.push(buttonGroup);

  // RIGHT column: image grid
  const rightCol = colDivs[1];
  // The images are direct children of a .w-layout-grid inside rightCol
  let images = [];
  const imagesGrid = rightCol.querySelector('.w-layout-grid');
  if (imagesGrid) {
    // Only add <img> elements
    images = Array.from(imagesGrid.querySelectorAll('img'));
  }

  // Compose the block table
  // Header row: only one column, as per example
  // Second row: two columns, left = [heading, subheading, buttons], right = [all images]
  const cells = [
    ['Columns (columns36)'],
    [leftContent, images]
  ];

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
