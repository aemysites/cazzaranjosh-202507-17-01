/* global WebImporter */
export default function parse(element, { document }) {
  // Header row as per requirements
  const headerRow = ['Accordion (accordion34)'];
  const rows = [headerRow];

  // Select all immediate accordion items within the block
  const accordionItems = Array.from(element.querySelectorAll(':scope > .accordion, :scope > .w-dropdown'));

  accordionItems.forEach(item => {
    // Title cell: should be the paragraph or main text inside the .w-dropdown-toggle
    let titleEl = item.querySelector('.w-dropdown-toggle .paragraph-lg')
      || item.querySelector('.w-dropdown-toggle')
      || item.querySelector('.paragraph-lg');

    // Content cell: look for rich text or content container inside nav.w-dropdown-list
    let contentNav = item.querySelector('nav.w-dropdown-list, .w-dropdown-list');
    let contentEl = null;
    if (contentNav) {
      // Try to get the rich-text area if it exists
      contentEl = contentNav.querySelector('.rich-text, .w-richtext');
      if (!contentEl) {
        // fallback to first contentful child
        let contentWrapper = contentNav.querySelector('div');
        contentEl = contentWrapper || contentNav;
      }
    }
    // Only push if there's a title or content
    if (titleEl || contentEl) {
      rows.push([
        titleEl || '',
        contentEl || ''
      ]);
    }
  });

  // Create and replace with the table block
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
