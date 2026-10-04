/* VELOR Garments — all scripts in one file. Each page only runs its own part. */

/* ===== 1. layout: header, bag drawer, WhatsApp popup, footer ===== */
/* VELOR — shared layout: header (categories), bag drawer, WhatsApp popup and footer.
   Injected on every page so the markup lives in one place. */
(function () {
  var home = document.body.dataset.page === "home",
    H = home ? "" : "index.html";
  var cats = [
    ["New in", "#shop"],
    ["Lawn", "#lawn"],
    ["Formal", "#formal"],
    ["Festive", "#festive"],
    ["Bridal", "#festive"],
    ["Casual", "#lawn"],
  ];
  var li = cats
    .map(function (c) {
      return '<li><a class="nl" href="' + H + c[1] + '">' + c[0] + "</a></li>";
    })
    .join("");
  var fl = cats
    .map(function (c) {
      return '<a href="' + H + c[1] + '">' + c[0] + "</a>";
    })
    .join("");
  var ico = {
    ig: '<svg viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r=".8"/></svg>',
    fb: '<svg viewBox="0 0 24 24"><path d="M14 8h3V4h-3a4 4 0 0 0-4 4v2H7v4h3v6h4v-6h3l1-4h-4V8z"/></svg>',
    wa: '<svg viewBox="0 0 24 24"><path d="M20 11.5a8.5 8.5 0 0 1-12.6 7.4L3 20l1.2-4.2A8.5 8.5 0 1 1 20 11.5z"/><path d="M9 8.5c.3 3 2.5 5.2 5.5 5.5l1-1.3-1.8-.9-.8.6c-.9-.4-1.6-1.1-2-2l.6-.8-.9-1.8z"/></svg>',
  };
  var top =
    '<nav id="nav"><a class="logo" href="' +
    (home ? "#top" : "index.html") +
    '" aria-label="VELOR Garments home"><img src="logo.png" alt="VELOR Garments"></a><ul class="cats sm">' +
    li +
    '</ul><button class="nl sm" id="bag" aria-label="Open bag">Bag (0)</button></nav>' +
    '<div class="ov" id="ov"></div>' +
    '<aside class="dr" id="dr" aria-label="Shopping bag" aria-hidden="true">' +
    '<div class="dh"><h3>Your bag <span id="dn">(0)</span></h3><button id="dx">Close</button></div>' +
    '<div class="di" id="di"></div>' +
    '<div class="df"><div class="sub sm"><span>Subtotal</span><b id="st">Rs. 0</b></div><p class="sm">Shipping is calculated at checkout</p>' +
    '<a class="btn full" href="cart.html"><span>View cart</span></a><a class="btn full solid" href="checkout.html"><span>Checkout</span></a>' +
    '<button class="btn full wa" id="wab"><span>Order on WhatsApp</span></button></div></aside>' +
    '<div class="md" id="md" role="dialog" aria-modal="true" aria-labelledby="mt" aria-hidden="true"><div class="mb"><button class="mx" id="mx">Close</button>' +
    '<h3 id="mt">Order on WhatsApp</h3><p class="sm">Share your details and we will confirm your order on WhatsApp.</p><div class="os" id="os"></div>' +
    '<form id="wf" novalidate><label>Full name<input name="n" autocomplete="name"></label><label>Phone number<input name="p" type="tel" autocomplete="tel"></label>' +
    '<label>City<input name="c" autocomplete="address-level2"></label><label>Delivery address<textarea name="a" rows="2" autocomplete="street-address"></textarea></label>' +
    '<label>Notes (optional)<input name="o"></label><p class="err" id="we" aria-live="polite"></p>' +
    '<button class="btn full solid" type="submit"><span>Send order on WhatsApp</span></button></form></div></div>';

  var foot =
    '<footer class="ft" id="join">' +
    '<div class="ft-top"><div><span class="sm">Newsletter</span><h2>Be first to see every new drop</h2><p>New arrivals, restocks and private offers, once a week. No spam.</p></div>' +
    '<div><form class="nw" id="nf" novalidate><input id="em" type="email" placeholder="Your email address" aria-label="Email address"><button type="submit">Subscribe</button></form><p class="nm" id="nm" aria-live="polite"></p></div></div>' +
    '<div class="ft-mid">' +
    '<div class="ft-brand"><a class="logo" href="' +
    (home ? "#top" : "index.html") +
    '" aria-label="VELOR Garments home"><img src="logo.png" alt="VELOR Garments"></a><p>Ladies ready to wear, made in Pakistan. Premium fabrics, made to fit, delivered in 3 to 5 days.</p>' +
    '<div class="soc"><a href="#" aria-label="Instagram">' +
    ico.ig +
    '</a><a href="#" aria-label="Facebook">' +
    ico.fb +
    '</a><a href="#" data-wa aria-label="WhatsApp">' +
    ico.wa +
    "</a></div></div>" +
    '<div class="ft-col"><h4>Shop</h4>' +
    fl +
    "</div>" +
    '<div class="ft-col"><h4>Help</h4><a href="#">Size guide</a><a href="#">Shipping</a><a href="#">Exchange and returns</a><a href="cart.html">Your bag</a></div>' +
    '<div class="ft-col"><h4>Contact</h4><a href="mailto:hello@velorgarments.com">hello@velorgarments.com</a><a href="#" data-wa>WhatsApp us</a><p>Monday to Saturday<br>10 am to 7 pm</p></div>' +
    "</div>" +
    '<div class="ft-pay"><span class="sm">We accept</span><ul><li>Cash on delivery</li><li>Bank transfer</li><li>Easypaisa</li><li>JazzCash</li></ul></div>' +
    '<div class="wm" id="wm" aria-hidden="true">VELOR</div>' +
    '<div class="ft-bot"><span>&copy; 2026 VELOR Garments. All rights reserved.</span><span><a href="#">Privacy</a><a href="#">Terms</a></span><button id="up">Back to top</button></div>' +
    "</footer>";

  document.body.insertAdjacentHTML("afterbegin", top);
  document.body.insertAdjacentHTML("beforeend", foot);
})();

