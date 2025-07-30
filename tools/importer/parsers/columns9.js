/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid container inside the footer
  const grid = element.querySelector('.w-layout-grid');
  if (!grid) return;

  // Get all immediate child elements (columns)
  const columns = Array.from(grid.children);

  // If there are no columns, don't process
  if (columns.length === 0) return;

  // Build header row: exactly one column with the correct text
  const headerRow = ['Columns (columns9)'];

  // Second row: columns as cells
  const dataRow = columns;

  // Make the table (header: 1 col, second row: N cols)
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    dataRow,
  ], document);

  // Replace the original element with the new table
  element.replaceWith(table);
}
