/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid container
  const container = element.querySelector('.container');
  if (!container) return;
  const grid = container.querySelector('.grid-layout');
  if (!grid) return;

  // Collect immediate children of the grid (columns)
  const columns = Array.from(grid.children);
  if (columns.length === 0) return;

  // The header row MUST have exactly one column, per the requirements
  const headerRow = ['Columns (columns3)'];

  // The content row contains the columns as individual cells
  const columnsRow = columns.map(col => col);

  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    columnsRow
  ], document);

  element.replaceWith(table);
}
