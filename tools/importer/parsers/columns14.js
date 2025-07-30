/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid layout containing the columns
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get all direct children of the grid (these are columns)
  const columns = Array.from(grid.children);
  if (columns.length < 2) return;

  // Target: left = <h2> + paragraph/button, right = nothing (from the given example only two columns)
  // From the provided HTML, columns[0] = <h2>, columns[1] = <div> with <p> and <a>
  // So, combine columns[0] and columns[1] in first cell, and leave second cell empty (if needed),
  // but the example wants <h2> in left cell, and paragraph+button in right cell.

  const h2 = columns.find(col => col.tagName === 'H2');
  const right = columns.find(col => col !== h2);
  
  // Defensive: if not found, fallback
  // Create table header
  const headerRow = ['Columns (columns14)'];
  // Second row: left is h2, right is everything else
  const leftCell = h2 || '';
  const rightCell = right || '';
  
  const cells = [
    headerRow,
    [leftCell, rightCell],
  ];

  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
