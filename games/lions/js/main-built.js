/*!
 * jQuery JavaScript Library v2.0.3
 * http://jquery.com/
 *
 * Includes Sizzle.js
 * http://sizzlejs.com/
 *
 * Copyright 2005, 2013 jQuery Foundation, Inc. and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2013-07-03T13:30Z
 */

/*!
 * Sizzle CSS Selector Engine v1.9.4-pre
 * http://sizzlejs.com/
 *
 * Copyright 2013 jQuery Foundation, Inc. and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2013-06-03
 */

//     Underscore.js 1.5.2
//     http://underscorejs.org
//     (c) 2009-2013 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
//     Underscore may be freely distributed under the MIT license.

//     (c) 2010-2013 Jeremy Ashkenas, DocumentCloud Inc.
//     Backbone may be freely distributed under the MIT license.
//     For all details and documentation:
//     http://backbonejs.org

/*

 Copyright (C) 2011 by Yehuda Katz

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in
 all copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 THE SOFTWARE.

 */

/**
 * @license Handlebars hbs 0.4.0 - Alex Sexton, but Handlebars has it's own licensing junk
 *
 * Available via the MIT or new BSD license.
 * see: http://github.com/jrburke/require-cs for details on the plugin this was based off of
 */

(function (window, undefined) {
    function isArraylike(e) {
        var t = e.length, n = jQuery.type(e);
        return jQuery.isWindow(e) ? !1 : e.nodeType === 1 && t ? !0 : n === "array" || n !== "function" && (t === 0 || typeof t == "number" && t > 0 && t - 1 in e)
    }

    function createOptions(e) {
        var t = optionsCache[e] = {};
        return jQuery.each(e.match(core_rnotwhite) || [], function (e, n) {
            t[n] = !0
        }), t
    }

    function Data() {
        Object.defineProperty(this.cache = {}, 0, {get: function () {
            return{}
        }}), this.expando = jQuery.expando + Math.random()
    }

    function dataAttr(e, t, n) {
        var r;
        if (n === undefined && e.nodeType === 1) {
            r = "data-" + t.replace(rmultiDash, "-$1").toLowerCase(), n = e.getAttribute(r);
            if (typeof n == "string") {
                try {
                    n = n === "true" ? !0 : n === "false" ? !1 : n === "null" ? null : +n + "" === n ? +n : rbrace.test(n) ? JSON.parse(n) : n
                } catch (i) {
                }
                data_user.set(e, t, n)
            } else n = undefined
        }
        return n
    }

    function returnTrue() {
        return!0
    }

    function returnFalse() {
        return!1
    }

    function safeActiveElement() {
        try {
            return document.activeElement
        } catch (e) {
        }
    }

    function sibling(e, t) {
        while ((e = e[t]) && e.nodeType !== 1);
        return e
    }

    function winnow(e, t, n) {
        if (jQuery.isFunction(t))return jQuery.grep(e, function (e, r) {
            return!!t.call(e, r, e) !== n
        });
        if (t.nodeType)return jQuery.grep(e, function (e) {
            return e === t !== n
        });
        if (typeof t == "string") {
            if (isSimple.test(t))return jQuery.filter(t, e, n);
            t = jQuery.filter(t, e)
        }
        return jQuery.grep(e, function (e) {
            return core_indexOf.call(t, e) >= 0 !== n
        })
    }

    function manipulationTarget(e, t) {
        return jQuery.nodeName(e, "table") && jQuery.nodeName(t.nodeType === 1 ? t : t.firstChild, "tr") ? e.getElementsByTagName("tbody")[0] || e.appendChild(e.ownerDocument.createElement("tbody")) : e
    }

    function disableScript(e) {
        return e.type = (e.getAttribute("type") !== null) + "/" + e.type, e
    }

    function restoreScript(e) {
        var t = rscriptTypeMasked.exec(e.type);
        return t ? e.type = t[1] : e.removeAttribute("type"), e
    }

    function setGlobalEval(e, t) {
        var n = e.length, r = 0;
        for (; r < n; r++)data_priv.set(e[r], "globalEval", !t || data_priv.get(t[r], "globalEval"))
    }

    function cloneCopyEvent(e, t) {
        var n, r, i, s, o, u, a, f;
        if (t.nodeType !== 1)return;
        if (data_priv.hasData(e)) {
            s = data_priv.access(e), o = data_priv.set(t, s), f = s.events;
            if (f) {
                delete o.handle, o.events = {};
                for (i in f)for (n = 0, r = f[i].length; n < r; n++)jQuery.event.add(t, i, f[i][n])
            }
        }
        data_user.hasData(e) && (u = data_user.access(e), a = jQuery.extend({}, u), data_user.set(t, a))
    }

    function getAll(e, t) {
        var n = e.getElementsByTagName ? e.getElementsByTagName(t || "*") : e.querySelectorAll ? e.querySelectorAll(t || "*") : [];
        return t === undefined || t && jQuery.nodeName(e, t) ? jQuery.merge([e], n) : n
    }

    function fixInput(e, t) {
        var n = t.nodeName.toLowerCase();
        if (n === "input" && manipulation_rcheckableType.test(e.type))t.checked = e.checked; else if (n === "input" || n === "textarea")t.defaultValue = e.defaultValue
    }

    function vendorPropName(e, t) {
        if (t in e)return t;
        var n = t.charAt(0).toUpperCase() + t.slice(1), r = t, i = cssPrefixes.length;
        while (i--) {
            t = cssPrefixes[i] + n;
            if (t in e)return t
        }
        return r
    }

    function isHidden(e, t) {
        return e = t || e, jQuery.css(e, "display") === "none" || !jQuery.contains(e.ownerDocument, e)
    }

    function getStyles(e) {
        return window.getComputedStyle(e, null)
    }

    function showHide(e, t) {
        var n, r, i, s = [], o = 0, u = e.length;
        for (; o < u; o++) {
            r = e[o];
            if (!r.style)continue;
            s[o] = data_priv.get(r, "olddisplay"), n = r.style.display, t ? (!s[o] && n === "none" && (r.style.display = ""), r.style.display === "" && isHidden(r) && (s[o] = data_priv.access(r, "olddisplay", css_defaultDisplay(r.nodeName)))) : s[o] || (i = isHidden(r), (n && n !== "none" || !i) && data_priv.set(r, "olddisplay", i ? n : jQuery.css(r, "display")))
        }
        for (o = 0; o < u; o++) {
            r = e[o];
            if (!r.style)continue;
            if (!t || r.style.display === "none" || r.style.display === "")r.style.display = t ? s[o] || "" : "none"
        }
        return e
    }

    function setPositiveNumber(e, t, n) {
        var r = rnumsplit.exec(t);
        return r ? Math.max(0, r[1] - (n || 0)) + (r[2] || "px") : t
    }

    function augmentWidthOrHeight(e, t, n, r, i) {
        var s = n === (r ? "border" : "content") ? 4 : t === "width" ? 1 : 0, o = 0;
        for (; s < 4; s += 2)n === "margin" && (o += jQuery.css(e, n + cssExpand[s], !0, i)), r ? (n === "content" && (o -= jQuery.css(e, "padding" + cssExpand[s], !0, i)), n !== "margin" && (o -= jQuery.css(e, "border" + cssExpand[s] + "Width", !0, i))) : (o += jQuery.css(e, "padding" + cssExpand[s], !0, i), n !== "padding" && (o += jQuery.css(e, "border" + cssExpand[s] + "Width", !0, i)));
        return o
    }

    function getWidthOrHeight(e, t, n) {
        var r = !0, i = t === "width" ? e.offsetWidth : e.offsetHeight, s = getStyles(e), o = jQuery.support.boxSizing && jQuery.css(e, "boxSizing", !1, s) === "border-box";
        if (i <= 0 || i == null) {
            i = curCSS(e, t, s);
            if (i < 0 || i == null)i = e.style[t];
            if (rnumnonpx.test(i))return i;
            r = o && (jQuery.support.boxSizingReliable || i === e.style[t]), i = parseFloat(i) || 0
        }
        return i + augmentWidthOrHeight(e, t, n || (o ? "border" : "content"), r, s) + "px"
    }

    function css_defaultDisplay(e) {
        var t = document, n = elemdisplay[e];
        if (!n) {
            n = actualDisplay(e, t);
            if (n === "none" || !n)iframe = (iframe || jQuery("<iframe frameborder='0' width='0' height='0'/>").css("cssText", "display:block !important")).appendTo(t.documentElement), t = (iframe[0].contentWindow || iframe[0].contentDocument).document, t.write("<!doctype html><html><body>"), t.close(), n = actualDisplay(e, t), iframe.detach();
            elemdisplay[e] = n
        }
        return n
    }

    function actualDisplay(e, t) {
        var n = jQuery(t.createElement(e)).appendTo(t.body), r = jQuery.css(n[0], "display");
        return n.remove(), r
    }

    function buildParams(e, t, n, r) {
        var i;
        if (jQuery.isArray(t))jQuery.each(t, function (t, i) {
            n || rbracket.test(e) ? r(e, i) : buildParams(e + "[" + (typeof i == "object" ? t : "") + "]", i, n, r)
        }); else if (!n && jQuery.type(t) === "object")for (i in t)buildParams(e + "[" + i + "]", t[i], n, r); else r(e, t)
    }

    function addToPrefiltersOrTransports(e) {
        return function (t, n) {
            typeof t != "string" && (n = t, t = "*");
            var r, i = 0, s = t.toLowerCase().match(core_rnotwhite) || [];
            if (jQuery.isFunction(n))while (r = s[i++])r[0] === "+" ? (r = r.slice(1) || "*", (e[r] = e[r] || []).unshift(n)) : (e[r] = e[r] || []).push(n)
        }
    }

    function inspectPrefiltersOrTransports(e, t, n, r) {
        function o(u) {
            var a;
            return i[u] = !0, jQuery.each(e[u] || [], function (e, u) {
                var f = u(t, n, r);
                if (typeof f == "string" && !s && !i[f])return t.dataTypes.unshift(f), o(f), !1;
                if (s)return!(a = f)
            }), a
        }

        var i = {}, s = e === transports;
        return o(t.dataTypes[0]) || !i["*"] && o("*")
    }

    function ajaxExtend(e, t) {
        var n, r, i = jQuery.ajaxSettings.flatOptions || {};
        for (n in t)t[n] !== undefined && ((i[n] ? e : r || (r = {}))[n] = t[n]);
        return r && jQuery.extend(!0, e, r), e
    }

    function ajaxHandleResponses(e, t, n) {
        var r, i, s, o, u = e.contents, a = e.dataTypes;
        while (a[0] === "*")a.shift(), r === undefined && (r = e.mimeType || t.getResponseHeader("Content-Type"));
        if (r)for (i in u)if (u[i] && u[i].test(r)) {
            a.unshift(i);
            break
        }
        if (a[0]in n)s = a[0]; else {
            for (i in n) {
                if (!a[0] || e.converters[i + " " + a[0]]) {
                    s = i;
                    break
                }
                o || (o = i)
            }
            s = s || o
        }
        if (s)return s !== a[0] && a.unshift(s), n[s]
    }

    function ajaxConvert(e, t, n, r) {
        var i, s, o, u, a, f = {}, l = e.dataTypes.slice();
        if (l[1])for (o in e.converters)f[o.toLowerCase()] = e.converters[o];
        s = l.shift();
        while (s) {
            e.responseFields[s] && (n[e.responseFields[s]] = t), !a && r && e.dataFilter && (t = e.dataFilter(t, e.dataType)), a = s, s = l.shift();
            if (s)if (s === "*")s = a; else if (a !== "*" && a !== s) {
                o = f[a + " " + s] || f["* " + s];
                if (!o)for (i in f) {
                    u = i.split(" ");
                    if (u[1] === s) {
                        o = f[a + " " + u[0]] || f["* " + u[0]];
                        if (o) {
                            o === !0 ? o = f[i] : f[i] !== !0 && (s = u[0], l.unshift(u[1]));
                            break
                        }
                    }
                }
                if (o !== !0)if (o && e["throws"])t = o(t); else try {
                    t = o(t)
                } catch (c) {
                    return{state: "parsererror", error: o ? c : "No conversion from " + a + " to " + s}
                }
            }
        }
        return{state: "success", data: t}
    }

    function createFxNow() {
        return setTimeout(function () {
            fxNow = undefined
        }), fxNow = jQuery.now()
    }

    function createTween(e, t, n) {
        var r, i = (tweeners[t] || []).concat(tweeners["*"]), s = 0, o = i.length;
        for (; s < o; s++)if (r = i[s].call(n, t, e))return r
    }

    function Animation(e, t, n) {
        var r, i, s = 0, o = animationPrefilters.length, u = jQuery.Deferred().always(function () {
            delete a.elem
        }), a = function () {
            if (i)return!1;
            var t = fxNow || createFxNow(), n = Math.max(0, f.startTime + f.duration - t), r = n / f.duration || 0, s = 1 - r, o = 0, a = f.tweens.length;
            for (; o < a; o++)f.tweens[o].run(s);
            return u.notifyWith(e, [f, s, n]), s < 1 && a ? n : (u.resolveWith(e, [f]), !1)
        }, f = u.promise({elem: e, props: jQuery.extend({}, t), opts: jQuery.extend(!0, {specialEasing: {}}, n), originalProperties: t, originalOptions: n, startTime: fxNow || createFxNow(), duration: n.duration, tweens: [], createTween: function (t, n) {
            var r = jQuery.Tween(e, f.opts, t, n, f.opts.specialEasing[t] || f.opts.easing);
            return f.tweens.push(r), r
        }, stop: function (t) {
            var n = 0, r = t ? f.tweens.length : 0;
            if (i)return this;
            i = !0;
            for (; n < r; n++)f.tweens[n].run(1);
            return t ? u.resolveWith(e, [f, t]) : u.rejectWith(e, [f, t]), this
        }}), l = f.props;
        propFilter(l, f.opts.specialEasing);
        for (; s < o; s++) {
            r = animationPrefilters[s].call(f, e, l, f.opts);
            if (r)return r
        }
        return jQuery.map(l, createTween, f), jQuery.isFunction(f.opts.start) && f.opts.start.call(e, f), jQuery.fx.timer(jQuery.extend(a, {elem: e, anim: f, queue: f.opts.queue})), f.progress(f.opts.progress).done(f.opts.done, f.opts.complete).fail(f.opts.fail).always(f.opts.always)
    }

    function propFilter(e, t) {
        var n, r, i, s, o;
        for (n in e) {
            r = jQuery.camelCase(n), i = t[r], s = e[n], jQuery.isArray(s) && (i = s[1], s = e[n] = s[0]), n !== r && (e[r] = s, delete e[n]), o = jQuery.cssHooks[r];
            if (o && "expand"in o) {
                s = o.expand(s), delete e[r];
                for (n in s)n in e || (e[n] = s[n], t[n] = i)
            } else t[r] = i
        }
    }

    function defaultPrefilter(e, t, n) {
        var r, i, s, o, u, a, f = this, l = {}, c = e.style, h = e.nodeType && isHidden(e), p = data_priv.get(e, "fxshow");
        n.queue || (u = jQuery._queueHooks(e, "fx"), u.unqueued == null && (u.unqueued = 0, a = u.empty.fire, u.empty.fire = function () {
            u.unqueued || a()
        }), u.unqueued++, f.always(function () {
            f.always(function () {
                u.unqueued--, jQuery.queue(e, "fx").length || u.empty.fire()
            })
        })), e.nodeType === 1 && ("height"in t || "width"in t) && (n.overflow = [c.overflow, c.overflowX, c.overflowY], jQuery.css(e, "display") === "inline" && jQuery.css(e, "float") === "none" && (c.display = "inline-block")), n.overflow && (c.overflow = "hidden", f.always(function () {
            c.overflow = n.overflow[0], c.overflowX = n.overflow[1], c.overflowY = n.overflow[2]
        }));
        for (r in t) {
            i = t[r];
            if (rfxtypes.exec(i)) {
                delete t[r], s = s || i === "toggle";
                if (i === (h ? "hide" : "show")) {
                    if (i !== "show" || !p || p[r] === undefined)continue;
                    h = !0
                }
                l[r] = p && p[r] || jQuery.style(e, r)
            }
        }
        if (!jQuery.isEmptyObject(l)) {
            p ? "hidden"in p && (h = p.hidden) : p = data_priv.access(e, "fxshow", {}), s && (p.hidden = !h), h ? jQuery(e).show() : f.done(function () {
                jQuery(e).hide()
            }), f.done(function () {
                var t;
                data_priv.remove(e, "fxshow");
                for (t in l)jQuery.style(e, t, l[t])
            });
            for (r in l)o = createTween(h ? p[r] : 0, r, f), r in p || (p[r] = o.start, h && (o.end = o.start, o.start = r === "width" || r === "height" ? 1 : 0))
        }
    }

    function Tween(e, t, n, r, i) {
        return new Tween.prototype.init(e, t, n, r, i)
    }

    function genFx(e, t) {
        var n, r = {height: e}, i = 0;
        t = t ? 1 : 0;
        for (; i < 4; i += 2 - t)n = cssExpand[i], r["margin" + n] = r["padding" + n] = e;
        return t && (r.opacity = r.width = e), r
    }

    function getWindow(e) {
        return jQuery.isWindow(e) ? e : e.nodeType === 9 && e.defaultView
    }

    var rootjQuery, readyList, core_strundefined = typeof undefined, location = window.location, document = window.document, docElem = document.documentElement, _jQuery = window.jQuery, _$ = window.$, class2type = {}, core_deletedIds = [], core_version = "2.0.3", core_concat = core_deletedIds.concat, core_push = core_deletedIds.push, core_slice = core_deletedIds.slice, core_indexOf = core_deletedIds.indexOf, core_toString = class2type.toString, core_hasOwn = class2type.hasOwnProperty, core_trim = core_version.trim, jQuery = function (e, t) {
        return new jQuery.fn.init(e, t, rootjQuery)
    }, core_pnum = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source, core_rnotwhite = /\S+/g, rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/, rsingleTag = /^<(\w+)\s*\/?>(?:<\/\1>|)$/, rmsPrefix = /^-ms-/, rdashAlpha = /-([\da-z])/gi, fcamelCase = function (e, t) {
        return t.toUpperCase()
    }, completed = function () {
        document.removeEventListener("DOMContentLoaded", completed, !1), window.removeEventListener("load", completed, !1), jQuery.ready()
    };
    jQuery.fn = jQuery.prototype = {jquery: core_version, constructor: jQuery, init: function (e, t, n) {
        var r, i;
        if (!e)return this;
        if (typeof e == "string") {
            e.charAt(0) === "<" && e.charAt(e.length - 1) === ">" && e.length >= 3 ? r = [null, e, null] : r = rquickExpr.exec(e);
            if (r && (r[1] || !t)) {
                if (r[1]) {
                    t = t instanceof jQuery ? t[0] : t, jQuery.merge(this, jQuery.parseHTML(r[1], t && t.nodeType ? t.ownerDocument || t : document, !0));
                    if (rsingleTag.test(r[1]) && jQuery.isPlainObject(t))for (r in t)jQuery.isFunction(this[r]) ? this[r](t[r]) : this.attr(r, t[r]);
                    return this
                }
                return i = document.getElementById(r[2]), i && i.parentNode && (this.length = 1, this[0] = i), this.context = document, this.selector = e, this
            }
            return!t || t.jquery ? (t || n).find(e) : this.constructor(t).find(e)
        }
        return e.nodeType ? (this.context = this[0] = e, this.length = 1, this) : jQuery.isFunction(e) ? n.ready(e) : (e.selector !== undefined && (this.selector = e.selector, this.context = e.context), jQuery.makeArray(e, this))
    }, selector: "", length: 0, toArray: function () {
        return core_slice.call(this)
    }, get: function (e) {
        return e == null ? this.toArray() : e < 0 ? this[this.length + e] : this[e]
    }, pushStack: function (e) {
        var t = jQuery.merge(this.constructor(), e);
        return t.prevObject = this, t.context = this.context, t
    }, each: function (e, t) {
        return jQuery.each(this, e, t)
    }, ready: function (e) {
        return jQuery.ready.promise().done(e), this
    }, slice: function () {
        return this.pushStack(core_slice.apply(this, arguments))
    }, first: function () {
        return this.eq(0)
    }, last: function () {
        return this.eq(-1)
    }, eq: function (e) {
        var t = this.length, n = +e + (e < 0 ? t : 0);
        return this.pushStack(n >= 0 && n < t ? [this[n]] : [])
    }, map: function (e) {
        return this.pushStack(jQuery.map(this, function (t, n) {
            return e.call(t, n, t)
        }))
    }, end: function () {
        return this.prevObject || this.constructor(null)
    }, push: core_push, sort: [].sort, splice: [].splice}, jQuery.fn.init.prototype = jQuery.fn, jQuery.extend = jQuery.fn.extend = function () {
        var e, t, n, r, i, s, o = arguments[0] || {}, u = 1, a = arguments.length, f = !1;
        typeof o == "boolean" && (f = o, o = arguments[1] || {}, u = 2), typeof o != "object" && !jQuery.isFunction(o) && (o = {}), a === u && (o = this, --u);
        for (; u < a; u++)if ((e = arguments[u]) != null)for (t in e) {
            n = o[t], r = e[t];
            if (o === r)continue;
            f && r && (jQuery.isPlainObject(r) || (i = jQuery.isArray(r))) ? (i ? (i = !1, s = n && jQuery.isArray(n) ? n : []) : s = n && jQuery.isPlainObject(n) ? n : {}, o[t] = jQuery.extend(f, s, r)) : r !== undefined && (o[t] = r)
        }
        return o
    }, jQuery.extend({expando: "jQuery" + (core_version + Math.random()).replace(/\D/g, ""), noConflict: function (e) {
        return window.$ === jQuery && (window.$ = _$), e && window.jQuery === jQuery && (window.jQuery = _jQuery), jQuery
    }, isReady: !1, readyWait: 1, holdReady: function (e) {
        e ? jQuery.readyWait++ : jQuery.ready(!0)
    }, ready: function (e) {
        if (e === !0 ? --jQuery.readyWait : jQuery.isReady)return;
        jQuery.isReady = !0;
        if (e !== !0 && --jQuery.readyWait > 0)return;
        readyList.resolveWith(document, [jQuery]), jQuery.fn.trigger && jQuery(document).trigger("ready").off("ready")
    }, isFunction: function (e) {
        return jQuery.type(e) === "function"
    }, isArray: Array.isArray, isWindow: function (e) {
        return e != null && e === e.window
    }, isNumeric: function (e) {
        return!isNaN(parseFloat(e)) && isFinite(e)
    }, type: function (e) {
        return e == null ? String(e) : typeof e == "object" || typeof e == "function" ? class2type[core_toString.call(e)] || "object" : typeof e
    }, isPlainObject: function (e) {
        if (jQuery.type(e) !== "object" || e.nodeType || jQuery.isWindow(e))return!1;
        try {
            if (e.constructor && !core_hasOwn.call(e.constructor.prototype, "isPrototypeOf"))return!1
        } catch (t) {
            return!1
        }
        return!0
    }, isEmptyObject: function (e) {
        var t;
        for (t in e)return!1;
        return!0
    }, error: function (e) {
        throw new Error(e)
    }, parseHTML: function (e, t, n) {
        if (!e || typeof e != "string")return null;
        typeof t == "boolean" && (n = t, t = !1), t = t || document;
        var r = rsingleTag.exec(e), i = !n && [];
        return r ? [t.createElement(r[1])] : (r = jQuery.buildFragment([e], t, i), i && jQuery(i).remove(), jQuery.merge([], r.childNodes))
    }, parseJSON: JSON.parse, parseXML: function (e) {
        var t, n;
        if (!e || typeof e != "string")return null;
        try {
            n = new DOMParser, t = n.parseFromString(e, "text/xml")
        } catch (r) {
            t = undefined
        }
        return(!t || t.getElementsByTagName("parsererror").length) && jQuery.error("Invalid XML: " + e), t
    }, noop: function () {
    }, globalEval: function (code) {
        var script, indirect = eval;
        code = jQuery.trim(code), code && (code.indexOf("use strict") === 1 ? (script = document.createElement("script"), script.text = code, document.head.appendChild(script).parentNode.removeChild(script)) : indirect(code))
    }, camelCase: function (e) {
        return e.replace(rmsPrefix, "ms-").replace(rdashAlpha, fcamelCase)
    }, nodeName: function (e, t) {
        return e.nodeName && e.nodeName.toLowerCase() === t.toLowerCase()
    }, each: function (e, t, n) {
        var r, i = 0, s = e.length, o = isArraylike(e);
        if (n)if (o)for (; i < s; i++) {
            r = t.apply(e[i], n);
            if (r === !1)break
        } else for (i in e) {
            r = t.apply(e[i], n);
            if (r === !1)break
        } else if (o)for (; i < s; i++) {
            r = t.call(e[i], i, e[i]);
            if (r === !1)break
        } else for (i in e) {
            r = t.call(e[i], i, e[i]);
            if (r === !1)break
        }
        return e
    }, trim: function (e) {
        return e == null ? "" : core_trim.call(e)
    }, makeArray: function (e, t) {
        var n = t || [];
        return e != null && (isArraylike(Object(e)) ? jQuery.merge(n, typeof e == "string" ? [e] : e) : core_push.call(n, e)), n
    }, inArray: function (e, t, n) {
        return t == null ? -1 : core_indexOf.call(t, e, n)
    }, merge: function (e, t) {
        var n = t.length, r = e.length, i = 0;
        if (typeof n == "number")for (; i < n; i++)e[r++] = t[i]; else while (t[i] !== undefined)e[r++] = t[i++];
        return e.length = r, e
    }, grep: function (e, t, n) {
        var r, i = [], s = 0, o = e.length;
        n = !!n;
        for (; s < o; s++)r = !!t(e[s], s), n !== r && i.push(e[s]);
        return i
    }, map: function (e, t, n) {
        var r, i = 0, s = e.length, o = isArraylike(e), u = [];
        if (o)for (; i < s; i++)r = t(e[i], i, n), r != null && (u[u.length] = r); else for (i in e)r = t(e[i], i, n), r != null && (u[u.length] = r);
        return core_concat.apply([], u)
    }, guid: 1, proxy: function (e, t) {
        var n, r, i;
        return typeof t == "string" && (n = e[t], t = e, e = n), jQuery.isFunction(e) ? (r = core_slice.call(arguments, 2), i = function () {
            return e.apply(t || this, r.concat(core_slice.call(arguments)))
        }, i.guid = e.guid = e.guid || jQuery.guid++, i) : undefined
    }, access: function (e, t, n, r, i, s, o) {
        var u = 0, a = e.length, f = n == null;
        if (jQuery.type(n) === "object") {
            i = !0;
            for (u in n)jQuery.access(e, t, u, n[u], !0, s, o)
        } else if (r !== undefined) {
            i = !0, jQuery.isFunction(r) || (o = !0), f && (o ? (t.call(e, r), t = null) : (f = t, t = function (e, t, n) {
                return f.call(jQuery(e), n)
            }));
            if (t)for (; u < a; u++)t(e[u], n, o ? r : r.call(e[u], u, t(e[u], n)))
        }
        return i ? e : f ? t.call(e) : a ? t(e[0], n) : s
    }, now: Date.now, swap: function (e, t, n, r) {
        var i, s, o = {};
        for (s in t)o[s] = e.style[s], e.style[s] = t[s];
        i = n.apply(e, r || []);
        for (s in t)e.style[s] = o[s];
        return i
    }}), jQuery.ready.promise = function (e) {
        return readyList || (readyList = jQuery.Deferred(), document.readyState === "complete" ? setTimeout(jQuery.ready) : (document.addEventListener("DOMContentLoaded", completed, !1), window.addEventListener("load", completed, !1))), readyList.promise(e)
    }, jQuery.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function (e, t) {
        class2type["[object " + t + "]"] = t.toLowerCase()
    }), rootjQuery = jQuery(document), function (e, t) {
        function st(e, t, n, i) {
            var s, o, u, a, f, l, p, m, g, E;
            (t ? t.ownerDocument || t : w) !== h && c(t), t = t || h, n = n || [];
            if (!e || typeof e != "string")return n;
            if ((a = t.nodeType) !== 1 && a !== 9)return[];
            if (d && !i) {
                if (s = Y.exec(e))if (u = s[1]) {
                    if (a === 9) {
                        o = t.getElementById(u);
                        if (!o || !o.parentNode)return n;
                        if (o.id === u)return n.push(o), n
                    } else if (t.ownerDocument && (o = t.ownerDocument.getElementById(u)) && y(t, o) && o.id === u)return n.push(o), n
                } else {
                    if (s[2])return P.apply(n, t.getElementsByTagName(e)), n;
                    if ((u = s[3]) && r.getElementsByClassName && t.getElementsByClassName)return P.apply(n, t.getElementsByClassName(u)), n
                }
                if (r.qsa && (!v || !v.test(e))) {
                    m = p = b, g = t, E = a === 9 && e;
                    if (a === 1 && t.nodeName.toLowerCase() !== "object") {
                        l = vt(e), (p = t.getAttribute("id")) ? m = p.replace(tt, "\\$&") : t.setAttribute("id", m), m = "[id='" + m + "'] ", f = l.length;
                        while (f--)l[f] = m + mt(l[f]);
                        g = V.test(e) && t.parentNode || t, E = l.join(",")
                    }
                    if (E)try {
                        return P.apply(n, g.querySelectorAll(E)), n
                    } catch (S) {
                    } finally {
                        p || t.removeAttribute("id")
                    }
                }
            }
            return Tt(e.replace(z, "$1"), t, n, i)
        }

        function ot() {
            function t(n, r) {
                return e.push(n += " ") > s.cacheLength && delete t[e.shift()], t[n] = r
            }

            var e = [];
            return t
        }

        function ut(e) {
            return e[b] = !0, e
        }

        function at(e) {
            var t = h.createElement("div");
            try {
                return!!e(t)
            } catch (n) {
                return!1
            } finally {
                t.parentNode && t.parentNode.removeChild(t), t = null
            }
        }

        function ft(e, t) {
            var n = e.split("|"), r = e.length;
            while (r--)s.attrHandle[n[r]] = t
        }

        function lt(e, t) {
            var n = t && e, r = n && e.nodeType === 1 && t.nodeType === 1 && (~t.sourceIndex || A) - (~e.sourceIndex || A);
            if (r)return r;
            if (n)while (n = n.nextSibling)if (n === t)return-1;
            return e ? 1 : -1
        }

        function ct(e) {
            return function (t) {
                var n = t.nodeName.toLowerCase();
                return n === "input" && t.type === e
            }
        }

        function ht(e) {
            return function (t) {
                var n = t.nodeName.toLowerCase();
                return(n === "input" || n === "button") && t.type === e
            }
        }

        function pt(e) {
            return ut(function (t) {
                return t = +t, ut(function (n, r) {
                    var i, s = e([], n.length, t), o = s.length;
                    while (o--)n[i = s[o]] && (n[i] = !(r[i] = n[i]))
                })
            })
        }

        function dt() {
        }

        function vt(e, t) {
            var n, r, i, o, u, a, f, l = T[e + " "];
            if (l)return t ? 0 : l.slice(0);
            u = e, a = [], f = s.preFilter;
            while (u) {
                if (!n || (r = W.exec(u)))r && (u = u.slice(r[0].length) || u), a.push(i = []);
                n = !1;
                if (r = X.exec(u))n = r.shift(), i.push({value: n, type: r[0].replace(z, " ")}), u = u.slice(n.length);
                for (o in s.filter)(r = Q[o].exec(u)) && (!f[o] || (r = f[o](r))) && (n = r.shift(), i.push({value: n, type: o, matches: r}), u = u.slice(n.length));
                if (!n)break
            }
            return t ? u.length : u ? st.error(e) : T(e, a).slice(0)
        }

        function mt(e) {
            var t = 0, n = e.length, r = "";
            for (; t < n; t++)r += e[t].value;
            return r
        }

        function gt(e, t, n) {
            var r = t.dir, s = n && r === "parentNode", o = S++;
            return t.first ? function (t, n, i) {
                while (t = t[r])if (t.nodeType === 1 || s)return e(t, n, i)
            } : function (t, n, u) {
                var a, f, l, c = E + " " + o;
                if (u) {
                    while (t = t[r])if (t.nodeType === 1 || s)if (e(t, n, u))return!0
                } else while (t = t[r])if (t.nodeType === 1 || s) {
                    l = t[b] || (t[b] = {});
                    if ((f = l[r]) && f[0] === c) {
                        if ((a = f[1]) === !0 || a === i)return a === !0
                    } else {
                        f = l[r] = [c], f[1] = e(t, n, u) || i;
                        if (f[1] === !0)return!0
                    }
                }
            }
        }

        function yt(e) {
            return e.length > 1 ? function (t, n, r) {
                var i = e.length;
                while (i--)if (!e[i](t, n, r))return!1;
                return!0
            } : e[0]
        }

        function bt(e, t, n, r, i) {
            var s, o = [], u = 0, a = e.length, f = t != null;
            for (; u < a; u++)if (s = e[u])if (!n || n(s, r, i))o.push(s), f && t.push(u);
            return o
        }

        function wt(e, t, n, r, i, s) {
            return r && !r[b] && (r = wt(r)), i && !i[b] && (i = wt(i, s)), ut(function (s, o, u, a) {
                var f, l, c, h = [], p = [], d = o.length, v = s || xt(t || "*", u.nodeType ? [u] : u, []), m = e && (s || !t) ? bt(v, h, e, u, a) : v, g = n ? i || (s ? e : d || r) ? [] : o : m;
                n && n(m, g, u, a);
                if (r) {
                    f = bt(g, p), r(f, [], u, a), l = f.length;
                    while (l--)if (c = f[l])g[p[l]] = !(m[p[l]] = c)
                }
                if (s) {
                    if (i || e) {
                        if (i) {
                            f = [], l = g.length;
                            while (l--)(c = g[l]) && f.push(m[l] = c);
                            i(null, g = [], f, a)
                        }
                        l = g.length;
                        while (l--)(c = g[l]) && (f = i ? B.call(s, c) : h[l]) > -1 && (s[f] = !(o[f] = c))
                    }
                } else g = bt(g === o ? g.splice(d, g.length) : g), i ? i(null, o, g, a) : P.apply(o, g)
            })
        }

        function Et(e) {
            var t, n, r, i = e.length, o = s.relative[e[0].type], u = o || s.relative[" "], a = o ? 1 : 0, l = gt(function (e) {
                return e === t
            }, u, !0), c = gt(function (e) {
                return B.call(t, e) > -1
            }, u, !0), h = [function (e, n, r) {
                return!o && (r || n !== f) || ((t = n).nodeType ? l(e, n, r) : c(e, n, r))
            }];
            for (; a < i; a++)if (n = s.relative[e[a].type])h = [gt(yt(h), n)]; else {
                n = s.filter[e[a].type].apply(null, e[a].matches);
                if (n[b]) {
                    r = ++a;
                    for (; r < i; r++)if (s.relative[e[r].type])break;
                    return wt(a > 1 && yt(h), a > 1 && mt(e.slice(0, a - 1).concat({value: e[a - 2].type === " " ? "*" : ""})).replace(z, "$1"), n, a < r && Et(e.slice(a, r)), r < i && Et(e = e.slice(r)), r < i && mt(e))
                }
                h.push(n)
            }
            return yt(h)
        }

        function St(e, t) {
            var n = 0, r = t.length > 0, o = e.length > 0, u = function (u, a, l, c, p) {
                var d, v, m, g = [], y = 0, b = "0", w = u && [], S = p != null, x = f, T = u || o && s.find.TAG("*", p && a.parentNode || a), N = E += x == null ? 1 : Math.random() || .1;
                S && (f = a !== h && a, i = n);
                for (; (d = T[b]) != null; b++) {
                    if (o && d) {
                        v = 0;
                        while (m = e[v++])if (m(d, a, l)) {
                            c.push(d);
                            break
                        }
                        S && (E = N, i = ++n)
                    }
                    r && ((d = !m && d) && y--, u && w.push(d))
                }
                y += b;
                if (r && b !== y) {
                    v = 0;
                    while (m = t[v++])m(w, g, a, l);
                    if (u) {
                        if (y > 0)while (b--)!w[b] && !g[b] && (g[b] = _.call(c));
                        g = bt(g)
                    }
                    P.apply(c, g), S && !u && g.length > 0 && y + t.length > 1 && st.uniqueSort(c)
                }
                return S && (E = N, f = x), w
            };
            return r ? ut(u) : u
        }

        function xt(e, t, n) {
            var r = 0, i = t.length;
            for (; r < i; r++)st(e, t[r], n);
            return n
        }

        function Tt(e, t, n, i) {
            var o, u, f, l, c, h = vt(e);
            if (!i && h.length === 1) {
                u = h[0] = h[0].slice(0);
                if (u.length > 2 && (f = u[0]).type === "ID" && r.getById && t.nodeType === 9 && d && s.relative[u[1].type]) {
                    t = (s.find.ID(f.matches[0].replace(nt, rt), t) || [])[0];
                    if (!t)return n;
                    e = e.slice(u.shift().value.length)
                }
                o = Q.needsContext.test(e) ? 0 : u.length;
                while (o--) {
                    f = u[o];
                    if (s.relative[l = f.type])break;
                    if (c = s.find[l])if (i = c(f.matches[0].replace(nt, rt), V.test(u[0].type) && t.parentNode || t)) {
                        u.splice(o, 1), e = i.length && mt(u);
                        if (!e)return P.apply(n, i), n;
                        break
                    }
                }
            }
            return a(e, h)(i, t, !d, n, V.test(e)), n
        }

        var n, r, i, s, o, u, a, f, l, c, h, p, d, v, m, g, y, b = "sizzle" + -(new Date), w = e.document, E = 0, S = 0, x = ot(), T = ot(), N = ot(), C = !1, k = function (e, t) {
            return e === t ? (C = !0, 0) : 0
        }, L = typeof t, A = 1 << 31, O = {}.hasOwnProperty, M = [], _ = M.pop, D = M.push, P = M.push, H = M.slice, B = M.indexOf || function (e) {
            var t = 0, n = this.length;
            for (; t < n; t++)if (this[t] === e)return t;
            return-1
        }, j = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped", F = "[\\x20\\t\\r\\n\\f]", I = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+", q = I.replace("w", "w#"), R = "\\[" + F + "*(" + I + ")" + F + "*(?:([*^$|!~]?=)" + F + "*(?:(['\"])((?:\\\\.|[^\\\\])*?)\\3|(" + q + ")|)|)" + F + "*\\]", U = ":(" + I + ")(?:\\(((['\"])((?:\\\\.|[^\\\\])*?)\\3|((?:\\\\.|[^\\\\()[\\]]|" + R.replace(3, 8) + ")*)|.*)\\)|)", z = new RegExp("^" + F + "+|((?:^|[^\\\\])(?:\\\\.)*)" + F + "+$", "g"), W = new RegExp("^" + F + "*," + F + "*"), X = new RegExp("^" + F + "*([>+~]|" + F + ")" + F + "*"), V = new RegExp(F + "*[+~]"), $ = new RegExp("=" + F + "*([^\\]'\"]*)" + F + "*\\]", "g"), J = new RegExp(U), K = new RegExp("^" + q + "$"), Q = {ID: new RegExp("^#(" + I + ")"), CLASS: new RegExp("^\\.(" + I + ")"), TAG: new RegExp("^(" + I.replace("w", "w*") + ")"), ATTR: new RegExp("^" + R), PSEUDO: new RegExp("^" + U), CHILD: new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + F + "*(even|odd|(([+-]|)(\\d*)n|)" + F + "*(?:([+-]|)" + F + "*(\\d+)|))" + F + "*\\)|)", "i"), bool: new RegExp("^(?:" + j + ")$", "i"), needsContext: new RegExp("^" + F + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + F + "*((?:-\\d)?\\d*)" + F + "*\\)|)(?=[^-]|$)", "i")}, G = /^[^{]+\{\s*\[native \w/, Y = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/, Z = /^(?:input|select|textarea|button)$/i, et = /^h\d$/i, tt = /'|\\/g, nt = new RegExp("\\\\([\\da-f]{1,6}" + F + "?|(" + F + ")|.)", "ig"), rt = function (e, t, n) {
            var r = "0x" + t - 65536;
            return r !== r || n ? t : r < 0 ? String.fromCharCode(r + 65536) : String.fromCharCode(r >> 10 | 55296, r & 1023 | 56320)
        };
        try {
            P.apply(M = H.call(w.childNodes), w.childNodes), M[w.childNodes.length].nodeType
        } catch (it) {
            P = {apply: M.length ? function (e, t) {
                D.apply(e, H.call(t))
            } : function (e, t) {
                var n = e.length, r = 0;
                while (e[n++] = t[r++]);
                e.length = n - 1
            }}
        }
        u = st.isXML = function (e) {
            var t = e && (e.ownerDocument || e).documentElement;
            return t ? t.nodeName !== "HTML" : !1
        }, r = st.support = {}, c = st.setDocument = function (e) {
            var t = e ? e.ownerDocument || e : w, n = t.defaultView;
            if (t === h || t.nodeType !== 9 || !t.documentElement)return h;
            h = t, p = t.documentElement, d = !u(t), n && n.attachEvent && n !== n.top && n.attachEvent("onbeforeunload", function () {
                c()
            }), r.attributes = at(function (e) {
                return e.className = "i", !e.getAttribute("className")
            }), r.getElementsByTagName = at(function (e) {
                return e.appendChild(t.createComment("")), !e.getElementsByTagName("*").length
            }), r.getElementsByClassName = at(function (e) {
                return e.innerHTML = "<div class='a'></div><div class='a i'></div>", e.firstChild.className = "i", e.getElementsByClassName("i").length === 2
            }), r.getById = at(function (e) {
                return p.appendChild(e).id = b, !t.getElementsByName || !t.getElementsByName(b).length
            }), r.getById ? (s.find.ID = function (e, t) {
                if (typeof t.getElementById !== L && d) {
                    var n = t.getElementById(e);
                    return n && n.parentNode ? [n] : []
                }
            }, s.filter.ID = function (e) {
                var t = e.replace(nt, rt);
                return function (e) {
                    return e.getAttribute("id") === t
                }
            }) : (delete s.find.ID, s.filter.ID = function (e) {
                var t = e.replace(nt, rt);
                return function (e) {
                    var n = typeof e.getAttributeNode !== L && e.getAttributeNode("id");
                    return n && n.value === t
                }
            }), s.find.TAG = r.getElementsByTagName ? function (e, t) {
                if (typeof t.getElementsByTagName !== L)return t.getElementsByTagName(e)
            } : function (e, t) {
                var n, r = [], i = 0, s = t.getElementsByTagName(e);
                if (e === "*") {
                    while (n = s[i++])n.nodeType === 1 && r.push(n);
                    return r
                }
                return s
            }, s.find.CLASS = r.getElementsByClassName && function (e, t) {
                if (typeof t.getElementsByClassName !== L && d)return t.getElementsByClassName(e)
            }, m = [], v = [];
            if (r.qsa = G.test(t.querySelectorAll))at(function (e) {
                e.innerHTML = "<select><option selected=''></option></select>", e.querySelectorAll("[selected]").length || v.push("\\[" + F + "*(?:value|" + j + ")"), e.querySelectorAll(":checked").length || v.push(":checked")
            }), at(function (e) {
                var n = t.createElement("input");
                n.setAttribute("type", "hidden"), e.appendChild(n).setAttribute("t", ""), e.querySelectorAll("[t^='']").length && v.push("[*^$]=" + F + "*(?:''|\"\")"), e.querySelectorAll(":enabled").length || v.push(":enabled", ":disabled"), e.querySelectorAll("*,:x"), v.push(",.*:")
            });
            return(r.matchesSelector = G.test(g = p.webkitMatchesSelector || p.mozMatchesSelector || p.oMatchesSelector || p.msMatchesSelector)) && at(function (e) {
                r.disconnectedMatch = g.call(e, "div"), g.call(e, "[s!='']:x"), m.push("!=", U)
            }), v = v.length && new RegExp(v.join("|")), m = m.length && new RegExp(m.join("|")), y = G.test(p.contains) || p.compareDocumentPosition ? function (e, t) {
                var n = e.nodeType === 9 ? e.documentElement : e, r = t && t.parentNode;
                return e === r || !!r && r.nodeType === 1 && !!(n.contains ? n.contains(r) : e.compareDocumentPosition && e.compareDocumentPosition(r) & 16)
            } : function (e, t) {
                if (t)while (t = t.parentNode)if (t === e)return!0;
                return!1
            }, k = p.compareDocumentPosition ? function (e, n) {
                if (e === n)return C = !0, 0;
                var i = n.compareDocumentPosition && e.compareDocumentPosition && e.compareDocumentPosition(n);
                if (i)return i & 1 || !r.sortDetached && n.compareDocumentPosition(e) === i ? e === t || y(w, e) ? -1 : n === t || y(w, n) ? 1 : l ? B.call(l, e) - B.call(l, n) : 0 : i & 4 ? -1 : 1;
                return e.compareDocumentPosition ? -1 : 1
            } : function (e, n) {
                var r, i = 0, s = e.parentNode, o = n.parentNode, u = [e], a = [n];
                if (e === n)return C = !0, 0;
                if (!s || !o)return e === t ? -1 : n === t ? 1 : s ? -1 : o ? 1 : l ? B.call(l, e) - B.call(l, n) : 0;
                if (s === o)return lt(e, n);
                r = e;
                while (r = r.parentNode)u.unshift(r);
                r = n;
                while (r = r.parentNode)a.unshift(r);
                while (u[i] === a[i])i++;
                return i ? lt(u[i], a[i]) : u[i] === w ? -1 : a[i] === w ? 1 : 0
            }, t
        }, st.matches = function (e, t) {
            return st(e, null, null, t)
        }, st.matchesSelector = function (e, t) {
            (e.ownerDocument || e) !== h && c(e), t = t.replace($, "='$1']");
            if (r.matchesSelector && d && (!m || !m.test(t)) && (!v || !v.test(t)))try {
                var n = g.call(e, t);
                if (n || r.disconnectedMatch || e.document && e.document.nodeType !== 11)return n
            } catch (i) {
            }
            return st(t, h, null, [e]).length > 0
        }, st.contains = function (e, t) {
            return(e.ownerDocument || e) !== h && c(e), y(e, t)
        }, st.attr = function (e, n) {
            (e.ownerDocument || e) !== h && c(e);
            var i = s.attrHandle[n.toLowerCase()], o = i && O.call(s.attrHandle, n.toLowerCase()) ? i(e, n, !d) : t;
            return o === t ? r.attributes || !d ? e.getAttribute(n) : (o = e.getAttributeNode(n)) && o.specified ? o.value : null : o
        }, st.error = function (e) {
            throw new Error("Syntax error, unrecognized expression: " + e)
        }, st.uniqueSort = function (e) {
            var t, n = [], i = 0, s = 0;
            C = !r.detectDuplicates, l = !r.sortStable && e.slice(0), e.sort(k);
            if (C) {
                while (t = e[s++])t === e[s] && (i = n.push(s));
                while (i--)e.splice(n[i], 1)
            }
            return e
        }, o = st.getText = function (e) {
            var t, n = "", r = 0, i = e.nodeType;
            if (!i)for (; t = e[r]; r++)n += o(t); else if (i === 1 || i === 9 || i === 11) {
                if (typeof e.textContent == "string")return e.textContent;
                for (e = e.firstChild; e; e = e.nextSibling)n += o(e)
            } else if (i === 3 || i === 4)return e.nodeValue;
            return n
        }, s = st.selectors = {cacheLength: 50, createPseudo: ut, match: Q, attrHandle: {}, find: {}, relative: {">": {dir: "parentNode", first: !0}, " ": {dir: "parentNode"}, "+": {dir: "previousSibling", first: !0}, "~": {dir: "previousSibling"}}, preFilter: {ATTR: function (e) {
            return e[1] = e[1].replace(nt, rt), e[3] = (e[4] || e[5] || "").replace(nt, rt), e[2] === "~=" && (e[3] = " " + e[3] + " "), e.slice(0, 4)
        }, CHILD: function (e) {
            return e[1] = e[1].toLowerCase(), e[1].slice(0, 3) === "nth" ? (e[3] || st.error(e[0]), e[4] = +(e[4] ? e[5] + (e[6] || 1) : 2 * (e[3] === "even" || e[3] === "odd")), e[5] = +(e[7] + e[8] || e[3] === "odd")) : e[3] && st.error(e[0]), e
        }, PSEUDO: function (e) {
            var n, r = !e[5] && e[2];
            return Q.CHILD.test(e[0]) ? null : (e[3] && e[4] !== t ? e[2] = e[4] : r && J.test(r) && (n = vt(r, !0)) && (n = r.indexOf(")", r.length - n) - r.length) && (e[0] = e[0].slice(0, n), e[2] = r.slice(0, n)), e.slice(0, 3))
        }}, filter: {TAG: function (e) {
            var t = e.replace(nt, rt).toLowerCase();
            return e === "*" ? function () {
                return!0
            } : function (e) {
                return e.nodeName && e.nodeName.toLowerCase() === t
            }
        }, CLASS: function (e) {
            var t = x[e + " "];
            return t || (t = new RegExp("(^|" + F + ")" + e + "(" + F + "|$)")) && x(e, function (e) {
                return t.test(typeof e.className == "string" && e.className || typeof e.getAttribute !== L && e.getAttribute("class") || "")
            })
        }, ATTR: function (e, t, n) {
            return function (r) {
                var i = st.attr(r, e);
                return i == null ? t === "!=" : t ? (i += "", t === "=" ? i === n : t === "!=" ? i !== n : t === "^=" ? n && i.indexOf(n) === 0 : t === "*=" ? n && i.indexOf(n) > -1 : t === "$=" ? n && i.slice(-n.length) === n : t === "~=" ? (" " + i + " ").indexOf(n) > -1 : t === "|=" ? i === n || i.slice(0, n.length + 1) === n + "-" : !1) : !0
            }
        }, CHILD: function (e, t, n, r, i) {
            var s = e.slice(0, 3) !== "nth", o = e.slice(-4) !== "last", u = t === "of-type";
            return r === 1 && i === 0 ? function (e) {
                return!!e.parentNode
            } : function (t, n, a) {
                var f, l, c, h, p, d, v = s !== o ? "nextSibling" : "previousSibling", m = t.parentNode, g = u && t.nodeName.toLowerCase(), y = !a && !u;
                if (m) {
                    if (s) {
                        while (v) {
                            c = t;
                            while (c = c[v])if (u ? c.nodeName.toLowerCase() === g : c.nodeType === 1)return!1;
                            d = v = e === "only" && !d && "nextSibling"
                        }
                        return!0
                    }
                    d = [o ? m.firstChild : m.lastChild];
                    if (o && y) {
                        l = m[b] || (m[b] = {}), f = l[e] || [], p = f[0] === E && f[1], h = f[0] === E && f[2], c = p && m.childNodes[p];
                        while (c = ++p && c && c[v] || (h = p = 0) || d.pop())if (c.nodeType === 1 && ++h && c === t) {
                            l[e] = [E, p, h];
                            break
                        }
                    } else if (y && (f = (t[b] || (t[b] = {}))[e]) && f[0] === E)h = f[1]; else while (c = ++p && c && c[v] || (h = p = 0) || d.pop())if ((u ? c.nodeName.toLowerCase() === g : c.nodeType === 1) && ++h) {
                        y && ((c[b] || (c[b] = {}))[e] = [E, h]);
                        if (c === t)break
                    }
                    return h -= i, h === r || h % r === 0 && h / r >= 0
                }
            }
        }, PSEUDO: function (e, t) {
            var n, r = s.pseudos[e] || s.setFilters[e.toLowerCase()] || st.error("unsupported pseudo: " + e);
            return r[b] ? r(t) : r.length > 1 ? (n = [e, e, "", t], s.setFilters.hasOwnProperty(e.toLowerCase()) ? ut(function (e, n) {
                var i, s = r(e, t), o = s.length;
                while (o--)i = B.call(e, s[o]), e[i] = !(n[i] = s[o])
            }) : function (e) {
                return r(e, 0, n)
            }) : r
        }}, pseudos: {not: ut(function (e) {
            var t = [], n = [], r = a(e.replace(z, "$1"));
            return r[b] ? ut(function (e, t, n, i) {
                var s, o = r(e, null, i, []), u = e.length;
                while (u--)if (s = o[u])e[u] = !(t[u] = s)
            }) : function (e, i, s) {
                return t[0] = e, r(t, null, s, n), !n.pop()
            }
        }), has: ut(function (e) {
            return function (t) {
                return st(e, t).length > 0
            }
        }), contains: ut(function (e) {
            return function (t) {
                return(t.textContent || t.innerText || o(t)).indexOf(e) > -1
            }
        }), lang: ut(function (e) {
            return K.test(e || "") || st.error("unsupported lang: " + e), e = e.replace(nt, rt).toLowerCase(), function (t) {
                var n;
                do if (n = d ? t.lang : t.getAttribute("xml:lang") || t.getAttribute("lang"))return n = n.toLowerCase(), n === e || n.indexOf(e + "-") === 0; while ((t = t.parentNode) && t.nodeType === 1);
                return!1
            }
        }), target: function (t) {
            var n = e.location && e.location.hash;
            return n && n.slice(1) === t.id
        }, root: function (e) {
            return e === p
        }, focus: function (e) {
            return e === h.activeElement && (!h.hasFocus || h.hasFocus()) && !!(e.type || e.href || ~e.tabIndex)
        }, enabled: function (e) {
            return e.disabled === !1
        }, disabled: function (e) {
            return e.disabled === !0
        }, checked: function (e) {
            var t = e.nodeName.toLowerCase();
            return t === "input" && !!e.checked || t === "option" && !!e.selected
        }, selected: function (e) {
            return e.parentNode && e.parentNode.selectedIndex, e.selected === !0
        }, empty: function (e) {
            for (e = e.firstChild; e; e = e.nextSibling)if (e.nodeName > "@" || e.nodeType === 3 || e.nodeType === 4)return!1;
            return!0
        }, parent: function (e) {
            return!s.pseudos.empty(e)
        }, header: function (e) {
            return et.test(e.nodeName)
        }, input: function (e) {
            return Z.test(e.nodeName)
        }, button: function (e) {
            var t = e.nodeName.toLowerCase();
            return t === "input" && e.type === "button" || t === "button"
        }, text: function (e) {
            var t;
            return e.nodeName.toLowerCase() === "input" && e.type === "text" && ((t = e.getAttribute("type")) == null || t.toLowerCase() === e.type)
        }, first: pt(function () {
            return[0]
        }), last: pt(function (e, t) {
            return[t - 1]
        }), eq: pt(function (e, t, n) {
            return[n < 0 ? n + t : n]
        }), even: pt(function (e, t) {
            var n = 0;
            for (; n < t; n += 2)e.push(n);
            return e
        }), odd: pt(function (e, t) {
            var n = 1;
            for (; n < t; n += 2)e.push(n);
            return e
        }), lt: pt(function (e, t, n) {
            var r = n < 0 ? n + t : n;
            for (; --r >= 0;)e.push(r);
            return e
        }), gt: pt(function (e, t, n) {
            var r = n < 0 ? n + t : n;
            for (; ++r < t;)e.push(r);
            return e
        })}}, s.pseudos.nth = s.pseudos.eq;
        for (n in{radio: !0, checkbox: !0, file: !0, password: !0, image: !0})s.pseudos[n] = ct(n);
        for (n in{submit: !0, reset: !0})s.pseudos[n] = ht(n);
        dt.prototype = s.filters = s.pseudos, s.setFilters = new dt, a = st.compile = function (e, t) {
            var n, r = [], i = [], s = N[e + " "];
            if (!s) {
                t || (t = vt(e)), n = t.length;
                while (n--)s = Et(t[n]), s[b] ? r.push(s) : i.push(s);
                s = N(e, St(i, r))
            }
            return s
        }, r.sortStable = b.split("").sort(k).join("") === b, r.detectDuplicates = C, c(), r.sortDetached = at(function (e) {
            return e.compareDocumentPosition(h.createElement("div")) & 1
        }), at(function (e) {
            return e.innerHTML = "<a href='#'></a>", e.firstChild.getAttribute("href") === "#"
        }) || ft("type|href|height|width", function (e, t, n) {
            if (!n)return e.getAttribute(t, t.toLowerCase() === "type" ? 1 : 2)
        }), (!r.attributes || !at(function (e) {
            return e.innerHTML = "<input/>", e.firstChild.setAttribute("value", ""), e.firstChild.getAttribute("value") === ""
        })) && ft("value", function (e, t, n) {
            if (!n && e.nodeName.toLowerCase() === "input")return e.defaultValue
        }), at(function (e) {
            return e.getAttribute("disabled") == null
        }) || ft(j, function (e, t, n) {
            var r;
            if (!n)return(r = e.getAttributeNode(t)) && r.specified ? r.value : e[t] === !0 ? t.toLowerCase() : null
        }), jQuery.find = st, jQuery.expr = st.selectors, jQuery.expr[":"] = jQuery.expr.pseudos, jQuery.unique = st.uniqueSort, jQuery.text = st.getText, jQuery.isXMLDoc = st.isXML, jQuery.contains = st.contains
    }(window);
    var optionsCache = {};
    jQuery.Callbacks = function (e) {
        e = typeof e == "string" ? optionsCache[e] || createOptions(e) : jQuery.extend({}, e);
        var t, n, r, i, s, o, u = [], a = !e.once && [], f = function (c) {
            t = e.memory && c, n = !0, o = i || 0, i = 0, s = u.length, r = !0;
            for (; u && o < s; o++)if (u[o].apply(c[0], c[1]) === !1 && e.stopOnFalse) {
                t = !1;
                break
            }
            r = !1, u && (a ? a.length && f(a.shift()) : t ? u = [] : l.disable())
        }, l = {add: function () {
            if (u) {
                var n = u.length;
                (function o(t) {
                    jQuery.each(t, function (t, n) {
                        var r = jQuery.type(n);
                        r === "function" ? (!e.unique || !l.has(n)) && u.push(n) : n && n.length && r !== "string" && o(n)
                    })
                })(arguments), r ? s = u.length : t && (i = n, f(t))
            }
            return this
        }, remove: function () {
            return u && jQuery.each(arguments, function (e, t) {
                var n;
                while ((n = jQuery.inArray(t, u, n)) > -1)u.splice(n, 1), r && (n <= s && s--, n <= o && o--)
            }), this
        }, has: function (e) {
            return e ? jQuery.inArray(e, u) > -1 : !!u && !!u.length
        }, empty: function () {
            return u = [], s = 0, this
        }, disable: function () {
            return u = a = t = undefined, this
        }, disabled: function () {
            return!u
        }, lock: function () {
            return a = undefined, t || l.disable(), this
        }, locked: function () {
            return!a
        }, fireWith: function (e, t) {
            return u && (!n || a) && (t = t || [], t = [e, t.slice ? t.slice() : t], r ? a.push(t) : f(t)), this
        }, fire: function () {
            return l.fireWith(this, arguments), this
        }, fired: function () {
            return!!n
        }};
        return l
    }, jQuery.extend({Deferred: function (e) {
        var t = [
            ["resolve", "done", jQuery.Callbacks("once memory"), "resolved"],
            ["reject", "fail", jQuery.Callbacks("once memory"), "rejected"],
            ["notify", "progress", jQuery.Callbacks("memory")]
        ], n = "pending", r = {state: function () {
            return n
        }, always: function () {
            return i.done(arguments).fail(arguments), this
        }, then: function () {
            var e = arguments;
            return jQuery.Deferred(function (n) {
                jQuery.each(t, function (t, s) {
                    var o = s[0], u = jQuery.isFunction(e[t]) && e[t];
                    i[s[1]](function () {
                        var e = u && u.apply(this, arguments);
                        e && jQuery.isFunction(e.promise) ? e.promise().done(n.resolve).fail(n.reject).progress(n.notify) : n[o + "With"](this === r ? n.promise() : this, u ? [e] : arguments)
                    })
                }), e = null
            }).promise()
        }, promise: function (e) {
            return e != null ? jQuery.extend(e, r) : r
        }}, i = {};
        return r.pipe = r.then, jQuery.each(t, function (e, s) {
            var o = s[2], u = s[3];
            r[s[1]] = o.add, u && o.add(function () {
                n = u
            }, t[e ^ 1][2].disable, t[2][2].lock), i[s[0]] = function () {
                return i[s[0] + "With"](this === i ? r : this, arguments), this
            }, i[s[0] + "With"] = o.fireWith
        }), r.promise(i), e && e.call(i, i), i
    }, when: function (e) {
        var t = 0, n = core_slice.call(arguments), r = n.length, i = r !== 1 || e && jQuery.isFunction(e.promise) ? r : 0, s = i === 1 ? e : jQuery.Deferred(), o = function (e, t, n) {
            return function (r) {
                t[e] = this, n[e] = arguments.length > 1 ? core_slice.call(arguments) : r, n === u ? s.notifyWith(t, n) : --i || s.resolveWith(t, n)
            }
        }, u, a, f;
        if (r > 1) {
            u = new Array(r), a = new Array(r), f = new Array(r);
            for (; t < r; t++)n[t] && jQuery.isFunction(n[t].promise) ? n[t].promise().done(o(t, f, n)).fail(s.reject).progress(o(t, a, u)) : --i
        }
        return i || s.resolveWith(f, n), s.promise()
    }}), jQuery.support = function (e) {
        var t = document.createElement("input"), n = document.createDocumentFragment(), r = document.createElement("div"), i = document.createElement("select"), s = i.appendChild(document.createElement("option"));
        return t.type ? (t.type = "checkbox", e.checkOn = t.value !== "", e.optSelected = s.selected, e.reliableMarginRight = !0, e.boxSizingReliable = !0, e.pixelPosition = !1, t.checked = !0, e.noCloneChecked = t.cloneNode(!0).checked, i.disabled = !0, e.optDisabled = !s.disabled, t = document.createElement("input"), t.value = "t", t.type = "radio", e.radioValue = t.value === "t", t.setAttribute("checked", "t"), t.setAttribute("name", "t"), n.appendChild(t), e.checkClone = n.cloneNode(!0).cloneNode(!0).lastChild.checked, e.focusinBubbles = "onfocusin"in window, r.style.backgroundClip = "content-box", r.cloneNode(!0).style.backgroundClip = "", e.clearCloneStyle = r.style.backgroundClip === "content-box", jQuery(function () {
            var t, n, i = "padding:0;margin:0;border:0;display:block;-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box", s = document.getElementsByTagName("body")[0];
            if (!s)return;
            t = document.createElement("div"), t.style.cssText = "border:0;width:0;height:0;position:absolute;top:0;left:-9999px;margin-top:1px", s.appendChild(t).appendChild(r), r.innerHTML = "", r.style.cssText = "-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;padding:1px;border:1px;display:block;width:4px;margin-top:1%;position:absolute;top:1%", jQuery.swap(s, s.style.zoom != null ? {zoom: 1} : {}, function () {
                e.boxSizing = r.offsetWidth === 4
            }), window.getComputedStyle && (e.pixelPosition = (window.getComputedStyle(r, null) || {}).top !== "1%", e.boxSizingReliable = (window.getComputedStyle(r, null) || {width: "4px"}).width === "4px", n = r.appendChild(document.createElement("div")), n.style.cssText = r.style.cssText = i, n.style.marginRight = n.style.width = "0", r.style.width = "1px", e.reliableMarginRight = !parseFloat((window.getComputedStyle(n, null) || {}).marginRight)), s.removeChild(t)
        }), e) : e
    }({});
    var data_user, data_priv, rbrace = /(?:\{[\s\S]*\}|\[[\s\S]*\])$/, rmultiDash = /([A-Z])/g;
    Data.uid = 1, Data.accepts = function (e) {
        return e.nodeType ? e.nodeType === 1 || e.nodeType === 9 : !0
    }, Data.prototype = {key: function (e) {
        if (!Data.accepts(e))return 0;
        var t = {}, n = e[this.expando];
        if (!n) {
            n = Data.uid++;
            try {
                t[this.expando] = {value: n}, Object.defineProperties(e, t)
            } catch (r) {
                t[this.expando] = n, jQuery.extend(e, t)
            }
        }
        return this.cache[n] || (this.cache[n] = {}), n
    }, set: function (e, t, n) {
        var r, i = this.key(e), s = this.cache[i];
        if (typeof t == "string")s[t] = n; else if (jQuery.isEmptyObject(s))jQuery.extend(this.cache[i], t); else for (r in t)s[r] = t[r];
        return s
    }, get: function (e, t) {
        var n = this.cache[this.key(e)];
        return t === undefined ? n : n[t]
    }, access: function (e, t, n) {
        var r;
        return t === undefined || t && typeof t == "string" && n === undefined ? (r = this.get(e, t), r !== undefined ? r : this.get(e, jQuery.camelCase(t))) : (this.set(e, t, n), n !== undefined ? n : t)
    }, remove: function (e, t) {
        var n, r, i, s = this.key(e), o = this.cache[s];
        if (t === undefined)this.cache[s] = {}; else {
            jQuery.isArray(t) ? r = t.concat(t.map(jQuery.camelCase)) : (i = jQuery.camelCase(t), t in o ? r = [t, i] : (r = i, r = r in o ? [r] : r.match(core_rnotwhite) || [])), n = r.length;
            while (n--)delete o[r[n]]
        }
    }, hasData: function (e) {
        return!jQuery.isEmptyObject(this.cache[e[this.expando]] || {})
    }, discard: function (e) {
        e[this.expando] && delete this.cache[e[this.expando]]
    }}, data_user = new Data, data_priv = new Data, jQuery.extend({acceptData: Data.accepts, hasData: function (e) {
        return data_user.hasData(e) || data_priv.hasData(e)
    }, data: function (e, t, n) {
        return data_user.access(e, t, n)
    }, removeData: function (e, t) {
        data_user.remove(e, t)
    }, _data: function (e, t, n) {
        return data_priv.access(e, t, n)
    }, _removeData: function (e, t) {
        data_priv.remove(e, t)
    }}), jQuery.fn.extend({data: function (e, t) {
        var n, r, i = this[0], s = 0, o = null;
        if (e === undefined) {
            if (this.length) {
                o = data_user.get(i);
                if (i.nodeType === 1 && !data_priv.get(i, "hasDataAttrs")) {
                    n = i.attributes;
                    for (; s < n.length; s++)r = n[s].name, r.indexOf("data-") === 0 && (r = jQuery.camelCase(r.slice(5)), dataAttr(i, r, o[r]));
                    data_priv.set(i, "hasDataAttrs", !0)
                }
            }
            return o
        }
        return typeof e == "object" ? this.each(function () {
            data_user.set(this, e)
        }) : jQuery.access(this, function (t) {
            var n, r = jQuery.camelCase(e);
            if (i && t === undefined) {
                n = data_user.get(i, e);
                if (n !== undefined)return n;
                n = data_user.get(i, r);
                if (n !== undefined)return n;
                n = dataAttr(i, r, undefined);
                if (n !== undefined)return n;
                return
            }
            this.each(function () {
                var n = data_user.get(this, r);
                data_user.set(this, r, t), e.indexOf("-") !== -1 && n !== undefined && data_user.set(this, e, t)
            })
        }, null, t, arguments.length > 1, null, !0)
    }, removeData: function (e) {
        return this.each(function () {
            data_user.remove(this, e)
        })
    }}), jQuery.extend({queue: function (e, t, n) {
        var r;
        if (e)return t = (t || "fx") + "queue", r = data_priv.get(e, t), n && (!r || jQuery.isArray(n) ? r = data_priv.access(e, t, jQuery.makeArray(n)) : r.push(n)), r || []
    }, dequeue: function (e, t) {
        t = t || "fx";
        var n = jQuery.queue(e, t), r = n.length, i = n.shift(), s = jQuery._queueHooks(e, t), o = function () {
            jQuery.dequeue(e, t)
        };
        i === "inprogress" && (i = n.shift(), r--), i && (t === "fx" && n.unshift("inprogress"), delete s.stop, i.call(e, o, s)), !r && s && s.empty.fire()
    }, _queueHooks: function (e, t) {
        var n = t + "queueHooks";
        return data_priv.get(e, n) || data_priv.access(e, n, {empty: jQuery.Callbacks("once memory").add(function () {
            data_priv.remove(e, [t + "queue", n])
        })})
    }}), jQuery.fn.extend({queue: function (e, t) {
        var n = 2;
        return typeof e != "string" && (t = e, e = "fx", n--), arguments.length < n ? jQuery.queue(this[0], e) : t === undefined ? this : this.each(function () {
            var n = jQuery.queue(this, e, t);
            jQuery._queueHooks(this, e), e === "fx" && n[0] !== "inprogress" && jQuery.dequeue(this, e)
        })
    }, dequeue: function (e) {
        return this.each(function () {
            jQuery.dequeue(this, e)
        })
    }, delay: function (e, t) {
        return e = jQuery.fx ? jQuery.fx.speeds[e] || e : e, t = t || "fx", this.queue(t, function (t, n) {
            var r = setTimeout(t, e);
            n.stop = function () {
                clearTimeout(r)
            }
        })
    }, clearQueue: function (e) {
        return this.queue(e || "fx", [])
    }, promise: function (e, t) {
        var n, r = 1, i = jQuery.Deferred(), s = this, o = this.length, u = function () {
            --r || i.resolveWith(s, [s])
        };
        typeof e != "string" && (t = e, e = undefined), e = e || "fx";
        while (o--)n = data_priv.get(s[o], e + "queueHooks"), n && n.empty && (r++, n.empty.add(u));
        return u(), i.promise(t)
    }});
    var nodeHook, boolHook, rclass = /[\t\r\n\f]/g, rreturn = /\r/g, rfocusable = /^(?:input|select|textarea|button)$/i;
    jQuery.fn.extend({attr: function (e, t) {
        return jQuery.access(this, jQuery.attr, e, t, arguments.length > 1)
    }, removeAttr: function (e) {
        return this.each(function () {
            jQuery.removeAttr(this, e)
        })
    }, prop: function (e, t) {
        return jQuery.access(this, jQuery.prop, e, t, arguments.length > 1)
    }, removeProp: function (e) {
        return this.each(function () {
            delete this[jQuery.propFix[e] || e]
        })
    }, addClass: function (e) {
        var t, n, r, i, s, o = 0, u = this.length, a = typeof e == "string" && e;
        if (jQuery.isFunction(e))return this.each(function (t) {
            jQuery(this).addClass(e.call(this, t, this.className))
        });
        if (a) {
            t = (e || "").match(core_rnotwhite) || [];
            for (; o < u; o++) {
                n = this[o], r = n.nodeType === 1 && (n.className ? (" " + n.className + " ").replace(rclass, " ") : " ");
                if (r) {
                    s = 0;
                    while (i = t[s++])r.indexOf(" " + i + " ") < 0 && (r += i + " ");
                    n.className = jQuery.trim(r)
                }
            }
        }
        return this
    }, removeClass: function (e) {
        var t, n, r, i, s, o = 0, u = this.length, a = arguments.length === 0 || typeof e == "string" && e;
        if (jQuery.isFunction(e))return this.each(function (t) {
            jQuery(this).removeClass(e.call(this, t, this.className))
        });
        if (a) {
            t = (e || "").match(core_rnotwhite) || [];
            for (; o < u; o++) {
                n = this[o], r = n.nodeType === 1 && (n.className ? (" " + n.className + " ").replace(rclass, " ") : "");
                if (r) {
                    s = 0;
                    while (i = t[s++])while (r.indexOf(" " + i + " ") >= 0)r = r.replace(" " + i + " ", " ");
                    n.className = e ? jQuery.trim(r) : ""
                }
            }
        }
        return this
    }, toggleClass: function (e, t) {
        var n = typeof e;
        return typeof t == "boolean" && n === "string" ? t ? this.addClass(e) : this.removeClass(e) : jQuery.isFunction(e) ? this.each(function (n) {
            jQuery(this).toggleClass(e.call(this, n, this.className, t), t)
        }) : this.each(function () {
            if (n === "string") {
                var t, r = 0, i = jQuery(this), s = e.match(core_rnotwhite) || [];
                while (t = s[r++])i.hasClass(t) ? i.removeClass(t) : i.addClass(t)
            } else if (n === core_strundefined || n === "boolean")this.className && data_priv.set(this, "__className__", this.className), this.className = this.className || e === !1 ? "" : data_priv.get(this, "__className__") || ""
        })
    }, hasClass: function (e) {
        var t = " " + e + " ", n = 0, r = this.length;
        for (; n < r; n++)if (this[n].nodeType === 1 && (" " + this[n].className + " ").replace(rclass, " ").indexOf(t) >= 0)return!0;
        return!1
    }, val: function (e) {
        var t, n, r, i = this[0];
        if (!arguments.length) {
            if (i)return t = jQuery.valHooks[i.type] || jQuery.valHooks[i.nodeName.toLowerCase()], t && "get"in t && (n = t.get(i, "value")) !== undefined ? n : (n = i.value, typeof n == "string" ? n.replace(rreturn, "") : n == null ? "" : n);
            return
        }
        return r = jQuery.isFunction(e), this.each(function (n) {
            var i;
            if (this.nodeType !== 1)return;
            r ? i = e.call(this, n, jQuery(this).val()) : i = e, i == null ? i = "" : typeof i == "number" ? i += "" : jQuery.isArray(i) && (i = jQuery.map(i, function (e) {
                return e == null ? "" : e + ""
            })), t = jQuery.valHooks[this.type] || jQuery.valHooks[this.nodeName.toLowerCase()];
            if (!t || !("set"in t) || t.set(this, i, "value") === undefined)this.value = i
        })
    }}), jQuery.extend({valHooks: {option: {get: function (e) {
        var t = e.attributes.value;
        return!t || t.specified ? e.value : e.text
    }}, select: {get: function (e) {
        var t, n, r = e.options, i = e.selectedIndex, s = e.type === "select-one" || i < 0, o = s ? null : [], u = s ? i + 1 : r.length, a = i < 0 ? u : s ? i : 0;
        for (; a < u; a++) {
            n = r[a];
            if ((n.selected || a === i) && (jQuery.support.optDisabled ? !n.disabled : n.getAttribute("disabled") === null) && (!n.parentNode.disabled || !jQuery.nodeName(n.parentNode, "optgroup"))) {
                t = jQuery(n).val();
                if (s)return t;
                o.push(t)
            }
        }
        return o
    }, set: function (e, t) {
        var n, r, i = e.options, s = jQuery.makeArray(t), o = i.length;
        while (o--) {
            r = i[o];
            if (r.selected = jQuery.inArray(jQuery(r).val(), s) >= 0)n = !0
        }
        return n || (e.selectedIndex = -1), s
    }}}, attr: function (e, t, n) {
        var r, i, s = e.nodeType;
        if (!e || s === 3 || s === 8 || s === 2)return;
        if (typeof e.getAttribute === core_strundefined)return jQuery.prop(e, t, n);
        if (s !== 1 || !jQuery.isXMLDoc(e))t = t.toLowerCase(), r = jQuery.attrHooks[t] || (jQuery.expr.match.bool.test(t) ? boolHook : nodeHook);
        if (n === undefined)return r && "get"in r && (i = r.get(e, t)) !== null ? i : (i = jQuery.find.attr(e, t), i == null ? undefined : i);
        if (n !== null)return r && "set"in r && (i = r.set(e, n, t)) !== undefined ? i : (e.setAttribute(t, n + ""), n);
        jQuery.removeAttr(e, t)
    }, removeAttr: function (e, t) {
        var n, r, i = 0, s = t && t.match(core_rnotwhite);
        if (s && e.nodeType === 1)while (n = s[i++])r = jQuery.propFix[n] || n, jQuery.expr.match.bool.test(n) && (e[r] = !1), e.removeAttribute(n)
    }, attrHooks: {type: {set: function (e, t) {
        if (!jQuery.support.radioValue && t === "radio" && jQuery.nodeName(e, "input")) {
            var n = e.value;
            return e.setAttribute("type", t), n && (e.value = n), t
        }
    }}}, propFix: {"for": "htmlFor", "class": "className"}, prop: function (e, t, n) {
        var r, i, s, o = e.nodeType;
        if (!e || o === 3 || o === 8 || o === 2)return;
        return s = o !== 1 || !jQuery.isXMLDoc(e), s && (t = jQuery.propFix[t] || t, i = jQuery.propHooks[t]), n !== undefined ? i && "set"in i && (r = i.set(e, n, t)) !== undefined ? r : e[t] = n : i && "get"in i && (r = i.get(e, t)) !== null ? r : e[t]
    }, propHooks: {tabIndex: {get: function (e) {
        return e.hasAttribute("tabindex") || rfocusable.test(e.nodeName) || e.href ? e.tabIndex : -1
    }}}}), boolHook = {set: function (e, t, n) {
        return t === !1 ? jQuery.removeAttr(e, n) : e.setAttribute(n, n), n
    }}, jQuery.each(jQuery.expr.match.bool.source.match(/\w+/g), function (e, t) {
        var n = jQuery.expr.attrHandle[t] || jQuery.find.attr;
        jQuery.expr.attrHandle[t] = function (e, t, r) {
            var i = jQuery.expr.attrHandle[t], s = r ? undefined : (jQuery.expr.attrHandle[t] = undefined) != n(e, t, r) ? t.toLowerCase() : null;
            return jQuery.expr.attrHandle[t] = i, s
        }
    }), jQuery.support.optSelected || (jQuery.propHooks.selected = {get: function (e) {
        var t = e.parentNode;
        return t && t.parentNode && t.parentNode.selectedIndex, null
    }}), jQuery.each(["tabIndex", "readOnly", "maxLength", "cellSpacing", "cellPadding", "rowSpan", "colSpan", "useMap", "frameBorder", "contentEditable"], function () {
        jQuery.propFix[this.toLowerCase()] = this
    }), jQuery.each(["radio", "checkbox"], function () {
        jQuery.valHooks[this] = {set: function (e, t) {
            if (jQuery.isArray(t))return e.checked = jQuery.inArray(jQuery(e).val(), t) >= 0
        }}, jQuery.support.checkOn || (jQuery.valHooks[this].get = function (e) {
            return e.getAttribute("value") === null ? "on" : e.value
        })
    });
    var rkeyEvent = /^key/, rmouseEvent = /^(?:mouse|contextmenu)|click/, rfocusMorph = /^(?:focusinfocus|focusoutblur)$/, rtypenamespace = /^([^.]*)(?:\.(.+)|)$/;
    jQuery.event = {global: {}, add: function (e, t, n, r, i) {
        var s, o, u, a, f, l, c, h, p, d, v, m = data_priv.get(e);
        if (!m)return;
        n.handler && (s = n, n = s.handler, i = s.selector), n.guid || (n.guid = jQuery.guid++), (a = m.events) || (a = m.events = {}), (o = m.handle) || (o = m.handle = function (e) {
            return typeof jQuery === core_strundefined || !!e && jQuery.event.triggered === e.type ? undefined : jQuery.event.dispatch.apply(o.elem, arguments)
        }, o.elem = e), t = (t || "").match(core_rnotwhite) || [""], f = t.length;
        while (f--) {
            u = rtypenamespace.exec(t[f]) || [], p = v = u[1], d = (u[2] || "").split(".").sort();
            if (!p)continue;
            c = jQuery.event.special[p] || {}, p = (i ? c.delegateType : c.bindType) || p, c = jQuery.event.special[p] || {}, l = jQuery.extend({type: p, origType: v, data: r, handler: n, guid: n.guid, selector: i, needsContext: i && jQuery.expr.match.needsContext.test(i), namespace: d.join(".")}, s), (h = a[p]) || (h = a[p] = [], h.delegateCount = 0, (!c.setup || c.setup.call(e, r, d, o) === !1) && e.addEventListener && e.addEventListener(p, o, !1)), c.add && (c.add.call(e, l), l.handler.guid || (l.handler.guid = n.guid)), i ? h.splice(h.delegateCount++, 0, l) : h.push(l), jQuery.event.global[p] = !0
        }
        e = null
    }, remove: function (e, t, n, r, i) {
        var s, o, u, a, f, l, c, h, p, d, v, m = data_priv.hasData(e) && data_priv.get(e);
        if (!m || !(a = m.events))return;
        t = (t || "").match(core_rnotwhite) || [""], f = t.length;
        while (f--) {
            u = rtypenamespace.exec(t[f]) || [], p = v = u[1], d = (u[2] || "").split(".").sort();
            if (!p) {
                for (p in a)jQuery.event.remove(e, p + t[f], n, r, !0);
                continue
            }
            c = jQuery.event.special[p] || {}, p = (r ? c.delegateType : c.bindType) || p, h = a[p] || [], u = u[2] && new RegExp("(^|\\.)" + d.join("\\.(?:.*\\.|)") + "(\\.|$)"), o = s = h.length;
            while (s--)l = h[s], (i || v === l.origType) && (!n || n.guid === l.guid) && (!u || u.test(l.namespace)) && (!r || r === l.selector || r === "**" && l.selector) && (h.splice(s, 1), l.selector && h.delegateCount--, c.remove && c.remove.call(e, l));
            o && !h.length && ((!c.teardown || c.teardown.call(e, d, m.handle) === !1) && jQuery.removeEvent(e, p, m.handle), delete a[p])
        }
        jQuery.isEmptyObject(a) && (delete m.handle, data_priv.remove(e, "events"))
    }, trigger: function (e, t, n, r) {
        var i, s, o, u, a, f, l, c = [n || document], h = core_hasOwn.call(e, "type") ? e.type : e, p = core_hasOwn.call(e, "namespace") ? e.namespace.split(".") : [];
        s = o = n = n || document;
        if (n.nodeType === 3 || n.nodeType === 8)return;
        if (rfocusMorph.test(h + jQuery.event.triggered))return;
        h.indexOf(".") >= 0 && (p = h.split("."), h = p.shift(), p.sort()), a = h.indexOf(":") < 0 && "on" + h, e = e[jQuery.expando] ? e : new jQuery.Event(h, typeof e == "object" && e), e.isTrigger = r ? 2 : 3, e.namespace = p.join("."), e.namespace_re = e.namespace ? new RegExp("(^|\\.)" + p.join("\\.(?:.*\\.|)") + "(\\.|$)") : null, e.result = undefined, e.target || (e.target = n), t = t == null ? [e] : jQuery.makeArray(t, [e]), l = jQuery.event.special[h] || {};
        if (!r && l.trigger && l.trigger.apply(n, t) === !1)return;
        if (!r && !l.noBubble && !jQuery.isWindow(n)) {
            u = l.delegateType || h, rfocusMorph.test(u + h) || (s = s.parentNode);
            for (; s; s = s.parentNode)c.push(s), o = s;
            o === (n.ownerDocument || document) && c.push(o.defaultView || o.parentWindow || window)
        }
        i = 0;
        while ((s = c[i++]) && !e.isPropagationStopped())e.type = i > 1 ? u : l.bindType || h, f = (data_priv.get(s, "events") || {})[e.type] && data_priv.get(s, "handle"), f && f.apply(s, t), f = a && s[a], f && jQuery.acceptData(s) && f.apply && f.apply(s, t) === !1 && e.preventDefault();
        return e.type = h, !r && !e.isDefaultPrevented() && (!l._default || l._default.apply(c.pop(), t) === !1) && jQuery.acceptData(n) && a && jQuery.isFunction(n[h]) && !jQuery.isWindow(n) && (o = n[a], o && (n[a] = null), jQuery.event.triggered = h, n[h](), jQuery.event.triggered = undefined, o && (n[a] = o)), e.result
    }, dispatch: function (e) {
        e = jQuery.event.fix(e);
        var t, n, r, i, s, o = [], u = core_slice.call(arguments), a = (data_priv.get(this, "events") || {})[e.type] || [], f = jQuery.event.special[e.type] || {};
        u[0] = e, e.delegateTarget = this;
        if (f.preDispatch && f.preDispatch.call(this, e) === !1)return;
        o = jQuery.event.handlers.call(this, e, a), t = 0;
        while ((i = o[t++]) && !e.isPropagationStopped()) {
            e.currentTarget = i.elem, n = 0;
            while ((s = i.handlers[n++]) && !e.isImmediatePropagationStopped())if (!e.namespace_re || e.namespace_re.test(s.namespace))e.handleObj = s, e.data = s.data, r = ((jQuery.event.special[s.origType] || {}).handle || s.handler).apply(i.elem, u), r !== undefined && (e.result = r) === !1 && (e.preventDefault(), e.stopPropagation())
        }
        return f.postDispatch && f.postDispatch.call(this, e), e.result
    }, handlers: function (e, t) {
        var n, r, i, s, o = [], u = t.delegateCount, a = e.target;
        if (u && a.nodeType && (!e.button || e.type !== "click"))for (; a !== this; a = a.parentNode || this)if (a.disabled !== !0 || e.type !== "click") {
            r = [];
            for (n = 0; n < u; n++)s = t[n], i = s.selector + " ", r[i] === undefined && (r[i] = s.needsContext ? jQuery(i, this).index(a) >= 0 : jQuery.find(i, this, null, [a]).length), r[i] && r.push(s);
            r.length && o.push({elem: a, handlers: r})
        }
        return u < t.length && o.push({elem: this, handlers: t.slice(u)}), o
    }, props: "altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "), fixHooks: {}, keyHooks: {props: "char charCode key keyCode".split(" "), filter: function (e, t) {
        return e.which == null && (e.which = t.charCode != null ? t.charCode : t.keyCode), e
    }}, mouseHooks: {props: "button buttons clientX clientY offsetX offsetY pageX pageY screenX screenY toElement".split(" "), filter: function (e, t) {
        var n, r, i, s = t.button;
        return e.pageX == null && t.clientX != null && (n = e.target.ownerDocument || document, r = n.documentElement, i = n.body, e.pageX = t.clientX + (r && r.scrollLeft || i && i.scrollLeft || 0) - (r && r.clientLeft || i && i.clientLeft || 0), e.pageY = t.clientY + (r && r.scrollTop || i && i.scrollTop || 0) - (r && r.clientTop || i && i.clientTop || 0)), !e.which && s !== undefined && (e.which = s & 1 ? 1 : s & 2 ? 3 : s & 4 ? 2 : 0), e
    }}, fix: function (e) {
        if (e[jQuery.expando])return e;
        var t, n, r, i = e.type, s = e, o = this.fixHooks[i];
        o || (this.fixHooks[i] = o = rmouseEvent.test(i) ? this.mouseHooks : rkeyEvent.test(i) ? this.keyHooks : {}), r = o.props ? this.props.concat(o.props) : this.props, e = new jQuery.Event(s), t = r.length;
        while (t--)n = r[t], e[n] = s[n];
        return e.target || (e.target = document), e.target.nodeType === 3 && (e.target = e.target.parentNode), o.filter ? o.filter(e, s) : e
    }, special: {load: {noBubble: !0}, focus: {trigger: function () {
        if (this !== safeActiveElement() && this.focus)return this.focus(), !1
    }, delegateType: "focusin"}, blur: {trigger: function () {
        if (this === safeActiveElement() && this.blur)return this.blur(), !1
    }, delegateType: "focusout"}, click: {trigger: function () {
        if (this.type === "checkbox" && this.click && jQuery.nodeName(this, "input"))return this.click(), !1
    }, _default: function (e) {
        return jQuery.nodeName(e.target, "a")
    }}, beforeunload: {postDispatch: function (e) {
        e.result !== undefined && (e.originalEvent.returnValue = e.result)
    }}}, simulate: function (e, t, n, r) {
        var i = jQuery.extend(new jQuery.Event, n, {type: e, isSimulated: !0, originalEvent: {}});
        r ? jQuery.event.trigger(i, null, t) : jQuery.event.dispatch.call(t, i), i.isDefaultPrevented() && n.preventDefault()
    }}, jQuery.removeEvent = function (e, t, n) {
        e.removeEventListener && e.removeEventListener(t, n, !1)
    }, jQuery.Event = function (e, t) {
        if (!(this instanceof jQuery.Event))return new jQuery.Event(e, t);
        e && e.type ? (this.originalEvent = e, this.type = e.type, this.isDefaultPrevented = e.defaultPrevented || e.getPreventDefault && e.getPreventDefault() ? returnTrue : returnFalse) : this.type = e, t && jQuery.extend(this, t), this.timeStamp = e && e.timeStamp || jQuery.now(), this[jQuery.expando] = !0
    }, jQuery.Event.prototype = {isDefaultPrevented: returnFalse, isPropagationStopped: returnFalse, isImmediatePropagationStopped: returnFalse, preventDefault: function () {
        var e = this.originalEvent;
        this.isDefaultPrevented = returnTrue, e && e.preventDefault && e.preventDefault()
    }, stopPropagation: function () {
        var e = this.originalEvent;
        this.isPropagationStopped = returnTrue, e && e.stopPropagation && e.stopPropagation()
    }, stopImmediatePropagation: function () {
        this.isImmediatePropagationStopped = returnTrue, this.stopPropagation()
    }}, jQuery.each({mouseenter: "mouseover", mouseleave: "mouseout"}, function (e, t) {
        jQuery.event.special[e] = {delegateType: t, bindType: t, handle: function (e) {
            var n, r = this, i = e.relatedTarget, s = e.handleObj;
            if (!i || i !== r && !jQuery.contains(r, i))e.type = s.origType, n = s.handler.apply(this, arguments), e.type = t;
            return n
        }}
    }), jQuery.support.focusinBubbles || jQuery.each({focus: "focusin", blur: "focusout"}, function (e, t) {
        var n = 0, r = function (e) {
            jQuery.event.simulate(t, e.target, jQuery.event.fix(e), !0)
        };
        jQuery.event.special[t] = {setup: function () {
            n++ === 0 && document.addEventListener(e, r, !0)
        }, teardown: function () {
            --n === 0 && document.removeEventListener(e, r, !0)
        }}
    }), jQuery.fn.extend({on: function (e, t, n, r, i) {
        var s, o;
        if (typeof e == "object") {
            typeof t != "string" && (n = n || t, t = undefined);
            for (o in e)this.on(o, t, n, e[o], i);
            return this
        }
        n == null && r == null ? (r = t, n = t = undefined) : r == null && (typeof t == "string" ? (r = n, n = undefined) : (r = n, n = t, t = undefined));
        if (r === !1)r = returnFalse; else if (!r)return this;
        return i === 1 && (s = r, r = function (e) {
            return jQuery().off(e), s.apply(this, arguments)
        }, r.guid = s.guid || (s.guid = jQuery.guid++)), this.each(function () {
            jQuery.event.add(this, e, r, n, t)
        })
    }, one: function (e, t, n, r) {
        return this.on(e, t, n, r, 1)
    }, off: function (e, t, n) {
        var r, i;
        if (e && e.preventDefault && e.handleObj)return r = e.handleObj, jQuery(e.delegateTarget).off(r.namespace ? r.origType + "." + r.namespace : r.origType, r.selector, r.handler), this;
        if (typeof e == "object") {
            for (i in e)this.off(i, t, e[i]);
            return this
        }
        if (t === !1 || typeof t == "function")n = t, t = undefined;
        return n === !1 && (n = returnFalse), this.each(function () {
            jQuery.event.remove(this, e, n, t)
        })
    }, trigger: function (e, t) {
        return this.each(function () {
            jQuery.event.trigger(e, t, this)
        })
    }, triggerHandler: function (e, t) {
        var n = this[0];
        if (n)return jQuery.event.trigger(e, t, n, !0)
    }});
    var isSimple = /^.[^:#\[\.,]*$/, rparentsprev = /^(?:parents|prev(?:Until|All))/, rneedsContext = jQuery.expr.match.needsContext, guaranteedUnique = {children: !0, contents: !0, next: !0, prev: !0};
    jQuery.fn.extend({find: function (e) {
        var t, n = [], r = this, i = r.length;
        if (typeof e != "string")return this.pushStack(jQuery(e).filter(function () {
            for (t = 0; t < i; t++)if (jQuery.contains(r[t], this))return!0
        }));
        for (t = 0; t < i; t++)jQuery.find(e, r[t], n);
        return n = this.pushStack(i > 1 ? jQuery.unique(n) : n), n.selector = this.selector ? this.selector + " " + e : e, n
    }, has: function (e) {
        var t = jQuery(e, this), n = t.length;
        return this.filter(function () {
            var e = 0;
            for (; e < n; e++)if (jQuery.contains(this, t[e]))return!0
        })
    }, not: function (e) {
        return this.pushStack(winnow(this, e || [], !0))
    }, filter: function (e) {
        return this.pushStack(winnow(this, e || [], !1))
    }, is: function (e) {
        return!!winnow(this, typeof e == "string" && rneedsContext.test(e) ? jQuery(e) : e || [], !1).length
    }, closest: function (e, t) {
        var n, r = 0, i = this.length, s = [], o = rneedsContext.test(e) || typeof e != "string" ? jQuery(e, t || this.context) : 0;
        for (; r < i; r++)for (n = this[r]; n && n !== t; n = n.parentNode)if (n.nodeType < 11 && (o ? o.index(n) > -1 : n.nodeType === 1 && jQuery.find.matchesSelector(n, e))) {
            n = s.push(n);
            break
        }
        return this.pushStack(s.length > 1 ? jQuery.unique(s) : s)
    }, index: function (e) {
        return e ? typeof e == "string" ? core_indexOf.call(jQuery(e), this[0]) : core_indexOf.call(this, e.jquery ? e[0] : e) : this[0] && this[0].parentNode ? this.first().prevAll().length : -1
    }, add: function (e, t) {
        var n = typeof e == "string" ? jQuery(e, t) : jQuery.makeArray(e && e.nodeType ? [e] : e), r = jQuery.merge(this.get(), n);
        return this.pushStack(jQuery.unique(r))
    }, addBack: function (e) {
        return this.add(e == null ? this.prevObject : this.prevObject.filter(e))
    }}), jQuery.each({parent: function (e) {
        var t = e.parentNode;
        return t && t.nodeType !== 11 ? t : null
    }, parents: function (e) {
        return jQuery.dir(e, "parentNode")
    }, parentsUntil: function (e, t, n) {
        return jQuery.dir(e, "parentNode", n)
    }, next: function (e) {
        return sibling(e, "nextSibling")
    }, prev: function (e) {
        return sibling(e, "previousSibling")
    }, nextAll: function (e) {
        return jQuery.dir(e, "nextSibling")
    }, prevAll: function (e) {
        return jQuery.dir(e, "previousSibling")
    }, nextUntil: function (e, t, n) {
        return jQuery.dir(e, "nextSibling", n)
    }, prevUntil: function (e, t, n) {
        return jQuery.dir(e, "previousSibling", n)
    }, siblings: function (e) {
        return jQuery.sibling((e.parentNode || {}).firstChild, e)
    }, children: function (e) {
        return jQuery.sibling(e.firstChild)
    }, contents: function (e) {
        return e.contentDocument || jQuery.merge([], e.childNodes)
    }}, function (e, t) {
        jQuery.fn[e] = function (n, r) {
            var i = jQuery.map(this, t, n);
            return e.slice(-5) !== "Until" && (r = n), r && typeof r == "string" && (i = jQuery.filter(r, i)), this.length > 1 && (guaranteedUnique[e] || jQuery.unique(i), rparentsprev.test(e) && i.reverse()), this.pushStack(i)
        }
    }), jQuery.extend({filter: function (e, t, n) {
        var r = t[0];
        return n && (e = ":not(" + e + ")"), t.length === 1 && r.nodeType === 1 ? jQuery.find.matchesSelector(r, e) ? [r] : [] : jQuery.find.matches(e, jQuery.grep(t, function (e) {
            return e.nodeType === 1
        }))
    }, dir: function (e, t, n) {
        var r = [], i = n !== undefined;
        while ((e = e[t]) && e.nodeType !== 9)if (e.nodeType === 1) {
            if (i && jQuery(e).is(n))break;
            r.push(e)
        }
        return r
    }, sibling: function (e, t) {
        var n = [];
        for (; e; e = e.nextSibling)e.nodeType === 1 && e !== t && n.push(e);
        return n
    }});
    var rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi, rtagName = /<([\w:]+)/, rhtml = /<|&#?\w+;/, rnoInnerhtml = /<(?:script|style|link)/i, manipulation_rcheckableType = /^(?:checkbox|radio)$/i, rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i, rscriptType = /^$|\/(?:java|ecma)script/i, rscriptTypeMasked = /^true\/(.*)/, rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g, wrapMap = {option: [1, "<select multiple='multiple'>", "</select>"], thead: [1, "<table>", "</table>"], col: [2, "<table><colgroup>", "</colgroup></table>"], tr: [2, "<table><tbody>", "</tbody></table>"], td: [3, "<table><tbody><tr>", "</tr></tbody></table>"], _default: [0, "", ""]};
    wrapMap.optgroup = wrapMap.option, wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead, wrapMap.th = wrapMap.td, jQuery.fn.extend({text: function (e) {
        return jQuery.access(this, function (e) {
            return e === undefined ? jQuery.text(this) : this.empty().append((this[0] && this[0].ownerDocument || document).createTextNode(e))
        }, null, e, arguments.length)
    }, append: function () {
        return this.domManip(arguments, function (e) {
            if (this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9) {
                var t = manipulationTarget(this, e);
                t.appendChild(e)
            }
        })
    }, prepend: function () {
        return this.domManip(arguments, function (e) {
            if (this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9) {
                var t = manipulationTarget(this, e);
                t.insertBefore(e, t.firstChild)
            }
        })
    }, before: function () {
        return this.domManip(arguments, function (e) {
            this.parentNode && this.parentNode.insertBefore(e, this)
        })
    }, after: function () {
        return this.domManip(arguments, function (e) {
            this.parentNode && this.parentNode.insertBefore(e, this.nextSibling)
        })
    }, remove: function (e, t) {
        var n, r = e ? jQuery.filter(e, this) : this, i = 0;
        for (; (n = r[i]) != null; i++)!t && n.nodeType === 1 && jQuery.cleanData(getAll(n)), n.parentNode && (t && jQuery.contains(n.ownerDocument, n) && setGlobalEval(getAll(n, "script")), n.parentNode.removeChild(n));
        return this
    }, empty: function () {
        var e, t = 0;
        for (; (e = this[t]) != null; t++)e.nodeType === 1 && (jQuery.cleanData(getAll(e, !1)), e.textContent = "");
        return this
    }, clone: function (e, t) {
        return e = e == null ? !1 : e, t = t == null ? e : t, this.map(function () {
            return jQuery.clone(this, e, t)
        })
    }, html: function (e) {
        return jQuery.access(this, function (e) {
            var t = this[0] || {}, n = 0, r = this.length;
            if (e === undefined && t.nodeType === 1)return t.innerHTML;
            if (typeof e == "string" && !rnoInnerhtml.test(e) && !wrapMap[(rtagName.exec(e) || ["", ""])[1].toLowerCase()]) {
                e = e.replace(rxhtmlTag, "<$1></$2>");
                try {
                    for (; n < r; n++)t = this[n] || {}, t.nodeType === 1 && (jQuery.cleanData(getAll(t, !1)), t.innerHTML = e);
                    t = 0
                } catch (i) {
                }
            }
            t && this.empty().append(e)
        }, null, e, arguments.length)
    }, replaceWith: function () {
        var e = jQuery.map(this, function (e) {
            return[e.nextSibling, e.parentNode]
        }), t = 0;
        return this.domManip(arguments, function (n) {
            var r = e[t++], s = e[t++];
            s && (r && r.parentNode !== s && (r = this.nextSibling), jQuery(this).remove(), s.insertBefore(n, r))
        }, !0), t ? this : this.remove()
    }, detach: function (e) {
        return this.remove(e, !0)
    }, domManip: function (e, t, n) {
        e = core_concat.apply([], e);
        var r, i, s, o, u, a, f = 0, l = this.length, c = this, h = l - 1, p = e[0], d = jQuery.isFunction(p);
        if (d || !(l <= 1 || typeof p != "string" || jQuery.support.checkClone || !rchecked.test(p)))return this.each(function (r) {
            var i = c.eq(r);
            d && (e[0] = p.call(this, r, i.html())), i.domManip(e, t, n)
        });
        if (l) {
            r = jQuery.buildFragment(e, this[0].ownerDocument, !1, !n && this), i = r.firstChild, r.childNodes.length === 1 && (r = i);
            if (i) {
                s = jQuery.map(getAll(r, "script"), disableScript), o = s.length;
                for (; f < l; f++)u = r, f !== h && (u = jQuery.clone(u, !0, !0), o && jQuery.merge(s, getAll(u, "script"))), t.call(this[f], u, f);
                if (o) {
                    a = s[s.length - 1].ownerDocument, jQuery.map(s, restoreScript);
                    for (f = 0; f < o; f++)u = s[f], rscriptType.test(u.type || "") && !data_priv.access(u, "globalEval") && jQuery.contains(a, u) && (u.src ? jQuery._evalUrl(u.src) : jQuery.globalEval(u.textContent.replace(rcleanScript, "")))
                }
            }
        }
        return this
    }}), jQuery.each({appendTo: "append", prependTo: "prepend", insertBefore: "before", insertAfter: "after", replaceAll: "replaceWith"}, function (e, t) {
        jQuery.fn[e] = function (e) {
            var n, r = [], i = jQuery(e), s = i.length - 1, o = 0;
            for (; o <= s; o++)n = o === s ? this : this.clone(!0), jQuery(i[o])[t](n), core_push.apply(r, n.get());
            return this.pushStack(r)
        }
    }), jQuery.extend({clone: function (e, t, n) {
        var r, i, s, o, u = e.cloneNode(!0), a = jQuery.contains(e.ownerDocument, e);
        if (!jQuery.support.noCloneChecked && (e.nodeType === 1 || e.nodeType === 11) && !jQuery.isXMLDoc(e)) {
            o = getAll(u), s = getAll(e);
            for (r = 0, i = s.length; r < i; r++)fixInput(s[r], o[r])
        }
        if (t)if (n) {
            s = s || getAll(e), o = o || getAll(u);
            for (r = 0, i = s.length; r < i; r++)cloneCopyEvent(s[r], o[r])
        } else cloneCopyEvent(e, u);
        return o = getAll(u, "script"), o.length > 0 && setGlobalEval(o, !a && getAll(e, "script")), u
    }, buildFragment: function (e, t, n, r) {
        var i, s, o, u, a, f, l = 0, c = e.length, h = t.createDocumentFragment(), p = [];
        for (; l < c; l++) {
            i = e[l];
            if (i || i === 0)if (jQuery.type(i) === "object")jQuery.merge(p, i.nodeType ? [i] : i); else if (!rhtml.test(i))p.push(t.createTextNode(i)); else {
                s = s || h.appendChild(t.createElement("div")), o = (rtagName.exec(i) || ["", ""])[1].toLowerCase(), u = wrapMap[o] || wrapMap._default, s.innerHTML = u[1] + i.replace(rxhtmlTag, "<$1></$2>") + u[2], f = u[0];
                while (f--)s = s.lastChild;
                jQuery.merge(p, s.childNodes), s = h.firstChild, s.textContent = ""
            }
        }
        h.textContent = "", l = 0;
        while (i = p[l++]) {
            if (r && jQuery.inArray(i, r) !== -1)continue;
            a = jQuery.contains(i.ownerDocument, i), s = getAll(h.appendChild(i), "script"), a && setGlobalEval(s);
            if (n) {
                f = 0;
                while (i = s[f++])rscriptType.test(i.type || "") && n.push(i)
            }
        }
        return h
    }, cleanData: function (e) {
        var t, n, r, i, s, o, u = jQuery.event.special, a = 0;
        for (; (n = e[a]) !== undefined; a++) {
            if (Data.accepts(n)) {
                s = n[data_priv.expando];
                if (s && (t = data_priv.cache[s])) {
                    r = Object.keys(t.events || {});
                    if (r.length)for (o = 0; (i = r[o]) !== undefined; o++)u[i] ? jQuery.event.remove(n, i) : jQuery.removeEvent(n, i, t.handle);
                    data_priv.cache[s] && delete data_priv.cache[s]
                }
            }
            delete data_user.cache[n[data_user.expando]]
        }
    }, _evalUrl: function (e) {
        return jQuery.ajax({url: e, type: "GET", dataType: "script", async: !1, global: !1, "throws": !0})
    }}), jQuery.fn.extend({wrapAll: function (e) {
        var t;
        return jQuery.isFunction(e) ? this.each(function (t) {
            jQuery(this).wrapAll(e.call(this, t))
        }) : (this[0] && (t = jQuery(e, this[0].ownerDocument).eq(0).clone(!0), this[0].parentNode && t.insertBefore(this[0]), t.map(function () {
            var e = this;
            while (e.firstElementChild)e = e.firstElementChild;
            return e
        }).append(this)), this)
    }, wrapInner: function (e) {
        return jQuery.isFunction(e) ? this.each(function (t) {
            jQuery(this).wrapInner(e.call(this, t))
        }) : this.each(function () {
            var t = jQuery(this), n = t.contents();
            n.length ? n.wrapAll(e) : t.append(e)
        })
    }, wrap: function (e) {
        var t = jQuery.isFunction(e);
        return this.each(function (n) {
            jQuery(this).wrapAll(t ? e.call(this, n) : e)
        })
    }, unwrap: function () {
        return this.parent().each(function () {
            jQuery.nodeName(this, "body") || jQuery(this).replaceWith(this.childNodes)
        }).end()
    }});
    var curCSS, iframe, rdisplayswap = /^(none|table(?!-c[ea]).+)/, rmargin = /^margin/, rnumsplit = new RegExp("^(" + core_pnum + ")(.*)$", "i"), rnumnonpx = new RegExp("^(" + core_pnum + ")(?!px)[a-z%]+$", "i"), rrelNum = new RegExp("^([+-])=(" + core_pnum + ")", "i"), elemdisplay = {BODY: "block"}, cssShow = {position: "absolute", visibility: "hidden", display: "block"}, cssNormalTransform = {letterSpacing: 0, fontWeight: 400}, cssExpand = ["Top", "Right", "Bottom", "Left"], cssPrefixes = ["Webkit", "O", "Moz", "ms"];
    jQuery.fn.extend({css: function (e, t) {
        return jQuery.access(this, function (e, t, n) {
            var r, i, s = {}, o = 0;
            if (jQuery.isArray(t)) {
                r = getStyles(e), i = t.length;
                for (; o < i; o++)s[t[o]] = jQuery.css(e, t[o], !1, r);
                return s
            }
            return n !== undefined ? jQuery.style(e, t, n) : jQuery.css(e, t)
        }, e, t, arguments.length > 1)
    }, show: function () {
        return showHide(this, !0)
    }, hide: function () {
        return showHide(this)
    }, toggle: function (e) {
        return typeof e == "boolean" ? e ? this.show() : this.hide() : this.each(function () {
            isHidden(this) ? jQuery(this).show() : jQuery(this).hide()
        })
    }}), jQuery.extend({cssHooks: {opacity: {get: function (e, t) {
        if (t) {
            var n = curCSS(e, "opacity");
            return n === "" ? "1" : n
        }
    }}}, cssNumber: {columnCount: !0, fillOpacity: !0, fontWeight: !0, lineHeight: !0, opacity: !0, order: !0, orphans: !0, widows: !0, zIndex: !0, zoom: !0}, cssProps: {"float": "cssFloat"}, style: function (e, t, n, r) {
        if (!e || e.nodeType === 3 || e.nodeType === 8 || !e.style)return;
        var i, s, o, u = jQuery.camelCase(t), a = e.style;
        t = jQuery.cssProps[u] || (jQuery.cssProps[u] = vendorPropName(a, u)), o = jQuery.cssHooks[t] || jQuery.cssHooks[u];
        if (n === undefined)return o && "get"in o && (i = o.get(e, !1, r)) !== undefined ? i : a[t];
        s = typeof n, s === "string" && (i = rrelNum.exec(n)) && (n = (i[1] + 1) * i[2] + parseFloat(jQuery.css(e, t)), s = "number");
        if (n == null || s === "number" && isNaN(n))return;
        s === "number" && !jQuery.cssNumber[u] && (n += "px"), !jQuery.support.clearCloneStyle && n === "" && t.indexOf("background") === 0 && (a[t] = "inherit");
        if (!o || !("set"in o) || (n = o.set(e, n, r)) !== undefined)a[t] = n
    }, css: function (e, t, n, r) {
        var i, s, o, u = jQuery.camelCase(t);
        return t = jQuery.cssProps[u] || (jQuery.cssProps[u] = vendorPropName(e.style, u)), o = jQuery.cssHooks[t] || jQuery.cssHooks[u], o && "get"in o && (i = o.get(e, !0, n)), i === undefined && (i = curCSS(e, t, r)), i === "normal" && t in cssNormalTransform && (i = cssNormalTransform[t]), n === "" || n ? (s = parseFloat(i), n === !0 || jQuery.isNumeric(s) ? s || 0 : i) : i
    }}), curCSS = function (e, t, n) {
        var r, i, s, o = n || getStyles(e), u = o ? o.getPropertyValue(t) || o[t] : undefined, a = e.style;
        return o && (u === "" && !jQuery.contains(e.ownerDocument, e) && (u = jQuery.style(e, t)), rnumnonpx.test(u) && rmargin.test(t) && (r = a.width, i = a.minWidth, s = a.maxWidth, a.minWidth = a.maxWidth = a.width = u, u = o.width, a.width = r, a.minWidth = i, a.maxWidth = s)), u
    }, jQuery.each(["height", "width"], function (e, t) {
        jQuery.cssHooks[t] = {get: function (e, n, r) {
            if (n)return e.offsetWidth === 0 && rdisplayswap.test(jQuery.css(e, "display")) ? jQuery.swap(e, cssShow, function () {
                return getWidthOrHeight(e, t, r)
            }) : getWidthOrHeight(e, t, r)
        }, set: function (e, n, r) {
            var i = r && getStyles(e);
            return setPositiveNumber(e, n, r ? augmentWidthOrHeight(e, t, r, jQuery.support.boxSizing && jQuery.css(e, "boxSizing", !1, i) === "border-box", i) : 0)
        }}
    }), jQuery(function () {
        jQuery.support.reliableMarginRight || (jQuery.cssHooks.marginRight = {get: function (e, t) {
            if (t)return jQuery.swap(e, {display: "inline-block"}, curCSS, [e, "marginRight"])
        }}), !jQuery.support.pixelPosition && jQuery.fn.position && jQuery.each(["top", "left"], function (e, t) {
            jQuery.cssHooks[t] = {get: function (e, n) {
                if (n)return n = curCSS(e, t), rnumnonpx.test(n) ? jQuery(e).position()[t] + "px" : n
            }}
        })
    }), jQuery.expr && jQuery.expr.filters && (jQuery.expr.filters.hidden = function (e) {
        return e.offsetWidth <= 0 && e.offsetHeight <= 0
    }, jQuery.expr.filters.visible = function (e) {
        return!jQuery.expr.filters.hidden(e)
    }), jQuery.each({margin: "", padding: "", border: "Width"}, function (e, t) {
        jQuery.cssHooks[e + t] = {expand: function (n) {
            var r = 0, i = {}, s = typeof n == "string" ? n.split(" ") : [n];
            for (; r < 4; r++)i[e + cssExpand[r] + t] = s[r] || s[r - 2] || s[0];
            return i
        }}, rmargin.test(e) || (jQuery.cssHooks[e + t].set = setPositiveNumber)
    });
    var r20 = /%20/g, rbracket = /\[\]$/, rCRLF = /\r?\n/g, rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i, rsubmittable = /^(?:input|select|textarea|keygen)/i;
    jQuery.fn.extend({serialize: function () {
        return jQuery.param(this.serializeArray())
    }, serializeArray: function () {
        return this.map(function () {
            var e = jQuery.prop(this, "elements");
            return e ? jQuery.makeArray(e) : this
        }).filter(function () {
            var e = this.type;
            return this.name && !jQuery(this).is(":disabled") && rsubmittable.test(this.nodeName) && !rsubmitterTypes.test(e) && (this.checked || !manipulation_rcheckableType.test(e))
        }).map(function (e, t) {
            var n = jQuery(this).val();
            return n == null ? null : jQuery.isArray(n) ? jQuery.map(n, function (e) {
                return{name: t.name, value: e.replace(rCRLF, "\r\n")}
            }) : {name: t.name, value: n.replace(rCRLF, "\r\n")}
        }).get()
    }}), jQuery.param = function (e, t) {
        var n, r = [], i = function (e, t) {
            t = jQuery.isFunction(t) ? t() : t == null ? "" : t, r[r.length] = encodeURIComponent(e) + "=" + encodeURIComponent(t)
        };
        t === undefined && (t = jQuery.ajaxSettings && jQuery.ajaxSettings.traditional);
        if (jQuery.isArray(e) || e.jquery && !jQuery.isPlainObject(e))jQuery.each(e, function () {
            i(this.name, this.value)
        }); else for (n in e)buildParams(n, e[n], t, i);
        return r.join("&").replace(r20, "+")
    }, jQuery.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "), function (e, t) {
        jQuery.fn[t] = function (e, n) {
            return arguments.length > 0 ? this.on(t, null, e, n) : this.trigger(t)
        }
    }), jQuery.fn.extend({hover: function (e, t) {
        return this.mouseenter(e).mouseleave(t || e)
    }, bind: function (e, t, n) {
        return this.on(e, null, t, n)
    }, unbind: function (e, t) {
        return this.off(e, null, t)
    }, delegate: function (e, t, n, r) {
        return this.on(t, e, n, r)
    }, undelegate: function (e, t, n) {
        return arguments.length === 1 ? this.off(e, "**") : this.off(t, e || "**", n)
    }});
    var ajaxLocParts, ajaxLocation, ajax_nonce = jQuery.now(), ajax_rquery = /\?/, rhash = /#.*$/, rts = /([?&])_=[^&]*/, rheaders = /^(.*?):[ \t]*([^\r\n]*)$/mg, rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/, rnoContent = /^(?:GET|HEAD)$/, rprotocol = /^\/\//, rurl = /^([\w.+-]+:)(?:\/\/([^\/?#:]*)(?::(\d+)|)|)/, _load = jQuery.fn.load, prefilters = {}, transports = {}, allTypes = "*/".concat("*");
    try {
        ajaxLocation = location.href
    } catch (e) {
        ajaxLocation = document.createElement("a"), ajaxLocation.href = "", ajaxLocation = ajaxLocation.href
    }
    ajaxLocParts = rurl.exec(ajaxLocation.toLowerCase()) || [], jQuery.fn.load = function (e, t, n) {
        if (typeof e != "string" && _load)return _load.apply(this, arguments);
        var r, i, s, o = this, u = e.indexOf(" ");
        return u >= 0 && (r = e.slice(u), e = e.slice(0, u)), jQuery.isFunction(t) ? (n = t, t = undefined) : t && typeof t == "object" && (i = "POST"), o.length > 0 && jQuery.ajax({url: e, type: i, dataType: "html", data: t}).done(function (e) {
            s = arguments, o.html(r ? jQuery("<div>").append(jQuery.parseHTML(e)).find(r) : e)
        }).complete(n && function (e, t) {
            o.each(n, s || [e.responseText, t, e])
        }), this
    }, jQuery.each(["ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend"], function (e, t) {
        jQuery.fn[t] = function (e) {
            return this.on(t, e)
        }
    }), jQuery.extend({active: 0, lastModified: {}, etag: {}, ajaxSettings: {url: ajaxLocation, type: "GET", isLocal: rlocalProtocol.test(ajaxLocParts[1]), global: !0, processData: !0, async: !0, contentType: "application/x-www-form-urlencoded; charset=UTF-8", accepts: {"*": allTypes, text: "text/plain", html: "text/html", xml: "application/xml, text/xml", json: "application/json, text/javascript"}, contents: {xml: /xml/, html: /html/, json: /json/}, responseFields: {xml: "responseXML", text: "responseText", json: "responseJSON"}, converters: {"* text": String, "text html": !0, "text json": jQuery.parseJSON, "text xml": jQuery.parseXML}, flatOptions: {url: !0, context: !0}}, ajaxSetup: function (e, t) {
        return t ? ajaxExtend(ajaxExtend(e, jQuery.ajaxSettings), t) : ajaxExtend(jQuery.ajaxSettings, e)
    }, ajaxPrefilter: addToPrefiltersOrTransports(prefilters), ajaxTransport: addToPrefiltersOrTransports(transports), ajax: function (e, t) {
        function S(e, t, s, u) {
            var f, m, g, b, E, S = t;
            if (y === 2)return;
            y = 2, o && clearTimeout(o), n = undefined, i = u || "", w.readyState = e > 0 ? 4 : 0, f = e >= 200 && e < 300 || e === 304, s && (b = ajaxHandleResponses(l, w, s)), b = ajaxConvert(l, b, w, f);
            if (f)l.ifModified && (E = w.getResponseHeader("Last-Modified"), E && (jQuery.lastModified[r] = E), E = w.getResponseHeader("etag"), E && (jQuery.etag[r] = E)), e === 204 || l.type === "HEAD" ? S = "nocontent" : e === 304 ? S = "notmodified" : (S = b.state, m = b.data, g = b.error, f = !g); else {
                g = S;
                if (e || !S)S = "error", e < 0 && (e = 0)
            }
            w.status = e, w.statusText = (t || S) + "", f ? p.resolveWith(c, [m, S, w]) : p.rejectWith(c, [w, S, g]), w.statusCode(v), v = undefined, a && h.trigger(f ? "ajaxSuccess" : "ajaxError", [w, l, f ? m : g]), d.fireWith(c, [w, S]), a && (h.trigger("ajaxComplete", [w, l]), --jQuery.active || jQuery.event.trigger("ajaxStop"))
        }

        typeof e == "object" && (t = e, e = undefined), t = t || {};
        var n, r, i, s, o, u, a, f, l = jQuery.ajaxSetup({}, t), c = l.context || l, h = l.context && (c.nodeType || c.jquery) ? jQuery(c) : jQuery.event, p = jQuery.Deferred(), d = jQuery.Callbacks("once memory"), v = l.statusCode || {}, m = {}, g = {}, y = 0, b = "canceled", w = {readyState: 0, getResponseHeader: function (e) {
            var t;
            if (y === 2) {
                if (!s) {
                    s = {};
                    while (t = rheaders.exec(i))s[t[1].toLowerCase()] = t[2]
                }
                t = s[e.toLowerCase()]
            }
            return t == null ? null : t
        }, getAllResponseHeaders: function () {
            return y === 2 ? i : null
        }, setRequestHeader: function (e, t) {
            var n = e.toLowerCase();
            return y || (e = g[n] = g[n] || e, m[e] = t), this
        }, overrideMimeType: function (e) {
            return y || (l.mimeType = e), this
        }, statusCode: function (e) {
            var t;
            if (e)if (y < 2)for (t in e)v[t] = [v[t], e[t]]; else w.always(e[w.status]);
            return this
        }, abort: function (e) {
            var t = e || b;
            return n && n.abort(t), S(0, t), this
        }};
        p.promise(w).complete = d.add, w.success = w.done, w.error = w.fail, l.url = ((e || l.url || ajaxLocation) + "").replace(rhash, "").replace(rprotocol, ajaxLocParts[1] + "//"), l.type = t.method || t.type || l.method || l.type, l.dataTypes = jQuery.trim(l.dataType || "*").toLowerCase().match(core_rnotwhite) || [""], l.crossDomain == null && (u = rurl.exec(l.url.toLowerCase()), l.crossDomain = !(!u || u[1] === ajaxLocParts[1] && u[2] === ajaxLocParts[2] && (u[3] || (u[1] === "http:" ? "80" : "443")) === (ajaxLocParts[3] || (ajaxLocParts[1] === "http:" ? "80" : "443")))), l.data && l.processData && typeof l.data != "string" && (l.data = jQuery.param(l.data, l.traditional)), inspectPrefiltersOrTransports(prefilters, l, t, w);
        if (y === 2)return w;
        a = l.global, a && jQuery.active++ === 0 && jQuery.event.trigger("ajaxStart"), l.type = l.type.toUpperCase(), l.hasContent = !rnoContent.test(l.type), r = l.url, l.hasContent || (l.data && (r = l.url += (ajax_rquery.test(r) ? "&" : "?") + l.data, delete l.data), l.cache === !1 && (l.url = rts.test(r) ? r.replace(rts, "$1_=" + ajax_nonce++) : r + (ajax_rquery.test(r) ? "&" : "?") + "_=" + ajax_nonce++)), l.ifModified && (jQuery.lastModified[r] && w.setRequestHeader("If-Modified-Since", jQuery.lastModified[r]), jQuery.etag[r] && w.setRequestHeader("If-None-Match", jQuery.etag[r])), (l.data && l.hasContent && l.contentType !== !1 || t.contentType) && w.setRequestHeader("Content-Type", l.contentType), w.setRequestHeader("Accept", l.dataTypes[0] && l.accepts[l.dataTypes[0]] ? l.accepts[l.dataTypes[0]] + (l.dataTypes[0] !== "*" ? ", " + allTypes + "; q=0.01" : "") : l.accepts["*"]);
        for (f in l.headers)w.setRequestHeader(f, l.headers[f]);
        if (!l.beforeSend || l.beforeSend.call(c, w, l) !== !1 && y !== 2) {
            b = "abort";
            for (f in{success: 1, error: 1, complete: 1})w[f](l[f]);
            n = inspectPrefiltersOrTransports(transports, l, t, w);
            if (!n)S(-1, "No Transport"); else {
                w.readyState = 1, a && h.trigger("ajaxSend", [w, l]), l.async && l.timeout > 0 && (o = setTimeout(function () {
                    w.abort("timeout")
                }, l.timeout));
                try {
                    y = 1, n.send(m, S)
                } catch (E) {
                    if (!(y < 2))throw E;
                    S(-1, E)
                }
            }
            return w
        }
        return w.abort()
    }, getJSON: function (e, t, n) {
        return jQuery.get(e, t, n, "json")
    }, getScript: function (e, t) {
        return jQuery.get(e, undefined, t, "script")
    }}), jQuery.each(["get", "post"], function (e, t) {
        jQuery[t] = function (e, n, r, i) {
            return jQuery.isFunction(n) && (i = i || r, r = n, n = undefined), jQuery.ajax({url: e, type: t, dataType: i, data: n, success: r})
        }
    }), jQuery.ajaxSetup({accepts: {script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"}, contents: {script: /(?:java|ecma)script/}, converters: {"text script": function (e) {
        return jQuery.globalEval(e), e
    }}}), jQuery.ajaxPrefilter("script", function (e) {
        e.cache === undefined && (e.cache = !1), e.crossDomain && (e.type = "GET")
    }), jQuery.ajaxTransport("script", function (e) {
        if (e.crossDomain) {
            var t, n;
            return{send: function (r, i) {
                t = jQuery("<script>").prop({async: !0, charset: e.scriptCharset, src: e.url}).on("load error", n = function (e) {
                    t.remove(), n = null, e && i(e.type === "error" ? 404 : 200, e.type)
                }), document.head.appendChild(t[0])
            }, abort: function () {
                n && n()
            }}
        }
    });
    var oldCallbacks = [], rjsonp = /(=)\?(?=&|$)|\?\?/;
    jQuery.ajaxSetup({jsonp: "callback", jsonpCallback: function () {
        var e = oldCallbacks.pop() || jQuery.expando + "_" + ajax_nonce++;
        return this[e] = !0, e
    }}), jQuery.ajaxPrefilter("json jsonp", function (e, t, n) {
        var r, i, s, o = e.jsonp !== !1 && (rjsonp.test(e.url) ? "url" : typeof e.data == "string" && !(e.contentType || "").indexOf("application/x-www-form-urlencoded") && rjsonp.test(e.data) && "data");
        if (o || e.dataTypes[0] === "jsonp")return r = e.jsonpCallback = jQuery.isFunction(e.jsonpCallback) ? e.jsonpCallback() : e.jsonpCallback, o ? e[o] = e[o].replace(rjsonp, "$1" + r) : e.jsonp !== !1 && (e.url += (ajax_rquery.test(e.url) ? "&" : "?") + e.jsonp + "=" + r), e.converters["script json"] = function () {
            return s || jQuery.error(r + " was not called"), s[0]
        }, e.dataTypes[0] = "json", i = window[r], window[r] = function () {
            s = arguments
        }, n.always(function () {
            window[r] = i, e[r] && (e.jsonpCallback = t.jsonpCallback, oldCallbacks.push(r)), s && jQuery.isFunction(i) && i(s[0]), s = i = undefined
        }), "script"
    }), jQuery.ajaxSettings.xhr = function () {
        try {
            return new XMLHttpRequest
        } catch (e) {
        }
    };
    var xhrSupported = jQuery.ajaxSettings.xhr(), xhrSuccessStatus = {0: 200, 1223: 204}, xhrId = 0, xhrCallbacks = {};
    window.ActiveXObject && jQuery(window).on("unload", function () {
        for (var e in xhrCallbacks)xhrCallbacks[e]();
        xhrCallbacks = undefined
    }), jQuery.support.cors = !!xhrSupported && "withCredentials"in xhrSupported, jQuery.support.ajax = xhrSupported = !!xhrSupported, jQuery.ajaxTransport(function (e) {
        var t;
        if (jQuery.support.cors || xhrSupported && !e.crossDomain)return{send: function (n, r) {
            var i, s, o = e.xhr();
            o.open(e.type, e.url, e.async, e.username, e.password);
            if (e.xhrFields)for (i in e.xhrFields)o[i] = e.xhrFields[i];
            e.mimeType && o.overrideMimeType && o.overrideMimeType(e.mimeType), !e.crossDomain && !n["X-Requested-With"] && (n["X-Requested-With"] = "XMLHttpRequest");
            for (i in n)o.setRequestHeader(i, n[i]);
            t = function (e) {
                return function () {
                    t && (delete xhrCallbacks[s], t = o.onload = o.onerror = null, e === "abort" ? o.abort() : e === "error" ? r(o.status || 404, o.statusText) : r(xhrSuccessStatus[o.status] || o.status, o.statusText, typeof o.responseText == "string" ? {text: o.responseText} : undefined, o.getAllResponseHeaders()))
                }
            }, o.onload = t(), o.onerror = t("error"), t = xhrCallbacks[s = xhrId++] = t("abort"), o.send(e.hasContent && e.data || null)
        }, abort: function () {
            t && t()
        }}
    });
    var fxNow, timerId, rfxtypes = /^(?:toggle|show|hide)$/, rfxnum = new RegExp("^(?:([+-])=|)(" + core_pnum + ")([a-z%]*)$", "i"), rrun = /queueHooks$/, animationPrefilters = [defaultPrefilter], tweeners = {"*": [function (e, t) {
        var n = this.createTween(e, t), r = n.cur(), i = rfxnum.exec(t), s = i && i[3] || (jQuery.cssNumber[e] ? "" : "px"), o = (jQuery.cssNumber[e] || s !== "px" && +r) && rfxnum.exec(jQuery.css(n.elem, e)), u = 1, a = 20;
        if (o && o[3] !== s) {
            s = s || o[3], i = i || [], o = +r || 1;
            do u = u || ".5", o /= u, jQuery.style(n.elem, e, o + s); while (u !== (u = n.cur() / r) && u !== 1 && --a)
        }
        return i && (o = n.start = +o || +r || 0, n.unit = s, n.end = i[1] ? o + (i[1] + 1) * i[2] : +i[2]), n
    }]};
    jQuery.Animation = jQuery.extend(Animation, {tweener: function (e, t) {
        jQuery.isFunction(e) ? (t = e, e = ["*"]) : e = e.split(" ");
        var n, r = 0, i = e.length;
        for (; r < i; r++)n = e[r], tweeners[n] = tweeners[n] || [], tweeners[n].unshift(t)
    }, prefilter: function (e, t) {
        t ? animationPrefilters.unshift(e) : animationPrefilters.push(e)
    }}), jQuery.Tween = Tween, Tween.prototype = {constructor: Tween, init: function (e, t, n, r, i, s) {
        this.elem = e, this.prop = n, this.easing = i || "swing", this.options = t, this.start = this.now = this.cur(), this.end = r, this.unit = s || (jQuery.cssNumber[n] ? "" : "px")
    }, cur: function () {
        var e = Tween.propHooks[this.prop];
        return e && e.get ? e.get(this) : Tween.propHooks._default.get(this)
    }, run: function (e) {
        var t, n = Tween.propHooks[this.prop];
        return this.options.duration ? this.pos = t = jQuery.easing[this.easing](e, this.options.duration * e, 0, 1, this.options.duration) : this.pos = t = e, this.now = (this.end - this.start) * t + this.start, this.options.step && this.options.step.call(this.elem, this.now, this), n && n.set ? n.set(this) : Tween.propHooks._default.set(this), this
    }}, Tween.prototype.init.prototype = Tween.prototype, Tween.propHooks = {_default: {get: function (e) {
        var t;
        return e.elem[e.prop] == null || !!e.elem.style && e.elem.style[e.prop] != null ? (t = jQuery.css(e.elem, e.prop, ""), !t || t === "auto" ? 0 : t) : e.elem[e.prop]
    }, set: function (e) {
        jQuery.fx.step[e.prop] ? jQuery.fx.step[e.prop](e) : e.elem.style && (e.elem.style[jQuery.cssProps[e.prop]] != null || jQuery.cssHooks[e.prop]) ? jQuery.style(e.elem, e.prop, e.now + e.unit) : e.elem[e.prop] = e.now
    }}}, Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {set: function (e) {
        e.elem.nodeType && e.elem.parentNode && (e.elem[e.prop] = e.now)
    }}, jQuery.each(["toggle", "show", "hide"], function (e, t) {
        var n = jQuery.fn[t];
        jQuery.fn[t] = function (e, r, i) {
            return e == null || typeof e == "boolean" ? n.apply(this, arguments) : this.animate(genFx(t, !0), e, r, i)
        }
    }), jQuery.fn.extend({fadeTo: function (e, t, n, r) {
        return this.filter(isHidden).css("opacity", 0).show().end().animate({opacity: t}, e, n, r)
    }, animate: function (e, t, n, r) {
        var i = jQuery.isEmptyObject(e), s = jQuery.speed(t, n, r), o = function () {
            var t = Animation(this, jQuery.extend({}, e), s);
            (i || data_priv.get(this, "finish")) && t.stop(!0)
        };
        return o.finish = o, i || s.queue === !1 ? this.each(o) : this.queue(s.queue, o)
    }, stop: function (e, t, n) {
        var r = function (e) {
            var t = e.stop;
            delete e.stop, t(n)
        };
        return typeof e != "string" && (n = t, t = e, e = undefined), t && e !== !1 && this.queue(e || "fx", []), this.each(function () {
            var t = !0, i = e != null && e + "queueHooks", s = jQuery.timers, o = data_priv.get(this);
            if (i)o[i] && o[i].stop && r(o[i]); else for (i in o)o[i] && o[i].stop && rrun.test(i) && r(o[i]);
            for (i = s.length; i--;)s[i].elem === this && (e == null || s[i].queue === e) && (s[i].anim.stop(n), t = !1, s.splice(i, 1));
            (t || !n) && jQuery.dequeue(this, e)
        })
    }, finish: function (e) {
        return e !== !1 && (e = e || "fx"), this.each(function () {
            var t, n = data_priv.get(this), r = n[e + "queue"], i = n[e + "queueHooks"], s = jQuery.timers, o = r ? r.length : 0;
            n.finish = !0, jQuery.queue(this, e, []), i && i.stop && i.stop.call(this, !0);
            for (t = s.length; t--;)s[t].elem === this && s[t].queue === e && (s[t].anim.stop(!0), s.splice(t, 1));
            for (t = 0; t < o; t++)r[t] && r[t].finish && r[t].finish.call(this);
            delete n.finish
        })
    }}), jQuery.each({slideDown: genFx("show"), slideUp: genFx("hide"), slideToggle: genFx("toggle"), fadeIn: {opacity: "show"}, fadeOut: {opacity: "hide"}, fadeToggle: {opacity: "toggle"}}, function (e, t) {
        jQuery.fn[e] = function (e, n, r) {
            return this.animate(t, e, n, r)
        }
    }), jQuery.speed = function (e, t, n) {
        var r = e && typeof e == "object" ? jQuery.extend({}, e) : {complete: n || !n && t || jQuery.isFunction(e) && e, duration: e, easing: n && t || t && !jQuery.isFunction(t) && t};
        r.duration = jQuery.fx.off ? 0 : typeof r.duration == "number" ? r.duration : r.duration in jQuery.fx.speeds ? jQuery.fx.speeds[r.duration] : jQuery.fx.speeds._default;
        if (r.queue == null || r.queue === !0)r.queue = "fx";
        return r.old = r.complete, r.complete = function () {
            jQuery.isFunction(r.old) && r.old.call(this), r.queue && jQuery.dequeue(this, r.queue)
        }, r
    }, jQuery.easing = {linear: function (e) {
        return e
    }, swing: function (e) {
        return.5 - Math.cos(e * Math.PI) / 2
    }}, jQuery.timers = [], jQuery.fx = Tween.prototype.init, jQuery.fx.tick = function () {
        var e, t = jQuery.timers, n = 0;
        fxNow = jQuery.now();
        for (; n < t.length; n++)e = t[n], !e() && t[n] === e && t.splice(n--, 1);
        t.length || jQuery.fx.stop(), fxNow = undefined
    }, jQuery.fx.timer = function (e) {
        e() && jQuery.timers.push(e) && jQuery.fx.start()
    }, jQuery.fx.interval = 13, jQuery.fx.start = function () {
        timerId || (timerId = setInterval(jQuery.fx.tick, jQuery.fx.interval))
    }, jQuery.fx.stop = function () {
        clearInterval(timerId), timerId = null
    }, jQuery.fx.speeds = {slow: 600, fast: 200, _default: 400}, jQuery.fx.step = {}, jQuery.expr && jQuery.expr.filters && (jQuery.expr.filters.animated = function (e) {
        return jQuery.grep(jQuery.timers,function (t) {
            return e === t.elem
        }).length
    }), jQuery.fn.offset = function (e) {
        if (arguments.length)return e === undefined ? this : this.each(function (t) {
            jQuery.offset.setOffset(this, e, t)
        });
        var t, n, r = this[0], i = {top: 0, left: 0}, s = r && r.ownerDocument;
        if (!s)return;
        return t = s.documentElement, jQuery.contains(t, r) ? (typeof r.getBoundingClientRect !== core_strundefined && (i = r.getBoundingClientRect()), n = getWindow(s), {top: i.top + n.pageYOffset - t.clientTop, left: i.left + n.pageXOffset - t.clientLeft}) : i
    }, jQuery.offset = {setOffset: function (e, t, n) {
        var r, i, s, o, u, a, f, l = jQuery.css(e, "position"), c = jQuery(e), h = {};
        l === "static" && (e.style.position = "relative"), u = c.offset(), s = jQuery.css(e, "top"), a = jQuery.css(e, "left"), f = (l === "absolute" || l === "fixed") && (s + a).indexOf("auto") > -1, f ? (r = c.position(), o = r.top, i = r.left) : (o = parseFloat(s) || 0, i = parseFloat(a) || 0), jQuery.isFunction(t) && (t = t.call(e, n, u)), t.top != null && (h.top = t.top - u.top + o), t.left != null && (h.left = t.left - u.left + i), "using"in t ? t.using.call(e, h) : c.css(h)
    }}, jQuery.fn.extend({position: function () {
        if (!this[0])return;
        var e, t, n = this[0], r = {top: 0, left: 0};
        return jQuery.css(n, "position") === "fixed" ? t = n.getBoundingClientRect() : (e = this.offsetParent(), t = this.offset(), jQuery.nodeName(e[0], "html") || (r = e.offset()), r.top += jQuery.css(e[0], "borderTopWidth", !0), r.left += jQuery.css(e[0], "borderLeftWidth", !0)), {top: t.top - r.top - jQuery.css(n, "marginTop", !0), left: t.left - r.left - jQuery.css(n, "marginLeft", !0)}
    }, offsetParent: function () {
        return this.map(function () {
            var e = this.offsetParent || docElem;
            while (e && !jQuery.nodeName(e, "html") && jQuery.css(e, "position") === "static")e = e.offsetParent;
            return e || docElem
        })
    }}), jQuery.each({scrollLeft: "pageXOffset", scrollTop: "pageYOffset"}, function (e, t) {
        var n = "pageYOffset" === t;
        jQuery.fn[e] = function (r) {
            return jQuery.access(this, function (e, r, i) {
                var s = getWindow(e);
                if (i === undefined)return s ? s[t] : e[r];
                s ? s.scrollTo(n ? window.pageXOffset : i, n ? i : window.pageYOffset) : e[r] = i
            }, e, r, arguments.length, null)
        }
    }), jQuery.each({Height: "height", Width: "width"}, function (e, t) {
        jQuery.each({padding: "inner" + e, content: t, "": "outer" + e}, function (n, r) {
            jQuery.fn[r] = function (r, i) {
                var s = arguments.length && (n || typeof r != "boolean"), o = n || (r === !0 || i === !0 ? "margin" : "border");
                return jQuery.access(this, function (t, n, r) {
                    var i;
                    return jQuery.isWindow(t) ? t.document.documentElement["client" + e] : t.nodeType === 9 ? (i = t.documentElement, Math.max(t.body["scroll" + e], i["scroll" + e], t.body["offset" + e], i["offset" + e], i["client" + e])) : r === undefined ? jQuery.css(t, n, o) : jQuery.style(t, n, r, o)
                }, t, s ? r : undefined, s, null)
            }
        })
    }), jQuery.fn.size = function () {
        return this.length
    }, jQuery.fn.andSelf = jQuery.fn.addBack, typeof module == "object" && module && typeof module.exports == "object" ? module.exports = jQuery : typeof define == "function" && define.amd && define("jquery", [], function () {
        return jQuery
    }), typeof window == "object" && typeof window.document == "object" && (window.jQuery = window.$ = jQuery)
})(window), function () {
    var e = this, t = e._, n = {}, r = Array.prototype, i = Object.prototype, s = Function.prototype, o = r.push, u = r.slice, a = r.concat, f = i.toString, l = i.hasOwnProperty, c = r.forEach, h = r.map, p = r.reduce, d = r.reduceRight, v = r.filter, m = r.every, g = r.some, y = r.indexOf, b = r.lastIndexOf, w = Array.isArray, E = Object.keys, S = s.bind, x = function (e) {
        if (e instanceof x)return e;
        if (!(this instanceof x))return new x(e);
        this._wrapped = e
    };
    typeof exports != "undefined" ? (typeof module != "undefined" && module.exports && (exports = module.exports = x), exports._ = x) : e._ = x, x.VERSION = "1.5.2";
    var T = x.each = x.forEach = function (e, t, r) {
        if (e == null)return;
        if (c && e.forEach === c)e.forEach(t, r); else if (e.length === +e.length) {
            for (var i = 0, s = e.length; i < s; i++)if (t.call(r, e[i], i, e) === n)return
        } else {
            var o = x.keys(e);
            for (var i = 0, s = o.length; i < s; i++)if (t.call(r, e[o[i]], o[i], e) === n)return
        }
    };
    x.map = x.collect = function (e, t, n) {
        var r = [];
        return e == null ? r : h && e.map === h ? e.map(t, n) : (T(e, function (e, i, s) {
            r.push(t.call(n, e, i, s))
        }), r)
    };
    var N = "Reduce of empty array with no initial value";
    x.reduce = x.foldl = x.inject = function (e, t, n, r) {
        var i = arguments.length > 2;
        e == null && (e = []);
        if (p && e.reduce === p)return r && (t = x.bind(t, r)), i ? e.reduce(t, n) : e.reduce(t);
        T(e, function (e, s, o) {
            i ? n = t.call(r, n, e, s, o) : (n = e, i = !0)
        });
        if (!i)throw new TypeError(N);
        return n
    }, x.reduceRight = x.foldr = function (e, t, n, r) {
        var i = arguments.length > 2;
        e == null && (e = []);
        if (d && e.reduceRight === d)return r && (t = x.bind(t, r)), i ? e.reduceRight(t, n) : e.reduceRight(t);
        var s = e.length;
        if (s !== +s) {
            var o = x.keys(e);
            s = o.length
        }
        T(e, function (u, a, f) {
            a = o ? o[--s] : --s, i ? n = t.call(r, n, e[a], a, f) : (n = e[a], i = !0)
        });
        if (!i)throw new TypeError(N);
        return n
    }, x.find = x.detect = function (e, t, n) {
        var r;
        return C(e, function (e, i, s) {
            if (t.call(n, e, i, s))return r = e, !0
        }), r
    }, x.filter = x.select = function (e, t, n) {
        var r = [];
        return e == null ? r : v && e.filter === v ? e.filter(t, n) : (T(e, function (e, i, s) {
            t.call(n, e, i, s) && r.push(e)
        }), r)
    }, x.reject = function (e, t, n) {
        return x.filter(e, function (e, r, i) {
            return!t.call(n, e, r, i)
        }, n)
    }, x.every = x.all = function (e, t, r) {
        t || (t = x.identity);
        var i = !0;
        return e == null ? i : m && e.every === m ? e.every(t, r) : (T(e, function (e, s, o) {
            if (!(i = i && t.call(r, e, s, o)))return n
        }), !!i)
    };
    var C = x.some = x.any = function (e, t, r) {
        t || (t = x.identity);
        var i = !1;
        return e == null ? i : g && e.some === g ? e.some(t, r) : (T(e, function (e, s, o) {
            if (i || (i = t.call(r, e, s, o)))return n
        }), !!i)
    };
    x.contains = x.include = function (e, t) {
        return e == null ? !1 : y && e.indexOf === y ? e.indexOf(t) != -1 : C(e, function (e) {
            return e === t
        })
    }, x.invoke = function (e, t) {
        var n = u.call(arguments, 2), r = x.isFunction(t);
        return x.map(e, function (e) {
            return(r ? t : e[t]).apply(e, n)
        })
    }, x.pluck = function (e, t) {
        return x.map(e, function (e) {
            return e[t]
        })
    }, x.where = function (e, t, n) {
        return x.isEmpty(t) ? n ? void 0 : [] : x[n ? "find" : "filter"](e, function (e) {
            for (var n in t)if (t[n] !== e[n])return!1;
            return!0
        })
    }, x.findWhere = function (e, t) {
        return x.where(e, t, !0)
    }, x.max = function (e, t, n) {
        if (!t && x.isArray(e) && e[0] === +e[0] && e.length < 65535)return Math.max.apply(Math, e);
        if (!t && x.isEmpty(e))return-Infinity;
        var r = {computed: -Infinity, value: -Infinity};
        return T(e, function (e, i, s) {
            var o = t ? t.call(n, e, i, s) : e;
            o > r.computed && (r = {value: e, computed: o})
        }), r.value
    }, x.min = function (e, t, n) {
        if (!t && x.isArray(e) && e[0] === +e[0] && e.length < 65535)return Math.min.apply(Math, e);
        if (!t && x.isEmpty(e))return Infinity;
        var r = {computed: Infinity, value: Infinity};
        return T(e, function (e, i, s) {
            var o = t ? t.call(n, e, i, s) : e;
            o < r.computed && (r = {value: e, computed: o})
        }), r.value
    }, x.shuffle = function (e) {
        var t, n = 0, r = [];
        return T(e, function (e) {
            t = x.random(n++), r[n - 1] = r[t], r[t] = e
        }), r
    }, x.sample = function (e, t, n) {
        return arguments.length < 2 || n ? e[x.random(e.length - 1)] : x.shuffle(e).slice(0, Math.max(0, t))
    };
    var k = function (e) {
        return x.isFunction(e) ? e : function (t) {
            return t[e]
        }
    };
    x.sortBy = function (e, t, n) {
        var r = k(t);
        return x.pluck(x.map(e,function (e, t, i) {
            return{value: e, index: t, criteria: r.call(n, e, t, i)}
        }).sort(function (e, t) {
            var n = e.criteria, r = t.criteria;
            if (n !== r) {
                if (n > r || n === void 0)return 1;
                if (n < r || r === void 0)return-1
            }
            return e.index - t.index
        }), "value")
    };
    var L = function (e) {
        return function (t, n, r) {
            var i = {}, s = n == null ? x.identity : k(n);
            return T(t, function (n, o) {
                var u = s.call(r, n, o, t);
                e(i, u, n)
            }), i
        }
    };
    x.groupBy = L(function (e, t, n) {
        (x.has(e, t) ? e[t] : e[t] = []).push(n)
    }), x.indexBy = L(function (e, t, n) {
        e[t] = n
    }), x.countBy = L(function (e, t) {
        x.has(e, t) ? e[t]++ : e[t] = 1
    }), x.sortedIndex = function (e, t, n, r) {
        n = n == null ? x.identity : k(n);
        var i = n.call(r, t), s = 0, o = e.length;
        while (s < o) {
            var u = s + o >>> 1;
            n.call(r, e[u]) < i ? s = u + 1 : o = u
        }
        return s
    }, x.toArray = function (e) {
        return e ? x.isArray(e) ? u.call(e) : e.length === +e.length ? x.map(e, x.identity) : x.values(e) : []
    }, x.size = function (e) {
        return e == null ? 0 : e.length === +e.length ? e.length : x.keys(e).length
    }, x.first = x.head = x.take = function (e, t, n) {
        return e == null ? void 0 : t == null || n ? e[0] : u.call(e, 0, t)
    }, x.initial = function (e, t, n) {
        return u.call(e, 0, e.length - (t == null || n ? 1 : t))
    }, x.last = function (e, t, n) {
        return e == null ? void 0 : t == null || n ? e[e.length - 1] : u.call(e, Math.max(e.length - t, 0))
    }, x.rest = x.tail = x.drop = function (e, t, n) {
        return u.call(e, t == null || n ? 1 : t)
    }, x.compact = function (e) {
        return x.filter(e, x.identity)
    };
    var A = function (e, t, n) {
        return t && x.every(e, x.isArray) ? a.apply(n, e) : (T(e, function (e) {
            x.isArray(e) || x.isArguments(e) ? t ? o.apply(n, e) : A(e, t, n) : n.push(e)
        }), n)
    };
    x.flatten = function (e, t) {
        return A(e, t, [])
    }, x.without = function (e) {
        return x.difference(e, u.call(arguments, 1))
    }, x.uniq = x.unique = function (e, t, n, r) {
        x.isFunction(t) && (r = n, n = t, t = !1);
        var i = n ? x.map(e, n, r) : e, s = [], o = [];
        return T(i, function (n, r) {
            if (t ? !r || o[o.length - 1] !== n : !x.contains(o, n))o.push(n), s.push(e[r])
        }), s
    }, x.union = function () {
        return x.uniq(x.flatten(arguments, !0))
    }, x.intersection = function (e) {
        var t = u.call(arguments, 1);
        return x.filter(x.uniq(e), function (e) {
            return x.every(t, function (t) {
                return x.indexOf(t, e) >= 0
            })
        })
    }, x.difference = function (e) {
        var t = a.apply(r, u.call(arguments, 1));
        return x.filter(e, function (e) {
            return!x.contains(t, e)
        })
    }, x.zip = function () {
        var e = x.max(x.pluck(arguments, "length").concat(0)), t = new Array(e);
        for (var n = 0; n < e; n++)t[n] = x.pluck(arguments, "" + n);
        return t
    }, x.object = function (e, t) {
        if (e == null)return{};
        var n = {};
        for (var r = 0, i = e.length; r < i; r++)t ? n[e[r]] = t[r] : n[e[r][0]] = e[r][1];
        return n
    }, x.indexOf = function (e, t, n) {
        if (e == null)return-1;
        var r = 0, i = e.length;
        if (n) {
            if (typeof n != "number")return r = x.sortedIndex(e, t), e[r] === t ? r : -1;
            r = n < 0 ? Math.max(0, i + n) : n
        }
        if (y && e.indexOf === y)return e.indexOf(t, n);
        for (; r < i; r++)if (e[r] === t)return r;
        return-1
    }, x.lastIndexOf = function (e, t, n) {
        if (e == null)return-1;
        var r = n != null;
        if (b && e.lastIndexOf === b)return r ? e.lastIndexOf(t, n) : e.lastIndexOf(t);
        var i = r ? n : e.length;
        while (i--)if (e[i] === t)return i;
        return-1
    }, x.range = function (e, t, n) {
        arguments.length <= 1 && (t = e || 0, e = 0), n = arguments[2] || 1;
        var r = Math.max(Math.ceil((t - e) / n), 0), i = 0, s = new Array(r);
        while (i < r)s[i++] = e, e += n;
        return s
    };
    var O = function () {
    };
    x.bind = function (e, t) {
        var n, r;
        if (S && e.bind === S)return S.apply(e, u.call(arguments, 1));
        if (!x.isFunction(e))throw new TypeError;
        return n = u.call(arguments, 2), r = function () {
            if (this instanceof r) {
                O.prototype = e.prototype;
                var i = new O;
                O.prototype = null;
                var s = e.apply(i, n.concat(u.call(arguments)));
                return Object(s) === s ? s : i
            }
            return e.apply(t, n.concat(u.call(arguments)))
        }
    }, x.partial = function (e) {
        var t = u.call(arguments, 1);
        return function () {
            return e.apply(this, t.concat(u.call(arguments)))
        }
    }, x.bindAll = function (e) {
        var t = u.call(arguments, 1);
        if (t.length === 0)throw new Error("bindAll must be passed function names");
        return T(t, function (t) {
            e[t] = x.bind(e[t], e)
        }), e
    }, x.memoize = function (e, t) {
        var n = {};
        return t || (t = x.identity), function () {
            var r = t.apply(this, arguments);
            return x.has(n, r) ? n[r] : n[r] = e.apply(this, arguments)
        }
    }, x.delay = function (e, t) {
        var n = u.call(arguments, 2);
        return setTimeout(function () {
            return e.apply(null, n)
        }, t)
    }, x.defer = function (e) {
        return x.delay.apply(x, [e, 1].concat(u.call(arguments, 1)))
    }, x.throttle = function (e, t, n) {
        var r, i, s, o = null, u = 0;
        n || (n = {});
        var a = function () {
            u = n.leading === !1 ? 0 : new Date, o = null, s = e.apply(r, i)
        };
        return function () {
            var f = new Date;
            !u && n.leading === !1 && (u = f);
            var l = t - (f - u);
            return r = this, i = arguments, l <= 0 ? (clearTimeout(o), o = null, u = f, s = e.apply(r, i)) : !o && n.trailing !== !1 && (o = setTimeout(a, l)), s
        }
    }, x.debounce = function (e, t, n) {
        var r, i, s, o, u;
        return function () {
            s = this, i = arguments, o = new Date;
            var a = function () {
                var f = new Date - o;
                f < t ? r = setTimeout(a, t - f) : (r = null, n || (u = e.apply(s, i)))
            }, f = n && !r;
            return r || (r = setTimeout(a, t)), f && (u = e.apply(s, i)), u
        }
    }, x.once = function (e) {
        var t = !1, n;
        return function () {
            return t ? n : (t = !0, n = e.apply(this, arguments), e = null, n)
        }
    }, x.wrap = function (e, t) {
        return function () {
            var n = [e];
            return o.apply(n, arguments), t.apply(this, n)
        }
    }, x.compose = function () {
        var e = arguments;
        return function () {
            var t = arguments;
            for (var n = e.length - 1; n >= 0; n--)t = [e[n].apply(this, t)];
            return t[0]
        }
    }, x.after = function (e, t) {
        return function () {
            if (--e < 1)return t.apply(this, arguments)
        }
    }, x.keys = E || function (e) {
        if (e !== Object(e))throw new TypeError("Invalid object");
        var t = [];
        for (var n in e)x.has(e, n) && t.push(n);
        return t
    }, x.values = function (e) {
        var t = x.keys(e), n = t.length, r = new Array(n);
        for (var i = 0; i < n; i++)r[i] = e[t[i]];
        return r
    }, x.pairs = function (e) {
        var t = x.keys(e), n = t.length, r = new Array(n);
        for (var i = 0; i < n; i++)r[i] = [t[i], e[t[i]]];
        return r
    }, x.invert = function (e) {
        var t = {}, n = x.keys(e);
        for (var r = 0, i = n.length; r < i; r++)t[e[n[r]]] = n[r];
        return t
    }, x.functions = x.methods = function (e) {
        var t = [];
        for (var n in e)x.isFunction(e[n]) && t.push(n);
        return t.sort()
    }, x.extend = function (e) {
        return T(u.call(arguments, 1), function (t) {
            if (t)for (var n in t)e[n] = t[n]
        }), e
    }, x.pick = function (e) {
        var t = {}, n = a.apply(r, u.call(arguments, 1));
        return T(n, function (n) {
            n in e && (t[n] = e[n])
        }), t
    }, x.omit = function (e) {
        var t = {}, n = a.apply(r, u.call(arguments, 1));
        for (var i in e)x.contains(n, i) || (t[i] = e[i]);
        return t
    }, x.defaults = function (e) {
        return T(u.call(arguments, 1), function (t) {
            if (t)for (var n in t)e[n] === void 0 && (e[n] = t[n])
        }), e
    }, x.clone = function (e) {
        return x.isObject(e) ? x.isArray(e) ? e.slice() : x.extend({}, e) : e
    }, x.tap = function (e, t) {
        return t(e), e
    };
    var M = function (e, t, n, r) {
        if (e === t)return e !== 0 || 1 / e == 1 / t;
        if (e == null || t == null)return e === t;
        e instanceof x && (e = e._wrapped), t instanceof x && (t = t._wrapped);
        var i = f.call(e);
        if (i != f.call(t))return!1;
        switch (i) {
            case"[object String]":
                return e == String(t);
            case"[object Number]":
                return e != +e ? t != +t : e == 0 ? 1 / e == 1 / t : e == +t;
            case"[object Date]":
            case"[object Boolean]":
                return+e == +t;
            case"[object RegExp]":
                return e.source == t.source && e.global == t.global && e.multiline == t.multiline && e.ignoreCase == t.ignoreCase
        }
        if (typeof e != "object" || typeof t != "object")return!1;
        var s = n.length;
        while (s--)if (n[s] == e)return r[s] == t;
        var o = e.constructor, u = t.constructor;
        if (o !== u && !(x.isFunction(o) && o instanceof o && x.isFunction(u) && u instanceof u))return!1;
        n.push(e), r.push(t);
        var a = 0, l = !0;
        if (i == "[object Array]") {
            a = e.length, l = a == t.length;
            if (l)while (a--)if (!(l = M(e[a], t[a], n, r)))break
        } else {
            for (var c in e)if (x.has(e, c)) {
                a++;
                if (!(l = x.has(t, c) && M(e[c], t[c], n, r)))break
            }
            if (l) {
                for (c in t)if (x.has(t, c) && !(a--))break;
                l = !a
            }
        }
        return n.pop(), r.pop(), l
    };
    x.isEqual = function (e, t) {
        return M(e, t, [], [])
    }, x.isEmpty = function (e) {
        if (e == null)return!0;
        if (x.isArray(e) || x.isString(e))return e.length === 0;
        for (var t in e)if (x.has(e, t))return!1;
        return!0
    }, x.isElement = function (e) {
        return!!e && e.nodeType === 1
    }, x.isArray = w || function (e) {
        return f.call(e) == "[object Array]"
    }, x.isObject = function (e) {
        return e === Object(e)
    }, T(["Arguments", "Function", "String", "Number", "Date", "RegExp"], function (e) {
        x["is" + e] = function (t) {
            return f.call(t) == "[object " + e + "]"
        }
    }), x.isArguments(arguments) || (x.isArguments = function (e) {
        return!!e && !!x.has(e, "callee")
    }), typeof /./ != "function" && (x.isFunction = function (e) {
        return typeof e == "function"
    }), x.isFinite = function (e) {
        return isFinite(e) && !isNaN(parseFloat(e))
    }, x.isNaN = function (e) {
        return x.isNumber(e) && e != +e
    }, x.isBoolean = function (e) {
        return e === !0 || e === !1 || f.call(e) == "[object Boolean]"
    }, x.isNull = function (e) {
        return e === null
    }, x.isUndefined = function (e) {
        return e === void 0
    }, x.has = function (e, t) {
        return l.call(e, t)
    }, x.noConflict = function () {
        return e._ = t, this
    }, x.identity = function (e) {
        return e
    }, x.times = function (e, t, n) {
        var r = Array(Math.max(0, e));
        for (var i = 0; i < e; i++)r[i] = t.call(n, i);
        return r
    }, x.random = function (e, t) {
        return t == null && (t = e, e = 0), e + Math.floor(Math.random() * (t - e + 1))
    };
    var _ = {escape: {"&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#x27;"}};
    _.unescape = x.invert(_.escape);
    var D = {escape: new RegExp("[" + x.keys(_.escape).join("") + "]", "g"), unescape: new RegExp("(" + x.keys(_.unescape).join("|") + ")", "g")};
    x.each(["escape", "unescape"], function (e) {
        x[e] = function (t) {
            return t == null ? "" : ("" + t).replace(D[e], function (t) {
                return _[e][t]
            })
        }
    }), x.result = function (e, t) {
        if (e == null)return void 0;
        var n = e[t];
        return x.isFunction(n) ? n.call(e) : n
    }, x.mixin = function (e) {
        T(x.functions(e), function (t) {
            var n = x[t] = e[t];
            x.prototype[t] = function () {
                var e = [this._wrapped];
                return o.apply(e, arguments), F.call(this, n.apply(x, e))
            }
        })
    };
    var P = 0;
    x.uniqueId = function (e) {
        var t = ++P + "";
        return e ? e + t : t
    }, x.templateSettings = {evaluate: /<%([\s\S]+?)%>/g, interpolate: /<%=([\s\S]+?)%>/g, escape: /<%-([\s\S]+?)%>/g};
    var H = /(.)^/, B = {"'": "'", "\\": "\\", "\r": "r", "\n": "n", "	": "t", "\u2028": "u2028", "\u2029": "u2029"}, j = /\\|'|\r|\n|\t|\u2028|\u2029/g;
    x.template = function (e, t, n) {
        var r;
        n = x.defaults({}, n, x.templateSettings);
        var i = new RegExp([(n.escape || H).source, (n.interpolate || H).source, (n.evaluate || H).source].join("|") + "|$", "g"), s = 0, o = "__p+='";
        e.replace(i, function (t, n, r, i, u) {
            return o += e.slice(s, u).replace(j, function (e) {
                return"\\" + B[e]
            }), n && (o += "'+\n((__t=(" + n + "))==null?'':_.escape(__t))+\n'"), r && (o += "'+\n((__t=(" + r + "))==null?'':__t)+\n'"), i && (o += "';\n" + i + "\n__p+='"), s = u + t.length, t
        }), o += "';\n", n.variable || (o = "with(obj||{}){\n" + o + "}\n"), o = "var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};\n" + o + "return __p;\n";
        try {
            r = new Function(n.variable || "obj", "_", o)
        } catch (u) {
            throw u.source = o, u
        }
        if (t)return r(t, x);
        var a = function (e) {
            return r.call(this, e, x)
        };
        return a.source = "function(" + (n.variable || "obj") + "){\n" + o + "}", a
    }, x.chain = function (e) {
        return x(e).chain()
    };
    var F = function (e) {
        return this._chain ? x(e).chain() : e
    };
    x.mixin(x), T(["pop", "push", "reverse", "shift", "sort", "splice", "unshift"], function (e) {
        var t = r[e];
        x.prototype[e] = function () {
            var n = this._wrapped;
            return t.apply(n, arguments), (e == "shift" || e == "splice") && n.length === 0 && delete n[0], F.call(this, n)
        }
    }), T(["concat", "join", "slice"], function (e) {
        var t = r[e];
        x.prototype[e] = function () {
            return F.call(this, t.apply(this._wrapped, arguments))
        }
    }), x.extend(x.prototype, {chain: function () {
        return this._chain = !0, this
    }, value: function () {
        return this._wrapped
    }})
}.call(this), define("underscore", function (e) {
    return function () {
        var t, n;
        return t || e._
    }
}(this)), function () {
    var e = this, t = e.Backbone, n = [], r = n.push, i = n.slice, s = n.splice, o;
    typeof exports != "undefined" ? o = exports : o = e.Backbone = {}, o.VERSION = "1.0.0";
    var u = e._;
    !u && typeof require != "undefined" && (u = require("underscore")), o.$ = e.jQuery || e.Zepto || e.ender || e.$, o.noConflict = function () {
        return e.Backbone = t, this
    }, o.emulateHTTP = !1, o.emulateJSON = !1;
    var a = o.Events = {on: function (e, t, n) {
        if (!l(this, "on", e, [t, n]) || !t)return this;
        this._events || (this._events = {});
        var r = this._events[e] || (this._events[e] = []);
        return r.push({callback: t, context: n, ctx: n || this}), this
    }, once: function (e, t, n) {
        if (!l(this, "once", e, [t, n]) || !t)return this;
        var r = this, i = u.once(function () {
            r.off(e, i), t.apply(this, arguments)
        });
        return i._callback = t, this.on(e, i, n)
    }, off: function (e, t, n) {
        var r, i, s, o, a, f, c, h;
        if (!this._events || !l(this, "off", e, [t, n]))return this;
        if (!e && !t && !n)return this._events = {}, this;
        o = e ? [e] : u.keys(this._events);
        for (a = 0, f = o.length; a < f; a++) {
            e = o[a];
            if (s = this._events[e]) {
                this._events[e] = r = [];
                if (t || n)for (c = 0, h = s.length; c < h; c++)i = s[c], (t && t !== i.callback && t !== i.callback._callback || n && n !== i.context) && r.push(i);
                r.length || delete this._events[e]
            }
        }
        return this
    }, trigger: function (e) {
        if (!this._events)return this;
        var t = i.call(arguments, 1);
        if (!l(this, "trigger", e, t))return this;
        var n = this._events[e], r = this._events.all;
        return n && c(n, t), r && c(r, arguments), this
    }, stopListening: function (e, t, n) {
        var r = this._listeners;
        if (!r)return this;
        var i = !t && !n;
        typeof t == "object" && (n = this), e && ((r = {})[e._listenerId] = e);
        for (var s in r)r[s].off(t, n, this), i && delete this._listeners[s];
        return this
    }}, f = /\s+/, l = function (e, t, n, r) {
        if (!n)return!0;
        if (typeof n == "object") {
            for (var i in n)e[t].apply(e, [i, n[i]].concat(r));
            return!1
        }
        if (f.test(n)) {
            var s = n.split(f);
            for (var o = 0, u = s.length; o < u; o++)e[t].apply(e, [s[o]].concat(r));
            return!1
        }
        return!0
    }, c = function (e, t) {
        var n, r = -1, i = e.length, s = t[0], o = t[1], u = t[2];
        switch (t.length) {
            case 0:
                while (++r < i)(n = e[r]).callback.call(n.ctx);
                return;
            case 1:
                while (++r < i)(n = e[r]).callback.call(n.ctx, s);
                return;
            case 2:
                while (++r < i)(n = e[r]).callback.call(n.ctx, s, o);
                return;
            case 3:
                while (++r < i)(n = e[r]).callback.call(n.ctx, s, o, u);
                return;
            default:
                while (++r < i)(n = e[r]).callback.apply(n.ctx, t)
        }
    }, h = {listenTo: "on", listenToOnce: "once"};
    u.each(h, function (e, t) {
        a[t] = function (t, n, r) {
            var i = this._listeners || (this._listeners = {}), s = t._listenerId || (t._listenerId = u.uniqueId("l"));
            return i[s] = t, typeof n == "object" && (r = this), t[e](n, r, this), this
        }
    }), a.bind = a.on, a.unbind = a.off, u.extend(o, a);
    var p = o.Model = function (e, t) {
        var n, r = e || {};
        t || (t = {}), this.cid = u.uniqueId("c"), this.attributes = {}, u.extend(this, u.pick(t, d)), t.parse && (r = this.parse(r, t) || {});
        if (n = u.result(this, "defaults"))r = u.defaults({}, r, n);
        this.set(r, t), this.changed = {}, this.initialize.apply(this, arguments)
    }, d = ["url", "urlRoot", "collection"];
    u.extend(p.prototype, a, {changed: null, validationError: null, idAttribute: "id", initialize: function () {
    }, toJSON: function (e) {
        return u.clone(this.attributes)
    }, sync: function () {
        return o.sync.apply(this, arguments)
    }, get: function (e) {
        return this.attributes[e]
    }, escape: function (e) {
        return u.escape(this.get(e))
    }, has: function (e) {
        return this.get(e) != null
    }, set: function (e, t, n) {
        var r, i, s, o, a, f, l, c;
        if (e == null)return this;
        typeof e == "object" ? (i = e, n = t) : (i = {})[e] = t, n || (n = {});
        if (!this._validate(i, n))return!1;
        s = n.unset, a = n.silent, o = [], f = this._changing, this._changing = !0, f || (this._previousAttributes = u.clone(this.attributes), this.changed = {}), c = this.attributes, l = this._previousAttributes, this.idAttribute in i && (this.id = i[this.idAttribute]);
        for (r in i)t = i[r], u.isEqual(c[r], t) || o.push(r), u.isEqual(l[r], t) ? delete this.changed[r] : this.changed[r] = t, s ? delete c[r] : c[r] = t;
        if (!a) {
            o.length && (this._pending = !0);
            for (var h = 0, p = o.length; h < p; h++)this.trigger("change:" + o[h], this, c[o[h]], n)
        }
        if (f)return this;
        if (!a)while (this._pending)this._pending = !1, this.trigger("change", this, n);
        return this._pending = !1, this._changing = !1, this
    }, unset: function (e, t) {
        return this.set(e, void 0, u.extend({}, t, {unset: !0}))
    }, clear: function (e) {
        var t = {};
        for (var n in this.attributes)t[n] = void 0;
        return this.set(t, u.extend({}, e, {unset: !0}))
    }, hasChanged: function (e) {
        return e == null ? !u.isEmpty(this.changed) : u.has(this.changed, e)
    }, changedAttributes: function (e) {
        if (!e)return this.hasChanged() ? u.clone(this.changed) : !1;
        var t, n = !1, r = this._changing ? this._previousAttributes : this.attributes;
        for (var i in e) {
            if (u.isEqual(r[i], t = e[i]))continue;
            (n || (n = {}))[i] = t
        }
        return n
    }, previous: function (e) {
        return e == null || !this._previousAttributes ? null : this._previousAttributes[e]
    }, previousAttributes: function () {
        return u.clone(this._previousAttributes)
    }, fetch: function (e) {
        e = e ? u.clone(e) : {}, e.parse === void 0 && (e.parse = !0);
        var t = this, n = e.success;
        return e.success = function (r) {
            if (!t.set(t.parse(r, e), e))return!1;
            n && n(t, r, e), t.trigger("sync", t, r, e)
        }, j(this, e), this.sync("read", this, e)
    }, save: function (e, t, n) {
        var r, i, s, o = this.attributes;
        e == null || typeof e == "object" ? (r = e, n = t) : (r = {})[e] = t;
        if (r && (!n || !n.wait) && !this.set(r, n))return!1;
        n = u.extend({validate: !0}, n);
        if (!this._validate(r, n))return!1;
        r && n.wait && (this.attributes = u.extend({}, o, r)), n.parse === void 0 && (n.parse = !0);
        var a = this, f = n.success;
        return n.success = function (e) {
            a.attributes = o;
            var t = a.parse(e, n);
            n.wait && (t = u.extend(r || {}, t));
            if (u.isObject(t) && !a.set(t, n))return!1;
            f && f(a, e, n), a.trigger("sync", a, e, n)
        }, j(this, n), i = this.isNew() ? "create" : n.patch ? "patch" : "update", i === "patch" && (n.attrs = r), s = this.sync(i, this, n), r && n.wait && (this.attributes = o), s
    }, destroy: function (e) {
        e = e ? u.clone(e) : {};
        var t = this, n = e.success, r = function () {
            t.trigger("destroy", t, t.collection, e)
        };
        e.success = function (i) {
            (e.wait || t.isNew()) && r(), n && n(t, i, e), t.isNew() || t.trigger("sync", t, i, e)
        };
        if (this.isNew())return e.success(), !1;
        j(this, e);
        var i = this.sync("delete", this, e);
        return e.wait || r(), i
    }, url: function () {
        var e = u.result(this, "urlRoot") || u.result(this.collection, "url") || B();
        return this.isNew() ? e : e + (e.charAt(e.length - 1) === "/" ? "" : "/") + encodeURIComponent(this.id)
    }, parse: function (e, t) {
        return e
    }, clone: function () {
        return new this.constructor(this.attributes)
    }, isNew: function () {
        return this.id == null
    }, isValid: function (e) {
        return this._validate({}, u.extend(e || {}, {validate: !0}))
    }, _validate: function (e, t) {
        if (!t.validate || !this.validate)return!0;
        e = u.extend({}, this.attributes, e);
        var n = this.validationError = this.validate(e, t) || null;
        return n ? (this.trigger("invalid", this, n, u.extend(t || {}, {validationError: n})), !1) : !0
    }});
    var v = ["keys", "values", "pairs", "invert", "pick", "omit"];
    u.each(v, function (e) {
        p.prototype[e] = function () {
            var t = i.call(arguments);
            return t.unshift(this.attributes), u[e].apply(u, t)
        }
    });
    var m = o.Collection = function (e, t) {
        t || (t = {}), t.url && (this.url = t.url), t.model && (this.model = t.model), t.comparator !== void 0 && (this.comparator = t.comparator), this._reset(), this.initialize.apply(this, arguments), e && this.reset(e, u.extend({silent: !0}, t))
    }, g = {add: !0, remove: !0, merge: !0}, y = {add: !0, merge: !1, remove: !1};
    u.extend(m.prototype, a, {model: p, initialize: function () {
    }, toJSON: function (e) {
        return this.map(function (t) {
            return t.toJSON(e)
        })
    }, sync: function () {
        return o.sync.apply(this, arguments)
    }, add: function (e, t) {
        return this.set(e, u.defaults(t || {}, y))
    }, remove: function (e, t) {
        e = u.isArray(e) ? e.slice() : [e], t || (t = {});
        var n, r, i, s;
        for (n = 0, r = e.length; n < r; n++) {
            s = this.get(e[n]);
            if (!s)continue;
            delete this._byId[s.id], delete this._byId[s.cid], i = this.indexOf(s), this.models.splice(i, 1), this.length--, t.silent || (t.index = i, s.trigger("remove", s, this, t)), this._removeReference(s)
        }
        return this
    }, set: function (e, t) {
        t = u.defaults(t || {}, g), t.parse && (e = this.parse(e, t)), u.isArray(e) || (e = e ? [e] : []);
        var n, i, o, a, f, l, c = t.at, h = this.comparator && c == null && t.sort !== !1, p = u.isString(this.comparator) ? this.comparator : null, d = [], v = [], m = {};
        for (n = 0, i = e.length; n < i; n++) {
            if (!(o = this._prepareModel(e[n], t)))continue;
            (f = this.get(o)) ? (t.remove && (m[f.cid] = !0), t.merge && (f.set(o.attributes, t), h && !l && f.hasChanged(p) && (l = !0))) : t.add && (d.push(o), o.on("all", this._onModelEvent, this), this._byId[o.cid] = o, o.id != null && (this._byId[o.id] = o))
        }
        if (t.remove) {
            for (n = 0, i = this.length; n < i; ++n)m[(o = this.models[n]).cid] || v.push(o);
            v.length && this.remove(v, t)
        }
        d.length && (h && (l = !0), this.length += d.length, c != null ? s.apply(this.models, [c, 0].concat(d)) : r.apply(this.models, d)), l && this.sort({silent: !0});
        if (t.silent)return this;
        for (n = 0, i = d.length; n < i; n++)(o = d[n]).trigger("add", o, this, t);
        return l && this.trigger("sort", this, t), this
    }, reset: function (e, t) {
        t || (t = {});
        for (var n = 0, r = this.models.length; n < r; n++)this._removeReference(this.models[n]);
        return t.previousModels = this.models, this._reset(), this.add(e, u.extend({silent: !0}, t)), t.silent || this.trigger("reset", this, t), this
    }, push: function (e, t) {
        return e = this._prepareModel(e, t), this.add(e, u.extend({at: this.length}, t)), e
    }, pop: function (e) {
        var t = this.at(this.length - 1);
        return this.remove(t, e), t
    }, unshift: function (e, t) {
        return e = this._prepareModel(e, t), this.add(e, u.extend({at: 0}, t)), e
    }, shift: function (e) {
        var t = this.at(0);
        return this.remove(t, e), t
    }, slice: function (e, t) {
        return this.models.slice(e, t)
    }, get: function (e) {
        return e == null ? void 0 : this._byId[e.id != null ? e.id : e.cid || e]
    }, at: function (e) {
        return this.models[e]
    }, where: function (e, t) {
        return u.isEmpty(e) ? t ? void 0 : [] : this[t ? "find" : "filter"](function (t) {
            for (var n in e)if (e[n] !== t.get(n))return!1;
            return!0
        })
    }, findWhere: function (e) {
        return this.where(e, !0)
    }, sort: function (e) {
        if (!this.comparator)throw new Error("Cannot sort a set without a comparator");
        return e || (e = {}), u.isString(this.comparator) || this.comparator.length === 1 ? this.models = this.sortBy(this.comparator, this) : this.models.sort(u.bind(this.comparator, this)), e.silent || this.trigger("sort", this, e), this
    }, sortedIndex: function (e, t, n) {
        t || (t = this.comparator);
        var r = u.isFunction(t) ? t : function (e) {
            return e.get(t)
        };
        return u.sortedIndex(this.models, e, r, n)
    }, pluck: function (e) {
        return u.invoke(this.models, "get", e)
    }, fetch: function (e) {
        e = e ? u.clone(e) : {}, e.parse === void 0 && (e.parse = !0);
        var t = e.success, n = this;
        return e.success = function (r) {
            var i = e.reset ? "reset" : "set";
            n[i](r, e), t && t(n, r, e), n.trigger("sync", n, r, e)
        }, j(this, e), this.sync("read", this, e)
    }, create: function (e, t) {
        t = t ? u.clone(t) : {};
        if (!(e = this._prepareModel(e, t)))return!1;
        t.wait || this.add(e, t);
        var n = this, r = t.success;
        return t.success = function (i) {
            t.wait && n.add(e, t), r && r(e, i, t)
        }, e.save(null, t), e
    }, parse: function (e, t) {
        return e
    }, clone: function () {
        return new this.constructor(this.models)
    }, _reset: function () {
        this.length = 0, this.models = [], this._byId = {}
    }, _prepareModel: function (e, t) {
        if (e instanceof p)return e.collection || (e.collection = this), e;
        t || (t = {}), t.collection = this;
        var n = new this.model(e, t);
        return n._validate(e, t) ? n : (this.trigger("invalid", this, e, t), !1)
    }, _removeReference: function (e) {
        this === e.collection && delete e.collection, e.off("all", this._onModelEvent, this)
    }, _onModelEvent: function (e, t, n, r) {
        if ((e === "add" || e === "remove") && n !== this)return;
        e === "destroy" && this.remove(t, r), t && e === "change:" + t.idAttribute && (delete this._byId[t.previous(t.idAttribute)], t.id != null && (this._byId[t.id] = t)), this.trigger.apply(this, arguments)
    }});
    var b = ["forEach", "each", "map", "collect", "reduce", "foldl", "inject", "reduceRight", "foldr", "find", "detect", "filter", "select", "reject", "every", "all", "some", "any", "include", "contains", "invoke", "max", "min", "toArray", "size", "first", "head", "take", "initial", "rest", "tail", "drop", "last", "without", "indexOf", "shuffle", "lastIndexOf", "isEmpty", "chain"];
    u.each(b, function (e) {
        m.prototype[e] = function () {
            var t = i.call(arguments);
            return t.unshift(this.models), u[e].apply(u, t)
        }
    });
    var w = ["groupBy", "countBy", "sortBy"];
    u.each(w, function (e) {
        m.prototype[e] = function (t, n) {
            var r = u.isFunction(t) ? t : function (e) {
                return e.get(t)
            };
            return u[e](this.models, r, n)
        }
    });
    var E = o.View = function (e) {
        this.cid = u.uniqueId("view"), this._configure(e || {}), this._ensureElement(), this.initialize.apply(this, arguments), this.delegateEvents()
    }, S = /^(\S+)\s*(.*)$/, x = ["model", "collection", "el", "id", "attributes", "className", "tagName", "events"];
    u.extend(E.prototype, a, {tagName: "div", $: function (e) {
        return this.$el.find(e)
    }, initialize: function () {
    }, render: function () {
        return this
    }, remove: function () {
        return this.$el.remove(), this.stopListening(), this
    }, setElement: function (e, t) {
        return this.$el && this.undelegateEvents(), this.$el = e instanceof o.$ ? e : o.$(e), this.el = this.$el[0], t !== !1 && this.delegateEvents(), this
    }, delegateEvents: function (e) {
        if (!e && !(e = u.result(this, "events")))return this;
        this.undelegateEvents();
        for (var t in e) {
            var n = e[t];
            u.isFunction(n) || (n = this[e[t]]);
            if (!n)continue;
            var r = t.match(S), i = r[1], s = r[2];
            n = u.bind(n, this), i += ".delegateEvents" + this.cid, s === "" ? this.$el.on(i, n) : this.$el.on(i, s, n)
        }
        return this
    }, undelegateEvents: function () {
        return this.$el.off(".delegateEvents" + this.cid), this
    }, _configure: function (e) {
        this.options && (e = u.extend({}, u.result(this, "options"), e)), u.extend(this, u.pick(e, x)), this.options = e
    }, _ensureElement: function () {
        if (!this.el) {
            var e = u.extend({}, u.result(this, "attributes"));
            this.id && (e.id = u.result(this, "id")), this.className && (e["class"] = u.result(this, "className"));
            var t = o.$("<" + u.result(this, "tagName") + ">").attr(e);
            this.setElement(t, !1)
        } else this.setElement(u.result(this, "el"), !1)
    }}), o.sync = function (e, t, n) {
        var r = T[e];
        u.defaults(n || (n = {}), {emulateHTTP: o.emulateHTTP, emulateJSON: o.emulateJSON});
        var i = {type: r, dataType: "json"};
        n.url || (i.url = u.result(t, "url") || B()), n.data == null && t && (e === "create" || e === "update" || e === "patch") && (i.contentType = "application/json", i.data = JSON.stringify(n.attrs || t.toJSON(n))), n.emulateJSON && (i.contentType = "application/x-www-form-urlencoded", i.data = i.data ? {model: i.data} : {});
        if (n.emulateHTTP && (r === "PUT" || r === "DELETE" || r === "PATCH")) {
            i.type = "POST", n.emulateJSON && (i.data._method = r);
            var s = n.beforeSend;
            n.beforeSend = function (e) {
                e.setRequestHeader("X-HTTP-Method-Override", r);
                if (s)return s.apply(this, arguments)
            }
        }
        i.type !== "GET" && !n.emulateJSON && (i.processData = !1), i.type === "PATCH" && window.ActiveXObject && (!window.external || !window.external.msActiveXFilteringEnabled) && (i.xhr = function () {
            return new ActiveXObject("Microsoft.XMLHTTP")
        });
        var a = n.xhr = o.ajax(u.extend(i, n));
        return t.trigger("request", t, a, n), a
    };
    var T = {create: "POST", update: "PUT", patch: "PATCH", "delete": "DELETE", read: "GET"};
    o.ajax = function () {
        return o.$.ajax.apply(o.$, arguments)
    };
    var N = o.Router = function (e) {
        e || (e = {}), e.routes && (this.routes = e.routes), this._bindRoutes(), this.initialize.apply(this, arguments)
    }, C = /\((.*?)\)/g, k = /(\(\?)?:\w+/g, L = /\*\w+/g, A = /[\-{}\[\]+?.,\\\^$|#\s]/g;
    u.extend(N.prototype, a, {initialize: function () {
    }, route: function (e, t, n) {
        u.isRegExp(e) || (e = this._routeToRegExp(e)), u.isFunction(t) && (n = t, t = ""), n || (n = this[t]);
        var r = this;
        return o.history.route(e, function (i) {
            var s = r._extractParameters(e, i);
            n && n.apply(r, s), r.trigger.apply(r, ["route:" + t].concat(s)), r.trigger("route", t, s), o.history.trigger("route", r, t, s)
        }), this
    }, navigate: function (e, t) {
        return o.history.navigate(e, t), this
    }, _bindRoutes: function () {
        if (!this.routes)return;
        this.routes = u.result(this, "routes");
        var e, t = u.keys(this.routes);
        while ((e = t.pop()) != null)this.route(e, this.routes[e])
    }, _routeToRegExp: function (e) {
        return e = e.replace(A, "\\$&").replace(C, "(?:$1)?").replace(k,function (e, t) {
            return t ? e : "([^/]+)"
        }).replace(L, "(.*?)"), new RegExp("^" + e + "$")
    }, _extractParameters: function (e, t) {
        var n = e.exec(t).slice(1);
        return u.map(n, function (e) {
            return e ? decodeURIComponent(e) : null
        })
    }});
    var O = o.History = function () {
        this.handlers = [], u.bindAll(this, "checkUrl"), typeof window != "undefined" && (this.location = window.location, this.history = window.history)
    }, M = /^[#\/]|\s+$/g, _ = /^\/+|\/+$/g, D = /msie [\w.]+/, P = /\/$/;
    O.started = !1, u.extend(O.prototype, a, {interval: 50, getHash: function (e) {
        var t = (e || this).location.href.match(/#(.*)$/);
        return t ? t[1] : ""
    }, getFragment: function (e, t) {
        if (e == null)if (this._hasPushState || !this._wantsHashChange || t) {
            e = this.location.pathname;
            var n = this.root.replace(P, "");
            e.indexOf(n) || (e = e.substr(n.length))
        } else e = this.getHash();
        return e.replace(M, "")
    }, start: function (e) {
        if (O.started)throw new Error("Backbone.history has already been started");
        O.started = !0, this.options = u.extend({}, {root: "/"}, this.options, e), this.root = this.options.root, this._wantsHashChange = this.options.hashChange !== !1, this._wantsPushState = !!this.options.pushState, this._hasPushState = !!(this.options.pushState && this.history && this.history.pushState);
        var t = this.getFragment(), n = document.documentMode, r = D.exec(navigator.userAgent.toLowerCase()) && (!n || n <= 7);
        this.root = ("/" + this.root + "/").replace(_, "/"), r && this._wantsHashChange && (this.iframe = o.$('<iframe src="javascript:0" tabindex="-1" />').hide().appendTo("body")[0].contentWindow, this.navigate(t)), this._hasPushState ? o.$(window).on("popstate", this.checkUrl) : this._wantsHashChange && "onhashchange"in window && !r ? o.$(window).on("hashchange", this.checkUrl) : this._wantsHashChange && (this._checkUrlInterval = setInterval(this.checkUrl, this.interval)), this.fragment = t;
        var i = this.location, s = i.pathname.replace(/[^\/]$/, "$&/") === this.root;
        if (this._wantsHashChange && this._wantsPushState && !this._hasPushState && !s)return this.fragment = this.getFragment(null, !0), this.location.replace(this.root + this.location.search + "#" + this.fragment), !0;
        this._wantsPushState && this._hasPushState && s && i.hash && (this.fragment = this.getHash().replace(M, ""), this.history.replaceState({}, document.title, this.root + this.fragment + i.search));
        if (!this.options.silent)return this.loadUrl()
    }, stop: function () {
        o.$(window).off("popstate", this.checkUrl).off("hashchange", this.checkUrl), clearInterval(this._checkUrlInterval), O.started = !1
    }, route: function (e, t) {
        this.handlers.unshift({route: e, callback: t})
    }, checkUrl: function (e) {
        var t = this.getFragment();
        t === this.fragment && this.iframe && (t = this.getFragment(this.getHash(this.iframe)));
        if (t === this.fragment)return!1;
        this.iframe && this.navigate(t), this.loadUrl() || this.loadUrl(this.getHash())
    }, loadUrl: function (e) {
        var t = this.fragment = this.getFragment(e), n = u.any(this.handlers, function (e) {
            if (e.route.test(t))return e.callback(t), !0
        });
        return n
    }, navigate: function (e, t) {
        if (!O.started)return!1;
        if (!t || t === !0)t = {trigger: t};
        e = this.getFragment(e || "");
        if (this.fragment === e)return;
        this.fragment = e;
        var n = this.root + e;
        if (this._hasPushState)this.history[t.replace ? "replaceState" : "pushState"]({}, document.title, n); else {
            if (!this._wantsHashChange)return this.location.assign(n);
            this._updateHash(this.location, e, t.replace), this.iframe && e !== this.getFragment(this.getHash(this.iframe)) && (t.replace || this.iframe.document.open().close(), this._updateHash(this.iframe.location, e, t.replace))
        }
        t.trigger && this.loadUrl(e)
    }, _updateHash: function (e, t, n) {
        if (n) {
            var r = e.href.replace(/(javascript:|#).*$/, "");
            e.replace(r + "#" + t)
        } else e.hash = "#" + t
    }}), o.history = new O;
    var H = function (e, t) {
        var n = this, r;
        e && u.has(e, "constructor") ? r = e.constructor : r = function () {
            return n.apply(this, arguments)
        }, u.extend(r, n, t);
        var i = function () {
            this.constructor = r
        };
        return i.prototype = n.prototype, r.prototype = new i, e && u.extend(r.prototype, e), r.__super__ = n.prototype, r
    };
    p.extend = m.extend = N.extend = E.extend = O.extend = H;
    var B = function () {
        throw new Error('A "url" property or function must be specified')
    }, j = function (e, t) {
        var n = t.error;
        t.error = function (r) {
            n && n(e, r, t), e.trigger("error", e, r, t)
        }
    }
}.call(this), define("backbone", ["underscore", "jquery"], function (e) {
    return function () {
        var t, n;
        return t || e.Backbone
    }
}(this)), define("views/archview", ["jquery", "backbone"], function (e, t) {
    return t.View.extend({template: {}, collection: {}, model: {}, render: function () {
        return this.collection && this.collection.length > 0 ? this.$el.html(this.template(this.collection)) : this.model ? this.$el.html(this.template(this.model)) : this.$el.html(this.template()), this.delegateEvents(), typeof this.initDomHandles == "function" && this.initDomHandles(), this
    }})
}), function () {
    var e = {};
    (function (e, t) {
        e.VERSION = "1.0.0-rc.3", e.COMPILER_REVISION = 2, e.REVISION_CHANGES = {1: "<= 1.0.rc.2", 2: ">= 1.0.0-rc.3"}, e.helpers = {}, e.partials = {}, e.registerHelper = function (e, t, n) {
            n && (t.not = n), this.helpers[e] = t
        }, e.registerPartial = function (e, t) {
            this.partials[e] = t
        }, e.registerHelper("helperMissing", function (e) {
            if (arguments.length === 2)return t;
            throw new Error("Could not find property '" + e + "'")
        });
        var n = Object.prototype.toString, r = "[object Function]";
        e.registerHelper("blockHelperMissing", function (t, i) {
            var s = i.inverse || function () {
            }, o = i.fn, u = n.call(t);
            return u === r && (t = t.call(this)), t === !0 ? o(this) : t === !1 || t == null ? s(this) : u === "[object Array]" ? t.length > 0 ? e.helpers.each(t, i) : s(this) : o(t)
        }), e.K = function () {
        }, e.createFrame = Object.create || function (t) {
            e.K.prototype = t;
            var n = new e.K;
            return e.K.prototype = null, n
        }, e.logger = {DEBUG: 0, INFO: 1, WARN: 2, ERROR: 3, level: 3, methodMap: {0: "debug", 1: "info", 2: "warn", 3: "error"}, log: function (t, n) {
            if (e.logger.level <= t) {
                var r = e.logger.methodMap[t];
                typeof console != "undefined" && console[r] && console[r].call(console, n)
            }
        }}, e.log = function (t, n) {
            e.logger.log(t, n)
        }, e.registerHelper("each", function (t, n) {
            var r = n.fn, i = n.inverse, s = 0, o = "", u;
            n.data && (u = e.createFrame(n.data));
            if (t && typeof t == "object")if (t instanceof Array)for (var a = t.length; s < a; s++)u && (u.index = s), o += r(t[s], {data: u}); else for (var f in t)t.hasOwnProperty(f) && (u && (u.key = f), o += r(t[f], {data: u}), s++);
            return s === 0 && (o = i(this)), o
        }), e.registerHelper("if", function (t, i) {
            var s = n.call(t);
            return s === r && (t = t.call(this)), !t || e.Utils.isEmpty(t) ? i.inverse(this) : i.fn(this)
        }), e.registerHelper("unless", function (t, n) {
            return e.helpers["if"].call(this, t, {fn: n.inverse, inverse: n.fn})
        }), e.registerHelper("with", function (e, t) {
            return t.fn(e)
        }), e.registerHelper("log", function (t, n) {
            var r = n.data && n.data.level != null ? parseInt(n.data.level, 10) : 1;
            e.log(r, t)
        })
    })(e);
    var t = function () {
        function n() {
            this.yy = {}
        }

        var e = {trace: function () {
        }, yy: {}, symbols_: {error: 2, root: 3, program: 4, EOF: 5, simpleInverse: 6, statements: 7, statement: 8, openInverse: 9, closeBlock: 10, openBlock: 11, mustache: 12, partial: 13, CONTENT: 14, COMMENT: 15, OPEN_BLOCK: 16, inMustache: 17, CLOSE: 18, OPEN_INVERSE: 19, OPEN_ENDBLOCK: 20, path: 21, OPEN: 22, OPEN_UNESCAPED: 23, OPEN_PARTIAL: 24, partialName: 25, params: 26, hash: 27, DATA: 28, param: 29, STRING: 30, INTEGER: 31, BOOLEAN: 32, hashSegments: 33, hashSegment: 34, ID: 35, EQUALS: 36, PARTIAL_NAME: 37, pathSegments: 38, SEP: 39, $accept: 0, $end: 1}, terminals_: {2: "error", 5: "EOF", 14: "CONTENT", 15: "COMMENT", 16: "OPEN_BLOCK", 18: "CLOSE", 19: "OPEN_INVERSE", 20: "OPEN_ENDBLOCK", 22: "OPEN", 23: "OPEN_UNESCAPED", 24: "OPEN_PARTIAL", 28: "DATA", 30: "STRING", 31: "INTEGER", 32: "BOOLEAN", 35: "ID", 36: "EQUALS", 37: "PARTIAL_NAME", 39: "SEP"}, productions_: [0, [3, 2], [4, 2], [4, 3], [4, 2], [4, 1], [4, 1], [4, 0], [7, 1], [7, 2], [8, 3], [8, 3], [8, 1], [8, 1], [8, 1], [8, 1], [11, 3], [9, 3], [10, 3], [12, 3], [12, 3], [13, 3], [13, 4], [6, 2], [17, 3], [17, 2], [17, 2], [17, 1], [17, 1], [26, 2], [26, 1], [29, 1], [29, 1], [29, 1], [29, 1], [29, 1], [27, 1], [33, 2], [33, 1], [34, 3], [34, 3], [34, 3], [34, 3], [34, 3], [25, 1], [21, 1], [38, 3], [38, 1]], performAction: function (t, n, r, i, s, o, u) {
            var a = o.length - 1;
            switch (s) {
                case 1:
                    return o[a - 1];
                case 2:
                    this.$ = new i.ProgramNode([], o[a]);
                    break;
                case 3:
                    this.$ = new i.ProgramNode(o[a - 2], o[a]);
                    break;
                case 4:
                    this.$ = new i.ProgramNode(o[a - 1], []);
                    break;
                case 5:
                    this.$ = new i.ProgramNode(o[a]);
                    break;
                case 6:
                    this.$ = new i.ProgramNode([], []);
                    break;
                case 7:
                    this.$ = new i.ProgramNode([]);
                    break;
                case 8:
                    this.$ = [o[a]];
                    break;
                case 9:
                    o[a - 1].push(o[a]), this.$ = o[a - 1];
                    break;
                case 10:
                    this.$ = new i.BlockNode(o[a - 2], o[a - 1].inverse, o[a - 1], o[a]);
                    break;
                case 11:
                    this.$ = new i.BlockNode(o[a - 2], o[a - 1], o[a - 1].inverse, o[a]);
                    break;
                case 12:
                    this.$ = o[a];
                    break;
                case 13:
                    this.$ = o[a];
                    break;
                case 14:
                    this.$ = new i.ContentNode(o[a]);
                    break;
                case 15:
                    this.$ = new i.CommentNode(o[a]);
                    break;
                case 16:
                    this.$ = new i.MustacheNode(o[a - 1][0], o[a - 1][1]);
                    break;
                case 17:
                    this.$ = new i.MustacheNode(o[a - 1][0], o[a - 1][1]);
                    break;
                case 18:
                    this.$ = o[a - 1];
                    break;
                case 19:
                    this.$ = new i.MustacheNode(o[a - 1][0], o[a - 1][1]);
                    break;
                case 20:
                    this.$ = new i.MustacheNode(o[a - 1][0], o[a - 1][1], !0);
                    break;
                case 21:
                    this.$ = new i.PartialNode(o[a - 1]);
                    break;
                case 22:
                    this.$ = new i.PartialNode(o[a - 2], o[a - 1]);
                    break;
                case 23:
                    break;
                case 24:
                    this.$ = [[o[a - 2]].concat(o[a - 1]), o[a]];
                    break;
                case 25:
                    this.$ = [[o[a - 1]].concat(o[a]), null];
                    break;
                case 26:
                    this.$ = [
                        [o[a - 1]],
                        o[a]
                    ];
                    break;
                case 27:
                    this.$ = [
                        [o[a]],
                        null
                    ];
                    break;
                case 28:
                    this.$ = [
                        [new i.DataNode(o[a])],
                        null
                    ];
                    break;
                case 29:
                    o[a - 1].push(o[a]), this.$ = o[a - 1];
                    break;
                case 30:
                    this.$ = [o[a]];
                    break;
                case 31:
                    this.$ = o[a];
                    break;
                case 32:
                    this.$ = new i.StringNode(o[a]);
                    break;
                case 33:
                    this.$ = new i.IntegerNode(o[a]);
                    break;
                case 34:
                    this.$ = new i.BooleanNode(o[a]);
                    break;
                case 35:
                    this.$ = new i.DataNode(o[a]);
                    break;
                case 36:
                    this.$ = new i.HashNode(o[a]);
                    break;
                case 37:
                    o[a - 1].push(o[a]), this.$ = o[a - 1];
                    break;
                case 38:
                    this.$ = [o[a]];
                    break;
                case 39:
                    this.$ = [o[a - 2], o[a]];
                    break;
                case 40:
                    this.$ = [o[a - 2], new i.StringNode(o[a])];
                    break;
                case 41:
                    this.$ = [o[a - 2], new i.IntegerNode(o[a])];
                    break;
                case 42:
                    this.$ = [o[a - 2], new i.BooleanNode(o[a])];
                    break;
                case 43:
                    this.$ = [o[a - 2], new i.DataNode(o[a])];
                    break;
                case 44:
                    this.$ = new i.PartialNameNode(o[a]);
                    break;
                case 45:
                    this.$ = new i.IdNode(o[a]);
                    break;
                case 46:
                    o[a - 2].push(o[a]), this.$ = o[a - 2];
                    break;
                case 47:
                    this.$ = [o[a]]
            }
        }, table: [
            {3: 1, 4: 2, 5: [2, 7], 6: 3, 7: 4, 8: 6, 9: 7, 11: 8, 12: 9, 13: 10, 14: [1, 11], 15: [1, 12], 16: [1, 13], 19: [1, 5], 22: [1, 14], 23: [1, 15], 24: [1, 16]},
            {1: [3]},
            {5: [1, 17]},
            {5: [2, 6], 7: 18, 8: 6, 9: 7, 11: 8, 12: 9, 13: 10, 14: [1, 11], 15: [1, 12], 16: [1, 13], 19: [1, 19], 20: [2, 6], 22: [1, 14], 23: [1, 15], 24: [1, 16]},
            {5: [2, 5], 6: 20, 8: 21, 9: 7, 11: 8, 12: 9, 13: 10, 14: [1, 11], 15: [1, 12], 16: [1, 13], 19: [1, 5], 20: [2, 5], 22: [1, 14], 23: [1, 15], 24: [1, 16]},
            {17: 23, 18: [1, 22], 21: 24, 28: [1, 25], 35: [1, 27], 38: 26},
            {5: [2, 8], 14: [2, 8], 15: [2, 8], 16: [2, 8], 19: [2, 8], 20: [2, 8], 22: [2, 8], 23: [2, 8], 24: [2, 8]},
            {4: 28, 6: 3, 7: 4, 8: 6, 9: 7, 11: 8, 12: 9, 13: 10, 14: [1, 11], 15: [1, 12], 16: [1, 13], 19: [1, 5], 20: [2, 7], 22: [1, 14], 23: [1, 15], 24: [1, 16]},
            {4: 29, 6: 3, 7: 4, 8: 6, 9: 7, 11: 8, 12: 9, 13: 10, 14: [1, 11], 15: [1, 12], 16: [1, 13], 19: [1, 5], 20: [2, 7], 22: [1, 14], 23: [1, 15], 24: [1, 16]},
            {5: [2, 12], 14: [2, 12], 15: [2, 12], 16: [2, 12], 19: [2, 12], 20: [2, 12], 22: [2, 12], 23: [2, 12], 24: [2, 12]},
            {5: [2, 13], 14: [2, 13], 15: [2, 13], 16: [2, 13], 19: [2, 13], 20: [2, 13], 22: [2, 13], 23: [2, 13], 24: [2, 13]},
            {5: [2, 14], 14: [2, 14], 15: [2, 14], 16: [2, 14], 19: [2, 14], 20: [2, 14], 22: [2, 14], 23: [2, 14], 24: [2, 14]},
            {5: [2, 15], 14: [2, 15], 15: [2, 15], 16: [2, 15], 19: [2, 15], 20: [2, 15], 22: [2, 15], 23: [2, 15], 24: [2, 15]},
            {17: 30, 21: 24, 28: [1, 25], 35: [1, 27], 38: 26},
            {17: 31, 21: 24, 28: [1, 25], 35: [1, 27], 38: 26},
            {17: 32, 21: 24, 28: [1, 25], 35: [1, 27], 38: 26},
            {25: 33, 37: [1, 34]},
            {1: [2, 1]},
            {5: [2, 2], 8: 21, 9: 7, 11: 8, 12: 9, 13: 10, 14: [1, 11], 15: [1, 12], 16: [1, 13], 19: [1, 19], 20: [2, 2], 22: [1, 14], 23: [1, 15], 24: [1, 16]},
            {17: 23, 21: 24, 28: [1, 25], 35: [1, 27], 38: 26},
            {5: [2, 4], 7: 35, 8: 6, 9: 7, 11: 8, 12: 9, 13: 10, 14: [1, 11], 15: [1, 12], 16: [1, 13], 19: [1, 19], 20: [2, 4], 22: [1, 14], 23: [1, 15], 24: [1, 16]},
            {5: [2, 9], 14: [2, 9], 15: [2, 9], 16: [2, 9], 19: [2, 9], 20: [2, 9], 22: [2, 9], 23: [2, 9], 24: [2, 9]},
            {5: [2, 23], 14: [2, 23], 15: [2, 23], 16: [2, 23], 19: [2, 23], 20: [2, 23], 22: [2, 23], 23: [2, 23], 24: [2, 23]},
            {18: [1, 36]},
            {18: [2, 27], 21: 41, 26: 37, 27: 38, 28: [1, 45], 29: 39, 30: [1, 42], 31: [1, 43], 32: [1, 44], 33: 40, 34: 46, 35: [1, 47], 38: 26},
            {18: [2, 28]},
            {18: [2, 45], 28: [2, 45], 30: [2, 45], 31: [2, 45], 32: [2, 45], 35: [2, 45], 39: [1, 48]},
            {18: [2, 47], 28: [2, 47], 30: [2, 47], 31: [2, 47], 32: [2, 47], 35: [2, 47], 39: [2, 47]},
            {10: 49, 20: [1, 50]},
            {10: 51, 20: [1, 50]},
            {18: [1, 52]},
            {18: [1, 53]},
            {18: [1, 54]},
            {18: [1, 55], 21: 56, 35: [1, 27], 38: 26},
            {18: [2, 44], 35: [2, 44]},
            {5: [2, 3], 8: 21, 9: 7, 11: 8, 12: 9, 13: 10, 14: [1, 11], 15: [1, 12], 16: [1, 13], 19: [1, 19], 20: [2, 3], 22: [1, 14], 23: [1, 15], 24: [1, 16]},
            {14: [2, 17], 15: [2, 17], 16: [2, 17], 19: [2, 17], 20: [2, 17], 22: [2, 17], 23: [2, 17], 24: [2, 17]},
            {18: [2, 25], 21: 41, 27: 57, 28: [1, 45], 29: 58, 30: [1, 42], 31: [1, 43], 32: [1, 44], 33: 40, 34: 46, 35: [1, 47], 38: 26},
            {18: [2, 26]},
            {18: [2, 30], 28: [2, 30], 30: [2, 30], 31: [2, 30], 32: [2, 30], 35: [2, 30]},
            {18: [2, 36], 34: 59, 35: [1, 60]},
            {18: [2, 31], 28: [2, 31], 30: [2, 31], 31: [2, 31], 32: [2, 31], 35: [2, 31]},
            {18: [2, 32], 28: [2, 32], 30: [2, 32], 31: [2, 32], 32: [2, 32], 35: [2, 32]},
            {18: [2, 33], 28: [2, 33], 30: [2, 33], 31: [2, 33], 32: [2, 33], 35: [2, 33]},
            {18: [2, 34], 28: [2, 34], 30: [2, 34], 31: [2, 34], 32: [2, 34], 35: [2, 34]},
            {18: [2, 35], 28: [2, 35], 30: [2, 35], 31: [2, 35], 32: [2, 35], 35: [2, 35]},
            {18: [2, 38], 35: [2, 38]},
            {18: [2, 47], 28: [2, 47], 30: [2, 47], 31: [2, 47], 32: [2, 47], 35: [2, 47], 36: [1, 61], 39: [2, 47]},
            {35: [1, 62]},
            {5: [2, 10], 14: [2, 10], 15: [2, 10], 16: [2, 10], 19: [2, 10], 20: [2, 10], 22: [2, 10], 23: [2, 10], 24: [2, 10]},
            {21: 63, 35: [1, 27], 38: 26},
            {5: [2, 11], 14: [2, 11], 15: [2, 11], 16: [2, 11], 19: [2, 11], 20: [2, 11], 22: [2, 11], 23: [2, 11], 24: [2, 11]},
            {14: [2, 16], 15: [2, 16], 16: [2, 16], 19: [2, 16], 20: [2, 16], 22: [2, 16], 23: [2, 16], 24: [2, 16]},
            {5: [2, 19], 14: [2, 19], 15: [2, 19], 16: [2, 19], 19: [2, 19], 20: [2, 19], 22: [2, 19], 23: [2, 19], 24: [2, 19]},
            {5: [2, 20], 14: [2, 20], 15: [2, 20], 16: [2, 20], 19: [2, 20], 20: [2, 20], 22: [2, 20], 23: [2, 20], 24: [2, 20]},
            {5: [2, 21], 14: [2, 21], 15: [2, 21], 16: [2, 21], 19: [2, 21], 20: [2, 21], 22: [2, 21], 23: [2, 21], 24: [2, 21]},
            {18: [1, 64]},
            {18: [2, 24]},
            {18: [2, 29], 28: [2, 29], 30: [2, 29], 31: [2, 29], 32: [2, 29], 35: [2, 29]},
            {18: [2, 37], 35: [2, 37]},
            {36: [1, 61]},
            {21: 65, 28: [1, 69], 30: [1, 66], 31: [1, 67], 32: [1, 68], 35: [1, 27], 38: 26},
            {18: [2, 46], 28: [2, 46], 30: [2, 46], 31: [2, 46], 32: [2, 46], 35: [2, 46], 39: [2, 46]},
            {18: [1, 70]},
            {5: [2, 22], 14: [2, 22], 15: [2, 22], 16: [2, 22], 19: [2, 22], 20: [2, 22], 22: [2, 22], 23: [2, 22], 24: [2, 22]},
            {18: [2, 39], 35: [2, 39]},
            {18: [2, 40], 35: [2, 40]},
            {18: [2, 41], 35: [2, 41]},
            {18: [2, 42], 35: [2, 42]},
            {18: [2, 43], 35: [2, 43]},
            {5: [2, 18], 14: [2, 18], 15: [2, 18], 16: [2, 18], 19: [2, 18], 20: [2, 18], 22: [2, 18], 23: [2, 18], 24: [2, 18]}
        ], defaultActions: {17: [2, 1], 25: [2, 28], 38: [2, 26], 57: [2, 24]}, parseError: function (t, n) {
            throw new Error(t)
        }, parse: function (t) {
            function v(e) {
                r.length = r.length - 2 * e, i.length = i.length - e, s.length = s.length - e
            }

            function m() {
                var e;
                return e = n.lexer.lex() || 1, typeof e != "number" && (e = n.symbols_[e] || e), e
            }

            var n = this, r = [0], i = [null], s = [], o = this.table, u = "", a = 0, f = 0, l = 0, c = 2, h = 1;
            this.lexer.setInput(t), this.lexer.yy = this.yy, this.yy.lexer = this.lexer, this.yy.parser = this, typeof this.lexer.yylloc == "undefined" && (this.lexer.yylloc = {});
            var p = this.lexer.yylloc;
            s.push(p);
            var d = this.lexer.options && this.lexer.options.ranges;
            typeof this.yy.parseError == "function" && (this.parseError = this.yy.parseError);
            var g, y, b, w, E, S, x = {}, T, N, C, k;
            for (; ;) {
                b = r[r.length - 1];
                if (this.defaultActions[b])w = this.defaultActions[b]; else {
                    if (g === null || typeof g == "undefined")g = m();
                    w = o[b] && o[b][g]
                }
                if (typeof w == "undefined" || !w.length || !w[0]) {
                    var L = "";
                    if (!l) {
                        k = [];
                        for (T in o[b])this.terminals_[T] && T > 2 && k.push("'" + this.terminals_[T] + "'");
                        this.lexer.showPosition ? L = "Parse error on line " + (a + 1) + ":\n" + this.lexer.showPosition() + "\nExpecting " + k.join(", ") + ", got '" + (this.terminals_[g] || g) + "'" : L = "Parse error on line " + (a + 1) + ": Unexpected " + (g == 1 ? "end of input" : "'" + (this.terminals_[g] || g) + "'"), this.parseError(L, {text: this.lexer.match, token: this.terminals_[g] || g, line: this.lexer.yylineno, loc: p, expected: k})
                    }
                }
                if (w[0]instanceof Array && w.length > 1)throw new Error("Parse Error: multiple actions possible at state: " + b + ", token: " + g);
                switch (w[0]) {
                    case 1:
                        r.push(g), i.push(this.lexer.yytext), s.push(this.lexer.yylloc), r.push(w[1]), g = null, y ? (g = y, y = null) : (f = this.lexer.yyleng, u = this.lexer.yytext, a = this.lexer.yylineno, p = this.lexer.yylloc, l > 0 && l--);
                        break;
                    case 2:
                        N = this.productions_[w[1]][1], x.$ = i[i.length - N], x._$ = {first_line: s[s.length - (N || 1)].first_line, last_line: s[s.length - 1].last_line, first_column: s[s.length - (N || 1)].first_column, last_column: s[s.length - 1].last_column}, d && (x._$.range = [s[s.length - (N || 1)].range[0], s[s.length - 1].range[1]]), S = this.performAction.call(x, u, f, a, this.yy, w[1], i, s);
                        if (typeof S != "undefined")return S;
                        N && (r = r.slice(0, -1 * N * 2), i = i.slice(0, -1 * N), s = s.slice(0, -1 * N)), r.push(this.productions_[w[1]][0]), i.push(x.$), s.push(x._$), C = o[r[r.length - 2]][r[r.length - 1]], r.push(C);
                        break;
                    case 3:
                        return!0
                }
            }
            return!0
        }}, t = function () {
            var e = {EOF: 1, parseError: function (t, n) {
                if (!this.yy.parser)throw new Error(t);
                this.yy.parser.parseError(t, n)
            }, setInput: function (e) {
                return this._input = e, this._more = this._less = this.done = !1, this.yylineno = this.yyleng = 0, this.yytext = this.matched = this.match = "", this.conditionStack = ["INITIAL"], this.yylloc = {first_line: 1, first_column: 0, last_line: 1, last_column: 0}, this.options.ranges && (this.yylloc.range = [0, 0]), this.offset = 0, this
            }, input: function () {
                var e = this._input[0];
                this.yytext += e, this.yyleng++, this.offset++, this.match += e, this.matched += e;
                var t = e.match(/(?:\r\n?|\n).*/g);
                return t ? (this.yylineno++, this.yylloc.last_line++) : this.yylloc.last_column++, this.options.ranges && this.yylloc.range[1]++, this._input = this._input.slice(1), e
            }, unput: function (e) {
                var t = e.length, n = e.split(/(?:\r\n?|\n)/g);
                this._input = e + this._input, this.yytext = this.yytext.substr(0, this.yytext.length - t - 1), this.offset -= t;
                var r = this.match.split(/(?:\r\n?|\n)/g);
                this.match = this.match.substr(0, this.match.length - 1), this.matched = this.matched.substr(0, this.matched.length - 1), n.length - 1 && (this.yylineno -= n.length - 1);
                var i = this.yylloc.range;
                return this.yylloc = {first_line: this.yylloc.first_line, last_line: this.yylineno + 1, first_column: this.yylloc.first_column, last_column: n ? (n.length === r.length ? this.yylloc.first_column : 0) + r[r.length - n.length].length - n[0].length : this.yylloc.first_column - t}, this.options.ranges && (this.yylloc.range = [i[0], i[0] + this.yyleng - t]), this
            }, more: function () {
                return this._more = !0, this
            }, less: function (e) {
                this.unput(this.match.slice(e))
            }, pastInput: function () {
                var e = this.matched.substr(0, this.matched.length - this.match.length);
                return(e.length > 20 ? "..." : "") + e.substr(-20).replace(/\n/g, "")
            }, upcomingInput: function () {
                var e = this.match;
                return e.length < 20 && (e += this._input.substr(0, 20 - e.length)), (e.substr(0, 20) + (e.length > 20 ? "..." : "")).replace(/\n/g, "")
            }, showPosition: function () {
                var e = this.pastInput(), t = (new Array(e.length + 1)).join("-");
                return e + this.upcomingInput() + "\n" + t + "^"
            }, next: function () {
                if (this.done)return this.EOF;
                this._input || (this.done = !0);
                var e, t, n, r, i, s;
                this._more || (this.yytext = "", this.match = "");
                var o = this._currentRules();
                for (var u = 0; u < o.length; u++) {
                    n = this._input.match(this.rules[o[u]]);
                    if (n && (!t || n[0].length > t[0].length)) {
                        t = n, r = u;
                        if (!this.options.flex)break
                    }
                }
                if (t) {
                    s = t[0].match(/(?:\r\n?|\n).*/g), s && (this.yylineno += s.length), this.yylloc = {first_line: this.yylloc.last_line, last_line: this.yylineno + 1, first_column: this.yylloc.last_column, last_column: s ? s[s.length - 1].length - s[s.length - 1].match(/\r?\n?/)[0].length : this.yylloc.last_column + t[0].length}, this.yytext += t[0], this.match += t[0], this.matches = t, this.yyleng = this.yytext.length, this.options.ranges && (this.yylloc.range = [this.offset, this.offset += this.yyleng]), this._more = !1, this._input = this._input.slice(t[0].length), this.matched += t[0], e = this.performAction.call(this, this.yy, this, o[r], this.conditionStack[this.conditionStack.length - 1]), this.done && this._input && (this.done = !1);
                    if (e)return e;
                    return
                }
                return this._input === "" ? this.EOF : this.parseError("Lexical error on line " + (this.yylineno + 1) + ". Unrecognized text.\n" + this.showPosition(), {text: "", token: null, line: this.yylineno})
            }, lex: function () {
                var t = this.next();
                return typeof t != "undefined" ? t : this.lex()
            }, begin: function (t) {
                this.conditionStack.push(t)
            }, popState: function () {
                return this.conditionStack.pop()
            }, _currentRules: function () {
                return this.conditions[this.conditionStack[this.conditionStack.length - 1]].rules
            }, topState: function () {
                return this.conditionStack[this.conditionStack.length - 2]
            }, pushState: function (t) {
                this.begin(t)
            }};
            return e.options = {}, e.performAction = function (t, n, r, i) {
                var s = i;
                switch (r) {
                    case 0:
                        n.yytext.slice(-1) !== "\\" && this.begin("mu"), n.yytext.slice(-1) === "\\" && (n.yytext = n.yytext.substr(0, n.yyleng - 1), this.begin("emu"));
                        if (n.yytext)return 14;
                        break;
                    case 1:
                        return 14;
                    case 2:
                        return n.yytext.slice(-1) !== "\\" && this.popState(), n.yytext.slice(-1) === "\\" && (n.yytext = n.yytext.substr(0, n.yyleng - 1)), 14;
                    case 3:
                        return n.yytext = n.yytext.substr(0, n.yyleng - 4), this.popState(), 15;
                    case 4:
                        return this.begin("par"), 24;
                    case 5:
                        return 16;
                    case 6:
                        return 20;
                    case 7:
                        return 19;
                    case 8:
                        return 19;
                    case 9:
                        return 23;
                    case 10:
                        return 23;
                    case 11:
                        this.popState(), this.begin("com");
                        break;
                    case 12:
                        return n.yytext = n.yytext.substr(3, n.yyleng - 5), this.popState(), 15;
                    case 13:
                        return 22;
                    case 14:
                        return 36;
                    case 15:
                        return 35;
                    case 16:
                        return 35;
                    case 17:
                        return 39;
                    case 18:
                        break;
                    case 19:
                        return this.popState(), 18;
                    case 20:
                        return this.popState(), 18;
                    case 21:
                        return n.yytext = n.yytext.substr(1, n.yyleng - 2).replace(/\\"/g, '"'), 30;
                    case 22:
                        return n.yytext = n.yytext.substr(1, n.yyleng - 2).replace(/\\'/g, "'"), 30;
                    case 23:
                        return n.yytext = n.yytext.substr(1), 28;
                    case 24:
                        return 32;
                    case 25:
                        return 32;
                    case 26:
                        return 31;
                    case 27:
                        return 35;
                    case 28:
                        return n.yytext = n.yytext.substr(1, n.yyleng - 2), 35;
                    case 29:
                        return"INVALID";
                    case 30:
                        break;
                    case 31:
                        return this.popState(), 37;
                    case 32:
                        return 5
                }
            }, e.rules = [/^(?:[^\x00]*?(?=(\{\{)))/, /^(?:[^\x00]+)/, /^(?:[^\x00]{2,}?(?=(\{\{|$)))/, /^(?:[\s\S]*?--\}\})/, /^(?:\{\{>)/, /^(?:\{\{#)/, /^(?:\{\{\/)/, /^(?:\{\{\^)/, /^(?:\{\{\s*else\b)/, /^(?:\{\{\{)/, /^(?:\{\{&)/, /^(?:\{\{!--)/, /^(?:\{\{![\s\S]*?\}\})/, /^(?:\{\{)/, /^(?:=)/, /^(?:\.(?=[} ]))/, /^(?:\.\.)/, /^(?:[\/.])/, /^(?:\s+)/, /^(?:\}\}\})/, /^(?:\}\})/, /^(?:"(\\["]|[^"])*")/, /^(?:'(\\[']|[^'])*')/, /^(?:@[a-zA-Z]+)/, /^(?:true(?=[}\s]))/, /^(?:false(?=[}\s]))/, /^(?:-?[0-9]+(?=[}\s]))/, /^(?:[a-zA-Z0-9_$-]+(?=[=}\s\/.]))/, /^(?:\[[^\]]*\])/, /^(?:.)/, /^(?:\s+)/, /^(?:[a-zA-Z0-9_$-/]+)/, /^(?:$)/], e.conditions = {mu: {rules: [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 32], inclusive: !1}, emu: {rules: [2], inclusive: !1}, com: {rules: [3], inclusive: !1}, par: {rules: [30, 31], inclusive: !1}, INITIAL: {rules: [0, 1, 32], inclusive: !0}}, e
        }();
        return e.lexer = t, n.prototype = e, e.Parser = n, new n
    }();
    e.Parser = t, e.parse = function (t) {
        return t.constructor === e.AST.ProgramNode ? t : (e.Parser.yy = e.AST, e.Parser.parse(t))
    }, function () {
        e.AST = {}, e.AST.ProgramNode = function (t, n) {
            this.type = "program", this.statements = t, n && (this.inverse = new e.AST.ProgramNode(n))
        }, e.AST.MustacheNode = function (e, t, n) {
            this.type = "mustache", this.escaped = !n, this.hash = t;
            var r = this.id = e[0], i = this.params = e.slice(1), s = this.eligibleHelper = r.isSimple;
            this.isHelper = s && (i.length || t)
        }, e.AST.PartialNode = function (e, t) {
            this.type = "partial", this.partialName = e, this.context = t
        }, e.AST.BlockNode = function (t, n, r, i) {
            var s = function (t, n) {
                if (t.original !== n.original)throw new e.Exception(t.original + " doesn't match " + n.original)
            };
            s(t.id, i), this.type = "block", this.mustache = t, this.program = n, this.inverse = r, this.inverse && !this.program && (this.isInverse = !0)
        }, e.AST.ContentNode = function (e) {
            this.type = "content", this.string = e
        }, e.AST.HashNode = function (e) {
            this.type = "hash", this.pairs = e
        }, e.AST.IdNode = function (t) {
            this.type = "ID", this.original = t.join(".");
            var n = [], r = 0;
            for (var i = 0, s = t.length; i < s; i++) {
                var o = t[i];
                if (o === ".." || o === "." || o === "this") {
                    if (n.length > 0)throw new e.Exception("Invalid path: " + this.original);
                    o === ".." ? r++ : this.isScoped = !0
                } else n.push(o)
            }
            this.parts = n, this.string = n.join("."), this.depth = r, this.isSimple = t.length === 1 && !this.isScoped && r === 0, this.stringModeValue = this.string
        }, e.AST.PartialNameNode = function (e) {
            this.type = "PARTIAL_NAME", this.name = e
        }, e.AST.DataNode = function (e) {
            this.type = "DATA", this.id = e
        }, e.AST.StringNode = function (e) {
            this.type = "STRING", this.string = e, this.stringModeValue = e
        }, e.AST.IntegerNode = function (e) {
            this.type = "INTEGER", this.integer = e, this.stringModeValue = Number(e)
        }, e.AST.BooleanNode = function (e) {
            this.type = "BOOLEAN", this.bool = e, this.stringModeValue = e === "true"
        }, e.AST.CommentNode = function (e) {
            this.type = "comment", this.comment = e
        }
    }();
    var n = ["description", "fileName", "lineNumber", "message", "name", "number", "stack"];
    e.Exception = function (e) {
        var t = Error.prototype.constructor.apply(this, arguments);
        for (var r = 0; r < n.length; r++)this[n[r]] = t[n[r]]
    }, e.Exception.prototype = new Error, e.SafeString = function (e) {
        this.string = e
    }, e.SafeString.prototype.toString = function () {
        return this.string.toString()
    }, function () {
        var t = {"&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#x27;", "`": "&#x60;"}, n = /[&<>"'`]/g, r = /[&<>"'`]/, i = function (e) {
            return t[e] || "&amp;"
        };
        e.Utils = {escapeExpression: function (t) {
            return t instanceof e.SafeString ? t.toString() : t == null || t === !1 ? "" : r.test(t) ? t.replace(n, i) : t
        }, isEmpty: function (e) {
            return!e && e !== 0 ? !0 : Object.prototype.toString.call(e) === "[object Array]" && e.length === 0 ? !0 : !1
        }}
    }(), e.Compiler = function () {
    }, e.JavaScriptCompiler = function () {
    }, function (t, n) {
        t.prototype = {compiler: t, disassemble: function () {
            var e = this.opcodes, t, n = [], r, i;
            for (var s = 0, o = e.length; s < o; s++) {
                t = e[s];
                if (t.opcode === "DECLARE")n.push("DECLARE " + t.name + "=" + t.value); else {
                    r = [];
                    for (var u = 0; u < t.args.length; u++)i = t.args[u], typeof i == "string" && (i = '"' + i.replace("\n", "\\n") + '"'), r.push(i);
                    n.push(t.opcode + " " + r.join(" "))
                }
            }
            return n.join("\n")
        }, equals: function (e) {
            var t = this.opcodes.length;
            if (e.opcodes.length !== t)return!1;
            for (var n = 0; n < t; n++) {
                var r = this.opcodes[n], i = e.opcodes[n];
                if (r.opcode !== i.opcode || r.args.length !== i.args.length)return!1;
                for (var s = 0; s < r.args.length; s++)if (r.args[s] !== i.args[s])return!1
            }
            t = this.children.length;
            if (e.children.length !== t)return!1;
            for (n = 0; n < t; n++)if (!this.children[n].equals(e.children[n]))return!1;
            return!0
        }, guid: 0, compile: function (e, t) {
            this.children = [], this.depths = {list: []}, this.options = t;
            var n = this.options.knownHelpers;
            this.options.knownHelpers = {helperMissing: !0, blockHelperMissing: !0, each: !0, "if": !0, unless: !0, "with": !0, log: !0};
            if (n)for (var r in n)this.options.knownHelpers[r] = n[r];
            return this.program(e)
        }, accept: function (e) {
            return this[e.type](e)
        }, program: function (e) {
            var t = e.statements, n;
            this.opcodes = [];
            for (var r = 0, i = t.length; r < i; r++)n = t[r], this[n.type](n);
            return this.isSimple = i === 1, this.depths.list = this.depths.list.sort(function (e, t) {
                return e - t
            }), this
        }, compileProgram: function (e) {
            var t = (new this.compiler).compile(e, this.options), n = this.guid++, r;
            this.usePartial = this.usePartial || t.usePartial, this.children[n] = t;
            for (var i = 0, s = t.depths.list.length; i < s; i++) {
                r = t.depths.list[i];
                if (r < 2)continue;
                this.addDepth(r - 1)
            }
            return n
        }, block: function (e) {
            var t = e.mustache, n = e.program, r = e.inverse;
            n && (n = this.compileProgram(n)), r && (r = this.compileProgram(r));
            var i = this.classifyMustache(t);
            i === "helper" ? this.helperMustache(t, n, r) : i === "simple" ? (this.simpleMustache(t), this.opcode("pushProgram", n), this.opcode("pushProgram", r), this.opcode("emptyHash"), this.opcode("blockValue")) : (this.ambiguousMustache(t, n, r), this.opcode("pushProgram", n), this.opcode("pushProgram", r), this.opcode("emptyHash"), this.opcode("ambiguousBlockValue")), this.opcode("append")
        }, hash: function (e) {
            var t = e.pairs, n, r;
            this.opcode("pushHash");
            for (var i = 0, s = t.length; i < s; i++)n = t[i], r = n[1], this.options.stringParams ? this.opcode("pushStringParam", r.stringModeValue, r.type) : this.accept(r), this.opcode("assignToHash", n[0]);
            this.opcode("popHash")
        }, partial: function (e) {
            var t = e.partialName;
            this.usePartial = !0, e.context ? this.ID(e.context) : this.opcode("push", "depth0"), this.opcode("invokePartial", t.name), this.opcode("append")
        }, content: function (e) {
            this.opcode("appendContent", e.string)
        }, mustache: function (e) {
            var t = this.options, n = this.classifyMustache(e);
            n === "simple" ? this.simpleMustache(e) : n === "helper" ? this.helperMustache(e) : this.ambiguousMustache(e), e.escaped && !t.noEscape ? this.opcode("appendEscaped") : this.opcode("append")
        }, ambiguousMustache: function (e, t, n) {
            var r = e.id, i = r.parts[0], s = t != null || n != null;
            this.opcode("getContext", r.depth), this.opcode("pushProgram", t), this.opcode("pushProgram", n), this.opcode("invokeAmbiguous", i, s)
        }, simpleMustache: function (e) {
            var t = e.id;
            t.type === "DATA" ? this.DATA(t) : t.parts.length ? this.ID(t) : (this.addDepth(t.depth), this.opcode("getContext", t.depth), this.opcode("pushContext")), this.opcode("resolvePossibleLambda")
        }, helperMustache: function (e, t, n) {
            var r = this.setupFullMustacheParams(e, t, n), i = e.id.parts[0];
            if (this.options.knownHelpers[i])this.opcode("invokeKnownHelper", r.length, i); else {
                if (this.knownHelpersOnly)throw new Error("You specified knownHelpersOnly, but used the unknown helper " + i);
                this.opcode("invokeHelper", r.length, i)
            }
        }, ID: function (e) {
            this.addDepth(e.depth), this.opcode("getContext", e.depth);
            var t = e.parts[0];
            t ? this.opcode("lookupOnContext", e.parts[0]) : this.opcode("pushContext");
            for (var n = 1, r = e.parts.length; n < r; n++)this.opcode("lookup", e.parts[n])
        }, DATA: function (e) {
            this.options.data = !0, this.opcode("lookupData", e.id)
        }, STRING: function (e) {
            this.opcode("pushString", e.string)
        }, INTEGER: function (e) {
            this.opcode("pushLiteral", e.integer)
        }, BOOLEAN: function (e) {
            this.opcode("pushLiteral", e.bool)
        }, comment: function () {
        }, opcode: function (e) {
            this.opcodes.push({opcode: e, args: [].slice.call(arguments, 1)})
        }, declare: function (e, t) {
            this.opcodes.push({opcode: "DECLARE", name: e, value: t})
        }, addDepth: function (e) {
            if (isNaN(e))throw new Error("EWOT");
            if (e === 0)return;
            this.depths[e] || (this.depths[e] = !0, this.depths.list.push(e))
        }, classifyMustache: function (e) {
            var t = e.isHelper, n = e.eligibleHelper, r = this.options;
            if (n && !t) {
                var i = e.id.parts[0];
                r.knownHelpers[i] ? t = !0 : r.knownHelpersOnly && (n = !1)
            }
            return t ? "helper" : n ? "ambiguous" : "simple"
        }, pushParams: function (e) {
            var t = e.length, n;
            while (t--)n = e[t], this.options.stringParams ? (n.depth && this.addDepth(n.depth), this.opcode("getContext", n.depth || 0), this.opcode("pushStringParam", n.stringModeValue, n.type)) : this[n.type](n)
        }, setupMustacheParams: function (e) {
            var t = e.params;
            return this.pushParams(t), e.hash ? this.hash(e.hash) : this.opcode("emptyHash"), t
        }, setupFullMustacheParams: function (e, t, n) {
            var r = e.params;
            return this.pushParams(r), this.opcode("pushProgram", t), this.opcode("pushProgram", n), e.hash ? this.hash(e.hash) : this.opcode("emptyHash"), r
        }};
        var r = function (e) {
            this.value = e
        };
        n.prototype = {nameLookup: function (e, t) {
            return/^[0-9]+$/.test(t) ? e + "[" + t + "]" : n.isValidJavaScriptVariableName(t) ? e + "." + t : e + "['" + t + "']"
        }, appendToBuffer: function (e) {
            return this.environment.isSimple ? "return " + e + ";" : {appendToBuffer: !0, content: e, toString: function () {
                return"buffer += " + e + ";"
            }}
        }, initializeBuffer: function () {
            return this.quotedString("")
        }, namespace: "Handlebars", compile: function (t, n, r, i) {
            this.environment = t, this.options = n || {}, e.log(e.logger.DEBUG, this.environment.disassemble() + "\n\n"), this.name = this.environment.name, this.isChild = !!r, this.context = r || {programs: [], environments: [], aliases: {}}, this.preamble(), this.stackSlot = 0, this.stackVars = [], this.registers = {list: []}, this.compileStack = [], this.inlineStack = [], this.compileChildren(t, n);
            var s = t.opcodes, o;
            this.i = 0;
            for (u = s.length; this.i < u; this.i++)o = s[this.i], o.opcode === "DECLARE" ? this[o.name] = o.value : this[o.opcode].apply(this, o.args);
            return this.createFunctionContext(i)
        }, nextOpcode: function () {
            var e = this.environment.opcodes;
            return e[this.i + 1]
        }, eat: function () {
            this.i = this.i + 1
        }, preamble: function () {
            var e = [];
            if (!this.isChild) {
                var t = this.namespace, n = "helpers = helpers || " + t + ".helpers;";
                this.environment.usePartial && (n = n + " partials = partials || " + t + ".partials;"), this.options.data && (n += " data = data || {};"), e.push(n)
            } else e.push("");
            this.environment.isSimple ? e.push("") : e.push(", buffer = " + this.initializeBuffer()), this.lastContext = 0, this.source = e
        }, createFunctionContext: function (t) {
            var n = this.stackVars.concat(this.registers.list);
            n.length > 0 && (this.source[1] = this.source[1] + ", " + n.join(", "));
            if (!this.isChild)for (var r in this.context.aliases)this.source[1] = this.source[1] + ", " + r + "=" + this.context.aliases[r];
            this.source[1] && (this.source[1] = "var " + this.source[1].substring(2) + ";"), this.isChild || (this.source[1] += "\n" + this.context.programs.join("\n") + "\n"), this.environment.isSimple || this.source.push("return buffer;");
            var i = this.isChild ? ["depth0", "data"] : ["Handlebars", "depth0", "helpers", "partials", "data"];
            for (var s = 0, o = this.environment.depths.list.length; s < o; s++)i.push("depth" + this.environment.depths.list[s]);
            var u = this.mergeSource();
            if (!this.isChild) {
                var a = e.COMPILER_REVISION, f = e.REVISION_CHANGES[a];
                u = "this.compilerInfo = [" + a + ",'" + f + "'];\n" + u
            }
            if (t)return i.push(u), Function.apply(this, i);
            var l = "function " + (this.name || "") + "(" + i.join(",") + ") {\n  " + u + "}";
            return e.log(e.logger.DEBUG, l + "\n\n"), l
        }, mergeSource: function () {
            var e = "", t;
            for (var n = 0, r = this.source.length; n < r; n++) {
                var i = this.source[n];
                i.appendToBuffer ? t ? t = t + "\n    + " + i.content : t = i.content : (t && (e += "buffer += " + t + ";\n  ", t = undefined), e += i + "\n  ")
            }
            return e
        }, blockValue: function () {
            this.context.aliases.blockHelperMissing = "helpers.blockHelperMissing";
            var e = ["depth0"];
            this.setupParams(0, e), this.replaceStack(function (t) {
                return e.splice(1, 0, t), "blockHelperMissing.call(" + e.join(", ") + ")"
            })
        }, ambiguousBlockValue: function () {
            this.context.aliases.blockHelperMissing = "helpers.blockHelperMissing";
            var e = ["depth0"];
            this.setupParams(0, e);
            var t = this.topStack();
            e.splice(1, 0, t), e[e.length - 1] = "options", this.source.push("if (!" + this.lastHelper + ") { " + t + " = blockHelperMissing.call(" + e.join(", ") + "); }")
        }, appendContent: function (e) {
            this.source.push(this.appendToBuffer(this.quotedString(e)))
        }, append: function () {
            this.flushInline();
            var e = this.popStack();
            this.source.push("if(" + e + " || " + e + " === 0) { " + this.appendToBuffer(e) + " }"), this.environment.isSimple && this.source.push("else { " + this.appendToBuffer("''") + " }")
        }, appendEscaped: function () {
            this.context.aliases.escapeExpression = "this.escapeExpression", this.source.push(this.appendToBuffer("escapeExpression(" + this.popStack() + ")"))
        }, getContext: function (e) {
            this.lastContext !== e && (this.lastContext = e)
        }, lookupOnContext: function (e) {
            this.push(this.nameLookup("depth" + this.lastContext, e, "context"))
        }, pushContext: function () {
            this.pushStackLiteral("depth" + this.lastContext)
        }, resolvePossibleLambda: function () {
            this.context.aliases.functionType = '"function"', this.replaceStack(function (e) {
                return"typeof " + e + " === functionType ? " + e + ".apply(depth0) : " + e
            })
        }, lookup: function (e) {
            this.replaceStack(function (t) {
                return t + " == null || " + t + " === false ? " + t + " : " + this.nameLookup(t, e, "context")
            })
        }, lookupData: function (e) {
            this.push(this.nameLookup("data", e, "data"))
        }, pushStringParam: function (e, t) {
            this.pushStackLiteral("depth" + this.lastContext), this.pushString(t), typeof e == "string" ? this.pushString(e) : this.pushStackLiteral(e)
        }, emptyHash: function () {
            this.pushStackLiteral("{}"), this.options.stringParams && this.register("hashTypes", "{}")
        }, pushHash: function () {
            this.hash = {values: [], types: []}
        }, popHash: function () {
            var e = this.hash;
            this.hash = undefined, this.options.stringParams && this.register("hashTypes", "{" + e.types.join(",") + "}"), this.push("{\n    " + e.values.join(",\n    ") + "\n  }")
        }, pushString: function (e) {
            this.pushStackLiteral(this.quotedString(e))
        }, push: function (e) {
            return this.inlineStack.push(e), e
        }, pushLiteral: function (e) {
            this.pushStackLiteral(e)
        }, pushProgram: function (e) {
            e != null ? this.pushStackLiteral(this.programExpression(e)) : this.pushStackLiteral(null)
        }, invokeHelper: function (e, t) {
            this.context.aliases.helperMissing = "helpers.helperMissing";
            var n = this.lastHelper = this.setupHelper(e, t, !0);
            this.push(n.name), this.replaceStack(function (e) {
                return e + " ? " + e + ".call(" + n.callParams + ") " + ": helperMissing.call(" + n.helperMissingParams + ")"
            })
        }, invokeKnownHelper: function (e, t) {
            var n = this.setupHelper(e, t);
            this.push(n.name + ".call(" + n.callParams + ")")
        }, invokeAmbiguous: function (e, t) {
            this.context.aliases.functionType = '"function"', this.pushStackLiteral("{}");
            var n = this.setupHelper(0, e, t), r = this.lastHelper = this.nameLookup("helpers", e, "helper"), i = this.nameLookup("depth" + this.lastContext, e, "context"), s = this.nextStack();
            this.source.push("if (" + s + " = " + r + ") { " + s + " = " + s + ".call(" + n.callParams + "); }"), this.source.push("else { " + s + " = " + i + "; " + s + " = typeof " + s + " === functionType ? " + s + ".apply(depth0) : " + s + "; }")
        }, invokePartial: function (e) {
            var t = [this.nameLookup("partials", e, "partial"), "'" + e + "'", this.popStack(), "helpers", "partials"];
            this.options.data && t.push("data"), this.context.aliases.self = "this", this.push("self.invokePartial(" + t.join(", ") + ")")
        }, assignToHash: function (e) {
            var t = this.popStack(), n;
            this.options.stringParams && (n = this.popStack(), this.popStack());
            var r = this.hash;
            n && r.types.push("'" + e + "': " + n), r.values.push("'" + e + "': (" + t + ")")
        }, compiler: n, compileChildren: function (e, t) {
            var n = e.children, r, i;
            for (var s = 0, o = n.length; s < o; s++) {
                r = n[s], i = new this.compiler;
                var u = this.matchExistingProgram(r);
                u == null ? (this.context.programs.push(""), u = this.context.programs.length, r.index = u, r.name = "program" + u, this.context.programs[u] = i.compile(r, t, this.context), this.context.environments[u] = r) : (r.index = u, r.name = "program" + u)
            }
        }, matchExistingProgram: function (e) {
            for (var t = 0, n = this.context.environments.length; t < n; t++) {
                var r = this.context.environments[t];
                if (r && r.equals(e))return t
            }
        }, programExpression: function (e) {
            this.context.aliases.self = "this";
            if (e == null)return"self.noop";
            var t = this.environment.children[e], n = t.depths.list, r, i = [t.index, t.name, "data"];
            for (var s = 0, o = n.length; s < o; s++)r = n[s], r === 1 ? i.push("depth0") : i.push("depth" + (r - 1));
            return n.length === 0 ? "self.program(" + i.join(", ") + ")" : (i.shift(), "self.programWithDepth(" + i.join(", ") + ")")
        }, register: function (e, t) {
            this.useRegister(e), this.source.push(e + " = " + t + ";")
        }, useRegister: function (e) {
            this.registers[e] || (this.registers[e] = !0, this.registers.list.push(e))
        }, pushStackLiteral: function (e) {
            return this.push(new r(e))
        }, pushStack: function (e) {
            this.flushInline();
            var t = this.incrStack();
            return e && this.source.push(t + " = " + e + ";"), this.compileStack.push(t), t
        }, replaceStack: function (e) {
            var t = "", n = this.isInline(), i;
            if (n) {
                var s = this.popStack(!0);
                if (s instanceof r)i = s.value; else {
                    var o = this.stackSlot ? this.topStackName() : this.incrStack();
                    t = "(" + this.push(o) + " = " + s + "),", i = this.topStack()
                }
            } else i = this.topStack();
            var u = e.call(this, i);
            return n ? ((this.inlineStack.length || this.compileStack.length) && this.popStack(), this.push("(" + t + u + ")")) : (/^stack/.test(i) || (i = this.nextStack()), this.source.push(i + " = (" + t + u + ");")), i
        }, nextStack: function () {
            return this.pushStack()
        }, incrStack: function () {
            return this.stackSlot++, this.stackSlot > this.stackVars.length && this.stackVars.push("stack" + this.stackSlot), this.topStackName()
        }, topStackName: function () {
            return"stack" + this.stackSlot
        }, flushInline: function () {
            var e = this.inlineStack;
            if (e.length) {
                this.inlineStack = [];
                for (var t = 0, n = e.length; t < n; t++) {
                    var i = e[t];
                    i instanceof r ? this.compileStack.push(i) : this.pushStack(i)
                }
            }
        }, isInline: function () {
            return this.inlineStack.length
        }, popStack: function (e) {
            var t = this.isInline(), n = (t ? this.inlineStack : this.compileStack).pop();
            return!e && n instanceof r ? n.value : (t || this.stackSlot--, n)
        }, topStack: function (e) {
            var t = this.isInline() ? this.inlineStack : this.compileStack, n = t[t.length - 1];
            return!e && n instanceof r ? n.value : n
        }, quotedString: function (e) {
            return'"' + e.replace(/\\/g, "\\\\").replace(/"/g, '\\"').replace(/\n/g, "\\n").replace(/\r/g, "\\r") + '"'
        }, setupHelper: function (e, t, n) {
            var r = [];
            this.setupParams(e, r, n);
            var i = this.nameLookup("helpers", t, "helper");
            return{params: r, name: i, callParams: ["depth0"].concat(r).join(", "), helperMissingParams: n && ["depth0", this.quotedString(t)].concat(r).join(", ")}
        }, setupParams: function (e, t, n) {
            var r = [], i = [], s = [], o, u, a;
            r.push("hash:" + this.popStack()), u = this.popStack(), a = this.popStack();
            if (a || u)a || (this.context.aliases.self = "this", a = "self.noop"), u || (this.context.aliases.self = "this", u = "self.noop"), r.push("inverse:" + u), r.push("fn:" + a);
            for (var f = 0; f < e; f++)o = this.popStack(), t.push(o), this.options.stringParams && (s.push(this.popStack()), i.push(this.popStack()));
            return this.options.stringParams && (r.push("contexts:[" + i.join(",") + "]"), r.push("types:[" + s.join(",") + "]"), r.push("hashTypes:hashTypes")), this.options.data && r.push("data:data"), r = "{" + r.join(",") + "}", n ? (this.register("options", r), t.push("options")) : t.push(r), t.join(", ")
        }};
        var i = "break else new var case finally return void catch for switch while continue function this with default if throw delete in try do instanceof typeof abstract enum int short boolean export interface static byte extends long super char final native synchronized class float package throws const goto private transient debugger implements protected volatile double import public let yield".split(" "), s = n.RESERVED_WORDS = {};
        for (var o = 0, u = i.length; o < u; o++)s[i[o]] = !0;
        n.isValidJavaScriptVariableName = function (e) {
            return!n.RESERVED_WORDS[e] && /^[a-zA-Z_$][0-9a-zA-Z_$]+$/.test(e) ? !0 : !1
        }, e.precompile = function (r, i) {
            if (!r || typeof r != "string" && r.constructor !== e.AST.ProgramNode)throw new e.Exception("You must pass a string or Handlebars AST to Handlebars.precompile. You passed " + r);
            i = i || {}, "data"in i || (i.data = !0);
            var s = e.parse(r), o = (new t).compile(s, i);
            return(new n).compile(o, i)
        }, e.compile = function (r, i) {
            function o() {
                var s = e.parse(r), o = (new t).compile(s, i), u = (new n).compile(o, i, undefined, !0);
                return e.template(u)
            }

            if (!r || typeof r != "string" && r.constructor !== e.AST.ProgramNode)throw new e.Exception("You must pass a string or Handlebars AST to Handlebars.compile. You passed " + r);
            i = i || {}, "data"in i || (i.data = !0);
            var s;
            return function (e, t) {
                return s || (s = o()), s.call(this, e, t)
            }
        }, e.VM = {template: function (t) {
            var n = {escapeExpression: e.Utils.escapeExpression, invokePartial: e.VM.invokePartial, programs: [], program: function (t, n, r) {
                var i = this.programs[t];
                return r ? e.VM.program(n, r) : i ? i : (i = this.programs[t] = e.VM.program(n), i)
            }, programWithDepth: e.VM.programWithDepth, noop: e.VM.noop, compilerInfo: null};
            return function (r, i) {
                i = i || {};
                var s = t.call(n, e, r, i.helpers, i.partials, i.data), o = n.compilerInfo || [], u = o[0] || 1, a = e.COMPILER_REVISION;
                if (u !== a) {
                    if (u < a) {
                        var f = e.REVISION_CHANGES[a], l = e.REVISION_CHANGES[u];
                        throw"Template was precompiled with an older version of Handlebars than the current runtime. Please update your precompiler to a newer version (" + f + ") or downgrade your runtime to an older version (" + l + ")."
                    }
                    throw"Template was precompiled with a newer version of Handlebars than the current runtime. Please update your runtime to a newer version (" + o[1] + ")."
                }
                return s
            }
        }, programWithDepth: function (e, t, n) {
            var r = Array.prototype.slice.call(arguments, 2);
            return function (n, i) {
                return i = i || {}, e.apply(this, [n, i.data || t].concat(r))
            }
        }, program: function (e, t) {
            return function (n, r) {
                return r = r || {}, e(n, r.data || t)
            }
        }, noop: function () {
            return""
        }, invokePartial: function (t, n, r, i, s, o) {
            var u = {helpers: i, partials: s, data: o};
            if (t === undefined)throw new e.Exception("The partial " + n + " could not be found");
            if (t instanceof Function)return t(r, u);
            if (!e.compile)throw new e.Exception("The partial " + n + " could not be compiled when running in runtime-only mode");
            return s[n] = e.compile(t, {data: o !== undefined}), s[n](r, u)
        }}, e.template = e.VM.template
    }(e.Compiler, e.JavaScriptCompiler), define("handlebars", [], function () {
        return e
    })
}(), define("i18nprecompile", ["handlebars", "underscore"], function (e, t) {
    function n(r, i, s) {
        return s = s || {}, i = i || {}, r && r.type === "program" && r.statements && (t(r.statements).forEach(function (t, o) {
            var u = "<!-- i18n error -->";
            if (t.type === "mustache" && t.id && t.id.original === "$") {
                if (t.params.length && t.params[0].string) {
                    var a = t.params[0].string;
                    u = i[a] || (s.originalKeyFallback ? a : u)
                }
                r.statements[o] = new e.AST.ContentNode(u)
            } else t.program && (t.program = n(t.program, i, s))
        }), r.inverse && n(r.inverse, i, s)), r
    }

    return function (t, r, i) {
        i = i || {};
        var s, o;
        return s = e.parse(t), r !== !1 && (s = n(s, r, i)), o = (new e.Compiler).compile(s, i), (new e.JavaScriptCompiler).compile(o, i)
    }
}), function (window) {
    var JSON = window.JSON || {};
    (function () {
        function f(e) {
            return e < 10 ? "0" + e : e
        }

        function quote(e) {
            return escapable.lastIndex = 0, escapable.test(e) ? '"' + e.replace(escapable, function (e) {
                var t = meta[e];
                return typeof t == "string" ? t : "\\u" + ("0000" + e.charCodeAt(0).toString(16)).slice(-4)
            }) + '"' : '"' + e + '"'
        }

        function str(e, t) {
            var n, r, i, s, o = gap, u, a = t[e];
            a && typeof a == "object" && typeof a.toJSON == "function" && (a = a.toJSON(e)), typeof rep == "function" && (a = rep.call(t, e, a));
            switch (typeof a) {
                case"string":
                    return quote(a);
                case"number":
                    return isFinite(a) ? String(a) : "null";
                case"boolean":
                case"null":
                    return String(a);
                case"object":
                    if (!a)return"null";
                    gap += indent, u = [];
                    if (Object.prototype.toString.apply(a) === "[object Array]") {
                        s = a.length;
                        for (n = 0; n < s; n += 1)u[n] = str(n, a) || "null";
                        return i = u.length === 0 ? "[]" : gap ? "[\n" + gap + u.join(",\n" + gap) + "\n" + o + "]" : "[" + u.join(",") + "]", gap = o, i
                    }
                    if (rep && typeof rep == "object") {
                        s = rep.length;
                        for (n = 0; n < s; n += 1)typeof rep[n] == "string" && (r = rep[n], i = str(r, a), i && u.push(quote(r) + (gap ? ": " : ":") + i))
                    } else for (r in a)Object.prototype.hasOwnProperty.call(a, r) && (i = str(r, a), i && u.push(quote(r) + (gap ? ": " : ":") + i));
                    return i = u.length === 0 ? "{}" : gap ? "{\n" + gap + u.join(",\n" + gap) + "\n" + o + "}" : "{" + u.join(",") + "}", gap = o, i
            }
        }

        typeof Date.prototype.toJSON != "function" && (Date.prototype.toJSON = function (e) {
            return isFinite(this.valueOf()) ? this.getUTCFullYear() + "-" + f(this.getUTCMonth() + 1) + "-" + f(this.getUTCDate()) + "T" + f(this.getUTCHours()) + ":" + f(this.getUTCMinutes()) + ":" + f(this.getUTCSeconds()) + "Z" : null
        }, String.prototype.toJSON = Number.prototype.toJSON = Boolean.prototype.toJSON = function (e) {
            return this.valueOf()
        });
        var cx = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g, escapable = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g, gap, indent, meta = {"\b": "\\b", "	": "\\t", "\n": "\\n", "\f": "\\f", "\r": "\\r", '"': '\\"', "\\": "\\\\"}, rep;
        typeof JSON.stringify != "function" && (JSON.stringify = function (e, t, n) {
            var r;
            gap = "", indent = "";
            if (typeof n == "number")for (r = 0; r < n; r += 1)indent += " "; else typeof n == "string" && (indent = n);
            rep = t;
            if (!t || typeof t == "function" || typeof t == "object" && typeof t.length == "number")return str("", {"": e});
            throw new Error("JSON.stringify")
        }), typeof JSON.parse != "function" && (JSON.parse = function (text, reviver) {
            function walk(e, t) {
                var n, r, i = e[t];
                if (i && typeof i == "object")for (n in i)Object.prototype.hasOwnProperty.call(i, n) && (r = walk(i, n), r !== undefined ? i[n] = r : delete i[n]);
                return reviver.call(e, t, i)
            }

            var j;
            text = String(text), cx.lastIndex = 0, cx.test(text) && (text = text.replace(cx, function (e) {
                return"\\u" + ("0000" + e.charCodeAt(0).toString(16)).slice(-4)
            }));
            if (/^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, "@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, "]").replace(/(?:^|:|,)(?:\s*\[)+/g, "")))return j = eval("(" + text + ")"), typeof reviver == "function" ? walk({"": j}, "") : j;
            throw new SyntaxError("JSON.parse")
        })
    })(), define("json2", [], function () {
        return JSON
    })
}.call(this, this), define("hbs", ["handlebars", "underscore", "i18nprecompile", "json2"], function (e, t, n, r) {
    var i, s, o, u = ["Msxml2.XMLHTTP", "Microsoft.XMLHTTP", "Msxml2.XMLHTTP.4.0"], a = function () {
        throw new Error("Environment unsupported.")
    }, f = [], l = "w+", c = "hbs", h = "@hbs", p = "../", d = "/public/css/", v = "template/helpers/", m = "template/i18n/", g = "main-built.css";
    e.registerHelper("$", function () {
    }), typeof window != "undefined" && window.navigator && window.document && !window.navigator.userAgent.match(/Node.js/) ? (o = function () {
        var e, t, n;
        if (typeof XMLHttpRequest != "undefined")return new XMLHttpRequest;
        for (t = 0; t < 3; t++) {
            n = u[t];
            try {
                e = new ActiveXObject(n)
            } catch (r) {
            }
            if (e) {
                u = [n];
                break
            }
        }
        if (!e)throw new Error("getXhr(): XMLHttpRequest not available");
        return e
    }, a = function (e, t) {
        i = e, console.log(e);
        var n = o();
        n.open("GET", e, !0), n.onreadystatechange = function (e) {
            n.readyState === 4 && t(n.responseText)
        }, n.send(null)
    }) : typeof process != "undefined" && process.versions && !!process.versions.node ? (s = require.nodeRequire("fs"), a = function (e, t) {
        var n = s.readFileSync(e, "utf8") || "";
        n = n.replace(/^\uFEFF/, ""), t(n)
    }) : typeof java != "undefined" && typeof java.io != "undefined" && (a = function (e, t) {
        var n = new java.io.File(e), r = new java.io.FileReader(n), i = new java.io.BufferedReader(r), s, o = "";
        while ((s = i.readLine()) !== null)o += new String(s) + "\n";
        i.close(), t(o)
    });
    var y = {}, b = function (e, t) {
        y[e] ? t(y[e]) : a(e, function (n) {
            y[e] = n, t.call(this, n)
        })
    }, w = [], E = {};
    return{get: function () {
        return e
    }, write: function (e, t, n) {
        if (t + h in f) {
            var r = f[t + h];
            n.asModule(e + "!" + t, r)
        }
    }, version: "0.4.0", load: function (o, u, y, S) {
        function C(e, n) {
            return t(e).forEach(function (e) {
                e && e.type && e.type === "partial" && n.push(e.partialName.name), e && e.program && e.program.statements && C(e.program.statements, n), e && e.program && e.program.inverse && e.program.inverse.statements && C(e.program.inverse.statements, n)
            }), n
        }

        function k(e) {
            var n = [];
            return e && e.statements && (n = C(e.statements, [])), t(n).unique()
        }

        function L(e) {
            var t, n, i;
            if (e && e.statements) {
                t = e.statements[0];
                if (t && t.type === "comment")try {
                    return n = t.comment.replace(new RegExp("^[\\s]+|[\\s]+$", "g"), ""), i = r.parse(n), n
                } catch (s) {
                    return"{}"
                }
            }
            return"{}"
        }

        function A(e) {
            if (!e)return[];
            var t = [e[0]], n = e[0], r;
            for (r = 1; r < e.length; ++r)e.hasOwnProperty(r) && (n += "." + e[r], t.push(n));
            return t
        }

        function O(n, r, i, s) {
            i = i ? i + "." : "";
            var o = "", u = !1;
            return t(n).forEach(function (n) {
                var u, a, f;
                if (n && n.type && n.type === "mustache") {
                    if (!n.params || !n.params.length) {
                        u = A(n.id.parts);
                        for (a in u)u[a] && (o = u[a] || o, r.push(i + u[a]));
                        r.push(i + n.id.string)
                    }
                    var l = ["this", ".", "..", "./..", "../..", "../../.."];
                    n.params && typeof e.helpers[n.id.string] == "undefined" && t(n.params).forEach(function (a) {
                        (t(l).contains(a.original) || a instanceof e.AST.StringNode || a instanceof e.AST.IntegerNode || a instanceof e.AST.BooleanNode) && s.push(n.id.string), u = A(a.parts);
                        for (var f in u)u[f] && (o = u[f] || o, s.push(n.id.string), r.push(i + u[f]))
                    })
                }
                n && n.mustache && O([n.mustache], r, i + o, s), n && n.program && n.program.statements && (f = O([n.mustache], [], "", s)[0] || "", n.program.inverse && n.program.inverse.statements && O(n.program.inverse.statements, r, i + o + (f ? i + o ? "." + f : f : ""), s), O(n.program.statements, r, i + o + (f ? i + o ? "." + f : f : ""), s))
            }), r
        }

        function M(e) {
            var n = [], r = [];
            e && e.statements && (n = O(e.statements, [], undefined, r));
            var i = ["helperMissing", "blockHelperMissing", "each", "if", "unless", "with"];
            return{vars: t(n).chain().unique().map(function (e) {
                return e === "" ? "." : e.length && e[e.length - 1] === "." ? e.substr(0, e.length - 1) + "[]" : e
            }).value(), helpers: t(r).chain().unique().map(function (e) {
                return t(i).contains(e) ? undefined : e
            }).compact().value()}
        }

        function D(c) {
            a(P, function (a) {
                var h = e.parse(a), m = k(h), b = L(h), N = M(h), C = N.vars, A = N.helpers || [], O = m.join("', 'hbs!").replace(/_/g, "/"), D = S.hbs && S.hbs.disableHelpers ? "" : function () {
                    var e, t = [], n = S.hbs && S.hbs.helperPathCallback ? S.hbs.helperPathCallback : function (e) {
                        return(S.hbs && S.hbs.helperDirectory ? S.hbs.helperDirectory : v) + e
                    };
                    for (e = 0; e < A.length; e++)t[e] = "'" + n(A[e], P) + "'";
                    return t
                }().join(","), H = "", B = "", j = "", F, I, q;
                O && (O = ",'hbs!" + O + "'"), D && (D = "," + D);
                if (b !== "{}")try {
                    F = r.parse(b), F && F.styles && (w = t.union(w, F.styles), require.isBrowser && !S.isBuild ? (I = document.head || document.getElementsByTagName("head")[0], t(F.styles).forEach(function (e) {
                        E[e] || (console.log(i), q = document.createElement("link"), q.href = S.baseUrl + p + e + ".css", q.media = "all", q.rel = "stylesheet", q.type = "text/css", I.appendChild(q), E[e] = q)
                    })) : S.isBuild && function () {
                        var e = require.nodeRequire("fs"), n = t(F.styles).map(function (e) {
                            return E[e] ? "" : (E[e] = !0, "@import url(../" + e + ".css);\n")
                        }).join("\n");
                        e.open(__dirname + d + g, l, "0666", function (t, r) {
                            e.writeSync(r, n, null, encoding = "utf8"), e.close(r)
                        }), l = "a"
                    }())
                } catch (R) {
                    console.log("error injecting styles")
                }
                !S.isBuild && !S.serverRender && (H = "<!-- START - " + o + " -->", B = "<!-- END - " + o + " -->", j = "t.meta = " + b + ";\n" + "t.helpers = " + r.stringify(A) + ";\n" + "t.deps = " + r.stringify(m) + ";\n" + "t.vars = " + r.stringify(C) + ";\n");
                var U = T ? !1 : t.extend(c, S.localeMapping), z = S.hbs || {}, W = t.extend(z.compileOptions || {}, {originalKeyFallback: z.originalKeyFallback}), X = n(a, U, W);
                a = "/* START_TEMPLATE */\ndefine(['hbs','handlebars'" + O + D + "], function( hbs, Handlebars ){ \n" + "var t = Handlebars.template(" + X + ");\n" + "Handlebars.registerPartial('" + o.replace(/\//g, "_") + "', t);\n" + j + "return t;\n" + "});\n" + "/* END_TEMPLATE */\n", S.isBuild && (f[x] = a), S.isBuild || (a += "\r\n//@ sourceURL=" + P);
                for (var V in m)m.hasOwnProperty(V) && (m[V] = "hbs!" + m[V].replace(/_/g, "/"));
                S.isBuild ? (y.fromText(o, a), u([o], function (e) {
                    y(e)
                })) : require(m, function () {
                    y.fromText(a), u([o], function (e) {
                        y(e)
                    })
                }), S.removeCombined && s.unlinkSync(P)
            })
        }

        var x = o + h, T = S.hbs && S.hbs.disableI18n, N = [], P, H = S.hbs && S.hbs.templateExtension === !1;
        H ? P = u.toUrl(o) : P = u.toUrl(o + "." + (S.hbs && S.hbs.templateExtension ? S.hbs.templateExtension : c));
        if (T)D(!1); else {
            var B = (S.hbs && S.hbs.i18nDirectory ? S.hbs.i18nDirectory : m) + (S.locale || "en_us") + ".json";
            try {
                b(u.toUrl(B), function (e) {
                    D(r.parse(e))
                })
            } catch (j) {
                if (!!S.hbs)throw j;
                console.warn("hbs: Error reading " + B + ", disabling i18n. Ignore this if you're using jam, otherwise check your i18n configuration.\n"), S.hbs = {disableI18n: !0}, D(!1)
            }
        }
    }}
}), define("hbs!views/home/coolPartial", ["hbs", "handlebars"], function (e, t) {
    var n = t.template(function (e, t, n, r, i) {
        return this.compilerInfo = [2, ">= 1.0.0-rc.3"], n = n || e.helpers, '<div class="protoss">\n\n</div>'
    });
    return t.registerPartial("views_home_coolPartial", n), n
}), define("hbs!views/home/homeTemplate", ["hbs", "handlebars", "hbs!views/home/coolPartial"], function (e, t) {
    var n = t.template(function (e, t, n, r, i) {
        this.compilerInfo = [2, ">= 1.0.0-rc.3"], n = n || e.helpers, r = r || e.partials;
        var s = "", o, u = "function", a = this.escapeExpression, f = this;
        s += '\n<div class="app-container">\n    <h1>This is my ', (o = n.adjective) ? o = o.call(t, {hash: {}}) : (o = t.adjective, o = typeof o === u ? o.apply(t) : o), s += a(o) + " template. </h1>\n    ", o = f.invokePartial(r.views_home_coolPartial, "views_home_coolPartial", t, n, r);
        if (o || o === 0)s += o;
        return s += "\n</div>", s
    });
    return t.registerPartial("views_home_homeTemplate", n), n
}), define("views/home/home", ["jquery", "views/archview", "hbs!views/home/homeTemplate"], function (e, t, n) {
    return t.extend({model: {adjective: "awesome"}, template: n})
}), define("hbs!views/header/headerTemplate", ["hbs", "handlebars"], function (e, t) {
    var n = t.template(function (e, t, n, r, i) {
        this.compilerInfo = [2, ">= 1.0.0-rc.3"], n = n || e.helpers;
        var s = "";
        return s += '\n\n<nav class="app-navbar" role="navigation">\n    <div class="container">\n        <div class="row">\n            <div class="app-navbar-buttons">\n                <div class="app-navbar-button-wrapper">\n                    <a class="app-navbar-button" href="#"></a>\n                </div>\n                <ul class="app-nav">\n                    <li><a href="#work">Work</a></li>\n                    <li><a href="#games">Games</a></li>\n                    <li><a href="#me">About me</a></li>\n                    <li><a href="#you">About you</a></li>\n                </ul>\n            </div>\n        </div>\n    </div>\n</nav>', s
    });
    return t.registerPartial("views_header_headerTemplate", n), n
}), define("views/header/header", ["jquery", "backbone", "views/archview", "hbs!views/header/headerTemplate"], function (e, t, n, r) {
    return n.extend({navLinkElements: [], template: r, initDomHandles: function () {
        this.navLinkElements = this.$el.find(".app-nav").children()
    }, onNavigate: function (t) {
        e(this.navLinkElements).each(function () {
            e(e(this).children()[0]).removeClass("app-nav-active")
        }), e(e(this.navLinkElements[t]).children()[0]).addClass("app-nav-active")
    }})
}), define("hbs!views/footer/footerTemplate", ["hbs", "handlebars"], function (e, t) {
    var n = t.template(function (e, t, n, r, i) {
        this.compilerInfo = [2, ">= 1.0.0-rc.3"], n = n || e.helpers;
        var s = "";
        return s += '\n\n<div class="container">\n    <div class="row footer-nav">\n        <div class="footer-nav-buttons">\n            <ul class="nav nav-pills">\n                <li><a href="http://boardgamegeek.com/">BoardGameGeek</a></li>\n                <li><a href="#games">LinkedIn</a></li>\n                <li><a href="#me">Random site 1</a></li>\n                <li><a href="#you">Random site 2 </a></li>\n            </ul>\n        </div>\n    </div>\n</div>\n', s
    });
    return t.registerPartial("views_footer_footerTemplate", n), n
}), define("views/footer/footer", ["jquery", "views/archview", "hbs!views/footer/footerTemplate"], function (e, t, n) {
    return t.extend({template: n})
}), define("hbs!views/work/workTemplate", ["hbs", "handlebars"], function (e, t) {
    var n = t.template(function (e, t, n, r, i) {
        this.compilerInfo = [2, ">= 1.0.0-rc.3"], n = n || e.helpers;
        var s = "";
        return s += "\n\n<div>\n    Work goes here\n</div>\n", s
    });
    return t.registerPartial("views_work_workTemplate", n), n
}), define("views/work/work", ["jquery", "views/archview", "hbs!views/work/workTemplate"], function (e, t, n) {
    return t.extend({template: n})
}), define("hbs!views/games/gamesTemplate", ["hbs", "handlebars"], function (e, t) {
    var n = t.template(function (e, t, n, r, i) {
        this.compilerInfo = [2, ">= 1.0.0-rc.3"], n = n || e.helpers;
        var s = "";
        return s += '\n\n<div class="jumbotron margined">\n    <h1>Bulls and Cows</h1>\n    <p>Enjoy the traditional game of bulls and cows</p>\n    <div class="btn btn-primary startButton">Start</div>\n</div>\n', s
    });
    return t.registerPartial("views_games_gamesTemplate", n), n
}), define("views/games/games", ["jquery", "views/archview", "hbs!views/games/gamesTemplate"], function (e, t, n) {
    return t.extend({template: n, events: {"click .startButton": "onStart"}, onStart: function () {
        window.app.router.navigate("/bulls", !0)
    }})
}), define("hbs!views/me/meTemplate", ["hbs", "handlebars"], function (e, t) {
    var n = t.template(function (e, t, n, r, i) {
        this.compilerInfo = [2, ">= 1.0.0-rc.3"], n = n || e.helpers;
        var s = "";
        return s += "\n\n<div>\n    I go here\n</div>\n\n", s
    });
    return t.registerPartial("views_me_meTemplate", n), n
}), define("views/me/me", ["jquery", "views/archview", "hbs!views/me/meTemplate"], function (e, t, n) {
    return t.extend({template: n})
}), define("hbs!views/you/youTemplate", ["hbs", "handlebars"], function (e, t) {
    var n = t.template(function (e, t, n, r, i) {
        this.compilerInfo = [2, ">= 1.0.0-rc.3"], n = n || e.helpers;
        var s = "";
        return s += "\n<div>\n    You go here\n</div>\n\n", s
    });
    return t.registerPartial("views_you_youTemplate", n), n
}), define("views/you/you", ["jquery", "views/archview", "hbs!views/you/youTemplate"], function (e, t, n) {
    return t.extend({template: n})
}), define("hbs!views/bulls/bullsTemplate", ["hbs", "handlebars"], function (e, t) {
    var n = t.template(function (e, t, n, r, i) {
        this.compilerInfo = [2, ">= 1.0.0-rc.3"], n = n || e.helpers;
        var s = "";
        return s += '\n\n<div class="panel panel-primary bulls-chat-panel">\n    <div class="panel-heading">\n        <h3 class="panel-title">Guess the number, please!</h3>\n    </div>\n    <div class="panel-body bulls-log">\n    </div>\n</div>\n\n\n<div class="bulls-chat-log">\n\n</div>\n\n<form class="form-inline" role="form">\n    <div class="form-group">\n        <label class="sr-only" for="bulls-number">Four digit number</label>\n        <input type="email" class="form-control bulls-number" placeholder="####" maxlength="4">\n    </div>\n\n    <button type="submit" class="btn btn-default bulls-guess">Guess</button>\n\n    <div class="text-danger bulls-input-error"></div>\n</form>', s
    });
    return t.registerPartial("views_bulls_bullsTemplate", n), n
}), define("hbs!views/bulls/messageTemplate", ["hbs", "handlebars"], function (e, t) {
    var n = t.template(function (e, t, n, r, i) {
        this.compilerInfo = [2, ">= 1.0.0-rc.3"], n = n || e.helpers;
        var s = "", o, u = "function", a = this.escapeExpression;
        return s += '\n\n<div class="bulls-log-message text-', (o = n.status) ? o = o.call(t, {hash: {}}) : (o = t.status, o = typeof o === u ? o.apply(t) : o), s += a(o) + '">', (o = n.prefix) ? o = o.call(t, {hash: {}}) : (o = t.prefix, o = typeof o === u ? o.apply(t) : o), s += a(o), (o = n.message) ? o = o.call(t, {hash: {}}) : (o = t.message, o = typeof o === u ? o.apply(t) : o), s += a(o) + '</div>\n<div class="clear"></div>', s
    });
    return t.registerPartial("views_bulls_messageTemplate", n), n
}), define("views/bulls/gamelogic/gameLogic", [], function () {
    return{correctNumber: 0, correctDigitsCount: 0, attemptsCount: 0, defaultDigitsCount: 4, newGame: function (e) {
        this.setRandomCorrectNumberWithDigitsCount(e), this.attemptsCount = 0
    }, setRandomCorrectNumberWithDigitsCount: function (e) {
        if (!e || isNaN(e))throw"Please pass in valid digits count parameter";
        this.correctDigitsCount = e;
        var t = Math.pow(10, e - 1), n = 9 * t;
        this.correctNumber = Math.floor(Math.random() * n) + t, console.log(this.correctNumber)
    }, setCorrectNumber: function (e) {
        this.correctNumber = e, this.correctDigitsCount = this.correctNumber.toString().length
    }, compareGuessWithOriginalNumber: function (e) {
        if (!this.correctNumber)throw"correctNumber cannot be 0 or uninitialized. Please first call newGame or setCorrectNumber";
        var t = this.validateGuessNumber(e);
        if (t.code !== 0)return{error: t};
        console.log(e), this.attemptsCount++;
        var n = this.getBullsCount(e, this.correctNumber), r = this.getCowsAndBullsCount(e, this.correctNumber), i = r - n;
        return{bulls: n, cows: i}
    }, getBullsCount: function (e, t) {
        var n = 0, r = e.toString(), i = t.toString();
        if (r.length !== i.length)throw"Compared numbers should have the same digits count";
        for (var s = 0; s < r.length; s++)r.charAt(s) === i.charAt(s) && n++;
        return n
    }, getCowsAndBullsCount: function (e, t) {
        var n = 0, r = e.toString(), i = t.toString();
        if (r.length !== i.length)throw"Compared numbers should have the same digits count";
        var s = {0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0, 9: 0}, o = {0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0, 9: 0};
        for (var u = 0; u < r.length; u++)s[r.charAt(u)]++;
        for (var u = 0; u < i.length; u++)o[i.charAt(u)]++;
        for (var u = 0; u < 10; u++)n += Math.min(s[u], o[u]);
        return n
    }, validateGuessNumber: function (e) {
        if (isNaN(e))return{code: 1, message: "Your number should include digits only"};
        if (e.charAt(0) === "0")return{code: 2, message: "Your number cannot start with zero"};
        var t = e.length, n = parseInt(e, 10), r = n.toString().length;
        return t !== r ? {code: 3, message: "Your number must be an integer with digits only"} : t < this.correctDigitsCount ? {code: 4, message: "Not enough digits in your number. It should have " + this.correctDigitsCount + " digits"} : t > this.correctDigitsCount ? {code: 5, message: "Too many digits in your number. It should have " + this.correctDigitsCount + " digits only"} : {code: 0, message: "no error"}
    }}
}), define("views/bulls/bulls", ["jquery", "views/archview", "hbs!views/lions/bullsTemplate", "hbs!views/lions/messageTemplate", "views/model/gameLogic"], function (e, t, n, r, i) {
    return t.extend({template: n, events: {"click .bulls-guess": "guess"}, guessInputEl: 0, logEl: 0, inputErrorEl: 0, digitsCount: 4, initialize: function () {
    }, render: function () {
        return t.prototype.render.apply(this), i.newGame(this.digitsCount), this
    }, initDomHandles: function () {
        this.guessInputEl = this.$el.find(".bulls-number"), this.logEl = this.$el.find(".bulls-log"), this.inputErrorEl = this.$el.find(".bulls-input-error")
    }, guess: function (e) {
        e.preventDefault();
        var t = this.guessInputEl.val();
        this.guessInputEl.val(""), console.log(this.guessInputEl);
        var n = i.compareGuessWithOriginalNumber(t);
        console.log(n), n.error ? this.renderErrorMessage(n.error.message) : (this.renderErrorMessage(""), n.bulls === this.digitsCount ? this.win(n) : this.renderGuessResult(n))
    }, renderErrorMessage: function (e) {
        this.inputErrorEl.html(e)
    }, win: function (e) {
        this.renderGuessResult(e), this.renderWin(), i.newGame(this.digitsCount)
    }, renderWin: function () {
        var e = "";
        if (i.attemptsCount === 1)var t = "Wow! You guessed it in just one attempt. Did you dream last night about " + i.correctNumber + " or what?! A new number will be loaded. Wanna try again?"; else var t = "Nicey-nice! The number really is " + i.correctNumber + " and you guessed it in " + i.attemptsCount + " attempts! A new number will be loaded. Wanna try again?";
        this.renderMessage("success", e, t)
    }, renderGuessResult: function (e) {
        var t = i.attemptsCount + ": ", n = "bulls: " + e.bulls + ", cows: " + e.cows;
        this.renderMessage("info", t, n)
    }, renderMessage: function (e, t, n) {
        var i = r({status: e, prefix: t, message: n});
        this.logEl.append(i)
    }})
}), define("router", ["jquery", "underscore", "backbone", "views/home/home", "views/header/header", "views/footer/footer", "views/work/work", "views/games/games", "views/me/me", "views/you/you", "views/lions"], function (e, t, n, r, i, s, o, u, a, f, l) {
    var c = n.Router.extend({routes: {"": "home", work: "work", games: "games", me: "me", you: "you", bulls: "bulls"}, initialize: function () {
        this.headerView = new i, this.footerView = new s, this.homeView = new r, this.workView = new o, this.gamesView = new u, this.meView = new a, this.youView = new f, this.renderHeader(), this.renderFooter()
    }, renderHeader: function () {
        e("#app-header").html(this.headerView.render().el)
    }, renderFooter: function () {
        e("#app-footer").html(this.footerView.render().el)
    }, preNavigate: function (e) {
        this.headerView.onNavigate(e)
    }, postNavigate: function () {
    }, home: function () {
        this.preNavigate(-1), e("#app").html(this.homeView.render().el), this.postNavigate()
    }, work: function () {
        this.preNavigate(0), e("#app").html(this.workView.render().el), this.postNavigate()
    }, games: function () {
        this.preNavigate(1), e("#app").html(this.gamesView.render().el), this.postNavigate()
    }, me: function () {
        this.preNavigate(2), e("#app").html(this.meView.render().el), this.postNavigate()
    }, you: function () {
        this.preNavigate(3), e("#app").html(this.youView.render().el), this.postNavigate()
    }, bulls: function () {
        this.preNavigate(1), this.bullsView = new l, e("#app").html(this.bullsView.render().el), this.postNavigate()
    }}), h = function () {
        var e = new c;
        return n.history.start(), e
    };
    return{initialize: h}
}), define("app", ["jquery", "underscore", "backbone", "router"], function (e, t, n, r) {
    var i = function () {
        this.router = r.initialize()
    };
    return{initialize: i}
}), require.config({hbs: {disableI18n: !0, disableHelpers: !0}, paths: {jquery: "../lib/jquery-2.0.3", underscore: "../lib/underscore", backbone: "../lib/backbone", handlebars: "../lib/hbs/handlebars", hbs: "../lib/hbs/hbs", i18nprecompile: "../lib/hbs/i18nprecompile", json2: "../lib/hbs/json2"}, shim: {underscore: {exports: "_"}, backbone: {deps: ["underscore", "jquery"], exports: "Backbone"}}}), require(["app"], function (e) {
    window.app = e, e.initialize()
}), define("main", function () {
});