/* ===== 2. shared: smooth scroll, header, cart, drawer, WhatsApp, footer ===== */
/* VELOR — shared logic: smooth scroll, header, cart store, bag drawer, WhatsApp order, footer */
gsap.registerPlugin(ScrollTrigger);
var $ = function (s) {
    return document.querySelector(s);
  },
  $$ = function (s) {
    return document.querySelectorAll(s);
  };
var HOME = document.body.dataset.page === "home";
var WA =
  "923001234567"; /* your WhatsApp number: country code first, no plus sign */
var FREE_SHIP = 15000,
  SHIP_FEE = 350;
/* Account details shown to the customer after they place an order. Replace with your real details. */
var PAY = {
  "Bank transfer": [
    "Bank: Your bank name",
    "Account title: VELOR Garments",
    "Account number: 0000000000000",
    "IBAN: PK00 XXXX 0000 0000 0000 0000",
  ],
  Easypaisa: [
    "Account title: VELOR Garments",
    "Easypaisa number: 0300 0000000",
  ],
  JazzCash: ["Account title: VELOR Garments", "JazzCash number: 0300 0000000"],
};
var IMG = function (id, w) {
  return (
    "https://images.unsplash.com/photo-" +
    id +
    "?auto=format&fit=crop&w=" +
    w +
    "&q=75"
  );
};
var esc = function (s) {
  return String(s).replace(/[&<>"]/g, function (c) {
    return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c];
  });
};
var fmt = function (v) {
  return "Rs. " + v.toLocaleString("en-US");
};
var waLink = function (t) {
  return "https://wa.me/" + WA + "?text=" + encodeURIComponent(t);
};

$$("img[data-id]").forEach(function (im) {
  im.src = IMG(im.dataset.id, 1500);
  im.onerror = function () {
    im.style.opacity = 0;
  };
});
$$("[data-wa]").forEach(function (a) {
  a.href = "https://wa.me/" + WA;
  a.target = "_blank";
  a.rel = "noopener";
});

