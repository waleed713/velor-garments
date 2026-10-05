/* VELOR — shop page: products, category chips, search, price range, sort, sticky banners and scroll effects.
   Uses helpers from script.js: IMG, fmt, esc, addToCart, drawer, lock, unlock, lenis. */
(function () {
  var MAXP = 80000;
  var L = {
    all: "All",
    new: "New in",
    lawn: "Lawn",
    formal: "Formal",
    festive: "Festive",
    bridal: "Bridal",
    casual: "Casual",
  };
  var P = VELOR_PRODUCTS.map(function (x) {
    return { n: x.n, s: x.s, c: x.c, p: x.p, i: x.g[0], a: x.g[1], nw: x.nw };
  });
  /* editorial banners that sit between product rows */
  var E = [
    {
      k: "The Eid edit",
      h: "Made for celebrations",
      t: "Hand finished embroidery, zari and organza for the season ahead.",
      b: "Shop festive",
      c: "festive",
      i: "1631549423660-c10874dc335f",
    },
    {
      k: "Bridal season",
      h: "Heirloom, made new",
      t: "Zardozi and gold work in rich reds, ready to wear for your big day.",
      b: "Shop bridal",
      c: "bridal",
      i: "1721324807083-e9ddaa99310e",
    },
  ];
  var st = { cat: "all", q: "", min: 0, max: MAXP, sort: "featured" },
    trs = [];
  var $ = function (s) {
    return document.querySelector(s);
  };

  /* start from the link (shop.html?cat=lawn&max=8000&q=silk) */
  var u = new URLSearchParams(location.search);
  if (L[u.get("cat")]) st.cat = u.get("cat");
  if (u.get("q")) st.q = u.get("q");
  if (u.get("min")) st.min = Math.max(0, Math.min(MAXP, +u.get("min") || 0));
  if (u.get("max"))
    st.max = Math.max(st.min, Math.min(MAXP, +u.get("max") || MAXP));

  function pass(p, skipCat) {
    var q = st.q.toLowerCase();
    if (
      !skipCat &&
      st.cat !== "all" &&
      !(st.cat === "new" ? p.nw : p.c === st.cat)
    )
      return false;
    if (
      q &&
      (p.n + " " + p.c + (p.nw ? " new" : "")).toLowerCase().indexOf(q) < 0
    )
      return false;
    return p.p >= st.min && p.p <= st.max;
  }
  function card(p) {
    var h = "product.html?p=" + p.s;
    return (
      '<article class="pc"><div class="px"><div class="pi"><img src="' +
      IMG(p.i, 900) +
      '" alt="' +
      esc(p.n) +
      '" loading="lazy" onerror="this.style.opacity=0"><img src="' +
      IMG(p.a, 900) +
      '" alt="" loading="lazy" onerror="this.style.opacity=0"></div>' +
      (p.nw ? '<span class="tag">New</span>' : "") +
      '<a class="pl" href="' +
      h +
      '" aria-label="View ' +
      esc(p.n) +
      '"></a><button class="qa" data-n="' +
      esc(p.n) +
      '">Add to bag</button></div><h3><a href="' +
      h +
      '">' +
      esc(p.n) +
      '</a></h3><div class="m"><span>' +
      L[p.c] +
      "</span><span>" +
      fmt(p.p) +
      "</span></div></article>"
    );
  }
  function ed(e) {
    return (
      '<section class="ed"><div class="edb"><img src="' +
      IMG(e.i, 1600) +
      '" alt=""><div><span class="sm">' +
      e.k +
      "</span><h2>" +
      e.h +
      "</h2><p>" +
      e.t +
      '</p><button class="btn" data-go="' +
      e.c +
      '"><span>' +
      e.b +
      "</span></button></div></div></section>"
    );
  }
  function chips() {
    $("#chips").innerHTML = Object.keys(L)
      .map(function (c) {
        var n = P.filter(function (p) {
          return (
            pass(p, true) && (c === "all" || (c === "new" ? p.nw : p.c === c))
          );
        }).length;
        return (
          '<button class="chip' +
          (st.cat === c ? " on" : "") +
          '" data-c="' +
          c +
          '" aria-pressed="' +
          (st.cat === c) +
          '">' +
          L[c] +
          "<small>" +
          n +
          "</small></button>"
        );
      })
      .join("");
  }
  function pills() {
    var h = "";
    if (st.cat !== "all")
      h +=
        '<span class="pill">' +
        L[st.cat] +
        '<button data-x="cat" aria-label="Remove category">&times;</button></span>';
    if (st.q)
      h +=
        '<span class="pill">&ldquo;' +
        esc(st.q) +
        '&rdquo;<button data-x="q" aria-label="Remove search">&times;</button></span>';
    if (st.min > 0 || st.max < MAXP)
      h +=
        '<span class="pill">' +
        fmt(st.min) +
        " to " +
        fmt(st.max) +
        '<button data-x="price" aria-label="Remove price">&times;</button></span>';
    $("#pills").innerHTML = h;
  }
  function paint() {
    $("#rmin").value = st.min;
    $("#rmax").value = st.max;
    $("#pv1").textContent = fmt(st.min);
    $("#pv2").textContent = fmt(st.max);
    $("#fill").style.left = (st.min / MAXP) * 100 + "%";
    $("#fill").style.width = ((st.max - st.min) / MAXP) * 100 + "%";
    document.querySelectorAll("#qp button").forEach(function (b) {
      b.classList.toggle(
        "on",
        +b.dataset.a === st.min && +b.dataset.b === st.max,
      );
    });
    $("#sq2").value = st.q;
    $("#srt").value = st.sort;
  }
  function url() {
    var s = new URLSearchParams();
    if (st.cat !== "all") s.set("cat", st.cat);
    if (st.q) s.set("q", st.q);
    if (st.min > 0) s.set("min", st.min);
    if (st.max < MAXP) s.set("max", st.max);
    try {
      history.replaceState(
        null,
        "",
        location.pathname + (s.toString() ? "?" + s : ""),
      );
    } catch (e) {}
  }
  function fx() {
    trs.forEach(function (t) {
      t && t.kill();
    });
    trs = [];
    gsap.set(".pc", { opacity: 0, y: 50 });
    trs = trs.concat(
      ScrollTrigger.batch(".pc", {
        start: "top 94%",
        once: true,
        onEnter: function (b) {
          gsap.to(b, {
            opacity: 1,
            y: 0,
            duration: 0.9,
            stagger: 0.08,
            ease: "power3.out",
            overwrite: true,
          });
        },
      }),
    );
    document.querySelectorAll(".pc .px").forEach(function (w) {
      trs.push(
        gsap.fromTo(
          w.querySelector(".pi"),
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
        ).scrollTrigger,
      );
    });
    document.querySelectorAll(".ed").forEach(function (e) {
      trs.push(
        gsap.fromTo(
          e.querySelector("img"),
          { scale: 1.25 },
          {
            scale: 1,
            ease: "none",
            scrollTrigger: {
              trigger: e,
              start: "top bottom",
              end: "bottom bottom",
              scrub: true,
            },
          },
        ).scrollTrigger,
      );
      trs.push(
        gsap.fromTo(
          e.querySelector(".edb>div"),
          { yPercent: 14, opacity: 0.1 },
          {
            yPercent: 0,
            opacity: 1,
            ease: "none",
            scrollTrigger: {
              trigger: e,
              start: "top 55%",
              end: "top 5%",
              scrub: true,
            },
          },
        ).scrollTrigger,
      );
    });
    requestAnimationFrame(function () {
      ScrollTrigger.refresh();
    });
  }
  function render() {
    var list = P.filter(function (p) {
      return pass(p);
    });
    if (st.sort === "low")
      list.sort(function (a, b) {
        return a.p - b.p;
      });
    else if (st.sort === "high")
      list.sort(function (a, b) {
        return b.p - a.p;
      });
    else if (st.sort === "new")
      list.sort(function (a, b) {
        return (b.nw ? 1 : 0) - (a.nw ? 1 : 0);
      });
    var h = "";
    list.forEach(function (p, k) {
      if (k === 6 && list.length > 8) h += ed(E[0]);
      if (k === 15 && list.length > 18) h += ed(E[1]);
      h += card(p);
    });
    $("#pg").innerHTML = h;
    $("#none").hidden = !!list.length;
    $("#rc").textContent =
      list.length + (list.length === 1 ? " piece" : " pieces");
    chips();
    pills();
    paint();
    url();
    fx();
  }
  function reset() {
    st.cat = "all";
    st.q = "";
    st.min = 0;
    st.max = MAXP;
    render();
  }
  function toGrid() {
    var t = $("#grid-top");
    if (window.lenis) lenis.scrollTo(t, { duration: 1.4 });
    else t.scrollIntoView({ behavior: "smooth" });
  }

  /* filters */
  $("#chips").addEventListener("click", function (e) {
    var b = e.target.closest("[data-c]");
    if (b) {
      st.cat = b.dataset.c;
      render();
    }
  });
  $("#pills").addEventListener("click", function (e) {
    var b = e.target.closest("[data-x]");
    if (!b) return;
    if (b.dataset.x === "cat") st.cat = "all";
    else if (b.dataset.x === "q") st.q = "";
    else {
      st.min = 0;
      st.max = MAXP;
    }
    render();
  });
  $("#pg").addEventListener("click", function (e) {
    var q = e.target.closest(".qa"),
      g = e.target.closest("[data-go]");
    if (q) {
      var p = P.filter(function (x) {
        return x.n === q.dataset.n;
      })[0];
      addToCart({ name: p.n, price: p.p, img: p.i });
      drawer(true);
    }
    if (g) {
      st.cat = g.dataset.go;
      render();
      toGrid();
    }
  });
  var tm;
  $("#sq2").addEventListener("input", function (e) {
    clearTimeout(tm);
    var v = e.target.value.trim();
    tm = setTimeout(function () {
      st.q = v;
      render();
    }, 220);
  });
  $("#srt").addEventListener("change", function (e) {
    st.sort = e.target.value;
    render();
  });
  ["#rmin", "#rmax"].forEach(function (id) {
    $(id).addEventListener("input", function (e) {
      var a = +$("#rmin").value,
        b = +$("#rmax").value;
      if (a > b) {
        if (e.target.id === "rmin") a = b;
        else b = a;
      }
      st.min = a;
      st.max = b;
      render();
    });
  });
  $("#qp").addEventListener("click", function (e) {
    var b = e.target.closest("button");
    if (b) {
      st.min = +b.dataset.a;
      st.max = +b.dataset.b;
      render();
    }
  });
  $("#clr").addEventListener("click", reset);
  $("#clr2").addEventListener("click", reset);
  /* mobile filter panel */
  function panel(o) {
    $("#fl").classList.toggle("open", o);
    $("#fov").classList.toggle("open", o);
    o ? lock() : unlock();
  }
  $("#fbtn").addEventListener("click", function () {
    panel(true);
  });
  $("#fx").addEventListener("click", function () {
    panel(false);
  });
  $("#fov").addEventListener("click", function () {
    panel(false);
  });
  /* header search box calls this on the shop page */
  window.velorSearch = function (q) {
    st.q = q;
    render();
    toGrid();
  };

  /* hero: heading rises in, then the shop slides over the pinned photo */
  gsap.from(".sh-in>*", {
    y: 50,
    opacity: 0,
    stagger: 0.12,
    duration: 1.1,
    ease: "power3.out",
    delay: 0.15,
  });
  gsap.to(".sh-in", {
    yPercent: -30,
    opacity: 0,
    ease: "none",
    scrollTrigger: {
      trigger: ".shop-main",
      start: "top bottom",
      end: "top 30%",
      scrub: true,
    },
  });
  gsap.fromTo(
    ".sh-bg .pi",
    { scale: 1 },
    {
      scale: 1.15,
      ease: "none",
      scrollTrigger: {
        trigger: ".shop-main",
        start: "top bottom",
        end: "top top",
        scrub: true,
      },
    },
  );
  /* fabric guide: stacking cards */
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
  document.querySelectorAll(".kd .px").forEach(function (w) {
    gsap.fromTo(
      w.querySelector(".pi"),
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
  gsap.from("#fg", {
    y: 60,
    opacity: 0,
    duration: 1.1,
    ease: "power3.out",
    scrollTrigger: { trigger: "#fg", start: "top 88%" },
  });

  render();
})();
