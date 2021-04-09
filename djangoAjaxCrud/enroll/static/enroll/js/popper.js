/**
 * @popperjs/core v2.5.4 - MIT License
 */

"use strict";
!function (e, t) {
    "object" == typeof exports && "undefined" != typeof module ? t(exports) : "function" == typeof define && define.amd ? define(["exports"], t) : t((e = e || self).Popper = {})
}(this, (function (e) {
    function t(e) {
        return {
            width: (e = e.getBoundingClientRect()).width,
            height: e.height,
            top: e.top,
            right: e.right,
            bottom: e.bottom,
            left: e.left,
            x: e.left,
            y: e.top
        }
    }

    function n(e) {
        return "[object Window]" !== e.toString() ? (e = e.ownerDocument) && e.defaultView || window : e
    }

    function r(e) {
        return {scrollLeft: (e = n(e)).pageXOffset, scrollTop: e.pageYOffset}
    }

    function o(e) {
        return e instanceof n(e).Element || e instanceof Element
    }

    function i(e) {
        return e instanceof n(e).HTMLElement || e instanceof HTMLElement
    }

    function a(e) {
        return e ? (e.nodeName || "").toLowerCase() : null
    }

    function s(e) {
        return ((o(e) ? e.ownerDocument : e.document) || window.document).documentElement
    }

    function f(e) {
        return t(s(e)).left + r(e).scrollLeft
    }

    function c(e) {
        return n(e).getComputedStyle(e)
    }

    function p(e) {
        return e = c(e), /auto|scroll|overlay|hidden/.test(e.overflow + e.overflowY + e.overflowX)
    }

    function l(e, o, c) {
        void 0 === c && (c = !1);
        var l = s(o);
        e = t(e);
        var u = i(o), d = {scrollLeft: 0, scrollTop: 0}, m = {x: 0, y: 0};
        return (u || !u && !c) && (("body" !== a(o) || p(l)) && (d = o !== n(o) && i(o) ? {
            scrollLeft: o.scrollLeft,
            scrollTop: o.scrollTop
        } : r(o)), i(o) ? ((m = t(o)).x += o.clientLeft, m.y += o.clientTop) : l && (m.x = f(l))), {
            x: e.left + d.scrollLeft - m.x,
            y: e.top + d.scrollTop - m.y,
            width: e.width,
            height: e.height
        }
    }

    function u(e) {
        return {x: e.offsetLeft, y: e.offsetTop, width: e.offsetWidth, height: e.offsetHeight}
    }

    function d(e) {
        return "html" === a(e) ? e : e.assignedSlot || e.parentNode || e.host || s(e)
    }

    function m(e, t) {
        void 0 === t && (t = []);
        var r = function e(t) {
            return 0 <= ["html", "body", "#document"].indexOf(a(t)) ? t.ownerDocument.body : i(t) && p(t) ? t : e(d(t))
        }(e);
        e = "body" === a(r);
        var o = n(r);
        return r = e ? [o].concat(o.visualViewport || [], p(r) ? r : []) : r, t = t.concat(r), e ? t : t.concat(m(d(r)))
    }

    function h(e) {
        if (!i(e) || "fixed" === c(e).position) return null;
        if (e = e.offsetParent) {
            var t = s(e);
            if ("body" === a(e) && "static" === c(e).position && "static" !== c(t).position) return t
        }
        return e
    }

    function g(e) {
        for (var t = n(e), r = h(e); r && 0 <= ["table", "td", "th"].indexOf(a(r)) && "static" === c(r).position;) r = h(r);
        if (r && "body" === a(r) && "static" === c(r).position) return t;
        if (!r) e:{
            for (e = d(e); i(e) && 0 > ["html", "body"].indexOf(a(e));) {
                if ("none" !== (r = c(e)).transform || "none" !== r.perspective || r.willChange && "auto" !== r.willChange) {
                    r = e;
                    break e
                }
                e = e.parentNode
            }
            r = null
        }
        return r || t
    }

    function v(e) {
        var t = new Map, n = new Set, r = [];
        return e.forEach((function (e) {
            t.set(e.name, e)
        })), e.forEach((function (e) {
            n.has(e.name) || function e(o) {
                n.add(o.name), [].concat(o.requires || [], o.requiresIfExists || []).forEach((function (r) {
                    n.has(r) || (r = t.get(r)) && e(r)
                })), r.push(o)
            }(e)
        })), r
    }

    function b(e) {
        var t;
        return function () {
            return t || (t = new Promise((function (n) {
                Promise.resolve().then((function () {
                    t = void 0, n(e())
                }))
            }))), t
        }
    }

    function y(e) {
        return e.split("-")[0]
    }

    function O(e, t) {
        var r, o = t.getRootNode && t.getRootNode();
        if (e.contains(t)) return !0;
        if ((r = o) && (r = o instanceof (r = n(o).ShadowRoot) || o instanceof ShadowRoot), r) do {
            if (t && e.isSameNode(t)) return !0;
            t = t.parentNode || t.host
        } while (t);
        return !1
    }

    function w(e) {
        return Object.assign(Object.assign({}, e), {}, {
            left: e.x,
            top: e.y,
            right: e.x + e.width,
            bottom: e.y + e.height
        })
    }

    function x(e, o) {
        if ("viewport" === o) {
            o = n(e);
            var a = s(e);
            o = o.visualViewport;
            var p = a.clientWidth;
            a = a.clientHeight;
            var l = 0, u = 0;
            o && (p = o.width, a = o.height, /^((?!chrome|android).)*safari/i.test(navigator.userAgent) || (l = o.offsetLeft, u = o.offsetTop)), e = w(e = {
                width: p,
                height: a,
                x: l + f(e),
                y: u
            })
        } else i(o) ? ((e = t(o)).top += o.clientTop, e.left += o.clientLeft, e.bottom = e.top + o.clientHeight, e.right = e.left + o.clientWidth, e.width = o.clientWidth, e.height = o.clientHeight, e.x = e.left, e.y = e.top) : (u = s(e), e = s(u), l = r(u), o = u.ownerDocument.body, p = Math.max(e.scrollWidth, e.clientWidth, o ? o.scrollWidth : 0, o ? o.clientWidth : 0), a = Math.max(e.scrollHeight, e.clientHeight, o ? o.scrollHeight : 0, o ? o.clientHeight : 0), u = -l.scrollLeft + f(u), l = -l.scrollTop, "rtl" === c(o || e).direction && (u += Math.max(e.clientWidth, o ? o.clientWidth : 0) - p), e = w({
            width: p,
            height: a,
            x: u,
            y: l
        }));
        return e
    }

    function j(e, t, n) {
        return t = "clippingParents" === t ? function (e) {
            var t = m(d(e)), n = 0 <= ["absolute", "fixed"].indexOf(c(e).position) && i(e) ? g(e) : e;
            return o(n) ? t.filter((function (e) {
                return o(e) && O(e, n) && "body" !== a(e)
            })) : []
        }(e) : [].concat(t), (n = (n = [].concat(t, [n])).reduce((function (t, n) {
            return n = x(e, n), t.top = Math.max(n.top, t.top), t.right = Math.min(n.right, t.right), t.bottom = Math.min(n.bottom, t.bottom), t.left = Math.max(n.left, t.left), t
        }), x(e, n[0]))).width = n.right - n.left, n.height = n.bottom - n.top, n.x = n.left, n.y = n.top, n
    }

    function M(e) {
        return 0 <= ["top", "bottom"].indexOf(e) ? "x" : "y"
    }

    function E(e) {
        var t = e.reference, n = e.element, r = (e = e.placement) ? y(e) : null;
        e = e ? e.split("-")[1] : null;
        var o = t.x + t.width / 2 - n.width / 2, i = t.y + t.height / 2 - n.height / 2;
        switch (r) {
            case"top":
                o = {x: o, y: t.y - n.height};
                break;
            case"bottom":
                o = {x: o, y: t.y + t.height};
                break;
            case"right":
                o = {x: t.x + t.width, y: i};
                break;
            case"left":
                o = {x: t.x - n.width, y: i};
                break;
            default:
                o = {x: t.x, y: t.y}
        }
        if (null != (r = r ? M(r) : null)) switch (i = "y" === r ? "height" : "width", e) {
            case"start":
                o[r] = Math.floor(o[r]) - Math.floor(t[i] / 2 - n[i] / 2);
                break;
            case"end":
                o[r] = Math.floor(o[r]) + Math.ceil(t[i] / 2 - n[i] / 2)
        }
        return o
    }

    function D(e) {
        return Object.assign(Object.assign({}, {top: 0, right: 0, bottom: 0, left: 0}), e)
    }

    function P(e, t) {
        return t.reduce((function (t, n) {
            return t[n] = e, t
        }), {})
    }

    function L(e, n) {
        void 0 === n && (n = {});
        var r = n;
        n = void 0 === (n = r.placement) ? e.placement : n;
        var i = r.boundary, a = void 0 === i ? "clippingParents" : i,
            f = void 0 === (i = r.rootBoundary) ? "viewport" : i;
        i = void 0 === (i = r.elementContext) ? "popper" : i;
        var c = r.altBoundary, p = void 0 !== c && c;
        r = D("number" != typeof (r = void 0 === (r = r.padding) ? 0 : r) ? r : P(r, T));
        var l = e.elements.reference;
        c = e.rects.popper, a = j(o(p = e.elements[p ? "popper" === i ? "reference" : "popper" : i]) ? p : p.contextElement || s(e.elements.popper), a, f), p = E({
            reference: f = t(l),
            element: c,
            strategy: "absolute",
            placement: n
        }), c = w(Object.assign(Object.assign({}, c), p)), f = "popper" === i ? c : f;
        var u = {
            top: a.top - f.top + r.top,
            bottom: f.bottom - a.bottom + r.bottom,
            left: a.left - f.left + r.left,
            right: f.right - a.right + r.right
        };
        if (e = e.modifiersData.offset, "popper" === i && e) {
            var d = e[n];
            Object.keys(u).forEach((function (e) {
                var t = 0 <= ["right", "bottom"].indexOf(e) ? 1 : -1, n = 0 <= ["top", "bottom"].indexOf(e) ? "y" : "x";
                u[e] += d[n] * t
            }))
        }
        return u
    }

    function k() {
        for (var e = arguments.length, t = Array(e), n = 0; n < e; n++) t[n] = arguments[n];
        return !t.some((function (e) {
            return !(e && "function" == typeof e.getBoundingClientRect)
        }))
    }

    function B(e) {
        void 0 === e && (e = {});
        var t = e.defaultModifiers, n = void 0 === t ? [] : t, r = void 0 === (e = e.defaultOptions) ? V : e;
        return function (e, t, i) {
            function a() {
                f.forEach((function (e) {
                    return e()
                })), f = []
            }

            void 0 === i && (i = r);
            var s = {
                placement: "bottom",
                orderedModifiers: [],
                options: Object.assign(Object.assign({}, V), r),
                modifiersData: {},
                elements: {reference: e, popper: t},
                attributes: {},
                styles: {}
            }, f = [], c = !1, p = {
                state: s, setOptions: function (i) {
                    return a(), s.options = Object.assign(Object.assign(Object.assign({}, r), s.options), i), s.scrollParents = {
                        reference: o(e) ? m(e) : e.contextElement ? m(e.contextElement) : [],
                        popper: m(t)
                    }, i = function (e) {
                        var t = v(e);
                        return N.reduce((function (e, n) {
                            return e.concat(t.filter((function (e) {
                                return e.phase === n
                            })))
                        }), [])
                    }(function (e) {
                        var t = e.reduce((function (e, t) {
                            var n = e[t.name];
                            return e[t.name] = n ? Object.assign(Object.assign(Object.assign({}, n), t), {}, {
                                options: Object.assign(Object.assign({}, n.options), t.options),
                                data: Object.assign(Object.assign({}, n.data), t.data)
                            }) : t, e
                        }), {});
                        return Object.keys(t).map((function (e) {
                            return t[e]
                        }))
                    }([].concat(n, s.options.modifiers))), s.orderedModifiers = i.filter((function (e) {
                        return e.enabled
                    })), s.orderedModifiers.forEach((function (e) {
                        var t = e.name, n = e.options;
                        n = void 0 === n ? {} : n, "function" == typeof (e = e.effect) && (t = e({
                            state: s,
                            name: t,
                            instance: p,
                            options: n
                        }), f.push(t || function () {
                        }))
                    })), p.update()
                }, forceUpdate: function () {
                    if (!c) {
                        var e = s.elements, t = e.reference;
                        if (k(t, e = e.popper)) for (s.rects = {
                            reference: l(t, g(e), "fixed" === s.options.strategy),
                            popper: u(e)
                        }, s.reset = !1, s.placement = s.options.placement, s.orderedModifiers.forEach((function (e) {
                            return s.modifiersData[e.name] = Object.assign({}, e.data)
                        })), t = 0; t < s.orderedModifiers.length; t++) if (!0 === s.reset) s.reset = !1, t = -1; else {
                            var n = s.orderedModifiers[t];
                            e = n.fn;
                            var r = n.options;
                            r = void 0 === r ? {} : r, n = n.name, "function" == typeof e && (s = e({
                                state: s,
                                options: r,
                                name: n,
                                instance: p
                            }) || s)
                        }
                    }
                }, update: b((function () {
                    return new Promise((function (e) {
                        p.forceUpdate(), e(s)
                    }))
                })), destroy: function () {
                    a(), c = !0
                }
            };
            return k(e, t) ? (p.setOptions(i).then((function (e) {
                !c && i.onFirstUpdate && i.onFirstUpdate(e)
            })), p) : p
        }
    }

    function W(e) {
        var t, r = e.popper, o = e.popperRect, i = e.placement, a = e.offsets, f = e.position, c = e.gpuAcceleration,
            p = e.adaptive, l = window.devicePixelRatio || 1;
        e = Math.round(a.x * l) / l || 0, l = Math.round(a.y * l) / l || 0;
        var u = a.hasOwnProperty("x");
        a = a.hasOwnProperty("y");
        var d, m = "left", h = "top", v = window;
        if (p) {
            var b = g(r);
            b === n(r) && (b = s(r)), "top" === i && (h = "bottom", l -= b.clientHeight - o.height, l *= c ? 1 : -1), "left" === i && (m = "right", e -= b.clientWidth - o.width, e *= c ? 1 : -1)
        }
        return r = Object.assign({position: f}, p && z), c ? Object.assign(Object.assign({}, r), {}, ((d = {})[h] = a ? "0" : "", d[m] = u ? "0" : "", d.transform = 2 > (v.devicePixelRatio || 1) ? "translate(" + e + "px, " + l + "px)" : "translate3d(" + e + "px, " + l + "px, 0)", d)) : Object.assign(Object.assign({}, r), {}, ((t = {})[h] = a ? l + "px" : "", t[m] = u ? e + "px" : "", t.transform = "", t))
    }

    function A(e) {
        return e.replace(/left|right|bottom|top/g, (function (e) {
            return G[e]
        }))
    }

    function H(e) {
        return e.replace(/start|end/g, (function (e) {
            return J[e]
        }))
    }

    function R(e, t, n) {
        return void 0 === n && (n = {x: 0, y: 0}), {
            top: e.top - t.height - n.y,
            right: e.right - t.width + n.x,
            bottom: e.bottom - t.height + n.y,
            left: e.left - t.width - n.x
        }
    }

    function S(e) {
        return ["top", "right", "bottom", "left"].some((function (t) {
            return 0 <= e[t]
        }))
    }

    var T = ["top", "bottom", "right", "left"], q = T.reduce((function (e, t) {
            return e.concat([t + "-start", t + "-end"])
        }), []), C = [].concat(T, ["auto"]).reduce((function (e, t) {
            return e.concat([t, t + "-start", t + "-end"])
        }), []), N = "beforeRead read afterRead beforeMain main afterMain beforeWrite write afterWrite".split(" "),
        V = {placement: "bottom", modifiers: [], strategy: "absolute"}, I = {passive: !0}, _ = {
            name: "eventListeners", enabled: !0, phase: "write", fn: function () {
            }, effect: function (e) {
                var t = e.state, r = e.instance, o = (e = e.options).scroll, i = void 0 === o || o,
                    a = void 0 === (e = e.resize) || e, s = n(t.elements.popper),
                    f = [].concat(t.scrollParents.reference, t.scrollParents.popper);
                return i && f.forEach((function (e) {
                    e.addEventListener("scroll", r.update, I)
                })), a && s.addEventListener("resize", r.update, I), function () {
                    i && f.forEach((function (e) {
                        e.removeEventListener("scroll", r.update, I)
                    })), a && s.removeEventListener("resize", r.update, I)
                }
            }, data: {}
        }, U = {
            name: "popperOffsets", enabled: !0, phase: "read", fn: function (e) {
                var t = e.state;
                t.modifiersData[e.name] = E({
                    reference: t.rects.reference,
                    element: t.rects.popper,
                    strategy: "absolute",
                    placement: t.placement
                })
            }, data: {}
        }, z = {top: "auto", right: "auto", bottom: "auto", left: "auto"}, F = {
            name: "computeStyles", enabled: !0, phase: "beforeWrite", fn: function (e) {
                var t = e.state, n = e.options;
                e = void 0 === (e = n.gpuAcceleration) || e, n = void 0 === (n = n.adaptive) || n, e = {
                    placement: y(t.placement),
                    popper: t.elements.popper,
                    popperRect: t.rects.popper,
                    gpuAcceleration: e
                }, null != t.modifiersData.popperOffsets && (t.styles.popper = Object.assign(Object.assign({}, t.styles.popper), W(Object.assign(Object.assign({}, e), {}, {
                    offsets: t.modifiersData.popperOffsets,
                    position: t.options.strategy,
                    adaptive: n
                })))), null != t.modifiersData.arrow && (t.styles.arrow = Object.assign(Object.assign({}, t.styles.arrow), W(Object.assign(Object.assign({}, e), {}, {
                    offsets: t.modifiersData.arrow,
                    position: "absolute",
                    adaptive: !1
                })))), t.attributes.popper = Object.assign(Object.assign({}, t.attributes.popper), {}, {"data-popper-placement": t.placement})
            }, data: {}
        }, X = {
            name: "applyStyles", enabled: !0, phase: "write", fn: function (e) {
                var t = e.state;
                Object.keys(t.elements).forEach((function (e) {
                    var n = t.styles[e] || {}, r = t.attributes[e] || {}, o = t.elements[e];
                    i(o) && a(o) && (Object.assign(o.style, n), Object.keys(r).forEach((function (e) {
                        var t = r[e];
                        !1 === t ? o.removeAttribute(e) : o.setAttribute(e, !0 === t ? "" : t)
                    })))
                }))
            }, effect: function (e) {
                var t = e.state, n = {
                    popper: {position: t.options.strategy, left: "0", top: "0", margin: "0"},
                    arrow: {position: "absolute"},
                    reference: {}
                };
                return Object.assign(t.elements.popper.style, n.popper), t.elements.arrow && Object.assign(t.elements.arrow.style, n.arrow), function () {
                    Object.keys(t.elements).forEach((function (e) {
                        var r = t.elements[e], o = t.attributes[e] || {};
                        e = Object.keys(t.styles.hasOwnProperty(e) ? t.styles[e] : n[e]).reduce((function (e, t) {
                            return e[t] = "", e
                        }), {}), i(r) && a(r) && (Object.assign(r.style, e), Object.keys(o).forEach((function (e) {
                            r.removeAttribute(e)
                        })))
                    }))
                }
            }, requires: ["computeStyles"]
        }, Y = {
            name: "offset", enabled: !0, phase: "main", requires: ["popperOffsets"], fn: function (e) {
                var t = e.state, n = e.name, r = void 0 === (e = e.options.offset) ? [0, 0] : e,
                    o = (e = C.reduce((function (e, n) {
                        var o = t.rects, i = y(n), a = 0 <= ["left", "top"].indexOf(i) ? -1 : 1,
                            s = "function" == typeof r ? r(Object.assign(Object.assign({}, o), {}, {placement: n})) : r;
                        return o = (o = s[0]) || 0, s = ((s = s[1]) || 0) * a, i = 0 <= ["left", "right"].indexOf(i) ? {
                            x: s,
                            y: o
                        } : {x: o, y: s}, e[n] = i, e
                    }), {}))[t.placement], i = o.x;
                o = o.y, null != t.modifiersData.popperOffsets && (t.modifiersData.popperOffsets.x += i, t.modifiersData.popperOffsets.y += o), t.modifiersData[n] = e
            }
        }, G = {left: "right", right: "left", bottom: "top", top: "bottom"}, J = {start: "end", end: "start"}, K = {
            name: "flip", enabled: !0, phase: "main", fn: function (e) {
                var t = e.state, n = e.options;
                if (e = e.name, !t.modifiersData[e]._skip) {
                    var r = n.mainAxis;
                    r = void 0 === r || r;
                    var o = n.altAxis;
                    o = void 0 === o || o;
                    var i = n.fallbackPlacements, a = n.padding, s = n.boundary, f = n.rootBoundary, c = n.altBoundary,
                        p = n.flipVariations, l = void 0 === p || p, u = n.allowedAutoPlacements;
                    p = y(n = t.options.placement), i = i || (p !== n && l ? function (e) {
                        if ("auto" === y(e)) return [];
                        var t = A(e);
                        return [H(e), t, H(t)]
                    }(n) : [A(n)]);
                    var d = [n].concat(i).reduce((function (e, n) {
                        return e.concat("auto" === y(n) ? function (e, t) {
                            void 0 === t && (t = {});
                            var n = t.boundary, r = t.rootBoundary, o = t.padding, i = t.flipVariations,
                                a = t.allowedAutoPlacements, s = void 0 === a ? C : a, f = t.placement.split("-")[1];
                            0 === (i = (t = f ? i ? q : q.filter((function (e) {
                                return e.split("-")[1] === f
                            })) : T).filter((function (e) {
                                return 0 <= s.indexOf(e)
                            }))).length && (i = t);
                            var c = i.reduce((function (t, i) {
                                return t[i] = L(e, {placement: i, boundary: n, rootBoundary: r, padding: o})[y(i)], t
                            }), {});
                            return Object.keys(c).sort((function (e, t) {
                                return c[e] - c[t]
                            }))
                        }(t, {
                            placement: n,
                            boundary: s,
                            rootBoundary: f,
                            padding: a,
                            flipVariations: l,
                            allowedAutoPlacements: u
                        }) : n)
                    }), []);
                    n = t.rects.reference, i = t.rects.popper;
                    var m = new Map;
                    p = !0;
                    for (var h = d[0], g = 0; g < d.length; g++) {
                        var v = d[g], b = y(v), O = "start" === v.split("-")[1], w = 0 <= ["top", "bottom"].indexOf(b),
                            x = w ? "width" : "height",
                            j = L(t, {placement: v, boundary: s, rootBoundary: f, altBoundary: c, padding: a});
                        if (O = w ? O ? "right" : "left" : O ? "bottom" : "top", n[x] > i[x] && (O = A(O)), x = A(O), w = [], r && w.push(0 >= j[b]), o && w.push(0 >= j[O], 0 >= j[x]), w.every((function (e) {
                            return e
                        }))) {
                            h = v, p = !1;
                            break
                        }
                        m.set(v, w)
                    }
                    if (p) for (r = function (e) {
                        var t = d.find((function (t) {
                            if (t = m.get(t)) return t.slice(0, e).every((function (e) {
                                return e
                            }))
                        }));
                        if (t) return h = t, "break"
                    }, o = l ? 3 : 1; 0 < o && "break" !== r(o); o--) ;
                    t.placement !== h && (t.modifiersData[e]._skip = !0, t.placement = h, t.reset = !0)
                }
            }, requiresIfExists: ["offset"], data: {_skip: !1}
        }, Q = {
            name: "preventOverflow", enabled: !0, phase: "main", fn: function (e) {
                var t = e.state, n = e.options;
                e = e.name;
                var r = n.mainAxis, o = void 0 === r || r;
                r = void 0 !== (r = n.altAxis) && r;
                var i = n.tether;
                i = void 0 === i || i;
                var a = n.tetherOffset, s = void 0 === a ? 0 : a;
                n = L(t, {
                    boundary: n.boundary,
                    rootBoundary: n.rootBoundary,
                    padding: n.padding,
                    altBoundary: n.altBoundary
                }), a = y(t.placement);
                var f = t.placement.split("-")[1], c = !f, p = M(a);
                a = "x" === p ? "y" : "x";
                var l = t.modifiersData.popperOffsets, d = t.rects.reference, m = t.rects.popper,
                    h = "function" == typeof s ? s(Object.assign(Object.assign({}, t.rects), {}, {placement: t.placement})) : s;
                if (s = {x: 0, y: 0}, l) {
                    if (o) {
                        var v = "y" === p ? "top" : "left", b = "y" === p ? "bottom" : "right",
                            O = "y" === p ? "height" : "width";
                        o = l[p];
                        var w = l[p] + n[v], x = l[p] - n[b], j = i ? -m[O] / 2 : 0, E = "start" === f ? d[O] : m[O];
                        f = "start" === f ? -m[O] : -d[O], m = t.elements.arrow, m = i && m ? u(m) : {width: 0, height: 0};
                        var D = t.modifiersData["arrow#persistent"] ? t.modifiersData["arrow#persistent"].padding : {
                            top: 0,
                            right: 0,
                            bottom: 0,
                            left: 0
                        };
                        v = D[v], b = D[b], m = Math.max(0, Math.min(d[O], m[O])), E = c ? d[O] / 2 - j - m - v - h : E - m - v - h, c = c ? -d[O] / 2 + j + m + b + h : f + m + b + h, h = t.elements.arrow && g(t.elements.arrow), d = t.modifiersData.offset ? t.modifiersData.offset[t.placement][p] : 0, h = l[p] + E - d - (h ? "y" === p ? h.clientTop || 0 : h.clientLeft || 0 : 0), c = l[p] + c - d, i = Math.max(i ? Math.min(w, h) : w, Math.min(o, i ? Math.max(x, c) : x)), l[p] = i, s[p] = i - o
                    }
                    r && (r = l[a], i = Math.max(r + n["x" === p ? "top" : "left"], Math.min(r, r - n["x" === p ? "bottom" : "right"])), l[a] = i, s[a] = i - r), t.modifiersData[e] = s
                }
            }, requiresIfExists: ["offset"]
        }, Z = {
            name: "arrow", enabled: !0, phase: "main", fn: function (e) {
                var t, n = e.state;
                e = e.name;
                var r = n.elements.arrow, o = n.modifiersData.popperOffsets, i = y(n.placement), a = M(i);
                if (i = 0 <= ["left", "right"].indexOf(i) ? "height" : "width", r && o) {
                    var s = n.modifiersData[e + "#persistent"].padding, f = u(r), c = "y" === a ? "top" : "left",
                        p = "y" === a ? "bottom" : "right",
                        l = n.rects.reference[i] + n.rects.reference[a] - o[a] - n.rects.popper[i];
                    o = o[a] - n.rects.reference[a], l = (r = (r = g(r)) ? "y" === a ? r.clientHeight || 0 : r.clientWidth || 0 : 0) / 2 - f[i] / 2 + (l / 2 - o / 2), i = Math.max(s[c], Math.min(l, r - f[i] - s[p])), n.modifiersData[e] = ((t = {})[a] = i, t.centerOffset = i - l, t)
                }
            }, effect: function (e) {
                var t = e.state, n = e.options;
                e = e.name;
                var r = n.element;
                if (r = void 0 === r ? "[data-popper-arrow]" : r, n = void 0 === (n = n.padding) ? 0 : n, null != r) {
                    if ("string" == typeof r && !(r = t.elements.popper.querySelector(r))) return;
                    O(t.elements.popper, r) && (t.elements.arrow = r, t.modifiersData[e + "#persistent"] = {padding: D("number" != typeof n ? n : P(n, T))})
                }
            }, requires: ["popperOffsets"], requiresIfExists: ["preventOverflow"]
        }, $ = {
            name: "hide", enabled: !0, phase: "main", requiresIfExists: ["preventOverflow"], fn: function (e) {
                var t = e.state;
                e = e.name;
                var n = t.rects.reference, r = t.rects.popper, o = t.modifiersData.preventOverflow,
                    i = L(t, {elementContext: "reference"}), a = L(t, {altBoundary: !0});
                n = R(i, n), r = R(a, r, o), o = S(n), a = S(r), t.modifiersData[e] = {
                    referenceClippingOffsets: n,
                    popperEscapeOffsets: r,
                    isReferenceHidden: o,
                    hasPopperEscaped: a
                }, t.attributes.popper = Object.assign(Object.assign({}, t.attributes.popper), {}, {
                    "data-popper-reference-hidden": o,
                    "data-popper-escaped": a
                })
            }
        }, ee = B({defaultModifiers: [_, U, F, X]}), te = [_, U, F, X, Y, K, Q, Z, $], ne = B({defaultModifiers: te});
    e.applyStyles = X, e.arrow = Z, e.computeStyles = F, e.createPopper = ne, e.createPopperLite = ee, e.defaultModifiers = te, e.detectOverflow = L, e.eventListeners = _, e.flip = K, e.hide = $, e.offset = Y, e.popperGenerator = B, e.popperOffsets = U, e.preventOverflow = Q, Object.defineProperty(e, "__esModule", {value: !0})
}));
//# sourceMappingURL=popper.min.js.map