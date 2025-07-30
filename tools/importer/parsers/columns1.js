/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main grid which contains the columns
  const grid = element.querySelector('.w-layout-grid');
  if (!grid) return;
  // Get all direct children of the grid (should be image and content block)
  const gridChildren = Array.from(grid.children).filter(Boolean);

  // To match the example: left column = image, right column = text content (heading, subheading, buttons)
  // The block must have a single table with header row: ['Columns (columns1)'] and
  // one row with 2 columns: [image, content block]

  // Defensive handling: if less than 2 children, fill with empty string (rare edge case)
  const cells = [
    ['Columns (columns1)'],
    [
      gridChildren[0] || '',
      gridChildren[1] || ''
    ],
  ];

  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
