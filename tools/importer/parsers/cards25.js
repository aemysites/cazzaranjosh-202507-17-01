/* global WebImporter */
export default function parse(element, { document }) {
  // Prepare header row as in the example
  const headerRow = ['Cards (cards25)'];
  const rows = [headerRow];

  // Find all immediate children - cards may have different containers
  const cardDivs = Array.from(element.querySelectorAll(':scope > div'));

  cardDivs.forEach(cardDiv => {
    // Try to find an image (first <img> child, required)
    const img = cardDiv.querySelector('img');
    // Find the text container if present (required for this block)
    const textContent = cardDiv.querySelector('.utility-padding-all-2rem');
    // Only build row if both are present (matches block intent)
    if (img && textContent) {
      // Reference the image element and the content element directly
      rows.push([img, textContent]);
    }
  });

  // Only create and replace if we actually found cards
  if (rows.length > 1) {
    const table = WebImporter.DOMUtils.createTable(rows, document);
    element.replaceWith(table);
  }
}
