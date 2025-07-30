/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Header row: block name must match exactly
  const headerRow = ['Hero (hero39)'];

  // 2. Extract background image (row 2)
  // Find the first <img> with class 'cover-image' inside the element
  let imageRow = [''];
  const img = element.querySelector('img.cover-image');
  if (img) {
    imageRow = [img];
  }

  // 3. Extract content: Heading, Subheading, CTA (row 3)
  // Find the right content container by class 'container'
  let contentRow = [''];
  const contentCol = element.querySelector('.container');
  if (contentCol) {
    // In provided HTML, the main content structure is a grid
    const grid = contentCol.querySelector('.grid-layout');
    if (grid) {
      // This grid contains: <h1>, then a <div> with paragraph and button
      // We'll collect all direct children of this grid
      const children = Array.from(grid.children);
      contentRow = [children];
    } else {
      // Fallback: just use the whole contentCol
      contentRow = [contentCol];
    }
  }

  // 4. Assemble table rows
  const cells = [
    headerRow,   // Block name row
    imageRow,    // Background image row
    contentRow   // Content row (heading, text, CTA)
  ];

  // 5. Create and replace with the block table
  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
