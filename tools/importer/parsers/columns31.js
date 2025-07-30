/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid container with columns
  const grid = element.querySelector('[class*="grid-layout"]');
  if (!grid) return;

  // Get all immediate children of the grid (these are the columns)
  const columns = Array.from(grid.children);
  if (columns.length === 0) return;

  // Build the table rows as per Columns (columns31) spec
  // Header row: a single cell spanning all columns
  const headerCell = document.createElement('th');
  headerCell.textContent = 'Columns (columns31)';
  if (columns.length > 1) {
    headerCell.colSpan = columns.length;
  }
  const headerRow = [headerCell];
  const contentRow = columns;

  const cells = [
    headerRow,
    contentRow
  ];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(cells, document);
  // Replace the original element with the new table block
  element.replaceWith(block);
}