/* smooth scroll (the home page starts it after the preloader) */
var lenis = null;
if (window.Lenis) {
  lenis = new Lenis({ lerp: 0.08 });
  if (HOME) lenis.stop();
  lenis.on("scroll", ScrollTrigger.update);
  gsap.ticker.add(function (t) {
    lenis.raf(t * 1000);
  });
  gsap.ticker.lagSmoothing(0);
}
$$('a[href^="#"]').forEach(function (a) {
  a.addEventListener("click", function (e) {
    var h = a.getAttribute("href");
    if (h.length < 2) return;
    e.preventDefault();
    var t = document.querySelector(h);
    if (!t) return;
    if (lenis) lenis.scrollTo(t, { duration: 1.6 });
    else t.scrollIntoView({ behavior: "smooth" });
  });
});

/* header gets a solid background after scrolling (always solid on inner pages) */
var nav = $("#nav");
if (!HOME) nav.classList.add("s");
ScrollTrigger.create({
  start: 60,
  end: "max",
  onUpdate: function (t) {
    nav.classList.toggle("s", !HOME || t.scroll() > 60);
  },
});

/* cart store, shared by every page through localStorage */
var cart = [],
  cartListeners = [];
try {
  cart = JSON.parse(localStorage.getItem("velor_cart")) || [];
} catch (e) {}
var count = function () {
  return cart.reduce(function (a, i) {
    return a + i.qty;
  }, 0);
};
var total = function () {
  return cart.reduce(function (a, i) {
    return a + i.price * i.qty;
  }, 0);
};
var shipping = function () {
  return !cart.length || total() >= FREE_SHIP ? 0 : SHIP_FEE;
};
var itemsText = function () {
  return cart
    .map(function (i, k) {
      return (
        k +
        1 +
        ". " +
        i.name +
        " (Size " +
        i.size +
        ") x" +
        i.qty +
        " = " +
        fmt(i.price * i.qty)
      );
    })
    .join("\n");
};
function cartChanged() {
  try {
    localStorage.setItem("velor_cart", JSON.stringify(cart));
  } catch (e) {}
  drawerRender();
  cartListeners.forEach(function (f) {
    f();
  });
}
function addToCart(p) {
  var f = cart.find(function (i) {
    return i.name === p.name;
  });
  if (f) f.qty++;
  else
    cart.push({ name: p.name, price: p.price, img: p.img, qty: 1, size: "M" });
  cartChanged();
}
function cartAct(a, k) {
  if (!cart[k]) return;
  if (a === "p") cart[k].qty++;
  else if (a === "m") {
    if (--cart[k].qty < 1) cart.splice(k, 1);
  } else cart.splice(k, 1);
  cartChanged();
}
function setSize(k, s) {
  if (cart[k]) {
    cart[k].size = s;
    cartChanged();
  }
}
function clearCart() {
  cart = [];
  cartChanged();
}

/* bag drawer */
var dOpen = false,
  mOpen = false;
