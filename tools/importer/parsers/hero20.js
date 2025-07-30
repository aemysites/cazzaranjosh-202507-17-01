/* global WebImporter */
export default function parse(element, { document }) {
  // Header row per block instructions
  const headerRow = ['Hero (hero20)'];

  // --- Background Image/Mosaic (2nd row) ---
  // Locate the hero grid wrapper with all background images and overlays
  let backgroundCell = '';
  // The only div with .ix-hero-scale-3x-to-1x directly under the sticky grid
  const mosaicGrid = element.querySelector('.ix-hero-scale-3x-to-1x');
  if (mosaicGrid) {
    backgroundCell = mosaicGrid;
  }

  // --- Content: Title, subheading, CTA (3rd row) ---
  // Find the main content container (contains h1, p, and button links)
  let contentCell = '';
  const contentContainer = element.querySelector('.ix-hero-scale-3x-to-1x-content .container');
  if (contentContainer) {
    contentCell = contentContainer;
  }

  // Compose table rows per spec: [header], [background], [content]
  const cells = [
    headerRow,
    [backgroundCell],
    [contentCell],
  ];

  // Create and replace
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
