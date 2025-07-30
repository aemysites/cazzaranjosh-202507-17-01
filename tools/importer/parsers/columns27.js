/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main content grid
  const container = element.querySelector('.container');
  if (!container) return;
  const grid = container.querySelector('.w-layout-grid');
  if (!grid) return;
  // Get direct children of the grid: these are the columns
  const columns = Array.from(grid.children);
  if (columns.length === 0) return;

  // Block header, as required
  const headerRow = ['Columns (columns27)'];
  // Second row: put each column's element directly in a cell
  const secondRow = columns;

  // Compose and insert the block table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    secondRow
  ], document);
  element.replaceWith(table);
}
