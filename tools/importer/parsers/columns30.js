/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid containing the columns
  const grid = element.querySelector('.w-layout-grid');
  if (!grid) return;
  // Get all direct children of the grid, in order
  const gridChildren = Array.from(grid.children);
  // There are 4 children: name, tags, heading, description
  // Compose left column: name + tags
  const leftColumn = document.createElement('div');
  if (gridChildren[0]) leftColumn.appendChild(gridChildren[0]);
  if (gridChildren[1]) leftColumn.appendChild(gridChildren[1]);
  // Compose right column: heading + description
  const rightColumn = document.createElement('div');
  if (gridChildren[2]) rightColumn.appendChild(gridChildren[2]);
  if (gridChildren[3]) rightColumn.appendChild(gridChildren[3]);
  // The header row must be a single cell (matching the example)
  const headerRow = ['Columns (columns30)'];
  const contentRow = [leftColumn, rightColumn];
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow
  ], document);
  element.replaceWith(table);
}
