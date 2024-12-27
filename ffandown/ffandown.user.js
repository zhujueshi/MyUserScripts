// ==UserScript==
// @name        ffandown
// @namespace   ffandown
// @match        *://*/*
// @exclude      *://github.com/*
// @version      1.5.1
// @description  ffandown m3u8视频嗅探插件
// @icon          https://pic.kblue.site/picgo/ffandown_favicon.ico
// @author       helsonlin
// @license MIT
// @namespace    https://github.com/helson-lin
// @homepage     https://github.com/helson-lin
// @match        *://*/*
// @exclude      *://github.com/*
// @require      https://file.helson-lin.cn/notyf/m3u8-parser.min.js
// @require      https://file.helson-lin.cn/notyf/notyf.min.js
// @connect      *
// @grant        unsafeWindow
// @grant        GM_openInTab
// @grant        GM.openInTab
// @grant        GM_getValue
// @grant        GM.getValue
// @grant        GM_setValue
// @grant        GM.setValue
// @grant        GM_deleteValue
// @grant        GM.deleteValue
// @grant        GM_xmlhttpRequest
// @grant        GM.xmlHttpRequest
// @grant        GM_download
// @run-at       document-start
// @downloadURL https://update.greasyfork.org/scripts/465336/ffandown.user.js
// @updateURL https://update.greasyfork.org/scripts/465336/ffandown.meta.js
// ==/UserScript==
(() => {
    "use strict";
    var e = {
            655: (e, n) => {
                n.A = (e, n) => {
                    const t = e.__vccOpts || e;
                    for (const [e, o] of n) t[e] = o;
                    return t;
                };
            },
        },
        n = {};
    function t(o) {
        var r = n[o];
        if (void 0 !== r) return r.exports;
        var i = (n[o] = { exports: {} });
        return e[o](i, i.exports, t), i.exports;
    }
    (t.g = (function () {
        if ("object" == typeof globalThis) return globalThis;
        try {
            return this || new Function("return this")();
        } catch (e) {
            if ("object" == typeof window) return window;
        }
    })()),
        (() => {
            function e(e, n) {
                const t = new Set(e.split(","));
                return n ? (e) => t.has(e.toLowerCase()) : (e) => t.has(e);
            }
            const n = {},
                o = [],
                r = () => {},
                i = () => !1,
                s = (e) =>
                    111 === e.charCodeAt(0) &&
                    110 === e.charCodeAt(1) &&
                    (e.charCodeAt(2) > 122 || e.charCodeAt(2) < 97),
                l = (e) => e.startsWith("onUpdate:"),
                a = Object.assign,
                c = (e, n) => {
                    const t = e.indexOf(n);
                    t > -1 && e.splice(t, 1);
                },
                u = Object.prototype.hasOwnProperty,
                d = (e, n) => u.call(e, n),
                p = Array.isArray,
                f = (e) => "[object Map]" === _(e),
                h = (e) => "[object Set]" === _(e),
                g = (e) => "function" == typeof e,
                m = (e) => "string" == typeof e,
                v = (e) => "symbol" == typeof e,
                y = (e) => null !== e && "object" == typeof e,
                w = (e) => (y(e) || g(e)) && g(e.then) && g(e.catch),
                b = Object.prototype.toString,
                _ = (e) => b.call(e),
                x = (e) => _(e).slice(8, -1),
                S = (e) => "[object Object]" === _(e),
                C = (e) => m(e) && "NaN" !== e && "-" !== e[0] && "" + parseInt(e, 10) === e,
                k = e(
                    ",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"
                ),
                E = (e) => {
                    const n = Object.create(null);
                    return (t) => n[t] || (n[t] = e(t));
                },
                O = /-(\w)/g,
                L = E((e) => e.replace(O, (e, n) => (n ? n.toUpperCase() : ""))),
                M = /\B([A-Z])/g,
                T = E((e) => e.replace(M, "-$1").toLowerCase()),
                A = E((e) => e.charAt(0).toUpperCase() + e.slice(1)),
                P = E((e) => (e ? `on${A(e)}` : "")),
                F = (e, n) => !Object.is(e, n),
                V = (e, n) => {
                    for (let t = 0; t < e.length; t++) e[t](n);
                },
                R = (e, n, t, o = !1) => {
                    Object.defineProperty(e, n, {
                        configurable: !0,
                        enumerable: !1,
                        writable: o,
                        value: t,
                    });
                },
                U = (e) => {
                    const n = parseFloat(e);
                    return isNaN(n) ? e : n;
                },
                j = (e) => {
                    const n = m(e) ? Number(e) : NaN;
                    return isNaN(n) ? e : n;
                };
            let z;
            const D = () =>
                z ||
                (z =
                    "undefined" != typeof globalThis
                        ? globalThis
                        : "undefined" != typeof self
                        ? self
                        : "undefined" != typeof window
                        ? window
                        : void 0 !== t.g
                        ? t.g
                        : {});
            function I(e) {
                if (p(e)) {
                    const n = {};
                    for (let t = 0; t < e.length; t++) {
                        const o = e[t],
                            r = m(o) ? H(o) : I(o);
                        if (r) for (const e in r) n[e] = r[e];
                    }
                    return n;
                }
                if (m(e) || y(e)) return e;
            }
            const N = /;(?![^(]*\))/g,
                $ = /:([^]+)/,
                B = /\/\*[^]*?\*\//g;
            function H(e) {
                const n = {};
                return (
                    e
                        .replace(B, "")
                        .split(N)
                        .forEach((e) => {
                            if (e) {
                                const t = e.split($);
                                t.length > 1 && (n[t[0].trim()] = t[1].trim());
                            }
                        }),
                    n
                );
            }
            function W(e) {
                let n = "";
                if (m(e)) n = e;
                else if (p(e))
                    for (let t = 0; t < e.length; t++) {
                        const o = W(e[t]);
                        o && (n += o + " ");
                    }
                else if (y(e)) for (const t in e) e[t] && (n += t + " ");
                return n.trim();
            }
            const q = "itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly",
                G = e(q);
            function K(e) {
                return !!e || "" === e;
            }
            const Y = (e) =>
                    m(e)
                        ? e
                        : null == e
                        ? ""
                        : p(e) || (y(e) && (e.toString === b || !g(e.toString)))
                        ? JSON.stringify(e, J, 2)
                        : String(e),
                J = (e, n) =>
                    n && n.__v_isRef
                        ? J(e, n.value)
                        : f(n)
                        ? {
                              [`Map(${n.size})`]: [...n.entries()].reduce(
                                  (e, [n, t], o) => ((e[X(n, o) + " =>"] = t), e),
                                  {}
                              ),
                          }
                        : h(n)
                        ? { [`Set(${n.size})`]: [...n.values()].map((e) => X(e)) }
                        : v(n)
                        ? X(n)
                        : !y(n) || p(n) || S(n)
                        ? n
                        : String(n),
                X = (e, n = "") => {
                    var t;
                    return v(e) ? `Symbol(${null != (t = e.description) ? t : n})` : e;
                };
            let Z, Q;
            class ee {
                constructor(e = !1) {
                    (this.detached = e),
                        (this._active = !0),
                        (this.effects = []),
                        (this.cleanups = []),
                        (this.parent = Z),
                        !e && Z && (this.index = (Z.scopes || (Z.scopes = [])).push(this) - 1);
                }
                get active() {
                    return this._active;
                }
                run(e) {
                    if (this._active) {
                        const n = Z;
                        try {
                            return (Z = this), e();
                        } finally {
                            Z = n;
                        }
                    } else 0;
                }
                on() {
                    Z = this;
                }
                off() {
                    Z = this.parent;
                }
                stop(e) {
                    if (this._active) {
                        let n, t;
                        for (n = 0, t = this.effects.length; n < t; n++) this.effects[n].stop();
                        for (n = 0, t = this.cleanups.length; n < t; n++) this.cleanups[n]();
                        if (this.scopes) for (n = 0, t = this.scopes.length; n < t; n++) this.scopes[n].stop(!0);
                        if (!this.detached && this.parent && !e) {
                            const e = this.parent.scopes.pop();
                            e && e !== this && ((this.parent.scopes[this.index] = e), (e.index = this.index));
                        }
                        (this.parent = void 0), (this._active = !1);
                    }
                }
            }
            function ne(e, n = Z) {
                n && n.active && n.effects.push(e);
            }
            class te {
                constructor(e, n, t, o) {
                    (this.fn = e),
                        (this.trigger = n),
                        (this.scheduler = t),
                        (this.active = !0),
                        (this.deps = []),
                        (this._dirtyLevel = 4),
                        (this._trackId = 0),
                        (this._runnings = 0),
                        (this._shouldSchedule = !1),
                        (this._depsLength = 0),
                        ne(this, o);
                }
                get dirty() {
                    if (2 === this._dirtyLevel || 3 === this._dirtyLevel) {
                        (this._dirtyLevel = 1), ue();
                        for (let e = 0; e < this._depsLength; e++) {
                            const n = this.deps[e];
                            if (n.computed && (oe(n.computed), this._dirtyLevel >= 4)) break;
                        }
                        1 === this._dirtyLevel && (this._dirtyLevel = 0), de();
                    }
                    return this._dirtyLevel >= 4;
                }
                set dirty(e) {
                    this._dirtyLevel = e ? 4 : 0;
                }
                run() {
                    if (((this._dirtyLevel = 0), !this.active)) return this.fn();
                    let e = le,
                        n = Q;
                    try {
                        return (le = !0), (Q = this), this._runnings++, re(this), this.fn();
                    } finally {
                        ie(this), this._runnings--, (Q = n), (le = e);
                    }
                }
                stop() {
                    this.active && (re(this), ie(this), this.onStop && this.onStop(), (this.active = !1));
                }
            }
            function oe(e) {
                return e.value;
            }
            function re(e) {
                e._trackId++, (e._depsLength = 0);
            }
            function ie(e) {
                if (e.deps.length > e._depsLength) {
                    for (let n = e._depsLength; n < e.deps.length; n++) se(e.deps[n], e);
                    e.deps.length = e._depsLength;
                }
            }
            function se(e, n) {
                const t = e.get(n);
                void 0 !== t && n._trackId !== t && (e.delete(n), 0 === e.size && e.cleanup());
            }
            let le = !0,
                ae = 0;
            const ce = [];
            function ue() {
                ce.push(le), (le = !1);
            }
            function de() {
                const e = ce.pop();
                le = void 0 === e || e;
            }
            function pe() {
                ae++;
            }
            function fe() {
                for (ae--; !ae && ge.length; ) ge.shift()();
            }
            function he(e, n, t) {
                if (n.get(e) !== e._trackId) {
                    n.set(e, e._trackId);
                    const t = e.deps[e._depsLength];
                    t !== n ? (t && se(t, e), (e.deps[e._depsLength++] = n)) : e._depsLength++;
                }
            }
            const ge = [];
            function me(e, n, t) {
                pe();
                for (const t of e.keys()) {
                    let o;
                    t._dirtyLevel < n &&
                        (null != o ? o : (o = e.get(t) === t._trackId)) &&
                        (t._shouldSchedule || (t._shouldSchedule = 0 === t._dirtyLevel), (t._dirtyLevel = n)),
                        t._shouldSchedule &&
                            (null != o ? o : (o = e.get(t) === t._trackId)) &&
                            (t.trigger(),
                            (t._runnings && !t.allowRecurse) ||
                                2 === t._dirtyLevel ||
                                ((t._shouldSchedule = !1), t.scheduler && ge.push(t.scheduler)));
                }
                fe();
            }
            const ve = (e, n) => {
                    const t = new Map();
                    return (t.cleanup = e), (t.computed = n), t;
                },
                ye = new WeakMap(),
                we = Symbol(""),
                be = Symbol("");
            function _e(e, n, t) {
                if (le && Q) {
                    let n = ye.get(e);
                    n || ye.set(e, (n = new Map()));
                    let o = n.get(t);
                    o || n.set(t, (o = ve(() => n.delete(t)))), he(Q, o);
                }
            }
            function xe(e, n, t, o, r, i) {
                const s = ye.get(e);
                if (!s) return;
                let l = [];
                if ("clear" === n) l = [...s.values()];
                else if ("length" === t && p(e)) {
                    const e = Number(o);
                    s.forEach((n, t) => {
                        ("length" === t || (!v(t) && t >= e)) && l.push(n);
                    });
                } else
                    switch ((void 0 !== t && l.push(s.get(t)), n)) {
                        case "add":
                            p(e) ? C(t) && l.push(s.get("length")) : (l.push(s.get(we)), f(e) && l.push(s.get(be)));
                            break;
                        case "delete":
                            p(e) || (l.push(s.get(we)), f(e) && l.push(s.get(be)));
                            break;
                        case "set":
                            f(e) && l.push(s.get(we));
                    }
                pe();
                for (const e of l) e && me(e, 4);
                fe();
            }
            const Se = e("__proto__,__v_isRef,__isVue"),
                Ce = new Set(
                    Object.getOwnPropertyNames(Symbol)
                        .filter((e) => "arguments" !== e && "caller" !== e)
                        .map((e) => Symbol[e])
                        .filter(v)
                ),
                ke = Ee();
            function Ee() {
                const e = {};
                return (
                    ["includes", "indexOf", "lastIndexOf"].forEach((n) => {
                        e[n] = function (...e) {
                            const t = fn(this);
                            for (let e = 0, n = this.length; e < n; e++) _e(t, 0, e + "");
                            const o = t[n](...e);
                            return -1 === o || !1 === o ? t[n](...e.map(fn)) : o;
                        };
                    }),
                    ["push", "pop", "shift", "unshift", "splice"].forEach((n) => {
                        e[n] = function (...e) {
                            ue(), pe();
                            const t = fn(this)[n].apply(this, e);
                            return fe(), de(), t;
                        };
                    }),
                    e
                );
            }
            function Oe(e) {
                v(e) || (e = String(e));
                const n = fn(this);
                return _e(n, 0, e), n.hasOwnProperty(e);
            }
            class Le {
                constructor(e = !1, n = !1) {
                    (this._isReadonly = e), (this._isShallow = n);
                }
                get(e, n, t) {
                    const o = this._isReadonly,
                        r = this._isShallow;
                    if ("__v_isReactive" === n) return !o;
                    if ("__v_isReadonly" === n) return o;
                    if ("__v_isShallow" === n) return r;
                    if ("__v_raw" === n)
                        return t === (o ? (r ? rn : on) : r ? tn : nn).get(e) ||
                            Object.getPrototypeOf(e) === Object.getPrototypeOf(t)
                            ? e
                            : void 0;
                    const i = p(e);
                    if (!o) {
                        if (i && d(ke, n)) return Reflect.get(ke, n, t);
                        if ("hasOwnProperty" === n) return Oe;
                    }
                    const s = Reflect.get(e, n, t);
                    return (v(n) ? Ce.has(n) : Se(n))
                        ? s
                        : (o || _e(e, 0, n),
                          r ? s : bn(s) ? (i && C(n) ? s : s.value) : y(s) ? (o ? ln(s) : sn(s)) : s);
                }
            }
            class Me extends Le {
                constructor(e = !1) {
                    super(!1, e);
                }
                set(e, n, t, o) {
                    let r = e[n];
                    if (!this._isShallow) {
                        const n = un(r);
                        if ((dn(t) || un(t) || ((r = fn(r)), (t = fn(t))), !p(e) && bn(r) && !bn(t)))
                            return !n && ((r.value = t), !0);
                    }
                    const i = p(e) && C(n) ? Number(n) < e.length : d(e, n),
                        s = Reflect.set(e, n, t, o);
                    return e === fn(o) && (i ? F(t, r) && xe(e, "set", n, t) : xe(e, "add", n, t)), s;
                }
                deleteProperty(e, n) {
                    const t = d(e, n),
                        o = (e[n], Reflect.deleteProperty(e, n));
                    return o && t && xe(e, "delete", n, void 0), o;
                }
                has(e, n) {
                    const t = Reflect.has(e, n);
                    return (v(n) && Ce.has(n)) || _e(e, 0, n), t;
                }
                ownKeys(e) {
                    return _e(e, 0, p(e) ? "length" : we), Reflect.ownKeys(e);
                }
            }
            class Te extends Le {
                constructor(e = !1) {
                    super(!0, e);
                }
                set(e, n) {
                    return !0;
                }
                deleteProperty(e, n) {
                    return !0;
                }
            }
            const Ae = new Me(),
                Pe = new Te(),
                Fe = new Me(!0),
                Ve = (e) => e,
                Re = (e) => Reflect.getPrototypeOf(e);
            function Ue(e, n, t = !1, o = !1) {
                const r = fn((e = e.__v_raw)),
                    i = fn(n);
                t || (F(n, i) && _e(r, 0, n), _e(r, 0, i));
                const { has: s } = Re(r),
                    l = o ? Ve : t ? gn : hn;
                return s.call(r, n) ? l(e.get(n)) : s.call(r, i) ? l(e.get(i)) : void (e !== r && e.get(n));
            }
            function je(e, n = !1) {
                const t = this.__v_raw,
                    o = fn(t),
                    r = fn(e);
                return n || (F(e, r) && _e(o, 0, e), _e(o, 0, r)), e === r ? t.has(e) : t.has(e) || t.has(r);
            }
            function ze(e, n = !1) {
                return (e = e.__v_raw), !n && _e(fn(e), 0, we), Reflect.get(e, "size", e);
            }
            function De(e) {
                e = fn(e);
                const n = fn(this);
                return Re(n).has.call(n, e) || (n.add(e), xe(n, "add", e, e)), this;
            }
            function Ie(e, n) {
                n = fn(n);
                const t = fn(this),
                    { has: o, get: r } = Re(t);
                let i = o.call(t, e);
                i || ((e = fn(e)), (i = o.call(t, e)));
                const s = r.call(t, e);
                return t.set(e, n), i ? F(n, s) && xe(t, "set", e, n) : xe(t, "add", e, n), this;
            }
            function Ne(e) {
                const n = fn(this),
                    { has: t, get: o } = Re(n);
                let r = t.call(n, e);
                r || ((e = fn(e)), (r = t.call(n, e)));
                o && o.call(n, e);
                const i = n.delete(e);
                return r && xe(n, "delete", e, void 0), i;
            }
            function $e() {
                const e = fn(this),
                    n = 0 !== e.size,
                    t = e.clear();
                return n && xe(e, "clear", void 0, void 0), t;
            }
            function Be(e, n) {
                return function (t, o) {
                    const r = this,
                        i = r.__v_raw,
                        s = fn(i),
                        l = n ? Ve : e ? gn : hn;
                    return !e && _e(s, 0, we), i.forEach((e, n) => t.call(o, l(e), l(n), r));
                };
            }
            function He(e, n, t) {
                return function (...o) {
                    const r = this.__v_raw,
                        i = fn(r),
                        s = f(i),
                        l = "entries" === e || (e === Symbol.iterator && s),
                        a = "keys" === e && s,
                        c = r[e](...o),
                        u = t ? Ve : n ? gn : hn;
                    return (
                        !n && _e(i, 0, a ? be : we),
                        {
                            next() {
                                const { value: e, done: n } = c.next();
                                return n ? { value: e, done: n } : { value: l ? [u(e[0]), u(e[1])] : u(e), done: n };
                            },
                            [Symbol.iterator]() {
                                return this;
                            },
                        }
                    );
                };
            }
            function We(e) {
                return function (...n) {
                    return "delete" !== e && ("clear" === e ? void 0 : this);
                };
            }
            function qe() {
                const e = {
                        get(e) {
                            return Ue(this, e);
                        },
                        get size() {
                            return ze(this);
                        },
                        has: je,
                        add: De,
                        set: Ie,
                        delete: Ne,
                        clear: $e,
                        forEach: Be(!1, !1),
                    },
                    n = {
                        get(e) {
                            return Ue(this, e, !1, !0);
                        },
                        get size() {
                            return ze(this);
                        },
                        has: je,
                        add: De,
                        set: Ie,
                        delete: Ne,
                        clear: $e,
                        forEach: Be(!1, !0),
                    },
                    t = {
                        get(e) {
                            return Ue(this, e, !0);
                        },
                        get size() {
                            return ze(this, !0);
                        },
                        has(e) {
                            return je.call(this, e, !0);
                        },
                        add: We("add"),
                        set: We("set"),
                        delete: We("delete"),
                        clear: We("clear"),
                        forEach: Be(!0, !1),
                    },
                    o = {
                        get(e) {
                            return Ue(this, e, !0, !0);
                        },
                        get size() {
                            return ze(this, !0);
                        },
                        has(e) {
                            return je.call(this, e, !0);
                        },
                        add: We("add"),
                        set: We("set"),
                        delete: We("delete"),
                        clear: We("clear"),
                        forEach: Be(!0, !0),
                    };
                return (
                    ["keys", "values", "entries", Symbol.iterator].forEach((r) => {
                        (e[r] = He(r, !1, !1)), (t[r] = He(r, !0, !1)), (n[r] = He(r, !1, !0)), (o[r] = He(r, !0, !0));
                    }),
                    [e, t, n, o]
                );
            }
            const [Ge, Ke, Ye, Je] = qe();
            function Xe(e, n) {
                const t = n ? (e ? Je : Ye) : e ? Ke : Ge;
                return (n, o, r) =>
                    "__v_isReactive" === o
                        ? !e
                        : "__v_isReadonly" === o
                        ? e
                        : "__v_raw" === o
                        ? n
                        : Reflect.get(d(t, o) && o in n ? t : n, o, r);
            }
            const Ze = { get: Xe(!1, !1) },
                Qe = { get: Xe(!1, !0) },
                en = { get: Xe(!0, !1) };
            const nn = new WeakMap(),
                tn = new WeakMap(),
                on = new WeakMap(),
                rn = new WeakMap();
            function sn(e) {
                return un(e) ? e : an(e, !1, Ae, Ze, nn);
            }
            function ln(e) {
                return an(e, !0, Pe, en, on);
            }
            function an(e, n, t, o, r) {
                if (!y(e)) return e;
                if (e.__v_raw && (!n || !e.__v_isReactive)) return e;
                const i = r.get(e);
                if (i) return i;
                const s =
                    (l = e).__v_skip || !Object.isExtensible(l)
                        ? 0
                        : (function (e) {
                              switch (e) {
                                  case "Object":
                                  case "Array":
                                      return 1;
                                  case "Map":
                                  case "Set":
                                  case "WeakMap":
                                  case "WeakSet":
                                      return 2;
                                  default:
                                      return 0;
                              }
                          })(x(l));
                var l;
                if (0 === s) return e;
                const a = new Proxy(e, 2 === s ? o : t);
                return r.set(e, a), a;
            }
            function cn(e) {
                return un(e) ? cn(e.__v_raw) : !(!e || !e.__v_isReactive);
            }
            function un(e) {
                return !(!e || !e.__v_isReadonly);
            }
            function dn(e) {
                return !(!e || !e.__v_isShallow);
            }
            function pn(e) {
                return !!e && !!e.__v_raw;
            }
            function fn(e) {
                const n = e && e.__v_raw;
                return n ? fn(n) : e;
            }
            const hn = (e) => (y(e) ? sn(e) : e),
                gn = (e) => (y(e) ? ln(e) : e);
            class mn {
                constructor(e, n, t, o) {
                    (this.getter = e),
                        (this._setter = n),
                        (this.dep = void 0),
                        (this.__v_isRef = !0),
                        (this.__v_isReadonly = !1),
                        (this.effect = new te(
                            () => e(this._value),
                            () => wn(this, 2 === this.effect._dirtyLevel ? 2 : 3)
                        )),
                        (this.effect.computed = this),
                        (this.effect.active = this._cacheable = !o),
                        (this.__v_isReadonly = t);
                }
                get value() {
                    const e = fn(this);
                    return (
                        (e._cacheable && !e.effect.dirty) || !F(e._value, (e._value = e.effect.run())) || wn(e, 4),
                        yn(e),
                        e.effect._dirtyLevel >= 2 && wn(e, 2),
                        e._value
                    );
                }
                set value(e) {
                    this._setter(e);
                }
                get _dirty() {
                    return this.effect.dirty;
                }
                set _dirty(e) {
                    this.effect.dirty = e;
                }
            }
            function vn(e, n, t = !1) {
                let o, i;
                const s = g(e);
                s ? ((o = e), (i = r)) : ((o = e.get), (i = e.set));
                return new mn(o, i, s || !i, t);
            }
            function yn(e) {
                var n;
                le &&
                    Q &&
                    ((e = fn(e)),
                    he(
                        Q,
                        null != (n = e.dep) ? n : (e.dep = ve(() => (e.dep = void 0), e instanceof mn ? e : void 0))
                    ));
            }
            function wn(e, n = 4, t) {
                const o = (e = fn(e)).dep;
                o && me(o, n);
            }
            function bn(e) {
                return !(!e || !0 !== e.__v_isRef);
            }
            function _n(e) {
                return xn(e, !1);
            }
            function xn(e, n) {
                return bn(e) ? e : new Sn(e, n);
            }
            class Sn {
                constructor(e, n) {
                    (this.__v_isShallow = n),
                        (this.dep = void 0),
                        (this.__v_isRef = !0),
                        (this._rawValue = n ? e : fn(e)),
                        (this._value = n ? e : hn(e));
                }
                get value() {
                    return yn(this), this._value;
                }
                set value(e) {
                    const n = this.__v_isShallow || dn(e) || un(e);
                    (e = n ? e : fn(e)),
                        F(e, this._rawValue) && ((this._rawValue = e), (this._value = n ? e : hn(e)), wn(this, 4));
                }
            }
            function Cn(e) {
                return bn(e) ? e.value : e;
            }
            const kn = {
                get: (e, n, t) => Cn(Reflect.get(e, n, t)),
                set: (e, n, t, o) => {
                    const r = e[n];
                    return bn(r) && !bn(t) ? ((r.value = t), !0) : Reflect.set(e, n, t, o);
                },
            };
            function En(e) {
                return cn(e) ? e : new Proxy(e, kn);
            }
            function On(e, n, t, o) {
                try {
                    return o ? e(...o) : e();
                } catch (e) {
                    Mn(e, n, t);
                }
            }
            function Ln(e, n, t, o) {
                if (g(e)) {
                    const r = On(e, n, t, o);
                    return (
                        r &&
                            w(r) &&
                            r.catch((e) => {
                                Mn(e, n, t);
                            }),
                        r
                    );
                }
                if (p(e)) {
                    const r = [];
                    for (let i = 0; i < e.length; i++) r.push(Ln(e[i], n, t, o));
                    return r;
                }
            }
            function Mn(e, n, t, o = !0) {
                n && n.vnode;
                if (n) {
                    let o = n.parent;
                    const r = n.proxy,
                        i = `https://vuejs.org/error-reference/#runtime-${t}`;
                    for (; o; ) {
                        const n = o.ec;
                        if (n) for (let t = 0; t < n.length; t++) if (!1 === n[t](e, r, i)) return;
                        o = o.parent;
                    }
                    const s = n.appContext.config.errorHandler;
                    if (s) return ue(), On(s, null, 10, [e, r, i]), void de();
                }
                !(function (e, n, t, o = !0) {
                    console.error(e);
                })(e, 0, 0, o);
            }
            let Tn = !1,
                An = !1;
            const Pn = [];
            let Fn = 0;
            const Vn = [];
            let Rn = null,
                Un = 0;
            const jn = Promise.resolve();
            let zn = null;
            function Dn(e) {
                const n = zn || jn;
                return e ? n.then(this ? e.bind(this) : e) : n;
            }
            function In(e) {
                (Pn.length && Pn.includes(e, Tn && e.allowRecurse ? Fn + 1 : Fn)) ||
                    (null == e.id
                        ? Pn.push(e)
                        : Pn.splice(
                              (function (e) {
                                  let n = Fn + 1,
                                      t = Pn.length;
                                  for (; n < t; ) {
                                      const o = (n + t) >>> 1,
                                          r = Pn[o],
                                          i = Wn(r);
                                      i < e || (i === e && r.pre) ? (n = o + 1) : (t = o);
                                  }
                                  return n;
                              })(e.id),
                              0,
                              e
                          ),
                    Nn());
            }
            function Nn() {
                Tn || An || ((An = !0), (zn = jn.then(Gn)));
            }
            function $n(e) {
                p(e) ? Vn.push(...e) : (Rn && Rn.includes(e, e.allowRecurse ? Un + 1 : Un)) || Vn.push(e), Nn();
            }
            function Bn(e, n, t = Tn ? Fn + 1 : 0) {
                for (0; t < Pn.length; t++) {
                    const n = Pn[t];
                    if (n && n.pre) {
                        if (e && n.id !== e.uid) continue;
                        0, Pn.splice(t, 1), t--, n();
                    }
                }
            }
            function Hn(e) {
                if (Vn.length) {
                    const e = [...new Set(Vn)].sort((e, n) => Wn(e) - Wn(n));
                    if (((Vn.length = 0), Rn)) return void Rn.push(...e);
                    for (Rn = e, Un = 0; Un < Rn.length; Un++) Rn[Un]();
                    (Rn = null), (Un = 0);
                }
            }
            const Wn = (e) => (null == e.id ? 1 / 0 : e.id),
                qn = (e, n) => {
                    const t = Wn(e) - Wn(n);
                    if (0 === t) {
                        if (e.pre && !n.pre) return -1;
                        if (n.pre && !e.pre) return 1;
                    }
                    return t;
                };
            function Gn(e) {
                (An = !1), (Tn = !0), Pn.sort(qn);
                try {
                    for (Fn = 0; Fn < Pn.length; Fn++) {
                        const e = Pn[Fn];
                        e && !1 !== e.active && On(e, null, 14);
                    }
                } finally {
                    (Fn = 0), (Pn.length = 0), Hn(), (Tn = !1), (zn = null), (Pn.length || Vn.length) && Gn(e);
                }
            }
            let Kn,
                Yn = [],
                Jn = !1;
            function Xn(e, ...n) {
                Kn ? Kn.emit(e, ...n) : Jn || Yn.push({ event: e, args: n });
            }
            function Zn(e, n) {
                var t, o;
                if (((Kn = e), Kn))
                    (Kn.enabled = !0), Yn.forEach(({ event: e, args: n }) => Kn.emit(e, ...n)), (Yn = []);
                else if (
                    "undefined" != typeof window &&
                    window.HTMLElement &&
                    !(null == (o = null == (t = window.navigator) ? void 0 : t.userAgent)
                        ? void 0
                        : o.includes("jsdom"))
                ) {
                    (n.__VUE_DEVTOOLS_HOOK_REPLAY__ = n.__VUE_DEVTOOLS_HOOK_REPLAY__ || []).push((e) => {
                        Zn(e, n);
                    }),
                        setTimeout(() => {
                            Kn || ((n.__VUE_DEVTOOLS_HOOK_REPLAY__ = null), (Jn = !0), (Yn = []));
                        }, 3e3);
                } else (Jn = !0), (Yn = []);
            }
            const Qn = ot("component:added"),
                et = ot("component:updated"),
                nt = ot("component:removed"),
                tt = (e) => {
                    Kn && "function" == typeof Kn.cleanupBuffer && !Kn.cleanupBuffer(e) && nt(e);
                };
            function ot(e) {
                return (n) => {
                    Xn(e, n.appContext.app, n.uid, n.parent ? n.parent.uid : void 0, n);
                };
            }
            function rt(e, t, ...o) {
                if (e.isUnmounted) return;
                const r = e.vnode.props || n;
                let i = o;
                const s = t.startsWith("update:"),
                    l = s && t.slice(7);
                if (l && l in r) {
                    const e = `${"modelValue" === l ? "model" : l}Modifiers`,
                        { number: t, trim: s } = r[e] || n;
                    s && (i = o.map((e) => (m(e) ? e.trim() : e))), t && (i = o.map(U));
                }
                let a;
                __VUE_PROD_DEVTOOLS__ &&
                    (function (e, n, t) {
                        Xn("component:emit", e.appContext.app, e, n, t);
                    })(e, t, i);
                let c = r[(a = P(t))] || r[(a = P(L(t)))];
                !c && s && (c = r[(a = P(T(t)))]), c && Ln(c, e, 6, i);
                const u = r[a + "Once"];
                if (u) {
                    if (e.emitted) {
                        if (e.emitted[a]) return;
                    } else e.emitted = {};
                    (e.emitted[a] = !0), Ln(u, e, 6, i);
                }
            }
            function it(e, n, t = !1) {
                const o = n.emitsCache,
                    r = o.get(e);
                if (void 0 !== r) return r;
                const i = e.emits;
                let s = {},
                    l = !1;
                if (__VUE_OPTIONS_API__ && !g(e)) {
                    const o = (e) => {
                        const t = it(e, n, !0);
                        t && ((l = !0), a(s, t));
                    };
                    !t && n.mixins.length && n.mixins.forEach(o),
                        e.extends && o(e.extends),
                        e.mixins && e.mixins.forEach(o);
                }
                return i || l
                    ? (p(i) ? i.forEach((e) => (s[e] = null)) : a(s, i), y(e) && o.set(e, s), s)
                    : (y(e) && o.set(e, null), null);
            }
            function st(e, n) {
                return (
                    !(!e || !s(n)) &&
                    ((n = n.slice(2).replace(/Once$/, "")),
                    d(e, n[0].toLowerCase() + n.slice(1)) || d(e, T(n)) || d(e, n))
                );
            }
            let lt = null,
                at = null;
            function ct(e) {
                const n = lt;
                return (lt = e), (at = (e && e.type.__scopeId) || null), n;
            }
            function ut(e, n = lt, t) {
                if (!n) return e;
                if (e._n) return e;
                const o = (...t) => {
                    o._d && br(-1);
                    const r = ct(n);
                    let i;
                    try {
                        i = e(...t);
                    } finally {
                        ct(r), o._d && br(1);
                    }
                    return __VUE_PROD_DEVTOOLS__ && et(n), i;
                };
                return (o._n = !0), (o._c = !0), (o._d = !0), o;
            }
            function dt(e) {
                const {
                        type: n,
                        vnode: t,
                        proxy: o,
                        withProxy: r,
                        propsOptions: [i],
                        slots: s,
                        attrs: a,
                        emit: c,
                        render: u,
                        renderCache: d,
                        props: p,
                        data: f,
                        setupState: h,
                        ctx: g,
                        inheritAttrs: m,
                    } = e,
                    v = ct(e);
                let y, w;
                try {
                    if (4 & t.shapeFlag) {
                        const e = r || o,
                            n = e;
                        (y = Vr(u.call(n, e, d, p, h, f, g))), (w = a);
                    } else {
                        const e = n;
                        0,
                            (y = Vr(e.length > 1 ? e(p, { attrs: a, slots: s, emit: c }) : e(p, null))),
                            (w = n.props ? a : pt(a));
                    }
                } catch (n) {
                    (gr.length = 0), Mn(n, e, 1), (y = Mr(fr));
                }
                let b = y;
                if (w && !1 !== m) {
                    const e = Object.keys(w),
                        { shapeFlag: n } = b;
                    e.length && 7 & n && (i && e.some(l) && (w = ft(w, i)), (b = Ar(b, w, !1, !0)));
                }
                return (
                    t.dirs && ((b = Ar(b, null, !1, !0)), (b.dirs = b.dirs ? b.dirs.concat(t.dirs) : t.dirs)),
                    t.transition && (b.transition = t.transition),
                    (y = b),
                    ct(v),
                    y
                );
            }
            const pt = (e) => {
                    let n;
                    for (const t in e) ("class" === t || "style" === t || s(t)) && ((n || (n = {}))[t] = e[t]);
                    return n;
                },
                ft = (e, n) => {
                    const t = {};
                    for (const o in e) (l(o) && o.slice(9) in n) || (t[o] = e[o]);
                    return t;
                };
            function ht(e, n, t) {
                const o = Object.keys(n);
                if (o.length !== Object.keys(e).length) return !0;
                for (let r = 0; r < o.length; r++) {
                    const i = o[r];
                    if (n[i] !== e[i] && !st(t, i)) return !0;
                }
                return !1;
            }
            function gt({ vnode: e, parent: n }, t) {
                for (; n; ) {
                    const o = n.subTree;
                    if ((o.suspense && o.suspense.activeBranch === e && (o.el = e.el), o !== e)) break;
                    ((e = n.vnode).el = t), (n = n.parent);
                }
            }
            const mt = "components";
            function vt(e, n) {
                return wt(mt, e, !0, n) || e;
            }
            const yt = Symbol.for("v-ndc");
            function wt(e, n, t = !0, o = !1) {
                const r = lt || Nr;
                if (r) {
                    const t = r.type;
                    if (e === mt) {
                        const e = oi(t, !1);
                        if (e && (e === n || e === L(n) || e === A(L(n)))) return t;
                    }
                    const i = bt(r[e] || t[e], n) || bt(r.appContext[e], n);
                    return !i && o ? t : i;
                }
            }
            function bt(e, n) {
                return e && (e[n] || e[L(n)] || e[A(L(n))]);
            }
            const _t = (e) => e.__isSuspense;
            function xt(e, n) {
                n && n.pendingBranch ? (p(e) ? n.effects.push(...e) : n.effects.push(e)) : $n(e);
            }
            const St = Symbol.for("v-scx"),
                Ct = () => {
                    {
                        const e = zo(St);
                        return e;
                    }
                };
            const kt = {};
            function Et(e, n, t) {
                return Ot(e, n, t);
            }
            function Ot(e, t, { immediate: o, deep: i, flush: s, once: l, onTrack: a, onTrigger: u } = n) {
                if (t && l) {
                    const e = t;
                    t = (...n) => {
                        e(...n), E();
                    };
                }
                const d = Nr,
                    f = (e) => (!0 === i ? e : Tt(e, !1 === i ? 1 : void 0));
                let h,
                    m,
                    v = !1,
                    y = !1;
                if (
                    (bn(e)
                        ? ((h = () => e.value), (v = dn(e)))
                        : cn(e)
                        ? ((h = () => f(e)), (v = !0))
                        : p(e)
                        ? ((y = !0),
                          (v = e.some((e) => cn(e) || dn(e))),
                          (h = () => e.map((e) => (bn(e) ? e.value : cn(e) ? f(e) : g(e) ? On(e, d, 2) : void 0))))
                        : (h = g(e) ? (t ? () => On(e, d, 2) : () => (m && m(), Ln(e, d, 3, [b]))) : r),
                    t && i)
                ) {
                    const e = h;
                    h = () => Tt(e());
                }
                let w,
                    b = (e) => {
                        m = C.onStop = () => {
                            On(e, d, 4), (m = C.onStop = void 0);
                        };
                    };
                if (Jr) {
                    if (((b = r), t ? o && Ln(t, d, 3, [h(), y ? [] : void 0, b]) : h(), "sync" !== s)) return r;
                    {
                        const e = Ct();
                        w = e.__watcherHandles || (e.__watcherHandles = []);
                    }
                }
                let _ = y ? new Array(e.length).fill(kt) : kt;
                const x = () => {
                    if (C.active && C.dirty)
                        if (t) {
                            const e = C.run();
                            (i || v || (y ? e.some((e, n) => F(e, _[n])) : F(e, _))) &&
                                (m && m(), Ln(t, d, 3, [e, _ === kt ? void 0 : y && _[0] === kt ? [] : _, b]), (_ = e));
                        } else C.run();
                };
                let S;
                (x.allowRecurse = !!t),
                    "sync" === s
                        ? (S = x)
                        : "post" === s
                        ? (S = () => rr(x, d && d.suspense))
                        : ((x.pre = !0), d && (x.id = d.uid), (S = () => In(x)));
                const C = new te(h, r, S),
                    k = Z,
                    E = () => {
                        C.stop(), k && c(k.effects, C);
                    };
                return (
                    t ? (o ? x() : (_ = C.run())) : "post" === s ? rr(C.run.bind(C), d && d.suspense) : C.run(),
                    w && w.push(E),
                    E
                );
            }
            function Lt(e, n, t) {
                const o = this.proxy,
                    r = m(e) ? (e.includes(".") ? Mt(o, e) : () => o[e]) : e.bind(o, o);
                let i;
                g(n) ? (i = n) : ((i = n.handler), (t = n));
                const s = Wr(this),
                    l = Ot(r, i.bind(o), t);
                return s(), l;
            }
            function Mt(e, n) {
                const t = n.split(".");
                return () => {
                    let n = e;
                    for (let e = 0; e < t.length && n; e++) n = n[t[e]];
                    return n;
                };
            }
            function Tt(e, n = 1 / 0, t) {
                if (n <= 0 || !y(e) || e.__v_skip) return e;
                if ((t = t || new Set()).has(e)) return e;
                if ((t.add(e), n--, bn(e))) Tt(e.value, n, t);
                else if (p(e)) for (let o = 0; o < e.length; o++) Tt(e[o], n, t);
                else if (h(e) || f(e))
                    e.forEach((e) => {
                        Tt(e, n, t);
                    });
                else if (S(e)) for (const o in e) Tt(e[o], n, t);
                return e;
            }
            function At(e, t) {
                if (null === lt) return e;
                const o = ti(lt) || lt.proxy,
                    r = e.dirs || (e.dirs = []);
                for (let e = 0; e < t.length; e++) {
                    let [i, s, l, a = n] = t[e];
                    i &&
                        (g(i) && (i = { mounted: i, updated: i }),
                        i.deep && Tt(s),
                        r.push({
                            dir: i,
                            instance: o,
                            value: s,
                            oldValue: void 0,
                            arg: l,
                            modifiers: a,
                        }));
                }
                return e;
            }
            function Pt(e, n, t, o) {
                const r = e.dirs,
                    i = n && n.dirs;
                for (let s = 0; s < r.length; s++) {
                    const l = r[s];
                    i && (l.oldValue = i[s].value);
                    let a = l.dir[o];
                    a && (ue(), Ln(a, t, 8, [e.el, l, e, n]), de());
                }
            }
            const Ft = Symbol("_leaveCb"),
                Vt = Symbol("_enterCb");
            function Rt() {
                const e = {
                    isMounted: !1,
                    isLeaving: !1,
                    isUnmounting: !1,
                    leavingVNodes: new Map(),
                };
                return (
                    ro(() => {
                        e.isMounted = !0;
                    }),
                    lo(() => {
                        e.isUnmounting = !0;
                    }),
                    e
                );
            }
            const Ut = [Function, Array],
                jt = {
                    mode: String,
                    appear: Boolean,
                    persisted: Boolean,
                    onBeforeEnter: Ut,
                    onEnter: Ut,
                    onAfterEnter: Ut,
                    onEnterCancelled: Ut,
                    onBeforeLeave: Ut,
                    onLeave: Ut,
                    onAfterLeave: Ut,
                    onLeaveCancelled: Ut,
                    onBeforeAppear: Ut,
                    onAppear: Ut,
                    onAfterAppear: Ut,
                    onAppearCancelled: Ut,
                },
                zt = {
                    name: "BaseTransition",
                    props: jt,
                    setup(e, { slots: n }) {
                        const t = $r(),
                            o = Rt();
                        return () => {
                            const r = n.default && Ht(n.default(), !0);
                            if (!r || !r.length) return;
                            let i = r[0];
                            if (r.length > 1) {
                                let e = !1;
                                for (const n of r)
                                    if (n.type !== fr) {
                                        0, (i = n), (e = !0);
                                        break;
                                    }
                            }
                            const s = fn(e),
                                { mode: l } = s;
                            if (o.isLeaving) return Nt(i);
                            const a = $t(i);
                            if (!a) return Nt(i);
                            const c = It(a, s, o, t);
                            Bt(a, c);
                            const u = t.subTree,
                                d = u && $t(u);
                            if (d && d.type !== fr && !kr(a, d)) {
                                const e = It(d, s, o, t);
                                if ((Bt(d, e), "out-in" === l && a.type !== fr))
                                    return (
                                        (o.isLeaving = !0),
                                        (e.afterLeave = () => {
                                            (o.isLeaving = !1),
                                                !1 !== t.update.active && ((t.effect.dirty = !0), t.update());
                                        }),
                                        Nt(i)
                                    );
                                "in-out" === l &&
                                    a.type !== fr &&
                                    (e.delayLeave = (e, n, t) => {
                                        (Dt(o, d)[String(d.key)] = d),
                                            (e[Ft] = () => {
                                                n(), (e[Ft] = void 0), delete c.delayedLeave;
                                            }),
                                            (c.delayedLeave = t);
                                    });
                            }
                            return i;
                        };
                    },
                };
            function Dt(e, n) {
                const { leavingVNodes: t } = e;
                let o = t.get(n.type);
                return o || ((o = Object.create(null)), t.set(n.type, o)), o;
            }
            function It(e, n, t, o) {
                const {
                        appear: r,
                        mode: i,
                        persisted: s = !1,
                        onBeforeEnter: l,
                        onEnter: a,
                        onAfterEnter: c,
                        onEnterCancelled: u,
                        onBeforeLeave: d,
                        onLeave: f,
                        onAfterLeave: h,
                        onLeaveCancelled: g,
                        onBeforeAppear: m,
                        onAppear: v,
                        onAfterAppear: y,
                        onAppearCancelled: w,
                    } = n,
                    b = String(e.key),
                    _ = Dt(t, e),
                    x = (e, n) => {
                        e && Ln(e, o, 9, n);
                    },
                    S = (e, n) => {
                        const t = n[1];
                        x(e, n), p(e) ? e.every((e) => e.length <= 1) && t() : e.length <= 1 && t();
                    },
                    C = {
                        mode: i,
                        persisted: s,
                        beforeEnter(n) {
                            let o = l;
                            if (!t.isMounted) {
                                if (!r) return;
                                o = m || l;
                            }
                            n[Ft] && n[Ft](!0);
                            const i = _[b];
                            i && kr(e, i) && i.el[Ft] && i.el[Ft](), x(o, [n]);
                        },
                        enter(e) {
                            let n = a,
                                o = c,
                                i = u;
                            if (!t.isMounted) {
                                if (!r) return;
                                (n = v || a), (o = y || c), (i = w || u);
                            }
                            let s = !1;
                            const l = (e[Vt] = (n) => {
                                s ||
                                    ((s = !0), x(n ? i : o, [e]), C.delayedLeave && C.delayedLeave(), (e[Vt] = void 0));
                            });
                            n ? S(n, [e, l]) : l();
                        },
                        leave(n, o) {
                            const r = String(e.key);
                            if ((n[Vt] && n[Vt](!0), t.isUnmounting)) return o();
                            x(d, [n]);
                            let i = !1;
                            const s = (n[Ft] = (t) => {
                                i || ((i = !0), o(), x(t ? g : h, [n]), (n[Ft] = void 0), _[r] === e && delete _[r]);
                            });
                            (_[r] = e), f ? S(f, [n, s]) : s();
                        },
                        clone: (e) => It(e, n, t, o),
                    };
                return C;
            }
            function Nt(e) {
                if (Gt(e)) return ((e = Ar(e)).children = null), e;
            }
            function $t(e) {
                if (!Gt(e)) return e;
                const { shapeFlag: n, children: t } = e;
                if (t) {
                    if (16 & n) return t[0];
                    if (32 & n && g(t.default)) return t.default();
                }
            }
            function Bt(e, n) {
                6 & e.shapeFlag && e.component
                    ? Bt(e.component.subTree, n)
                    : 128 & e.shapeFlag
                    ? ((e.ssContent.transition = n.clone(e.ssContent)),
                      (e.ssFallback.transition = n.clone(e.ssFallback)))
                    : (e.transition = n);
            }
            function Ht(e, n = !1, t) {
                let o = [],
                    r = 0;
                for (let i = 0; i < e.length; i++) {
                    let s = e[i];
                    const l = null == t ? s.key : String(t) + String(null != s.key ? s.key : i);
                    s.type === dr
                        ? (128 & s.patchFlag && r++, (o = o.concat(Ht(s.children, n, l))))
                        : (n || s.type !== fr) && o.push(null != l ? Ar(s, { key: l }) : s);
                }
                if (r > 1) for (let e = 0; e < o.length; e++) o[e].patchFlag = -2;
                return o;
            }
            function Wt(e, n) {
                return g(e) ? (() => a({ name: e.name }, n, { setup: e }))() : e;
            }
            const qt = (e) => !!e.type.__asyncLoader;
            const Gt = (e) => e.type.__isKeepAlive;
            RegExp, RegExp;
            function Kt(e, n) {
                return p(e)
                    ? e.some((e) => Kt(e, n))
                    : m(e)
                    ? e.split(",").includes(n)
                    : "[object RegExp]" === _(e) && e.test(n);
            }
            function Yt(e, n) {
                Xt(e, "a", n);
            }
            function Jt(e, n) {
                Xt(e, "da", n);
            }
            function Xt(e, n, t = Nr) {
                const o =
                    e.__wdc ||
                    (e.__wdc = () => {
                        let n = t;
                        for (; n; ) {
                            if (n.isDeactivated) return;
                            n = n.parent;
                        }
                        return e();
                    });
                if ((no(n, o, t), t)) {
                    let e = t.parent;
                    for (; e && e.parent; ) Gt(e.parent.vnode) && Zt(o, n, t, e), (e = e.parent);
                }
            }
            function Zt(e, n, t, o) {
                const r = no(n, e, o, !0);
                ao(() => {
                    c(o[n], r);
                }, t);
            }
            function Qt(e) {
                (e.shapeFlag &= -257), (e.shapeFlag &= -513);
            }
            function eo(e) {
                return 128 & e.shapeFlag ? e.ssContent : e;
            }
            function no(e, n, t = Nr, o = !1) {
                if (t) {
                    const r = t[e] || (t[e] = []),
                        i =
                            n.__weh ||
                            (n.__weh = (...o) => {
                                if (t.isUnmounted) return;
                                ue();
                                const r = Wr(t),
                                    i = Ln(n, t, e, o);
                                return r(), de(), i;
                            });
                    return o ? r.unshift(i) : r.push(i), i;
                }
            }
            const to =
                    (e) =>
                    (n, t = Nr) =>
                        (!Jr || "sp" === e) && no(e, (...e) => n(...e), t),
                oo = to("bm"),
                ro = to("m"),
                io = to("bu"),
                so = to("u"),
                lo = to("bum"),
                ao = to("um"),
                co = to("sp"),
                uo = to("rtg"),
                po = to("rtc");
            function fo(e, n = Nr) {
                no("ec", e, n);
            }
            function ho(e, n, t, o) {
                let r;
                const i = t && t[o];
                if (p(e) || m(e)) {
                    r = new Array(e.length);
                    for (let t = 0, o = e.length; t < o; t++) r[t] = n(e[t], t, void 0, i && i[t]);
                } else if ("number" == typeof e) {
                    0, (r = new Array(e));
                    for (let t = 0; t < e; t++) r[t] = n(t + 1, t, void 0, i && i[t]);
                } else if (y(e))
                    if (e[Symbol.iterator]) r = Array.from(e, (e, t) => n(e, t, void 0, i && i[t]));
                    else {
                        const t = Object.keys(e);
                        r = new Array(t.length);
                        for (let o = 0, s = t.length; o < s; o++) {
                            const s = t[o];
                            r[o] = n(e[s], s, o, i && i[o]);
                        }
                    }
                else r = [];
                return t && (t[o] = r), r;
            }
            function go(e, n, t = {}, o, r) {
                if (lt.isCE || (lt.parent && qt(lt.parent) && lt.parent.isCE))
                    return "default" !== n && (t.name = n), Mr("slot", t, o && o());
                let i = e[n];
                i && i._c && (i._d = !1), vr();
                const s = i && mo(i(t)),
                    l = Sr(
                        dr,
                        { key: t.key || (s && s.key) || `_${n}` },
                        s || (o ? o() : []),
                        s && 1 === e._ ? 64 : -2
                    );
                return !r && l.scopeId && (l.slotScopeIds = [l.scopeId + "-s"]), i && i._c && (i._d = !0), l;
            }
            function mo(e) {
                return e.some((e) => !Cr(e) || (e.type !== fr && !(e.type === dr && !mo(e.children)))) ? e : null;
            }
            const vo = (e) => (e ? (Gr(e) ? ti(e) || e.proxy : vo(e.parent)) : null),
                yo = a(Object.create(null), {
                    $: (e) => e,
                    $el: (e) => e.vnode.el,
                    $data: (e) => e.data,
                    $props: (e) => e.props,
                    $attrs: (e) => e.attrs,
                    $slots: (e) => e.slots,
                    $refs: (e) => e.refs,
                    $parent: (e) => vo(e.parent),
                    $root: (e) => vo(e.root),
                    $emit: (e) => e.emit,
                    $options: (e) => (__VUE_OPTIONS_API__ ? Eo(e) : e.type),
                    $forceUpdate: (e) =>
                        e.f ||
                        (e.f = () => {
                            (e.effect.dirty = !0), In(e.update);
                        }),
                    $nextTick: (e) => e.n || (e.n = Dn.bind(e.proxy)),
                    $watch: (e) => (__VUE_OPTIONS_API__ ? Lt.bind(e) : r),
                }),
                wo = (e, t) => e !== n && !e.__isScriptSetup && d(e, t),
                bo = {
                    get({ _: e }, t) {
                        if ("__v_skip" === t) return !0;
                        const { ctx: o, setupState: r, data: i, props: s, accessCache: l, type: a, appContext: c } = e;
                        let u;
                        if ("$" !== t[0]) {
                            const a = l[t];
                            if (void 0 !== a)
                                switch (a) {
                                    case 1:
                                        return r[t];
                                    case 2:
                                        return i[t];
                                    case 4:
                                        return o[t];
                                    case 3:
                                        return s[t];
                                }
                            else {
                                if (wo(r, t)) return (l[t] = 1), r[t];
                                if (i !== n && d(i, t)) return (l[t] = 2), i[t];
                                if ((u = e.propsOptions[0]) && d(u, t)) return (l[t] = 3), s[t];
                                if (o !== n && d(o, t)) return (l[t] = 4), o[t];
                                (__VUE_OPTIONS_API__ && !xo) || (l[t] = 0);
                            }
                        }
                        const p = yo[t];
                        let f, h;
                        return p
                            ? ("$attrs" === t && _e(e.attrs, 0, ""), p(e))
                            : (f = a.__cssModules) && (f = f[t])
                            ? f
                            : o !== n && d(o, t)
                            ? ((l[t] = 4), o[t])
                            : ((h = c.config.globalProperties), d(h, t) ? h[t] : void 0);
                    },
                    set({ _: e }, t, o) {
                        const { data: r, setupState: i, ctx: s } = e;
                        return wo(i, t)
                            ? ((i[t] = o), !0)
                            : r !== n && d(r, t)
                            ? ((r[t] = o), !0)
                            : !d(e.props, t) && ("$" !== t[0] || !(t.slice(1) in e)) && ((s[t] = o), !0);
                    },
                    has({ _: { data: e, setupState: t, accessCache: o, ctx: r, appContext: i, propsOptions: s } }, l) {
                        let a;
                        return (
                            !!o[l] ||
                            (e !== n && d(e, l)) ||
                            wo(t, l) ||
                            ((a = s[0]) && d(a, l)) ||
                            d(r, l) ||
                            d(yo, l) ||
                            d(i.config.globalProperties, l)
                        );
                    },
                    defineProperty(e, n, t) {
                        return (
                            null != t.get ? (e._.accessCache[n] = 0) : d(t, "value") && this.set(e, n, t.value, null),
                            Reflect.defineProperty(e, n, t)
                        );
                    },
                };
            function _o(e) {
                return p(e) ? e.reduce((e, n) => ((e[n] = null), e), {}) : e;
            }
            let xo = !0;
            function So(e) {
                const n = Eo(e),
                    t = e.proxy,
                    o = e.ctx;
                (xo = !1), n.beforeCreate && Co(n.beforeCreate, e, "bc");
                const {
                    data: i,
                    computed: s,
                    methods: l,
                    watch: a,
                    provide: c,
                    inject: u,
                    created: d,
                    beforeMount: f,
                    mounted: h,
                    beforeUpdate: m,
                    updated: v,
                    activated: w,
                    deactivated: b,
                    beforeDestroy: _,
                    beforeUnmount: x,
                    destroyed: S,
                    unmounted: C,
                    render: k,
                    renderTracked: E,
                    renderTriggered: O,
                    errorCaptured: L,
                    serverPrefetch: M,
                    expose: T,
                    inheritAttrs: A,
                    components: P,
                    directives: F,
                    filters: V,
                } = n;
                if (
                    (u &&
                        (function (e, n, t = r) {
                            p(e) && (e = To(e));
                            for (const t in e) {
                                const o = e[t];
                                let r;
                                (r = y(o)
                                    ? "default" in o
                                        ? zo(o.from || t, o.default, !0)
                                        : zo(o.from || t)
                                    : zo(o)),
                                    bn(r)
                                        ? Object.defineProperty(n, t, {
                                              enumerable: !0,
                                              configurable: !0,
                                              get: () => r.value,
                                              set: (e) => (r.value = e),
                                          })
                                        : (n[t] = r);
                            }
                        })(u, o, null),
                    l)
                )
                    for (const e in l) {
                        const n = l[e];
                        g(n) && (o[e] = n.bind(t));
                    }
                if (i) {
                    0;
                    const n = i.call(t, t);
                    0, y(n) && (e.data = sn(n));
                }
                if (((xo = !0), s))
                    for (const e in s) {
                        const n = s[e],
                            i = g(n) ? n.bind(t, t) : g(n.get) ? n.get.bind(t, t) : r;
                        0;
                        const l = !g(n) && g(n.set) ? n.set.bind(t) : r,
                            a = ii({ get: i, set: l });
                        Object.defineProperty(o, e, {
                            enumerable: !0,
                            configurable: !0,
                            get: () => a.value,
                            set: (e) => (a.value = e),
                        });
                    }
                if (a) for (const e in a) ko(a[e], o, t, e);
                if (c) {
                    const e = g(c) ? c.call(t) : c;
                    Reflect.ownKeys(e).forEach((n) => {
                        !(function (e, n) {
                            if (Nr) {
                                let t = Nr.provides;
                                const o = Nr.parent && Nr.parent.provides;
                                o === t && (t = Nr.provides = Object.create(o)), (t[e] = n);
                            } else 0;
                        })(n, e[n]);
                    });
                }
                function R(e, n) {
                    p(n) ? n.forEach((n) => e(n.bind(t))) : n && e(n.bind(t));
                }
                if (
                    (d && Co(d, e, "c"),
                    R(oo, f),
                    R(ro, h),
                    R(io, m),
                    R(so, v),
                    R(Yt, w),
                    R(Jt, b),
                    R(fo, L),
                    R(po, E),
                    R(uo, O),
                    R(lo, x),
                    R(ao, C),
                    R(co, M),
                    p(T))
                )
                    if (T.length) {
                        const n = e.exposed || (e.exposed = {});
                        T.forEach((e) => {
                            Object.defineProperty(n, e, {
                                get: () => t[e],
                                set: (n) => (t[e] = n),
                            });
                        });
                    } else e.exposed || (e.exposed = {});
                k && e.render === r && (e.render = k),
                    null != A && (e.inheritAttrs = A),
                    P && (e.components = P),
                    F && (e.directives = F);
            }
            function Co(e, n, t) {
                Ln(p(e) ? e.map((e) => e.bind(n.proxy)) : e.bind(n.proxy), n, t);
            }
            function ko(e, n, t, o) {
                const r = o.includes(".") ? Mt(t, o) : () => t[o];
                if (m(e)) {
                    const t = n[e];
                    g(t) && Et(r, t);
                } else if (g(e)) Et(r, e.bind(t));
                else if (y(e))
                    if (p(e)) e.forEach((e) => ko(e, n, t, o));
                    else {
                        const o = g(e.handler) ? e.handler.bind(t) : n[e.handler];
                        g(o) && Et(r, o, e);
                    }
                else 0;
            }
            function Eo(e) {
                const n = e.type,
                    { mixins: t, extends: o } = n,
                    {
                        mixins: r,
                        optionsCache: i,
                        config: { optionMergeStrategies: s },
                    } = e.appContext,
                    l = i.get(n);
                let a;
                return (
                    l
                        ? (a = l)
                        : r.length || t || o
                        ? ((a = {}), r.length && r.forEach((e) => Oo(a, e, s, !0)), Oo(a, n, s))
                        : (a = n),
                    y(n) && i.set(n, a),
                    a
                );
            }
            function Oo(e, n, t, o = !1) {
                const { mixins: r, extends: i } = n;
                i && Oo(e, i, t, !0), r && r.forEach((n) => Oo(e, n, t, !0));
                for (const r in n)
                    if (o && "expose" === r);
                    else {
                        const o = Lo[r] || (t && t[r]);
                        e[r] = o ? o(e[r], n[r]) : n[r];
                    }
                return e;
            }
            const Lo = {
                data: Mo,
                props: Fo,
                emits: Fo,
                methods: Po,
                computed: Po,
                beforeCreate: Ao,
                created: Ao,
                beforeMount: Ao,
                mounted: Ao,
                beforeUpdate: Ao,
                updated: Ao,
                beforeDestroy: Ao,
                beforeUnmount: Ao,
                destroyed: Ao,
                unmounted: Ao,
                activated: Ao,
                deactivated: Ao,
                errorCaptured: Ao,
                serverPrefetch: Ao,
                components: Po,
                directives: Po,
                watch: function (e, n) {
                    if (!e) return n;
                    if (!n) return e;
                    const t = a(Object.create(null), e);
                    for (const o in n) t[o] = Ao(e[o], n[o]);
                    return t;
                },
                provide: Mo,
                inject: function (e, n) {
                    return Po(To(e), To(n));
                },
            };
            function Mo(e, n) {
                return n
                    ? e
                        ? function () {
                              return a(g(e) ? e.call(this, this) : e, g(n) ? n.call(this, this) : n);
                          }
                        : n
                    : e;
            }
            function To(e) {
                if (p(e)) {
                    const n = {};
                    for (let t = 0; t < e.length; t++) n[e[t]] = e[t];
                    return n;
                }
                return e;
            }
            function Ao(e, n) {
                return e ? [...new Set([].concat(e, n))] : n;
            }
            function Po(e, n) {
                return e ? a(Object.create(null), e, n) : n;
            }
            function Fo(e, n) {
                return e
                    ? p(e) && p(n)
                        ? [...new Set([...e, ...n])]
                        : a(Object.create(null), _o(e), _o(null != n ? n : {}))
                    : n;
            }
            function Vo() {
                return {
                    app: null,
                    config: {
                        isNativeTag: i,
                        performance: !1,
                        globalProperties: {},
                        optionMergeStrategies: {},
                        errorHandler: void 0,
                        warnHandler: void 0,
                        compilerOptions: {},
                    },
                    mixins: [],
                    components: {},
                    directives: {},
                    provides: Object.create(null),
                    optionsCache: new WeakMap(),
                    propsCache: new WeakMap(),
                    emitsCache: new WeakMap(),
                };
            }
            let Ro = 0;
            function Uo(e, n) {
                return function (t, o = null) {
                    g(t) || (t = a({}, t)), null == o || y(o) || (o = null);
                    const r = Vo(),
                        i = new WeakSet();
                    let s = !1;
                    const l = (r.app = {
                        _uid: Ro++,
                        _component: t,
                        _props: o,
                        _container: null,
                        _context: r,
                        _instance: null,
                        version: si,
                        get config() {
                            return r.config;
                        },
                        set config(e) {
                            0;
                        },
                        use: (e, ...n) => (
                            i.has(e) ||
                                (e && g(e.install) ? (i.add(e), e.install(l, ...n)) : g(e) && (i.add(e), e(l, ...n))),
                            l
                        ),
                        mixin: (e) => (__VUE_OPTIONS_API__ && (r.mixins.includes(e) || r.mixins.push(e)), l),
                        component: (e, n) => (n ? ((r.components[e] = n), l) : r.components[e]),
                        directive: (e, n) => (n ? ((r.directives[e] = n), l) : r.directives[e]),
                        mount(i, a, c) {
                            if (!s) {
                                0;
                                const u = Mr(t, o);
                                return (
                                    (u.appContext = r),
                                    !0 === c ? (c = "svg") : !1 === c && (c = void 0),
                                    a && n ? n(u, i) : e(u, i, c),
                                    (s = !0),
                                    (l._container = i),
                                    (i.__vue_app__ = l),
                                    __VUE_PROD_DEVTOOLS__ &&
                                        ((l._instance = u.component),
                                        (function (e, n) {
                                            Xn("app:init", e, n, {
                                                Fragment: dr,
                                                Text: pr,
                                                Comment: fr,
                                                Static: hr,
                                            });
                                        })(l, si)),
                                    ti(u.component) || u.component.proxy
                                );
                            }
                        },
                        unmount() {
                            s &&
                                (e(null, l._container),
                                __VUE_PROD_DEVTOOLS__ &&
                                    ((l._instance = null),
                                    (function (e) {
                                        Xn("app:unmount", e);
                                    })(l)),
                                delete l._container.__vue_app__);
                        },
                        provide: (e, n) => ((r.provides[e] = n), l),
                        runWithContext(e) {
                            const n = jo;
                            jo = l;
                            try {
                                return e();
                            } finally {
                                jo = n;
                            }
                        },
                    });
                    return l;
                };
            }
            let jo = null;
            function zo(e, n, t = !1) {
                const o = Nr || lt;
                if (o || jo) {
                    const r = o
                        ? null == o.parent
                            ? o.vnode.appContext && o.vnode.appContext.provides
                            : o.parent.provides
                        : jo._context.provides;
                    if (r && e in r) return r[e];
                    if (arguments.length > 1) return t && g(n) ? n.call(o && o.proxy) : n;
                } else 0;
            }
            const Do = {},
                Io = () => Object.create(Do),
                No = (e) => Object.getPrototypeOf(e) === Do;
            function $o(e, n, t, o = !1) {
                const r = {},
                    i = Io();
                (e.propsDefaults = Object.create(null)), Bo(e, n, r, i);
                for (const n in e.propsOptions[0]) n in r || (r[n] = void 0);
                t ? (e.props = o ? r : an(r, !1, Fe, Qe, tn)) : e.type.props ? (e.props = r) : (e.props = i),
                    (e.attrs = i);
            }
            function Bo(e, t, o, r) {
                const [i, s] = e.propsOptions;
                let l,
                    a = !1;
                if (t)
                    for (let n in t) {
                        if (k(n)) continue;
                        const c = t[n];
                        let u;
                        i && d(i, (u = L(n)))
                            ? s && s.includes(u)
                                ? ((l || (l = {}))[u] = c)
                                : (o[u] = c)
                            : st(e.emitsOptions, n) || (n in r && c === r[n]) || ((r[n] = c), (a = !0));
                    }
                if (s) {
                    const t = fn(o),
                        r = l || n;
                    for (let n = 0; n < s.length; n++) {
                        const l = s[n];
                        o[l] = Ho(i, t, l, r[l], e, !d(r, l));
                    }
                }
                return a;
            }
            function Ho(e, n, t, o, r, i) {
                const s = e[t];
                if (null != s) {
                    const e = d(s, "default");
                    if (e && void 0 === o) {
                        const e = s.default;
                        if (s.type !== Function && !s.skipFactory && g(e)) {
                            const { propsDefaults: i } = r;
                            if (t in i) o = i[t];
                            else {
                                const s = Wr(r);
                                (o = i[t] = e.call(null, n)), s();
                            }
                        } else o = e;
                    }
                    s[0] && (i && !e ? (o = !1) : !s[1] || ("" !== o && o !== T(t)) || (o = !0));
                }
                return o;
            }
            function Wo(e, t, r = !1) {
                const i = t.propsCache,
                    s = i.get(e);
                if (s) return s;
                const l = e.props,
                    c = {},
                    u = [];
                let f = !1;
                if (__VUE_OPTIONS_API__ && !g(e)) {
                    const n = (e) => {
                        f = !0;
                        const [n, o] = Wo(e, t, !0);
                        a(c, n), o && u.push(...o);
                    };
                    !r && t.mixins.length && t.mixins.forEach(n),
                        e.extends && n(e.extends),
                        e.mixins && e.mixins.forEach(n);
                }
                if (!l && !f) return y(e) && i.set(e, o), o;
                if (p(l))
                    for (let e = 0; e < l.length; e++) {
                        0;
                        const t = L(l[e]);
                        qo(t) && (c[t] = n);
                    }
                else if (l) {
                    0;
                    for (const e in l) {
                        const n = L(e);
                        if (qo(n)) {
                            const t = l[e],
                                o = (c[n] = p(t) || g(t) ? { type: t } : a({}, t));
                            if (o) {
                                const e = Yo(Boolean, o.type),
                                    t = Yo(String, o.type);
                                (o[0] = e > -1), (o[1] = t < 0 || e < t), (e > -1 || d(o, "default")) && u.push(n);
                            }
                        }
                    }
                }
                const h = [c, u];
                return y(e) && i.set(e, h), h;
            }
            function qo(e) {
                return "$" !== e[0] && !k(e);
            }
            function Go(e) {
                if (null === e) return "null";
                if ("function" == typeof e) return e.name || "";
                if ("object" == typeof e) {
                    return (e.constructor && e.constructor.name) || "";
                }
                return "";
            }
            function Ko(e, n) {
                return Go(e) === Go(n);
            }
            function Yo(e, n) {
                return p(n) ? n.findIndex((n) => Ko(n, e)) : g(n) && Ko(n, e) ? 0 : -1;
            }
            const Jo = (e) => "_" === e[0] || "$stable" === e,
                Xo = (e) => (p(e) ? e.map(Vr) : [Vr(e)]),
                Zo = (e, n, t) => {
                    if (n._n) return n;
                    const o = ut((...e) => Xo(n(...e)), t);
                    return (o._c = !1), o;
                },
                Qo = (e, n, t) => {
                    const o = e._ctx;
                    for (const t in e) {
                        if (Jo(t)) continue;
                        const r = e[t];
                        if (g(r)) n[t] = Zo(0, r, o);
                        else if (null != r) {
                            0;
                            const e = Xo(r);
                            n[t] = () => e;
                        }
                    }
                },
                er = (e, n) => {
                    const t = Xo(n);
                    e.slots.default = () => t;
                },
                nr = (e, n) => {
                    const t = (e.slots = Io());
                    if (32 & e.vnode.shapeFlag) {
                        const e = n._;
                        e ? (a(t, n), R(t, "_", e, !0)) : Qo(n, t);
                    } else n && er(e, n);
                },
                tr = (e, t, o) => {
                    const { vnode: r, slots: i } = e;
                    let s = !0,
                        l = n;
                    if (32 & r.shapeFlag) {
                        const e = t._;
                        e
                            ? o && 1 === e
                                ? (s = !1)
                                : (a(i, t), o || 1 !== e || delete i._)
                            : ((s = !t.$stable), Qo(t, i)),
                            (l = t);
                    } else t && (er(e, t), (l = { default: 1 }));
                    if (s) for (const e in i) Jo(e) || null != l[e] || delete i[e];
                };
            function or(e, t, o, r, i = !1) {
                if (p(e)) return void e.forEach((e, n) => or(e, t && (p(t) ? t[n] : t), o, r, i));
                if (qt(r) && !i) return;
                const s = 4 & r.shapeFlag ? ti(r.component) || r.component.proxy : r.el,
                    l = i ? null : s,
                    { i: a, r: u } = e;
                const f = t && t.r,
                    h = a.refs === n ? (a.refs = {}) : a.refs,
                    v = a.setupState;
                if (
                    (null != f &&
                        f !== u &&
                        (m(f) ? ((h[f] = null), d(v, f) && (v[f] = null)) : bn(f) && (f.value = null)),
                    g(u))
                )
                    On(u, a, 12, [l, h]);
                else {
                    const n = m(u),
                        t = bn(u);
                    if (n || t) {
                        const r = () => {
                            if (e.f) {
                                const t = n ? (d(v, u) ? v[u] : h[u]) : u.value;
                                i
                                    ? p(t) && c(t, s)
                                    : p(t)
                                    ? t.includes(s) || t.push(s)
                                    : n
                                    ? ((h[u] = [s]), d(v, u) && (v[u] = h[u]))
                                    : ((u.value = [s]), e.k && (h[e.k] = u.value));
                            } else n ? ((h[u] = l), d(v, u) && (v[u] = l)) : t && ((u.value = l), e.k && (h[e.k] = l));
                        };
                        l ? ((r.id = -1), rr(r, o)) : r();
                    } else 0;
                }
            }
            const rr = xt;
            function ir(e, t) {
                "boolean" != typeof __VUE_OPTIONS_API__ && (D().__VUE_OPTIONS_API__ = !0),
                    "boolean" != typeof __VUE_PROD_DEVTOOLS__ && (D().__VUE_PROD_DEVTOOLS__ = !1),
                    "boolean" != typeof __VUE_PROD_HYDRATION_MISMATCH_DETAILS__ &&
                        (D().__VUE_PROD_HYDRATION_MISMATCH_DETAILS__ = !1);
                const i = D();
                (i.__VUE__ = !0), __VUE_PROD_DEVTOOLS__ && Zn(i.__VUE_DEVTOOLS_GLOBAL_HOOK__, i);
                const {
                        insert: s,
                        remove: l,
                        patchProp: a,
                        createElement: c,
                        createText: u,
                        createComment: p,
                        setText: f,
                        setElementText: h,
                        parentNode: g,
                        nextSibling: m,
                        setScopeId: v = r,
                        insertStaticContent: y,
                    } = e,
                    w = (e, n, t, o = null, r = null, i = null, s = void 0, l = null, a = !!n.dynamicChildren) => {
                        if (e === n) return;
                        e && !kr(e, n) && ((o = X(e)), q(e, r, i, !0), (e = null)),
                            -2 === n.patchFlag && ((a = !1), (n.dynamicChildren = null));
                        const { type: c, ref: u, shapeFlag: d } = n;
                        switch (c) {
                            case pr:
                                b(e, n, t, o);
                                break;
                            case fr:
                                _(e, n, t, o);
                                break;
                            case hr:
                                null == e && x(n, t, o, s);
                                break;
                            case dr:
                                R(e, n, t, o, r, i, s, l, a);
                                break;
                            default:
                                1 & d
                                    ? C(e, n, t, o, r, i, s, l, a)
                                    : 6 & d
                                    ? U(e, n, t, o, r, i, s, l, a)
                                    : (64 & d || 128 & d) && c.process(e, n, t, o, r, i, s, l, a, ee);
                        }
                        null != u && r && or(u, e && e.ref, i, n || e, !n);
                    },
                    b = (e, n, t, o) => {
                        if (null == e) s((n.el = u(n.children)), t, o);
                        else {
                            const t = (n.el = e.el);
                            n.children !== e.children && f(t, n.children);
                        }
                    },
                    _ = (e, n, t, o) => {
                        null == e ? s((n.el = p(n.children || "")), t, o) : (n.el = e.el);
                    },
                    x = (e, n, t, o) => {
                        [e.el, e.anchor] = y(e.children, n, t, o, e.el, e.anchor);
                    },
                    S = ({ el: e, anchor: n }) => {
                        let t;
                        for (; e && e !== n; ) (t = m(e)), l(e), (e = t);
                        l(n);
                    },
                    C = (e, n, t, o, r, i, s, l, a) => {
                        "svg" === n.type ? (s = "svg") : "math" === n.type && (s = "mathml"),
                            null == e ? E(n, t, o, r, i, s, l, a) : A(e, n, r, i, s, l, a);
                    },
                    E = (e, n, t, o, r, i, l, u) => {
                        let d, p;
                        const { props: f, shapeFlag: g, transition: m, dirs: v } = e;
                        if (
                            ((d = e.el = c(e.type, i, f && f.is, f)),
                            8 & g ? h(d, e.children) : 16 & g && M(e.children, d, null, o, r, sr(e, i), l, u),
                            v && Pt(e, null, o, "created"),
                            O(d, e, e.scopeId, l, o),
                            f)
                        ) {
                            for (const n in f) "value" === n || k(n) || a(d, n, null, f[n], i, e.children, o, r, J);
                            "value" in f && a(d, "value", null, f.value, i), (p = f.onVnodeBeforeMount) && jr(p, o, e);
                        }
                        __VUE_PROD_DEVTOOLS__ &&
                            (Object.defineProperty(d, "__vnode", {
                                value: e,
                                enumerable: !1,
                            }),
                            Object.defineProperty(d, "__vueParentComponent", {
                                value: o,
                                enumerable: !1,
                            })),
                            v && Pt(e, null, o, "beforeMount");
                        const y = ar(r, m);
                        y && m.beforeEnter(d),
                            s(d, n, t),
                            ((p = f && f.onVnodeMounted) || y || v) &&
                                rr(() => {
                                    p && jr(p, o, e), y && m.enter(d), v && Pt(e, null, o, "mounted");
                                }, r);
                    },
                    O = (e, n, t, o, r) => {
                        if ((t && v(e, t), o)) for (let n = 0; n < o.length; n++) v(e, o[n]);
                        if (r) {
                            if (n === r.subTree) {
                                const n = r.vnode;
                                O(e, n, n.scopeId, n.slotScopeIds, r.parent);
                            }
                        }
                    },
                    M = (e, n, t, o, r, i, s, l, a = 0) => {
                        for (let c = a; c < e.length; c++) {
                            const a = (e[c] = l ? Rr(e[c]) : Vr(e[c]));
                            w(null, a, n, t, o, r, i, s, l);
                        }
                    },
                    A = (e, t, o, r, i, s, l) => {
                        const c = (t.el = e.el);
                        let { patchFlag: u, dynamicChildren: d, dirs: p } = t;
                        u |= 16 & e.patchFlag;
                        const f = e.props || n,
                            g = t.props || n;
                        let m;
                        if (
                            (o && lr(o, !1),
                            (m = g.onVnodeBeforeUpdate) && jr(m, o, t, e),
                            p && Pt(t, e, o, "beforeUpdate"),
                            o && lr(o, !0),
                            d
                                ? P(e.dynamicChildren, d, c, o, r, sr(t, i), s)
                                : l || $(e, t, c, null, o, r, sr(t, i), s, !1),
                            u > 0)
                        ) {
                            if (16 & u) F(c, t, f, g, o, r, i);
                            else if (
                                (2 & u && f.class !== g.class && a(c, "class", null, g.class, i),
                                4 & u && a(c, "style", f.style, g.style, i),
                                8 & u)
                            ) {
                                const n = t.dynamicProps;
                                for (let t = 0; t < n.length; t++) {
                                    const s = n[t],
                                        l = f[s],
                                        u = g[s];
                                    (u === l && "value" !== s) || a(c, s, l, u, i, e.children, o, r, J);
                                }
                            }
                            1 & u && e.children !== t.children && h(c, t.children);
                        } else l || null != d || F(c, t, f, g, o, r, i);
                        ((m = g.onVnodeUpdated) || p) &&
                            rr(() => {
                                m && jr(m, o, t, e), p && Pt(t, e, o, "updated");
                            }, r);
                    },
                    P = (e, n, t, o, r, i, s) => {
                        for (let l = 0; l < n.length; l++) {
                            const a = e[l],
                                c = n[l],
                                u = a.el && (a.type === dr || !kr(a, c) || 70 & a.shapeFlag) ? g(a.el) : t;
                            w(a, c, u, null, o, r, i, s, !0);
                        }
                    },
                    F = (e, t, o, r, i, s, l) => {
                        if (o !== r) {
                            if (o !== n)
                                for (const n in o) k(n) || n in r || a(e, n, o[n], null, l, t.children, i, s, J);
                            for (const n in r) {
                                if (k(n)) continue;
                                const c = r[n],
                                    u = o[n];
                                c !== u && "value" !== n && a(e, n, u, c, l, t.children, i, s, J);
                            }
                            "value" in r && a(e, "value", o.value, r.value, l);
                        }
                    },
                    R = (e, n, t, o, r, i, l, a, c) => {
                        const d = (n.el = e ? e.el : u("")),
                            p = (n.anchor = e ? e.anchor : u(""));
                        let { patchFlag: f, dynamicChildren: h, slotScopeIds: g } = n;
                        g && (a = a ? a.concat(g) : g),
                            null == e
                                ? (s(d, t, o), s(p, t, o), M(n.children || [], t, p, r, i, l, a, c))
                                : f > 0 && 64 & f && h && e.dynamicChildren
                                ? (P(e.dynamicChildren, h, t, r, i, l, a),
                                  (null != n.key || (r && n === r.subTree)) && cr(e, n, !0))
                                : $(e, n, t, p, r, i, l, a, c);
                    },
                    U = (e, n, t, o, r, i, s, l, a) => {
                        (n.slotScopeIds = l),
                            null == e
                                ? 512 & n.shapeFlag
                                    ? r.ctx.activate(n, t, o, s, a)
                                    : j(n, t, o, r, i, s, a)
                                : z(e, n, a);
                    },
                    j = (e, n, t, o, r, i, s) => {
                        const l = (e.component = Ir(e, o, r));
                        if ((Gt(e) && (l.ctx.renderer = ee), Xr(l), l.asyncDep)) {
                            if ((r && r.registerDep(l, I), !e.el)) {
                                const e = (l.subTree = Mr(fr));
                                _(null, e, n, t);
                            }
                        } else I(l, e, n, t, r, i, s);
                    },
                    z = (e, n, t) => {
                        const o = (n.component = e.component);
                        if (
                            (function (e, n, t) {
                                const { props: o, children: r, component: i } = e,
                                    { props: s, children: l, patchFlag: a } = n,
                                    c = i.emitsOptions;
                                if (n.dirs || n.transition) return !0;
                                if (!(t && a >= 0))
                                    return (
                                        !((!r && !l) || (l && l.$stable)) || (o !== s && (o ? !s || ht(o, s, c) : !!s))
                                    );
                                if (1024 & a) return !0;
                                if (16 & a) return o ? ht(o, s, c) : !!s;
                                if (8 & a) {
                                    const e = n.dynamicProps;
                                    for (let n = 0; n < e.length; n++) {
                                        const t = e[n];
                                        if (s[t] !== o[t] && !st(c, t)) return !0;
                                    }
                                }
                                return !1;
                            })(e, n, t)
                        ) {
                            if (o.asyncDep && !o.asyncResolved) return void N(o, n, t);
                            (o.next = n),
                                (function (e) {
                                    const n = Pn.indexOf(e);
                                    n > Fn && Pn.splice(n, 1);
                                })(o.update),
                                (o.effect.dirty = !0),
                                o.update();
                        } else (n.el = e.el), (o.vnode = n);
                    },
                    I = (e, n, t, o, i, s, l) => {
                        const a = () => {
                                if (e.isMounted) {
                                    let { next: n, bu: t, u: o, parent: r, vnode: c } = e;
                                    {
                                        const t = ur(e);
                                        if (t)
                                            return (
                                                n && ((n.el = c.el), N(e, n, l)),
                                                void t.asyncDep.then(() => {
                                                    e.isUnmounted || a();
                                                })
                                            );
                                    }
                                    let u,
                                        d = n;
                                    0,
                                        lr(e, !1),
                                        n ? ((n.el = c.el), N(e, n, l)) : (n = c),
                                        t && V(t),
                                        (u = n.props && n.props.onVnodeBeforeUpdate) && jr(u, r, n, c),
                                        lr(e, !0);
                                    const p = dt(e);
                                    0;
                                    const f = e.subTree;
                                    (e.subTree = p),
                                        w(f, p, g(f.el), X(f), e, i, s),
                                        (n.el = p.el),
                                        null === d && gt(e, p.el),
                                        o && rr(o, i),
                                        (u = n.props && n.props.onVnodeUpdated) && rr(() => jr(u, r, n, c), i),
                                        __VUE_PROD_DEVTOOLS__ && et(e);
                                } else {
                                    let r;
                                    const { el: l, props: a } = n,
                                        { bm: c, m: u, parent: d } = e,
                                        p = qt(n);
                                    if (
                                        (lr(e, !1),
                                        c && V(c),
                                        !p && (r = a && a.onVnodeBeforeMount) && jr(r, d, n),
                                        lr(e, !0),
                                        l && oe)
                                    ) {
                                        const t = () => {
                                            (e.subTree = dt(e)), oe(l, e.subTree, e, i, null);
                                        };
                                        p ? n.type.__asyncLoader().then(() => !e.isUnmounted && t()) : t();
                                    } else {
                                        0;
                                        const r = (e.subTree = dt(e));
                                        0, w(null, r, t, o, e, i, s), (n.el = r.el);
                                    }
                                    if ((u && rr(u, i), !p && (r = a && a.onVnodeMounted))) {
                                        const e = n;
                                        rr(() => jr(r, d, e), i);
                                    }
                                    (256 & n.shapeFlag || (d && qt(d.vnode) && 256 & d.vnode.shapeFlag)) &&
                                        e.a &&
                                        rr(e.a, i),
                                        (e.isMounted = !0),
                                        __VUE_PROD_DEVTOOLS__ && Qn(e),
                                        (n = t = o = null);
                                }
                            },
                            c = (e.effect = new te(a, r, () => In(u), e.scope)),
                            u = (e.update = () => {
                                c.dirty && c.run();
                            });
                        (u.id = e.uid), lr(e, !0), u();
                    },
                    N = (e, n, t) => {
                        n.component = e;
                        const o = e.vnode.props;
                        (e.vnode = n),
                            (e.next = null),
                            (function (e, n, t, o) {
                                const {
                                        props: r,
                                        attrs: i,
                                        vnode: { patchFlag: s },
                                    } = e,
                                    l = fn(r),
                                    [a] = e.propsOptions;
                                let c = !1;
                                if (!(o || s > 0) || 16 & s) {
                                    let o;
                                    Bo(e, n, r, i) && (c = !0);
                                    for (const i in l)
                                        (n && (d(n, i) || ((o = T(i)) !== i && d(n, o)))) ||
                                            (a
                                                ? !t ||
                                                  (void 0 === t[i] && void 0 === t[o]) ||
                                                  (r[i] = Ho(a, l, i, void 0, e, !0))
                                                : delete r[i]);
                                    if (i !== l) for (const e in i) (n && d(n, e)) || (delete i[e], (c = !0));
                                } else if (8 & s) {
                                    const t = e.vnode.dynamicProps;
                                    for (let o = 0; o < t.length; o++) {
                                        let s = t[o];
                                        if (st(e.emitsOptions, s)) continue;
                                        const u = n[s];
                                        if (a)
                                            if (d(i, s)) u !== i[s] && ((i[s] = u), (c = !0));
                                            else {
                                                const n = L(s);
                                                r[n] = Ho(a, l, n, u, e, !1);
                                            }
                                        else u !== i[s] && ((i[s] = u), (c = !0));
                                    }
                                }
                                c && xe(e.attrs, "set", "");
                            })(e, n.props, o, t),
                            tr(e, n.children, t),
                            ue(),
                            Bn(e),
                            de();
                    },
                    $ = (e, n, t, o, r, i, s, l, a = !1) => {
                        const c = e && e.children,
                            u = e ? e.shapeFlag : 0,
                            d = n.children,
                            { patchFlag: p, shapeFlag: f } = n;
                        if (p > 0) {
                            if (128 & p) return void H(c, d, t, o, r, i, s, l, a);
                            if (256 & p) return void B(c, d, t, o, r, i, s, l, a);
                        }
                        8 & f
                            ? (16 & u && J(c, r, i), d !== c && h(t, d))
                            : 16 & u
                            ? 16 & f
                                ? H(c, d, t, o, r, i, s, l, a)
                                : J(c, r, i, !0)
                            : (8 & u && h(t, ""), 16 & f && M(d, t, o, r, i, s, l, a));
                    },
                    B = (e, n, t, r, i, s, l, a, c) => {
                        n = n || o;
                        const u = (e = e || o).length,
                            d = n.length,
                            p = Math.min(u, d);
                        let f;
                        for (f = 0; f < p; f++) {
                            const o = (n[f] = c ? Rr(n[f]) : Vr(n[f]));
                            w(e[f], o, t, null, i, s, l, a, c);
                        }
                        u > d ? J(e, i, s, !0, !1, p) : M(n, t, r, i, s, l, a, c, p);
                    },
                    H = (e, n, t, r, i, s, l, a, c) => {
                        let u = 0;
                        const d = n.length;
                        let p = e.length - 1,
                            f = d - 1;
                        for (; u <= p && u <= f; ) {
                            const o = e[u],
                                r = (n[u] = c ? Rr(n[u]) : Vr(n[u]));
                            if (!kr(o, r)) break;
                            w(o, r, t, null, i, s, l, a, c), u++;
                        }
                        for (; u <= p && u <= f; ) {
                            const o = e[p],
                                r = (n[f] = c ? Rr(n[f]) : Vr(n[f]));
                            if (!kr(o, r)) break;
                            w(o, r, t, null, i, s, l, a, c), p--, f--;
                        }
                        if (u > p) {
                            if (u <= f) {
                                const e = f + 1,
                                    o = e < d ? n[e].el : r;
                                for (; u <= f; ) w(null, (n[u] = c ? Rr(n[u]) : Vr(n[u])), t, o, i, s, l, a, c), u++;
                            }
                        } else if (u > f) for (; u <= p; ) q(e[u], i, s, !0), u++;
                        else {
                            const h = u,
                                g = u,
                                m = new Map();
                            for (u = g; u <= f; u++) {
                                const e = (n[u] = c ? Rr(n[u]) : Vr(n[u]));
                                null != e.key && m.set(e.key, u);
                            }
                            let v,
                                y = 0;
                            const b = f - g + 1;
                            let _ = !1,
                                x = 0;
                            const S = new Array(b);
                            for (u = 0; u < b; u++) S[u] = 0;
                            for (u = h; u <= p; u++) {
                                const o = e[u];
                                if (y >= b) {
                                    q(o, i, s, !0);
                                    continue;
                                }
                                let r;
                                if (null != o.key) r = m.get(o.key);
                                else
                                    for (v = g; v <= f; v++)
                                        if (0 === S[v - g] && kr(o, n[v])) {
                                            r = v;
                                            break;
                                        }
                                void 0 === r
                                    ? q(o, i, s, !0)
                                    : ((S[r - g] = u + 1),
                                      r >= x ? (x = r) : (_ = !0),
                                      w(o, n[r], t, null, i, s, l, a, c),
                                      y++);
                            }
                            const C = _
                                ? (function (e) {
                                      const n = e.slice(),
                                          t = [0];
                                      let o, r, i, s, l;
                                      const a = e.length;
                                      for (o = 0; o < a; o++) {
                                          const a = e[o];
                                          if (0 !== a) {
                                              if (((r = t[t.length - 1]), e[r] < a)) {
                                                  (n[o] = r), t.push(o);
                                                  continue;
                                              }
                                              for (i = 0, s = t.length - 1; i < s; )
                                                  (l = (i + s) >> 1), e[t[l]] < a ? (i = l + 1) : (s = l);
                                              a < e[t[i]] && (i > 0 && (n[o] = t[i - 1]), (t[i] = o));
                                          }
                                      }
                                      (i = t.length), (s = t[i - 1]);
                                      for (; i-- > 0; ) (t[i] = s), (s = n[s]);
                                      return t;
                                  })(S)
                                : o;
                            for (v = C.length - 1, u = b - 1; u >= 0; u--) {
                                const e = g + u,
                                    o = n[e],
                                    p = e + 1 < d ? n[e + 1].el : r;
                                0 === S[u]
                                    ? w(null, o, t, p, i, s, l, a, c)
                                    : _ && (v < 0 || u !== C[v] ? W(o, t, p, 2) : v--);
                            }
                        }
                    },
                    W = (e, n, t, o, r = null) => {
                        const { el: i, type: l, transition: a, children: c, shapeFlag: u } = e;
                        if (6 & u) return void W(e.component.subTree, n, t, o);
                        if (128 & u) return void e.suspense.move(n, t, o);
                        if (64 & u) return void l.move(e, n, t, ee);
                        if (l === dr) {
                            s(i, n, t);
                            for (let e = 0; e < c.length; e++) W(c[e], n, t, o);
                            return void s(e.anchor, n, t);
                        }
                        if (l === hr)
                            return void (({ el: e, anchor: n }, t, o) => {
                                let r;
                                for (; e && e !== n; ) (r = m(e)), s(e, t, o), (e = r);
                                s(n, t, o);
                            })(e, n, t);
                        if (2 !== o && 1 & u && a)
                            if (0 === o) a.beforeEnter(i), s(i, n, t), rr(() => a.enter(i), r);
                            else {
                                const { leave: e, delayLeave: o, afterLeave: r } = a,
                                    l = () => s(i, n, t),
                                    c = () => {
                                        e(i, () => {
                                            l(), r && r();
                                        });
                                    };
                                o ? o(i, l, c) : c();
                            }
                        else s(i, n, t);
                    },
                    q = (e, n, t, o = !1, r = !1) => {
                        const {
                            type: i,
                            props: s,
                            ref: l,
                            children: a,
                            dynamicChildren: c,
                            shapeFlag: u,
                            patchFlag: d,
                            dirs: p,
                        } = e;
                        if ((null != l && or(l, null, t, e, !0), 256 & u)) return void n.ctx.deactivate(e);
                        const f = 1 & u && p,
                            h = !qt(e);
                        let g;
                        if ((h && (g = s && s.onVnodeBeforeUnmount) && jr(g, n, e), 6 & u)) Y(e.component, t, o);
                        else {
                            if (128 & u) return void e.suspense.unmount(t, o);
                            f && Pt(e, null, n, "beforeUnmount"),
                                64 & u
                                    ? e.type.remove(e, n, t, r, ee, o)
                                    : c && (i !== dr || (d > 0 && 64 & d))
                                    ? J(c, n, t, !1, !0)
                                    : ((i === dr && 384 & d) || (!r && 16 & u)) && J(a, n, t),
                                o && G(e);
                        }
                        ((h && (g = s && s.onVnodeUnmounted)) || f) &&
                            rr(() => {
                                g && jr(g, n, e), f && Pt(e, null, n, "unmounted");
                            }, t);
                    },
                    G = (e) => {
                        const { type: n, el: t, anchor: o, transition: r } = e;
                        if (n === dr) return void K(t, o);
                        if (n === hr) return void S(e);
                        const i = () => {
                            l(t), r && !r.persisted && r.afterLeave && r.afterLeave();
                        };
                        if (1 & e.shapeFlag && r && !r.persisted) {
                            const { leave: n, delayLeave: o } = r,
                                s = () => n(t, i);
                            o ? o(e.el, i, s) : s();
                        } else i();
                    },
                    K = (e, n) => {
                        let t;
                        for (; e !== n; ) (t = m(e)), l(e), (e = t);
                        l(n);
                    },
                    Y = (e, n, t) => {
                        const { bum: o, scope: r, update: i, subTree: s, um: l } = e;
                        o && V(o),
                            r.stop(),
                            i && ((i.active = !1), q(s, e, n, t)),
                            l && rr(l, n),
                            rr(() => {
                                e.isUnmounted = !0;
                            }, n),
                            n &&
                                n.pendingBranch &&
                                !n.isUnmounted &&
                                e.asyncDep &&
                                !e.asyncResolved &&
                                e.suspenseId === n.pendingId &&
                                (n.deps--, 0 === n.deps && n.resolve()),
                            __VUE_PROD_DEVTOOLS__ && tt(e);
                    },
                    J = (e, n, t, o = !1, r = !1, i = 0) => {
                        for (let s = i; s < e.length; s++) q(e[s], n, t, o, r);
                    },
                    X = (e) =>
                        6 & e.shapeFlag
                            ? X(e.component.subTree)
                            : 128 & e.shapeFlag
                            ? e.suspense.next()
                            : m(e.anchor || e.el);
                let Z = !1;
                const Q = (e, n, t) => {
                        null == e
                            ? n._vnode && q(n._vnode, null, null, !0)
                            : w(n._vnode || null, e, n, null, null, null, t),
                            Z || ((Z = !0), Bn(), Hn(), (Z = !1)),
                            (n._vnode = e);
                    },
                    ee = {
                        p: w,
                        um: q,
                        m: W,
                        r: G,
                        mt: j,
                        mc: M,
                        pc: $,
                        pbc: P,
                        n: X,
                        o: e,
                    };
                let ne, oe;
                return t && ([ne, oe] = t(ee)), { render: Q, hydrate: ne, createApp: Uo(Q, ne) };
            }
            function sr({ type: e, props: n }, t) {
                return ("svg" === t && "foreignObject" === e) ||
                    ("mathml" === t && "annotation-xml" === e && n && n.encoding && n.encoding.includes("html"))
                    ? void 0
                    : t;
            }
            function lr({ effect: e, update: n }, t) {
                e.allowRecurse = n.allowRecurse = t;
            }
            function ar(e, n) {
                return (!e || (e && !e.pendingBranch)) && n && !n.persisted;
            }
            function cr(e, n, t = !1) {
                const o = e.children,
                    r = n.children;
                if (p(o) && p(r))
                    for (let e = 0; e < o.length; e++) {
                        const n = o[e];
                        let i = r[e];
                        1 & i.shapeFlag &&
                            !i.dynamicChildren &&
                            ((i.patchFlag <= 0 || 32 === i.patchFlag) && ((i = r[e] = Rr(r[e])), (i.el = n.el)),
                            t || cr(n, i)),
                            i.type === pr && (i.el = n.el);
                    }
            }
            function ur(e) {
                const n = e.subTree.component;
                if (n) return n.asyncDep && !n.asyncResolved ? n : ur(n);
            }
            const dr = Symbol.for("v-fgt"),
                pr = Symbol.for("v-txt"),
                fr = Symbol.for("v-cmt"),
                hr = Symbol.for("v-stc"),
                gr = [];
            let mr = null;
            function vr(e = !1) {
                gr.push((mr = e ? null : []));
            }
            function yr() {
                gr.pop(), (mr = gr[gr.length - 1] || null);
            }
            let wr = 1;
            function br(e) {
                wr += e;
            }
            function _r(e) {
                return (e.dynamicChildren = wr > 0 ? mr || o : null), yr(), wr > 0 && mr && mr.push(e), e;
            }
            function xr(e, n, t, o, r, i) {
                return _r(Lr(e, n, t, o, r, i, !0));
            }
            function Sr(e, n, t, o, r) {
                return _r(Mr(e, n, t, o, r, !0));
            }
            function Cr(e) {
                return !!e && !0 === e.__v_isVNode;
            }
            function kr(e, n) {
                return e.type === n.type && e.key === n.key;
            }
            const Er = ({ key: e }) => (null != e ? e : null),
                Or = ({ ref: e, ref_key: n, ref_for: t }) => (
                    "number" == typeof e && (e = "" + e),
                    null != e ? (m(e) || bn(e) || g(e) ? { i: lt, r: e, k: n, f: !!t } : e) : null
                );
            function Lr(e, n = null, t = null, o = 0, r = null, i = e === dr ? 0 : 1, s = !1, l = !1) {
                const a = {
                    __v_isVNode: !0,
                    __v_skip: !0,
                    type: e,
                    props: n,
                    key: n && Er(n),
                    ref: n && Or(n),
                    scopeId: at,
                    slotScopeIds: null,
                    children: t,
                    component: null,
                    suspense: null,
                    ssContent: null,
                    ssFallback: null,
                    dirs: null,
                    transition: null,
                    el: null,
                    anchor: null,
                    target: null,
                    targetAnchor: null,
                    staticCount: 0,
                    shapeFlag: i,
                    patchFlag: o,
                    dynamicProps: r,
                    dynamicChildren: null,
                    appContext: null,
                    ctx: lt,
                };
                return (
                    l ? (Ur(a, t), 128 & i && e.normalize(a)) : t && (a.shapeFlag |= m(t) ? 8 : 16),
                    wr > 0 && !s && mr && (a.patchFlag > 0 || 6 & i) && 32 !== a.patchFlag && mr.push(a),
                    a
                );
            }
            const Mr = Tr;
            function Tr(e, n = null, t = null, o = 0, r = null, i = !1) {
                if (((e && e !== yt) || (e = fr), Cr(e))) {
                    const o = Ar(e, n, !0);
                    return (
                        t && Ur(o, t),
                        wr > 0 && !i && mr && (6 & o.shapeFlag ? (mr[mr.indexOf(e)] = o) : mr.push(o)),
                        (o.patchFlag |= -2),
                        o
                    );
                }
                if ((ri(e) && (e = e.__vccOpts), n)) {
                    n = (function (e) {
                        return e ? (pn(e) || No(e) ? a({}, e) : e) : null;
                    })(n);
                    let { class: e, style: t } = n;
                    e && !m(e) && (n.class = W(e)), y(t) && (pn(t) && !p(t) && (t = a({}, t)), (n.style = I(t)));
                }
                return Lr(
                    e,
                    n,
                    t,
                    o,
                    r,
                    m(e) ? 1 : _t(e) ? 128 : ((e) => e.__isTeleport)(e) ? 64 : y(e) ? 4 : g(e) ? 2 : 0,
                    i,
                    !0
                );
            }
            function Ar(e, n, t = !1, o = !1) {
                const { props: r, ref: i, patchFlag: l, children: a, transition: c } = e,
                    u = n
                        ? (function (...e) {
                              const n = {};
                              for (let t = 0; t < e.length; t++) {
                                  const o = e[t];
                                  for (const e in o)
                                      if ("class" === e) n.class !== o.class && (n.class = W([n.class, o.class]));
                                      else if ("style" === e) n.style = I([n.style, o.style]);
                                      else if (s(e)) {
                                          const t = n[e],
                                              r = o[e];
                                          !r || t === r || (p(t) && t.includes(r)) || (n[e] = t ? [].concat(t, r) : r);
                                      } else "" !== e && (n[e] = o[e]);
                              }
                              return n;
                          })(r || {}, n)
                        : r,
                    d = {
                        __v_isVNode: !0,
                        __v_skip: !0,
                        type: e.type,
                        props: u,
                        key: u && Er(u),
                        ref: n && n.ref ? (t && i ? (p(i) ? i.concat(Or(n)) : [i, Or(n)]) : Or(n)) : i,
                        scopeId: e.scopeId,
                        slotScopeIds: e.slotScopeIds,
                        children: a,
                        target: e.target,
                        targetAnchor: e.targetAnchor,
                        staticCount: e.staticCount,
                        shapeFlag: e.shapeFlag,
                        patchFlag: n && e.type !== dr ? (-1 === l ? 16 : 16 | l) : l,
                        dynamicProps: e.dynamicProps,
                        dynamicChildren: e.dynamicChildren,
                        appContext: e.appContext,
                        dirs: e.dirs,
                        transition: c,
                        component: e.component,
                        suspense: e.suspense,
                        ssContent: e.ssContent && Ar(e.ssContent),
                        ssFallback: e.ssFallback && Ar(e.ssFallback),
                        el: e.el,
                        anchor: e.anchor,
                        ctx: e.ctx,
                        ce: e.ce,
                    };
                return c && o && (d.transition = c.clone(d)), d;
            }
            function Pr(e = " ", n = 0) {
                return Mr(pr, null, e, n);
            }
            function Fr(e = "", n = !1) {
                return n ? (vr(), Sr(fr, null, e)) : Mr(fr, null, e);
            }
            function Vr(e) {
                return null == e || "boolean" == typeof e
                    ? Mr(fr)
                    : p(e)
                    ? Mr(dr, null, e.slice())
                    : "object" == typeof e
                    ? Rr(e)
                    : Mr(pr, null, String(e));
            }
            function Rr(e) {
                return (null === e.el && -1 !== e.patchFlag) || e.memo ? e : Ar(e);
            }
            function Ur(e, n) {
                let t = 0;
                const { shapeFlag: o } = e;
                if (null == n) n = null;
                else if (p(n)) t = 16;
                else if ("object" == typeof n) {
                    if (65 & o) {
                        const t = n.default;
                        return void (t && (t._c && (t._d = !1), Ur(e, t()), t._c && (t._d = !0)));
                    }
                    {
                        t = 32;
                        const o = n._;
                        o || No(n)
                            ? 3 === o && lt && (1 === lt.slots._ ? (n._ = 1) : ((n._ = 2), (e.patchFlag |= 1024)))
                            : (n._ctx = lt);
                    }
                } else
                    g(n)
                        ? ((n = { default: n, _ctx: lt }), (t = 32))
                        : ((n = String(n)), 64 & o ? ((t = 16), (n = [Pr(n)])) : (t = 8));
                (e.children = n), (e.shapeFlag |= t);
            }
            function jr(e, n, t, o = null) {
                Ln(e, n, 7, [t, o]);
            }
            const zr = Vo();
            let Dr = 0;
            function Ir(e, t, o) {
                const r = e.type,
                    i = (t ? t.appContext : e.appContext) || zr,
                    s = {
                        uid: Dr++,
                        vnode: e,
                        type: r,
                        parent: t,
                        appContext: i,
                        root: null,
                        next: null,
                        subTree: null,
                        effect: null,
                        update: null,
                        scope: new ee(!0),
                        render: null,
                        proxy: null,
                        exposed: null,
                        exposeProxy: null,
                        withProxy: null,
                        provides: t ? t.provides : Object.create(i.provides),
                        accessCache: null,
                        renderCache: [],
                        components: null,
                        directives: null,
                        propsOptions: Wo(r, i),
                        emitsOptions: it(r, i),
                        emit: null,
                        emitted: null,
                        propsDefaults: n,
                        inheritAttrs: r.inheritAttrs,
                        ctx: n,
                        data: n,
                        props: n,
                        attrs: n,
                        slots: n,
                        refs: n,
                        setupState: n,
                        setupContext: null,
                        attrsProxy: null,
                        slotsProxy: null,
                        suspense: o,
                        suspenseId: o ? o.pendingId : 0,
                        asyncDep: null,
                        asyncResolved: !1,
                        isMounted: !1,
                        isUnmounted: !1,
                        isDeactivated: !1,
                        bc: null,
                        c: null,
                        bm: null,
                        m: null,
                        bu: null,
                        u: null,
                        um: null,
                        bum: null,
                        da: null,
                        a: null,
                        rtg: null,
                        rtc: null,
                        ec: null,
                        sp: null,
                    };
                return (s.ctx = { _: s }), (s.root = t ? t.root : s), (s.emit = rt.bind(null, s)), e.ce && e.ce(s), s;
            }
            let Nr = null;
            const $r = () => Nr || lt;
            let Br, Hr;
            {
                const e = D(),
                    n = (n, t) => {
                        let o;
                        return (
                            (o = e[n]) || (o = e[n] = []),
                            o.push(t),
                            (e) => {
                                o.length > 1 ? o.forEach((n) => n(e)) : o[0](e);
                            }
                        );
                    };
                (Br = n("__VUE_INSTANCE_SETTERS__", (e) => (Nr = e))), (Hr = n("__VUE_SSR_SETTERS__", (e) => (Jr = e)));
            }
            const Wr = (e) => {
                    const n = Nr;
                    return (
                        Br(e),
                        e.scope.on(),
                        () => {
                            e.scope.off(), Br(n);
                        }
                    );
                },
                qr = () => {
                    Nr && Nr.scope.off(), Br(null);
                };
            function Gr(e) {
                return 4 & e.vnode.shapeFlag;
            }
            let Kr,
                Yr,
                Jr = !1;
            function Xr(e, n = !1) {
                n && Hr(n);
                const { props: t, children: o } = e.vnode,
                    r = Gr(e);
                $o(e, t, r, n), nr(e, o);
                const i = r
                    ? (function (e, n) {
                          const t = e.type;
                          0;
                          (e.accessCache = Object.create(null)), (e.proxy = new Proxy(e.ctx, bo)), !1;
                          const { setup: o } = t;
                          if (o) {
                              const t = (e.setupContext = o.length > 1 ? ni(e) : null),
                                  r = Wr(e);
                              ue();
                              const i = On(o, e, 0, [e.props, t]);
                              if ((de(), r(), w(i))) {
                                  if ((i.then(qr, qr), n))
                                      return i
                                          .then((t) => {
                                              Zr(e, t, n);
                                          })
                                          .catch((n) => {
                                              Mn(n, e, 0);
                                          });
                                  e.asyncDep = i;
                              } else Zr(e, i, n);
                          } else Qr(e, n);
                      })(e, n)
                    : void 0;
                return n && Hr(!1), i;
            }
            function Zr(e, n, t) {
                g(n)
                    ? e.type.__ssrInlineRender
                        ? (e.ssrRender = n)
                        : (e.render = n)
                    : y(n) && (__VUE_PROD_DEVTOOLS__ && (e.devtoolsRawSetupState = n), (e.setupState = En(n))),
                    Qr(e, t);
            }
            function Qr(e, n, t) {
                const o = e.type;
                if (!e.render) {
                    if (!n && Kr && !o.render) {
                        const n = o.template || Eo(e).template;
                        if (n) {
                            0;
                            const { isCustomElement: t, compilerOptions: r } = e.appContext.config,
                                { delimiters: i, compilerOptions: s } = o,
                                l = a(a({ isCustomElement: t, delimiters: i }, r), s);
                            o.render = Kr(n, l);
                        }
                    }
                    (e.render = o.render || r), Yr && Yr(e);
                }
                if (__VUE_OPTIONS_API__) {
                    const n = Wr(e);
                    ue();
                    try {
                        So(e);
                    } finally {
                        de(), n();
                    }
                }
            }
            const ei = { get: (e, n) => (_e(e, 0, ""), e[n]) };
            function ni(e) {
                const n = (n) => {
                    e.exposed = n || {};
                };
                return {
                    attrs: new Proxy(e.attrs, ei),
                    slots: e.slots,
                    emit: e.emit,
                    expose: n,
                };
            }
            function ti(e) {
                if (e.exposed)
                    return (
                        e.exposeProxy ||
                        (e.exposeProxy = new Proxy(
                            En(((n = e.exposed), Object.isExtensible(n) && R(n, "__v_skip", !0), n)),
                            {
                                get: (n, t) => (t in n ? n[t] : t in yo ? yo[t](e) : void 0),
                                has: (e, n) => n in e || n in yo,
                            }
                        ))
                    );
                var n;
            }
            function oi(e, n = !0) {
                return g(e) ? e.displayName || e.name : e.name || (n && e.__name);
            }
            function ri(e) {
                return g(e) && "__vccOpts" in e;
            }
            const ii = (e, n) => vn(e, 0, Jr);
            const si = "3.4.26",
                li = "undefined" != typeof document ? document : null,
                ai = li && li.createElement("template"),
                ci = {
                    insert: (e, n, t) => {
                        n.insertBefore(e, t || null);
                    },
                    remove: (e) => {
                        const n = e.parentNode;
                        n && n.removeChild(e);
                    },
                    createElement: (e, n, t, o) => {
                        const r =
                            "svg" === n
                                ? li.createElementNS("http://www.w3.org/2000/svg", e)
                                : "mathml" === n
                                ? li.createElementNS("http://www.w3.org/1998/Math/MathML", e)
                                : li.createElement(e, t ? { is: t } : void 0);
                        return "select" === e && o && null != o.multiple && r.setAttribute("multiple", o.multiple), r;
                    },
                    createText: (e) => li.createTextNode(e),
                    createComment: (e) => li.createComment(e),
                    setText: (e, n) => {
                        e.nodeValue = n;
                    },
                    setElementText: (e, n) => {
                        e.textContent = n;
                    },
                    parentNode: (e) => e.parentNode,
                    nextSibling: (e) => e.nextSibling,
                    querySelector: (e) => li.querySelector(e),
                    setScopeId(e, n) {
                        e.setAttribute(n, "");
                    },
                    insertStaticContent(e, n, t, o, r, i) {
                        const s = t ? t.previousSibling : n.lastChild;
                        if (r && (r === i || r.nextSibling))
                            for (; n.insertBefore(r.cloneNode(!0), t), r !== i && (r = r.nextSibling); );
                        else {
                            ai.innerHTML = "svg" === o ? `<svg>${e}</svg>` : "mathml" === o ? `<math>${e}</math>` : e;
                            const r = ai.content;
                            if ("svg" === o || "mathml" === o) {
                                const e = r.firstChild;
                                for (; e.firstChild; ) r.appendChild(e.firstChild);
                                r.removeChild(e);
                            }
                            n.insertBefore(r, t);
                        }
                        return [s ? s.nextSibling : n.firstChild, t ? t.previousSibling : n.lastChild];
                    },
                },
                ui = "transition",
                di = "animation",
                pi = Symbol("_vtc"),
                fi = (e, { slots: n }) =>
                    (function (e, n, t) {
                        const o = arguments.length;
                        return 2 === o
                            ? y(n) && !p(n)
                                ? Cr(n)
                                    ? Mr(e, null, [n])
                                    : Mr(e, n)
                                : Mr(e, null, n)
                            : (o > 3 ? (t = Array.prototype.slice.call(arguments, 2)) : 3 === o && Cr(t) && (t = [t]),
                              Mr(e, n, t));
                    })(zt, vi(e), n);
            fi.displayName = "Transition";
            const hi = {
                    name: String,
                    type: String,
                    css: { type: Boolean, default: !0 },
                    duration: [String, Number, Object],
                    enterFromClass: String,
                    enterActiveClass: String,
                    enterToClass: String,
                    appearFromClass: String,
                    appearActiveClass: String,
                    appearToClass: String,
                    leaveFromClass: String,
                    leaveActiveClass: String,
                    leaveToClass: String,
                },
                gi =
                    ((fi.props = a({}, jt, hi)),
                    (e, n = []) => {
                        p(e) ? e.forEach((e) => e(...n)) : e && e(...n);
                    }),
                mi = (e) => !!e && (p(e) ? e.some((e) => e.length > 1) : e.length > 1);
            function vi(e) {
                const n = {};
                for (const t in e) t in hi || (n[t] = e[t]);
                if (!1 === e.css) return n;
                const {
                        name: t = "v",
                        type: o,
                        duration: r,
                        enterFromClass: i = `${t}-enter-from`,
                        enterActiveClass: s = `${t}-enter-active`,
                        enterToClass: l = `${t}-enter-to`,
                        appearFromClass: c = i,
                        appearActiveClass: u = s,
                        appearToClass: d = l,
                        leaveFromClass: p = `${t}-leave-from`,
                        leaveActiveClass: f = `${t}-leave-active`,
                        leaveToClass: h = `${t}-leave-to`,
                    } = e,
                    g = (function (e) {
                        if (null == e) return null;
                        if (y(e)) return [yi(e.enter), yi(e.leave)];
                        {
                            const n = yi(e);
                            return [n, n];
                        }
                    })(r),
                    m = g && g[0],
                    v = g && g[1],
                    {
                        onBeforeEnter: w,
                        onEnter: b,
                        onEnterCancelled: _,
                        onLeave: x,
                        onLeaveCancelled: S,
                        onBeforeAppear: C = w,
                        onAppear: k = b,
                        onAppearCancelled: E = _,
                    } = n,
                    O = (e, n, t) => {
                        bi(e, n ? d : l), bi(e, n ? u : s), t && t();
                    },
                    L = (e, n) => {
                        (e._isLeaving = !1), bi(e, p), bi(e, h), bi(e, f), n && n();
                    },
                    M = (e) => (n, t) => {
                        const r = e ? k : b,
                            s = () => O(n, e, t);
                        gi(r, [n, s]),
                            _i(() => {
                                bi(n, e ? c : i), wi(n, e ? d : l), mi(r) || Si(n, o, m, s);
                            });
                    };
                return a(n, {
                    onBeforeEnter(e) {
                        gi(w, [e]), wi(e, i), wi(e, s);
                    },
                    onBeforeAppear(e) {
                        gi(C, [e]), wi(e, c), wi(e, u);
                    },
                    onEnter: M(!1),
                    onAppear: M(!0),
                    onLeave(e, n) {
                        e._isLeaving = !0;
                        const t = () => L(e, n);
                        wi(e, p),
                            wi(e, f),
                            Oi(),
                            _i(() => {
                                e._isLeaving && (bi(e, p), wi(e, h), mi(x) || Si(e, o, v, t));
                            }),
                            gi(x, [e, t]);
                    },
                    onEnterCancelled(e) {
                        O(e, !1), gi(_, [e]);
                    },
                    onAppearCancelled(e) {
                        O(e, !0), gi(E, [e]);
                    },
                    onLeaveCancelled(e) {
                        L(e), gi(S, [e]);
                    },
                });
            }
            function yi(e) {
                return j(e);
            }
            function wi(e, n) {
                n.split(/\s+/).forEach((n) => n && e.classList.add(n)), (e[pi] || (e[pi] = new Set())).add(n);
            }
            function bi(e, n) {
                n.split(/\s+/).forEach((n) => n && e.classList.remove(n));
                const t = e[pi];
                t && (t.delete(n), t.size || (e[pi] = void 0));
            }
            function _i(e) {
                requestAnimationFrame(() => {
                    requestAnimationFrame(e);
                });
            }
            let xi = 0;
            function Si(e, n, t, o) {
                const r = (e._endId = ++xi),
                    i = () => {
                        r === e._endId && o();
                    };
                if (t) return setTimeout(i, t);
                const { type: s, timeout: l, propCount: a } = Ci(e, n);
                if (!s) return o();
                const c = s + "end";
                let u = 0;
                const d = () => {
                        e.removeEventListener(c, p), i();
                    },
                    p = (n) => {
                        n.target === e && ++u >= a && d();
                    };
                setTimeout(() => {
                    u < a && d();
                }, l + 1),
                    e.addEventListener(c, p);
            }
            function Ci(e, n) {
                const t = window.getComputedStyle(e),
                    o = (e) => (t[e] || "").split(", "),
                    r = o(`${ui}Delay`),
                    i = o(`${ui}Duration`),
                    s = ki(r, i),
                    l = o(`${di}Delay`),
                    a = o(`${di}Duration`),
                    c = ki(l, a);
                let u = null,
                    d = 0,
                    p = 0;
                n === ui
                    ? s > 0 && ((u = ui), (d = s), (p = i.length))
                    : n === di
                    ? c > 0 && ((u = di), (d = c), (p = a.length))
                    : ((d = Math.max(s, c)),
                      (u = d > 0 ? (s > c ? ui : di) : null),
                      (p = u ? (u === ui ? i.length : a.length) : 0));
                return {
                    type: u,
                    timeout: d,
                    propCount: p,
                    hasTransform: u === ui && /\b(transform|all)(,|$)/.test(o(`${ui}Property`).toString()),
                };
            }
            function ki(e, n) {
                for (; e.length < n.length; ) e = e.concat(e);
                return Math.max(...n.map((n, t) => Ei(n) + Ei(e[t])));
            }
            function Ei(e) {
                return "auto" === e ? 0 : 1e3 * Number(e.slice(0, -1).replace(",", "."));
            }
            function Oi() {
                return document.body.offsetHeight;
            }
            const Li = Symbol("_vod"),
                Mi = Symbol("_vsh"),
                Ti = {
                    beforeMount(e, { value: n }, { transition: t }) {
                        (e[Li] = "none" === e.style.display ? "" : e.style.display),
                            t && n ? t.beforeEnter(e) : Ai(e, n);
                    },
                    mounted(e, { value: n }, { transition: t }) {
                        t && n && t.enter(e);
                    },
                    updated(e, { value: n, oldValue: t }, { transition: o }) {
                        !n != !t &&
                            (o
                                ? n
                                    ? (o.beforeEnter(e), Ai(e, !0), o.enter(e))
                                    : o.leave(e, () => {
                                          Ai(e, !1);
                                      })
                                : Ai(e, n));
                    },
                    beforeUnmount(e, { value: n }) {
                        Ai(e, n);
                    },
                };
            function Ai(e, n) {
                (e.style.display = n ? e[Li] : "none"), (e[Mi] = !n);
            }
            const Pi = Symbol("");
            const Fi = /(^|;)\s*display\s*:/;
            const Vi = /\s*!important$/;
            function Ri(e, n, t) {
                if (p(t)) t.forEach((t) => Ri(e, n, t));
                else if ((null == t && (t = ""), n.startsWith("--"))) e.setProperty(n, t);
                else {
                    const o = (function (e, n) {
                        const t = ji[n];
                        if (t) return t;
                        let o = L(n);
                        if ("filter" !== o && o in e) return (ji[n] = o);
                        o = A(o);
                        for (let t = 0; t < Ui.length; t++) {
                            const r = Ui[t] + o;
                            if (r in e) return (ji[n] = r);
                        }
                        return n;
                    })(e, n);
                    Vi.test(t) ? e.setProperty(T(o), t.replace(Vi, ""), "important") : (e[o] = t);
                }
            }
            const Ui = ["Webkit", "Moz", "ms"],
                ji = {};
            const zi = "http://www.w3.org/1999/xlink";
            function Di(e, n, t, o) {
                e.addEventListener(n, t, o);
            }
            const Ii = Symbol("_vei");
            function Ni(e, n, t, o, r = null) {
                const i = e[Ii] || (e[Ii] = {}),
                    s = i[n];
                if (o && s) s.value = o;
                else {
                    const [t, l] = (function (e) {
                        let n;
                        if ($i.test(e)) {
                            let t;
                            for (n = {}; (t = e.match($i)); )
                                (e = e.slice(0, e.length - t[0].length)), (n[t[0].toLowerCase()] = !0);
                        }
                        const t = ":" === e[2] ? e.slice(3) : T(e.slice(2));
                        return [t, n];
                    })(n);
                    if (o) {
                        const s = (i[n] = (function (e, n) {
                            const t = (e) => {
                                if (e._vts) {
                                    if (e._vts <= t.attached) return;
                                } else e._vts = Date.now();
                                Ln(
                                    (function (e, n) {
                                        if (p(n)) {
                                            const t = e.stopImmediatePropagation;
                                            return (
                                                (e.stopImmediatePropagation = () => {
                                                    t.call(e), (e._stopped = !0);
                                                }),
                                                n.map((e) => (n) => !n._stopped && e && e(n))
                                            );
                                        }
                                        return n;
                                    })(e, t.value),
                                    n,
                                    5,
                                    [e]
                                );
                            };
                            return (t.value = e), (t.attached = Wi()), t;
                        })(o, r));
                        Di(e, t, s, l);
                    } else
                        s &&
                            (!(function (e, n, t, o) {
                                e.removeEventListener(n, t, o);
                            })(e, t, s, l),
                            (i[n] = void 0));
                }
            }
            const $i = /(?:Once|Passive|Capture)$/;
            let Bi = 0;
            const Hi = Promise.resolve(),
                Wi = () => Bi || (Hi.then(() => (Bi = 0)), (Bi = Date.now()));
            const qi = (e) =>
                111 === e.charCodeAt(0) && 110 === e.charCodeAt(1) && e.charCodeAt(2) > 96 && e.charCodeAt(2) < 123;
            "undefined" != typeof HTMLElement && HTMLElement;
            Symbol("_moveCb"), Symbol("_enterCb");
            const Gi = (e) => {
                const n = e.props["onUpdate:modelValue"] || !1;
                return p(n) ? (e) => V(n, e) : n;
            };
            function Ki(e) {
                e.target.composing = !0;
            }
            function Yi(e) {
                const n = e.target;
                n.composing && ((n.composing = !1), n.dispatchEvent(new Event("input")));
            }
            const Ji = Symbol("_assign"),
                Xi = {
                    created(e, { modifiers: { lazy: n, trim: t, number: o } }, r) {
                        e[Ji] = Gi(r);
                        const i = o || (r.props && "number" === r.props.type);
                        Di(e, n ? "change" : "input", (n) => {
                            if (n.target.composing) return;
                            let o = e.value;
                            t && (o = o.trim()), i && (o = U(o)), e[Ji](o);
                        }),
                            t &&
                                Di(e, "change", () => {
                                    e.value = e.value.trim();
                                }),
                            n || (Di(e, "compositionstart", Ki), Di(e, "compositionend", Yi), Di(e, "change", Yi));
                    },
                    mounted(e, { value: n }) {
                        e.value = null == n ? "" : n;
                    },
                    beforeUpdate(e, { value: n, modifiers: { lazy: t, trim: o, number: r } }, i) {
                        if (((e[Ji] = Gi(i)), e.composing)) return;
                        const s = null == n ? "" : n;
                        if (((!r && "number" !== e.type) || /^0\d/.test(e.value) ? e.value : U(e.value)) !== s) {
                            if (document.activeElement === e && "range" !== e.type) {
                                if (t) return;
                                if (o && e.value.trim() === s) return;
                            }
                            e.value = s;
                        }
                    },
                };
            const Zi = ["ctrl", "shift", "alt", "meta"],
                Qi = {
                    stop: (e) => e.stopPropagation(),
                    prevent: (e) => e.preventDefault(),
                    self: (e) => e.target !== e.currentTarget,
                    ctrl: (e) => !e.ctrlKey,
                    shift: (e) => !e.shiftKey,
                    alt: (e) => !e.altKey,
                    meta: (e) => !e.metaKey,
                    left: (e) => "button" in e && 0 !== e.button,
                    middle: (e) => "button" in e && 1 !== e.button,
                    right: (e) => "button" in e && 2 !== e.button,
                    exact: (e, n) => Zi.some((t) => e[`${t}Key`] && !n.includes(t)),
                },
                es = (e, n) => {
                    const t = e._withMods || (e._withMods = {}),
                        o = n.join(".");
                    return (
                        t[o] ||
                        (t[o] = (t, ...o) => {
                            for (let e = 0; e < n.length; e++) {
                                const o = Qi[n[e]];
                                if (o && o(t, n)) return;
                            }
                            return e(t, ...o);
                        })
                    );
                },
                ns = a(
                    {
                        patchProp: (e, n, t, o, r, i, a, c, u) => {
                            const d = "svg" === r;
                            "class" === n
                                ? (function (e, n, t) {
                                      const o = e[pi];
                                      o && (n = (n ? [n, ...o] : [...o]).join(" ")),
                                          null == n
                                              ? e.removeAttribute("class")
                                              : t
                                              ? e.setAttribute("class", n)
                                              : (e.className = n);
                                  })(e, o, d)
                                : "style" === n
                                ? (function (e, n, t) {
                                      const o = e.style,
                                          r = m(t);
                                      let i = !1;
                                      if (t && !r) {
                                          if (n)
                                              if (m(n))
                                                  for (const e of n.split(";")) {
                                                      const n = e.slice(0, e.indexOf(":")).trim();
                                                      null == t[n] && Ri(o, n, "");
                                                  }
                                              else for (const e in n) null == t[e] && Ri(o, e, "");
                                          for (const e in t) "display" === e && (i = !0), Ri(o, e, t[e]);
                                      } else if (r) {
                                          if (n !== t) {
                                              const e = o[Pi];
                                              e && (t += ";" + e), (o.cssText = t), (i = Fi.test(t));
                                          }
                                      } else n && e.removeAttribute("style");
                                      Li in e && ((e[Li] = i ? o.display : ""), e[Mi] && (o.display = "none"));
                                  })(e, t, o)
                                : s(n)
                                ? l(n) || Ni(e, n, 0, o, a)
                                : (
                                      "." === n[0]
                                          ? ((n = n.slice(1)), 1)
                                          : "^" === n[0]
                                          ? ((n = n.slice(1)), 0)
                                          : (function (e, n, t, o) {
                                                if (o)
                                                    return (
                                                        "innerHTML" === n ||
                                                        "textContent" === n ||
                                                        !!(n in e && qi(n) && g(t))
                                                    );
                                                if ("spellcheck" === n || "draggable" === n || "translate" === n)
                                                    return !1;
                                                if ("form" === n) return !1;
                                                if ("list" === n && "INPUT" === e.tagName) return !1;
                                                if ("type" === n && "TEXTAREA" === e.tagName) return !1;
                                                if ("width" === n || "height" === n) {
                                                    const n = e.tagName;
                                                    if (
                                                        "IMG" === n ||
                                                        "VIDEO" === n ||
                                                        "CANVAS" === n ||
                                                        "SOURCE" === n
                                                    )
                                                        return !1;
                                                }
                                                if (qi(n) && m(t)) return !1;
                                                return n in e;
                                            })(e, n, o, d)
                                  )
                                ? (function (e, n, t, o, r, i, s) {
                                      if ("innerHTML" === n || "textContent" === n)
                                          return o && s(o, r, i), void (e[n] = null == t ? "" : t);
                                      const l = e.tagName;
                                      if ("value" === n && "PROGRESS" !== l && !l.includes("-")) {
                                          const o = null == t ? "" : t;
                                          return (
                                              (("OPTION" === l ? e.getAttribute("value") || "" : e.value) === o &&
                                                  "_value" in e) ||
                                                  (e.value = o),
                                              null == t && e.removeAttribute(n),
                                              void (e._value = t)
                                          );
                                      }
                                      let a = !1;
                                      if ("" === t || null == t) {
                                          const o = typeof e[n];
                                          "boolean" === o
                                              ? (t = K(t))
                                              : null == t && "string" === o
                                              ? ((t = ""), (a = !0))
                                              : "number" === o && ((t = 0), (a = !0));
                                      }
                                      try {
                                          e[n] = t;
                                      } catch (e) {}
                                      a && e.removeAttribute(n);
                                  })(e, n, o, i, a, c, u)
                                : ("true-value" === n ? (e._trueValue = o) : "false-value" === n && (e._falseValue = o),
                                  (function (e, n, t, o, r) {
                                      if (o && n.startsWith("xlink:"))
                                          null == t
                                              ? e.removeAttributeNS(zi, n.slice(6, n.length))
                                              : e.setAttributeNS(zi, n, t);
                                      else {
                                          const o = G(n);
                                          null == t || (o && !K(t))
                                              ? e.removeAttribute(n)
                                              : e.setAttribute(n, o ? "" : t);
                                      }
                                  })(e, n, o, d));
                        },
                    },
                    ci
                );
            let ts;
            function os() {
                return ts || (ts = ir(ns));
            }
            function rs(e) {
                return e instanceof SVGElement
                    ? "svg"
                    : "function" == typeof MathMLElement && e instanceof MathMLElement
                    ? "mathml"
                    : void 0;
            }
            function is(e) {
                if (m(e)) {
                    return document.querySelector(e);
                }
                return e;
            }
            const ss = Lr(
                    "svg",
                    {
                        t: "1715233840752",
                        class: "w-full h-full",
                        viewBox: "0 0 1024 1024",
                        version: "1.1",
                        xmlns: "http://www.w3.org/2000/svg",
                        "p-id": "981",
                        width: "200",
                        height: "200",
                    },
                    [
                        Lr("path", {
                            d: "M832 810.666667H725.333333v-302.933334a2.858667 2.858667 0 0 0-5.589333-0.853333 128.042667 128.042667 0 0 1-129.28 90.282667A132.864 132.864 0 0 1 469.333333 462.08V426.666667a298.666667 298.666667 0 0 0-298.666666 298.666666v42.666667a170.666667 170.666667 0 0 0 170.666666 170.666667h152.704a42.453333 42.453333 0 0 1-24.704-38.4V853.333333h85.333334v46.933334a42.453333 42.453333 0 0 1-24.704 38.4h134.741333a42.453333 42.453333 0 0 1-24.704-38.4V853.333333h85.333333v46.933334a42.453333 42.453333 0 0 1-24.704 38.4H832a64 64 0 0 0 0-128zM554.666667 170.666667l-128 85.333333V94.165333a21.333333 21.333333 0 0 1 36.437333-15.061333zM640 170.666667l128 85.333333V94.165333a21.333333 21.333333 0 0 0-36.437333-15.061333z",
                            "p-id": "982",
                        }),
                        Lr("path", {
                            d: "M725.333333 170.666667h-298.666666v128a170.666667 170.666667 0 0 0 341.333333 0V170.666667z m-202.666666 149.333333a32 32 0 1 1 32-32 32 32 0 0 1-32 32z m160 0a32 32 0 1 1 32-32 32 32 0 0 1-32 32z",
                            "p-id": "983",
                        }),
                    ],
                    -1
                ),
                ls = ["onClick"],
                as = ["innerHTML"],
                cs = { class: "ml-2 w-16 text-sm leading-4" };
            class us {
                constructor() {
                    this.listener = {};
                }
                isPromise(e) {
                    return e?.then && "function" == typeof e?.then;
                }
                isArray(e) {
                    return "[object Array]" === Object.prototype.toString.call(e);
                }
                emitParamIsFunc(e) {
                    return !(!e || !this.isArray(e) || 1 !== e.length || "function" != typeof e[0]);
                }
                on(e, n) {
                    e &&
                        n &&
                        "function" == typeof n &&
                        (this.listener[e] && this.isArray(this.listener[e])
                            ? this.listener[e].push(n)
                            : (this.listener[e] = [n]));
                }
                emit(e, ...n) {
                    const t = this.listener[e];
                    t &&
                        this.isArray(t) &&
                        t.forEach((e) => {
                            if (!e || "function" != typeof e) return;
                            const t = this.emitParamIsFunc(n);
                            if (this.isPromise(e))
                                t ? e().then((e) => n[0] && "function" == typeof n[0] && n[0](e)) : e(...n);
                            else if (t) {
                                const t = e();
                                n[0] && "function" == typeof n[0] && n[0](t);
                            } else e(...n);
                        });
                }
            }
            const ds = (() => {
                    let e;
                    return () => (e || (e = new us()), e);
                })()(),
                ps = { class: "max-w-2xl min-w-fit bg-white rounded-md shadow-lg" },
                fs = {
                    class: "h-12 px-2 border-b flex items-center justify-between border-gray-300",
                },
                hs = { class: "text-base" },
                gs = [
                    Lr(
                        "svg",
                        {
                            t: "1715249520484",
                            class: "icon",
                            viewBox: "0 0 1024 1024",
                            version: "1.1",
                            xmlns: "http://www.w3.org/2000/svg",
                            "p-id": "1041",
                            width: "20",
                            height: "20",
                        },
                        [
                            Lr("path", {
                                d: "M567.192 513.223l209.774-209.774c15.55-15.551 15.55-40.763 0-56.313-15.551-15.55-40.762-15.55-56.313 0L510.879 456.91 301.104 247.136c-15.551-15.55-40.762-15.55-56.313 0-15.55 15.55-15.55 40.763 0 56.313l209.774 209.774-209.774 209.775c-15.55 15.55-15.55 40.763 0 56.313 7.775 7.775 17.966 11.663 28.157 11.663 10.191 0 20.381-3.887 28.157-11.663l209.774-209.774 209.774 209.774c7.776 7.776 17.965 11.663 28.157 11.663 10.189 0 20.382-3.889 28.157-11.663 15.55-15.55 15.55-40.763 0-56.313L567.192 513.223z",
                                fill: "",
                                "p-id": "1042",
                            }),
                        ],
                        -1
                    ),
                ],
                ms = { class: "w-full min-h-64" };
            const vs = Wt({
                name: "Dialog",
                props: {
                    show: { type: Boolean, default: !1 },
                    title: { type: String, default: "" },
                },
                setup: (e, n) => ({
                    dialogClick: (e) => {
                        const t = e.target;
                        Array.from(t.classList).includes("crab-dialog") && n.emit("update:show", !1);
                    },
                    close: () => {
                        n.emit("update:show", !1);
                    },
                }),
            });
            var ys = t(655);
            const ws = (0, ys.A)(vs, [
                    [
                        "render",
                        function (e, n, t, o, r, i) {
                            return e.show
                                ? (vr(),
                                  xr(
                                      "div",
                                      {
                                          key: 0,
                                          class: "crab-dialog absolute left-0 right-0 top-0 bottom-0 bg-opacity-60 bg-black flex items-center justify-center z-50 pointer-events-auto",
                                          onClick: n[1] || (n[1] = (...n) => e.dialogClick && e.dialogClick(...n)),
                                      },
                                      [
                                          Lr("div", ps, [
                                              Lr("div", fs, [
                                                  Lr("div", hs, Y(e.title), 1),
                                                  Lr(
                                                      "div",
                                                      {
                                                          class: "close-icon crab-icon",
                                                          onClick: n[0] || (n[0] = (...n) => e.close && e.close(...n)),
                                                      },
                                                      gs
                                                  ),
                                              ]),
                                              Lr("div", ms, [go(e.$slots, "default")]),
                                          ]),
                                      ]
                                  ))
                                : Fr("v-if", !0);
                        },
                    ],
                ]),
                bs = { class: "flex flex-col py-2 px-2 w-96" },
                _s = { class: "flex flex-col mb-2" },
                xs = Lr("label", { class: "text-sm mb-2 block" }, "请求地址:", -1),
                Ss = { class: "flex flex-col mb-2" },
                Cs = Lr("label", { class: "text-sm mb-2 block" }, "请求方式:", -1),
                ks = { class: "flex flex-col" },
                Es = Lr("label", { class: "text-sm mb-2 block" }, "请求参数:", -1);
            const Os = { class: "relative" },
                Ls = {
                    key: 0,
                    class: "absolute top-12 w-full bg-white shadow-lg rounded-md",
                },
                Ms = ["onClick"],
                Ts = {
                    __name: "Select",
                    props: { list: { type: Array }, value: { type: String } },
                    emits: ["update:title"],
                    setup(e, { emit: n }) {
                        const t = n,
                            o = _n(!1);
                        return (n, r) => (
                            vr(),
                            xr("div", Os, [
                                Lr(
                                    "div",
                                    {
                                        class: "w-full text-base rounded-md border py-1.5 px-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset active:ring-indigo-600 sm:text-sm sm:leading-6",
                                        onClick: r[0] || (r[0] = (e) => (o.value = !o.value)),
                                    },
                                    Y(e.value),
                                    1
                                ),
                                o.value
                                    ? (vr(),
                                      xr("ul", Ls, [
                                          (vr(!0),
                                          xr(
                                              dr,
                                              null,
                                              ho(
                                                  e.list,
                                                  (e) => (
                                                      vr(),
                                                      xr(
                                                          "li",
                                                          {
                                                              class: "py-2 px-2 w-full text-base hover:bg-slate-200 text-left rounded-md",
                                                              onClick: (n) =>
                                                                  ((e) => {
                                                                      t("update:value", e), (o.value = !1);
                                                                  })(e),
                                                          },
                                                          Y(e),
                                                          9,
                                                          Ms
                                                      )
                                                  )
                                              ),
                                              256
                                          )),
                                      ]))
                                    : Fr("v-if", !0),
                            ])
                        );
                    },
                },
                As = Wt({
                    components: { Select: Ts },
                    setup() {
                        const e = _n(""),
                            n = _n("POST"),
                            t = _n('{"name": "$name", "url": "$url"}');
                        return (
                            ro(() => {
                                ds.emit("getServerConfig", ({ url: o, method: r, params: i }) => {
                                    (e.value = o), (n.value = r), (t.value = i);
                                });
                            }),
                            ao(() => {
                                ds.emit("setServerConfig", {
                                    url: e.value,
                                    method: n.value,
                                    params: t.value,
                                });
                            }),
                            {
                                requestMethods: ["GET", "POST"],
                                requestMethod: n,
                                requestParams: t,
                                serverUrl: e,
                            }
                        );
                    },
                }),
                Ps = (0, ys.A)(As, [
                    [
                        "render",
                        function (e, n, t, o, r, i) {
                            const s = vt("Select");
                            return (
                                vr(),
                                xr("div", bs, [
                                    Lr("div", _s, [
                                        xs,
                                        At(
                                            Lr(
                                                "input",
                                                {
                                                    class: "w-full outline-none border rounded-md py-1.5 px-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6",
                                                    "onUpdate:modelValue": n[0] || (n[0] = (n) => (e.serverUrl = n)),
                                                    type: "text",
                                                    id: "input-group-1",
                                                    placeholder: "请输入请求地址",
                                                },
                                                null,
                                                512
                                            ),
                                            [[Xi, e.serverUrl]]
                                        ),
                                    ]),
                                    Lr("div", Ss, [
                                        Cs,
                                        Mr(
                                            s,
                                            {
                                                list: e.requestMethods,
                                                value: e.requestMethod,
                                                "onUpdate:value": n[1] || (n[1] = (n) => (e.requestMethod = n)),
                                            },
                                            null,
                                            8,
                                            ["list", "value"]
                                        ),
                                    ]),
                                    Lr("div", ks, [
                                        Es,
                                        At(
                                            Lr(
                                                "textarea",
                                                {
                                                    class: "w-full outline-none border rounded-md py-1.5 px-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6",
                                                    "onUpdate:modelValue":
                                                        n[2] || (n[2] = (n) => (e.requestParams = n)),
                                                    rows: "3",
                                                    id: "input-group-1",
                                                    placeholder: "请输入服务器地址",
                                                },
                                                null,
                                                512
                                            ),
                                            [[Xi, e.requestParams]]
                                        ),
                                    ]),
                                ])
                            );
                        },
                    ],
                ]),
                Fs = { class: "flex flex-col overflow-y-scroll max-h-96" },
                Vs = ["onClick"],
                Rs = { class: "tex-sm w-28" },
                Us = { class: "text-sm w-36" },
                js = ["onClick"];
            const zs = {
                    log(e) {
                        const n = [
                            `%c Crab %c ${e}`,
                            "padding: 2px 1px; border-radius: 0; color: #fff; background: #606060; font-weight: bold;",
                            "padding: 2px 5px 2px 2px; border-radius: 0; color: #fff; background: #AF8FE8; font-weight: bold;",
                        ];
                        console.log.apply(void 0, n);
                    },
                    addStyle(e) {
                        let n = document.createElement("style");
                        (n.innerHTML = e), document.documentElement.appendChild(n);
                    },
                    getValue: async (e, n) =>
                        await ("function" == typeof GM_getValue ? GM_getValue : GM.getValue)(e, n),
                    setValue: async (e, n) =>
                        await ("function" == typeof GM_setValue ? GM_setValue : GM.setValue)(e, n),
                    deleteValue: async (e) =>
                        await ("function" == typeof GM_deleteValue ? GM_deleteValue : GM.deleteValue)(e),
                    openInTab: (e, n = !1) => ("function" == typeof GM_openInTab ? GM_openInTab : GM.openInTab)(e, n),
                    message(e, n) {
                        this.notyf ||
                            (this.notyf = new Notyf({
                                duration: 1e3,
                                position: { x: "left", y: "top" },
                            })),
                            "success" === n ? this.notyf.success(e) : this.notyf.error(e);
                    },
                    xmlHttpRequest: (e) =>
                        ("function" == typeof GM_xmlhttpRequest ? GM_xmlhttpRequest : GM.xmlHttpRequest)(e),
                    params2QueryString(e) {
                        const n = new URLSearchParams();
                        for (const t in e)
                            "object" == typeof e[t] ? n.append(t, JSON.stringify(e[t])) : n.append(t, e[t]);
                        return n.toString();
                    },
                    sendDownloadToFFandown(e, n, t) {
                        return new Promise((o, r) => {
                            const i = JSON.stringify({ name: t, url: n });
                            this.xmlHttpRequest({
                                url: e + "/down",
                                method: "POST",
                                headers: { "content-type": "application/json" },
                                timeout: 3e3,
                                contentType: "application/json",
                                dataType: "json",
                                responseType: "json",
                                data: i,
                                onload(e) {
                                    const n = e.response;
                                    n && 0 === n.code ? zs.message("Send success") : zs.message("Send failed"), o();
                                },
                                onerror(e) {
                                    zs.message("Send failed: " + e.statusText), r(e);
                                },
                            });
                        });
                    },
                    sendDownloadRequest({ serverConfig: e, url: n, audioUrl: t, name: o }) {
                        const r = this;
                        return new Promise((i, s) => {
                            const l = e?.params
                                ?.replaceAll("$name", o)
                                ?.replaceAll("$url", n)
                                .replaceAll("$audioUrl", t);
                            let a;
                            try {
                                a = JSON.parse(l);
                            } catch (e) {
                                return zs.message("params config error"), void i();
                            }
                            this.xmlHttpRequest({
                                url: "POST" === e?.method ? e?.url : `${e?.url}?${r.params2QueryString(a)}`,
                                method: e?.method,
                                headers: { "content-type": "application/json" },
                                timeout: 3e3,
                                contentType: "application/json",
                                dataType: "json",
                                responseType: "json",
                                data: JSON.stringify(a),
                                onload(e) {
                                    const n = e.status;
                                    n && 200 === n ? zs.message("发送成功", "success") : zs.message("发送失败"), i();
                                },
                                onerror(e) {
                                    zs.message("发送失败: " + e.statusText), s(e);
                                },
                            });
                        });
                    },
                    copyText(e) {
                        var n = document.createElement("textarea");
                        (n.textContent = e),
                            document.body.appendChild(n),
                            n.select(),
                            document.execCommand("copy"),
                            n.blur(),
                            document.body.removeChild(n);
                    },
                    startListener() {
                        window.addEventListener("message", async (e) => {
                            if ("3j4t9uj349-gm-get-title" === e.data) {
                                let n = `top-title-${Date.now()}`;
                                await zs.setValue(n, document.title),
                                    e.source.postMessage(`3j4t9uj349-gm-top-title-name:${n}`, "*");
                            }
                        }),
                            document.addEventListener("DOMContentLoaded", function () {
                                const e = document.createElement("style");
                                (e.innerText =
                                    "@import url('https://file.helson-lin.cn/notyf/notyf.min.css'); .notyf {font-size: 12px !important;}"),
                                    document.body.append(e);
                            });
                    },
                    getTopTitle: () =>
                        new Promise((e) => {
                            window.addEventListener("message", async function n(t) {
                                if ("string" == typeof t.data && t.data.startsWith("3j4t9uj349-gm-top-title-name:")) {
                                    let o = t.data.slice(29);
                                    await new Promise((e) => setTimeout(e, 5)),
                                        e(await zs.getValue(o)),
                                        zs.deleteValue(o),
                                        window.removeEventListener("message", n);
                                }
                            }),
                                window.top.postMessage("3j4t9uj349-gm-get-title", "*");
                        }),
                    checkM3u8Content: ({ content: e }) => !!e.trim().startsWith("#EXTM3U"),
                    checkFileContent({ url: e, content: n }) {
                        if ([".mp4", ".avi", ".mov"].some((n) => e.endsWith(n))) return !0;
                        {
                            const e = n.match(/(https|http):\/\/[\w./-]+.(mp4|avi|mov)?[^\s"]+/g);
                            return (e && e.length) ?? !1;
                        }
                    },
                    checkBilibiContent({ url: e }) {
                        const n = new URL(e.startsWith("//") ? `https:${e}` : e);
                        return !!(n.origin + n.pathname).includes("/x/player/wbi/playurl");
                    },
                    parseBiliData(e) {
                        const n = [
                                { name: "超清 4K", range: [3840, 1 / 0] },
                                { name: "高清 1080P+", range: [1280, 3840] },
                                { name: "高清 1080P", range: [960, 1280] },
                                { name: "高清 720P", range: [640, 960] },
                                { name: "清晰 480P", range: [480, 640] },
                                { name: "流畅 360P", range: [0, 480] },
                            ],
                            t = e?.data?.dash?.audio
                                .filter((e) => ["mp4a.40.2"].includes(e?.codecs))
                                .sort((e, n) => n.bandwidth - e.bandwidth);
                        return e?.data?.dash?.video?.map((e) => {
                            const o = {},
                                r = n.find((n) => n.range[0] < e.width && e.width <= n.range[1])?.name ?? e.width,
                                i =
                                    ((s = e.codecs).startsWith("av01")
                                        ? "AV1"
                                        : s.startsWith("hev1")
                                        ? "H.265"
                                        : s.startsWith("avc1")
                                        ? "H.264"
                                        : s) ?? e.codecs;
                            var s;
                            return (
                                (o.duration = r + "/" + i),
                                (o.type = "M4S"),
                                (o.url = e.baseUrl),
                                (o.audioUrl = t?.[0]?.baseUrl),
                                o
                            );
                        });
                    },
                    getBilibiliVideo() {
                        const e = Array.from(window.document.scripts).find((e) =>
                            e.innerHTML.trim().startsWith("window.__playinfo__")
                        );
                        if (e) {
                            const n = e.innerHTML.replace("window.__playinfo__=", "");
                            try {
                                const e = JSON.parse(n);
                                return this.parseBiliData(e);
                            } catch (e) {
                                return [];
                            }
                        }
                    },
                },
                Ds = zs,
                Is = Wt({
                    setup() {
                        const e = _n([]);
                        ro(() => {
                            ds.emit("getMedia", (n) => {
                                e.value = n;
                            }),
                                ds.on("sendMedia", (n) => {
                                    e.value = n;
                                });
                        });
                        return {
                            sendDownload: (e, n) => {
                                ds.emit("sendDownload", { data: e, index: n });
                            },
                            copy: (e) => {
                                Ds.copyText(e), Ds.message("复制成功", "success");
                            },
                            mediaList: e,
                        };
                    },
                }),
                Ns = Wt({
                    components: {
                        Dialog: ws,
                        Setting: Ps,
                        MediaList: (0, ys.A)(Is, [
                            [
                                "render",
                                function (e, n, t, o, r, i) {
                                    return (
                                        vr(),
                                        xr("div", Fs, [
                                            (vr(!0),
                                            xr(
                                                dr,
                                                null,
                                                ho(
                                                    e.mediaList,
                                                    (n, t) => (
                                                        vr(),
                                                        xr(
                                                            "div",
                                                            {
                                                                class: "flex items-center border-b border-gray-300 py-2 hover:bg-slate-100",
                                                                key: t,
                                                            },
                                                            [
                                                                Fr(" url "),
                                                                Lr(
                                                                    "span",
                                                                    {
                                                                        class: "text-sm w-72 leading-4 px-2 flex-1 text-ellipsis overflow-hidden text-nowrap",
                                                                        onClick: (t) => e.copy(n.url),
                                                                    },
                                                                    Y(n.url),
                                                                    9,
                                                                    Vs
                                                                ),
                                                                Fr(" type "),
                                                                Lr("span", Rs, "类型: " + Y(n.type), 1),
                                                                Fr(" duration "),
                                                                Lr("span", Us, "时长: " + Y(n.duration), 1),
                                                                Lr(
                                                                    "button",
                                                                    {
                                                                        class: "px-2 py-1 bg-indigo-400 hover:bg-indigo-500 mx-2 outline-none rounded-md text-white",
                                                                        onClick: (o) => e.sendDownload(n, t),
                                                                    },
                                                                    "下载",
                                                                    8,
                                                                    js
                                                                ),
                                                            ]
                                                        )
                                                    )
                                                ),
                                                128
                                            )),
                                        ])
                                    );
                                },
                            ],
                        ]),
                    },
                    setup() {
                        const e = _n(!1),
                            n = _n(!1),
                            t = _n(!1),
                            o = _n(!1),
                            r = _n(null),
                            i = _n([
                                {
                                    name: "查看资源",
                                    icon: '<svg t="1715241176671" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2820" width="20" height="20"><path d="M792 64H120c-30.93 0-56 25.07-56 56v784c0 30.93 25.07 56 56 56h784c30.93 0 56-25.07 56-56V232H848c-30.93 0-56-25.07-56-56V64z" fill="#8C9EFF" p-id="2821"></path><path d="M302 64h420v308c0 15.46-12.54 28-28 28H330c-15.46 0-28-12.54-28-28V64z" fill="#FFFFFF" p-id="2822"></path><path d="M232 960h560V568c0-15.46-12.54-28-28-28H260c-15.46 0-28 12.54-28 28v392z" fill="#E1F5FF" p-id="2823"></path><path d="M330 756.38h364c15.46 0 28 12.54 28 28v14c0 15.46-12.54 28-28 28H330c-15.46 0-28-12.54-28-28v-14c0-15.47 12.54-28 28-28zM330 616.38h364c15.46 0 28 12.54 28 28s-12.54 28-28 28H330c-15.46 0-28-12.54-28-28 0-15.47 12.54-28 28-28z" fill="#FFD600" p-id="2824"></path><path d="M624 288h-14c-15.46 0-28-12.54-28-28v-56c0-15.46 12.54-28 28-28h14c15.46 0 28 12.54 28 28v56c0 15.46-12.54 28-28 28z" fill="#313FA0" p-id="2825"></path><path d="M792 64v112c0 30.93 25.07 56 56 56h112L792 64z" fill="#E1F5FF" p-id="2826"></path></svg>',
                                    code: "source",
                                    action() {
                                        (o.value = !0), (n.value = !1);
                                    },
                                },
                                {
                                    name: "设置",
                                    icon: '<svg t="1715241193610" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2986" width="20" height="20"><path d="M858.75 512c0-58.97 44.19-107.53 101.25-114.6-10.91-42.77-27.84-83.1-49.74-120.16-19.48 14.95-43.78 23.94-70.24 23.94-63.83 0-115.58-51.75-115.58-115.58 0-26.67 9.13-51.16 24.3-70.72C711.14 92.41 670.12 75.1 626.6 64c-7.08 57.05-55.63 101.25-114.6 101.25-58.97 0-107.53-44.19-114.6-101.25-42.86 10.93-83.27 27.91-120.4 49.87 14.2 19.2 22.7 42.87 22.7 68.58 0 63.84-51.75 115.58-115.58 115.58-25.93 0-49.79-8.64-69.07-23.07C92.5 312.64 75.13 353.77 64 397.4c57.06 7.07 101.25 55.63 101.25 114.6S121.06 619.53 64 626.6c10.98 43.07 28.07 83.68 50.19 120.96 19.71-15.62 44.58-25.01 71.67-25.01 63.84 0 115.58 51.75 115.58 115.58 0 27.1-9.4 51.97-25.01 71.68 37.28 22.12 77.89 39.21 120.96 50.19 7.07-57.05 55.63-101.25 114.6-101.25 58.97 0 107.53 44.19 114.6 101.25 43.44-11.08 84.39-28.35 121.93-50.75-12.89-18.64-20.47-41.23-20.47-65.61 0-63.84 51.75-115.58 115.58-115.58 24.38 0 46.96 7.59 65.61 20.47 22.4-37.54 39.67-78.49 50.75-121.93-57.04-7.07-101.24-55.63-101.24-114.6z" fill="#8C9EFF" p-id="2987"></path><path d="M512 512m-140 0a140 140 0 1 0 280 0 140 140 0 1 0-280 0Z" fill="#FFD600" p-id="2988"></path><path d="M512 680c-92.63 0-168-75.36-168-168 0-92.63 75.37-168 168-168s168 75.37 168 168c0 92.64-75.37 168-168 168z m0-280c-61.76 0-112 50.24-112 112s50.24 112 112 112 112-50.24 112-112-50.24-112-112-112z" fill="#FFFFFF" p-id="2989"></path></svg>',
                                    code: "setting",
                                    action() {
                                        (t.value = !0), (n.value = !1);
                                    },
                                },
                            ]);
                        return (
                            ro(() => {
                                !(function (e) {
                                    let n,
                                        t,
                                        o = !1;
                                    function r(r) {
                                        if ((r.preventDefault(), o)) {
                                            const o = r.touches[0];
                                            (e.style.left = o.clientX - n + "px"), (e.style.top = o.clientY - t + "px");
                                        }
                                    }
                                    function i(r) {
                                        r.preventDefault(),
                                            o &&
                                                ((e.style.left = r.clientX - n + "px"),
                                                (e.style.top = r.clientY - t + "px"));
                                    }
                                    function s() {
                                        (o = !1),
                                            e.removeEventListener("touchmove", r),
                                            e.removeEventListener("touchend", s);
                                    }
                                    function l() {
                                        (o = !1),
                                            document.removeEventListener("mousemove", i),
                                            document.removeEventListener("mouseup", l);
                                    }
                                    e.addEventListener("touchstart", function (i) {
                                        i.preventDefault(), (o = !0);
                                        const l = i.touches[0];
                                        (n = l.clientX - e.offsetLeft),
                                            (t = l.clientY - e.offsetTop),
                                            e.addEventListener("touchmove", r),
                                            e.addEventListener("touchend", s);
                                    }),
                                        e.addEventListener("mousedown", function (r) {
                                            r.preventDefault(),
                                                (o = !0),
                                                (n = r.clientX - e.offsetLeft),
                                                (t = r.clientY - e.offsetTop),
                                                document.addEventListener("mousemove", i),
                                                document.addEventListener("mouseup", l);
                                        });
                                })(r.value),
                                    ds.on("haveMedia", (n) => (e.value = n));
                            }),
                            {
                                fastBtns: i,
                                ffandownTool: e,
                                showFastBtn: n,
                                showSetting: t,
                                showResouce: o,
                                crabRef: r,
                                toggleBtn: () => (n.value = !n.value),
                            }
                        );
                    },
                }),
                $s = (0, ys.A)(Ns, [
                    [
                        "render",
                        function (e, n, t, o, r, i) {
                            const s = vt("MediaList"),
                                l = vt("Dialog"),
                                a = vt("Setting");
                            return (
                                vr(),
                                xr(
                                    "div",
                                    {
                                        id: "crab-root",
                                        class: "pointer-events-none",
                                        onKeydown: n[3] || (n[3] = es(() => {}, ["stop"])),
                                        onKeyup: n[4] || (n[4] = es(() => {}, ["stop"])),
                                    },
                                    [
                                        At(
                                            Lr(
                                                "div",
                                                {
                                                    ref: "crabRef",
                                                    class: "fixed right-4 bottom-4 w-12 h-12 bg-white rounded-full shadow-2xl shadow-black px-2 py-2 z-50 cursor-pointer pointer-events-auto",
                                                    style: { "z-index": "33199" },
                                                    onClick:
                                                        n[0] || (n[0] = (...n) => e.toggleBtn && e.toggleBtn(...n)),
                                                },
                                                [
                                                    ss,
                                                    Fr(" 查看资源/设置 "),
                                                    Lr(
                                                        "div",
                                                        {
                                                            class: W([
                                                                { show: e.showFastBtn },
                                                                "flex flex-col rounded-md absolute right-16 bottom-0 z-50 bg-white opacity-0 shadow-2xl shadow-black",
                                                            ]),
                                                        },
                                                        [
                                                            (vr(!0),
                                                            xr(
                                                                dr,
                                                                null,
                                                                ho(
                                                                    e.fastBtns,
                                                                    (e) => (
                                                                        vr(),
                                                                        xr(
                                                                            "div",
                                                                            {
                                                                                class: "w-full flex items-center px-2 py-1 cursor-pointer rounded-md hover:bg-slate-100",
                                                                                key: e.code,
                                                                                onClick: es(e?.action, ["stop"]),
                                                                            },
                                                                            [
                                                                                Lr(
                                                                                    "span",
                                                                                    {
                                                                                        class: "w-4 h-4 mb-1",
                                                                                        innerHTML: e.icon,
                                                                                    },
                                                                                    null,
                                                                                    8,
                                                                                    as
                                                                                ),
                                                                                Lr("span", cs, Y(e.name), 1),
                                                                            ],
                                                                            8,
                                                                            ls
                                                                        )
                                                                    )
                                                                ),
                                                                128
                                                            )),
                                                        ],
                                                        2
                                                    ),
                                                ],
                                                512
                                            ),
                                            [[Ti, e.ffandownTool]]
                                        ),
                                        Mr(
                                            l,
                                            {
                                                show: e.showResouce,
                                                "onUpdate:show": n[1] || (n[1] = (n) => (e.showResouce = n)),
                                                title: "资源",
                                            },
                                            { default: ut(() => [Mr(s)]), _: 1 },
                                            8,
                                            ["show"]
                                        ),
                                        Mr(
                                            l,
                                            {
                                                show: e.showSetting,
                                                "onUpdate:show": n[2] || (n[2] = (n) => (e.showSetting = n)),
                                                title: "设置",
                                            },
                                            { default: ut(() => [Mr(a)]), _: 1 },
                                            8,
                                            ["show"]
                                        ),
                                    ],
                                    32
                                )
                            );
                        },
                    ],
                ]);
            const Bs = class {
                handlers = [
                    { match: Ds.checkM3u8Content, handle: this.handlerM3u8 },
                    { match: Ds.checkFileContent, handle: this.handlerVideo },
                    { match: Ds.checkBilibiContent, handle: this.handlerBilibili },
                ];
                backendConfig;
                list = [];
                start() {
                    Ds.log("Started"), this.intercept(this.contentResolver), this.autoCheckWebsite(), this.listenMsg();
                }
                intercept(e) {
                    const n = this,
                        t = e && "function" == typeof e,
                        o = unsafeWindow.Response.prototype.text;
                    unsafeWindow.Response.prototype.text = function () {
                        return new Promise((r, i) => {
                            o.call(this)
                                .then((o) => {
                                    r(o), t && e.bind(n, { url: this.url, content: o })();
                                })
                                .catch(i);
                        });
                    };
                    const r = unsafeWindow.XMLHttpRequest.prototype.open;
                    unsafeWindow.XMLHttpRequest.prototype.open = function (...o) {
                        return (
                            this.addEventListener("load", () => {
                                try {
                                    if (!["", "json"].includes(this.responseType)) return;
                                    let r = this.responseText;
                                    t && e.bind(n, { url: o[1], content: r })();
                                } catch (e) {}
                            }),
                            r.apply(this, o)
                        );
                    };
                }
                contentResolver({ content: e, url: n }) {
                    const t = this.handlers.filter((t) => t.match({ content: e, url: n }));
                    t.forEach((t) => t.handle.bind(this, { content: e, url: n })());
                }
                addMedia({ url: e, type: n, duration: t, audioUrl: o }) {
                    -1 !== this.list.findIndex((n) => n?.url && n?.url === e) ||
                        (0 === this.list.length && ds.emit("haveMedia", !0),
                        this.list.push({ url: e, type: n, duration: t, audioUrl: o }),
                        ds.emit("sendMedia", this.list));
                }
                async handlerM3u8({ content: e, url: n }) {
                    if (!n || !n.startsWith("http")) return;
                    (n = new URL(n)), (e = e || (await (await fetch(n)).text()));
                    const t = new m3u8Parser.Parser();
                    t.push(e), t.end();
                    const o = t.manifest;
                    if (o.segments) {
                        let e = 0;
                        o.segments.forEach((n) => {
                            e += n.duration;
                        }),
                            (o.duration = e);
                    }
                    const r = {
                        type: "m3u8",
                        url: n.href,
                        duration: o.duration
                            ? Math.ceil((10 * o.duration) / 60) / 10 + " mins"
                            : o.playlists
                            ? `多(Multi)(${o.playlists.length})`
                            : "未知(unknown)",
                    };
                    this.addMedia(r);
                }
                async handlerBilibili({ content: e, url: n }) {
                    console.log("bilibili", e, n);
                }
                async handlerVideo({ content: e, url: n }) {
                    const t = e.match(/(https|http):\/\/[\w./-]+.(mp4|avi|mov)/g);
                    t &&
                        Array.isArray(t) &&
                        t.forEach((e) => {
                            const n = { type: "MP4", url: e, duration: "未知" };
                            this.addMedia(n);
                        });
                }
                listenMsg() {
                    Ds.startListener(),
                        Ds.getValue("ffandownConfig").then((e) => {
                            this.backendConfig = JSON.parse(e);
                        }),
                        ds.on("getServerConfig", () => this.backendConfig),
                        ds.on("sendDownload", ({ data: e, index: n }) => {
                            Ds.getTopTitle()
                                .then((t) => {
                                    this.backendConfig?.url && this.backendConfig?.params
                                        ? Ds.sendDownloadRequest({
                                              serverConfig: this.backendConfig,
                                              url: e.url,
                                              name: t + "-" + (n + 1),
                                              audioUrl: e?.audioUrl,
                                          })
                                        : Ds.message("Please Set Server Url And Params First");
                                })
                                .catch((e) => console.error(e));
                        }),
                        ds.on("getMedia", () => this.list),
                        ds.on("setServerConfig", (e) => {
                            Ds.setValue("ffandownConfig", JSON.stringify(e)), (this.backendConfig = e);
                        });
                }
                autoCheckWebsite() {
                    const e = window.location.origin,
                        n = window.location.pathname,
                        t = this;
                    new RegExp("https://www.bilibili.com/video/[a-zA-Z0-9]+/").test(e + n) &&
                        document.addEventListener("DOMContentLoaded", function () {
                            Ds.getBilibiliVideo().forEach((e) => t.addMedia(e));
                        });
                }
            };
            new (class {
                crab;
                constructor() {
                    this.init(), this.initCrab();
                }
                init() {
                    this.createShadowDom();
                }
                initCrab() {
                    (this.crab = new Bs()), this.crab.start();
                }
                createShadowDom() {
                    const e = document.createElement("div");
                    document.documentElement.appendChild(e);
                    const n = e.attachShadow({ mode: "open" });
                    ((...e) => {
                        const n = os().createApp(...e),
                            { mount: t } = n;
                        return (
                            (n.mount = (e) => {
                                const o = is(e);
                                if (!o) return;
                                const r = n._component;
                                g(r) || r.render || r.template || (r.template = o.innerHTML), (o.innerHTML = "");
                                const i = t(o, !1, rs(o));
                                return (
                                    o instanceof Element &&
                                        (o.removeAttribute("v-cloak"), o.setAttribute("data-v-app", "")),
                                    i
                                );
                            }),
                            n
                        );
                    })($s).mount(n),
                        e.shadowRoot.appendChild(document.createElement("style")),
                        (n.querySelector("style").innerHTML = `*, ::before, ::after {
                                    --tw-border-spacing-x: 0;
                                    --tw-border-spacing-y: 0;
                                    --tw-translate-x: 0;
                                    --tw-translate-y: 0;
                                    --tw-rotate: 0;
                                    --tw-skew-x: 0;
                                    --tw-skew-y: 0;
                                    --tw-scale-x: 1;
                                    --tw-scale-y: 1;
                                    --tw-pan-x:  ;
                                    --tw-pan-y:  ;
                                    --tw-pinch-zoom:  ;
                                    --tw-scroll-snap-strictness: proximity;
                                    --tw-gradient-from-position:  ;
                                    --tw-gradient-via-position:  ;
                                    --tw-gradient-to-position:  ;
                                    --tw-ordinal:  ;
                                    --tw-slashed-zero:  ;
                                    --tw-numeric-figure:  ;
                                    --tw-numeric-spacing:  ;
                                    --tw-numeric-fraction:  ;
                                    --tw-ring-inset:  ;
                                    --tw-ring-offset-width: 0px;
                                    --tw-ring-offset-color: #fff;
                                    --tw-ring-color: rgb(59 130 246 / 0.5);
                                    --tw-ring-offset-shadow: 0 0 #0000;
                                    --tw-ring-shadow: 0 0 #0000;
                                    --tw-shadow: 0 0 #0000;
                                    --tw-shadow-colored: 0 0 #0000;
                                    --tw-blur:  ;
                                    --tw-brightness:  ;
                                    --tw-contrast:  ;
                                    --tw-grayscale:  ;
                                    --tw-hue-rotate:  ;
                                    --tw-invert:  ;
                                    --tw-saturate:  ;
                                    --tw-sepia:  ;
                                    --tw-drop-shadow:  ;
                                    --tw-backdrop-blur:  ;
                                    --tw-backdrop-brightness:  ;
                                    --tw-backdrop-contrast:  ;
                                    --tw-backdrop-grayscale:  ;
                                    --tw-backdrop-hue-rotate:  ;
                                    --tw-backdrop-invert:  ;
                                    --tw-backdrop-opacity:  ;
                                    --tw-backdrop-saturate:  ;
                                    --tw-backdrop-sepia:  ;
                                    --tw-contain-size:  ;
                                    --tw-contain-layout:  ;
                                    --tw-contain-paint:  ;
                                    --tw-contain-style:  ;
                                    }

                                    ::backdrop {
                                    --tw-border-spacing-x: 0;
                                    --tw-border-spacing-y: 0;
                                    --tw-translate-x: 0;
                                    --tw-translate-y: 0;
                                    --tw-rotate: 0;
                                    --tw-skew-x: 0;
                                    --tw-skew-y: 0;
                                    --tw-scale-x: 1;
                                    --tw-scale-y: 1;
                                    --tw-pan-x:  ;
                                    --tw-pan-y:  ;
                                    --tw-pinch-zoom:  ;
                                    --tw-scroll-snap-strictness: proximity;
                                    --tw-gradient-from-position:  ;
                                    --tw-gradient-via-position:  ;
                                    --tw-gradient-to-position:  ;
                                    --tw-ordinal:  ;
                                    --tw-slashed-zero:  ;
                                    --tw-numeric-figure:  ;
                                    --tw-numeric-spacing:  ;
                                    --tw-numeric-fraction:  ;
                                    --tw-ring-inset:  ;
                                    --tw-ring-offset-width: 0px;
                                    --tw-ring-offset-color: #fff;
                                    --tw-ring-color: rgb(59 130 246 / 0.5);
                                    --tw-ring-offset-shadow: 0 0 #0000;
                                    --tw-ring-shadow: 0 0 #0000;
                                    --tw-shadow: 0 0 #0000;
                                    --tw-shadow-colored: 0 0 #0000;
                                    --tw-blur:  ;
                                    --tw-brightness:  ;
                                    --tw-contrast:  ;
                                    --tw-grayscale:  ;
                                    --tw-hue-rotate:  ;
                                    --tw-invert:  ;
                                    --tw-saturate:  ;
                                    --tw-sepia:  ;
                                    --tw-drop-shadow:  ;
                                    --tw-backdrop-blur:  ;
                                    --tw-backdrop-brightness:  ;
                                    --tw-backdrop-contrast:  ;
                                    --tw-backdrop-grayscale:  ;
                                    --tw-backdrop-hue-rotate:  ;
                                    --tw-backdrop-invert:  ;
                                    --tw-backdrop-opacity:  ;
                                    --tw-backdrop-saturate:  ;
                                    --tw-backdrop-sepia:  ;
                                    --tw-contain-size:  ;
                                    --tw-contain-layout:  ;
                                    --tw-contain-paint:  ;
                                    --tw-contain-style:  ;
                                    }

                                    /*
                                    ! tailwindcss v3.4.13 | MIT License | https://tailwindcss.com
                                    */

                                    /*
                                    1. Prevent padding and border from affecting element width. (https://github.com/mozdevs/cssremedy/issues/4)
                                    2. Allow adding a border to an element by just adding a border-width. (https://github.com/tailwindcss/tailwindcss/pull/116)
                                    */

                                    *,
                                    ::before,
                                    ::after {
                                    box-sizing: border-box;
                                    /* 1 */
                                    border-width: 0;
                                    /* 2 */
                                    border-style: solid;
                                    /* 2 */
                                    border-color: #e5e7eb;
                                    /* 2 */
                                    }

                                    ::before,
                                    ::after {
                                    --tw-content: '';
                                    }

                                    /*
                                    1. Use a consistent sensible line-height in all browsers.
                                    2. Prevent adjustments of font size after orientation changes in iOS.
                                    3. Use a more readable tab size.
                                    4. Use the user's configured "sans" font-family by default.
                                    5. Use the user's configured "sans" font-feature-settings by default.
                                    6. Use the user's configured "sans" font-variation-settings by default.
                                    7. Disable tap highlights on iOS
                                    */

                                    html,
                                    :host {
                                    line-height: 1.5;
                                    /* 1 */
                                    -webkit-text-size-adjust: 100%;
                                    /* 2 */
                                    -moz-tab-size: 4;
                                    /* 3 */
                                    -o-tab-size: 4;
                                        tab-size: 4;
                                    /* 3 */
                                    font-family: ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
                                    /* 4 */
                                    font-feature-settings: normal;
                                    /* 5 */
                                    font-variation-settings: normal;
                                    /* 6 */
                                    -webkit-tap-highlight-color: transparent;
                                    /* 7 */
                                    }

                                    /*
                                    1. Remove the margin in all browsers.
                                    2. Inherit line-height from "html" so users can set them as a class directly on the "html" element.
                                    */

                                    body {
                                    margin: 0;
                                    /* 1 */
                                    line-height: inherit;
                                    /* 2 */
                                    }

                                    /*
                                    1. Add the correct height in Firefox.
                                    2. Correct the inheritance of border color in Firefox. (https://bugzilla.mozilla.org/show_bug.cgi?id=190655)
                                    3. Ensure horizontal rules are visible by default.
                                    */

                                    hr {
                                    height: 0;
                                    /* 1 */
                                    color: inherit;
                                    /* 2 */
                                    border-top-width: 1px;
                                    /* 3 */
                                    }

                                    /*
                                    Add the correct text decoration in Chrome, Edge, and Safari.
                                    */

                                    abbr:where([title]) {
                                    -webkit-text-decoration: underline dotted;
                                            text-decoration: underline dotted;
                                    }

                                    /*
                                    Remove the default font size and weight for headings.
                                    */

                                    h1,
                                    h2,
                                    h3,
                                    h4,
                                    h5,
                                    h6 {
                                    font-size: inherit;
                                    font-weight: inherit;
                                    }

                                    /*
                                    Reset links to optimize for opt-in styling instead of opt-out.
                                    */

                                    a {
                                    color: inherit;
                                    text-decoration: inherit;
                                    }

                                    /*
                                    Add the correct font weight in Edge and Safari.
                                    */

                                    b,
                                    strong {
                                    font-weight: bolder;
                                    }

                                    /*
                                    1. Use the user's configured "mono" font-family by default.
                                    2. Use the user's configured "mono" font-feature-settings by default.
                                    3. Use the user's configured "mono" font-variation-settings by default.
                                    4. Correct the odd "em" font sizing in all browsers.
                                    */

                                    code,
                                    kbd,
                                    samp,
                                    pre {
                                    font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
                                    /* 1 */
                                    font-feature-settings: normal;
                                    /* 2 */
                                    font-variation-settings: normal;
                                    /* 3 */
                                    font-size: 1em;
                                    /* 4 */
                                    }

                                    /*
                                    Add the correct font size in all browsers.
                                    */

                                    small {
                                    font-size: 80%;
                                    }

                                    /*
                                    Prevent "sub" and "sup" elements from affecting the line height in all browsers.
                                    */

                                    sub,
                                    sup {
                                    font-size: 75%;
                                    line-height: 0;
                                    position: relative;
                                    vertical-align: baseline;
                                    }

                                    sub {
                                    bottom: -0.25em;
                                    }

                                    sup {
                                    top: -0.5em;
                                    }

                                    /*
                                    1. Remove text indentation from table contents in Chrome and Safari. (https://bugs.chromium.org/p/chromium/issues/detail?id=999088, https://bugs.webkit.org/show_bug.cgi?id=201297)
                                    2. Correct table border color inheritance in all Chrome and Safari. (https://bugs.chromium.org/p/chromium/issues/detail?id=935729, https://bugs.webkit.org/show_bug.cgi?id=195016)
                                    3. Remove gaps between table borders by default.
                                    */

                                    table {
                                    text-indent: 0;
                                    /* 1 */
                                    border-color: inherit;
                                    /* 2 */
                                    border-collapse: collapse;
                                    /* 3 */
                                    }

                                    /*
                                    1. Change the font styles in all browsers.
                                    2. Remove the margin in Firefox and Safari.
                                    3. Remove default padding in all browsers.
                                    */

                                    button,
                                    input,
                                    optgroup,
                                    select,
                                    textarea {
                                    font-family: inherit;
                                    /* 1 */
                                    font-feature-settings: inherit;
                                    /* 1 */
                                    font-variation-settings: inherit;
                                    /* 1 */
                                    font-size: 100%;
                                    /* 1 */
                                    font-weight: inherit;
                                    /* 1 */
                                    line-height: inherit;
                                    /* 1 */
                                    letter-spacing: inherit;
                                    /* 1 */
                                    color: inherit;
                                    /* 1 */
                                    margin: 0;
                                    /* 2 */
                                    padding: 0;
                                    /* 3 */
                                    }

                                    /*
                                    Remove the inheritance of text transform in Edge and Firefox.
                                    */

                                    button,
                                    select {
                                    text-transform: none;
                                    }

                                    /*
                                    1. Correct the inability to style clickable types in iOS and Safari.
                                    2. Remove default button styles.
                                    */

                                    button,
                                    input:where([type='button']),
                                    input:where([type='reset']),
                                    input:where([type='submit']) {
                                    -webkit-appearance: button;
                                    /* 1 */
                                    background-color: transparent;
                                    /* 2 */
                                    background-image: none;
                                    /* 2 */
                                    }

                                    /*
                                    Use the modern Firefox focus style for all focusable elements.
                                    */

                                    :-moz-focusring {
                                    outline: auto;
                                    }

                                    /*
                                    Remove the additional ":invalid" styles in Firefox. (https://github.com/mozilla/gecko-dev/blob/2f9eacd9d3d995c937b4251a5557d95d494c9be1/layout/style/res/forms.css#L728-L737)
                                    */

                                    :-moz-ui-invalid {
                                    box-shadow: none;
                                    }

                                    /*
                                    Add the correct vertical alignment in Chrome and Firefox.
                                    */

                                    progress {
                                    vertical-align: baseline;
                                    }

                                    /*
                                    Correct the cursor style of increment and decrement buttons in Safari.
                                    */

                                    ::-webkit-inner-spin-button,
                                    ::-webkit-outer-spin-button {
                                    height: auto;
                                    }

                                    /*
                                    1. Correct the odd appearance in Chrome and Safari.
                                    2. Correct the outline style in Safari.
                                    */

                                    [type='search'] {
                                    -webkit-appearance: textfield;
                                    /* 1 */
                                    outline-offset: -2px;
                                    /* 2 */
                                    }

                                    /*
                                    Remove the inner padding in Chrome and Safari on macOS.
                                    */

                                    ::-webkit-search-decoration {
                                    -webkit-appearance: none;
                                    }

                                    /*
                                    1. Correct the inability to style clickable types in iOS and Safari.
                                    2. Change font properties to "inherit" in Safari.
                                    */

                                    ::-webkit-file-upload-button {
                                    -webkit-appearance: button;
                                    /* 1 */
                                    font: inherit;
                                    /* 2 */
                                    }

                                    /*
                                    Add the correct display in Chrome and Safari.
                                    */

                                    summary {
                                    display: list-item;
                                    }

                                    /*
                                    Removes the default spacing and border for appropriate elements.
                                    */

                                    blockquote,
                                    dl,
                                    dd,
                                    h1,
                                    h2,
                                    h3,
                                    h4,
                                    h5,
                                    h6,
                                    hr,
                                    figure,
                                    p,
                                    pre {
                                    margin: 0;
                                    }

                                    fieldset {
                                    margin: 0;
                                    padding: 0;
                                    }

                                    legend {
                                    padding: 0;
                                    }

                                    ol,
                                    ul,
                                    menu {
                                    list-style: none;
                                    margin: 0;
                                    padding: 0;
                                    }

                                    /*
                                    Reset default styling for dialogs.
                                    */

                                    dialog {
                                    padding: 0;
                                    }

                                    /*
                                    Prevent resizing textareas horizontally by default.
                                    */

                                    textarea {
                                    resize: vertical;
                                    }

                                    /*
                                    1. Reset the default placeholder opacity in Firefox. (https://github.com/tailwindlabs/tailwindcss/issues/3300)
                                    2. Set the default placeholder color to the user's configured gray 400 color.
                                    */

                                    input::-moz-placeholder, textarea::-moz-placeholder {
                                    opacity: 1;
                                    /* 1 */
                                    color: #9ca3af;
                                    /* 2 */
                                    }

                                    input::placeholder,
                                    textarea::placeholder {
                                    opacity: 1;
                                    /* 1 */
                                    color: #9ca3af;
                                    /* 2 */
                                    }

                                    /*
                                    Set the default cursor for buttons.
                                    */

                                    button,
                                    [role="button"] {
                                    cursor: pointer;
                                    }

                                    /*
                                    Make sure disabled buttons don't get the pointer cursor.
                                    */

                                    :disabled {
                                    cursor: default;
                                    }

                                    /*
                                    1. Make replaced elements "display: block" by default. (https://github.com/mozdevs/cssremedy/issues/14)
                                    2. Add "vertical-align: middle" to align replaced elements more sensibly by default. (https://github.com/jensimmons/cssremedy/issues/14#issuecomment-634934210)
                                    This can trigger a poorly considered lint error in some tools but is included by design.
                                    */

                                    img,
                                    svg,
                                    video,
                                    canvas,
                                    audio,
                                    iframe,
                                    embed,
                                    object {
                                    display: block;
                                    /* 1 */
                                    vertical-align: middle;
                                    /* 2 */
                                    }

                                    /*
                                    Constrain images and videos to the parent width and preserve their intrinsic aspect ratio. (https://github.com/mozdevs/cssremedy/issues/14)
                                    */

                                    img,
                                    video {
                                    max-width: 100%;
                                    height: auto;
                                    }

                                    /* Make elements with the HTML hidden attribute stay hidden by default */

                                    [hidden] {
                                    display: none;
                                    }

                                    .pointer-events-none {
                                    pointer-events: none;
                                    }

                                    .pointer-events-auto {
                                    pointer-events: auto;
                                    }

                                    .fixed {
                                    position: fixed;
                                    }

                                    .absolute {
                                    position: absolute;
                                    }

                                    .relative {
                                    position: relative;
                                    }

                                    .bottom-0 {
                                    bottom: 0px;
                                    }

                                    .bottom-4 {
                                    bottom: 1rem;
                                    }

                                    .left-0 {
                                    left: 0px;
                                    }

                                    .right-0 {
                                    right: 0px;
                                    }

                                    .right-16 {
                                    right: 4rem;
                                    }

                                    .right-4 {
                                    right: 1rem;
                                    }

                                    .top-0 {
                                    top: 0px;
                                    }

                                    .top-12 {
                                    top: 3rem;
                                    }

                                    .z-50 {
                                    z-index: 50;
                                    }

                                    .mx-2 {
                                    margin-left: 0.5rem;
                                    margin-right: 0.5rem;
                                    }

                                    .mb-1 {
                                    margin-bottom: 0.25rem;
                                    }

                                    .mb-2 {
                                    margin-bottom: 0.5rem;
                                    }

                                    .ml-2 {
                                    margin-left: 0.5rem;
                                    }

                                    .block {
                                    display: block;
                                    }

                                    .flex {
                                    display: flex;
                                    }

                                    .h-12 {
                                    height: 3rem;
                                    }

                                    .h-4 {
                                    height: 1rem;
                                    }

                                    .h-full {
                                    height: 100%;
                                    }

                                    .max-h-96 {
                                    max-height: 24rem;
                                    }

                                    .min-h-64 {
                                    min-height: 16rem;
                                    }

                                    .w-12 {
                                    width: 3rem;
                                    }

                                    .w-16 {
                                    width: 4rem;
                                    }

                                    .w-28 {
                                    width: 7rem;
                                    }

                                    .w-36 {
                                    width: 9rem;
                                    }

                                    .w-4 {
                                    width: 1rem;
                                    }

                                    .w-72 {
                                    width: 18rem;
                                    }

                                    .w-96 {
                                    width: 24rem;
                                    }

                                    .w-full {
                                    width: 100%;
                                    }

                                    .min-w-fit {
                                    min-width: -moz-fit-content;
                                    min-width: fit-content;
                                    }

                                    .max-w-2xl {
                                    max-width: 42rem;
                                    }

                                    .flex-1 {
                                    flex: 1 1 0%;
                                    }

                                    .cursor-pointer {
                                    cursor: pointer;
                                    }

                                    .flex-col {
                                    flex-direction: column;
                                    }

                                    .items-center {
                                    align-items: center;
                                    }

                                    .justify-center {
                                    justify-content: center;
                                    }

                                    .justify-between {
                                    justify-content: space-between;
                                    }

                                    .overflow-hidden {
                                    overflow: hidden;
                                    }

                                    .overflow-y-scroll {
                                    overflow-y: scroll;
                                    }

                                    .text-ellipsis {
                                    text-overflow: ellipsis;
                                    }

                                    .text-nowrap {
                                    text-wrap: nowrap;
                                    }

                                    .rounded-full {
                                    border-radius: 9999px;
                                    }

                                    .rounded-md {
                                    border-radius: 0.375rem;
                                    }

                                    .border {
                                    border-width: 1px;
                                    }

                                    .border-b {
                                    border-bottom-width: 1px;
                                    }

                                    .border-gray-300 {
                                    --tw-border-opacity: 1;
                                    border-color: rgb(209 213 219 / var(--tw-border-opacity));
                                    }

                                    .bg-black {
                                    --tw-bg-opacity: 1;
                                    background-color: rgb(0 0 0 / var(--tw-bg-opacity));
                                    }

                                    .bg-indigo-400 {
                                    --tw-bg-opacity: 1;
                                    background-color: rgb(129 140 248 / var(--tw-bg-opacity));
                                    }

                                    .bg-white {
                                    --tw-bg-opacity: 1;
                                    background-color: rgb(255 255 255 / var(--tw-bg-opacity));
                                    }

                                    .bg-opacity-60 {
                                    --tw-bg-opacity: 0.6;
                                    }

                                    .px-1\.5 {
                                    padding-left: 0.375rem;
                                    padding-right: 0.375rem;
                                    }

                                    .px-2 {
                                    padding-left: 0.5rem;
                                    padding-right: 0.5rem;
                                    }

                                    .py-1 {
                                    padding-top: 0.25rem;
                                    padding-bottom: 0.25rem;
                                    }

                                    .py-1\.5 {
                                    padding-top: 0.375rem;
                                    padding-bottom: 0.375rem;
                                    }

                                    .py-2 {
                                    padding-top: 0.5rem;
                                    padding-bottom: 0.5rem;
                                    }

                                    .text-left {
                                    text-align: left;
                                    }

                                    .text-base {
                                    font-size: 1rem;
                                    line-height: 1.5rem;
                                    }

                                    .text-sm {
                                    font-size: 0.875rem;
                                    line-height: 1.25rem;
                                    }

                                    .leading-4 {
                                    line-height: 1rem;
                                    }

                                    .text-gray-900 {
                                    --tw-text-opacity: 1;
                                    color: rgb(17 24 39 / var(--tw-text-opacity));
                                    }

                                    .text-white {
                                    --tw-text-opacity: 1;
                                    color: rgb(255 255 255 / var(--tw-text-opacity));
                                    }

                                    .opacity-0 {
                                    opacity: 0;
                                    }

                                    .shadow-2xl {
                                    --tw-shadow: 0 25px 50px -12px rgb(0 0 0 / 0.25);
                                    --tw-shadow-colored: 0 25px 50px -12px var(--tw-shadow-color);
                                    box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
                                    }

                                    .shadow-lg {
                                    --tw-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
                                    --tw-shadow-colored: 0 10px 15px -3px var(--tw-shadow-color), 0 4px 6px -4px var(--tw-shadow-color);
                                    box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
                                    }

                                    .shadow-black {
                                    --tw-shadow-color: #000;
                                    --tw-shadow: var(--tw-shadow-colored);
                                    }

                                    .outline-none {
                                    outline: 2px solid transparent;
                                    outline-offset: 2px;
                                    }

                                    .ring-1 {
                                    --tw-ring-offset-shadow: var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color);
                                    --tw-ring-shadow: var(--tw-ring-inset) 0 0 0 calc(1px + var(--tw-ring-offset-width)) var(--tw-ring-color);
                                    box-shadow: var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow, 0 0 #0000);
                                    }

                                    .ring-inset {
                                    --tw-ring-inset: inset;
                                    }

                                    .ring-gray-300 {
                                    --tw-ring-opacity: 1;
                                    --tw-ring-color: rgb(209 213 219 / var(--tw-ring-opacity));
                                    }

                                    :host {
                                    --root-size: 14px;
                                    /* 默认值 */
                                    }

                                    @media (min-width: 768px) {
                                    :host {
                                        --root-size: 16px;
                                        /* PC 端的值 */
                                    }
                                    }

                                    #crab-root {
                                    color: #000;
                                    font-family: monospace, sans-serif;
                                    font-size: clac(var(--root-size) / 2);
                                    }

                                    .btn svg {
                                    width: 100%;
                                    height: 100%;
                                    }

                                    .crab-icon {
                                    display: flex;
                                    align-items: center;
                                    cursor: pointer;
                                    }

                                    #crab-root .crab-dialog .crab-dialog-inner .crab-dialog-inner-header .close-icon svg {
                                    fill: rgb(102, 114, 142);
                                    }

                                    .show {
                                    opacity: 1;
                                    transition: opacity 500ms ease-in-out;
                                    -webkit-transition: opacity 500ms ease-in-out;
                                    -moz-transition: opacity 500ms ease-in-out;
                                    -ms-transition: opacity 500ms ease-in-out;
                                    -o-transition: opacity 500ms ease-in-out;
                                    }

                                    .placeholder\:text-gray-400::-moz-placeholder {
                                    --tw-text-opacity: 1;
                                    color: rgb(156 163 175 / var(--tw-text-opacity));
                                    }

                                    .placeholder\:text-gray-400::placeholder {
                                    --tw-text-opacity: 1;
                                    color: rgb(156 163 175 / var(--tw-text-opacity));
                                    }

                                    .hover\:bg-indigo-500:hover {
                                    --tw-bg-opacity: 1;
                                    background-color: rgb(99 102 241 / var(--tw-bg-opacity));
                                    }

                                    .hover\:bg-slate-100:hover {
                                    --tw-bg-opacity: 1;
                                    background-color: rgb(241 245 249 / var(--tw-bg-opacity));
                                    }

                                    .hover\:bg-slate-200:hover {
                                    --tw-bg-opacity: 1;
                                    background-color: rgb(226 232 240 / var(--tw-bg-opacity));
                                    }

                                    .focus\:ring-2:focus {
                                    --tw-ring-offset-shadow: var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color);
                                    --tw-ring-shadow: var(--tw-ring-inset) 0 0 0 calc(2px + var(--tw-ring-offset-width)) var(--tw-ring-color);
                                    box-shadow: var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow, 0 0 #0000);
                                    }

                                    .focus\:ring-inset:focus {
                                    --tw-ring-inset: inset;
                                    }

                                    .focus\:ring-indigo-600:focus {
                                    --tw-ring-opacity: 1;
                                    --tw-ring-color: rgb(79 70 229 / var(--tw-ring-opacity));
                                    }

                                    .active\:ring-indigo-600:active {
                                    --tw-ring-opacity: 1;
                                    --tw-ring-color: rgb(79 70 229 / var(--tw-ring-opacity));
                                    }

                                    @media (min-width: 640px) {
                                    .sm\:text-sm {
                                        font-size: 0.875rem;
                                        line-height: 1.25rem;
                                    }

                                    .sm\:leading-6 {
                                        line-height: 1.5rem;
                                    }
                                    }
                                    `);
                }
            })();
        })();
})();
