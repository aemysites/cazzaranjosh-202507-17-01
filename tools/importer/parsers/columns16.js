/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main grid for columns
  const grid = element.querySelector('.w-layout-grid');
  if (!grid) return;
  const columnDivs = Array.from(grid.children);

  // Each column is the inner 'utility-aspect-2x3' div, or the column div itself if not found
  const columnElements = columnDivs.map(colDiv => {
    const aspect = colDiv.querySelector('.utility-aspect-2x3');
    return aspect || colDiv;
  });

  // Table: header row is exactly one column (as per example), second row has as many columns as needed
  const headerRow = ['Columns (columns16)'];
  const contentRow = columnElements;
  const tableData = [headerRow, contentRow];

  // Create the table and replace
  const table = WebImporter.DOMUtils.createTable(tableData, document);
  element.replaceWith(table);
}
