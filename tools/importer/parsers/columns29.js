/* global WebImporter */
export default function parse(element, { document }) {
  // Find all column containers (immediate children)
  const columns = Array.from(element.querySelectorAll(':scope > div'));
  // Second row: one cell per column (usually an image)
  const contentRow = columns.map((col) => {
    // Return the first (and only) image in the column div, or the column div if no img
    const img = col.querySelector('img');
    return img || col;
  });
  // Header row: single cell exactly matching block name
  const headerRow = ['Columns (columns29)'];
  // Compose and replace
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow
  ], document);
  element.replaceWith(table);
}
