/* global WebImporter */
export default function parse(element, { document }) {
  // Block header row, matches the exact example
  const headerRow = ['Columns (columns15)'];

  // Find the direct grid columns
  const container = element.querySelector('.container');
  if (!container) return;
  const grid = container.querySelector('.w-layout-grid');
  if (!grid) return;

  // Get the immediate children of the grid (columns)
  const gridChildren = Array.from(grid.children);
  if (gridChildren.length < 2) return;

  // For each column, gather all direct children, referencing the actual source nodes
  // For the left (text) column, ensure all text (heading, paragraph, button group) are included, preserving structure
  // For the right column, the image is included directly
  // Do not clone, but reference actual nodes
  const leftCol = gridChildren[0];
  const rightCol = gridChildren[1];

  // For leftCol, gather all children (including text nodes) into a DocumentFragment
  const leftContentNodes = [];
  leftCol.childNodes.forEach(node => {
    if (node.nodeType === Node.ELEMENT_NODE) {
      leftContentNodes.push(node);
    } else if (node.nodeType === Node.TEXT_NODE && node.textContent.trim()) {
      // preserve text node by wrapping in <p>
      const p = document.createElement('p');
      p.textContent = node.textContent.trim();
      leftContentNodes.push(p);
    }
  });
  
  // If no children found, fallback to the column itself
  const leftCell = leftContentNodes.length === 1 ? leftContentNodes[0] : leftContentNodes;

  // For rightCol (expecting an <img>), reference the element itself
  const rightCell = rightCol;

  // Compose the table
  const cells = [
    headerRow,
    [leftCell, rightCell]
  ];

  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
