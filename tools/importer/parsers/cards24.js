/* global WebImporter */
export default function parse(element, { document }) {
  // Header row as specified in the requirements and example
  const headerRow = ['Cards (cards24)'];
  const rows = [headerRow];

  // Get all cards (direct children links)
  const cards = element.querySelectorAll(':scope > a');
  cards.forEach(card => {
    // First cell: the image (always present, inside a div, then img)
    const imageDiv = card.querySelector('.utility-aspect-2x3');
    let imageEl = null;
    if (imageDiv) {
      imageEl = imageDiv.querySelector('img');
    }

    // Second cell: Text content (tag, date, title)
    // Collect relevant direct children (excluding the image container)
    const textCellContent = [];
    const children = Array.from(card.children);
    children.forEach(child => {
      if (!child.classList.contains('utility-aspect-2x3')) {
        // Only include if not the image container
        textCellContent.push(child);
      }
    });

    // Add the card row to the table
    rows.push([
      imageEl,
      textCellContent
    ]);
  });

  // Build and replace with the block table
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
