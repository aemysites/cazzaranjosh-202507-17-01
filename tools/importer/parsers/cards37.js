/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to collect text content for the card cell
  function extractCardTextContent(card) {
    const frag = document.createDocumentFragment();
    // Heading: h2, h3, or h4
    const heading = card.querySelector('h2, h3, h4');
    if (heading) frag.appendChild(heading);
    // Paragraph (description)
    const desc = card.querySelector('p');
    if (desc) frag.appendChild(desc);
    // CTA button (either .button div or a.button)
    // Only append button if it is not the link wrapper itself
    const button = Array.from(card.querySelectorAll('.button')).find(btn => btn !== card);
    if (button) frag.appendChild(button);
    return frag;
  }

  // Find the main grid containing the cards
  let mainGrid = element.querySelector('.w-layout-grid.grid-layout');
  if (!mainGrid) mainGrid = element;

  // Find all top-level card elements
  let cards = [];
  mainGrid.childNodes.forEach((node) => {
    if (node.nodeType !== 1) return;
    if (/utility-link-content-block/.test(node.className)) {
      cards.push(node);
    } else if (node.classList.contains('w-layout-grid')) {
      node.childNodes.forEach((subnode) => {
        if (subnode.nodeType === 1 && /utility-link-content-block/.test(subnode.className)) {
          cards.push(subnode);
        }
      });
    }
  });

  // Build table rows from cards
  const rows = cards.map(card => {
    // Image in first cell
    let img = null;
    const aspect = card.querySelector('.utility-aspect-1x1, .utility-aspect-2x3');
    if (aspect) {
      img = aspect.querySelector('img');
    }
    const imgCell = img ? img : '';
    // Text cell
    const textCell = extractCardTextContent(card);
    return [imgCell, textCell];
  });

  // Table header must match example exactly
  const tableRows = [["Cards (cards37)"]].concat(rows);
  const block = WebImporter.DOMUtils.createTable(tableRows, document);
  element.replaceWith(block);
}
