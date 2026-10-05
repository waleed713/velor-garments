/* VELOR — header: top strip, split navigation with categories, mega menu, search and mobile menu.
   Loaded before script.js on every page. The bag button (#bag) and its badge (#bc) are driven by script.js. */
(function () {
  if (window.gsap && window.ScrollTrigger) gsap.registerPlugin(ScrollTrigger);
  var home = document.body.dataset.page === "home";
  var C = [
    ["New in", "new"],
    ["Lawn", "lawn"],
    ["Formal", "formal"],
    ["Festive", "festive"],
    ["Bridal", "bridal"],
    ["Casual", "casual"],
  ];
  var P = [
    ["Under Rs. 8,000", "max=8000"],
    ["Rs. 8,000 to 15,000", "min=8000&max=15000"],
    ["Rs. 15,000 to 30,000", "min=15000&max=30000"],
    ["Above Rs. 30,000", "min=30000"],
  ];
  var cl = function (c) {
    return '<a href="shop.html?cat=' + c[1] + '">' + c[0] + "</a>";
  };
  var pl = function (p) {
    return '<a href="shop.html?' + p[1] + '">' + p[0] + "</a>";
  };
  var logo =
    '<a class="logo" href="' +
    (home ? "#top" : "index.html") +
    '" aria-label="VELOR Garments home"><img src="logo.png" alt="VELOR Garments"></a>';
  var sS =
    '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><circle cx="11" cy="11" r="6.5"/><path d="M16 16l4.5 4.5"/></svg>';
  var sB =
    '<svg viewBox="0 0 24 24" width="21" height="21" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 8h14l-1 12H6L5 8z"/><path d="M9 8V6.5a3 3 0 0 1 6 0V8"/></svg>';

  var hd = document.createElement("header");
  hd.className = "hd";
  hd.id = "nav";
  hd.innerHTML =
    '<div class="hd-top"><span>Free delivery on orders above Rs. 15,000</span><span>Cash on delivery across Pakistan</span></div>' +
    '<div class="hd-bar">' +
    '<div class="hd-l"><button class="hd-burger" id="hb" aria-label="Open menu" aria-expanded="false"><i></i><i></i></button>' +
    '<nav aria-label="Primary"><ul>' +
    '<li class="has-mega"><a href="shop.html">Shop</a><div class="mega">' +
    "<div><h4>Shop by category</h4>" +
    C.map(cl).join("") +
    '<a href="shop.html">View everything</a></div>' +
    "<div><h4>Shop by price</h4>" +
    P.map(pl).join("") +
    "</div>" +
    '<a class="mg-card" href="shop.html?cat=festive"><span class="px"><span class="pi"><img data-id="1631549424057-403e75d68e2f" alt="Festive collection"></span></span><b>The festive edit</b><small>Embroidered kurtas and formals</small></a>' +
    "</div></li>" +
    "<li>" +
    cl(C[0]) +
    "</li><li>" +
    cl(C[1]) +
    "</li><li>" +
    cl(C[2]) +
    "</li></ul></nav></div>" +
    logo +
    '<div class="hd-r"><ul><li>' +
    cl(C[3]) +
    "</li><li>" +
    cl(C[4]) +
    "</li><li>" +
    cl(C[5]) +
    "</li></ul>" +
    '<button class="hd-i" id="hsr" aria-label="Search">' +
    sS +
    "</button>" +
    '<button class="hd-i" id="bag" aria-label="Open bag">' +
    sB +
    '<b id="bc">0</b></button></div>' +
    "</div>" +
    '<div class="srch" id="srch"><form id="sf" role="search"><input id="sq" type="search" placeholder="Search dresses, fabrics, categories" aria-label="Search"><button class="btn" type="submit"><span>Search</span></button></form>' +
    '<div class="srch-q"><span class="sm">Popular</span>' +
    C.slice(1).map(cl).join("") +
    "</div></div>";

  var mm = document.createElement("div");
  mm.className = "mm";
  mm.id = "mm";
  mm.setAttribute("aria-hidden", "true");
  mm.innerHTML =
    '<a href="shop.html">Shop all</a>' +
    C.map(cl).join("") +
    "<h4>Shop by price</h4>" +
    P.map(pl).join("");
  document.body.insertAdjacentElement("afterbegin", mm);
  document.body.insertAdjacentElement("afterbegin", hd);

  /* highlight the current category on the shop page */
  var cur = new URLSearchParams(location.search).get("cat");
  if (document.body.dataset.page === "shop" && cur)
    hd.querySelectorAll('a[href="shop.html?cat=' + cur + '"]').forEach(
      function (a) {
        if (!a.closest(".mega")) a.classList.add("on");
      },
    );

  /* mobile menu and search */
  var burger = hd.querySelector("#hb"),
    srch = hd.querySelector("#srch"),
    menuOpen = false,
    srchOpen = false;
  function setMenu(o) {
    menuOpen = o;
    mm.classList.toggle("open", o);
    hd.classList.toggle("menu-open", o);
    burger.setAttribute("aria-expanded", String(o));
    mm.setAttribute("aria-hidden", String(!o));
    if (typeof lock === "function") o ? lock() : unlock();
  }
  function setSrch(o) {
    srchOpen = o;
    srch.classList.toggle("open", o);
    if (o)
      setTimeout(function () {
        hd.querySelector("#sq").focus();
      }, 60);
  }
  burger.addEventListener("click", function () {
    setMenu(!menuOpen);
  });
  mm.addEventListener("click", function (e) {
    if (e.target.closest("a")) setMenu(false);
  });
  hd.querySelector("#hsr").addEventListener("click", function () {
    setSrch(!srchOpen);
  });
  hd.querySelector("#sf").addEventListener("submit", function (e) {
    e.preventDefault();
    var q = hd.querySelector("#sq").value.trim();
    setSrch(false);
    if (window.velorSearch) window.velorSearch(q);
    else location.href = "shop.html" + (q ? "?q=" + encodeURIComponent(q) : "");
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
      if (menuOpen) setMenu(false);
      if (srchOpen) setSrch(false);
    }
  });
  document.addEventListener("click", function (e) {
    if (srchOpen && !e.target.closest(".hd")) setSrch(false);
  });

  /* header height for sticky bars (--hh). The header stays visible while scrolling. */
  function hh() {
    document.documentElement.style.setProperty("--hh", hd.offsetHeight + "px");
  }
  if (window.ResizeObserver) new ResizeObserver(hh).observe(hd);
  hh();
})();
