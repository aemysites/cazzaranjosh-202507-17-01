/* global WebImporter */
export default function parse(element, { document }) {
  // Collect tab labels and tab content elements
  const tabMenu = element.querySelector('.w-tab-menu');
  const tabLinks = tabMenu ? Array.from(tabMenu.children) : [];
  const tabContent = element.querySelector('.w-tab-content');
  const tabPanes = tabContent ? Array.from(tabContent.children) : [];

  // Prepare data rows for tabs: [label, content]
  const rows = [];
  for (let i = 0; i < tabLinks.length && i < tabPanes.length; i++) {
    const tabLink = tabLinks[i];
    let tabLabel = '';
    const labelDiv = tabLink.querySelector('div');
    if (labelDiv && labelDiv.textContent) {
      tabLabel = labelDiv.textContent.trim();
    } else {
      tabLabel = tabLink.textContent.trim();
    }
    const tabPane = tabPanes[i];
    // Take the first element child of tabPane (usually the grid block)
    let tabContentElem = null;
    for (const child of tabPane.children) {
      if (child.nodeType === 1) {
        tabContentElem = child;
        break;
      }
    }
    if (!tabContentElem) tabContentElem = tabPane;
    rows.push([tabLabel, tabContentElem]);
  }
  // Header row as a single cell
  const cells = [ ['Tabs'], ...rows ];
  // Create the block table
  const table = WebImporter.DOMUtils.createTable(cells, document);
  // The createTable helper will render the header as a single <th colspan="2"> when first row is length 1 and subsequent rows are length 2
  element.replaceWith(table);
}
