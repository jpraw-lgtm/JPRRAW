(function () {
  "use strict";
  var C = window.JPR_CONFIG;
  var doc = document.documentElement;
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  doc.classList.add("js");

  /* ---------- helpers ---------- */
  function srcset(p) {
    return C.widths.filter(function (w) { return w <= p.w; }).map(function (w) {
      return C.imageBase + p.file + "-" + w + ".webp " + w + "w";
    }).join(", ");
  }
  function src(p, w) { return C.imageBase + p.file + "-" + Math.min(w, Math.max.apply(null, C.widths.filter(function (x) { return x <= p.w; }))) + ".webp"; }
  function el(tag, cls, attrs) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    for (var k in (attrs || {})) e.setAttribute(k, attrs[k]);
    return e;
  }

  /* ---------- header + menu ---------- */
  var header = $(".site-header"), toggle = $(".menu-toggle"), nav = $("#site-nav");
  function onScroll() { header.classList.toggle("solid", window.scrollY > 40); }
  window.addEventListener("scroll", onScroll, { passive: true }); onScroll();
  function setMenu(open) {
    toggle.setAttribute("aria-expanded", open);
    toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    nav.classList.toggle("open", open);
    doc.classList.toggle("lock", open);
  }
  toggle.addEventListener("click", function () { setMenu(toggle.getAttribute("aria-expanded") !== "true"); });
  nav.addEventListener("click", function (e) { if (e.target.closest("a")) setMenu(false); });

  /* ---------- gallery ---------- */
  var list = $("#gallery"), filters = $("#filters"), photos = C.photos, active = "All";
  var cats = C.categories.filter(function (c) { return photos.some(function (p) { return p.category === c; }); });
  var extra = photos.map(function (p) { return p.category; }).filter(function (c, i, a) { return a.indexOf(c) === i && cats.indexOf(c) < 0; });
  cats = cats.concat(extra);

  photos.forEach(function (p, i) {
    var li = el("li", "tile", { "data-cat": p.category });
    var b = el("button", "tile-btn", { type: "button", "aria-label": "View " + p.title, "data-i": i });
    b.style.setProperty("--ar", p.w + " / " + p.h);
    var img = el("img", "", { src: src(p, 960), srcset: srcset(p), sizes: "(min-width:1100px) 31vw, (min-width:700px) 46vw, 92vw", width: p.w, height: p.h, alt: p.alt, decoding: "async" });
    if (i > 1) img.loading = "lazy";
    img.addEventListener("load", function () { img.classList.add("ready"); });
    if (img.complete) img.classList.add("ready");
    var cap = el("span", "tile-cap"); cap.textContent = p.title;
    b.appendChild(img); b.appendChild(cap); li.appendChild(b); list.appendChild(li);
  });

  if (cats.length > 1) {
    ["All"].concat(cats).forEach(function (c) {
      var b = el("button", "chip", { type: "button", "aria-pressed": c === "All" });
      b.textContent = c; b.dataset.cat = c; filters.appendChild(b);
    });
    filters.addEventListener("click", function (e) {
      var b = e.target.closest(".chip"); if (!b) return;
      active = b.dataset.cat;
      filters.querySelectorAll(".chip").forEach(function (x) { x.setAttribute("aria-pressed", x === b); });
      list.querySelectorAll(".tile").forEach(function (t) { t.hidden = active !== "All" && t.dataset.cat !== active; });
    });
  } else { filters.hidden = true; }

  // subtle reveal
  if ("IntersectionObserver" in window && !reduce) {
    var io = new IntersectionObserver(function (ents) {
      ents.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); } });
    }, { rootMargin: "0px 0px -8% 0px" });
    list.querySelectorAll(".tile").forEach(function (t) { t.classList.add("reveal"); io.observe(t); });
  }

  /* ---------- lightbox ---------- */
  var lb = $("#lightbox"), lbImg = $("#lb-img"), lbCount = $("#lb-count"), lbCap = $("#lb-cap");
  var btnClose = $("#lb-close"), btnPrev = $("#lb-prev"), btnNext = $("#lb-next"), stage = $(".lb-stage");
  var idx = 0, visible = [], lastFocus = null;

  function currentList() {
    return photos.map(function (p, i) { return i; }).filter(function (i) { return active === "All" || photos[i].category === active; });
  }
  function show(pos) {
    pos = (pos + visible.length) % visible.length;
    var p = photos[visible[pos]]; idx = pos;
    lbImg.classList.remove("ready");
    lbImg.alt = p.alt;
    lbImg.srcset = srcset(p); lbImg.sizes = "100vw"; lbImg.src = src(p, 1600);
    lbImg.width = p.w; lbImg.height = p.h;
    lbCount.textContent = (pos + 1) + " / " + visible.length;
    lbCap.textContent = p.title + (p.caption ? " — " + p.caption : "");
    [1, -1].forEach(function (d) { // preload neighbours
      var n = photos[visible[(pos + d + visible.length) % visible.length]]; new Image().src = src(n, 1600);
    });
  }
  lbImg.addEventListener("load", function () { lbImg.classList.add("ready"); });
  function open(i) {
    visible = currentList(); lastFocus = document.activeElement;
    lb.hidden = false; doc.classList.add("lock");
    show(visible.indexOf(i));
    requestAnimationFrame(function () { lb.classList.add("open"); btnClose.focus(); });
  }
  function close() {
    lb.classList.remove("open"); doc.classList.remove("lock");
    var done = function () { lb.hidden = true; if (lastFocus) lastFocus.focus(); };
    reduce ? done() : setTimeout(done, 260);
  }
  list.addEventListener("click", function (e) { var b = e.target.closest(".tile-btn"); if (b) open(+b.dataset.i); });
  btnClose.addEventListener("click", close);
  btnPrev.addEventListener("click", function () { show(idx - 1); });
  btnNext.addEventListener("click", function () { show(idx + 1); });
  lb.addEventListener("click", function (e) { if (e.target === stage || e.target === lb) close(); });

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") { if (!lb.hidden) close(); else if (nav.classList.contains("open")) { setMenu(false); toggle.focus(); } return; }
    if (lb.hidden) return;
    if (e.key === "ArrowRight") show(idx + 1);
    else if (e.key === "ArrowLeft") show(idx - 1);
    else if (e.key === "Tab") { // focus trap
      var f = [btnClose, btnPrev, btnNext], i = f.indexOf(document.activeElement);
      e.preventDefault(); f[(i + (e.shiftKey ? -1 : 1) + f.length) % f.length].focus();
    }
  });

  // swipe: left/right = navigate, down = close
  var sx, sy, tracking = false;
  stage.addEventListener("touchstart", function (e) {
    if (e.touches.length !== 1) { tracking = false; return; }
    tracking = true; sx = e.touches[0].clientX; sy = e.touches[0].clientY;
  }, { passive: true });
  stage.addEventListener("touchend", function (e) {
    if (!tracking) return; tracking = false;
    var t = e.changedTouches[0], dx = t.clientX - sx, dy = t.clientY - sy;
    if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy) * 1.3) show(idx + (dx < 0 ? 1 : -1));
    else if (dy > 90 && Math.abs(dy) > Math.abs(dx) * 1.5) close();
  }, { passive: true });

  /* ---------- about + contact + footer ---------- */
  var a = C.about;
  $("#about-title").textContent = a.heading;
  var ab = $("#about-body");
  a.paragraphs.forEach(function (t) { var p = el("p"); p.textContent = t; ab.appendChild(p); });
  if (a.closing) { var cq = el("p", "closing"); cq.textContent = a.closing; ab.appendChild(cq); }
  if (a.placeholder) { var tag = el("p", "placeholder-tag"); tag.textContent = "Placeholder text — edit in assets/js/portfolio.js"; ab.appendChild(tag); }

  var pl = C.plans;
  function text(tag, cls, t) { var e = el(tag, cls); e.textContent = t; return e; }
  if (pl && pl.groups && pl.groups.length) {
    $("#plans-title").textContent = pl.heading;
    var intro = $("#plans-intro"); if (pl.intro) intro.textContent = pl.intro; else intro.hidden = true;
    var host = $("#plans-groups");
    pl.groups.forEach(function (g) {
      var box = el("div", "plan-group");
      box.appendChild(text("h3", "group-title", g.title));
      if (g.note) box.appendChild(text("p", "group-note", g.note));
      var ul = el("ul", "plans"); ul.style.setProperty("--cols", g.items.length);
      g.items.forEach(function (it) {
        var li = el("li", "plan" + (it.featured ? " featured" : ""));
        if (it.badge) li.appendChild(text("span", "badge", it.badge));
        li.appendChild(text("h4", "", it.name));
        li.appendChild(text("p", "price", it.price));
        if (it.duration) li.appendChild(text("p", "dur", it.duration));
        if (it.description) li.appendChild(text("p", "desc", it.description));
        var inc = el("ul", "incl"); (it.includes || []).forEach(function (t) { inc.appendChild(text("li", "", t)); });
        li.appendChild(inc);
        if (it.ideal) { var id = text("p", "ideal", ""); id.appendChild(text("span", "lbl2", "Ideal for ")); id.appendChild(document.createTextNode(it.ideal)); li.appendChild(id); }
        var a2 = el("a", "cta ulink", { href: "#contact" }); a2.textContent = pl.cta || "Book now"; li.appendChild(a2);
        ul.appendChild(li);
      });
      box.appendChild(ul); host.appendChild(box);
    });
    if (pl.addons) {
      var ad = $("#addons"); ad.appendChild(text("h3", "group-title", pl.addons.title));
      if (pl.addons.note) ad.appendChild(text("p", "group-note", pl.addons.note));
      var al = el("ul", "addon-list");
      pl.addons.items.forEach(function (x) { var li = el("li"); li.appendChild(text("span", "", x.label)); li.appendChild(text("strong", "", x.price)); al.appendChild(li); });
      ad.appendChild(al);
    }
    if (pl.policies) {
      var po = $("#policies"); po.appendChild(text("h3", "group-title", pl.policies.title));
      var pu = el("ul", "incl policy"); pl.policies.items.forEach(function (t) { pu.appendChild(text("li", "", t)); });
      po.appendChild(pu);
    }
  } else { $("#plans").hidden = true; document.querySelector('#site-nav a[href="#plans"]').parentNode.hidden = true; }

  var c = C.contact, cl = $("#contact-list");
  function addLink(label, href, text) {
    var li = el("li"), l = el("a", "ulink", { href: href });
    if (/^https?:/.test(href)) { l.target = "_blank"; l.rel = "noopener noreferrer"; }
    li.innerHTML = '<span class="lbl"></span>'; li.firstChild.textContent = label;
    l.textContent = text; li.appendChild(l); cl.appendChild(li);
  }
  if (c.location) { var lo = el("li"); lo.innerHTML = '<span class="lbl"></span><span class="loc"></span>'; lo.children[0].textContent = "Based in"; lo.children[1].textContent = c.location; cl.appendChild(lo); }
  if (c.instagram) addLink("Instagram", "https://instagram.com/" + c.instagram, "@" + c.instagram);
  if (c.phone) {
    var d10 = c.phone.replace(/\D/g, ""), e164 = "+" + (d10.length === 10 ? "1" : "") + d10;
    var pretty = d10.length === 10 ? "(" + d10.slice(0, 3) + ") " + d10.slice(3, 6) + "-" + d10.slice(6) : c.phone;
    addLink("Text", "sms:" + e164, pretty);
    addLink("Call", "tel:" + e164, pretty);
  }
  if (c.email) addLink("Email", "mailto:" + c.email, c.email);
  if (c.whatsapp) addLink("WhatsApp", "https://wa.me/" + c.whatsapp.replace(/\D/g, ""), "Message on WhatsApp");
  (c.other || []).forEach(function (o) { addLink(o.label, o.url, o.label); });

  $("#year").textContent = new Date().getFullYear();
})();
