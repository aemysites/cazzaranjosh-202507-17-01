/* global WebImporter */
export default function parse(element, { document }) {
  // Helper: get immediate child with a given class
  function getChildByClass(parent, className) {
    return Array.from(parent.children).find(child => child.classList.contains(className));
  }

  // Find main container and grid
  const container = getChildByClass(element, 'container');
  if (!container) return;
  const grid = getChildByClass(container, 'grid-layout');
  if (!grid) return;
  
  // There are 3 main grid children: 
  // 1. The main left column (big card)
  // 2. The right top (with two image cards)
  // 3. The right column vertical stack (text only cards with dividers)

  // 1. Main left column: it's the only <a> child directly under grid
  const leftCol = Array.from(grid.children).find(el => el.tagName === 'A');

  // 2. Grid children that are flex-horizontal/flex-vertical are the right column content
  const rightColGroups = Array.from(grid.children).filter(el => el.classList.contains('flex-horizontal') && el.classList.contains('flex-vertical'));
  // Defensive: if rightColGroups[0] is undefined, fallback to blank

  // As per the screenshot/example, the columns should be:
  // Left: leftCol (big card)
  // Right: stack of two image cards (with tags/images/text) and stack of text-only cards (with dividers) as a single column

  // We'll create a new div for the right column and append the two groups in order.
  const rightColDiv = document.createElement('div');
  if (rightColGroups[0]) {
    // The first rightColGroup contains two <a> image cards
    Array.from(rightColGroups[0].children).forEach(child => {
      rightColDiv.appendChild(child);
    });
  }
  if (rightColGroups[1]) {
    // The second rightColGroup contains the text cards with dividers
    Array.from(rightColGroups[1].children).forEach(child => {
      rightColDiv.appendChild(child);
    });
  }

  // Compose header row (block name and variant)
  const headerRow = ['Columns (columns2)'];
  // Compose content row: left column, right column
  const tableRows = [headerRow, [leftCol, rightColDiv]];

  // Create and replace with the block table
  const table = WebImporter.DOMUtils.createTable(tableRows, document);
  element.replaceWith(table);
}
