/* global WebImporter */
export default function parse(element, { document }) {
  // Header row (must match exactly)
  const headerRow = ['Hero (hero28)'];

  // Second row: Background image
  let bgImage = '';
  const gridDivs = element.querySelectorAll(':scope > .w-layout-grid > div');
  if (gridDivs.length > 0) {
    const possibleImg = gridDivs[0].querySelector('img');
    if (possibleImg) bgImage = possibleImg;
  }
  const bgImageRow = [bgImage];

  // Third row: Content (headings, subheadings, paragraphs, CTA)
  let contentCell = '';
  if (gridDivs.length > 1) {
    const contentDiv = gridDivs[1];
    // We'll collect all block-level elements that could be part of the hero text area
    // Heading (h1), subheadings (h2-h6), paragraphs, and CTAs (button groups/links)
    const contentFragments = [];
    // Find all block-level elements in order
    const selectors = 'h1, h2, h3, h4, h5, h6, p, .button-group, a, button, ul, ol';
    const blocks = contentDiv.querySelectorAll(selectors);
    blocks.forEach(e => {
      // Only add .button-group if it has children
      if (e.classList && e.classList.contains('button-group')) {
        if (e.children.length > 0) contentFragments.push(e);
      } else {
        contentFragments.push(e);
      }
    });
    // If nothing found, use the contentDiv as a fallback
    contentCell = contentFragments.length ? contentFragments : contentDiv;
  } else {
    // fallback: just use the element
    contentCell = element;
  }

  const cells = [
    headerRow,
    bgImageRow,
    [contentCell]
  ];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
