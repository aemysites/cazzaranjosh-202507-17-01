/* global WebImporter */
export default function parse(element, { document }) {
  // Table header
  const headerRow = ['Cards (cards21)'];

  // Find the card body (where image and text are)
  const cardBody = element.querySelector('.card-body');
  if (!cardBody) return;

  // Find image (mandatory)
  const img = cardBody.querySelector('img');
  // Find heading (mandatory, class h4-heading or h4)
  const heading = cardBody.querySelector('.h4-heading, h4, .card-title');

  // Build text cell content
  const textContent = [];
  if (heading) textContent.push(heading);
  // If there is a description below the heading, include it as well (in this case, there is not, but support the general case)
  // A description would typically be text nodes or paragraphs after the heading
  let sibling = heading ? heading.nextSibling : null;
  while (sibling) {
    if (sibling.nodeType === Node.ELEMENT_NODE) {
      // Only keep visible text (ignore images, etc)
      if (
        sibling.tagName.toLowerCase() === 'p' ||
        sibling.tagName.toLowerCase() === 'div' ||
        sibling.tagName.toLowerCase() === 'span'
      ) {
        textContent.push(sibling);
      }
    } else if (sibling.nodeType === Node.TEXT_NODE) {
      const trimmed = sibling.textContent.trim();
      if (trimmed) {
        textContent.push(document.createTextNode(trimmed));
      }
    }
    sibling = sibling.nextSibling;
  }
  // Table rows
  const rows = [headerRow, [img, textContent]];
  // Create table
  const block = WebImporter.DOMUtils.createTable(rows, document);
  // Replace element
  element.replaceWith(block);
}
