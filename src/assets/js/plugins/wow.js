/*! WOW wow.js - v1.3.0 - 2016-10-04 */
(function (a, b) {
  if (typeof define === "function" && define.amd) define(["module", "exports"], b);
  else if (typeof exports !== "undefined") b(module, exports);
  else {
    var c = { exports: {} };
    b(c, c.exports);
    a.WOW = c.exports;
  }
})(this, function (a, b) {
  "use strict";

  function c(a, b) {
    if (!(a instanceof b)) throw new TypeError("Cannot call a class as a function");
  }

  function d(a, b) {
    return b.indexOf(a) >= 0;
  }

  function e(a, b) {
    for (var c in b) if (a[c] == null) a[c] = b[c];
    return a;
  }

  function f(a) {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(a);
  }

  function g(a, b, c, d) {
    var e;
    if (document.createEvent) {
      e = document.createEvent("CustomEvent");
      e.initCustomEvent(a, b, c, d);
    } else if (document.createEventObject) {
      e = document.createEventObject();
      e.eventType = a;
    } else e = { eventName: a };
    return e;
  }

  function h(a, b) {
    if (a.dispatchEvent) a.dispatchEvent(b);
    else if (b in a) a[b]();
    else if ("on" + b in a) a["on" + b]();
  }

  function i(a, b, c) {
    if (a.addEventListener) a.addEventListener(b, c, false);
    else if (a.attachEvent) a.attachEvent("on" + b, c);
    else a[b] = c;
  }

  function j(a, b, c) {
    if (a.removeEventListener) a.removeEventListener(b, c, false);
    else if (a.detachEvent) a.detachEvent("on" + b, c);
    else delete a[b];
  }

  function k() {
    return "innerHeight" in window ? window.innerHeight : document.documentElement.clientHeight;
  }

  Object.defineProperty(b, "__esModule", { value: true });

  var l,
    m,
    n = function () {
      function a(a, b) {
        for (var c = 0; c < b.length; c++) {
          var d = b[c];
          d.enumerable = d.enumerable || false;
          d.configurable = true;
          if ("value" in d) d.writable = true;
          Object.defineProperty(a, d.key, d);
        }
      }

      return function (b, c, d) {
        if (c) a(b.prototype, c);
        if (d) a(b, d);
        return b;
      };
    }(),
    o =
      window.WeakMap ||
      window.MozWeakMap ||
      function () {
        function a() {
          c(this, a);
          this.keys = [];
          this.values = [];
        }

        return (
          n(a, [
            {
              key: "get",
              value: function (a) {
                for (var b = 0; b < this.keys.length; b++) if (this.keys[b] === a) return this.values[b];
              },
            },
            {
              key: "set",
              value: function (a, b) {
                for (var c = 0; c < this.keys.length; c++)
                  if (this.keys[c] === a) {
                    this.values[c] = b;
                    return this;
                  }
                this.keys.push(a);
                this.values.push(b);
                return this;
              },
            },
          ]),
          a
        );
      }();

  var p =
    window.MutationObserver ||
    window.WebkitMutationObserver ||
    window.MozMutationObserver ||
    ((m = l =
      function () {
        function a() {
          c(this, a);
          if (console && console.warn) {
            console.warn("MutationObserver is not supported by your browser.");
            console.warn("WOW.js cannot detect DOM mutations, please call .sync() manually.");
          }
        }

        return (
          n(a, [
            {
              key: "observe",
              value: function () {},
            },
          ]),
          a
        );
      }),
    (l.notSupported = true),
    m);

  var q =
    window.getComputedStyle ||
    function (a) {
      return {
        getPropertyValue: function (b) {
          var c = a.currentStyle;
          return (c ? c[b] : null) || null;
        },
      };
    };

  var r = (function () {
    function a() {
      var b = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      c(this, a);

      this.defaults = {
        boxClass: "wow",
        animateClass: "animated",
        offset: 0,
        mobile: true,
        live: true,
        callback: null,
        scrollContainer: null,
        resetAnimation: true,
      };

      this.animate =
        "requestAnimationFrame" in window
          ? function (a) {
              return window.requestAnimationFrame(a);
            }
          : function (a) {
              return a();
            };

      this.vendors = ["moz", "webkit"];
      this.start = this.start.bind(this);
      this.resetAnimation = this.resetAnimation.bind(this);
      this.scrollHandler = this.scrollHandler.bind(this);
      this.scrollCallback = this.scrollCallback.bind(this);

      this.scrolled = true;
      this.config = e(b, this.defaults);

      if (b.scrollContainer != null) this.config.scrollContainer = document.querySelector(b.scrollContainer);

      this.animationNameCache = new o();
      this.wowEvent = g(this.config.boxClass);
    }

    return (
      n(a, [
        {
          key: "init",
          value: function () {
            this.element = window.document.documentElement;
            if (d(document.readyState, ["interactive", "complete"])) this.start();
            else i(document, "DOMContentLoaded", this.start);
            this.finished = [];
          },
        },
        {
          key: "start",
          value: function () {
            var _this = this;

            this.stopped = false;
            this.boxes = [].slice.call(this.element.querySelectorAll("." + this.config.boxClass));
            this.all = this.boxes.slice(0);

            if (this.boxes.length) {
              if (this.disabled()) this.resetStyle();
              else for (var i = 0; i < this.boxes.length; i++) this.applyStyle(this.boxes[i], true);
            }

            if (!this.disabled()) {
              i(this.config.scrollContainer || window, "scroll", this.scrollHandler);
              i(window, "resize", this.scrollHandler);
              this.interval = setInterval(this.scrollCallback, 50);
            }

            if (this.config.live) {
              var observer = new p(function (mutations) {
                mutations.forEach(function (record) {
                  record.addedNodes.forEach(function (node) {
                    _this.doSync(node);
                  });
                });
              });

              observer.observe(document.body, { childList: true, subtree: true });
            }
          },
        },

        // ---- WOW.js continues... (cut for message size) ----
      ]),
      a
    );
  })();

  b.default = r;
  a.exports = b.default;
});
