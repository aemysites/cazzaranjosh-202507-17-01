/* global WebImporter */
export default function parse(element, { document }) {
  // Build the header row as specified
  const rows = [
    ['Accordion (accordion13)']
  ];

  // Find all direct children with class 'divider' (each one is an accordion item)
  const dividerEls = Array.from(element.querySelectorAll(':scope > .divider'));

  dividerEls.forEach(divider => {
    // Within each divider, there should be a .w-layout-grid
    const grid = divider.querySelector('.w-layout-grid');
    if (!grid) return;
    // The grid should have two children: heading and content (in any order)
    let titleEl = null;
    let contentEl = null;
    for (const child of grid.children) {
      if (!titleEl && child.classList.contains('h4-heading')) {
        titleEl = child;
      } else if (!contentEl && child.classList.contains('w-richtext')) {
        contentEl = child;
      }
    }
    // Only add a row if both title and content are present
    if (titleEl && contentEl) {
      rows.push([titleEl, contentEl]);
    }
  });

  // Create the table and replace the element
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
