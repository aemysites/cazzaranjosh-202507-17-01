/* global WebImporter */
export default function parse(element, { document }) {
  // Table header must match the block name exactly per spec
  const headerRow = ['Columns (columns7)'];

  // Get all direct <div> children (each represents a column)
  const columns = Array.from(element.querySelectorAll(':scope > div'));

  // Each column is a cell in the second row
  // Per guidance, include the full wrapper div for each column
  const row = columns.map(col => col);

  const table = WebImporter.DOMUtils.createTable([headerRow, row], document);
  element.replaceWith(table);
}