/* global WebImporter */
export default function parse(element, { document }) {
  // Helper: get all direct children of a node by selector
  function directChildren(parent, selector) {
    return Array.from(parent.children).filter(el => el.matches(selector));
  }

  // --- Find the two main grid columns (content) ---
  const container = element.querySelector('.container');
  const gridMain = container.querySelector('.w-layout-grid.grid-layout');

  // Defensive: If not found, fallback gracefully.
  let leftCol, rightCol;
  if (gridMain) {
    const cols = directChildren(gridMain, 'div, section');
    leftCol = cols[0];
    rightCol = cols[1];
  }

  // --- Left column: keep as is, preserve all structure (eyebrow + h1) ---
  // Defensive: If not present, fallback to empty div
  const leftContent = leftCol || document.createElement('div');

  // --- Right column: text content, author meta, button ---
  let rightContent;
  if (rightCol) {
    rightContent = document.createElement('div');
    // Rich text (paragraph)
    const rich = rightCol.querySelector('.rich-text');
    if (rich) rightContent.appendChild(rich);
    // Author/meta info (usually another grid)
    const meta = rightCol.querySelector('.w-layout-grid.grid-layout');
    if (meta) rightContent.appendChild(meta);
    // Button (Read more)
    const btn = rightCol.querySelector('a.button, .button');
    if (btn) rightContent.appendChild(btn);
  } else {
    rightContent = document.createElement('div');
  }

  // --- Bottom image grid: two images ---
  const gridBottom = element.querySelector('.w-layout-grid.mobile-portrait-1-column');
  let bottomImages = [];
  if (gridBottom) {
    bottomImages = Array.from(gridBottom.querySelectorAll('img'));
    // Defensive: if fewer than 2 images, pad with empty divs
    while (bottomImages.length < 2) {
      bottomImages.push(document.createElement('div'));
    }
  } else {
    bottomImages = [document.createElement('div'), document.createElement('div')];
  }

  // --- Compose table rows ---
  // Header row: must be a single cell, and colspan=2
  // We'll create the table, then set colspan after creation
  const cells = [
    ['Columns (columns11)'],
    [leftContent, rightContent],
    bottomImages
  ];

  // Create the block and fix the header colspan
  const block = WebImporter.DOMUtils.createTable(cells, document);
  // Set the colspan of the header cell to span all columns
  const headerRow = block.querySelector('tr:first-child');
  if (headerRow && headerRow.children.length === 1) {
    headerRow.children[0].setAttribute('colspan', '2');
  }
  element.replaceWith(block);
}
