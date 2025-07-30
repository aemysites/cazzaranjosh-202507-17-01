/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid layout that contains the columns
  const grid = element.querySelector('.w-layout-grid');
  if (!grid) return;

  // Get the immediate children of the grid (columns)
  const columns = Array.from(grid.children);
  if (columns.length < 2) return;

  // First column: image (reference directly)
  const imageCol = columns[0];
  // Second column: content (reference directly)
  const contentCol = columns[1];

  // Compose the columns block table
  const headerRow = ['Columns (columns32)'];
  const columnsRow = [imageCol, contentCol];
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    columnsRow,
  ], document);

  // Replace the original element with the new table
  element.replaceWith(table);
}
