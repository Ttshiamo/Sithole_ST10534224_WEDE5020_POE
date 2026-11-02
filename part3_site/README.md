# Hope Community Food Bank Website — Part 3

Live site: https://YOUR-USERNAME.github.io/hope-community-food-bank/
Repository: https://github.com/YOUR-USERNAME/hope-community-food-bank

## Part 3 summary
- **Styling:** the Part 2 design (forest-green theme, panel cards, orange buttons) is embedded as internal CSS in a `<style>` block on every page; there is no external stylesheet.
- **Navigation:** the same navigation bar appears on every page, with the current page highlighted.
- **JavaScript:** accordion (FAQ), tabs (About), modal (donations), lightbox gallery (About), animated counters and scroll-reveal/CSS transitions, mobile menu.
- **Dynamic content:** news/events and the home page "latest news" are generated from a JS array; News & Events has live search, category filter and sorting.
- **Interactive map:** Leaflet + OpenStreetMap on `contact.html`.
- **Forms:** `enquiry.html` and `contact.html` with HTML5 validation (email, phone pattern, date, lengths) plus JavaScript validation, inline error messages, AJAX (`fetch`) submission, honeypot spam field. Contact has a `mailto:` fallback to the recipient set in the form's `data-recipient`.
- **Donation validation:** `donate.html` has a donation form with preset amounts or a custom amount (R10 to R100 000, whole rand only), name pattern, email, optional SA phone number, donation type, required consent checkbox, honeypot and AJAX submit, with accessible inline errors and a thank-you modal.
- **SEO:** unique titles, meta descriptions, keywords, canonical and Open Graph tags, one `<h1>` per page with logical h2/h3, descriptive alt text, clean file names, internal links, `robots.txt`, `sitemap.xml`, `lang` attribute, viewport tag, `loading="lazy"`, Google Fonts `preconnect`.
- **Security:** Content-Security-Policy meta tag, referrer policy, no `innerHTML` (DOM built with `textContent`), form-action restricted, honeypot.

## Changelog
### Part 3
- Split the single page into 7 pages (index, about, donate, news, faq, enquiry, contact).
- Added `script.js`, `robots.txt`, `sitemap.xml`; embedded the Part 2 CSS in each page; removed the mobile menu button because the nav now wraps responsively.

### Feedback from Part 2
Record each correction received from Part 2 here (do not invent feedback):
- **Feedback:** [lecturer feedback]
  - **Change made:** [exact edit]
  - **Files affected:** [files]

## References
- Leaflet. (2023). *Leaflet 1.9.4*. https://leafletjs.com
- OpenStreetMap contributors. https://www.openstreetmap.org/copyright
- Google Fonts. *Poppins*. https://fonts.google.com/specimen/Poppins
- MDN Web Docs. *Constraint validation* & *Fetch API*. https://developer.mozilla.org
- W3C. *WAI-ARIA Authoring Practices: Tabs, Accordion, Dialog*. https://www.w3.org/WAI/ARIA/apg/
- Google. *Search Engine Optimization (SEO) Starter Guide*. https://developers.google.com/search/docs/fundamentals/seo-starter-guide
- Formspree. *AJAX form submission*. https://help.formspree.io