function drawerRender() {
  $("#bag").textContent = "Bag (" + count() + ")";
  $("#dn").textContent = "(" + count() + ")";
  $("#st").textContent = fmt(total());
  $("#wab").disabled = !cart.length;
  $("#di").innerHTML = cart.length
    ? cart
        .map(function (i, k) {
          return (
            '<div class="ci"><img src="' +
            IMG(i.img, 240) +
            '" alt=""><div><h4>' +
            esc(i.name) +
            '</h4><span class="sm">' +
            fmt(i.price) +
            '</span><div class="ctl"><select data-k="' +
            k +
            '" aria-label="Size">' +
            ["XS", "S", "M", "L", "XL"]
              .map(function (z) {
                return (
                  "<option" +
                  (z === i.size ? " selected" : "") +
                  ">" +
                  z +
                  "</option>"
                );
              })
              .join("") +
            '</select><span class="qt"><button data-a="m" data-k="' +
            k +
            '" aria-label="Decrease">-</button><b>' +
            i.qty +
            '</b><button data-a="p" data-k="' +
            k +
            '" aria-label="Increase">+</button></span><button class="rm" data-a="r" data-k="' +
            k +
            '">Remove</button></div></div></div>'
          );
        })
        .join("")
    : '<p class="em">Your bag is empty. Add a piece from the collection.</p>';
}
function lock() {
  if (lenis) lenis.stop();
  document.body.classList.add("lock");
}
function unlock() {
  if (!dOpen && !mOpen) {
    if (lenis) lenis.start();
    document.body.classList.remove("lock");
  }
}
function drawer(open) {
  dOpen = open;
  $("#dr").classList.toggle("open", open);
  $("#ov").classList.toggle("open", open);
  $("#dr").setAttribute("aria-hidden", String(!open));
  if (open) {
    lock();
    $("#dx").focus();
  } else unlock();
}
function modal(open) {
  mOpen = open;
  $("#md").classList.toggle("open", open);
  $("#md").setAttribute("aria-hidden", String(!open));
  if (open) {
    lock();
    $("#os").innerHTML =
      cart
        .map(function (i) {
          return (
            "<div><span>" +
            esc(i.name) +
            " (" +
            i.size +
            ") x" +
            i.qty +
            "</span><span>" +
            fmt(i.price * i.qty) +
            "</span></div>"
          );
        })
        .join("") +
      '<div class="tt"><span>Subtotal</span><span>' +
      fmt(total()) +
      "</span></div>";
    $("#we").textContent = "";
  } else unlock();
}
$("#bag").addEventListener("click", function () {
  var p = $("#pre");
  if (!p || p.style.display === "none") drawer(true);
});
$("#dx").addEventListener("click", function () {
  drawer(false);
});
$("#ov").addEventListener("click", function () {
  drawer(false);
});
$("#di").addEventListener("click", function (e) {
  var b = e.target.closest("[data-a]");
  if (b) cartAct(b.dataset.a, +b.dataset.k);
});
$("#di").addEventListener("change", function (e) {
  if (e.target.dataset.k !== undefined)
    setSize(+e.target.dataset.k, e.target.value);
});
$("#wab").addEventListener("click", function () {
  if (cart.length) modal(true);
});
$("#mx").addEventListener("click", function () {
  modal(false);
});
$("#md").addEventListener("click", function (e) {
  if (e.target === this) modal(false);
});
document.addEventListener("keydown", function (e) {
  if (e.key === "Escape") {
    if (mOpen) modal(false);
    else if (dOpen) drawer(false);
  }
});
$("#wf").addEventListener("submit", function (e) {
  e.preventDefault();
  var f = e.target,
    v = function (k) {
      return f.elements[k].value.trim();
    },
    er = $("#we");
  if (!v("n")) return (er.textContent = "Enter your full name.");
  if (v("p").replace(/\D/g, "").length < 10)
    return (er.textContent = "Enter a valid phone number.");
  if (!v("a")) return (er.textContent = "Enter your delivery address.");
  var msg =
    "Hello VELOR, I would like to place an order:\n\n" +
    itemsText() +
    "\n\nSubtotal: " +
    fmt(total()) +
    "\n\nName: " +
    v("n") +
    "\nPhone: " +
    v("p") +
    "\nCity: " +
    v("c") +
    "\nAddress: " +
    v("a") +
    (v("o") ? "\nNotes: " + v("o") : "");
  window.open(waLink(msg), "_blank", "noopener");
  modal(false);
});
/* add to bag buttons on product cards */
$$(".q").forEach(function (b) {
  b.addEventListener("click", function () {
    var pd = b.closest(".pd");
    addToCart({
      name: pd.querySelector("h3").textContent,
      price: parseInt(pd.querySelector("p").textContent.replace(/\D/g, ""), 10),
      img: pd.querySelector("img").dataset.id,
    });
    drawer(true);
  });
});
drawerRender();

/* footer */
$("#nf").addEventListener("submit", function (e) {
  e.preventDefault();
  var i = $("#em"),
    m = $("#nm");
  if (/^\S+@\S+\.\S+$/.test(i.value)) {
    m.textContent = "You are subscribed. Thank you.";
    i.value = "";
  } else m.textContent = "Enter a valid email address.";
});
$("#up").addEventListener("click", function () {
  if (lenis) lenis.scrollTo(0, { duration: 1.8 });
  else window.scrollTo({ top: 0, behavior: "smooth" });
});
gsap.from("#wm", {
  yPercent: 40,
  opacity: 0.2,
  ease: "none",
  scrollTrigger: {
    trigger: ".ft",
    start: "top bottom",
    end: "bottom bottom",
    scrub: true,
  },
});
gsap.from(".ft-mid>*", {
  y: 40,
  opacity: 0,
  stagger: 0.12,
  duration: 1,
  ease: "power3.out",
  scrollTrigger: { trigger: ".ft-mid", start: "top 88%" },
});
window.addEventListener("load", function () {
  ScrollTrigger.refresh();
});

