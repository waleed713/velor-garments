VELOR Garments - how to open
1. Keep ALL these files together in the same folder (no sub-folders).
2. Open the folder in VS Code and run index.html with the Live Server extension (recommended), or double-click index.html in Chrome.
3. Lemon Milk font: put LemonMilk.otf in this same folder. Until then headings use Syncopate.

Files
  index.html, shop.html, product.html, cart.html, checkout.html   pages
  style.css      shared styles + home + cart + checkout
  header.css / header.js     the header (top strip, split nav with categories, mega menu, search, mobile menu)
  shop.css / shop.js         the shop page (products, filters, sticky banners)
  script.js      shared logic: cart, bag drawer, WhatsApp order, footer, home/cart/checkout code
  products.js    ALL products live here (name, category, price, photos) - used by the shop and product pages
  product.css / product.js   the product detail page (gallery, size chart, Add to bag, WhatsApp)
  logo.png

Things to edit
  script.js  -> WA (WhatsApp number), PAY (bank / Easypaisa / JazzCash details), FREE_SHIP and SHIP_FEE
  products.js -> the product list, plus fabric/care text per category (VELOR_INFO)
  product.js -> the size chart numbers (CH)
  header.js  -> top strip text, categories (C) and price links (P)
