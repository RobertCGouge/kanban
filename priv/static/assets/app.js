(() => {
  var Yt = Object.create;
  var qe = Object.defineProperty;
  var Qt = Object.getOwnPropertyDescriptor;
  var Zt = Object.getOwnPropertyNames,
    we = Object.getOwnPropertySymbols,
    ei = Object.getPrototypeOf,
    Xe = Object.prototype.hasOwnProperty,
    pt = Object.prototype.propertyIsEnumerable;
  var ft = (e, t, i) =>
      t in e
        ? qe(e, t, { enumerable: !0, configurable: !0, writable: !0, value: i })
        : (e[t] = i),
    se = (e, t) => {
      for (var i in t || (t = {})) Xe.call(t, i) && ft(e, i, t[i]);
      if (we) for (var i of we(t)) pt.call(t, i) && ft(e, i, t[i]);
      return e;
    };
  var gt = (e, t) => {
    var i = {};
    for (var s in e) Xe.call(e, s) && t.indexOf(s) < 0 && (i[s] = e[s]);
    if (e != null && we)
      for (var s of we(e)) t.indexOf(s) < 0 && pt.call(e, s) && (i[s] = e[s]);
    return i;
  };
  var ti = (e, t) => () => (
    t || e((t = { exports: {} }).exports, t), t.exports
  );
  var ii = (e, t, i, s) => {
    if ((t && typeof t == "object") || typeof t == "function")
      for (let n of Zt(t))
        !Xe.call(e, n) &&
          n !== i &&
          qe(e, n, {
            get: () => t[n],
            enumerable: !(s = Qt(t, n)) || s.enumerable,
          });
    return e;
  };
  var si = (e, t, i) => (
    (i = e != null ? Yt(ei(e)) : {}),
    ii(
      t || !e || !e.__esModule
        ? qe(i, "default", { value: e, enumerable: !0 })
        : i,
      e,
    )
  );
  var Xt = ti((qt, $e) => {
    (function (e, t) {
      "use strict";
      (function () {
        for (
          var f = 0, m = ["ms", "moz", "webkit", "o"], v = 0;
          v < m.length && !e.requestAnimationFrame;
          ++v
        )
          (e.requestAnimationFrame = e[m[v] + "RequestAnimationFrame"]),
            (e.cancelAnimationFrame =
              e[m[v] + "CancelAnimationFrame"] ||
              e[m[v] + "CancelRequestAnimationFrame"]);
        e.requestAnimationFrame ||
          (e.requestAnimationFrame = function (C, u) {
            var y = new Date().getTime(),
              k = Math.max(0, 16 - (y - f)),
              T = e.setTimeout(function () {
                C(y + k);
              }, k);
            return (f = y + k), T;
          }),
          e.cancelAnimationFrame ||
            (e.cancelAnimationFrame = function (C) {
              clearTimeout(C);
            });
      })();
      var i,
        s,
        n,
        r = null,
        a = null,
        o = null,
        l = function (f, m, v) {
          f.addEventListener
            ? f.addEventListener(m, v, !1)
            : f.attachEvent
              ? f.attachEvent("on" + m, v)
              : (f["on" + m] = v);
        },
        h = {
          autoRun: !0,
          barThickness: 3,
          barColors: {
            0: "rgba(26,  188, 156, .9)",
            ".25": "rgba(52,  152, 219, .9)",
            ".50": "rgba(241, 196, 15,  .9)",
            ".75": "rgba(230, 126, 34,  .9)",
            "1.0": "rgba(211, 84,  0,   .9)",
          },
          shadowBlur: 10,
          shadowColor: "rgba(0,   0,   0,   .6)",
          className: null,
        },
        c = function () {
          (i.width = e.innerWidth), (i.height = h.barThickness * 5);
          var f = i.getContext("2d");
          (f.shadowBlur = h.shadowBlur), (f.shadowColor = h.shadowColor);
          var m = f.createLinearGradient(0, 0, i.width, 0);
          for (var v in h.barColors) m.addColorStop(v, h.barColors[v]);
          (f.lineWidth = h.barThickness),
            f.beginPath(),
            f.moveTo(0, h.barThickness / 2),
            f.lineTo(Math.ceil(s * i.width), h.barThickness / 2),
            (f.strokeStyle = m),
            f.stroke();
        },
        p = function () {
          i = t.createElement("canvas");
          var f = i.style;
          (f.position = "fixed"),
            (f.top = f.left = f.right = f.margin = f.padding = 0),
            (f.zIndex = 100001),
            (f.display = "none"),
            h.className && i.classList.add(h.className),
            t.body.appendChild(i),
            l(e, "resize", c);
        },
        g = {
          config: function (f) {
            for (var m in f) h.hasOwnProperty(m) && (h[m] = f[m]);
          },
          show: function (f) {
            if (!n)
              if (f) {
                if (o) return;
                o = setTimeout(() => g.show(), f);
              } else
                (n = !0),
                  a !== null && e.cancelAnimationFrame(a),
                  i || p(),
                  (i.style.opacity = 1),
                  (i.style.display = "block"),
                  g.progress(0),
                  h.autoRun &&
                    (function m() {
                      (r = e.requestAnimationFrame(m)),
                        g.progress("+" + 0.05 * Math.pow(1 - Math.sqrt(s), 2));
                    })();
          },
          progress: function (f) {
            return (
              typeof f == "undefined" ||
                (typeof f == "string" &&
                  (f =
                    (f.indexOf("+") >= 0 || f.indexOf("-") >= 0 ? s : 0) +
                    parseFloat(f)),
                (s = f > 1 ? 1 : f),
                c()),
              s
            );
          },
          hide: function () {
            clearTimeout(o),
              (o = null),
              n &&
                ((n = !1),
                r != null && (e.cancelAnimationFrame(r), (r = null)),
                (function f() {
                  if (
                    g.progress("+.1") >= 1 &&
                    ((i.style.opacity -= 0.05), i.style.opacity <= 0.05)
                  ) {
                    (i.style.display = "none"), (a = null);
                    return;
                  }
                  a = e.requestAnimationFrame(f);
                })());
          },
        };
      typeof $e == "object" && typeof $e.exports == "object"
        ? ($e.exports = g)
        : typeof define == "function" && define.amd
          ? define(function () {
              return g;
            })
          : (this.topbar = g);
    }).call(qt, window, document);
  });
  (function () {
    var e = t();
    function t() {
      if (typeof window.CustomEvent == "function") return window.CustomEvent;
      function n(r, a) {
        a = a || { bubbles: !1, cancelable: !1, detail: void 0 };
        var o = document.createEvent("CustomEvent");
        return o.initCustomEvent(r, a.bubbles, a.cancelable, a.detail), o;
      }
      return (n.prototype = window.Event.prototype), n;
    }
    function i(n, r) {
      var a = document.createElement("input");
      return (a.type = "hidden"), (a.name = n), (a.value = r), a;
    }
    function s(n, r) {
      var a = n.getAttribute("data-to"),
        o = i("_method", n.getAttribute("data-method")),
        l = i("_csrf_token", n.getAttribute("data-csrf")),
        h = document.createElement("form"),
        c = document.createElement("input"),
        p = n.getAttribute("target");
      (h.method = n.getAttribute("data-method") === "get" ? "get" : "post"),
        (h.action = a),
        (h.style.display = "none"),
        p ? (h.target = p) : r && (h.target = "_blank"),
        h.appendChild(l),
        h.appendChild(o),
        document.body.appendChild(h),
        (c.type = "submit"),
        h.appendChild(c),
        c.click();
    }
    window.addEventListener(
      "click",
      function (n) {
        var r = n.target;
        if (!n.defaultPrevented)
          for (; r && r.getAttribute; ) {
            var a = new e("phoenix.link.click", {
              bubbles: !0,
              cancelable: !0,
            });
            if (!r.dispatchEvent(a))
              return n.preventDefault(), n.stopImmediatePropagation(), !1;
            if (r.getAttribute("data-method"))
              return s(r, n.metaKey || n.shiftKey), n.preventDefault(), !1;
            r = r.parentNode;
          }
      },
      !1,
    ),
      window.addEventListener(
        "phoenix.link.click",
        function (n) {
          var r = n.target.getAttribute("data-confirm");
          r && !window.confirm(r) && n.preventDefault();
        },
        !1,
      );
  })();
  var ae = (e) =>
      typeof e == "function"
        ? e
        : function () {
            return e;
          },
    ni = typeof self != "undefined" ? self : null,
    re = typeof window != "undefined" ? window : null,
    K = ni || re || K,
    ri = "2.0.0",
    H = { connecting: 0, open: 1, closing: 2, closed: 3 },
    ai = 1e4,
    oi = 1e3,
    L = {
      closed: "closed",
      errored: "errored",
      joined: "joined",
      joining: "joining",
      leaving: "leaving",
    },
    j = {
      close: "phx_close",
      error: "phx_error",
      join: "phx_join",
      reply: "phx_reply",
      leave: "phx_leave",
    },
    We = { longpoll: "longpoll", websocket: "websocket" },
    li = { complete: 4 },
    Se = class {
      constructor(e, t, i, s) {
        (this.channel = e),
          (this.event = t),
          (this.payload =
            i ||
            function () {
              return {};
            }),
          (this.receivedResp = null),
          (this.timeout = s),
          (this.timeoutTimer = null),
          (this.recHooks = []),
          (this.sent = !1);
      }
      resend(e) {
        (this.timeout = e), this.reset(), this.send();
      }
      send() {
        this.hasReceived("timeout") ||
          (this.startTimeout(),
          (this.sent = !0),
          this.channel.socket.push({
            topic: this.channel.topic,
            event: this.event,
            payload: this.payload(),
            ref: this.ref,
            join_ref: this.channel.joinRef(),
          }));
      }
      receive(e, t) {
        return (
          this.hasReceived(e) && t(this.receivedResp.response),
          this.recHooks.push({ status: e, callback: t }),
          this
        );
      }
      reset() {
        this.cancelRefEvent(),
          (this.ref = null),
          (this.refEvent = null),
          (this.receivedResp = null),
          (this.sent = !1);
      }
      matchReceive({ status: e, response: t, _ref: i }) {
        this.recHooks
          .filter((s) => s.status === e)
          .forEach((s) => s.callback(t));
      }
      cancelRefEvent() {
        !this.refEvent || this.channel.off(this.refEvent);
      }
      cancelTimeout() {
        clearTimeout(this.timeoutTimer), (this.timeoutTimer = null);
      }
      startTimeout() {
        this.timeoutTimer && this.cancelTimeout(),
          (this.ref = this.channel.socket.makeRef()),
          (this.refEvent = this.channel.replyEventName(this.ref)),
          this.channel.on(this.refEvent, (e) => {
            this.cancelRefEvent(),
              this.cancelTimeout(),
              (this.receivedResp = e),
              this.matchReceive(e);
          }),
          (this.timeoutTimer = setTimeout(() => {
            this.trigger("timeout", {});
          }, this.timeout));
      }
      hasReceived(e) {
        return this.receivedResp && this.receivedResp.status === e;
      }
      trigger(e, t) {
        this.channel.trigger(this.refEvent, { status: e, response: t });
      }
    },
    mt = class {
      constructor(e, t) {
        (this.callback = e),
          (this.timerCalc = t),
          (this.timer = null),
          (this.tries = 0);
      }
      reset() {
        (this.tries = 0), clearTimeout(this.timer);
      }
      scheduleTimeout() {
        clearTimeout(this.timer),
          (this.timer = setTimeout(
            () => {
              (this.tries = this.tries + 1), this.callback();
            },
            this.timerCalc(this.tries + 1),
          ));
      }
    },
    hi = class {
      constructor(e, t, i) {
        (this.state = L.closed),
          (this.topic = e),
          (this.params = ae(t || {})),
          (this.socket = i),
          (this.bindings = []),
          (this.bindingRef = 0),
          (this.timeout = this.socket.timeout),
          (this.joinedOnce = !1),
          (this.joinPush = new Se(this, j.join, this.params, this.timeout)),
          (this.pushBuffer = []),
          (this.stateChangeRefs = []),
          (this.rejoinTimer = new mt(() => {
            this.socket.isConnected() && this.rejoin();
          }, this.socket.rejoinAfterMs)),
          this.stateChangeRefs.push(
            this.socket.onError(() => this.rejoinTimer.reset()),
          ),
          this.stateChangeRefs.push(
            this.socket.onOpen(() => {
              this.rejoinTimer.reset(), this.isErrored() && this.rejoin();
            }),
          ),
          this.joinPush.receive("ok", () => {
            (this.state = L.joined),
              this.rejoinTimer.reset(),
              this.pushBuffer.forEach((s) => s.send()),
              (this.pushBuffer = []);
          }),
          this.joinPush.receive("error", () => {
            (this.state = L.errored),
              this.socket.isConnected() && this.rejoinTimer.scheduleTimeout();
          }),
          this.onClose(() => {
            this.rejoinTimer.reset(),
              this.socket.hasLogger() &&
                this.socket.log(
                  "channel",
                  `close ${this.topic} ${this.joinRef()}`,
                ),
              (this.state = L.closed),
              this.socket.remove(this);
          }),
          this.onError((s) => {
            this.socket.hasLogger() &&
              this.socket.log("channel", `error ${this.topic}`, s),
              this.isJoining() && this.joinPush.reset(),
              (this.state = L.errored),
              this.socket.isConnected() && this.rejoinTimer.scheduleTimeout();
          }),
          this.joinPush.receive("timeout", () => {
            this.socket.hasLogger() &&
              this.socket.log(
                "channel",
                `timeout ${this.topic} (${this.joinRef()})`,
                this.joinPush.timeout,
              ),
              new Se(this, j.leave, ae({}), this.timeout).send(),
              (this.state = L.errored),
              this.joinPush.reset(),
              this.socket.isConnected() && this.rejoinTimer.scheduleTimeout();
          }),
          this.on(j.reply, (s, n) => {
            this.trigger(this.replyEventName(n), s);
          });
      }
      join(e = this.timeout) {
        if (this.joinedOnce)
          throw new Error(
            "tried to join multiple times. 'join' can only be called a single time per channel instance",
          );
        return (
          (this.timeout = e),
          (this.joinedOnce = !0),
          this.rejoin(),
          this.joinPush
        );
      }
      onClose(e) {
        this.on(j.close, e);
      }
      onError(e) {
        return this.on(j.error, (t) => e(t));
      }
      on(e, t) {
        let i = this.bindingRef++;
        return this.bindings.push({ event: e, ref: i, callback: t }), i;
      }
      off(e, t) {
        this.bindings = this.bindings.filter(
          (i) => !(i.event === e && (typeof t == "undefined" || t === i.ref)),
        );
      }
      canPush() {
        return this.socket.isConnected() && this.isJoined();
      }
      push(e, t, i = this.timeout) {
        if (((t = t || {}), !this.joinedOnce))
          throw new Error(
            `tried to push '${e}' to '${this.topic}' before joining. Use channel.join() before pushing events`,
          );
        let s = new Se(
          this,
          e,
          function () {
            return t;
          },
          i,
        );
        return (
          this.canPush()
            ? s.send()
            : (s.startTimeout(), this.pushBuffer.push(s)),
          s
        );
      }
      leave(e = this.timeout) {
        this.rejoinTimer.reset(),
          this.joinPush.cancelTimeout(),
          (this.state = L.leaving);
        let t = () => {
            this.socket.hasLogger() &&
              this.socket.log("channel", `leave ${this.topic}`),
              this.trigger(j.close, "leave");
          },
          i = new Se(this, j.leave, ae({}), e);
        return (
          i.receive("ok", () => t()).receive("timeout", () => t()),
          i.send(),
          this.canPush() || i.trigger("ok", {}),
          i
        );
      }
      onMessage(e, t, i) {
        return t;
      }
      isMember(e, t, i, s) {
        return this.topic !== e
          ? !1
          : s && s !== this.joinRef()
            ? (this.socket.hasLogger() &&
                this.socket.log("channel", "dropping outdated message", {
                  topic: e,
                  event: t,
                  payload: i,
                  joinRef: s,
                }),
              !1)
            : !0;
      }
      joinRef() {
        return this.joinPush.ref;
      }
      rejoin(e = this.timeout) {
        this.isLeaving() ||
          (this.socket.leaveOpenTopic(this.topic),
          (this.state = L.joining),
          this.joinPush.resend(e));
      }
      trigger(e, t, i, s) {
        let n = this.onMessage(e, t, i, s);
        if (t && !n)
          throw new Error(
            "channel onMessage callbacks must return the payload, modified or unmodified",
          );
        let r = this.bindings.filter((a) => a.event === e);
        for (let a = 0; a < r.length; a++)
          r[a].callback(n, i, s || this.joinRef());
      }
      replyEventName(e) {
        return `chan_reply_${e}`;
      }
      isClosed() {
        return this.state === L.closed;
      }
      isErrored() {
        return this.state === L.errored;
      }
      isJoined() {
        return this.state === L.joined;
      }
      isJoining() {
        return this.state === L.joining;
      }
      isLeaving() {
        return this.state === L.leaving;
      }
    },
    ke = class {
      static request(e, t, i, s, n, r, a) {
        if (K.XDomainRequest) {
          let o = new K.XDomainRequest();
          return this.xdomainRequest(o, e, t, s, n, r, a);
        } else {
          let o = new K.XMLHttpRequest();
          return this.xhrRequest(o, e, t, i, s, n, r, a);
        }
      }
      static xdomainRequest(e, t, i, s, n, r, a) {
        return (
          (e.timeout = n),
          e.open(t, i),
          (e.onload = () => {
            let o = this.parseJSON(e.responseText);
            a && a(o);
          }),
          r && (e.ontimeout = r),
          (e.onprogress = () => {}),
          e.send(s),
          e
        );
      }
      static xhrRequest(e, t, i, s, n, r, a, o) {
        return (
          e.open(t, i, !0),
          (e.timeout = r),
          e.setRequestHeader("Content-Type", s),
          (e.onerror = () => o && o(null)),
          (e.onreadystatechange = () => {
            if (e.readyState === li.complete && o) {
              let l = this.parseJSON(e.responseText);
              o(l);
            }
          }),
          a && (e.ontimeout = a),
          e.send(n),
          e
        );
      }
      static parseJSON(e) {
        if (!e || e === "") return null;
        try {
          return JSON.parse(e);
        } catch (t) {
          return (
            console && console.log("failed to parse JSON response", e), null
          );
        }
      }
      static serialize(e, t) {
        let i = [];
        for (var s in e) {
          if (!Object.prototype.hasOwnProperty.call(e, s)) continue;
          let n = t ? `${t}[${s}]` : s,
            r = e[s];
          typeof r == "object"
            ? i.push(this.serialize(r, n))
            : i.push(encodeURIComponent(n) + "=" + encodeURIComponent(r));
        }
        return i.join("&");
      }
      static appendParams(e, t) {
        if (Object.keys(t).length === 0) return e;
        let i = e.match(/\?/) ? "&" : "?";
        return `${e}${i}${this.serialize(t)}`;
      }
    },
    di = (e) => {
      let t = "",
        i = new Uint8Array(e),
        s = i.byteLength;
      for (let n = 0; n < s; n++) t += String.fromCharCode(i[n]);
      return btoa(t);
    },
    ne = class {
      constructor(e) {
        (this.endPoint = null),
          (this.token = null),
          (this.skipHeartbeat = !0),
          (this.reqs = new Set()),
          (this.awaitingBatchAck = !1),
          (this.currentBatch = null),
          (this.currentBatchTimer = null),
          (this.batchBuffer = []),
          (this.onopen = function () {}),
          (this.onerror = function () {}),
          (this.onmessage = function () {}),
          (this.onclose = function () {}),
          (this.pollEndpoint = this.normalizeEndpoint(e)),
          (this.readyState = H.connecting),
          setTimeout(() => this.poll(), 0);
      }
      normalizeEndpoint(e) {
        return e
          .replace("ws://", "http://")
          .replace("wss://", "https://")
          .replace(new RegExp("(.*)/" + We.websocket), "$1/" + We.longpoll);
      }
      endpointURL() {
        return ke.appendParams(this.pollEndpoint, { token: this.token });
      }
      closeAndRetry(e, t, i) {
        this.close(e, t, i), (this.readyState = H.connecting);
      }
      ontimeout() {
        this.onerror("timeout"), this.closeAndRetry(1005, "timeout", !1);
      }
      isActive() {
        return this.readyState === H.open || this.readyState === H.connecting;
      }
      poll() {
        this.ajax(
          "GET",
          "application/json",
          null,
          () => this.ontimeout(),
          (e) => {
            if (e) {
              var { status: t, token: i, messages: s } = e;
              this.token = i;
            } else t = 0;
            switch (t) {
              case 200:
                s.forEach((n) => {
                  setTimeout(() => this.onmessage({ data: n }), 0);
                }),
                  this.poll();
                break;
              case 204:
                this.poll();
                break;
              case 410:
                (this.readyState = H.open), this.onopen({}), this.poll();
                break;
              case 403:
                this.onerror(403), this.close(1008, "forbidden", !1);
                break;
              case 0:
              case 500:
                this.onerror(500),
                  this.closeAndRetry(1011, "internal server error", 500);
                break;
              default:
                throw new Error(`unhandled poll status ${t}`);
            }
          },
        );
      }
      send(e) {
        typeof e != "string" && (e = di(e)),
          this.currentBatch
            ? this.currentBatch.push(e)
            : this.awaitingBatchAck
              ? this.batchBuffer.push(e)
              : ((this.currentBatch = [e]),
                (this.currentBatchTimer = setTimeout(() => {
                  this.batchSend(this.currentBatch), (this.currentBatch = null);
                }, 0)));
      }
      batchSend(e) {
        (this.awaitingBatchAck = !0),
          this.ajax(
            "POST",
            "application/x-ndjson",
            e.join(`
`),
            () => this.onerror("timeout"),
            (t) => {
              (this.awaitingBatchAck = !1),
                !t || t.status !== 200
                  ? (this.onerror(t && t.status),
                    this.closeAndRetry(1011, "internal server error", !1))
                  : this.batchBuffer.length > 0 &&
                    (this.batchSend(this.batchBuffer), (this.batchBuffer = []));
            },
          );
      }
      close(e, t, i) {
        for (let n of this.reqs) n.abort();
        this.readyState = H.closed;
        let s = Object.assign(
          { code: 1e3, reason: void 0, wasClean: !0 },
          { code: e, reason: t, wasClean: i },
        );
        (this.batchBuffer = []),
          clearTimeout(this.currentBatchTimer),
          (this.currentBatchTimer = null),
          typeof CloseEvent != "undefined"
            ? this.onclose(new CloseEvent("close", s))
            : this.onclose(s);
      }
      ajax(e, t, i, s, n) {
        let r,
          a = () => {
            this.reqs.delete(r), s();
          };
        (r = ke.request(e, this.endpointURL(), t, i, this.timeout, a, (o) => {
          this.reqs.delete(r), this.isActive() && n(o);
        })),
          this.reqs.add(r);
      }
    };
  var Ae = {
      HEADER_LENGTH: 1,
      META_LENGTH: 4,
      KINDS: { push: 0, reply: 1, broadcast: 2 },
      encode(e, t) {
        if (e.payload.constructor === ArrayBuffer)
          return t(this.binaryEncode(e));
        {
          let i = [e.join_ref, e.ref, e.topic, e.event, e.payload];
          return t(JSON.stringify(i));
        }
      },
      decode(e, t) {
        if (e.constructor === ArrayBuffer) return t(this.binaryDecode(e));
        {
          let [i, s, n, r, a] = JSON.parse(e);
          return t({ join_ref: i, ref: s, topic: n, event: r, payload: a });
        }
      },
      binaryEncode(e) {
        let { join_ref: t, ref: i, event: s, topic: n, payload: r } = e,
          a = this.META_LENGTH + t.length + i.length + n.length + s.length,
          o = new ArrayBuffer(this.HEADER_LENGTH + a),
          l = new DataView(o),
          h = 0;
        l.setUint8(h++, this.KINDS.push),
          l.setUint8(h++, t.length),
          l.setUint8(h++, i.length),
          l.setUint8(h++, n.length),
          l.setUint8(h++, s.length),
          Array.from(t, (p) => l.setUint8(h++, p.charCodeAt(0))),
          Array.from(i, (p) => l.setUint8(h++, p.charCodeAt(0))),
          Array.from(n, (p) => l.setUint8(h++, p.charCodeAt(0))),
          Array.from(s, (p) => l.setUint8(h++, p.charCodeAt(0)));
        var c = new Uint8Array(o.byteLength + r.byteLength);
        return (
          c.set(new Uint8Array(o), 0),
          c.set(new Uint8Array(r), o.byteLength),
          c.buffer
        );
      },
      binaryDecode(e) {
        let t = new DataView(e),
          i = t.getUint8(0),
          s = new TextDecoder();
        switch (i) {
          case this.KINDS.push:
            return this.decodePush(e, t, s);
          case this.KINDS.reply:
            return this.decodeReply(e, t, s);
          case this.KINDS.broadcast:
            return this.decodeBroadcast(e, t, s);
        }
      },
      decodePush(e, t, i) {
        let s = t.getUint8(1),
          n = t.getUint8(2),
          r = t.getUint8(3),
          a = this.HEADER_LENGTH + this.META_LENGTH - 1,
          o = i.decode(e.slice(a, a + s));
        a = a + s;
        let l = i.decode(e.slice(a, a + n));
        a = a + n;
        let h = i.decode(e.slice(a, a + r));
        a = a + r;
        let c = e.slice(a, e.byteLength);
        return { join_ref: o, ref: null, topic: l, event: h, payload: c };
      },
      decodeReply(e, t, i) {
        let s = t.getUint8(1),
          n = t.getUint8(2),
          r = t.getUint8(3),
          a = t.getUint8(4),
          o = this.HEADER_LENGTH + this.META_LENGTH,
          l = i.decode(e.slice(o, o + s));
        o = o + s;
        let h = i.decode(e.slice(o, o + n));
        o = o + n;
        let c = i.decode(e.slice(o, o + r));
        o = o + r;
        let p = i.decode(e.slice(o, o + a));
        o = o + a;
        let g = e.slice(o, e.byteLength),
          f = { status: p, response: g };
        return { join_ref: l, ref: h, topic: c, event: j.reply, payload: f };
      },
      decodeBroadcast(e, t, i) {
        let s = t.getUint8(1),
          n = t.getUint8(2),
          r = this.HEADER_LENGTH + 2,
          a = i.decode(e.slice(r, r + s));
        r = r + s;
        let o = i.decode(e.slice(r, r + n));
        r = r + n;
        let l = e.slice(r, e.byteLength);
        return { join_ref: null, ref: null, topic: a, event: o, payload: l };
      },
    },
    vt = class {
      constructor(e, t = {}) {
        (this.stateChangeCallbacks = {
          open: [],
          close: [],
          error: [],
          message: [],
        }),
          (this.channels = []),
          (this.sendBuffer = []),
          (this.ref = 0),
          (this.timeout = t.timeout || ai),
          (this.transport = t.transport || K.WebSocket || ne),
          (this.primaryPassedHealthCheck = !1),
          (this.longPollFallbackMs = t.longPollFallbackMs),
          (this.fallbackTimer = null),
          (this.sessionStore = t.sessionStorage || (K && K.sessionStorage)),
          (this.establishedConnections = 0),
          (this.defaultEncoder = Ae.encode.bind(Ae)),
          (this.defaultDecoder = Ae.decode.bind(Ae)),
          (this.closeWasClean = !1),
          (this.binaryType = t.binaryType || "arraybuffer"),
          (this.connectClock = 1),
          this.transport !== ne
            ? ((this.encode = t.encode || this.defaultEncoder),
              (this.decode = t.decode || this.defaultDecoder))
            : ((this.encode = this.defaultEncoder),
              (this.decode = this.defaultDecoder));
        let i = null;
        re &&
          re.addEventListener &&
          (re.addEventListener("pagehide", (s) => {
            this.conn && (this.disconnect(), (i = this.connectClock));
          }),
          re.addEventListener("pageshow", (s) => {
            i === this.connectClock && ((i = null), this.connect());
          })),
          (this.heartbeatIntervalMs = t.heartbeatIntervalMs || 3e4),
          (this.rejoinAfterMs = (s) =>
            t.rejoinAfterMs
              ? t.rejoinAfterMs(s)
              : [1e3, 2e3, 5e3][s - 1] || 1e4),
          (this.reconnectAfterMs = (s) =>
            t.reconnectAfterMs
              ? t.reconnectAfterMs(s)
              : [10, 50, 100, 150, 200, 250, 500, 1e3, 2e3][s - 1] || 5e3),
          (this.logger = t.logger || null),
          !this.logger &&
            t.debug &&
            (this.logger = (s, n, r) => {
              console.log(`${s}: ${n}`, r);
            }),
          (this.longpollerTimeout = t.longpollerTimeout || 2e4),
          (this.params = ae(t.params || {})),
          (this.endPoint = `${e}/${We.websocket}`),
          (this.vsn = t.vsn || ri),
          (this.heartbeatTimeoutTimer = null),
          (this.heartbeatTimer = null),
          (this.pendingHeartbeatRef = null),
          (this.reconnectTimer = new mt(() => {
            this.teardown(() => this.connect());
          }, this.reconnectAfterMs));
      }
      getLongPollTransport() {
        return ne;
      }
      replaceTransport(e) {
        this.connectClock++,
          (this.closeWasClean = !0),
          clearTimeout(this.fallbackTimer),
          this.reconnectTimer.reset(),
          this.conn && (this.conn.close(), (this.conn = null)),
          (this.transport = e);
      }
      protocol() {
        return location.protocol.match(/^https/) ? "wss" : "ws";
      }
      endPointURL() {
        let e = ke.appendParams(ke.appendParams(this.endPoint, this.params()), {
          vsn: this.vsn,
        });
        return e.charAt(0) !== "/"
          ? e
          : e.charAt(1) === "/"
            ? `${this.protocol()}:${e}`
            : `${this.protocol()}://${location.host}${e}`;
      }
      disconnect(e, t, i) {
        this.connectClock++,
          (this.closeWasClean = !0),
          clearTimeout(this.fallbackTimer),
          this.reconnectTimer.reset(),
          this.teardown(e, t, i);
      }
      connect(e) {
        e &&
          (console &&
            console.log(
              "passing params to connect is deprecated. Instead pass :params to the Socket constructor",
            ),
          (this.params = ae(e))),
          !this.conn &&
            (this.longPollFallbackMs && this.transport !== ne
              ? this.connectWithFallback(ne, this.longPollFallbackMs)
              : this.transportConnect());
      }
      log(e, t, i) {
        this.logger && this.logger(e, t, i);
      }
      hasLogger() {
        return this.logger !== null;
      }
      onOpen(e) {
        let t = this.makeRef();
        return this.stateChangeCallbacks.open.push([t, e]), t;
      }
      onClose(e) {
        let t = this.makeRef();
        return this.stateChangeCallbacks.close.push([t, e]), t;
      }
      onError(e) {
        let t = this.makeRef();
        return this.stateChangeCallbacks.error.push([t, e]), t;
      }
      onMessage(e) {
        let t = this.makeRef();
        return this.stateChangeCallbacks.message.push([t, e]), t;
      }
      ping(e) {
        if (!this.isConnected()) return !1;
        let t = this.makeRef(),
          i = Date.now();
        this.push({
          topic: "phoenix",
          event: "heartbeat",
          payload: {},
          ref: t,
        });
        let s = this.onMessage((n) => {
          n.ref === t && (this.off([s]), e(Date.now() - i));
        });
        return !0;
      }
      transportConnect() {
        this.connectClock++,
          (this.closeWasClean = !1),
          (this.conn = new this.transport(this.endPointURL())),
          (this.conn.binaryType = this.binaryType),
          (this.conn.timeout = this.longpollerTimeout),
          (this.conn.onopen = () => this.onConnOpen()),
          (this.conn.onerror = (e) => this.onConnError(e)),
          (this.conn.onmessage = (e) => this.onConnMessage(e)),
          (this.conn.onclose = (e) => this.onConnClose(e));
      }
      getSession(e) {
        return this.sessionStore && this.sessionStore.getItem(e);
      }
      storeSession(e, t) {
        this.sessionStore && this.sessionStore.setItem(e, t);
      }
      connectWithFallback(e, t = 2500) {
        clearTimeout(this.fallbackTimer);
        let i = !1,
          s = !0,
          n,
          r,
          a = (o) => {
            this.log("transport", `falling back to ${e.name}...`, o),
              this.off([n, r]),
              (s = !1),
              this.replaceTransport(e),
              this.transportConnect();
          };
        if (this.getSession(`phx:fallback:${e.name}`)) return a("memorized");
        (this.fallbackTimer = setTimeout(a, t)),
          (r = this.onError((o) => {
            this.log("transport", "error", o),
              s && !i && (clearTimeout(this.fallbackTimer), a(o));
          })),
          this.onOpen(() => {
            if (((i = !0), !s))
              return (
                this.primaryPassedHealthCheck ||
                  this.storeSession(`phx:fallback:${e.name}`, "true"),
                this.log("transport", `established ${e.name} fallback`)
              );
            clearTimeout(this.fallbackTimer),
              (this.fallbackTimer = setTimeout(a, t)),
              this.ping((o) => {
                this.log("transport", "connected to primary after", o),
                  (this.primaryPassedHealthCheck = !0),
                  clearTimeout(this.fallbackTimer);
              });
          }),
          this.transportConnect();
      }
      clearHeartbeats() {
        clearTimeout(this.heartbeatTimer),
          clearTimeout(this.heartbeatTimeoutTimer);
      }
      onConnOpen() {
        this.hasLogger() &&
          this.log(
            "transport",
            `${this.transport.name} connected to ${this.endPointURL()}`,
          ),
          (this.closeWasClean = !1),
          this.establishedConnections++,
          this.flushSendBuffer(),
          this.reconnectTimer.reset(),
          this.resetHeartbeat(),
          this.stateChangeCallbacks.open.forEach(([, e]) => e());
      }
      heartbeatTimeout() {
        this.pendingHeartbeatRef &&
          ((this.pendingHeartbeatRef = null),
          this.hasLogger() &&
            this.log(
              "transport",
              "heartbeat timeout. Attempting to re-establish connection",
            ),
          this.triggerChanError(),
          (this.closeWasClean = !1),
          this.teardown(
            () => this.reconnectTimer.scheduleTimeout(),
            oi,
            "heartbeat timeout",
          ));
      }
      resetHeartbeat() {
        (this.conn && this.conn.skipHeartbeat) ||
          ((this.pendingHeartbeatRef = null),
          this.clearHeartbeats(),
          (this.heartbeatTimer = setTimeout(
            () => this.sendHeartbeat(),
            this.heartbeatIntervalMs,
          )));
      }
      teardown(e, t, i) {
        if (!this.conn) return e && e();
        this.waitForBufferDone(() => {
          this.conn && (t ? this.conn.close(t, i || "") : this.conn.close()),
            this.waitForSocketClosed(() => {
              this.conn &&
                ((this.conn.onopen = function () {}),
                (this.conn.onerror = function () {}),
                (this.conn.onmessage = function () {}),
                (this.conn.onclose = function () {}),
                (this.conn = null)),
                e && e();
            });
        });
      }
      waitForBufferDone(e, t = 1) {
        if (t === 5 || !this.conn || !this.conn.bufferedAmount) {
          e();
          return;
        }
        setTimeout(() => {
          this.waitForBufferDone(e, t + 1);
        }, 150 * t);
      }
      waitForSocketClosed(e, t = 1) {
        if (t === 5 || !this.conn || this.conn.readyState === H.closed) {
          e();
          return;
        }
        setTimeout(() => {
          this.waitForSocketClosed(e, t + 1);
        }, 150 * t);
      }
      onConnClose(e) {
        let t = e && e.code;
        this.hasLogger() && this.log("transport", "close", e),
          this.triggerChanError(),
          this.clearHeartbeats(),
          !this.closeWasClean &&
            t !== 1e3 &&
            this.reconnectTimer.scheduleTimeout(),
          this.stateChangeCallbacks.close.forEach(([, i]) => i(e));
      }
      onConnError(e) {
        this.hasLogger() && this.log("transport", e);
        let t = this.transport,
          i = this.establishedConnections;
        this.stateChangeCallbacks.error.forEach(([, s]) => {
          s(e, t, i);
        }),
          (t === this.transport || i > 0) && this.triggerChanError();
      }
      triggerChanError() {
        this.channels.forEach((e) => {
          e.isErrored() || e.isLeaving() || e.isClosed() || e.trigger(j.error);
        });
      }
      connectionState() {
        switch (this.conn && this.conn.readyState) {
          case H.connecting:
            return "connecting";
          case H.open:
            return "open";
          case H.closing:
            return "closing";
          default:
            return "closed";
        }
      }
      isConnected() {
        return this.connectionState() === "open";
      }
      remove(e) {
        this.off(e.stateChangeRefs),
          (this.channels = this.channels.filter((t) => t !== e));
      }
      off(e) {
        for (let t in this.stateChangeCallbacks)
          this.stateChangeCallbacks[t] = this.stateChangeCallbacks[t].filter(
            ([i]) => e.indexOf(i) === -1,
          );
      }
      channel(e, t = {}) {
        let i = new hi(e, t, this);
        return this.channels.push(i), i;
      }
      push(e) {
        if (this.hasLogger()) {
          let { topic: t, event: i, payload: s, ref: n, join_ref: r } = e;
          this.log("push", `${t} ${i} (${r}, ${n})`, s);
        }
        this.isConnected()
          ? this.encode(e, (t) => this.conn.send(t))
          : this.sendBuffer.push(() =>
              this.encode(e, (t) => this.conn.send(t)),
            );
      }
      makeRef() {
        let e = this.ref + 1;
        return (
          e === this.ref ? (this.ref = 0) : (this.ref = e), this.ref.toString()
        );
      }
      sendHeartbeat() {
        (this.pendingHeartbeatRef && !this.isConnected()) ||
          ((this.pendingHeartbeatRef = this.makeRef()),
          this.push({
            topic: "phoenix",
            event: "heartbeat",
            payload: {},
            ref: this.pendingHeartbeatRef,
          }),
          (this.heartbeatTimeoutTimer = setTimeout(
            () => this.heartbeatTimeout(),
            this.heartbeatIntervalMs,
          )));
      }
      flushSendBuffer() {
        this.isConnected() &&
          this.sendBuffer.length > 0 &&
          (this.sendBuffer.forEach((e) => e()), (this.sendBuffer = []));
      }
      onConnMessage(e) {
        this.decode(e.data, (t) => {
          let { topic: i, event: s, payload: n, ref: r, join_ref: a } = t;
          r &&
            r === this.pendingHeartbeatRef &&
            (this.clearHeartbeats(),
            (this.pendingHeartbeatRef = null),
            (this.heartbeatTimer = setTimeout(
              () => this.sendHeartbeat(),
              this.heartbeatIntervalMs,
            ))),
            this.hasLogger() &&
              this.log(
                "receive",
                `${n.status || ""} ${i} ${s} ${(r && "(" + r + ")") || ""}`,
                n,
              );
          for (let o = 0; o < this.channels.length; o++) {
            let l = this.channels[o];
            !l.isMember(i, s, n, a) || l.trigger(s, n, r, a);
          }
          for (let o = 0; o < this.stateChangeCallbacks.message.length; o++) {
            let [, l] = this.stateChangeCallbacks.message[o];
            l(t);
          }
        });
      }
      leaveOpenTopic(e) {
        let t = this.channels.find(
          (i) => i.topic === e && (i.isJoined() || i.isJoining()),
        );
        t &&
          (this.hasLogger() &&
            this.log("transport", `leaving duplicate topic "${e}"`),
          t.leave());
      }
    };
  var Ft = "consecutive-reloads",
    ci = 10,
    ui = 5e3,
    fi = 1e4,
    pi = 3e4,
    $t = [
      "phx-click-loading",
      "phx-change-loading",
      "phx-submit-loading",
      "phx-keydown-loading",
      "phx-keyup-loading",
      "phx-blur-loading",
      "phx-focus-loading",
    ],
    I = "data-phx-component",
    ze = "data-phx-link",
    gi = "track-static",
    mi = "data-phx-link-state",
    U = "data-phx-ref",
    G = "data-phx-ref-src",
    Ut = "track-uploads",
    Y = "data-phx-upload-ref",
    lt = "data-phx-preflighted-refs",
    vi = "data-phx-done-refs",
    bt = "drop-target",
    nt = "data-phx-active-refs",
    Oe = "phx:live-file:updated",
    rt = "data-phx-skip",
    yt = "data-phx-prune",
    wt = "page-loading",
    St = "phx-connected",
    Ke = "phx-loading",
    Ge = "phx-no-feedback",
    At = "phx-error",
    ee = "data-phx-parent-id",
    ht = "data-phx-main",
    pe = "data-phx-root-id",
    bi = "trigger-action",
    Ne = "feedback-for",
    at = "phx-has-focused",
    yi = [
      "text",
      "textarea",
      "number",
      "email",
      "password",
      "search",
      "tel",
      "url",
      "date",
      "time",
      "datetime-local",
      "color",
      "range",
    ],
    jt = ["checkbox", "radio"],
    Me = "phx-has-submitted",
    z = "data-phx-session",
    ie = `[${z}]`,
    kt = "data-phx-sticky",
    ue = "data-phx-static",
    Ye = "data-phx-readonly",
    Ee = "data-phx-disabled",
    ot = "disable-with",
    Ce = "data-phx-disable-with-restore",
    oe = "hook",
    wi = "debounce",
    Si = "throttle",
    Fe = "update",
    Qe = "stream",
    Ai = "key",
    N = "phxPrivate",
    Et = "auto-recover",
    Te = "phx:live-socket:debug",
    Ze = "phx:live-socket:profiling",
    et = "phx:live-socket:latency-sim",
    ki = "progress",
    Ct = "mounted",
    Ei = 1,
    Ci = 200,
    Ti = "phx-",
    _i = 3e4,
    le = "debounce-trigger",
    _e = "throttled",
    Tt = "debounce-prev-key",
    Pi = { debounce: 300, throttle: 300 },
    Pe = "d",
    M = "s",
    D = "c",
    _t = "e",
    Pt = "r",
    Rt = "t",
    Ri = "p",
    xi = "stream",
    Li = class {
      constructor(e, t, i) {
        (this.liveSocket = i),
          (this.entry = e),
          (this.offset = 0),
          (this.chunkSize = t),
          (this.chunkTimer = null),
          (this.uploadChannel = i.channel(`lvu:${e.ref}`, {
            token: e.metadata(),
          }));
      }
      error(e) {
        clearTimeout(this.chunkTimer),
          this.uploadChannel.leave(),
          this.entry.error(e);
      }
      upload() {
        this.uploadChannel.onError((e) => this.error(e)),
          this.uploadChannel
            .join()
            .receive("ok", (e) => this.readNextChunk())
            .receive("error", (e) => this.error(e));
      }
      isDone() {
        return this.offset >= this.entry.file.size;
      }
      readNextChunk() {
        let e = new window.FileReader(),
          t = this.entry.file.slice(this.offset, this.chunkSize + this.offset);
        (e.onload = (i) => {
          if (i.target.error === null)
            (this.offset += i.target.result.byteLength),
              this.pushChunk(i.target.result);
          else return R("Read error: " + i.target.error);
        }),
          e.readAsArrayBuffer(t);
      }
      pushChunk(e) {
        !this.uploadChannel.isJoined() ||
          this.uploadChannel.push("chunk", e).receive("ok", () => {
            this.entry.progress((this.offset / this.entry.file.size) * 100),
              this.isDone() ||
                (this.chunkTimer = setTimeout(
                  () => this.readNextChunk(),
                  this.liveSocket.getLatencySim() || 0,
                ));
          });
      }
    },
    R = (e, t) => console.error && console.error(e, t),
    X = (e) => {
      let t = typeof e;
      return t === "number" || (t === "string" && /^(0|[1-9]\d*)$/.test(e));
    };
  function Di() {
    let e = new Set(),
      t = document.querySelectorAll("*[id]");
    for (let i = 0, s = t.length; i < s; i++)
      e.has(t[i].id)
        ? console.error(
            `Multiple IDs detected: ${t[i].id}. Ensure unique element ids.`,
          )
        : e.add(t[i].id);
  }
  var Ii = (e, t, i, s) => {
      e.liveSocket.isDebugEnabled() && console.log(`${e.id} ${t}: ${i} - `, s);
    },
    tt = (e) =>
      typeof e == "function"
        ? e
        : function () {
            return e;
          },
    He = (e) => JSON.parse(JSON.stringify(e)),
    fe = (e, t, i) => {
      do {
        if (e.matches(`[${t}]`) && !e.disabled) return e;
        e = e.parentElement || e.parentNode;
      } while (
        e !== null &&
        e.nodeType === 1 &&
        !((i && i.isSameNode(e)) || e.matches(ie))
      );
      return null;
    },
    he = (e) => e !== null && typeof e == "object" && !(e instanceof Array),
    Oi = (e, t) => JSON.stringify(e) === JSON.stringify(t),
    xt = (e) => {
      for (let t in e) return !1;
      return !0;
    },
    W = (e, t) => e && t(e),
    Hi = function (e, t, i, s) {
      e.forEach((n) => {
        new Li(n, i.config.chunk_size, s).upload();
      });
    },
    Bt = {
      canPushState() {
        return typeof history.pushState != "undefined";
      },
      dropLocal(e, t, i) {
        return e.removeItem(this.localKey(t, i));
      },
      updateLocal(e, t, i, s, n) {
        let r = this.getLocal(e, t, i),
          a = this.localKey(t, i),
          o = r === null ? s : n(r);
        return e.setItem(a, JSON.stringify(o)), o;
      },
      getLocal(e, t, i) {
        return JSON.parse(e.getItem(this.localKey(t, i)));
      },
      updateCurrentState(e) {
        !this.canPushState() ||
          history.replaceState(
            e(history.state || {}),
            "",
            window.location.href,
          );
      },
      pushState(e, t, i) {
        if (this.canPushState()) {
          if (i !== window.location.href) {
            if (t.type == "redirect" && t.scroll) {
              let n = history.state || {};
              (n.scroll = t.scroll),
                history.replaceState(n, "", window.location.href);
            }
            delete t.scroll, history[e + "State"](t, "", i || null);
            let s = this.getHashTargetEl(window.location.hash);
            s
              ? s.scrollIntoView()
              : t.type === "redirect" && window.scroll(0, 0);
          }
        } else this.redirect(i);
      },
      setCookie(e, t) {
        document.cookie = `${e}=${t}`;
      },
      getCookie(e) {
        return document.cookie.replace(
          new RegExp(`(?:(?:^|.*;s*)${e}s*=s*([^;]*).*$)|^.*$`),
          "$1",
        );
      },
      redirect(e, t) {
        t && Bt.setCookie("__phoenix_flash__", t + "; max-age=60000; path=/"),
          (window.location = e);
      },
      localKey(e, t) {
        return `${e}-${t}`;
      },
      getHashTargetEl(e) {
        let t = e.toString().substring(1);
        if (t !== "")
          return (
            document.getElementById(t) ||
            document.querySelector(`a[name="${t}"]`)
          );
      },
    },
    F = Bt,
    O = {
      byId(e) {
        return document.getElementById(e) || R(`no id found for ${e}`);
      },
      removeClass(e, t) {
        e.classList.remove(t),
          e.classList.length === 0 && e.removeAttribute("class");
      },
      all(e, t, i) {
        if (!e) return [];
        let s = Array.from(e.querySelectorAll(t));
        return i ? s.forEach(i) : s;
      },
      childNodeLength(e) {
        let t = document.createElement("template");
        return (t.innerHTML = e), t.content.childElementCount;
      },
      isUploadInput(e) {
        return e.type === "file" && e.getAttribute(Y) !== null;
      },
      findUploadInputs(e) {
        return this.all(e, `input[type="file"][${Y}]`);
      },
      findComponentNodeList(e, t) {
        return this.filterWithinSameLiveView(this.all(e, `[${I}="${t}"]`), e);
      },
      isPhxDestroyed(e) {
        return !!(e.id && O.private(e, "destroyed"));
      },
      wantsNewTab(e) {
        return (
          e.ctrlKey ||
          e.shiftKey ||
          e.metaKey ||
          (e.button && e.button === 1) ||
          e.target.getAttribute("target") === "_blank"
        );
      },
      isUnloadableFormSubmit(e) {
        return !e.defaultPrevented && !this.wantsNewTab(e);
      },
      isNewPageHref(e, t) {
        let i;
        try {
          i = new URL(e);
        } catch (s) {
          try {
            i = new URL(e, t);
          } catch (n) {
            return !0;
          }
        }
        return i.host === t.host &&
          i.protocol === t.protocol &&
          i.pathname === t.pathname &&
          i.search === t.search
          ? i.hash === "" && !i.href.endsWith("#")
          : !0;
      },
      markPhxChildDestroyed(e) {
        this.isPhxChild(e) && e.setAttribute(z, ""),
          this.putPrivate(e, "destroyed", !0);
      },
      findPhxChildrenInFragment(e, t) {
        let i = document.createElement("template");
        return (i.innerHTML = e), this.findPhxChildren(i.content, t);
      },
      isIgnored(e, t) {
        return (
          (e.getAttribute(t) || e.getAttribute("data-phx-update")) === "ignore"
        );
      },
      isPhxUpdate(e, t, i) {
        return e.getAttribute && i.indexOf(e.getAttribute(t)) >= 0;
      },
      findPhxSticky(e) {
        return this.all(e, `[${kt}]`);
      },
      findPhxChildren(e, t) {
        return this.all(e, `${ie}[${ee}="${t}"]`);
      },
      findParentCIDs(e, t) {
        let i = new Set(t),
          s = t.reduce((n, r) => {
            let a = `[${I}="${r}"] [${I}]`;
            return (
              this.filterWithinSameLiveView(this.all(e, a), e)
                .map((o) => parseInt(o.getAttribute(I)))
                .forEach((o) => n.delete(o)),
              n
            );
          }, i);
        return s.size === 0 ? new Set(t) : s;
      },
      filterWithinSameLiveView(e, t) {
        return t.querySelector(ie)
          ? e.filter((i) => this.withinSameLiveView(i, t))
          : e;
      },
      withinSameLiveView(e, t) {
        for (; (e = e.parentNode); ) {
          if (e.isSameNode(t)) return !0;
          if (e.getAttribute(z) !== null) return !1;
        }
      },
      private(e, t) {
        return e[N] && e[N][t];
      },
      deletePrivate(e, t) {
        e[N] && delete e[N][t];
      },
      putPrivate(e, t, i) {
        e[N] || (e[N] = {}), (e[N][t] = i);
      },
      updatePrivate(e, t, i, s) {
        let n = this.private(e, t);
        n === void 0
          ? this.putPrivate(e, t, s(i))
          : this.putPrivate(e, t, s(n));
      },
      copyPrivates(e, t) {
        t[N] && (e[N] = t[N]);
      },
      putTitle(e) {
        let t = document.querySelector("title");
        if (t) {
          let { prefix: i, suffix: s } = t.dataset;
          document.title = `${i || ""}${e}${s || ""}`;
        } else document.title = e;
      },
      debounce(e, t, i, s, n, r, a, o) {
        let l = e.getAttribute(i),
          h = e.getAttribute(n);
        l === "" && (l = s), h === "" && (h = r);
        let c = l || h;
        switch (c) {
          case null:
            return o();
          case "blur":
            this.once(e, "debounce-blur") &&
              e.addEventListener("blur", () => o());
            return;
          default:
            let p = parseInt(c),
              g = () => (h ? this.deletePrivate(e, _e) : o()),
              f = this.incCycle(e, le, g);
            if (isNaN(p)) return R(`invalid throttle/debounce value: ${c}`);
            if (h) {
              let v = !1;
              if (t.type === "keydown") {
                let C = this.private(e, Tt);
                this.putPrivate(e, Tt, t.key), (v = C !== t.key);
              }
              if (!v && this.private(e, _e)) return !1;
              o(),
                this.putPrivate(e, _e, !0),
                setTimeout(() => {
                  a() && this.triggerCycle(e, le);
                }, p);
            } else
              setTimeout(() => {
                a() && this.triggerCycle(e, le, f);
              }, p);
            let m = e.form;
            m &&
              this.once(m, "bind-debounce") &&
              m.addEventListener("submit", () => {
                Array.from(new FormData(m).entries(), ([v]) => {
                  let C = m.querySelector(`[name="${v}"]`);
                  this.incCycle(C, le), this.deletePrivate(C, _e);
                });
              }),
              this.once(e, "bind-debounce") &&
                e.addEventListener("blur", () => this.triggerCycle(e, le));
        }
      },
      triggerCycle(e, t, i) {
        let [s, n] = this.private(e, t);
        i || (i = s), i === s && (this.incCycle(e, t), n());
      },
      once(e, t) {
        return this.private(e, t) === !0 ? !1 : (this.putPrivate(e, t, !0), !0);
      },
      incCycle(e, t, i = function () {}) {
        let [s] = this.private(e, t) || [0, i];
        return s++, this.putPrivate(e, t, [s, i]), s;
      },
      discardError(e, t, i) {
        let s = t.getAttribute && t.getAttribute(i),
          n =
            s && e.querySelector(`[id="${s}"], [name="${s}"], [name="${s}[]"]`);
        !n || this.private(n, at) || this.private(n, Me) || t.classList.add(Ge);
      },
      resetForm(e, t) {
        Array.from(e.elements).forEach((i) => {
          let s = `[${t}="${i.id}"],
                   [${t}="${i.name}"],
                   [${t}="${i.name.replace(/\[\]$/, "")}"]`;
          this.deletePrivate(i, at),
            this.deletePrivate(i, Me),
            this.all(document, s, (n) => {
              n.classList.add(Ge);
            });
        });
      },
      showError(e, t) {
        (e.id || e.name) &&
          this.all(e.form, `[${t}="${e.id}"], [${t}="${e.name}"]`, (i) => {
            this.removeClass(i, Ge);
          });
      },
      isPhxChild(e) {
        return e.getAttribute && e.getAttribute(ee);
      },
      isPhxSticky(e) {
        return e.getAttribute && e.getAttribute(kt) !== null;
      },
      firstPhxChild(e) {
        return this.isPhxChild(e) ? e : this.all(e, `[${ee}]`)[0];
      },
      dispatchEvent(e, t, i = {}) {
        let n = {
            bubbles: i.bubbles === void 0 ? !0 : !!i.bubbles,
            cancelable: !0,
            detail: i.detail || {},
          },
          r =
            t === "click" ? new MouseEvent("click", n) : new CustomEvent(t, n);
        e.dispatchEvent(r);
      },
      cloneNode(e, t) {
        if (typeof t == "undefined") return e.cloneNode(!0);
        {
          let i = e.cloneNode(!1);
          return (i.innerHTML = t), i;
        }
      },
      mergeAttrs(e, t, i = {}) {
        let s = i.exclude || [],
          n = i.isIgnored,
          r = t.attributes;
        for (let o = r.length - 1; o >= 0; o--) {
          let l = r[o].name;
          s.indexOf(l) < 0 && e.setAttribute(l, t.getAttribute(l));
        }
        let a = e.attributes;
        for (let o = a.length - 1; o >= 0; o--) {
          let l = a[o].name;
          n
            ? l.startsWith("data-") &&
              !t.hasAttribute(l) &&
              e.removeAttribute(l)
            : t.hasAttribute(l) || e.removeAttribute(l);
        }
      },
      mergeFocusedInput(e, t) {
        e instanceof HTMLSelectElement ||
          O.mergeAttrs(e, t, { exclude: ["value"] }),
          t.readOnly
            ? e.setAttribute("readonly", !0)
            : e.removeAttribute("readonly");
      },
      hasSelectionRange(e) {
        return (
          e.setSelectionRange && (e.type === "text" || e.type === "textarea")
        );
      },
      restoreFocus(e, t, i) {
        if (!O.isTextualInput(e)) return;
        let s = e.matches(":focus");
        e.readOnly && e.blur(),
          s || e.focus(),
          this.hasSelectionRange(e) && e.setSelectionRange(t, i);
      },
      isFormInput(e) {
        return (
          /^(?:input|select|textarea)$/i.test(e.tagName) && e.type !== "button"
        );
      },
      syncAttrsToProps(e) {
        e instanceof HTMLInputElement &&
          jt.indexOf(e.type.toLocaleLowerCase()) >= 0 &&
          (e.checked = e.getAttribute("checked") !== null);
      },
      isTextualInput(e) {
        return yi.indexOf(e.type) >= 0;
      },
      isNowTriggerFormExternal(e, t) {
        return e.getAttribute && e.getAttribute(t) !== null;
      },
      syncPendingRef(e, t, i) {
        let s = e.getAttribute(U);
        if (s === null) return !0;
        let n = e.getAttribute(G);
        return O.isFormInput(e) || e.getAttribute(i) !== null
          ? (O.isUploadInput(e) && O.mergeAttrs(e, t, { isIgnored: !0 }),
            O.putPrivate(e, U, t),
            !1)
          : ($t.forEach((r) => {
              e.classList.contains(r) && t.classList.add(r);
            }),
            t.setAttribute(U, s),
            t.setAttribute(G, n),
            !0);
      },
      cleanChildNodes(e, t) {
        if (O.isPhxUpdate(e, t, ["append", "prepend"])) {
          let i = [];
          e.childNodes.forEach((s) => {
            s.id ||
              ((s.nodeType === Node.TEXT_NODE && s.nodeValue.trim() === "") ||
                R(`only HTML element tags with an id are allowed inside containers with phx-update.

removing illegal node: "${(s.outerHTML || s.nodeValue).trim()}"

`),
              i.push(s));
          }),
            i.forEach((s) => s.remove());
        }
      },
      replaceRootContainer(e, t, i) {
        let s = new Set(["id", z, ue, ht, pe]);
        if (e.tagName.toLowerCase() === t.toLowerCase())
          return (
            Array.from(e.attributes)
              .filter((n) => !s.has(n.name.toLowerCase()))
              .forEach((n) => e.removeAttribute(n.name)),
            Object.keys(i)
              .filter((n) => !s.has(n.toLowerCase()))
              .forEach((n) => e.setAttribute(n, i[n])),
            e
          );
        {
          let n = document.createElement(t);
          return (
            Object.keys(i).forEach((r) => n.setAttribute(r, i[r])),
            s.forEach((r) => n.setAttribute(r, e.getAttribute(r))),
            (n.innerHTML = e.innerHTML),
            e.replaceWith(n),
            n
          );
        }
      },
      getSticky(e, t, i) {
        let s = (O.private(e, "sticky") || []).find(([n]) => t === n);
        if (s) {
          let [n, r, a] = s;
          return a;
        } else return typeof i == "function" ? i() : i;
      },
      deleteSticky(e, t) {
        this.updatePrivate(e, "sticky", [], (i) =>
          i.filter(([s, n]) => s !== t),
        );
      },
      putSticky(e, t, i) {
        let s = i(e);
        this.updatePrivate(e, "sticky", [], (n) => {
          let r = n.findIndex(([a]) => t === a);
          return r >= 0 ? (n[r] = [t, i, s]) : n.push([t, i, s]), n;
        });
      },
      applyStickyOperations(e) {
        let t = O.private(e, "sticky");
        !t || t.forEach(([i, s, n]) => this.putSticky(e, i, s));
      },
    },
    d = O,
    it = class {
      static isActive(e, t) {
        let i = t._phxRef === void 0,
          n = e.getAttribute(nt).split(",").indexOf(P.genFileRef(t)) >= 0;
        return t.size > 0 && (i || n);
      }
      static isPreflighted(e, t) {
        return (
          e.getAttribute(lt).split(",").indexOf(P.genFileRef(t)) >= 0 &&
          this.isActive(e, t)
        );
      }
      constructor(e, t, i) {
        (this.ref = P.genFileRef(t)),
          (this.fileEl = e),
          (this.file = t),
          (this.view = i),
          (this.meta = null),
          (this._isCancelled = !1),
          (this._isDone = !1),
          (this._progress = 0),
          (this._lastProgressSent = -1),
          (this._onDone = function () {}),
          (this._onElUpdated = this.onElUpdated.bind(this)),
          this.fileEl.addEventListener(Oe, this._onElUpdated);
      }
      metadata() {
        return this.meta;
      }
      progress(e) {
        (this._progress = Math.floor(e)),
          this._progress > this._lastProgressSent &&
            (this._progress >= 100
              ? ((this._progress = 100),
                (this._lastProgressSent = 100),
                (this._isDone = !0),
                this.view.pushFileProgress(this.fileEl, this.ref, 100, () => {
                  P.untrackFile(this.fileEl, this.file), this._onDone();
                }))
              : ((this._lastProgressSent = this._progress),
                this.view.pushFileProgress(
                  this.fileEl,
                  this.ref,
                  this._progress,
                )));
      }
      cancel() {
        (this._isCancelled = !0), (this._isDone = !0), this._onDone();
      }
      isDone() {
        return this._isDone;
      }
      error(e = "failed") {
        this.fileEl.removeEventListener(Oe, this._onElUpdated),
          this.view.pushFileProgress(this.fileEl, this.ref, { error: e }),
          P.clearFiles(this.fileEl);
      }
      onDone(e) {
        this._onDone = () => {
          this.fileEl.removeEventListener(Oe, this._onElUpdated), e();
        };
      }
      onElUpdated() {
        this.fileEl.getAttribute(nt).split(",").indexOf(this.ref) === -1 &&
          this.cancel();
      }
      toPreflightPayload() {
        return {
          last_modified: this.file.lastModified,
          name: this.file.name,
          relative_path: this.file.webkitRelativePath,
          size: this.file.size,
          type: this.file.type,
          ref: this.ref,
        };
      }
      uploader(e) {
        if (this.meta.uploader) {
          let t =
            e[this.meta.uploader] ||
            R(`no uploader configured for ${this.meta.uploader}`);
          return { name: this.meta.uploader, callback: t };
        } else return { name: "channel", callback: Hi };
      }
      zipPostFlight(e) {
        (this.meta = e.entries[this.ref]),
          this.meta ||
            R(`no preflight upload response returned with ref ${this.ref}`, {
              input: this.fileEl,
              response: e,
            });
      }
    },
    Ni = 0,
    P = class {
      static genFileRef(e) {
        let t = e._phxRef;
        return t !== void 0 ? t : ((e._phxRef = (Ni++).toString()), e._phxRef);
      }
      static getEntryDataURL(e, t, i) {
        let s = this.activeFiles(e).find((n) => this.genFileRef(n) === t);
        i(URL.createObjectURL(s));
      }
      static hasUploadsInProgress(e) {
        let t = 0;
        return (
          d.findUploadInputs(e).forEach((i) => {
            i.getAttribute(lt) !== i.getAttribute(vi) && t++;
          }),
          t > 0
        );
      }
      static serializeUploads(e) {
        let t = this.activeFiles(e),
          i = {};
        return (
          t.forEach((s) => {
            let n = { path: e.name },
              r = e.getAttribute(Y);
            (i[r] = i[r] || []),
              (n.ref = this.genFileRef(s)),
              (n.last_modified = s.lastModified),
              (n.name = s.name || n.ref),
              (n.relative_path = s.webkitRelativePath),
              (n.type = s.type),
              (n.size = s.size),
              i[r].push(n);
          }),
          i
        );
      }
      static clearFiles(e) {
        (e.value = null), e.removeAttribute(Y), d.putPrivate(e, "files", []);
      }
      static untrackFile(e, t) {
        d.putPrivate(
          e,
          "files",
          d.private(e, "files").filter((i) => !Object.is(i, t)),
        );
      }
      static trackFiles(e, t, i) {
        if (e.getAttribute("multiple") !== null) {
          let s = t.filter(
            (n) => !this.activeFiles(e).find((r) => Object.is(r, n)),
          );
          d.putPrivate(e, "files", this.activeFiles(e).concat(s)),
            (e.value = null);
        } else
          i && i.files.length > 0 && (e.files = i.files),
            d.putPrivate(e, "files", t);
      }
      static activeFileInputs(e) {
        let t = d.findUploadInputs(e);
        return Array.from(t).filter(
          (i) => i.files && this.activeFiles(i).length > 0,
        );
      }
      static activeFiles(e) {
        return (d.private(e, "files") || []).filter((t) => it.isActive(e, t));
      }
      static inputsAwaitingPreflight(e) {
        let t = d.findUploadInputs(e);
        return Array.from(t).filter(
          (i) => this.filesAwaitingPreflight(i).length > 0,
        );
      }
      static filesAwaitingPreflight(e) {
        return this.activeFiles(e).filter((t) => !it.isPreflighted(e, t));
      }
      constructor(e, t, i) {
        (this.view = t),
          (this.onComplete = i),
          (this._entries = Array.from(P.filesAwaitingPreflight(e) || []).map(
            (s) => new it(e, s, t),
          )),
          (this.numEntriesInProgress = this._entries.length);
      }
      entries() {
        return this._entries;
      }
      initAdapterUpload(e, t, i) {
        this._entries = this._entries.map(
          (n) => (
            n.zipPostFlight(e),
            n.onDone(() => {
              this.numEntriesInProgress--,
                this.numEntriesInProgress === 0 && this.onComplete();
            }),
            n
          ),
        );
        let s = this._entries.reduce((n, r) => {
          let { name: a, callback: o } = r.uploader(i.uploaders);
          return (
            (n[a] = n[a] || { callback: o, entries: [] }),
            n[a].entries.push(r),
            n
          );
        }, {});
        for (let n in s) {
          let { callback: r, entries: a } = s[n];
          r(a, t, e, i);
        }
      }
    },
    Mi = {
      focusMain() {
        let e = document.querySelector("main h1, main, h1");
        if (e) {
          let t = e.tabIndex;
          (e.tabIndex = -1), e.focus(), (e.tabIndex = t);
        }
      },
      anyOf(e, t) {
        return t.find((i) => e instanceof i);
      },
      isFocusable(e, t) {
        return (
          (e instanceof HTMLAnchorElement && e.rel !== "ignore") ||
          (e instanceof HTMLAreaElement && e.href !== void 0) ||
          (!e.disabled &&
            this.anyOf(e, [
              HTMLInputElement,
              HTMLSelectElement,
              HTMLTextAreaElement,
              HTMLButtonElement,
            ])) ||
          e instanceof HTMLIFrameElement ||
          e.tabIndex > 0 ||
          (!t &&
            e.tabIndex === 0 &&
            e.getAttribute("tabindex") !== null &&
            e.getAttribute("aria-hidden") !== "true")
        );
      },
      attemptFocus(e, t) {
        if (this.isFocusable(e, t))
          try {
            e.focus();
          } catch (i) {}
        return !!document.activeElement && document.activeElement.isSameNode(e);
      },
      focusFirstInteractive(e) {
        let t = e.firstElementChild;
        for (; t; ) {
          if (this.attemptFocus(t, !0) || this.focusFirstInteractive(t, !0))
            return !0;
          t = t.nextElementSibling;
        }
      },
      focusFirst(e) {
        let t = e.firstElementChild;
        for (; t; ) {
          if (this.attemptFocus(t) || this.focusFirst(t)) return !0;
          t = t.nextElementSibling;
        }
      },
      focusLast(e) {
        let t = e.lastElementChild;
        for (; t; ) {
          if (this.attemptFocus(t) || this.focusLast(t)) return !0;
          t = t.previousElementSibling;
        }
      },
    },
    te = Mi,
    Fi = {
      LiveFileUpload: {
        activeRefs() {
          return this.el.getAttribute(nt);
        },
        preflightedRefs() {
          return this.el.getAttribute(lt);
        },
        mounted() {
          this.preflightedWas = this.preflightedRefs();
        },
        updated() {
          let e = this.preflightedRefs();
          this.preflightedWas !== e &&
            ((this.preflightedWas = e),
            e === "" && this.__view.cancelSubmit(this.el.form)),
            this.activeRefs() === "" && (this.el.value = null),
            this.el.dispatchEvent(new CustomEvent(Oe));
        },
      },
      LiveImgPreview: {
        mounted() {
          (this.ref = this.el.getAttribute("data-phx-entry-ref")),
            (this.inputEl = document.getElementById(this.el.getAttribute(Y))),
            P.getEntryDataURL(this.inputEl, this.ref, (e) => {
              (this.url = e), (this.el.src = e);
            });
        },
        destroyed() {
          URL.revokeObjectURL(this.url);
        },
      },
      FocusWrap: {
        mounted() {
          (this.focusStart = this.el.firstElementChild),
            (this.focusEnd = this.el.lastElementChild),
            this.focusStart.addEventListener("focus", () =>
              te.focusLast(this.el),
            ),
            this.focusEnd.addEventListener("focus", () =>
              te.focusFirst(this.el),
            ),
            this.el.addEventListener("phx:show-end", () => this.el.focus()),
            window.getComputedStyle(this.el).display !== "none" &&
              te.focusFirst(this.el);
        },
      },
    },
    $i = Fi,
    Ui = class {
      constructor(e, t, i) {
        let s = new Set(),
          n = new Set([...t.children].map((a) => a.id)),
          r = [];
        Array.from(e.children).forEach((a) => {
          if (a.id && (s.add(a.id), n.has(a.id))) {
            let o = a.previousElementSibling && a.previousElementSibling.id;
            r.push({ elementId: a.id, previousElementId: o });
          }
        }),
          (this.containerId = t.id),
          (this.updateType = i),
          (this.elementsToModify = r),
          (this.elementIdsToAdd = [...n].filter((a) => !s.has(a)));
      }
      perform() {
        let e = d.byId(this.containerId);
        this.elementsToModify.forEach((t) => {
          t.previousElementId
            ? W(document.getElementById(t.previousElementId), (i) => {
                W(document.getElementById(t.elementId), (s) => {
                  (s.previousElementSibling &&
                    s.previousElementSibling.id == i.id) ||
                    i.insertAdjacentElement("afterend", s);
                });
              })
            : W(document.getElementById(t.elementId), (i) => {
                i.previousElementSibling == null ||
                  e.insertAdjacentElement("afterbegin", i);
              });
        }),
          this.updateType == "prepend" &&
            this.elementIdsToAdd.reverse().forEach((t) => {
              W(document.getElementById(t), (i) =>
                e.insertAdjacentElement("afterbegin", i),
              );
            });
      }
    },
    Lt = 11;
  function ji(e, t) {
    var i = t.attributes,
      s,
      n,
      r,
      a,
      o;
    if (!(t.nodeType === Lt || e.nodeType === Lt)) {
      for (var l = i.length - 1; l >= 0; l--)
        (s = i[l]),
          (n = s.name),
          (r = s.namespaceURI),
          (a = s.value),
          r
            ? ((n = s.localName || n),
              (o = e.getAttributeNS(r, n)),
              o !== a &&
                (s.prefix === "xmlns" && (n = s.name),
                e.setAttributeNS(r, n, a)))
            : ((o = e.getAttribute(n)), o !== a && e.setAttribute(n, a));
      for (var h = e.attributes, c = h.length - 1; c >= 0; c--)
        (s = h[c]),
          (n = s.name),
          (r = s.namespaceURI),
          r
            ? ((n = s.localName || n),
              t.hasAttributeNS(r, n) || e.removeAttributeNS(r, n))
            : t.hasAttribute(n) || e.removeAttribute(n);
    }
  }
  var Re,
    Bi = "http://www.w3.org/1999/xhtml",
    x = typeof document == "undefined" ? void 0 : document,
    Ji = !!x && "content" in x.createElement("template"),
    Vi = !!x && x.createRange && "createContextualFragment" in x.createRange();
  function qi(e) {
    var t = x.createElement("template");
    return (t.innerHTML = e), t.content.childNodes[0];
  }
  function Xi(e) {
    Re || ((Re = x.createRange()), Re.selectNode(x.body));
    var t = Re.createContextualFragment(e);
    return t.childNodes[0];
  }
  function Wi(e) {
    var t = x.createElement("body");
    return (t.innerHTML = e), t.childNodes[0];
  }
  function zi(e) {
    return (e = e.trim()), Ji ? qi(e) : Vi ? Xi(e) : Wi(e);
  }
  function xe(e, t) {
    var i = e.nodeName,
      s = t.nodeName,
      n,
      r;
    return i === s
      ? !0
      : ((n = i.charCodeAt(0)),
        (r = s.charCodeAt(0)),
        n <= 90 && r >= 97
          ? i === s.toUpperCase()
          : r <= 90 && n >= 97
            ? s === i.toUpperCase()
            : !1);
  }
  function Ki(e, t) {
    return !t || t === Bi ? x.createElement(e) : x.createElementNS(t, e);
  }
  function Gi(e, t) {
    for (var i = e.firstChild; i; ) {
      var s = i.nextSibling;
      t.appendChild(i), (i = s);
    }
    return t;
  }
  function st(e, t, i) {
    e[i] !== t[i] &&
      ((e[i] = t[i]), e[i] ? e.setAttribute(i, "") : e.removeAttribute(i));
  }
  var Dt = {
      OPTION: function (e, t) {
        var i = e.parentNode;
        if (i) {
          var s = i.nodeName.toUpperCase();
          s === "OPTGROUP" &&
            ((i = i.parentNode), (s = i && i.nodeName.toUpperCase())),
            s === "SELECT" &&
              !i.hasAttribute("multiple") &&
              (e.hasAttribute("selected") &&
                !t.selected &&
                (e.setAttribute("selected", "selected"),
                e.removeAttribute("selected")),
              (i.selectedIndex = -1));
        }
        st(e, t, "selected");
      },
      INPUT: function (e, t) {
        st(e, t, "checked"),
          st(e, t, "disabled"),
          e.value !== t.value && (e.value = t.value),
          t.hasAttribute("value") || e.removeAttribute("value");
      },
      TEXTAREA: function (e, t) {
        var i = t.value;
        e.value !== i && (e.value = i);
        var s = e.firstChild;
        if (s) {
          var n = s.nodeValue;
          if (n == i || (!i && n == e.placeholder)) return;
          s.nodeValue = i;
        }
      },
      SELECT: function (e, t) {
        if (!t.hasAttribute("multiple")) {
          for (var i = -1, s = 0, n = e.firstChild, r, a; n; )
            if (
              ((a = n.nodeName && n.nodeName.toUpperCase()), a === "OPTGROUP")
            )
              (r = n), (n = r.firstChild);
            else {
              if (a === "OPTION") {
                if (n.hasAttribute("selected")) {
                  i = s;
                  break;
                }
                s++;
              }
              (n = n.nextSibling), !n && r && ((n = r.nextSibling), (r = null));
            }
          e.selectedIndex = i;
        }
      },
    },
    de = 1,
    It = 11,
    Ot = 3,
    Ht = 8;
  function q() {}
  function Yi(e) {
    if (e) return (e.getAttribute && e.getAttribute("id")) || e.id;
  }
  function Qi(e) {
    return function (i, s, n) {
      if ((n || (n = {}), typeof s == "string"))
        if (
          i.nodeName === "#document" ||
          i.nodeName === "HTML" ||
          i.nodeName === "BODY"
        ) {
          var r = s;
          (s = x.createElement("html")), (s.innerHTML = r);
        } else s = zi(s);
      else s.nodeType === It && (s = s.firstElementChild);
      var a = n.getNodeKey || Yi,
        o = n.onBeforeNodeAdded || q,
        l = n.onNodeAdded || q,
        h = n.onBeforeElUpdated || q,
        c = n.onElUpdated || q,
        p = n.onBeforeNodeDiscarded || q,
        g = n.onNodeDiscarded || q,
        f = n.onBeforeElChildrenUpdated || q,
        m = n.skipFromChildren || q,
        v =
          n.addChild ||
          function (w, b) {
            return w.appendChild(b);
          },
        C = n.childrenOnly === !0,
        u = Object.create(null),
        y = [];
      function k(w) {
        y.push(w);
      }
      function T(w, b) {
        if (w.nodeType === de)
          for (var E = w.firstChild; E; ) {
            var S = void 0;
            b && (S = a(E)) ? k(S) : (g(E), E.firstChild && T(E, b)),
              (E = E.nextSibling);
          }
      }
      function ge(w, b, E) {
        p(w) !== !1 && (b && b.removeChild(w), g(w), T(w, E));
      }
      function dt(w) {
        if (w.nodeType === de || w.nodeType === It)
          for (var b = w.firstChild; b; ) {
            var E = a(b);
            E && (u[E] = b), dt(b), (b = b.nextSibling);
          }
      }
      dt(i);
      function je(w) {
        l(w);
        for (var b = w.firstChild; b; ) {
          var E = b.nextSibling,
            S = a(b);
          if (S) {
            var A = u[S];
            A && xe(b, A) ? (b.parentNode.replaceChild(A, b), me(A, b)) : je(b);
          } else je(b);
          b = E;
        }
      }
      function zt(w, b, E) {
        for (; b; ) {
          var S = b.nextSibling;
          (E = a(b)) ? k(E) : ge(b, w, !0), (b = S);
        }
      }
      function me(w, b, E) {
        var S = a(b);
        S && delete u[S],
          !(!E && (h(w, b) === !1 || (e(w, b), c(w), f(w, b) === !1))) &&
            (w.nodeName !== "TEXTAREA" ? Kt(w, b) : Dt.TEXTAREA(w, b));
      }
      function Kt(w, b) {
        var E = m(w),
          S = b.firstChild,
          A = w.firstChild,
          Q,
          B,
          Z,
          be,
          J;
        e: for (; S; ) {
          for (be = S.nextSibling, Q = a(S); !E && A; ) {
            if (((Z = A.nextSibling), S.isSameNode && S.isSameNode(A))) {
              (S = be), (A = Z);
              continue e;
            }
            B = a(A);
            var ye = A.nodeType,
              V = void 0;
            if (
              (ye === S.nodeType &&
                (ye === de
                  ? (Q
                      ? Q !== B &&
                        ((J = u[Q])
                          ? Z === J
                            ? (V = !1)
                            : (w.insertBefore(J, A),
                              B ? k(B) : ge(A, w, !0),
                              (A = J))
                          : (V = !1))
                      : B && (V = !1),
                    (V = V !== !1 && xe(A, S)),
                    V && me(A, S))
                  : (ye === Ot || ye == Ht) &&
                    ((V = !0),
                    A.nodeValue !== S.nodeValue &&
                      (A.nodeValue = S.nodeValue))),
              V)
            ) {
              (S = be), (A = Z);
              continue e;
            }
            B ? k(B) : ge(A, w, !0), (A = Z);
          }
          if (Q && (J = u[Q]) && xe(J, S)) E || v(w, J), me(J, S);
          else {
            var Ve = o(S);
            Ve !== !1 &&
              (Ve && (S = Ve),
              S.actualize && (S = S.actualize(w.ownerDocument || x)),
              v(w, S),
              je(S));
          }
          (S = be), (A = Z);
        }
        zt(w, A, B);
        var ut = Dt[w.nodeName];
        ut && ut(w, b);
      }
      var _ = i,
        ve = _.nodeType,
        ct = s.nodeType;
      if (!C) {
        if (ve === de)
          ct === de
            ? xe(i, s) || (g(i), (_ = Gi(i, Ki(s.nodeName, s.namespaceURI))))
            : (_ = s);
        else if (ve === Ot || ve === Ht) {
          if (ct === ve)
            return (
              _.nodeValue !== s.nodeValue && (_.nodeValue = s.nodeValue), _
            );
          _ = s;
        }
      }
      if (_ === s) g(i);
      else {
        if (s.isSameNode && s.isSameNode(_)) return;
        if ((me(_, s, C), y))
          for (var Be = 0, Gt = y.length; Be < Gt; Be++) {
            var Je = u[y[Be]];
            Je && ge(Je, Je.parentNode, !1);
          }
      }
      return (
        !C &&
          _ !== i &&
          i.parentNode &&
          (_.actualize && (_ = _.actualize(i.ownerDocument || x)),
          i.parentNode.replaceChild(_, i)),
        _
      );
    };
  }
  var Zi = Qi(ji),
    Nt = Zi,
    Le = class {
      static patchEl(e, t, i) {
        Nt(e, t, {
          childrenOnly: !1,
          onBeforeElUpdated: (s, n) => {
            if (i && i.isSameNode(s) && d.isFormInput(s))
              return d.mergeFocusedInput(s, n), !1;
          },
        });
      }
      constructor(e, t, i, s, n, r) {
        (this.view = e),
          (this.liveSocket = e.liveSocket),
          (this.container = t),
          (this.id = i),
          (this.rootID = e.root.id),
          (this.html = s),
          (this.streams = n),
          (this.streamInserts = {}),
          (this.targetCID = r),
          (this.cidPatch = X(this.targetCID)),
          (this.pendingRemoves = []),
          (this.phxRemove = this.liveSocket.binding("remove")),
          (this.callbacks = {
            beforeadded: [],
            beforeupdated: [],
            beforephxChildAdded: [],
            afteradded: [],
            afterupdated: [],
            afterdiscarded: [],
            afterphxChildAdded: [],
            aftertransitionsDiscarded: [],
          });
      }
      before(e, t) {
        this.callbacks[`before${e}`].push(t);
      }
      after(e, t) {
        this.callbacks[`after${e}`].push(t);
      }
      trackBefore(e, ...t) {
        this.callbacks[`before${e}`].forEach((i) => i(...t));
      }
      trackAfter(e, ...t) {
        this.callbacks[`after${e}`].forEach((i) => i(...t));
      }
      markPrunableContentForRemoval() {
        let e = this.liveSocket.binding(Fe);
        d.all(this.container, `[${e}=${Qe}]`, (t) => (t.innerHTML = "")),
          d.all(
            this.container,
            `[${e}=append] > *, [${e}=prepend] > *`,
            (t) => {
              t.setAttribute(yt, "");
            },
          );
      }
      perform() {
        let { view: e, liveSocket: t, container: i, html: s } = this,
          n = this.isCIDPatch() ? this.targetCIDContainer(s) : i;
        if (this.isCIDPatch() && !n) return;
        let r = t.getActiveElement(),
          { selectionStart: a, selectionEnd: o } =
            r && d.hasSelectionRange(r) ? r : {},
          l = t.binding(Fe),
          h = t.binding(Ne),
          c = t.binding(ot),
          p = t.binding(bi),
          g = [],
          f = [],
          m = [],
          v = null,
          C = t.time("premorph container prep", () =>
            this.buildDiffHTML(i, s, l, n),
          );
        return (
          this.trackBefore("added", i),
          this.trackBefore("updated", i, i),
          t.time("morphdom", () => {
            this.streams.forEach(([u, y]) => {
              (this.streamInserts = Object.assign(this.streamInserts, u)),
                y.forEach((k) => {
                  let T = i.querySelector(`[id="${k}"]`);
                  T &&
                    (this.maybePendingRemove(T) ||
                      (T.remove(), this.onNodeDiscarded(T)));
                });
            }),
              Nt(n, C, {
                childrenOnly: n.getAttribute(I) === null,
                getNodeKey: (u) => (d.isPhxDestroyed(u) ? null : u.id),
                skipFromChildren: (u) => u.getAttribute(l) === Qe,
                addChild: (u, y) => {
                  let k = y.id ? this.streamInserts[y.id] : void 0;
                  if (k === void 0) return u.appendChild(y);
                  if (k === 0) u.insertAdjacentElement("afterbegin", y);
                  else if (k === -1) u.appendChild(y);
                  else if (k > 0) {
                    let T = Array.from(u.children)[k];
                    u.insertBefore(y, T);
                  }
                },
                onBeforeNodeAdded: (u) => (this.trackBefore("added", u), u),
                onNodeAdded: (u) => {
                  u instanceof HTMLImageElement && u.srcset
                    ? (u.srcset = u.srcset)
                    : u instanceof HTMLVideoElement && u.autoplay && u.play(),
                    d.isNowTriggerFormExternal(u, p) && (v = u),
                    d.discardError(n, u, h),
                    ((d.isPhxChild(u) && e.ownsElement(u)) ||
                      (d.isPhxSticky(u) && e.ownsElement(u.parentNode))) &&
                      this.trackAfter("phxChildAdded", u),
                    g.push(u);
                },
                onNodeDiscarded: (u) => this.onNodeDiscarded(u),
                onBeforeNodeDiscarded: (u) =>
                  u.getAttribute && u.getAttribute(yt) !== null
                    ? !0
                    : !(
                        (u.parentElement !== null &&
                          u.id &&
                          d.isPhxUpdate(u.parentElement, l, [
                            Qe,
                            "append",
                            "prepend",
                          ])) ||
                        this.maybePendingRemove(u) ||
                        this.skipCIDSibling(u)
                      ),
                onElUpdated: (u) => {
                  d.isNowTriggerFormExternal(u, p) && (v = u),
                    f.push(u),
                    this.maybeReOrderStream(u);
                },
                onBeforeElUpdated: (u, y) => {
                  if (
                    (d.cleanChildNodes(y, l),
                    this.skipCIDSibling(y) || d.isPhxSticky(u))
                  )
                    return !1;
                  if (d.isIgnored(u, l) || (u.form && u.form.isSameNode(v)))
                    return (
                      this.trackBefore("updated", u, y),
                      d.mergeAttrs(u, y, { isIgnored: !0 }),
                      f.push(u),
                      d.applyStickyOperations(u),
                      !1
                    );
                  if (u.type === "number" && u.validity && u.validity.badInput)
                    return !1;
                  if (!d.syncPendingRef(u, y, c))
                    return (
                      d.isUploadInput(u) &&
                        (this.trackBefore("updated", u, y), f.push(u)),
                      d.applyStickyOperations(u),
                      !1
                    );
                  if (d.isPhxChild(y)) {
                    let T = u.getAttribute(z);
                    return (
                      d.mergeAttrs(u, y, { exclude: [ue] }),
                      T !== "" && u.setAttribute(z, T),
                      u.setAttribute(pe, this.rootID),
                      d.applyStickyOperations(u),
                      !1
                    );
                  }
                  return (
                    d.copyPrivates(y, u),
                    d.discardError(n, y, h),
                    r &&
                    u.isSameNode(r) &&
                    d.isFormInput(u) &&
                    u.type !== "hidden"
                      ? (this.trackBefore("updated", u, y),
                        d.mergeFocusedInput(u, y),
                        d.syncAttrsToProps(u),
                        f.push(u),
                        d.applyStickyOperations(u),
                        !1)
                      : (d.isPhxUpdate(y, l, ["append", "prepend"]) &&
                          m.push(new Ui(u, y, y.getAttribute(l))),
                        d.syncAttrsToProps(y),
                        d.applyStickyOperations(y),
                        this.trackBefore("updated", u, y),
                        !0)
                  );
                },
              });
          }),
          t.isDebugEnabled() && Di(),
          m.length > 0 &&
            t.time("post-morph append/prepend restoration", () => {
              m.forEach((u) => u.perform());
            }),
          t.silenceEvents(() => d.restoreFocus(r, a, o)),
          d.dispatchEvent(document, "phx:update"),
          g.forEach((u) => this.trackAfter("added", u)),
          f.forEach((u) => this.trackAfter("updated", u)),
          this.transitionPendingRemoves(),
          v && (t.unload(), v.submit()),
          !0
        );
      }
      onNodeDiscarded(e) {
        (d.isPhxChild(e) || d.isPhxSticky(e)) &&
          this.liveSocket.destroyViewByEl(e),
          this.trackAfter("discarded", e);
      }
      maybePendingRemove(e) {
        return e.getAttribute && e.getAttribute(this.phxRemove) !== null
          ? (this.pendingRemoves.push(e), !0)
          : !1;
      }
      maybeReOrderStream(e) {
        let t = e.id ? this.streamInserts[e.id] : void 0;
        if (t !== void 0) {
          if (t === 0)
            e.parentElement.insertBefore(e, e.parentElement.firstElementChild);
          else if (t > 0) {
            let i = Array.from(e.parentElement.children),
              s = i.indexOf(e);
            if (t >= i.length - 1) e.parentElement.appendChild(e);
            else {
              let n = i[t];
              s > t
                ? e.parentElement.insertBefore(e, n)
                : e.parentElement.insertBefore(e, n.nextElementSibling);
            }
          }
        }
      }
      transitionPendingRemoves() {
        let { pendingRemoves: e, liveSocket: t } = this;
        e.length > 0 &&
          (t.transitionRemoves(e),
          t.requestDOMUpdate(() => {
            e.forEach((i) => {
              let s = d.firstPhxChild(i);
              s && t.destroyViewByEl(s), i.remove();
            }),
              this.trackAfter("transitionsDiscarded", e);
          }));
      }
      isCIDPatch() {
        return this.cidPatch;
      }
      skipCIDSibling(e) {
        return e.nodeType === Node.ELEMENT_NODE && e.getAttribute(rt) !== null;
      }
      targetCIDContainer(e) {
        if (!this.isCIDPatch()) return;
        let [t, ...i] = d.findComponentNodeList(this.container, this.targetCID);
        return i.length === 0 && d.childNodeLength(e) === 1
          ? t
          : t && t.parentNode;
      }
      buildDiffHTML(e, t, i, s) {
        let n = this.isCIDPatch(),
          r = n && s.getAttribute(I) === this.targetCID.toString();
        if (!n || r) return t;
        {
          let a = null,
            o = document.createElement("template");
          a = d.cloneNode(s);
          let [l, ...h] = d.findComponentNodeList(a, this.targetCID);
          return (
            (o.innerHTML = t),
            h.forEach((c) => c.remove()),
            Array.from(a.childNodes).forEach((c) => {
              c.id &&
                c.nodeType === Node.ELEMENT_NODE &&
                c.getAttribute(I) !== this.targetCID.toString() &&
                (c.setAttribute(rt, ""), (c.innerHTML = ""));
            }),
            Array.from(o.content.childNodes).forEach((c) =>
              a.insertBefore(c, l),
            ),
            l.remove(),
            a.outerHTML
          );
        }
      }
      indexOf(e, t) {
        return Array.from(e.children).indexOf(t);
      }
    },
    Mt = class {
      static extract(e) {
        let { [Pt]: t, [_t]: i, [Rt]: s } = e;
        return (
          delete e[Pt],
          delete e[_t],
          delete e[Rt],
          { diff: e, title: s, reply: t || null, events: i || [] }
        );
      }
      constructor(e, t) {
        (this.viewId = e), (this.rendered = {}), this.mergeDiff(t);
      }
      parentViewId() {
        return this.viewId;
      }
      toString(e) {
        let [t, i] = this.recursiveToString(this.rendered, this.rendered[D], e);
        return [t, i];
      }
      recursiveToString(e, t = e[D], i) {
        i = i ? new Set(i) : null;
        let s = { buffer: "", components: t, onlyCids: i, streams: new Set() };
        return this.toOutputBuffer(e, null, s), [s.buffer, s.streams];
      }
      componentCIDs(e) {
        return Object.keys(e[D] || {}).map((t) => parseInt(t));
      }
      isComponentOnlyDiff(e) {
        return e[D] ? Object.keys(e).length === 1 : !1;
      }
      getComponent(e, t) {
        return e[D][t];
      }
      mergeDiff(e) {
        let t = e[D],
          i = {};
        if (
          (delete e[D],
          (this.rendered = this.mutableMerge(this.rendered, e)),
          (this.rendered[D] = this.rendered[D] || {}),
          t)
        ) {
          let s = this.rendered[D];
          for (let n in t) t[n] = this.cachedFindComponent(n, t[n], s, t, i);
          for (let n in t) s[n] = t[n];
          e[D] = t;
        }
      }
      cachedFindComponent(e, t, i, s, n) {
        if (n[e]) return n[e];
        {
          let r,
            a,
            o = t[M];
          if (X(o)) {
            let l;
            o > 0
              ? (l = this.cachedFindComponent(o, s[o], i, s, n))
              : (l = i[-o]),
              (a = l[M]),
              (r = this.cloneMerge(l, t)),
              (r[M] = a);
          } else r = t[M] !== void 0 ? t : this.cloneMerge(i[e] || {}, t);
          return (n[e] = r), r;
        }
      }
      mutableMerge(e, t) {
        return t[M] !== void 0 ? t : (this.doMutableMerge(e, t), e);
      }
      doMutableMerge(e, t) {
        for (let i in t) {
          let s = t[i],
            n = e[i];
          he(s) && s[M] === void 0 && he(n)
            ? this.doMutableMerge(n, s)
            : (e[i] = s);
        }
      }
      cloneMerge(e, t) {
        let i = se(se({}, e), t);
        for (let s in i) {
          let n = t[s],
            r = e[s];
          he(n) && n[M] === void 0 && he(r) && (i[s] = this.cloneMerge(r, n));
        }
        return i;
      }
      componentToString(e) {
        let [t, i] = this.recursiveCIDToString(this.rendered[D], e);
        return [t, i];
      }
      pruneCIDs(e) {
        e.forEach((t) => delete this.rendered[D][t]);
      }
      get() {
        return this.rendered;
      }
      isNewFingerprint(e = {}) {
        return !!e[M];
      }
      templateStatic(e, t) {
        return typeof e == "number" ? t[e] : e;
      }
      toOutputBuffer(e, t, i) {
        if (e[Pe]) return this.comprehensionToBuffer(e, t, i);
        let { [M]: s } = e;
        (s = this.templateStatic(s, t)), (i.buffer += s[0]);
        for (let n = 1; n < s.length; n++)
          this.dynamicToBuffer(e[n - 1], t, i), (i.buffer += s[n]);
      }
      comprehensionToBuffer(e, t, i) {
        let { [Pe]: s, [M]: n, [xi]: r } = e,
          [a, o] = r || [{}, []];
        n = this.templateStatic(n, t);
        let l = t || e[Ri];
        for (let h = 0; h < s.length; h++) {
          let c = s[h];
          i.buffer += n[0];
          for (let p = 1; p < n.length; p++)
            this.dynamicToBuffer(c[p - 1], l, i), (i.buffer += n[p]);
        }
        r !== void 0 &&
          (e[Pe].length > 0 || o.length > 0) &&
          ((e[Pe] = []), i.streams.add(r));
      }
      dynamicToBuffer(e, t, i) {
        if (typeof e == "number") {
          let [s, n] = this.recursiveCIDToString(i.components, e, i.onlyCids);
          (i.buffer += s), (i.streams = new Set([...i.streams, ...n]));
        } else he(e) ? this.toOutputBuffer(e, t, i) : (i.buffer += e);
      }
      recursiveCIDToString(e, t, i) {
        let s = e[t] || R(`no component for CID ${t}`, e),
          n = document.createElement("template"),
          [r, a] = this.recursiveToString(s, e, i);
        n.innerHTML = r;
        let o = n.content,
          l = i && !i.has(t),
          [h, c] = Array.from(o.childNodes).reduce(
            ([p, g], f, m) =>
              f.nodeType === Node.ELEMENT_NODE
                ? f.getAttribute(I)
                  ? [p, !0]
                  : (f.setAttribute(I, t),
                    f.id || (f.id = `${this.parentViewId()}-${t}-${m}`),
                    l && (f.setAttribute(rt, ""), (f.innerHTML = "")),
                    [!0, g])
                : f.nodeValue.trim() !== ""
                  ? (R(
                      `only HTML element tags are allowed at the root of components.

got: "${f.nodeValue.trim()}"

within:
`,
                      n.innerHTML.trim(),
                    ),
                    f.replaceWith(this.createSpan(f.nodeValue, t)),
                    [!0, g])
                  : (f.remove(), [p, g]),
            [!1, !1],
          );
        return !h && !c
          ? (R(
              `expected at least one HTML element tag inside a component, but the component is empty:
`,
              n.innerHTML.trim(),
            ),
            [this.createSpan("", t).outerHTML, a])
          : !h && c
            ? (R(
                "expected at least one HTML element tag directly inside a component, but only subcomponents were found. A component must render at least one HTML tag directly inside itself.",
                n.innerHTML.trim(),
              ),
              [n.innerHTML, a])
            : [n.innerHTML, a];
      }
      createSpan(e, t) {
        let i = document.createElement("span");
        return (i.innerText = e), i.setAttribute(I, t), i;
      }
    },
    es = 1,
    ce = class {
      static makeID() {
        return es++;
      }
      static elementID(e) {
        return e.phxHookId;
      }
      constructor(e, t, i) {
        (this.__view = e),
          (this.liveSocket = e.liveSocket),
          (this.__callbacks = i),
          (this.__listeners = new Set()),
          (this.__isDisconnected = !1),
          (this.el = t),
          (this.el.phxHookId = this.constructor.makeID());
        for (let s in this.__callbacks) this[s] = this.__callbacks[s];
      }
      __mounted() {
        this.mounted && this.mounted();
      }
      __updated() {
        this.updated && this.updated();
      }
      __beforeUpdate() {
        this.beforeUpdate && this.beforeUpdate();
      }
      __destroyed() {
        this.destroyed && this.destroyed();
      }
      __reconnected() {
        this.__isDisconnected &&
          ((this.__isDisconnected = !1),
          this.reconnected && this.reconnected());
      }
      __disconnected() {
        (this.__isDisconnected = !0), this.disconnected && this.disconnected();
      }
      pushEvent(e, t = {}, i = function () {}) {
        return this.__view.pushHookEvent(null, e, t, i);
      }
      pushEventTo(e, t, i = {}, s = function () {}) {
        return this.__view.withinTargets(e, (n, r) =>
          n.pushHookEvent(r, t, i, s),
        );
      }
      handleEvent(e, t) {
        let i = (s, n) => (n ? e : t(s.detail));
        return (
          window.addEventListener(`phx:${e}`, i), this.__listeners.add(i), i
        );
      }
      removeHandleEvent(e) {
        let t = e(null, !0);
        window.removeEventListener(`phx:${t}`, e), this.__listeners.delete(e);
      }
      upload(e, t) {
        return this.__view.dispatchUploads(e, t);
      }
      uploadTo(e, t, i) {
        return this.__view.withinTargets(e, (s) => s.dispatchUploads(t, i));
      }
      __cleanup__() {
        this.__listeners.forEach((e) => this.removeHandleEvent(e));
      }
    },
    De = null,
    ts = {
      exec(e, t, i, s, n) {
        let [r, a] = n || [null, {}];
        (t.charAt(0) === "[" ? JSON.parse(t) : [[r, a]]).forEach(([l, h]) => {
          l === r && a.data && (h.data = Object.assign(h.data || {}, a.data)),
            this.filterToEls(s, h).forEach((c) => {
              this[`exec_${l}`](e, t, i, s, c, h);
            });
        });
      },
      isVisible(e) {
        return !!(
          e.offsetWidth ||
          e.offsetHeight ||
          e.getClientRects().length > 0
        );
      },
      exec_exec(e, t, i, s, n, [r, a]) {
        (a ? d.all(document, a) : [s]).forEach((l) => {
          let h = l.getAttribute(r);
          if (!h)
            throw new Error(`expected ${r} to contain JS command on "${a}"`);
          i.liveSocket.execJS(l, h, e);
        });
      },
      exec_dispatch(e, t, i, s, n, { to: r, event: a, detail: o, bubbles: l }) {
        (o = o || {}),
          (o.dispatcher = s),
          d.dispatchEvent(n, a, { detail: o, bubbles: l });
      },
      exec_push(e, t, i, s, n, r) {
        if (!i.isConnected()) return;
        let {
            event: a,
            data: o,
            target: l,
            page_loading: h,
            loading: c,
            value: p,
            dispatcher: g,
          } = r,
          f = { loading: c, value: p, target: l, page_loading: !!h },
          m = e === "change" && g ? g : s,
          v = l || m.getAttribute(i.binding("target")) || m;
        i.withinTargets(v, (C, u) => {
          if (e === "change") {
            let { newCid: y, _target: k, callback: T } = r;
            (k = k || (d.isFormInput(s) ? s.name : void 0)),
              k && (f._target = k),
              C.pushInput(s, u, y, a || t, f, T);
          } else if (e === "submit") {
            let { submitter: y } = r;
            C.submitForm(s, u, a || t, y, f);
          } else C.pushEvent(e, s, u, a || t, o, f);
        });
      },
      exec_navigate(e, t, i, s, n, { href: r, replace: a }) {
        i.liveSocket.historyRedirect(r, a ? "replace" : "push");
      },
      exec_patch(e, t, i, s, n, { href: r, replace: a }) {
        i.liveSocket.pushHistoryPatch(r, a ? "replace" : "push", s);
      },
      exec_focus(e, t, i, s, n) {
        window.requestAnimationFrame(() => te.attemptFocus(n));
      },
      exec_focus_first(e, t, i, s, n) {
        window.requestAnimationFrame(
          () => te.focusFirstInteractive(n) || te.focusFirst(n),
        );
      },
      exec_push_focus(e, t, i, s, n) {
        window.requestAnimationFrame(() => (De = n || s));
      },
      exec_pop_focus(e, t, i, s, n) {
        window.requestAnimationFrame(() => {
          De && De.focus(), (De = null);
        });
      },
      exec_add_class(e, t, i, s, n, { names: r, transition: a, time: o }) {
        this.addOrRemoveClasses(n, r, [], a, o, i);
      },
      exec_remove_class(e, t, i, s, n, { names: r, transition: a, time: o }) {
        this.addOrRemoveClasses(n, [], r, a, o, i);
      },
      exec_transition(e, t, i, s, n, { time: r, transition: a }) {
        this.addOrRemoveClasses(n, [], [], a, r, i);
      },
      exec_toggle(e, t, i, s, n, { display: r, ins: a, outs: o, time: l }) {
        this.toggle(e, i, n, r, a, o, l);
      },
      exec_show(e, t, i, s, n, { display: r, transition: a, time: o }) {
        this.show(e, i, n, r, a, o);
      },
      exec_hide(e, t, i, s, n, { display: r, transition: a, time: o }) {
        this.hide(e, i, n, r, a, o);
      },
      exec_set_attr(e, t, i, s, n, { attr: [r, a] }) {
        this.setOrRemoveAttrs(n, [[r, a]], []);
      },
      exec_remove_attr(e, t, i, s, n, { attr: r }) {
        this.setOrRemoveAttrs(n, [], [r]);
      },
      show(e, t, i, s, n, r) {
        this.isVisible(i) || this.toggle(e, t, i, s, n, null, r);
      },
      hide(e, t, i, s, n, r) {
        this.isVisible(i) && this.toggle(e, t, i, s, null, n, r);
      },
      toggle(e, t, i, s, n, r, a) {
        let [o, l, h] = n || [[], [], []],
          [c, p, g] = r || [[], [], []];
        if (o.length > 0 || c.length > 0)
          if (this.isVisible(i)) {
            let f = () => {
              this.addOrRemoveClasses(i, p, o.concat(l).concat(h)),
                window.requestAnimationFrame(() => {
                  this.addOrRemoveClasses(i, c, []),
                    window.requestAnimationFrame(() =>
                      this.addOrRemoveClasses(i, g, p),
                    );
                });
            };
            i.dispatchEvent(new Event("phx:hide-start")),
              t.transition(a, f, () => {
                this.addOrRemoveClasses(i, [], c.concat(g)),
                  d.putSticky(i, "toggle", (m) => (m.style.display = "none")),
                  i.dispatchEvent(new Event("phx:hide-end"));
              });
          } else {
            if (e === "remove") return;
            let f = () => {
              this.addOrRemoveClasses(i, l, c.concat(p).concat(g));
              let m = s || this.defaultDisplay(i);
              d.putSticky(i, "toggle", (v) => (v.style.display = m)),
                window.requestAnimationFrame(() => {
                  this.addOrRemoveClasses(i, o, []),
                    window.requestAnimationFrame(() =>
                      this.addOrRemoveClasses(i, h, l),
                    );
                });
            };
            i.dispatchEvent(new Event("phx:show-start")),
              t.transition(a, f, () => {
                this.addOrRemoveClasses(i, [], o.concat(h)),
                  i.dispatchEvent(new Event("phx:show-end"));
              });
          }
        else
          this.isVisible(i)
            ? window.requestAnimationFrame(() => {
                i.dispatchEvent(new Event("phx:hide-start")),
                  d.putSticky(i, "toggle", (f) => (f.style.display = "none")),
                  i.dispatchEvent(new Event("phx:hide-end"));
              })
            : window.requestAnimationFrame(() => {
                i.dispatchEvent(new Event("phx:show-start"));
                let f = s || this.defaultDisplay(i);
                d.putSticky(i, "toggle", (m) => (m.style.display = f)),
                  i.dispatchEvent(new Event("phx:show-end"));
              });
      },
      addOrRemoveClasses(e, t, i, s, n, r) {
        let [a, o, l] = s || [[], [], []];
        if (a.length > 0) {
          let h = () => this.addOrRemoveClasses(e, o.concat(a), []),
            c = () =>
              this.addOrRemoveClasses(e, t.concat(l), i.concat(a).concat(o));
          return r.transition(n, h, c);
        }
        window.requestAnimationFrame(() => {
          let [h, c] = d.getSticky(e, "classes", [[], []]),
            p = t.filter((v) => h.indexOf(v) < 0 && !e.classList.contains(v)),
            g = i.filter((v) => c.indexOf(v) < 0 && e.classList.contains(v)),
            f = h.filter((v) => i.indexOf(v) < 0).concat(p),
            m = c.filter((v) => t.indexOf(v) < 0).concat(g);
          d.putSticky(
            e,
            "classes",
            (v) => (v.classList.remove(...m), v.classList.add(...f), [f, m]),
          );
        });
      },
      setOrRemoveAttrs(e, t, i) {
        let [s, n] = d.getSticky(e, "attrs", [[], []]),
          r = t.map(([l, h]) => l).concat(i),
          a = s.filter(([l, h]) => !r.includes(l)).concat(t),
          o = n.filter((l) => !r.includes(l)).concat(i);
        d.putSticky(
          e,
          "attrs",
          (l) => (
            o.forEach((h) => l.removeAttribute(h)),
            a.forEach(([h, c]) => l.setAttribute(h, c)),
            [a, o]
          ),
        );
      },
      hasAllClasses(e, t) {
        return t.every((i) => e.classList.contains(i));
      },
      isToggledOut(e, t) {
        return !this.isVisible(e) || this.hasAllClasses(e, t);
      },
      filterToEls(e, { to: t }) {
        return t ? d.all(document, t) : [e];
      },
      defaultDisplay(e) {
        return (
          { tr: "table-row", td: "table-cell" }[e.tagName.toLowerCase()] ||
          "block"
        );
      },
    },
    $ = ts,
    Ie = (e, t, i = []) => {
      let l = t,
        { submitter: s } = l,
        n = gt(l, ["submitter"]),
        r = new FormData(e);
      s &&
        s.hasAttribute("name") &&
        s.form &&
        s.form === e &&
        r.append(s.name, s.value);
      let a = [];
      r.forEach((h, c, p) => {
        h instanceof File && a.push(c);
      }),
        a.forEach((h) => r.delete(h));
      let o = new URLSearchParams();
      for (let [h, c] of r.entries())
        (i.length === 0 || i.indexOf(h) >= 0) && o.append(h, c);
      for (let h in n) o.append(h, n[h]);
      return o.toString();
    },
    Jt = class {
      constructor(e, t, i, s, n) {
        (this.isDead = !1),
          (this.liveSocket = t),
          (this.flash = s),
          (this.parent = i),
          (this.root = i ? i.root : this),
          (this.el = e),
          (this.id = this.el.id),
          (this.ref = 0),
          (this.childJoins = 0),
          (this.loaderTimer = null),
          (this.pendingDiffs = []),
          (this.pruningCIDs = []),
          (this.redirect = !1),
          (this.href = null),
          (this.joinCount = this.parent ? this.parent.joinCount - 1 : 0),
          (this.joinPending = !0),
          (this.destroyed = !1),
          (this.joinCallback = function (r) {
            r && r();
          }),
          (this.stopCallback = function () {}),
          (this.pendingJoinOps = this.parent ? null : []),
          (this.viewHooks = {}),
          (this.uploaders = {}),
          (this.formSubmits = []),
          (this.children = this.parent ? null : {}),
          (this.root.children[this.id] = {}),
          (this.channel = this.liveSocket.channel(`lv:${this.id}`, () => ({
            redirect: this.redirect ? this.href : void 0,
            url: this.redirect ? void 0 : this.href || void 0,
            params: this.connectParams(n),
            session: this.getSession(),
            static: this.getStatic(),
            flash: this.flash,
          })));
      }
      setHref(e) {
        this.href = e;
      }
      setRedirect(e) {
        (this.redirect = !0), (this.href = e);
      }
      isMain() {
        return this.el.hasAttribute(ht);
      }
      connectParams(e) {
        let t = this.liveSocket.params(this.el),
          i = d
            .all(document, `[${this.binding(gi)}]`)
            .map((s) => s.src || s.href)
            .filter((s) => typeof s == "string");
        return (
          i.length > 0 && (t._track_static = i),
          (t._mounts = this.joinCount),
          (t._live_referer = e),
          t
        );
      }
      isConnected() {
        return this.channel.canPush();
      }
      getSession() {
        return this.el.getAttribute(z);
      }
      getStatic() {
        let e = this.el.getAttribute(ue);
        return e === "" ? null : e;
      }
      destroy(e = function () {}) {
        this.destroyAllChildren(),
          (this.destroyed = !0),
          delete this.root.children[this.id],
          this.parent && delete this.root.children[this.parent.id][this.id],
          clearTimeout(this.loaderTimer);
        let t = () => {
          e();
          for (let i in this.viewHooks) this.destroyHook(this.viewHooks[i]);
        };
        d.markPhxChildDestroyed(this.el),
          this.log("destroyed", () => [
            "the child has been removed from the parent",
          ]),
          this.channel
            .leave()
            .receive("ok", t)
            .receive("error", t)
            .receive("timeout", t);
      }
      setContainerClasses(...e) {
        this.el.classList.remove(St, Ke, At), this.el.classList.add(...e);
      }
      showLoader(e) {
        if ((clearTimeout(this.loaderTimer), e))
          this.loaderTimer = setTimeout(() => this.showLoader(), e);
        else {
          for (let t in this.viewHooks) this.viewHooks[t].__disconnected();
          this.setContainerClasses(Ke);
        }
      }
      execAll(e) {
        d.all(this.el, `[${e}]`, (t) =>
          this.liveSocket.execJS(t, t.getAttribute(e)),
        );
      }
      hideLoader() {
        clearTimeout(this.loaderTimer),
          this.setContainerClasses(St),
          this.execAll(this.binding("connected"));
      }
      triggerReconnected() {
        for (let e in this.viewHooks) this.viewHooks[e].__reconnected();
      }
      log(e, t) {
        this.liveSocket.log(this, e, t);
      }
      transition(e, t, i = function () {}) {
        this.liveSocket.transition(e, t, i);
      }
      withinTargets(e, t) {
        if (e instanceof HTMLElement || e instanceof SVGElement)
          return this.liveSocket.owner(e, (i) => t(i, e));
        if (X(e))
          d.findComponentNodeList(this.el, e).length === 0
            ? R(`no component found matching phx-target of ${e}`)
            : t(this, parseInt(e));
        else {
          let i = Array.from(document.querySelectorAll(e));
          i.length === 0 &&
            R(`nothing found matching the phx-target selector "${e}"`),
            i.forEach((s) => this.liveSocket.owner(s, (n) => t(n, s)));
        }
      }
      applyDiff(e, t, i) {
        this.log(e, () => ["", He(t)]);
        let { diff: s, reply: n, events: r, title: a } = Mt.extract(t);
        i({ diff: s, reply: n, events: r }),
          a && window.requestAnimationFrame(() => d.putTitle(a));
      }
      onJoin(e) {
        let { rendered: t, container: i } = e;
        if (i) {
          let [s, n] = i;
          this.el = d.replaceRootContainer(this.el, s, n);
        }
        (this.childJoins = 0),
          (this.joinPending = !0),
          (this.flash = null),
          F.dropLocal(
            this.liveSocket.localStorage,
            window.location.pathname,
            Ft,
          ),
          this.applyDiff("mount", t, ({ diff: s, events: n }) => {
            this.rendered = new Mt(this.id, s);
            let [r, a] = this.renderContainer(null, "join");
            this.dropPendingRefs();
            let o = this.formsForRecovery(r);
            this.joinCount++,
              o.length > 0
                ? o.forEach(([l, h, c], p) => {
                    this.pushFormRecovery(l, c, (g) => {
                      p === o.length - 1 && this.onJoinComplete(g, r, a, n);
                    });
                  })
                : this.onJoinComplete(e, r, a, n);
          });
      }
      dropPendingRefs() {
        d.all(document, `[${G}="${this.id}"][${U}]`, (e) => {
          e.removeAttribute(U), e.removeAttribute(G);
        });
      }
      onJoinComplete({ live_patch: e }, t, i, s) {
        if (this.joinCount > 1 || (this.parent && !this.parent.isJoinPending()))
          return this.applyJoinPatch(e, t, i, s);
        d.findPhxChildrenInFragment(t, this.id).filter((r) => {
          let a = r.id && this.el.querySelector(`[id="${r.id}"]`),
            o = a && a.getAttribute(ue);
          return o && r.setAttribute(ue, o), this.joinChild(r);
        }).length === 0
          ? this.parent
            ? (this.root.pendingJoinOps.push([
                this,
                () => this.applyJoinPatch(e, t, i, s),
              ]),
              this.parent.ackJoin(this))
            : (this.onAllChildJoinsComplete(), this.applyJoinPatch(e, t, i, s))
          : this.root.pendingJoinOps.push([
              this,
              () => this.applyJoinPatch(e, t, i, s),
            ]);
      }
      attachTrueDocEl() {
        (this.el = d.byId(this.id)), this.el.setAttribute(pe, this.root.id);
      }
      execNewMounted() {
        d.all(this.el, `[${this.binding(oe)}], [data-phx-${oe}]`, (e) => {
          this.maybeAddNewHook(e);
        }),
          d.all(this.el, `[${this.binding(Ct)}]`, (e) => this.maybeMounted(e));
      }
      applyJoinPatch(e, t, i, s) {
        this.attachTrueDocEl();
        let n = new Le(this, this.el, this.id, t, i, null);
        if (
          (n.markPrunableContentForRemoval(),
          this.performPatch(n, !1),
          this.joinNewChildren(),
          this.execNewMounted(),
          (this.joinPending = !1),
          this.liveSocket.dispatchEvents(s),
          this.applyPendingUpdates(),
          e)
        ) {
          let { kind: r, to: a } = e;
          this.liveSocket.historyPatch(a, r);
        }
        this.hideLoader(),
          this.joinCount > 1 && this.triggerReconnected(),
          this.stopCallback();
      }
      triggerBeforeUpdateHook(e, t) {
        this.liveSocket.triggerDOM("onBeforeElUpdated", [e, t]);
        let i = this.getHook(e),
          s = i && d.isIgnored(e, this.binding(Fe));
        if (i && !e.isEqualNode(t) && !(s && Oi(e.dataset, t.dataset)))
          return i.__beforeUpdate(), i;
      }
      maybeMounted(e) {
        let t = e.getAttribute(this.binding(Ct)),
          i = t && d.private(e, "mounted");
        t &&
          !i &&
          (this.liveSocket.execJS(e, t), d.putPrivate(e, "mounted", !0));
      }
      maybeAddNewHook(e, t) {
        let i = this.addHook(e);
        i && i.__mounted();
      }
      performPatch(e, t) {
        let i = [],
          s = !1,
          n = new Set();
        return (
          e.after("added", (r) => {
            this.liveSocket.triggerDOM("onNodeAdded", [r]),
              this.maybeAddNewHook(r),
              r.getAttribute && this.maybeMounted(r);
          }),
          e.after("phxChildAdded", (r) => {
            d.isPhxSticky(r) ? this.liveSocket.joinRootViews() : (s = !0);
          }),
          e.before("updated", (r, a) => {
            this.triggerBeforeUpdateHook(r, a) && n.add(r.id);
          }),
          e.after("updated", (r) => {
            n.has(r.id) && this.getHook(r).__updated();
          }),
          e.after("discarded", (r) => {
            r.nodeType === Node.ELEMENT_NODE && i.push(r);
          }),
          e.after("transitionsDiscarded", (r) =>
            this.afterElementsRemoved(r, t),
          ),
          e.perform(),
          this.afterElementsRemoved(i, t),
          s
        );
      }
      afterElementsRemoved(e, t) {
        let i = [];
        e.forEach((s) => {
          let n = d.all(s, `[${I}]`),
            r = d.all(s, `[${this.binding(oe)}]`);
          n.concat(s).forEach((a) => {
            let o = this.componentID(a);
            X(o) && i.indexOf(o) === -1 && i.push(o);
          }),
            r.concat(s).forEach((a) => {
              let o = this.getHook(a);
              o && this.destroyHook(o);
            });
        }),
          t && this.maybePushComponentsDestroyed(i);
      }
      joinNewChildren() {
        d.findPhxChildren(this.el, this.id).forEach((e) => this.joinChild(e));
      }
      getChildById(e) {
        return this.root.children[this.id][e];
      }
      getDescendentByEl(e) {
        return e.id === this.id
          ? this
          : this.children[e.getAttribute(ee)][e.id];
      }
      destroyDescendent(e) {
        for (let t in this.root.children)
          for (let i in this.root.children[t])
            if (i === e) return this.root.children[t][i].destroy();
      }
      joinChild(e) {
        if (!this.getChildById(e.id)) {
          let i = new Jt(e, this.liveSocket, this);
          return (
            (this.root.children[this.id][i.id] = i),
            i.join(),
            this.childJoins++,
            !0
          );
        }
      }
      isJoinPending() {
        return this.joinPending;
      }
      ackJoin(e) {
        this.childJoins--,
          this.childJoins === 0 &&
            (this.parent
              ? this.parent.ackJoin(this)
              : this.onAllChildJoinsComplete());
      }
      onAllChildJoinsComplete() {
        this.joinCallback(() => {
          this.pendingJoinOps.forEach(([e, t]) => {
            e.isDestroyed() || t();
          }),
            (this.pendingJoinOps = []);
        });
      }
      update(e, t) {
        if (
          this.isJoinPending() ||
          (this.liveSocket.hasPendingLink() && this.root.isMain())
        )
          return this.pendingDiffs.push({ diff: e, events: t });
        this.rendered.mergeDiff(e);
        let i = !1;
        this.rendered.isComponentOnlyDiff(e)
          ? this.liveSocket.time("component patch complete", () => {
              d.findParentCIDs(this.el, this.rendered.componentCIDs(e)).forEach(
                (n) => {
                  this.componentPatch(this.rendered.getComponent(e, n), n) &&
                    (i = !0);
                },
              );
            })
          : xt(e) ||
            this.liveSocket.time("full patch complete", () => {
              let [s, n] = this.renderContainer(e, "update"),
                r = new Le(this, this.el, this.id, s, n, null);
              i = this.performPatch(r, !0);
            }),
          this.liveSocket.dispatchEvents(t),
          i && this.joinNewChildren();
      }
      renderContainer(e, t) {
        return this.liveSocket.time(`toString diff (${t})`, () => {
          let i = this.el.tagName,
            s = e
              ? this.rendered.componentCIDs(e).concat(this.pruningCIDs)
              : null,
            [n, r] = this.rendered.toString(s);
          return [`<${i}>${n}</${i}>`, r];
        });
      }
      componentPatch(e, t) {
        if (xt(e)) return !1;
        let [i, s] = this.rendered.componentToString(t),
          n = new Le(this, this.el, this.id, i, s, t);
        return this.performPatch(n, !0);
      }
      getHook(e) {
        return this.viewHooks[ce.elementID(e)];
      }
      addHook(e) {
        if (ce.elementID(e) || !e.getAttribute) return;
        let t =
          e.getAttribute(`data-phx-${oe}`) || e.getAttribute(this.binding(oe));
        if (t && !this.ownsElement(e)) return;
        let i = this.liveSocket.getHookCallbacks(t);
        if (i) {
          e.id ||
            R(
              `no DOM ID for hook "${t}". Hooks require a unique ID on each element.`,
              e,
            );
          let s = new ce(this, e, i);
          return (this.viewHooks[ce.elementID(s.el)] = s), s;
        } else t !== null && R(`unknown hook found for "${t}"`, e);
      }
      destroyHook(e) {
        e.__destroyed(),
          e.__cleanup__(),
          delete this.viewHooks[ce.elementID(e.el)];
      }
      applyPendingUpdates() {
        this.pendingDiffs.forEach(({ diff: e, events: t }) =>
          this.update(e, t),
        ),
          (this.pendingDiffs = []),
          this.eachChild((e) => e.applyPendingUpdates());
      }
      eachChild(e) {
        let t = this.root.children[this.id] || {};
        for (let i in t) e(this.getChildById(i));
      }
      onChannel(e, t) {
        this.liveSocket.onChannel(this.channel, e, (i) => {
          this.isJoinPending()
            ? this.root.pendingJoinOps.push([this, () => t(i)])
            : this.liveSocket.requestDOMUpdate(() => t(i));
        });
      }
      bindChannel() {
        this.liveSocket.onChannel(this.channel, "diff", (e) => {
          this.liveSocket.requestDOMUpdate(() => {
            this.applyDiff("update", e, ({ diff: t, events: i }) =>
              this.update(t, i),
            );
          });
        }),
          this.onChannel("redirect", ({ to: e, flash: t }) =>
            this.onRedirect({ to: e, flash: t }),
          ),
          this.onChannel("live_patch", (e) => this.onLivePatch(e)),
          this.onChannel("live_redirect", (e) => this.onLiveRedirect(e)),
          this.channel.onError((e) => this.onError(e)),
          this.channel.onClose((e) => this.onClose(e));
      }
      destroyAllChildren() {
        this.eachChild((e) => e.destroy());
      }
      onLiveRedirect(e) {
        let { to: t, kind: i, flash: s } = e,
          n = this.expandURL(t);
        this.liveSocket.historyRedirect(n, i, s);
      }
      onLivePatch(e) {
        let { to: t, kind: i } = e;
        (this.href = this.expandURL(t)), this.liveSocket.historyPatch(t, i);
      }
      expandURL(e) {
        return e.startsWith("/")
          ? `${window.location.protocol}//${window.location.host}${e}`
          : e;
      }
      onRedirect({ to: e, flash: t }) {
        this.liveSocket.redirect(e, t);
      }
      isDestroyed() {
        return this.destroyed;
      }
      joinDead() {
        this.isDead = !0;
      }
      join(e) {
        this.showLoader(this.liveSocket.loaderTimeout),
          this.bindChannel(),
          this.isMain() &&
            (this.stopCallback = this.liveSocket.withPageLoading({
              to: this.href,
              kind: "initial",
            })),
          (this.joinCallback = (t) => {
            (t = t || function () {}), e ? e(this.joinCount, t) : t();
          }),
          this.liveSocket.wrapPush(this, { timeout: !1 }, () =>
            this.channel
              .join()
              .receive("ok", (t) => {
                this.isDestroyed() ||
                  this.liveSocket.requestDOMUpdate(() => this.onJoin(t));
              })
              .receive(
                "error",
                (t) => !this.isDestroyed() && this.onJoinError(t),
              )
              .receive(
                "timeout",
                () =>
                  !this.isDestroyed() &&
                  this.onJoinError({ reason: "timeout" }),
              ),
          );
      }
      onJoinError(e) {
        if (e.reason === "reload")
          return (
            this.log("error", () => [
              `failed mount with ${e.status}. Falling back to page request`,
              e,
            ]),
            this.onRedirect({ to: this.href })
          );
        if (e.reason === "unauthorized" || e.reason === "stale")
          return (
            this.log("error", () => [
              "unauthorized live_redirect. Falling back to page request",
              e,
            ]),
            this.onRedirect({ to: this.href })
          );
        if (
          ((e.redirect || e.live_redirect) &&
            ((this.joinPending = !1), this.channel.leave()),
          e.redirect)
        )
          return this.onRedirect(e.redirect);
        if (e.live_redirect) return this.onLiveRedirect(e.live_redirect);
        this.log("error", () => ["unable to join", e]),
          this.liveSocket.isConnected() &&
            this.liveSocket.reloadWithJitter(this);
      }
      onClose(e) {
        if (!this.isDestroyed()) {
          if (this.liveSocket.hasPendingLink() && e !== "leave")
            return this.liveSocket.reloadWithJitter(this);
          this.destroyAllChildren(),
            this.liveSocket.dropActiveElement(this),
            document.activeElement && document.activeElement.blur(),
            this.liveSocket.isUnloaded() && this.showLoader(Ci);
        }
      }
      onError(e) {
        this.onClose(e),
          this.liveSocket.isConnected() &&
            this.log("error", () => ["view crashed", e]),
          this.liveSocket.isUnloaded() || this.displayError();
      }
      displayError() {
        this.isMain() &&
          d.dispatchEvent(window, "phx:page-loading-start", {
            detail: { to: this.href, kind: "error" },
          }),
          this.showLoader(),
          this.setContainerClasses(Ke, At),
          this.execAll(this.binding("disconnected"));
      }
      pushWithReply(e, t, i, s = function () {}) {
        if (!this.isConnected()) return;
        let [n, [r], a] = e ? e() : [null, [], {}],
          o = function () {};
        return (
          (a.page_loading ||
            (r && r.getAttribute(this.binding(wt)) !== null)) &&
            (o = this.liveSocket.withPageLoading({
              kind: "element",
              target: r,
            })),
          typeof i.cid != "number" && delete i.cid,
          this.liveSocket.wrapPush(this, { timeout: !0 }, () =>
            this.channel.push(t, i, _i).receive("ok", (l) => {
              let h = (c) => {
                l.redirect && this.onRedirect(l.redirect),
                  l.live_patch && this.onLivePatch(l.live_patch),
                  l.live_redirect && this.onLiveRedirect(l.live_redirect),
                  n !== null && this.undoRefs(n),
                  o(),
                  s(l, c);
              };
              l.diff
                ? this.liveSocket.requestDOMUpdate(() => {
                    this.applyDiff(
                      "update",
                      l.diff,
                      ({ diff: c, reply: p, events: g }) => {
                        this.update(c, g), h(p);
                      },
                    );
                  })
                : h(null);
            }),
          )
        );
      }
      undoRefs(e) {
        !this.isConnected() ||
          d.all(document, `[${G}="${this.id}"][${U}="${e}"]`, (t) => {
            let i = t.getAttribute(Ee);
            t.removeAttribute(U),
              t.removeAttribute(G),
              t.getAttribute(Ye) !== null &&
                ((t.readOnly = !1), t.removeAttribute(Ye)),
              i !== null &&
                ((t.disabled = i === "true"), t.removeAttribute(Ee)),
              $t.forEach((r) => d.removeClass(t, r));
            let s = t.getAttribute(Ce);
            s !== null && ((t.innerText = s), t.removeAttribute(Ce));
            let n = d.private(t, U);
            if (n) {
              let r = this.triggerBeforeUpdateHook(t, n);
              Le.patchEl(t, n, this.liveSocket.getActiveElement()),
                r && r.__updated(),
                d.deletePrivate(t, U);
            }
          });
      }
      putRef(e, t, i = {}) {
        let s = this.ref++,
          n = this.binding(ot);
        return (
          i.loading && (e = e.concat(d.all(document, i.loading))),
          e.forEach((r) => {
            r.classList.add(`phx-${t}-loading`),
              r.setAttribute(U, s),
              r.setAttribute(G, this.el.id);
            let a = r.getAttribute(n);
            a !== null &&
              (r.getAttribute(Ce) || r.setAttribute(Ce, r.innerText),
              a !== "" && (r.innerText = a),
              r.setAttribute("disabled", ""));
          }),
          [s, e, i]
        );
      }
      componentID(e) {
        let t = e.getAttribute && e.getAttribute(I);
        return t ? parseInt(t) : null;
      }
      targetComponentID(e, t, i = {}) {
        if (X(t)) return t;
        let s = e.getAttribute(this.binding("target"));
        return X(s)
          ? parseInt(s)
          : t && (s !== null || i.target)
            ? this.closestComponentID(t)
            : null;
      }
      closestComponentID(e) {
        return X(e)
          ? e
          : e
            ? W(
                e.closest(`[${I}]`),
                (t) => this.ownsElement(t) && this.componentID(t),
              )
            : null;
      }
      pushHookEvent(e, t, i, s) {
        if (!this.isConnected())
          return (
            this.log("hook", () => [
              "unable to push hook event. LiveView not connected",
              t,
              i,
            ]),
            !1
          );
        let [n, r, a] = this.putRef([], "hook");
        return (
          this.pushWithReply(
            () => [n, r, a],
            "event",
            {
              type: "hook",
              event: t,
              value: i,
              cid: this.closestComponentID(e),
            },
            (o, l) => s(l, n),
          ),
          n
        );
      }
      extractMeta(e, t, i) {
        let s = this.binding("value-");
        for (let n = 0; n < e.attributes.length; n++) {
          t || (t = {});
          let r = e.attributes[n].name;
          r.startsWith(s) && (t[r.replace(s, "")] = e.getAttribute(r));
        }
        if (
          (e.value !== void 0 &&
            (t || (t = {}),
            (t.value = e.value),
            e.tagName === "INPUT" &&
              jt.indexOf(e.type) >= 0 &&
              !e.checked &&
              delete t.value),
          i)
        ) {
          t || (t = {});
          for (let n in i) t[n] = i[n];
        }
        return t;
      }
      pushEvent(e, t, i, s, n, r = {}) {
        this.pushWithReply(() => this.putRef([t], e, r), "event", {
          type: e,
          event: s,
          value: this.extractMeta(t, n, r.value),
          cid: this.targetComponentID(t, i, r),
        });
      }
      pushFileProgress(e, t, i, s = function () {}) {
        this.liveSocket.withinOwners(e.form, (n, r) => {
          n.pushWithReply(
            null,
            "progress",
            {
              event: e.getAttribute(n.binding(ki)),
              ref: e.getAttribute(Y),
              entry_ref: t,
              progress: i,
              cid: n.targetComponentID(e.form, r),
            },
            s,
          );
        });
      }
      pushInput(e, t, i, s, n, r) {
        let a,
          o = X(i) ? i : this.targetComponentID(e.form, t),
          l = () => this.putRef([e, e.form], "change", n),
          h;
        e.getAttribute(this.binding("change"))
          ? (h = Ie(e.form, { _target: n._target }, [e.name]))
          : (h = Ie(e.form, { _target: n._target })),
          d.isUploadInput(e) &&
            e.files &&
            e.files.length > 0 &&
            P.trackFiles(e, Array.from(e.files)),
          (a = P.serializeUploads(e));
        let c = { type: "form", event: s, value: h, uploads: a, cid: o };
        this.pushWithReply(l, "event", c, (p) => {
          if (
            (d.showError(e, this.liveSocket.binding(Ne)),
            d.isUploadInput(e) &&
              e.getAttribute("data-phx-auto-upload") !== null)
          ) {
            if (P.filesAwaitingPreflight(e).length > 0) {
              let [g, f] = l();
              this.uploadFiles(e.form, t, g, o, (m) => {
                r && r(p), this.triggerAwaitingSubmit(e.form);
              });
            }
          } else r && r(p);
        });
      }
      triggerAwaitingSubmit(e) {
        let t = this.getScheduledSubmit(e);
        if (t) {
          let [i, s, n, r] = t;
          this.cancelSubmit(e), r();
        }
      }
      getScheduledSubmit(e) {
        return this.formSubmits.find(([t, i, s, n]) => t.isSameNode(e));
      }
      scheduleSubmit(e, t, i, s) {
        if (this.getScheduledSubmit(e)) return !0;
        this.formSubmits.push([e, t, i, s]);
      }
      cancelSubmit(e) {
        this.formSubmits = this.formSubmits.filter(([t, i, s]) =>
          t.isSameNode(e) ? (this.undoRefs(i), !1) : !0,
        );
      }
      disableForm(e, t = {}) {
        let i = (c) =>
            !(
              fe(c, `${this.binding(Fe)}=ignore`, c.form) ||
              fe(c, "data-phx-update=ignore", c.form)
            ),
          s = (c) => c.hasAttribute(this.binding(ot)),
          n = (c) => c.tagName == "BUTTON",
          r = (c) => ["INPUT", "TEXTAREA", "SELECT"].includes(c.tagName),
          a = Array.from(e.elements),
          o = a.filter(s),
          l = a.filter(n).filter(i),
          h = a.filter(r).filter(i);
        return (
          l.forEach((c) => {
            c.setAttribute(Ee, c.disabled), (c.disabled = !0);
          }),
          h.forEach((c) => {
            c.setAttribute(Ye, c.readOnly),
              (c.readOnly = !0),
              c.files && (c.setAttribute(Ee, c.disabled), (c.disabled = !0));
          }),
          e.setAttribute(this.binding(wt), ""),
          this.putRef([e].concat(o).concat(l).concat(h), "submit", t)
        );
      }
      pushFormSubmit(e, t, i, s, n, r) {
        let a = () => this.disableForm(e, n),
          o = this.targetComponentID(e, t);
        if (P.hasUploadsInProgress(e)) {
          let [l, h] = a(),
            c = () => this.pushFormSubmit(e, s, t, i, n, r);
          return this.scheduleSubmit(e, l, n, c);
        } else if (P.inputsAwaitingPreflight(e).length > 0) {
          let [l, h] = a(),
            c = () => [l, h, n];
          this.uploadFiles(e, t, l, o, (p) => {
            let g = Ie(e, { submitter: s });
            this.pushWithReply(
              c,
              "event",
              { type: "form", event: i, value: g, cid: o },
              r,
            );
          });
        } else {
          let l = Ie(e, { submitter: s });
          this.pushWithReply(
            a,
            "event",
            { type: "form", event: i, value: l, cid: o },
            r,
          );
        }
      }
      uploadFiles(e, t, i, s, n) {
        let r = this.joinCount,
          a = P.activeFileInputs(e),
          o = a.length;
        a.forEach((l) => {
          let h = new P(l, this, () => {
            o--, o === 0 && n();
          });
          this.uploaders[l] = h;
          let c = h.entries().map((g) => g.toPreflightPayload()),
            p = {
              ref: l.getAttribute(Y),
              entries: c,
              cid: this.targetComponentID(l.form, t),
            };
          this.log("upload", () => ["sending preflight request", p]),
            this.pushWithReply(null, "allow_upload", p, (g) => {
              if (
                (this.log("upload", () => ["got preflight response", g]),
                g.error)
              ) {
                this.undoRefs(i);
                let [f, m] = g.error;
                this.log("upload", () => [`error for entry ${f}`, m]);
              } else {
                let f = (m) => {
                  this.channel.onError(() => {
                    this.joinCount === r && m();
                  });
                };
                h.initAdapterUpload(g, f, this.liveSocket);
              }
            });
        });
      }
      dispatchUploads(e, t) {
        let i = d.findUploadInputs(this.el).filter((s) => s.name === e);
        i.length === 0
          ? R(`no live file inputs found matching the name "${e}"`)
          : i.length > 1
            ? R(`duplicate live file inputs found matching the name "${e}"`)
            : d.dispatchEvent(i[0], Ut, { detail: { files: t } });
      }
      pushFormRecovery(e, t, i) {
        this.liveSocket.withinOwners(e, (s, n) => {
          let r = Array.from(e.elements).find(
              (o) =>
                d.isFormInput(o) &&
                o.type !== "hidden" &&
                !o.hasAttribute(this.binding("change")),
            ),
            a =
              e.getAttribute(this.binding(Et)) ||
              e.getAttribute(this.binding("change"));
          $.exec("change", a, s, r, [
            "push",
            { _target: r.name, newCid: t, callback: i },
          ]);
        });
      }
      pushLinkPatch(e, t, i) {
        let s = this.liveSocket.setPendingLink(e),
          n = t ? () => this.putRef([t], "click") : null,
          r = () => this.liveSocket.redirect(window.location.href),
          a = this.pushWithReply(n, "live_patch", { url: e }, (o) => {
            this.liveSocket.requestDOMUpdate(() => {
              o.link_redirect
                ? this.liveSocket.replaceMain(e, null, i, s)
                : (this.liveSocket.commitPendingLink(s) && (this.href = e),
                  this.applyPendingUpdates(),
                  i && i(s));
            });
          });
        a ? a.receive("timeout", r) : r();
      }
      formsForRecovery(e) {
        if (this.joinCount === 0) return [];
        let t = this.binding("change"),
          i = document.createElement("template");
        return (
          (i.innerHTML = e),
          d
            .all(this.el, `form[${t}]`)
            .filter((s) => s.id && this.ownsElement(s))
            .filter((s) => s.elements.length > 0)
            .filter((s) => s.getAttribute(this.binding(Et)) !== "ignore")
            .map((s) => {
              let n = i.content.querySelector(
                `form[id="${s.id}"][${t}="${s.getAttribute(t)}"]`,
              );
              return n ? [s, n, this.targetComponentID(n)] : [s, null, null];
            })
            .filter(([s, n, r]) => n)
        );
      }
      maybePushComponentsDestroyed(e) {
        let t = e.filter(
          (i) => d.findComponentNodeList(this.el, i).length === 0,
        );
        t.length > 0 &&
          (this.pruningCIDs.push(...t),
          this.pushWithReply(null, "cids_will_destroy", { cids: t }, () => {
            this.pruningCIDs = this.pruningCIDs.filter(
              (s) => t.indexOf(s) !== -1,
            );
            let i = t.filter(
              (s) => d.findComponentNodeList(this.el, s).length === 0,
            );
            i.length > 0 &&
              this.pushWithReply(null, "cids_destroyed", { cids: i }, (s) => {
                this.rendered.pruneCIDs(s.cids);
              });
          }));
      }
      ownsElement(e) {
        let t = e.closest(ie);
        return (
          e.getAttribute(ee) === this.id ||
          (t && t.id === this.id) ||
          (!t && this.isDead)
        );
      }
      submitForm(e, t, i, s, n = {}) {
        d.putPrivate(e, Me, !0);
        let r = this.liveSocket.binding(Ne),
          a = Array.from(e.elements);
        a.forEach((o) => d.putPrivate(o, Me, !0)),
          this.liveSocket.blurActiveElement(this),
          this.pushFormSubmit(e, t, i, s, n, () => {
            a.forEach((o) => d.showError(o, r)),
              this.liveSocket.restorePreviouslyActiveFocus();
          });
      }
      binding(e) {
        return this.liveSocket.binding(e);
      }
    },
    Vt = class {
      constructor(e, t, i = {}) {
        if (((this.unloaded = !1), !t || t.constructor.name === "Object"))
          throw new Error(`
      a phoenix Socket must be provided as the second argument to the LiveSocket constructor. For example:

          import {Socket} from "phoenix"
          import {LiveSocket} from "phoenix_live_view"
          let liveSocket = new LiveSocket("/live", Socket, {...})
      `);
        (this.socket = new t(e, i)),
          (this.bindingPrefix = i.bindingPrefix || Ti),
          (this.opts = i),
          (this.params = tt(i.params || {})),
          (this.viewLogger = i.viewLogger),
          (this.metadataCallbacks = i.metadata || {}),
          (this.defaults = Object.assign(He(Pi), i.defaults || {})),
          (this.activeElement = null),
          (this.prevActive = null),
          (this.silenced = !1),
          (this.main = null),
          (this.outgoingMainEl = null),
          (this.clickStartedAtTarget = null),
          (this.linkRef = 1),
          (this.roots = {}),
          (this.href = window.location.href),
          (this.pendingLink = null),
          (this.currentLocation = He(window.location)),
          (this.hooks = i.hooks || {}),
          (this.uploaders = i.uploaders || {}),
          (this.loaderTimeout = i.loaderTimeout || Ei),
          (this.reloadWithJitterTimer = null),
          (this.maxReloads = i.maxReloads || ci),
          (this.reloadJitterMin = i.reloadJitterMin || ui),
          (this.reloadJitterMax = i.reloadJitterMax || fi),
          (this.failsafeJitter = i.failsafeJitter || pi),
          (this.localStorage = i.localStorage || window.localStorage),
          (this.sessionStorage = i.sessionStorage || window.sessionStorage),
          (this.boundTopLevelEvents = !1),
          (this.domCallbacks = Object.assign(
            { onNodeAdded: tt(), onBeforeElUpdated: tt() },
            i.dom || {},
          )),
          (this.transitions = new is()),
          window.addEventListener("pagehide", (s) => {
            this.unloaded = !0;
          }),
          this.socket.onOpen(() => {
            this.isUnloaded() && window.location.reload();
          });
      }
      isProfileEnabled() {
        return this.sessionStorage.getItem(Ze) === "true";
      }
      isDebugEnabled() {
        return this.sessionStorage.getItem(Te) === "true";
      }
      isDebugDisabled() {
        return this.sessionStorage.getItem(Te) === "false";
      }
      enableDebug() {
        this.sessionStorage.setItem(Te, "true");
      }
      enableProfiling() {
        this.sessionStorage.setItem(Ze, "true");
      }
      disableDebug() {
        this.sessionStorage.setItem(Te, "false");
      }
      disableProfiling() {
        this.sessionStorage.removeItem(Ze);
      }
      enableLatencySim(e) {
        this.enableDebug(),
          console.log(
            "latency simulator enabled for the duration of this browser session. Call disableLatencySim() to disable",
          ),
          this.sessionStorage.setItem(et, e);
      }
      disableLatencySim() {
        this.sessionStorage.removeItem(et);
      }
      getLatencySim() {
        let e = this.sessionStorage.getItem(et);
        return e ? parseInt(e) : null;
      }
      getSocket() {
        return this.socket;
      }
      connect() {
        window.location.hostname === "localhost" &&
          !this.isDebugDisabled() &&
          this.enableDebug();
        let e = () => {
          this.joinRootViews()
            ? (this.bindTopLevelEvents(), this.socket.connect())
            : this.main
              ? this.socket.connect()
              : this.bindTopLevelEvents({ dead: !0 }),
            this.joinDeadView();
        };
        ["complete", "loaded", "interactive"].indexOf(document.readyState) >= 0
          ? e()
          : document.addEventListener("DOMContentLoaded", () => e());
      }
      disconnect(e) {
        clearTimeout(this.reloadWithJitterTimer), this.socket.disconnect(e);
      }
      replaceTransport(e) {
        clearTimeout(this.reloadWithJitterTimer),
          this.socket.replaceTransport(e),
          this.connect();
      }
      execJS(e, t, i = null) {
        this.owner(e, (s) => $.exec(i, t, s, e));
      }
      unload() {
        this.unloaded ||
          (this.main &&
            this.isConnected() &&
            this.log(this.main, "socket", () => ["disconnect for page nav"]),
          (this.unloaded = !0),
          this.destroyAllViews(),
          this.disconnect());
      }
      triggerDOM(e, t) {
        this.domCallbacks[e](...t);
      }
      time(e, t) {
        if (!this.isProfileEnabled() || !console.time) return t();
        console.time(e);
        let i = t();
        return console.timeEnd(e), i;
      }
      log(e, t, i) {
        if (this.viewLogger) {
          let [s, n] = i();
          this.viewLogger(e, t, s, n);
        } else if (this.isDebugEnabled()) {
          let [s, n] = i();
          Ii(e, t, s, n);
        }
      }
      requestDOMUpdate(e) {
        this.transitions.after(e);
      }
      transition(e, t, i = function () {}) {
        this.transitions.addTransition(e, t, i);
      }
      onChannel(e, t, i) {
        e.on(t, (s) => {
          let n = this.getLatencySim();
          n ? setTimeout(() => i(s), n) : i(s);
        });
      }
      wrapPush(e, t, i) {
        let s = this.getLatencySim(),
          n = e.joinCount;
        if (!s)
          return this.isConnected() && t.timeout
            ? i().receive("timeout", () => {
                e.joinCount === n &&
                  !e.isDestroyed() &&
                  this.reloadWithJitter(e, () => {
                    this.log(e, "timeout", () => [
                      "received timeout while communicating with server. Falling back to hard refresh for recovery",
                    ]);
                  });
              })
            : i();
        let r = {
          receives: [],
          receive(a, o) {
            this.receives.push([a, o]);
          },
        };
        return (
          setTimeout(() => {
            e.isDestroyed() ||
              r.receives.reduce((a, [o, l]) => a.receive(o, l), i());
          }, s),
          r
        );
      }
      reloadWithJitter(e, t) {
        clearTimeout(this.reloadWithJitterTimer), this.disconnect();
        let i = this.reloadJitterMin,
          s = this.reloadJitterMax,
          n = Math.floor(Math.random() * (s - i + 1)) + i,
          r = F.updateLocal(
            this.localStorage,
            window.location.pathname,
            Ft,
            0,
            (a) => a + 1,
          );
        r > this.maxReloads && (n = this.failsafeJitter),
          (this.reloadWithJitterTimer = setTimeout(() => {
            e.isDestroyed() ||
              e.isConnected() ||
              (e.destroy(),
              t
                ? t()
                : this.log(e, "join", () => [
                    `encountered ${r} consecutive reloads`,
                  ]),
              r > this.maxReloads &&
                this.log(e, "join", () => [
                  `exceeded ${this.maxReloads} consecutive reloads. Entering failsafe mode`,
                ]),
              this.hasPendingLink()
                ? (window.location = this.pendingLink)
                : window.location.reload());
          }, n));
      }
      getHookCallbacks(e) {
        return e && e.startsWith("Phoenix.")
          ? $i[e.split(".")[1]]
          : this.hooks[e];
      }
      isUnloaded() {
        return this.unloaded;
      }
      isConnected() {
        return this.socket.isConnected();
      }
      getBindingPrefix() {
        return this.bindingPrefix;
      }
      binding(e) {
        return `${this.getBindingPrefix()}${e}`;
      }
      channel(e, t) {
        return this.socket.channel(e, t);
      }
      joinDeadView() {
        let e = document.body;
        if (
          e &&
          !this.isPhxView(e) &&
          !this.isPhxView(document.firstElementChild)
        ) {
          let t = this.newRootView(e);
          t.setHref(this.getHref()),
            t.joinDead(),
            this.main || (this.main = t),
            window.requestAnimationFrame(() => t.execNewMounted());
        }
      }
      joinRootViews() {
        let e = !1;
        return (
          d.all(document, `${ie}:not([${ee}])`, (t) => {
            if (!this.getRootById(t.id)) {
              let i = this.newRootView(t);
              i.setHref(this.getHref()),
                i.join(),
                t.hasAttribute(ht) && (this.main = i);
            }
            e = !0;
          }),
          e
        );
      }
      redirect(e, t) {
        this.unload(), F.redirect(e, t);
      }
      replaceMain(e, t, i = null, s = this.setPendingLink(e)) {
        let n = this.currentLocation.href;
        this.outgoingMainEl = this.outgoingMainEl || this.main.el;
        let r = d.cloneNode(this.outgoingMainEl, "");
        this.main.showLoader(this.loaderTimeout),
          this.main.destroy(),
          (this.main = this.newRootView(r, t, n)),
          this.main.setRedirect(e),
          this.transitionRemoves(),
          this.main.join((a, o) => {
            a === 1 &&
              this.commitPendingLink(s) &&
              this.requestDOMUpdate(() => {
                d.findPhxSticky(document).forEach((l) => r.appendChild(l)),
                  this.outgoingMainEl.replaceWith(r),
                  (this.outgoingMainEl = null),
                  i && requestAnimationFrame(i),
                  o();
              });
          });
      }
      transitionRemoves(e) {
        let t = this.binding("remove");
        (e = e || d.all(document, `[${t}]`)),
          e.forEach((i) => {
            document.body.contains(i) &&
              this.execJS(i, i.getAttribute(t), "remove");
          });
      }
      isPhxView(e) {
        return e.getAttribute && e.getAttribute(z) !== null;
      }
      newRootView(e, t, i) {
        let s = new Jt(e, this, null, t, i);
        return (this.roots[s.id] = s), s;
      }
      owner(e, t) {
        let i = W(e.closest(ie), (s) => this.getViewByEl(s)) || this.main;
        i && t(i);
      }
      withinOwners(e, t) {
        this.owner(e, (i) => t(i, e));
      }
      getViewByEl(e) {
        let t = e.getAttribute(pe);
        return W(this.getRootById(t), (i) => i.getDescendentByEl(e));
      }
      getRootById(e) {
        return this.roots[e];
      }
      destroyAllViews() {
        for (let e in this.roots) this.roots[e].destroy(), delete this.roots[e];
        this.main = null;
      }
      destroyViewByEl(e) {
        let t = this.getRootById(e.getAttribute(pe));
        t && t.id === e.id
          ? (t.destroy(), delete this.roots[t.id])
          : t && t.destroyDescendent(e.id);
      }
      setActiveElement(e) {
        if (this.activeElement === e) return;
        this.activeElement = e;
        let t = () => {
          e === this.activeElement && (this.activeElement = null),
            e.removeEventListener("mouseup", this),
            e.removeEventListener("touchend", this);
        };
        e.addEventListener("mouseup", t), e.addEventListener("touchend", t);
      }
      getActiveElement() {
        return document.activeElement === document.body
          ? this.activeElement || document.activeElement
          : document.activeElement || document.body;
      }
      dropActiveElement(e) {
        this.prevActive &&
          e.ownsElement(this.prevActive) &&
          (this.prevActive = null);
      }
      restorePreviouslyActiveFocus() {
        this.prevActive &&
          this.prevActive !== document.body &&
          this.prevActive.focus();
      }
      blurActiveElement() {
        (this.prevActive = this.getActiveElement()),
          this.prevActive !== document.body && this.prevActive.blur();
      }
      bindTopLevelEvents({ dead: e } = {}) {
        this.boundTopLevelEvents ||
          ((this.boundTopLevelEvents = !0),
          this.socket.onClose((t) => {
            if (t && t.code === 1001) return this.unload();
            if (t && t.code === 1e3 && this.main)
              return this.reloadWithJitter(this.main);
          }),
          document.body.addEventListener("click", function () {}),
          window.addEventListener(
            "pageshow",
            (t) => {
              t.persisted &&
                (this.getSocket().disconnect(),
                this.withPageLoading({
                  to: window.location.href,
                  kind: "redirect",
                }),
                window.location.reload());
            },
            !0,
          ),
          e || this.bindNav(),
          this.bindClicks(),
          e || this.bindForms(),
          this.bind(
            { keyup: "keyup", keydown: "keydown" },
            (t, i, s, n, r, a) => {
              let o = n.getAttribute(this.binding(Ai)),
                l = t.key && t.key.toLowerCase();
              if (o && o.toLowerCase() !== l) return;
              let h = se({ key: t.key }, this.eventMeta(i, t, n));
              $.exec(i, r, s, n, ["push", { data: h }]);
            },
          ),
          this.bind(
            { blur: "focusout", focus: "focusin" },
            (t, i, s, n, r, a) => {
              if (!a) {
                let o = se({ key: t.key }, this.eventMeta(i, t, n));
                $.exec(i, r, s, n, ["push", { data: o }]);
              }
            },
          ),
          this.bind({ blur: "blur", focus: "focus" }, (t, i, s, n, r, a, o) => {
            if (o === "window") {
              let l = this.eventMeta(i, t, n);
              $.exec(i, a, s, n, ["push", { data: l }]);
            }
          }),
          window.addEventListener("dragover", (t) => t.preventDefault()),
          window.addEventListener("drop", (t) => {
            t.preventDefault();
            let i = W(fe(t.target, this.binding(bt)), (r) =>
                r.getAttribute(this.binding(bt)),
              ),
              s = i && document.getElementById(i),
              n = Array.from(t.dataTransfer.files || []);
            !s ||
              s.disabled ||
              n.length === 0 ||
              !(s.files instanceof FileList) ||
              (P.trackFiles(s, n, t.dataTransfer),
              s.dispatchEvent(new Event("input", { bubbles: !0 })));
          }),
          this.on(Ut, (t) => {
            let i = t.target;
            if (!d.isUploadInput(i)) return;
            let s = Array.from(t.detail.files || []).filter(
              (n) => n instanceof File || n instanceof Blob,
            );
            P.trackFiles(i, s),
              i.dispatchEvent(new Event("input", { bubbles: !0 }));
          }));
      }
      eventMeta(e, t, i) {
        let s = this.metadataCallbacks[e];
        return s ? s(t, i) : {};
      }
      setPendingLink(e) {
        return this.linkRef++, (this.pendingLink = e), this.linkRef;
      }
      commitPendingLink(e) {
        return this.linkRef !== e
          ? !1
          : ((this.href = this.pendingLink), (this.pendingLink = null), !0);
      }
      getHref() {
        return this.href;
      }
      hasPendingLink() {
        return !!this.pendingLink;
      }
      bind(e, t) {
        for (let i in e) {
          let s = e[i];
          this.on(s, (n) => {
            let r = this.binding(i),
              a = this.binding(`window-${i}`),
              o = n.target.getAttribute && n.target.getAttribute(r);
            o
              ? this.debounce(n.target, n, s, () => {
                  this.withinOwners(n.target, (l) => {
                    t(n, i, l, n.target, o, null);
                  });
                })
              : d.all(document, `[${a}]`, (l) => {
                  let h = l.getAttribute(a);
                  this.debounce(l, n, s, () => {
                    this.withinOwners(l, (c) => {
                      t(n, i, c, l, h, "window");
                    });
                  });
                });
          });
        }
      }
      bindClicks() {
        window.addEventListener(
          "click",
          (e) => (this.clickStartedAtTarget = e.target),
        ),
          this.bindClick("click", "click", !1),
          this.bindClick("mousedown", "capture-click", !0);
      }
      bindClick(e, t, i) {
        let s = this.binding(t);
        window.addEventListener(
          e,
          (n) => {
            let r = null;
            if (i)
              r = n.target.matches(`[${s}]`)
                ? n.target
                : n.target.querySelector(`[${s}]`);
            else {
              let o = this.clickStartedAtTarget || n.target;
              (r = fe(o, s)),
                this.dispatchClickAway(n, o),
                (this.clickStartedAtTarget = null);
            }
            let a = r && r.getAttribute(s);
            if (!a) {
              let o =
                n.target instanceof HTMLAnchorElement
                  ? n.target.getAttribute("href")
                  : null;
              !i &&
                o !== null &&
                !d.wantsNewTab(n) &&
                d.isNewPageHref(o, window.location) &&
                this.unload();
              return;
            }
            r.getAttribute("href") === "#" && n.preventDefault(),
              this.debounce(r, n, "click", () => {
                this.withinOwners(r, (o) => {
                  $.exec("click", a, o, r, [
                    "push",
                    { data: this.eventMeta("click", n, r) },
                  ]);
                });
              });
          },
          i,
        );
      }
      dispatchClickAway(e, t) {
        let i = this.binding("click-away");
        d.all(document, `[${i}]`, (s) => {
          s.isSameNode(t) ||
            s.contains(t) ||
            this.withinOwners(e.target, (n) => {
              let r = s.getAttribute(i);
              $.isVisible(s) &&
                $.exec("click", r, n, s, [
                  "push",
                  { data: this.eventMeta("click", e, e.target) },
                ]);
            });
        });
      }
      bindNav() {
        if (!F.canPushState()) return;
        history.scrollRestoration && (history.scrollRestoration = "manual");
        let e = null;
        window.addEventListener("scroll", (t) => {
          clearTimeout(e),
            (e = setTimeout(() => {
              F.updateCurrentState((i) =>
                Object.assign(i, { scroll: window.scrollY }),
              );
            }, 100));
        }),
          window.addEventListener(
            "popstate",
            (t) => {
              if (!this.registerNewLocation(window.location)) return;
              let { type: i, id: s, root: n, scroll: r } = t.state || {},
                a = window.location.href;
              this.requestDOMUpdate(() => {
                this.main.isConnected() && i === "patch" && s === this.main.id
                  ? this.main.pushLinkPatch(a, null, () => {
                      this.maybeScroll(r);
                    })
                  : this.replaceMain(a, null, () => {
                      n && this.replaceRootHistory(), this.maybeScroll(r);
                    });
              });
            },
            !1,
          ),
          window.addEventListener(
            "click",
            (t) => {
              let i = fe(t.target, ze),
                s = i && i.getAttribute(ze);
              if (!s || !this.isConnected() || !this.main || d.wantsNewTab(t))
                return;
              let n = i.href,
                r = i.getAttribute(mi);
              t.preventDefault(),
                t.stopImmediatePropagation(),
                this.pendingLink !== n &&
                  this.requestDOMUpdate(() => {
                    if (s === "patch") this.pushHistoryPatch(n, r, i);
                    else if (s === "redirect") this.historyRedirect(n, r);
                    else
                      throw new Error(
                        `expected ${ze} to be "patch" or "redirect", got: ${s}`,
                      );
                    let a = i.getAttribute(this.binding("click"));
                    a &&
                      this.requestDOMUpdate(() => this.execJS(i, a, "click"));
                  });
            },
            !1,
          );
      }
      maybeScroll(e) {
        typeof e == "number" &&
          requestAnimationFrame(() => {
            window.scrollTo(0, e);
          });
      }
      dispatchEvent(e, t = {}) {
        d.dispatchEvent(window, `phx:${e}`, { detail: t });
      }
      dispatchEvents(e) {
        e.forEach(([t, i]) => this.dispatchEvent(t, i));
      }
      withPageLoading(e, t) {
        d.dispatchEvent(window, "phx:page-loading-start", { detail: e });
        let i = () =>
          d.dispatchEvent(window, "phx:page-loading-stop", { detail: e });
        return t ? t(i) : i;
      }
      pushHistoryPatch(e, t, i) {
        if (!this.isConnected()) return F.redirect(e);
        this.withPageLoading({ to: e, kind: "patch" }, (s) => {
          this.main.pushLinkPatch(e, i, (n) => {
            this.historyPatch(e, t, n), s();
          });
        });
      }
      historyPatch(e, t, i = this.setPendingLink(e)) {
        !this.commitPendingLink(i) ||
          (F.pushState(t, { type: "patch", id: this.main.id }, e),
          this.registerNewLocation(window.location));
      }
      historyRedirect(e, t, i) {
        if (!this.isConnected()) return F.redirect(e, i);
        if (/^\/$|^\/[^\/]+.*$/.test(e)) {
          let { protocol: n, host: r } = window.location;
          e = `${n}//${r}${e}`;
        }
        let s = window.scrollY;
        this.withPageLoading({ to: e, kind: "redirect" }, (n) => {
          this.replaceMain(e, i, () => {
            F.pushState(
              t,
              { type: "redirect", id: this.main.id, scroll: s },
              e,
            ),
              this.registerNewLocation(window.location),
              n();
          });
        });
      }
      replaceRootHistory() {
        F.pushState("replace", { root: !0, type: "patch", id: this.main.id });
      }
      registerNewLocation(e) {
        let { pathname: t, search: i } = this.currentLocation;
        return t + i === e.pathname + e.search
          ? !1
          : ((this.currentLocation = He(e)), !0);
      }
      bindForms() {
        let e = 0,
          t = !1;
        this.on(
          "submit",
          (i) => {
            let s = i.target.getAttribute(this.binding("submit")),
              n = i.target.getAttribute(this.binding("change"));
            !t &&
              n &&
              !s &&
              ((t = !0),
              i.preventDefault(),
              this.withinOwners(i.target, (r) => {
                r.disableForm(i.target),
                  window.requestAnimationFrame(() => {
                    d.isUnloadableFormSubmit(i) && this.unload(),
                      i.target.submit();
                  });
              }));
          },
          !0,
        ),
          this.on(
            "submit",
            (i) => {
              let s = i.target.getAttribute(this.binding("submit"));
              if (!s) {
                d.isUnloadableFormSubmit(i) && this.unload();
                return;
              }
              i.preventDefault(),
                (i.target.disabled = !0),
                this.withinOwners(i.target, (n) => {
                  $.exec("submit", s, n, i.target, [
                    "push",
                    { submitter: i.submitter },
                  ]);
                });
            },
            !1,
          );
        for (let i of ["change", "input"])
          this.on(
            i,
            (s) => {
              let n = this.binding("change"),
                r = s.target,
                a = r.getAttribute(n),
                o = r.form && r.form.getAttribute(n),
                l = a || o;
              if (
                !l ||
                (r.type === "number" && r.validity && r.validity.badInput)
              )
                return;
              let h = a ? r : r.form,
                c = e;
              e++;
              let { at: p, type: g } = d.private(r, "prev-iteration") || {};
              (p === c - 1 && i !== g) ||
                (d.putPrivate(r, "prev-iteration", { at: c, type: i }),
                this.debounce(r, s, i, () => {
                  this.withinOwners(h, (f) => {
                    d.putPrivate(r, at, !0),
                      d.isTextualInput(r) || this.setActiveElement(r),
                      $.exec("change", l, f, r, [
                        "push",
                        { _target: s.target.name, dispatcher: h },
                      ]);
                  });
                }));
            },
            !1,
          );
        this.on("reset", (i) => {
          let s = i.target;
          d.resetForm(s, this.binding(Ne));
          let n = Array.from(s.elements).find((r) => r.type === "reset");
          window.requestAnimationFrame(() => {
            n.dispatchEvent(
              new Event("input", { bubbles: !0, cancelable: !1 }),
            );
          });
        });
      }
      debounce(e, t, i, s) {
        if (i === "blur" || i === "focusout") return s();
        let n = this.binding(wi),
          r = this.binding(Si),
          a = this.defaults.debounce.toString(),
          o = this.defaults.throttle.toString();
        this.withinOwners(e, (l) => {
          let h = () => !l.isDestroyed() && document.body.contains(e);
          d.debounce(e, t, n, a, r, o, h, () => {
            s();
          });
        });
      }
      silenceEvents(e) {
        (this.silenced = !0), e(), (this.silenced = !1);
      }
      on(e, t) {
        window.addEventListener(e, (i) => {
          this.silenced || t(i);
        });
      }
    },
    is = class {
      constructor() {
        (this.transitions = new Set()), (this.pendingOps = []);
      }
      reset() {
        this.transitions.forEach((e) => {
          clearTimeout(e), this.transitions.delete(e);
        }),
          this.flushPendingOps();
      }
      after(e) {
        this.size() === 0 ? e() : this.pushPendingOp(e);
      }
      addTransition(e, t, i) {
        t();
        let s = setTimeout(() => {
          this.transitions.delete(s), i(), this.flushPendingOps();
        }, e);
        this.transitions.add(s);
      }
      pushPendingOp(e) {
        this.pendingOps.push(e);
      }
      size() {
        return this.transitions.size;
      }
      flushPendingOps() {
        if (this.size() > 0) return;
        let e = this.pendingOps.shift();
        e && (e(), this.flushPendingOps());
      }
    };
  var Ue = si(Xt()),
    ss = document
      .querySelector("meta[name='csrf-token']")
      .getAttribute("content"),
    Wt = new Vt("/live", vt, { params: { _csrf_token: ss } });
  Ue.default.config({
    barColors: { 0: "#29d" },
    shadowColor: "rgba(0, 0, 0, .3)",
  });
  window.addEventListener("phx:page-loading-start", (e) =>
    Ue.default.show(300),
  );
  window.addEventListener("phx:page-loading-stop", (e) => Ue.default.hide());
  Wt.connect();
  window.liveSocket = Wt;
})();
/**
 * @license MIT
 * topbar 2.0.0, 2023-02-04
 * https://buunguyen.github.io/topbar
 * Copyright (c) 2021 Buu Nguyen
 */
