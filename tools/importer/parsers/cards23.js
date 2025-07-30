/* global WebImporter */
export default function parse(element, { document }) {
  // Find all .w-tab-pane sections (each one is a group of cards)
  const tabPanes = element.querySelectorAll('.w-tab-pane');
  tabPanes.forEach((tabPane) => {
    // Each tab pane should be replaced by its own table block
    const grid = tabPane.querySelector('.w-layout-grid');
    if (!grid) return;
    const cards = Array.from(grid.children).filter(el => el.tagName === 'A');
    const rows = [['Cards (cards23)']]; // header from example, exact
    cards.forEach(card => {
      // Try to find image if present
      let imgEl = card.querySelector('img');
      // Compose text cell (heading + desc)
      let heading = card.querySelector('h3, .h4-heading');
      let desc = card.querySelector('.paragraph-sm');
      let textCell = document.createElement('div');
      if (heading) textCell.appendChild(heading);
      if (desc) textCell.appendChild(desc);
      // If both heading and desc missing: fallback to any text content
      if (!heading && !desc) {
        // Try to find a rich text block
        let fallback = card.querySelector('div, span, p');
        if (fallback) textCell.appendChild(fallback);
      }
      // If textCell is empty, set to empty string
      let textContent = textCell.childNodes.length ? textCell : '';
      rows.push([
        imgEl ? imgEl : '',
        textContent
      ]);
    });
    const table = WebImporter.DOMUtils.createTable(rows, document);
    tabPane.replaceWith(table);
  });

  // After all tab panes are replaced with tables, remove the wrapper
  // and replace it with all constructed tables (preserves order)
  const tables = Array.from(element.parentNode.querySelectorAll('table'));
  element.replaceWith(...tables);
}