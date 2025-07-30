/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Header row as specified
  const headerRow = ['Cards (cards19)'];

  // 2. Gather all immediate card blocks (each card is a direct child <div>)
  const cardDivs = element.querySelectorAll(':scope > div');
  const rows = [];

  cardDivs.forEach(cardDiv => {
    // Icon (first cell):
    // - Look for .icon inside first child div
    let iconCell = null;
    const firstDiv = cardDiv.querySelector(':scope > div');
    if (firstDiv) {
      const iconDiv = firstDiv.querySelector('.icon');
      if (iconDiv) iconCell = iconDiv;
    }
    // Text (second cell):
    // - The <p> within cardDiv (should always exist)
    let textCell = null;
    const p = cardDiv.querySelector('p');
    if (p) textCell = p;
    // Insert fallback empty string to avoid undefined cell if not found
    rows.push([iconCell || '', textCell || '']);
  });

  // 3. Create table and replace element
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    ...rows
  ], document);
  element.replaceWith(table);
}
