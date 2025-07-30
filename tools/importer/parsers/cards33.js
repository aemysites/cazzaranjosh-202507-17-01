/* global WebImporter */
export default function parse(element, { document }) {
  const headerRow = ['Cards (cards33)'];
  const rows = [headerRow];

  // Get all card anchors (each card is an <a>)
  const cards = Array.from(element.querySelectorAll(':scope > a'));

  cards.forEach((card) => {
    // First column: image (must be the referenced <img> element)
    const img = card.querySelector('img');

    // Second column: text content
    const textCol = document.createElement('div');
    // Get the text container inside the card
    const cardDetail = card.querySelector('div > div:last-child');

    if (cardDetail) {
      // 1. Meta (tags + read time)
      const meta = cardDetail.querySelector('.flex-horizontal');
      if (meta) {
        // Flatten all meta content, separated by a non-breaking space
        let metaText = [];
        meta.childNodes.forEach((node) => {
          if (node.textContent && node.textContent.trim()) {
            metaText.push(node.textContent.trim());
          }
        });
        if (metaText.length) {
          const metaSpan = document.createElement('span');
          metaSpan.textContent = metaText.join(' \u2022 ');
          textCol.appendChild(metaSpan);
          textCol.appendChild(document.createElement('br'));
        }
      }

      // 2. Title (h3/h4)
      const heading = cardDetail.querySelector('h3, .h4-heading');
      if (heading) {
        // Reference the existing node
        textCol.appendChild(heading);
        textCol.appendChild(document.createElement('br'));
      }

      // 3. Description (p)
      const desc = cardDetail.querySelector('p');
      if (desc) {
        textCol.appendChild(desc);
        textCol.appendChild(document.createElement('br'));
      }

      // 4. Call to Action "Read" (the last div, usually)
      // Only include if it's text "Read" and exists
      // Must be a link with card.href
      const ctaDivs = Array.from(cardDetail.querySelectorAll('div'));
      let ctaDiv = null;
      ctaDivs.forEach((d) => {
        if (d.textContent && d.textContent.trim().toLowerCase() === 'read') {
          ctaDiv = d;
        }
      });
      if (ctaDiv && card.getAttribute('href')) {
        const cta = document.createElement('a');
        cta.href = card.getAttribute('href');
        cta.textContent = 'Read';
        textCol.appendChild(cta);
      }
    }

    // Add the row
    rows.push([img, textCol]);
  });

  const block = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(block);
}
