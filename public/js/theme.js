function _typeof(e) {
  return (_typeof =
    "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
      ? function (e) {
          return typeof e;
        }
      : function (e) {
          return e &&
            "function" == typeof Symbol &&
            e.constructor === Symbol &&
            e !== Symbol.prototype
            ? "symbol"
            : typeof e;
        })(e);
}
/**
 * Bandicoot | Bootstrap E-Commerce Template
 * Copyright 2021 Bandicoot Studio
 * Theme core scripts
 *
 * @author Bandicoot Studio
 * @version 2.3.0
 */
!(function () {
  "use strict";
  var t, r, a, n, o, l, e;
  null != (r = document.querySelector(".navbar-sticky")) &&
    (r.classList,
    (t = r.offsetHeight),
    window.addEventListener("scroll", function (e) {
      500 < e.currentTarget.pageYOffset
        ? ((document.body.style.paddingTop = t + "px"),
          r.classList.add("navbar-stuck"))
        : ((document.body.style.paddingTop = ""),
          r.classList.remove("navbar-stuck"));
    })),
    (e = document.querySelector(".navbar-stuck-toggler")),
    (a = document.querySelector(".navbar-stuck-menu")),
    null != e &&
      e.addEventListener("click", function (e) {
        a.classList.toggle("show"), e.preventDefault();
      }),
    (function () {
      var e,
        t = document.querySelectorAll(".masonry-grid");
      if (null !== t)
        for (var r = 0; r < t.length; r++)
          (e = new Shuffle(t[r], {
            itemSelector: ".masonry-grid-item",
            sizer: ".masonry-grid-item",
          })),
            imagesLoaded(t[r]).on("progress", function () {
              e.layout();
            });
    })(),
    (function () {
      for (
        var r = document.querySelectorAll(".password-toggle"), e = 0;
        e < r.length;
        e++
      )
        !(function (e) {
          var t = r[e].querySelector(".form-control");
          r[e].querySelector(".password-toggle-btn").addEventListener(
            "click",
            function (e) {
              "checkbox" === e.target.type &&
                (e.target.checked ? (t.type = "text") : (t.type = "password"));
            },
            !1
          );
        })(e);
    })(),      
    new SmoothScroll("[data-scroll]", {
      speed: 800,
      speedAsDuration: !0,
      offset: 40,
      header: "[data-scroll-header]",
      updateURL: !1,
    }),
    null != (o = document.querySelector(".btn-scroll-top")) &&
      ((n = parseInt(600, 10)),
      window.addEventListener("scroll", function (e) {
        e.currentTarget.pageYOffset > n
          ? o.classList.add("show")
          : o.classList.remove("show");
      })),
    [].slice
      .call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
      .map(function (e) {
        return new bootstrap.Tooltip(e, { trigger: "hover" });
      }),
    [].slice
      .call(document.querySelectorAll('[data-bs-toggle="popover"]'))
      .map(function (e) {
        return new bootstrap.Popover(e);
      }),
    [].slice.call(document.querySelectorAll(".toast")).map(function (e) {
      return new bootstrap.Toast(e);
    }),
    (function () {
      for (
        var e = document.querySelectorAll(".disable-autohide .form-select"),
          t = 0;
        t < e.length;
        t++
      )
        e[t].addEventListener("click", function (e) {
          e.stopPropagation();
        });
    })(),
    (function (e, t, r) {
      for (var a = 0; a < e.length; a++) t.call(r, a, e[a]);
    })(
      document.querySelectorAll(".tns-carousel .tns-carousel-inner"),
      function (e, t) {
        var r = {
          container: t,
          controlsText: [
            '<i className="ci-arrow-left"></i>',
            '<i className="ci-arrow-right"></i>',
          ],
          navPosition: "bottom",
          mouseDrag: !0,
          speed: 500,
          autoplayHoverPause: !0,
          autoplayButtonOutput: !1,
        };
        null != t.dataset.carouselOptions &&
          (a = JSON.parse(t.dataset.carouselOptions));
        var a = Object.assign({}, r, a);
        tns(a);
      }
    ),
    (function () {
      function o(e, t) {
        return e + t;
      }
      var e = document.querySelectorAll("[data-line-chart]"),
        t = document.querySelectorAll("[data-bar-chart]"),
        l = document.querySelectorAll("[data-pie-chart]");
      if (0 !== e.length || 0 !== t.length || 0 !== l.length) {
        var s,
          r = document.head || document.getElementsByTagName("head")[0],
          c = document.createElement("style");
        r.appendChild(c);
        for (var a = 0; a < e.length; a++) {
          var n,
            i = JSON.parse(e[a].dataset.lineChart),
            d =
              null != e[a].dataset.options
                ? JSON.parse(e[a].dataset.options)
                : "",
            u = e[a].dataset.seriesColor;
          if ((e[a].classList.add("line-chart-" + a), null != u)) {
            n = JSON.parse(u);
            for (var f = 0; f < n.colors.length; f++)
              (s = "\n          .line-chart-"
                .concat(a, " .ct-series:nth-child(")
                .concat(f + 1, ") .ct-line,\n          .line-chart-")
                .concat(a, " .ct-series:nth-child(")
                .concat(f + 1, ") .ct-point {\n            stroke: ")
                .concat(n.colors[f], " !important;\n          }\n        ")),
                c.appendChild(document.createTextNode(s));
          }
          new Chartist.Line(e[a], i, d);
        }
        for (var m = 0; m < t.length; m++) {
          var v,
            p = JSON.parse(t[m].dataset.barChart),
            g =
              null != t[m].dataset.options
                ? JSON.parse(t[m].dataset.options)
                : "",
            h = t[m].dataset.seriesColor;
          if ((t[m].classList.add("bar-chart-" + m), null != h)) {
            v = JSON.parse(h);
            for (var y = 0; y < v.colors.length; y++)
              (s = "\n        .bar-chart-"
                .concat(m, " .ct-series:nth-child(")
                .concat(y + 1, ") .ct-bar {\n            stroke: ")
                .concat(v.colors[y], " !important;\n          }\n        ")),
                c.appendChild(document.createTextNode(s));
          }
          new Chartist.Bar(t[m], p, g);
        }
        for (var S = 0; S < l.length; S++)
          !(function (e) {
            var t,
              r = JSON.parse(l[e].dataset.pieChart),
              a = l[e].dataset.seriesColor;
            if ((l[e].classList.add("cz-pie-chart-" + e), null != a)) {
              t = JSON.parse(a);
              for (var n = 0; n < t.colors.length; n++)
                (s = "\n        .cz-pie-chart-"
                  .concat(e, " .ct-series:nth-child(")
                  .concat(n + 1, ") .ct-slice-pie {\n            fill: ")
                  .concat(t.colors[n], " !important;\n          }\n        ")),
                  c.appendChild(document.createTextNode(s));
            }
            new Chartist.Pie(l[e], r, {
              labelInterpolationFnc: function (e) {
                return Math.round((e / r.series.reduce(o)) * 100) + "%";
              },
            });
          })(S);
      }
    })(),
    (function () {
      var e = document.querySelectorAll('[data-bs-toggle="video"]');
      if (e.length)
        for (var t = 0; t < e.length; t++)
          lightGallery(e[t], {
            selector: "this",
            download: !1,
            videojs: !0,
            youtubePlayerParams: {
              modestbranding: 1,
              showinfo: 0,
              rel: 0,
            },
            vimeoPlayerParams: {
              byline: 0,
              portrait: 0,
              color: "fe696a",
            },
          });
    })(),
    (function () {
      for (
        var n = document.querySelectorAll(".range-slider"), e = 0;
        e < n.length;
        e++
      )
        !(function (e) {
          var t = n[e].querySelector(".range-slider-ui"),
            r = n[e].querySelector(".range-slider-value-min"),
            a = n[e].querySelector(".range-slider-value-max"),
            e = {
              dataStartMin: parseInt(n[e].dataset.startMin, 10),
              dataStartMax: parseInt(n[e].dataset.startMax, 10),
              dataMin: parseInt(n[e].dataset.min, 10),
              dataMax: parseInt(n[e].dataset.max, 10),
              dataStep: parseInt(n[e].dataset.step, 10),
            };
          noUiSlider.create(t, {
            start: [e.dataStartMin, e.dataStartMax],
            connect: !0,
            step: e.dataStep,
            pips: { mode: "count", values: 5 },
            tooltips: !0,
            range: { min: e.dataMin, max: e.dataMax },
            format: {
              to: function (e) {
                return "$" + parseInt(e, 10);
              },
              from: function (e) {
                return Number(e);
              },
            },
          }),
            t.noUiSlider.on("update", function (e, t) {
              e = (e = e[t]).replace(/\D/g, "");
              t ? (a.value = Math.round(e)) : (r.value = Math.round(e));
            }),
            r.addEventListener("change", function () {
              t.noUiSlider.set([this.value, null]);
            }),
            a.addEventListener("change", function () {
              t.noUiSlider.set([null, this.value]);
            });
        })(e);
    })(),
    (function () {
      for (
        var t = document.querySelectorAll(".widget-filter"), e = 0;
        e < t.length;
        e++
      )
        (function (e) {
          var r = t[e].querySelector(".widget-filter-search"),
            a = t[e]
              .querySelector(".widget-filter-list")
              .querySelectorAll(".widget-filter-item");
          if (!r) return;
          r.addEventListener("keyup", function () {
            for (var e = r.value.toLowerCase(), t = 0; t < a.length; t++)
              -1 <
              a[t]
                .querySelector(".widget-filter-item-text")
                .innerHTML.toLowerCase()
                .indexOf(e)
                ? a[t].classList.remove("d-none")
                : a[t].classList.add("d-none");
          });
        })(e);
    })(),
    (e = document.querySelector("[data-filter-trigger]")),
    (l = document.querySelectorAll("[data-filter-target]")),
    null !== e &&
      e.addEventListener("change", function () {
        var e = this.options[this.selectedIndex].value.toLowerCase();
        if ("all" === e)
          for (var t = 0; t < l.length; t++) l[t].classList.remove("d-none");
        else {
          for (var r = 0; r < l.length; r++) l[r].classList.add("d-none");
          document.querySelector("#" + e).classList.remove("d-none");
        }
      }),
    (function () {
      for (
        var e = document.querySelectorAll("[data-bs-label]"), t = 0;
        t < e.length;
        t++
      )
        e[t].addEventListener("change", function () {
          var e = this.dataset.bsLabel;
          try {
            document.getElementById(e).textContent = this.value;
          } catch (e) {
            (e.message = "Cannot set property 'textContent' of null"),
              console.error(
                "Make sure the [data-label] matches with the id of the target element you want to change text of!"
              );
          }
        });
    })(),
    (function () {
      for (
        var e = document.querySelectorAll('[data-bs-toggle="radioTab"]'), t = 0;
        t < e.length;
        t++
      )
        e[t].addEventListener("click", function () {
          var e = this.dataset.bsTarget;
          document
            .querySelector(this.dataset.bsParent)
            .querySelectorAll(".radio-tab-pane")
            .forEach(function (e) {
              e.classList.remove("active");
            }),
            document.querySelector(e).classList.add("active");
        });
    })();
})();
