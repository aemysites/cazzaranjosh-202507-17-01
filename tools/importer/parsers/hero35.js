/* global WebImporter */
export default function parse(element, { document }) {
  // Table header must match block name
  const headerRow = ['Hero (hero35)'];

  // No background image in HTML, so keep second row empty string
  const bgRow = [''];

  // Find the grid container that holds the hero content
  const grid = element.querySelector('.grid-layout');
  let contentRow;

  if (grid) {
    // The first child is the headline/subheading block
    const left = grid.children[0];
    // The second child is the CTA button block (might not exist)
    const right = grid.children[1];

    const cellContent = [];
    if (left) {
      // Add all elements (headings, subheadings, paragraphs)
      Array.from(left.childNodes).forEach((node) => {
        // Only append non-empty nodes
        if (node.nodeType === 1 || (node.nodeType === 3 && node.textContent.trim())) {
          cellContent.push(node);
        }
      });
    }
    if (right) {
      cellContent.push(right);
    }
    // If there is any content, include it; else, empty string
    contentRow = [cellContent.length ? cellContent : ''];
  } else {
    // fallback: use all children of the section for robustness
    contentRow = [Array.from(element.childNodes).filter(n => n.nodeType === 1 || (n.nodeType === 3 && n.textContent.trim()))];
  }

  const cells = [headerRow, bgRow, contentRow];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
