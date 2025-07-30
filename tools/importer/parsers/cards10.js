/* global WebImporter */
export default function parse(element, { document }) {
  // Header row matches the block name exactly
  const headerRow = ['Cards (cards10)'];
  
  // Find all direct card links (cards)
  const cards = Array.from(element.querySelectorAll(':scope > a.card-link'));

  const rows = cards.map(card => {
    // First cell: image (mandatory)
    // Always take the first .utility-aspect-3x2 > img inside the card
    const imageDiv = card.querySelector('.utility-aspect-3x2');
    let img = null;
    if (imageDiv) {
      img = imageDiv.querySelector('img');
    }
    
    // Second cell: text content (mandatory)
    // Use the entire .utility-padding-all-1rem element, referencing it directly
    const content = card.querySelector('.utility-padding-all-1rem');

    // Always build a row with [img, content] (both may be null, but always two cells)
    return [img, content];
  });

  // Build table: header, then each card as a row
  const tableRows = [headerRow, ...rows];
  const block = WebImporter.DOMUtils.createTable(tableRows, document);
  element.replaceWith(block);
}
