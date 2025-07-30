/* global WebImporter */
export default function parse(element, { document }) {
  // Header row as per spec
  const headerRow = ['Cards (cards17)'];
  // Get all direct card wrappers
  const cards = Array.from(element.querySelectorAll(':scope > .utility-aspect-1x1'));
  // For each card, get image (mandatory) and leave the text cell empty (none in provided HTML)
  const rows = cards.map(card => {
    const img = card.querySelector('img');
    return [img, ''];
  });
  // Table structure: header + each row per card
  const cells = [headerRow, ...rows];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}