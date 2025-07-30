/* global WebImporter */
export default function parse(element, { document }) {
  // Header row: always the block name, exactly as in example
  const headerRow = ['Hero (hero6)'];

  // 2nd row: background image (if exists)
  let bgImg = null;
  // The background image is an img.cover-image inside one of the nested grid divs
  const imgCandidate = element.querySelector('img.cover-image');
  if (imgCandidate) {
    bgImg = imgCandidate;
  }

  // 3rd row: main hero content (title, subheading, CTA)
  // The content card is .card
  let content = '';
  const cardDiv = element.querySelector('.card');
  if (cardDiv) {
    content = cardDiv;
  }

  // Compose table
  const cells = [
    headerRow,
    [bgImg ? bgImg : ''],
    [content ? content : ''],
  ];

  // Create and replace
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
