/* global WebImporter */
export default function parse(element, { document }) {
  // Header row matches example
  const headerRow = ['Columns (columns4)'];

  // Extract all immediate children (divs)
  const columnDivs = Array.from(element.querySelectorAll(':scope > div'));

  // Defensive: fallback to empty div if not enough
  const getDiv = (idx) => columnDivs[idx] || document.createElement('div');
  // Extract <img> or empty string
  const imgFrom = (div) => {
    const img = div.querySelector('img');
    return img ? img : '';
  };

  // Structure: 4 columns, last col has stack of last two images
  const col1 = imgFrom(getDiv(0));
  const col2 = imgFrom(getDiv(1));
  const col3 = imgFrom(getDiv(2));
  const col4 = [imgFrom(getDiv(3)), imgFrom(getDiv(4))].filter(Boolean);

  const rowCells = [col1, col2, col3, col4];
  const tableArray = [headerRow, rowCells];
  const block = WebImporter.DOMUtils.createTable(tableArray, document);
  element.replaceWith(block);
}
