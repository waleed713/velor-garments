/* VELOR — product detail page: gallery with photo viewer, size picker, size chart, Add to bag, WhatsApp order, related products.
   Uses helpers from script.js: IMG, fmt, esc, addToCart, drawer, waLink, lenis. Data comes from products.js. */
(function () {
  var SZ = ["XS", "S", "M", "L", "XL"],
    L = {
      lawn: "Lawn",
      formal: "Formal",
      festive: "Festive",
      bridal: "Bridal",
      casual: "Casual",
    };
  /* size chart in inches: bust, waist, hip, shirt length. Replace with your real measurements. */
  var CH = [
    ["XS", 32, 26, 35, 38],
    ["S", 34, 28, 37, 38],
    ["M", 36, 30, 39, 39],
    ["L", 38, 32, 41, 39],
    ["XL", 40, 34, 43, 40],
  ];
  var $ = function (s) {
    return document.querySelector(s);
  };
  var root = $("#pdp"),
    slug = new URLSearchParams(location.search).get("p");
  var p = VELOR_PRODUCTS.filter(function (x) {
    return x.s === slug;
  })[0];
  if (!p) {
    root.innerHTML =
      '<div class="empty"><h2>Product not found</h2><p>This piece may have been removed.</p><a class="btn solid" href="shop.html"><span>Back to the shop</span></a></div>';
    return;
  }
  var info = VELOR_INFO[p.c],
    size = "",
    qty = 1;
  document.title = p.n + " — VELOR Garments";

  var gal = p.g
    .map(function (id, k) {
      return (
        '<button class="gi" data-k="' +
        k +
        '" aria-label="Open photo ' +
        (k + 1) +
        " of " +
        p.g.length +
        '"><span class="px"><span class="pi"><img src="' +
        IMG(id, 1200) +
        '" alt="' +
        esc(p.n) +
        " photo " +
        (k + 1) +
        '"' +
        (k ? ' loading="lazy"' : "") +
        ' onerror="this.style.opacity=0"></span></span></button>'
      );
    })
    .join("");
  var rel = VELOR_PRODUCTS.filter(function (x) {
    return x.s !== p.s && x.c === p.c;
  })
    .concat(
      VELOR_PRODUCTS.filter(function (x) {
        return x.c !== p.c;
      }),
    )
    .slice(0, 4);
  var relH = rel
    .map(function (x) {
      var h = "product.html?p=" + x.s;
      return (
        '<article class="pc"><div class="px"><div class="pi"><img src="' +
        IMG(x.g[0], 800) +
        '" alt="' +
        esc(x.n) +
        '" loading="lazy" onerror="this.style.opacity=0"><img src="' +
        IMG(x.g[1], 800) +
        '" alt="" loading="lazy" onerror="this.style.opacity=0"></div><a class="pl" href="' +
        h +
        '" aria-label="View ' +
        esc(x.n) +
        '"></a></div><h3><a href="' +
        h +
        '">' +
        esc(x.n) +
        '</a></h3><div class="m"><span>' +
        L[x.c] +
        "</span><span>" +
        fmt(x.p) +
        "</span></div></article>"
      );
    })
    .join("");

  root.innerHTML =
    '<p class="crumb sm"><a href="index.html">Home</a> / <a href="shop.html">Shop</a> / <a href="shop.html?cat=' +
    p.c +
    '">' +
    L[p.c] +
    "</a> / <span>" +
    esc(p.n) +
    "</span></p>" +
    '<div class="pd-wrap"><div><div class="gal" id="gal">' +
    gal +
    '</div><div class="dots" id="dots">' +
    p.g
      .map(function (_, k) {
        return "<i" + (k ? "" : ' class="on"') + "></i>";
      })
      .join("") +
    "</div></div>" +
    '<div class="info"><div class="info-in">' +
    '<a class="cat sm" href="shop.html?cat=' +
    p.c +
    '">' +
    L[p.c] +
    "</a>" +
    "<h1>" +
    esc(p.n) +
    "</h1>" +
    '<div class="price"><b>' +
    fmt(p.p) +
    "</b>" +
    (p.nw ? '<span class="tag">New</span>' : "") +
    "</div>" +
    '<p class="desc">' +
    info.desc +
    "</p>" +
    '<div class="sz-h"><span class="sm">Size</span><button class="link" id="chart">Size chart</button></div>' +
    '<div class="sizes" id="sizes" role="radiogroup" aria-label="Size">' +
    SZ.map(function (s) {
      return (
        '<button class="sz" role="radio" aria-checked="false" data-s="' +
        s +
        '">' +
        s +
        "</button>"
      );
    }).join("") +
    "</div>" +
    '<p class="err" id="perr" aria-live="polite"></p>' +
    '<div class="buy"><div class="qt2"><button id="qm" aria-label="Decrease quantity">-</button><b id="qn">1</b><button id="qpl" aria-label="Increase quantity">+</button></div><button class="btn solid" id="add"><span>Add to bag</span></button></div>' +
    '<button class="btn full" id="pwa"><span>Order on WhatsApp</span></button>' +
    "</div></div></div>" +
    '<section class="acc"><div><h3>Details</h3><dl><dt>Includes</dt><dd>' +
    info.inc +
    "</dd><dt>Fabric</dt><dd>" +
    info.fabric +
    "</dd></dl></div><div><h3>Fabric and care</h3><p>" +
    info.care +
    "</p></div><div><h3>Delivery and exchange</h3><p>" +
    info.ship +
    ". Free delivery on orders above Rs. 15,000, otherwise Rs. 350. Cash on delivery is available. Unworn pieces with tags can be exchanged within 7 days.</p></div></section>" +
    '<section class="rel"><h2>You may also like</h2><div class="rgrid">' +
    relH +
    "</div></section>" +
    '<div class="sbar" id="sbar"><div><b>' +
    esc(p.n) +
    "</b><span>" +
    fmt(p.p) +
    '</span></div><button class="btn solid" id="sadd"><span>Add to bag</span></button></div>';

  /* size chart popup */
  document.body.insertAdjacentHTML(
    "beforeend",
    '<div class="md" id="szm" role="dialog" aria-modal="true" aria-labelledby="szh" aria-hidden="true"><div class="mb"><button class="mx" id="szx">Close</button><h3 id="szh">Size chart</h3>' +
      '<div class="unit"><button data-u="in" class="on">Inches</button><button data-u="cm">Centimetres</button></div>' +
      '<table class="szt"><thead><tr><th>Size</th><th>Bust</th><th>Waist</th><th>Hip</th><th>Length</th></tr></thead><tbody id="szb"></tbody></table>' +
      '<p class="szn">Measure your bust at the fullest point, your waist at the narrowest point and your hip at the widest point, with the tape snug but not tight. If you are between two sizes, choose the larger one.</p></div></div>' +
      '<div class="lb" id="lb" role="dialog" aria-modal="true" aria-label="Photo viewer" aria-hidden="true"><button class="x" id="lx">Close</button><button class="pv" id="lp" aria-label="Previous photo">Prev</button><img id="li" alt=""><button class="nx" id="ln" aria-label="Next photo">Next</button><span class="ct" id="lc"></span></div>',
  );

  function chart(u) {
    $("#szb").innerHTML = CH.map(function (r) {
      return (
        "<tr>" +
        r
          .map(function (v, i) {
            return (
              "<td>" + (i && u === "cm" ? Math.round(v * 2.54) : v) + "</td>"
            );
          })
          .join("") +
        "</tr>"
      );
    }).join("");
    document.querySelectorAll(".unit button").forEach(function (b) {
      b.classList.toggle("on", b.dataset.u === u);
    });
  }
  chart("in");
  function pop(el, o) {
    el.classList.toggle("open", o);
    el.setAttribute("aria-hidden", String(!o));
    o ? lock() : unlock();
  }
  $("#chart").addEventListener("click", function () {
    pop($("#szm"), true);
  });
  $("#szx").addEventListener("click", function () {
    pop($("#szm"), false);
  });
  $("#szm").addEventListener("click", function (e) {
    if (e.target === this) pop(this, false);
    var b = e.target.closest("[data-u]");
    if (b) chart(b.dataset.u);
  });

  /* photo viewer */
  var cur = 0;
  function show(k) {
    cur = (k + p.g.length) % p.g.length;
    $("#li").src = IMG(p.g[cur], 1600);
    $("#lc").textContent = cur + 1 + " / " + p.g.length;
  }
  function lb(o, k) {
    if (o) show(k || 0);
    pop($("#lb"), o);
  }
  $("#gal").addEventListener("click", function (e) {
    var b = e.target.closest(".gi");
    if (b) lb(true, +b.dataset.k);
  });
  $("#lx").addEventListener("click", function () {
    lb(false);
  });
  $("#lp").addEventListener("click", function () {
    show(cur - 1);
  });
  $("#ln").addEventListener("click", function () {
    show(cur + 1);
  });
  $("#lb").addEventListener("click", function (e) {
    if (e.target === this) lb(false);
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
      if ($("#lb").classList.contains("open")) lb(false);
      if ($("#szm").classList.contains("open")) pop($("#szm"), false);
    }
    if ($("#lb").classList.contains("open")) {
      if (e.key === "ArrowLeft") show(cur - 1);
      if (e.key === "ArrowRight") show(cur + 1);
    }
  });
  /* dots follow the swipe on phones */
  $("#gal").addEventListener("scroll", function () {
    var g = this,
      k = Math.round(g.scrollLeft / (g.scrollWidth / p.g.length));
    document.querySelectorAll("#dots i").forEach(function (d, i) {
      d.classList.toggle("on", i === k);
    });
  });

  /* size, quantity and buying */
  $("#sizes").addEventListener("click", function (e) {
    var b = e.target.closest(".sz");
    if (!b) return;
    size = b.dataset.s;
    document.querySelectorAll(".sz").forEach(function (x) {
      x.setAttribute("aria-checked", String(x === b));
    });
    $("#perr").textContent = "";
  });
  $("#qm").addEventListener("click", function () {
    qty = Math.max(1, qty - 1);
    $("#qn").textContent = qty;
  });
  $("#qpl").addEventListener("click", function () {
    qty = Math.min(10, qty + 1);
    $("#qn").textContent = qty;
  });
  function need() {
    if (size) return false;
    $("#perr").textContent = "Please select a size.";
    var s = $("#sizes");
    s.classList.remove("shake");
    void s.offsetWidth;
    s.classList.add("shake");
    if (window.lenis) lenis.scrollTo(s, { offset: -160, duration: 1 });
    else s.scrollIntoView({ behavior: "smooth", block: "center" });
    return true;
  }
  function add(btn) {
    if (need()) return;
    addToCart({ name: p.n, price: p.p, img: p.g[0], size: size, qty: qty });
    var t = btn.querySelector("span");
    t.textContent = "Added";
    setTimeout(function () {
      t.textContent = "Add to bag";
    }, 1400);
    drawer(true);
  }
  $("#add").addEventListener("click", function () {
    add(this);
  });
  $("#sadd").addEventListener("click", function () {
    add(this);
  });
  $("#pwa").addEventListener("click", function () {
    var m =
      "Hello VELOR, I would like to order:\n\n" +
      p.n +
      (size ? " (Size " + size + ")" : "") +
      " x" +
      qty +
      " = " +
      fmt(p.p * qty) +
      "\n" +
      location.href.split("#")[0];
    window.open(waLink(m), "_blank", "noopener");
  });
  if ("IntersectionObserver" in window)
    new IntersectionObserver(function (en) {
      $("#sbar").classList.toggle(
        "show",
        !en[0].isIntersecting && en[0].boundingClientRect.top < 0,
      );
    }).observe($("#add"));

  /* the info panel stays in view while the photos scroll; if it is taller than the screen it just scrolls normally */
  function fit() {
    var i = document.querySelector(".info");
    i.classList.remove("free");
    var h =
      parseInt(
        getComputedStyle(document.documentElement).getPropertyValue("--hh"),
      ) || 70;
    if (window.innerWidth > 960 && i.offsetHeight > window.innerHeight - h - 48)
      i.classList.add("free");
  }
  fit();
  window.addEventListener("resize", fit);
  window.addEventListener("load", fit);
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(fit);

  /* scroll effects: photos rise in and drift, info fades in, related cards reveal */
  gsap.from(".gi", {
    y: 70,
    opacity: 0,
    duration: 1,
    stagger: 0.12,
    ease: "power3.out",
  });
  gsap.from(".info-in>*", {
    y: 30,
    opacity: 0,
    duration: 0.9,
    stagger: 0.06,
    delay: 0.2,
    ease: "power3.out",
  });
  document.querySelectorAll(".gi .pi").forEach(function (pi) {
    gsap.fromTo(
      pi,
      { yPercent: -8 },
      {
        yPercent: 8,
        ease: "none",
        scrollTrigger: {
          trigger: pi.parentNode,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      },
    );
  });
  gsap.from(".rel h2", {
    y: 50,
    opacity: 0,
    duration: 1,
    ease: "power3.out",
    scrollTrigger: { trigger: ".rel h2", start: "top 90%" },
  });
  gsap.from(".rgrid .pc", {
    y: 60,
    opacity: 0,
    duration: 0.9,
    stagger: 0.1,
    ease: "power3.out",
    scrollTrigger: { trigger: ".rgrid", start: "top 88%" },
  });
})();
