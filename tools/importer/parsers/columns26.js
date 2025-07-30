/* global WebImporter */
export default function parse(element, { document }) {
  // Get the relevant grid containing the main content
  const container = element.querySelector('.container');
  if (!container) return;
  const mainGrid = container.querySelector('.w-layout-grid.grid-layout');
  if (!mainGrid) return;

  // The grid contains: h2, quote, and a nested grid (for divider, avatar, name, svg logo)
  // Get heading
  const heading = mainGrid.querySelector('p.h2-heading');
  // Get quote
  const quote = mainGrid.querySelector('p.paragraph-lg');
  // Get the nested grid (should be the third direct child of mainGrid)
  const grids = mainGrid.querySelectorAll(':scope > .w-layout-grid');
  let nestedGrid = null;
  if (grids.length > 0) {
    nestedGrid = grids[grids.length - 1]; // It should be last child usually
  }
  if (!heading || !quote || !nestedGrid) return;

  // In the nested grid: divider, flex-horizontal (avatar+author), svg logo
  let divider = null, flexRow = null, svgLogo = null;
  const nestedChildren = Array.from(nestedGrid.children);
  nestedChildren.forEach(child => {
    if (child.classList.contains('divider')) {
      divider = child;
    } else if (child.classList.contains('flex-horizontal')) {
      flexRow = child;
    } else if (child.querySelector('svg')) {
      svgLogo = child;
    }
  });

  // First column: left (heading, divider, avatar/author)
  const leftCol = document.createElement('div');
  if (heading) leftCol.appendChild(heading);
  if (divider) leftCol.appendChild(divider);
  if (flexRow) leftCol.appendChild(flexRow);

  // Second column: right (quote, svg logo)
  const rightCol = document.createElement('div');
  if (quote) rightCol.appendChild(quote);
  if (svgLogo) rightCol.appendChild(svgLogo);

  // Build the block table
  const headerRow = ['Columns (columns26)'];
  const dataRow = [leftCol, rightCol];
  const cells = [headerRow, dataRow];

  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
