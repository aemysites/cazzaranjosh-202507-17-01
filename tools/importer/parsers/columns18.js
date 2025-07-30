/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main grid container
  const grid = element.querySelector('.w-layout-grid');
  if (!grid) return;

  // Get all direct children
  const gridChildren = Array.from(grid.children);

  // Find left text block div
  const leftCol = gridChildren.find(child =>
    child.tagName === 'DIV' &&
    child.querySelector('h2.eyebrow') &&
    child.querySelector('h3.h2-heading')
  );
  // Find contact list (ul)
  const contactList = gridChildren.find(child => child.tagName === 'UL');
  // Find the image
  const image = gridChildren.find(child => child.tagName === 'IMG');

  // Compose the cells array: header row, first content row, second row (image only in right cell)
  const cells = [
    ['Columns (columns18)'],
    [leftCol || '', contactList || ''],
    ['', image || '']
  ];

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