/* ===== 3. home page ===== */
/* VELOR — home page animations: curtain preloader, pinned scroll story, section effects */
if (HOME)
  (function () {
    /* initial states */
    gsap.set(
      [
        "#g1",
        "#g2",
        "#g3",
        "#g4",
        "#t1",
        "#t2",
        "#t3",
        "#t4",
        "#p2",
        "#p3",
        "#p4",
      ],
      { opacity: 0 },
    );
    gsap.set("#hc", { opacity: 0 });
    gsap.set("#nav,#cn", { opacity: 0 });

    /* preloader: curtains part */
    var o = { v: 0 },
      c = $("#cnt");
    gsap
      .timeline()
      .to(o, {
        v: 100,
        duration: 2.2,
        ease: "power2.inOut",
        onUpdate: function () {
          c.textContent = String(Math.round(o.v)).padStart(3, "0");
        },
      })
      .to("#pc", { opacity: 0, duration: 0.5 })
      .to(".rod", { opacity: 0, duration: 0.6 }, "open")
      .to(
        ".cur.l",
        { scaleX: 0.1, duration: 1.8, ease: "power3.inOut" },
        "open",
      )
      .to(
        ".cur.r",
        { scaleX: 0.1, duration: 1.8, ease: "power3.inOut" },
        "open",
      )
      .from("#hi", { scale: 1.35, duration: 2.4, ease: "power3.out" }, "open")
      .to("#hc", { opacity: 1, duration: 1.2 }, "open+=1.2")
      .to("#nav,#cn", { opacity: 1, duration: 1 }, "open+=1.4")
      .add(function () {
        $("#pre").style.display = "none";
        document.body.classList.remove("lock");
        if (lenis) {
          lenis.start();
          try {
            if (location.hash.length > 1 && $(location.hash))
              lenis.scrollTo(location.hash, { immediate: true });
          } catch (e) {}
        }
        ScrollTrigger.refresh();
      }, "open+=1.9");

    /* the pinned scroll story (same scenes as the reference) */
    var tl = gsap.timeline({
      defaults: { ease: "none" },
      scrollTrigger: {
        trigger: "#stage",
        start: "top top",
        end: "+=850%",
        scrub: 1,
        pin: true,
        anticipatePin: 1,
        onUpdate: function (s) {
          var p = s.progress,
            n = p < 0.09 ? 1 : p < 0.28 ? 2 : p < 0.5 ? 3 : p < 0.73 ? 4 : 5;
          $("#cn").textContent = "0" + n + " / 05";
          $("#cn").classList.toggle("h", p > 0.985);
        },
      },
    });
    function gl(el, at) {
      tl.fromTo(
        el,
        { opacity: 0, x: -16, textShadow: "8px 0 #6f8cff,-8px 0 #ffffff" },
        {
          opacity: 1,
          x: 0,
          textShadow: "0px 0 rgba(111,140,255,0),0px 0 rgba(255,255,255,0)",
          duration: 0.7,
        },
        at,
      );
    }
    function out(el, at, vars) {
      tl.to(el, Object.assign({ opacity: 0, duration: 0.5 }, vars || {}), at);
    }

    /* hero slides away while its photo zooms */
    tl.to("#hero", { yPercent: -100, duration: 1.1, ease: "power2.inOut" }, 0)
      .to("#hi", { scale: 1.35, duration: 1.1 }, 0)
      .to("#hc", { opacity: 0, duration: 0.35 }, 0);
    /* 01 statement */
    tl.fromTo(
      "#g1",
      { x: "-30vw", y: "45vh", opacity: 0 },
      { x: 0, y: 0, opacity: 1, duration: 1.6 },
      0.6,
    );
    gl("#t1", 1.2);
    out("#t1", 2.2);
    tl.to("#g1", { x: "-40vw", opacity: 0, duration: 0.9 }, 2.2);
    /* 02 fabric: panel grows from a small window */
    tl.fromTo(
      "#p2",
      { scale: 0.3, opacity: 0, clipPath: "inset(35% 35% 35% 35%)" },
      { scale: 1, opacity: 1, clipPath: "inset(0% 0% 0% 0%)", duration: 1.5 },
      2.1,
    ).fromTo(
      "#g2",
      { x: "25vw", opacity: 0 },
      { x: 0, opacity: 1, duration: 1.3 },
      2.2,
    );
    gl("#t2", 2.9);
    tl.to("#p2", { yPercent: -130, duration: 1, ease: "power2.in" }, 3.9);
    out("#t2", 3.9);
    tl.to("#g2", { x: "-35vw", opacity: 0, duration: 0.9 }, 3.9);
    /* 03 individual: vertical word rises, portrait slides in */
    tl.fromTo(
      "#g3",
      { yPercent: 120, opacity: 0 },
      { yPercent: 0, opacity: 1, duration: 1.4 },
      3.7,
    ).fromTo(
      "#p3",
      { xPercent: 130, opacity: 0, filter: "blur(14px)" },
      { xPercent: 0, opacity: 1, filter: "blur(0px)", duration: 1.3 },
      3.9,
    );
    gl("#t3", 4.4);
    tl.to("#p3", { yPercent: -130, duration: 1, ease: "power2.in" }, 5.5);
    out("#t3", 5.5);
    tl.to("#g3", { yPercent: -130, opacity: 0, duration: 1 }, 5.5);
    /* 04 collection 001 */
    tl.fromTo(
      "#g4",
      { x: "-35vw", y: "35vh", opacity: 0 },
      { x: 0, y: 0, opacity: 1, duration: 1.4 },
      5.4,
    ).fromTo(
      "#p4",
      { scale: 0.4, opacity: 0, clipPath: "inset(30% 30% 30% 30%)" },
      { scale: 1, opacity: 1, clipPath: "inset(0% 0% 0% 0%)", duration: 1.4 },
      5.5,
    );
    gl("#t4", 6.3);
    tl.to({}, { duration: 0.9 }, 7.1);

    /* sections after the story */
    document.querySelectorAll("[data-y]").forEach(function (el) {
      var y = +el.dataset.y;
      if (y)
        gsap.to(el, {
          y: y,
          ease: "none",
          scrollTrigger: {
            trigger: el,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
    });
    document.querySelectorAll(".cl").forEach(function (el, i) {
      gsap.from(el, {
        clipPath: "inset(100% 0% 0% 0%)",
        duration: 1.4,
        ease: "power4.out",
        delay: i * 0.1,
        scrollTrigger: { trigger: el, start: "top 92%" },
      });
    });
    document.querySelectorAll(".rv").forEach(function (el) {
      gsap.from(el, {
        y: 60,
        opacity: 0,
        duration: 1.1,
        ease: "power3.out",
        scrollTrigger: { trigger: el, start: "top 88%" },
      });
    });
    document.querySelectorAll(".px").forEach(function (w) {
      var p = w.querySelector(".pi");
      if (p)
        gsap.fromTo(
          p,
          { yPercent: -8 },
          {
            yPercent: 8,
            ease: "none",
            scrollTrigger: {
              trigger: w,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          },
        );
    });
    var kd = document.querySelectorAll(".kd");
    kd.forEach(function (k, i) {
      if (i < kd.length - 1)
        gsap.to(k, {
          scale: 0.9,
          opacity: 0.35,
          ease: "none",
          scrollTrigger: {
            trigger: kd[i + 1],
            start: "top 85%",
            end: "top 13%",
            scrub: true,
          },
        });
    });
    gsap.fromTo(
      ".bi",
      { yPercent: -8 },
      {
        yPercent: 8,
        ease: "none",
        scrollTrigger: {
          trigger: ".bn",
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      },
    );
  })();

/* ===== 4. cart page ===== */
/* VELOR — cart page */
if (document.body.dataset.page === "cart")
  (function () {
    var sizes = ["XS", "S", "M", "L", "XL"];
    function row(i, k) {
      var o = sizes
        .map(function (z) {
          return (
            "<option" +
            (z === i.size ? " selected" : "") +
            ">" +
            z +
            "</option>"
          );
        })
        .join("");
      return (
        '<article class="cr"><img src="' +
        IMG(i.img, 300) +
        '" alt=""><div><h3>' +
        esc(i.name) +
        '</h3><span class="sm">' +
        fmt(i.price) +
        " each</span>" +
        '<div class="ctl"><select data-k="' +
        k +
        '" aria-label="Size">' +
        o +
        '</select><span class="qt"><button data-a="m" data-k="' +
        k +
        '" aria-label="Decrease">-</button><b>' +
        i.qty +
        '</b><button data-a="p" data-k="' +
        k +
        '" aria-label="Increase">+</button></span></div></div>' +
        '<div class="lt"><b>' +
        fmt(i.price * i.qty) +
        '</b><button class="rm" data-a="r" data-k="' +
        k +
        '">Remove</button></div></article>'
      );
    }
    function render() {
      $("#cw").classList.toggle("is-empty", !cart.length);
      if (!cart.length) {
        $("#cl").innerHTML =
          '<div class="empty"><h2>Your bag is empty</h2><p>Add a piece from the collection and it will show up here.</p><a class="btn solid" href="index.html#shop"><span>Continue shopping</span></a></div>';
        $("#sm").innerHTML = "";
        return;
      }
      var t = total(),
        left = FREE_SHIP - t,
        pct = Math.min(100, (t / FREE_SHIP) * 100);
      $("#cl").innerHTML =
        '<div class="fs">' +
        (left > 0
          ? "Add <b>" + fmt(left) + "</b> more for free delivery"
          : "You have free delivery") +
        '<i><b style="width:' +
        pct +
        '%"></b></i></div>' +
        cart.map(row).join("") +
        '<a class="back nl" href="index.html#shop">Continue shopping</a>';
      $("#sm").innerHTML =
        '<h2>Order summary</h2><div class="sr"><span>Subtotal</span><span>' +
        fmt(t) +
        '</span></div><div class="sr"><span>Delivery</span><span>' +
        (shipping() ? fmt(shipping()) : "Free") +
        '</span></div><div class="sr t"><span>Total</span><span>' +
        fmt(t + shipping()) +
        "</span></div>" +
        '<a class="btn full solid" href="checkout.html"><span>Checkout</span></a><button class="btn full wa" id="cwa"><span>Order on WhatsApp</span></button><p class="sm">Cash on delivery available</p>';
      $("#cwa").addEventListener("click", function () {
        modal(true);
      });
    }
    $("#cl").addEventListener("click", function (e) {
      var b = e.target.closest("[data-a]");
      if (b) cartAct(b.dataset.a, +b.dataset.k);
    });
    $("#cl").addEventListener("change", function (e) {
      if (e.target.dataset.k !== undefined)
        setSize(+e.target.dataset.k, e.target.value);
    });
    cartListeners.push(render);
    render();
  })();

/* ===== 5. checkout page ===== */
/* VELOR — checkout page (no payment gateway yet: the order is saved in the browser and confirmed on WhatsApp) */
if (document.body.dataset.page === "checkout")
  (function () {
    var done = false;
    $("#pv").innerHTML = [
      "Punjab",
      "Sindh",
      "Khyber Pakhtunkhwa",
      "Balochistan",
      "Islamabad Capital Territory",
      "Azad Jammu and Kashmir",
      "Gilgit-Baltistan",
    ]
      .map(function (p) {
        return "<option>" + p + "</option>";
      })
      .join("");

    function summary() {
      if (done) return;
      if (!cart.length) {
        $("#co").hidden = true;
        $("#ey").hidden = false;
        return;
      }
      $("#co").hidden = false;
      $("#ey").hidden = true;
      $("#oi").innerHTML = cart
        .map(function (i) {
          return (
            '<div class="oi"><div class="th"><img src="' +
            IMG(i.img, 200) +
            '" alt=""><em>' +
            i.qty +
            "</em></div><div><b>" +
            esc(i.name) +
            '</b><span class="sm">Size ' +
            i.size +
            "</span></div><span>" +
            fmt(i.price * i.qty) +
            "</span></div>"
          );
        })
        .join("");
      $("#ot").innerHTML =
        '<div class="sr"><span>Subtotal</span><span>' +
        fmt(total()) +
        '</span></div><div class="sr"><span>Delivery</span><span>' +
        (shipping() ? fmt(shipping()) : "Free") +
        '</span></div><div class="sr t"><span>Total</span><span>' +
        fmt(total() + shipping()) +
        "</span></div>";
    }
    cartListeners.push(summary);
    summary();

    function fail(msg, field) {
      $("#ce").textContent = msg;
      field.focus();
    }
    $("#cf").addEventListener("submit", function (e) {
      e.preventDefault();
      var f = e.target.elements,
        v = function (k) {
          return f[k].value.trim();
        };
      if (!v("name")) return fail("Enter your full name.", f.name);
      if (v("phone").replace(/\D/g, "").length < 10)
        return fail("Enter a valid phone number.", f.phone);
      if (v("email") && !/^\S+@\S+\.\S+$/.test(v("email")))
        return fail("Enter a valid email address or leave it empty.", f.email);
      if (!v("address")) return fail("Enter your street address.", f.address);
      if (!v("city")) return fail("Enter your city.", f.city);
      $("#ce").textContent = "";
      var o = {
        id: "VLR-" + Date.now().toString(36).toUpperCase(),
        date: new Date().toISOString(),
        items: cart.slice(),
        subtotal: total(),
        shipping: shipping(),
        pay: f.pay.value,
        customer: {
          name: v("name"),
          phone: v("phone"),
          email: v("email"),
          address: v("address"),
          city: v("city"),
          province: f.province.value,
          zip: v("zip"),
          notes: v("notes"),
        },
      };
      o.total = o.subtotal + o.shipping;
      try {
        var all = JSON.parse(localStorage.getItem("velor_orders")) || [];
        all.push(o);
        localStorage.setItem("velor_orders", JSON.stringify(all));
      } catch (x) {}
      var c = o.customer,
        msg =
          "Hello VELOR, I just placed order " +
          o.id +
          ":\n\n" +
          itemsText() +
          "\n\nSubtotal: " +
          fmt(o.subtotal) +
          "\nDelivery: " +
          (o.shipping ? fmt(o.shipping) : "Free") +
          "\nTotal: " +
          fmt(o.total) +
          "\nPayment: " +
          o.pay +
          "\n\nName: " +
          c.name +
          "\nPhone: " +
          c.phone +
          "\nAddress: " +
          c.address +
          ", " +
          c.city +
          ", " +
          c.province +
          (c.notes ? "\nNotes: " + c.notes : "");
      var lines = o.items
        .map(function (i) {
          return (
            '<div class="sr"><span>' +
            esc(i.name) +
            " (" +
            i.size +
            ") x" +
            i.qty +
            "</span><span>" +
            fmt(i.price * i.qty) +
            "</span></div>"
          );
        })
        .join("");
      var pi = PAY[o.pay]
        ? '<div class="payinfo"><b>Pay by ' +
          esc(o.pay) +
          "</b>" +
          PAY[o.pay]
            .map(function (l) {
              return "<p>" + esc(l) + "</p>";
            })
            .join("") +
          "<p>After paying, send the screenshot on WhatsApp with your order number.</p></div>"
        : "";
      done = true;
      clearCart();
      $("#ok").innerHTML =
        '<span class="sm">Order received</span><h2>Thank you, ' +
        esc(c.name.split(" ")[0]) +
        ".</h2><p>Your order number is <b>" +
        o.id +
        "</b>. Confirm it on WhatsApp and we will get your order ready.</p>" +
        pi +
        '<div class="sum">' +
        lines +
        '<div class="sr"><span>Delivery</span><span>' +
        (o.shipping ? fmt(o.shipping) : "Free") +
        '</span></div><div class="sr t"><span>Total</span><span>' +
        fmt(o.total) +
        '</span></div><div class="sr"><span>Payment</span><span>' +
        esc(o.pay) +
        "</span></div></div>" +
        '<a class="btn solid" target="_blank" rel="noopener" href="' +
        waLink(msg) +
        '"><span>Confirm on WhatsApp</span></a> <a class="btn" href="index.html#shop"><span>Continue shopping</span></a>';
      $("#co").hidden = true;
      $("#ey").hidden = true;
      $("#ok").hidden = false;
      if (lenis) lenis.scrollTo(0, { immediate: true });
      else window.scrollTo(0, 0);
    });
  })();
