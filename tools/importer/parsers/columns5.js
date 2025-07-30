/* global WebImporter */
export default function parse(element, { document }) {
  // Get the main grid containing the two columns
  const grid = element.querySelector(
    '.w-layout-grid.grid-layout.tablet-1-column'
  );
  if (!grid) return;

  // Find the content column (should contain heading, paragraph, buttons)
  // The content is always the first non-img child
  let contentBlock = null;
  let image = null;
  for (const child of grid.children) {
    if (child.tagName === 'IMG' && !image) {
      image = child;
    } else if (!contentBlock && child.nodeType === 1) {
      contentBlock = child;
    }
  }

  // Defensive fallback if structure changes
  if (!contentBlock) {
    contentBlock = grid.querySelector(':scope > div');
  }
  if (!image) {
    image = grid.querySelector('img');
  }

  // Build the cells array according to guidance
  const cells = [
    ['Columns (columns5)'],
    [contentBlock, image]
  ];

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
