/* global WebImporter */
export default function parse(element, { document }) {
  // Header row with single cell, as required
  const headerRow = ['Columns (columns38)'];
  // Each column is a direct child div, use all as content in one row
  const columns = Array.from(element.querySelectorAll(':scope > div'));
  // Structure: header is one cell; content row is N cells for N columns
  const tableData = [
    headerRow,
    columns
  ];
  const table = WebImporter.DOMUtils.createTable(tableData, document);
  element.replaceWith(table);
}
