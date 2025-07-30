/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Find the main grid that has the two columns: image and content
  const mainGrid = element.querySelector('.w-layout-grid.grid-layout.desktop-1-column');
  if (!mainGrid) return;
  
  // 2. Get the two direct children columns
  const gridCols = mainGrid.querySelectorAll(':scope > div');
  if (gridCols.length < 2) return;

  // 3. Left cell: this is a div containing a position-relative image
  const leftDiv = gridCols[0];
  const leftImg = leftDiv.querySelector('img');

  // 4. Right cell: this is the card with content
  const rightDiv = gridCols[1];
  // Card content is inside .card-body > .w-layout-grid.grid-layout.desktop-3-column
  const cardGrid = rightDiv.querySelector('.w-layout-grid.grid-layout.desktop-3-column');
  if (!cardGrid) return;
  // This has two children: [image, content]
  const cardCols = cardGrid.querySelectorAll(':scope > *');
  if (cardCols.length < 2) return;

  // 5. Card left image (concert crowd)
  const cardImg = cardCols[0]; // This is an <img>
  // 6. Card right content: heading, feature bullets, button
  const cardContent = cardCols[1];

  // 7. Compose the columns block: 2 columns, left: large image, right: content (image + heading + features + button)
  const headerRow = ['Columns (columns12)'];
  const row = [
    leftImg,
    [cardImg, cardContent]
  ];

  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    row
  ], document);

  element.replaceWith(table);
}
