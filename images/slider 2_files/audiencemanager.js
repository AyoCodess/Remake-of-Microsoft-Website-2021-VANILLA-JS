"function" !== typeof window.DIL && (window.DIL = function (a, d) {
    var e = [], b, f; a !== Object(a) && (a = {}); var g, k, q, n, r, m, x, E, s, A, L, B, C, F; g = a.partner; k = a.containerNSID; q = !!a.disableDestinationPublishingIframe; n = a.iframeAkamaiHTTPS; r = a.mappings; m = a.uuidCookie; x = !0 === a.enableErrorReporting; E = a.visitorService; s = a.declaredId; A = !0 === a.removeFinishedScriptsAndCallbacks; L = !0 === a.delayAllUntilWindowLoad; B = !0 === a.disableIDSyncs; C = "undefined" === typeof a.secureDataCollection || !0 === a.secureDataCollection; F = !0 === a.useCORSOnly;
    var M, N, I, G, O, P, Q, R; M = !0 === a.disableScriptAttachment; N = !0 === a.disableDefaultRequest; I = a.afterResultForDefaultRequest; G = a.dpIframeSrc; O = !0 === a.testCORS; P = !0 === a.useJSONPOnly; Q = a.visitorConstructor; R = !0 === a.disableCORS; x && DIL.errorModule.activate(); var T = !0 === window._dil_unit_tests; (b = d) && e.push(b + ""); if (!g || "string" !== typeof g) return b = "DIL partner is invalid or not specified in initConfig", DIL.errorModule.handleError({ name: "error", message: b, filename: "dil.js" }), Error(b); b = "DIL containerNSID is invalid or not specified in initConfig, setting to default of 0";
    if (k || "number" === typeof k) k = parseInt(k, 10), !isNaN(k) && 0 <= k && (b = ""); b && (k = 0, e.push(b), b = ""); f = DIL.getDil(g, k); if (f instanceof DIL && f.api.getPartner() === g && f.api.getContainerNSID() === k) return f; if (this instanceof DIL) DIL.registerDil(this, g, k); else return new DIL(a, "DIL was not instantiated with the 'new' operator, returning a valid instance with partner = " + g + " and containerNSID = " + k); var y = {
        IS_HTTPS: C || "https:" === document.location.protocol, POST_MESSAGE_ENABLED: !!window.postMessage, COOKIE_MAX_EXPIRATION_DATE: "Tue, 19 Jan 2038 03:14:07 UTC",
        MILLIS_PER_DAY: 864E5, DIL_COOKIE_NAME: "AAMC_" + encodeURIComponent(g) + "_" + k, FIRST_PARTY_SYNCS: "AMSYNCS", FIRST_PARTY_SYNCS_ON_PAGE: "AMSYNCSOP", HAS_JSON_STRINGIFY: window.JSON === Object(window.JSON) && "function" === typeof window.JSON.stringify
    }, J = { stuffed: {} }, u = {}, p = {
        firingQueue: [], fired: [], firing: !1, sent: [], errored: [], reservedKeys: { sids: !0, pdata: !0, logdata: !0, callback: !0, postCallbackFn: !0, useImageRequest: !0 }, callbackPrefix: "demdexRequestCallback", firstRequestHasFired: !1, useJSONP: !0, abortRequests: !1, num_of_jsonp_responses: 0,
        num_of_jsonp_errors: 0, num_of_cors_responses: 0, num_of_cors_errors: 0, corsErrorSources: [], num_of_img_responses: 0, num_of_img_errors: 0, toRemove: [], removed: [], readyToRemove: !1, platformParams: { d_nsid: k + "", d_rtbd: "json", d_jsonv: DIL.jsonVersion + "", d_dst: "1" }, nonModStatsParams: { d_rtbd: !0, d_dst: !0, d_cts: !0, d_rs: !0 }, modStatsParams: null, adms: {
            TIME_TO_CATCH_ALL_REQUESTS_RELEASE: 2E3, calledBack: !1, mid: null, noVisitorAPI: !1, VisitorAPI: null, instance: null, releaseType: "no VisitorAPI", isOptedOut: !0, isOptedOutCallbackCalled: !1,
            admsProcessingStarted: !1, process: function (c) {
                try {
                    if (!this.admsProcessingStarted) {
                        this.admsProcessingStarted = !0; var l = this, t, h, a, b; if ("function" === typeof c && "function" === typeof c.getInstance) {
                            if (E === Object(E) && (t = E.namespace) && "string" === typeof t) h = c.getInstance(t, { idSyncContainerID: k }); else { this.releaseType = "no namespace"; this.releaseRequests(); return } if (h === Object(h) && h instanceof c && "function" === typeof h.isAllowed && "function" === typeof h.getMarketingCloudVisitorID && "function" === typeof h.getCustomerIDs &&
                                "function" === typeof h.isOptedOut) { this.VisitorAPI = c; if (!h.isAllowed()) { this.releaseType = "VisitorAPI not allowed"; this.releaseRequests(); return } this.instance = h; a = function (c) { "VisitorAPI" !== l.releaseType && (l.mid = c, l.releaseType = "VisitorAPI", l.releaseRequests()) }; b = h.getMarketingCloudVisitorID(a); if ("string" === typeof b && b.length) { a(b); return } setTimeout(function () { "VisitorAPI" !== l.releaseType && (l.releaseType = "timeout", l.releaseRequests()) }, this.getLoadTimeout()); return } this.releaseType = "invalid instance"
                        } else this.noVisitorAPI =
                            !0; this.releaseRequests()
                    }
                } catch (e) { this.releaseRequests() }
            }, releaseRequests: function () { this.calledBack = !0; p.registerRequest() }, getMarketingCloudVisitorID: function () { return this.instance ? this.instance.getMarketingCloudVisitorID() : null }, getMIDQueryString: function () { var c = w.isPopulatedString, l = this.getMarketingCloudVisitorID(); c(this.mid) && this.mid === l || (this.mid = l); return c(this.mid) ? "d_mid=" + this.mid + "&" : "" }, getCustomerIDs: function () { return this.instance ? this.instance.getCustomerIDs() : null }, getCustomerIDsQueryString: function (c) {
                if (c ===
                    Object(c)) { var l = "", t = [], h = [], a, b; for (a in c) c.hasOwnProperty(a) && (h[0] = a, b = c[a], b === Object(b) && (h[1] = b.id || "", h[2] = b.authState || 0, t.push(h), h = [])); if (h = t.length) for (c = 0; c < h; c++) l += "&d_cid_ic=" + v.encodeAndBuildRequest(t[c], "%01"); return l } return ""
            }, getIsOptedOut: function () { this.instance ? this.instance.isOptedOut([this, this.isOptedOutCallback], this.VisitorAPI.OptOut.GLOBAL, !0) : (this.isOptedOut = !1, this.isOptedOutCallbackCalled = !0) }, isOptedOutCallback: function (c) {
                this.isOptedOut = c; this.isOptedOutCallbackCalled =
                    !0; p.registerRequest()
            }, getLoadTimeout: function () { var c = this.instance; if (c) { if ("function" === typeof c.getLoadTimeout) return c.getLoadTimeout(); if ("undefined" !== typeof c.loadTimeout) return c.loadTimeout } return this.TIME_TO_CATCH_ALL_REQUESTS_RELEASE }
        }, declaredId: {
            declaredId: { init: null, request: null }, declaredIdCombos: {}, setDeclaredId: function (c, l) {
                var t = w.isPopulatedString, h = encodeURIComponent; if (c === Object(c) && t(l)) {
                    var a = c.dpid, b = c.dpuuid, e = null; if (t(a) && t(b)) {
                        e = h(a) + "$" + h(b); if (!0 === this.declaredIdCombos[e]) return "setDeclaredId: combo exists for type '" +
                            l + "'"; this.declaredIdCombos[e] = !0; this.declaredId[l] = { dpid: a, dpuuid: b }; return "setDeclaredId: succeeded for type '" + l + "'"
                    }
                } return "setDeclaredId: failed for type '" + l + "'"
            }, getDeclaredIdQueryString: function () { var c = this.declaredId.request, l = this.declaredId.init, a = encodeURIComponent, h = ""; null !== c ? h = "&d_dpid=" + a(c.dpid) + "&d_dpuuid=" + a(c.dpuuid) : null !== l && (h = "&d_dpid=" + a(l.dpid) + "&d_dpuuid=" + a(l.dpuuid)); return h }
        }, registerRequest: function (c) {
            var l = this.firingQueue; c === Object(c) && l.push(c); this.firing ||
                !l.length || L && !DIL.windowLoaded || (this.adms.isOptedOutCallbackCalled || this.adms.getIsOptedOut(), this.adms.calledBack && !this.adms.isOptedOut && this.adms.isOptedOutCallbackCalled && (this.adms.isOptedOutCallbackCalled = !1, c = l.shift(), c.src = c.src.replace(/demdex.net\/event\?d_nsid=/, "demdex.net/event?" + this.adms.getMIDQueryString() + "d_nsid="), w.isPopulatedString(c.corsPostData) && (c.corsPostData = c.corsPostData.replace(/^d_nsid=/, this.adms.getMIDQueryString() + "d_nsid=")), D.fireRequest(c), this.firstRequestHasFired ||
                    "script" !== c.tag && "cors" !== c.tag || (this.firstRequestHasFired = !0)))
        }, processVisitorAPI: function () { this.adms.process(Q || window.Visitor) }, requestRemoval: function (c) {
            if (!A) return "removeFinishedScriptsAndCallbacks is not boolean true"; var l = this.toRemove, a, h; c === Object(c) && (a = c.script, h = c.callbackName, (a === Object(a) && "SCRIPT" === a.nodeName || "no script created" === a) && "string" === typeof h && h.length && l.push(c)); if (this.readyToRemove && l.length) {
                h = l.shift(); a = h.script; h = h.callbackName; "no script created" !== a ?
                    (c = a.src, a.parentNode.removeChild(a)) : c = a; window[h] = null; try { delete window[h] } catch (b) { } this.removed.push({ scriptSrc: c, callbackName: h }); DIL.variables.scriptsRemoved.push(c); DIL.variables.callbacksRemoved.push(h); return this.requestRemoval()
            } return "requestRemoval() processed"
        }
    }; f = function () {
        var c = "http://fast.", l = "?d_nsid=" + k + "#" + encodeURIComponent(document.location.href); if ("string" === typeof G && G.length) return G + l; y.IS_HTTPS && (c = !0 === n ? "https://fast." : "https://"); return c + g + ".demdex.net/dest5.html" +
            l
    }; var z = {
        THROTTLE_START: 3E4, MAX_SYNCS_LENGTH: 649, throttleTimerSet: !1, id: "destination_publishing_iframe_" + g + "_" + k, url: f(), onPagePixels: [], iframeHost: null, getIframeHost: function (c) { if ("string" === typeof c) { var l = c.split("/"); if (3 <= l.length) return l[0] + "//" + l[2]; e.push("getIframeHost: url is malformed: " + c); return c } }, iframe: null, iframeHasLoaded: !1, sendingMessages: !1, messages: [], messagesPosted: [], messagesReceived: [], messageSendingInterval: y.POST_MESSAGE_ENABLED ? null : 100, ibsDeleted: [], jsonForComparison: [],
        jsonDuplicates: [], jsonWaiting: [], jsonProcessed: [], canSetThirdPartyCookies: !0, receivedThirdPartyCookiesNotification: !1, newIframeCreated: null, iframeIdChanged: !1, originalIframeHasLoadedAlready: null, attachIframe: function () {
            function c() { h = document.createElement("iframe"); h.sandbox = "allow-scripts allow-same-origin"; h.title = "Adobe ID Syncing iFrame"; h.id = a.id; h.style.cssText = "display: none; width: 0; height: 0;"; h.src = a.url; a.newIframeCreated = !0; l(); document.body.appendChild(h) } function l() {
                v.addListener(h,
                    "load", function () { h.className = "aamIframeLoaded"; a.iframeHasLoaded = !0; a.requestToProcess() })
            } var a = this, h = document.getElementById(this.id); h ? "IFRAME" !== h.nodeName ? (this.id += "_2", this.iframeIdChanged = !0, c()) : (this.newIframeCreated = !1, "aamIframeLoaded" !== h.className ? (this.originalIframeHasLoadedAlready = !1, l()) : (this.iframeHasLoaded = this.originalIframeHasLoadedAlready = !0, this.iframe = h, this.requestToProcess())) : c(); this.iframe = h
        }, requestToProcess: function (c, l) {
            function a() {
                h.jsonForComparison.push(c);
                h.jsonWaiting.push([c, l])
            } var h = this, b, e; b = p.adms.instance; c === Object(c) && b === Object(b) && b.idSyncContainerID === k && (z.ibsDeleted.push(c.ibs), delete c.ibs); if (c && !w.isEmptyObject(c)) if (y.HAS_JSON_STRINGIFY) if (b = JSON.stringify(c.ibs || []), e = JSON.stringify(c.dests || []), this.jsonForComparison.length) { var d = !1, g, f, m; g = 0; for (f = this.jsonForComparison.length; g < f; g++) if (m = this.jsonForComparison[g], b === JSON.stringify(m.ibs || []) && e === JSON.stringify(m.dests || [])) { d = !0; break } d ? this.jsonDuplicates.push(c) : a() } else a();
            else a(); (this.receivedThirdPartyCookiesNotification || !y.POST_MESSAGE_ENABLED || this.iframeHasLoaded) && this.jsonWaiting.length && (b = this.jsonWaiting.shift(), !1 === this.newIframeCreated && delete b[0].ibs, this.process(b[0], b[1]), this.requestToProcess()); this.iframeHasLoaded && this.messages.length && !this.sendingMessages && (this.throttleTimerSet || (this.throttleTimerSet = !0, setTimeout(function () { h.messageSendingInterval = y.POST_MESSAGE_ENABLED ? null : 150 }, this.THROTTLE_START)), this.sendingMessages = !0, this.sendMessages())
        },
        processSyncOnPage: function (c) { var l, a, h; if ((l = c.ibs) && l instanceof Array && (a = l.length)) for (c = 0; c < a; c++) h = l[c], h.syncOnPage && this.checkFirstPartyCookie(h, "", "syncOnPage") }, process: function (c, l) {
            var a = encodeURIComponent, h, b, e, d, g, f; l === Object(l) && (f = v.encodeAndBuildRequest(["", l.dpid || "", l.dpuuid || ""], ",")); if ((h = c.dests) && h instanceof Array && (b = h.length)) for (e = 0; e < b; e++) d = h[e], g = [a("dests"), a(d.id || ""), a(d.y || ""), a(d.c || "")], this.addMessage(g.join("|")); if ((h = c.ibs) && h instanceof Array && (b = h.length)) for (e =
                0; e < b; e++) d = h[e], g = [a("ibs"), a(d.id || ""), a(d.tag || ""), v.encodeAndBuildRequest(d.url || [], ","), a(d.ttl || ""), "", f, d.fireURLSync ? "true" : "false"], d.syncOnPage || (this.canSetThirdPartyCookies ? this.addMessage(g.join("|")) : d.fireURLSync && this.checkFirstPartyCookie(d, g.join("|"))); this.jsonProcessed.push(c)
        }, checkFirstPartyCookie: function (c, a, b) {
            var h = (b = "syncOnPage" === b ? !0 : !1) ? y.FIRST_PARTY_SYNCS_ON_PAGE : y.FIRST_PARTY_SYNCS, e = this.getOnPageSyncData(h), d = !1, g = !1, f = Math.ceil((new Date).getTime() / y.MILLIS_PER_DAY);
            e ? (e = e.split("*"), g = this.pruneSyncData(e, c.id, f), d = g.dataPresent, g = g.dataValid, d && g || this.fireSync(b, c, a, e, h, f)) : (e = [], this.fireSync(b, c, a, e, h, f))
        }, getOnPageSyncData: function (c) { var a = p.adms.instance; return a && "function" === typeof a.idSyncGetOnPageSyncInfo ? a.idSyncGetOnPageSyncInfo() : v.getDilCookieField(c) }, pruneSyncData: function (c, a, b) {
            var h = !1, e = !1, d, g, f; if (c instanceof Array) for (g = 0; g < c.length; g++) d = c[g], f = parseInt(d.split("-")[1], 10), d.match("^" + a + "-") ? (h = !0, b < f ? e = !0 : (c.splice(g, 1), g--)) : b >= f &&
                (c.splice(g, 1), g--); return { dataPresent: h, dataValid: e }
        }, manageSyncsSize: function (c) { if (c.join("*").length > this.MAX_SYNCS_LENGTH) for (c.sort(function (c, a) { return parseInt(c.split("-")[1], 10) - parseInt(a.split("-")[1], 10) }); c.join("*").length > this.MAX_SYNCS_LENGTH;) c.shift() }, fireSync: function (c, a, b, h, e, d) {
            function g(c, a, l, h) {
                return function () {
                    f.onPagePixels[c] = null; var b = f.getOnPageSyncData(l), e = []; if (b) { var b = b.split("*"), d, t, g; d = 0; for (t = b.length; d < t; d++) g = b[d], g.match("^" + a.id + "-") || e.push(g) } f.setSyncTrackingData(e,
                        a, l, h)
                }
            } var f = this; if (c) { if ("img" === a.tag) { c = a.url; b = y.IS_HTTPS ? "https:" : "http:"; var k, m, s; h = 0; for (k = c.length; h < k; h++) { m = c[h]; s = /^\/\//.test(m); var p = new Image; v.addListener(p, "load", g(this.onPagePixels.length, a, e, d)); p.src = (s ? b : "") + m; this.onPagePixels.push(p) } } } else this.addMessage(b), this.setSyncTrackingData(h, a, e, d)
        }, addMessage: function (c) { var a = encodeURIComponent, a = x ? a("---destpub-debug---") : a("---destpub---"); this.messages.push((y.POST_MESSAGE_ENABLED ? "" : a) + c) }, setSyncTrackingData: function (c,
            a, b, h) { c.push(a.id + "-" + (h + Math.ceil(a.ttl / 60 / 24))); this.manageSyncsSize(c); v.setDilCookieField(b, c.join("*")) }, sendMessages: function () { var c = this, a; this.messages.length ? y.POST_MESSAGE_ENABLED ? (a = encodeURIComponent("---destpub-combined---") + this.messages.join("%01"), this.postMessage(a), this.messages = [], this.sendingMessages = !1) : (a = this.messages.shift(), this.postMessage(a), setTimeout(function () { c.sendMessages() }, this.messageSendingInterval)) : this.sendingMessages = !1 }, postMessage: function (c) {
                DIL.xd.postMessage(c,
                    this.url, this.iframe.contentWindow); this.messagesPosted.push(c)
            }, receiveMessage: function (c) { var a = /^---destpub-to-parent---/; "string" === typeof c && a.test(c) && (a = c.replace(a, "").split("|"), "canSetThirdPartyCookies" === a[0] && (this.canSetThirdPartyCookies = "true" === a[1] ? !0 : !1, this.receivedThirdPartyCookiesNotification = !0, this.requestToProcess()), this.messagesReceived.push(c)) }
    }, K = {
        traits: function (c) { w.isValidPdata(c) && (u.sids instanceof Array || (u.sids = []), v.extendArray(u.sids, c)); return this }, pixels: function (c) {
            w.isValidPdata(c) &&
                (u.pdata instanceof Array || (u.pdata = []), v.extendArray(u.pdata, c)); return this
        }, logs: function (c) { w.isValidLogdata(c) && (u.logdata !== Object(u.logdata) && (u.logdata = {}), v.extendObject(u.logdata, c)); return this }, customQueryParams: function (c) { w.isEmptyObject(c) || v.extendObject(u, c, p.reservedKeys); return this }, signals: function (c, a) { var b, h = c; if (!w.isEmptyObject(h)) { if (a && "string" === typeof a) for (b in h = {}, c) c.hasOwnProperty(b) && (h[a + b] = c[b]); v.extendObject(u, h, p.reservedKeys) } return this }, declaredId: function (c) {
            p.declaredId.setDeclaredId(c,
                "request"); return this
        }, result: function (c) { "function" === typeof c && (u.callback = c); return this }, afterResult: function (c) { "function" === typeof c && (u.postCallbackFn = c); return this }, useImageRequest: function () { u.useImageRequest = !0; return this }, clearData: function () { u = {}; return this }, submit: function () { D.submitRequest(u); u = {}; return this }, getPartner: function () { return g }, getContainerNSID: function () { return k }, getEventLog: function () { return e }, getState: function () {
            var c = {}, l = {}; v.extendObject(c, p, {
                callbackPrefix: !0,
                useJSONP: !0, registerRequest: !0
            }); v.extendObject(l, z, { attachIframe: !0, requestToProcess: !0, process: !0, sendMessages: !0 }); return { initConfig: a, pendingRequest: u, otherRequestInfo: c, destinationPublishingInfo: l }
        }, idSync: function (c) {
            if (B) return "Error: id syncs have been disabled"; if (c !== Object(c) || "string" !== typeof c.dpid || !c.dpid.length) return "Error: config or config.dpid is empty"; if ("string" !== typeof c.url || !c.url.length) return "Error: config.url is empty"; var a = c.url, b = c.minutesToLive, h = encodeURIComponent,
                e = z, d, a = a.replace(/^https:/, "").replace(/^http:/, ""); if ("undefined" === typeof b) b = 20160; else if (b = parseInt(b, 10), isNaN(b) || 0 >= b) return "Error: config.minutesToLive needs to be a positive number"; d = v.encodeAndBuildRequest(["", c.dpid, c.dpuuid || ""], ","); c = ["ibs", h(c.dpid), "img", h(a), b, "", d]; e.addMessage(c.join("|")); p.firstRequestHasFired && e.requestToProcess(); return "Successfully queued"
        }, aamIdSync: function (c) {
            if (B) return "Error: id syncs have been disabled"; if (c !== Object(c) || "string" !== typeof c.dpuuid ||
                !c.dpuuid.length) return "Error: config or config.dpuuid is empty"; c.url = "//dpm.demdex.net/ibs:dpid=" + c.dpid + "&dpuuid=" + c.dpuuid; return this.idSync(c)
        }, passData: function (c) { if (w.isEmptyObject(c)) return "Error: json is empty or not an object"; z.ibsDeleted.push(c.ibs); delete c.ibs; D.defaultCallback(c); return c }, getPlatformParams: function () { return p.platformParams }, getEventCallConfigParams: function () {
            var c = p, a = c.modStatsParams, b = c.platformParams, h; if (!a) {
                a = {}; for (h in b) b.hasOwnProperty(h) && !c.nonModStatsParams[h] &&
                    (a[h.replace(/^d_/, "")] = b[h]); c.modStatsParams = a
            } return a
        }
    }, D = {
        corsMetadata: function () {
            var c = "none", a = !0; "undefined" !== typeof XMLHttpRequest && XMLHttpRequest === Object(XMLHttpRequest) && ("withCredentials" in new XMLHttpRequest ? c = "XMLHttpRequest" : (new Function("/*@cc_on return /^10/.test(@_jscript_version) @*/"))() ? c = "XMLHttpRequest" : "undefined" !== typeof XDomainRequest && XDomainRequest === Object(XDomainRequest) && (a = !1), 0 < Object.prototype.toString.call(window.HTMLElement).indexOf("Constructor") && (a = !1));
            return { corsType: c, corsCookiesEnabled: a }
        }(), getCORSInstance: function () { return "none" === this.corsMetadata.corsType ? null : new window[this.corsMetadata.corsType] }, submitRequest: function (c) { p.registerRequest(D.createQueuedRequest(c)); return !0 }, createQueuedRequest: function (c) {
            var a = p, b, h = c.callback, e = "img", d; if (!w.isEmptyObject(r)) { var g, f, m; for (g in r) r.hasOwnProperty(g) && (f = r[g], null != f && "" !== f && g in c && !(f in c || f in p.reservedKeys) && (m = c[g], null != m && "" !== m && (c[f] = m))) } w.isValidPdata(c.sids) || (c.sids =
                []); w.isValidPdata(c.pdata) || (c.pdata = []); w.isValidLogdata(c.logdata) || (c.logdata = {}); c.logdataArray = v.convertObjectToKeyValuePairs(c.logdata, "=", !0); c.logdataArray.push("_ts=" + (new Date).getTime()); "function" !== typeof h && (h = this.defaultCallback); a.useJSONP = !0 !== c.useImageRequest; a.useJSONP && (e = "script", b = a.callbackPrefix + "_" + k + "_" + (new Date).getTime()); a = this.makeRequestSrcData(c, b); P && !F || !(d = this.getCORSInstance()) || (e = "cors"); return {
                    tag: e, src: a.src, corsSrc: a.corsSrc, internalCallbackName: b, callbackFn: h,
                    postCallbackFn: c.postCallbackFn, useImageRequest: !!c.useImageRequest, requestData: c, corsInstance: d, corsPostData: a.corsPostData
                }
        }, defaultCallback: function (c, a) {
            z.processSyncOnPage(c); var b, h, e, d, g, f, k, s, x; if ((b = c.stuff) && b instanceof Array && (h = b.length)) for (e = 0; e < h; e++) if ((d = b[e]) && d === Object(d)) {
                g = d.cn; f = d.cv; k = d.ttl; if ("undefined" === typeof k || "" === k) k = Math.floor(v.getMaxCookieExpiresInMinutes() / 60 / 24); s = d.dmn || "." + document.domain.replace(/^www\./, ""); x = d.type; g && (f || "number" === typeof f) && ("var" !==
                    x && (k = parseInt(k, 10)) && !isNaN(k) && v.setCookie(g, f, 1440 * k, "/", s, !1), J.stuffed[g] = f)
            } b = c.uuid; w.isPopulatedString(b) && !w.isEmptyObject(m) && (h = m.path, "string" === typeof h && h.length || (h = "/"), e = parseInt(m.days, 10), isNaN(e) && (e = 100), v.setCookie(m.name || "aam_did", b, 1440 * e, h, m.domain || "." + document.domain.replace(/^www\./, ""), !0 === m.secure)); q || p.abortRequests || z.requestToProcess(c, a)
        }, makeRequestSrcData: function (c, a) {
            c.sids = w.removeEmptyArrayValues(c.sids || []); c.pdata = w.removeEmptyArrayValues(c.pdata || []);
            var b = p, h = b.platformParams, e = v.encodeAndBuildRequest(c.sids, ","), d = v.encodeAndBuildRequest(c.pdata, ","), f = (c.logdataArray || []).join("&"); delete c.logdataArray; var m = y.IS_HTTPS ? "https://" : "http://", s = b.declaredId.getDeclaredIdQueryString(), x = b.adms.instance ? b.adms.getCustomerIDsQueryString(b.adms.getCustomerIDs()) : "", n; n = []; var r, q, u, A; for (r in c) if (!(r in b.reservedKeys) && c.hasOwnProperty(r)) if (q = c[r], r = encodeURIComponent(r), q instanceof Array) for (u = 0, A = q.length; u < A; u++) n.push(r + "=" + encodeURIComponent(q[u]));
            else n.push(r + "=" + encodeURIComponent(q)); n = n.length ? "&" + n.join("&") : ""; e = "d_nsid=" + h.d_nsid + s + x + (e.length ? "&d_sid=" + e : "") + (d.length ? "&d_px=" + d : "") + (f.length ? "&d_ld=" + encodeURIComponent(f) : ""); h = "&d_rtbd=" + h.d_rtbd + "&d_jsonv=" + h.d_jsonv + "&d_dst=" + h.d_dst; m = m + g + ".demdex.net/event"; d = b = m + "?" + e + (b.useJSONP ? h + "&d_cb=" + (a || "") : "") + n; 2048 < b.length && (b = b.substring(0, 2048).substring(0, b.lastIndexOf("&"))); return {
                corsSrc: m + "?" + (O ? "testcors=1&d_nsid=" + k + "&" : "") + "_ts=" + (new Date).getTime(), src: b, originalSrc: d,
                corsPostData: e + h + n, isDeclaredIdCall: "" !== s
            }
        }, fireRequest: function (c) { if ("img" === c.tag) this.fireImage(c); else { var a = p.declaredId, a = a.declaredId.request || a.declaredId.init || {}, a = { dpid: a.dpid || "", dpuuid: a.dpuuid || "" }; "script" === c.tag ? this.fireScript(c, a) : "cors" === c.tag && this.fireCORS(c, a) } }, fireImage: function (c) {
            var a = p, d, h; a.abortRequests || (a.firing = !0, d = new Image(0, 0), a.sent.push(c), d.onload = function () { a.firing = !1; a.fired.push(c); a.num_of_img_responses++; a.registerRequest() }, h = function (h) {
                b = "imgAbortOrErrorHandler received the event of type " +
                    h.type; e.push(b); a.abortRequests = !0; a.firing = !1; a.errored.push(c); a.num_of_img_errors++; a.registerRequest()
            }, d.addEventListener ? (d.addEventListener("error", h, !1), d.addEventListener("abort", h, !1)) : d.attachEvent && (d.attachEvent("onerror", h), d.attachEvent("onabort", h)), d.src = c.src)
        }, fireScript: function (c, a) {
            var d = this, h = p, f, k, m = c.src, s = c.postCallbackFn, n = "function" === typeof s, r = c.internalCallbackName; h.abortRequests || (h.firing = !0, window[r] = function (d) {
                try {
                    d !== Object(d) && (d = {}); B && (z.ibsDeleted.push(d.ibs),
                        delete d.ibs); var f = c.callbackFn; h.firing = !1; h.fired.push(c); h.num_of_jsonp_responses++; f(d, a); n && s(d, a)
                } catch (t) { t.message = "DIL jsonp callback caught error with message " + t.message; b = t.message; e.push(b); t.filename = t.filename || "dil.js"; t.partner = g; DIL.errorModule.handleError(t); try { f({ error: t.name + "|" + t.message }, a), n && s({ error: t.name + "|" + t.message }, a) } catch (m) { } } finally { h.requestRemoval({ script: k, callbackName: r }), h.registerRequest() }
            }, M || F ? (h.firing = !1, h.requestRemoval({
                script: "no script created",
                callbackName: r
            })) : (k = document.createElement("script"), k.addEventListener && k.addEventListener("error", function (a) { h.requestRemoval({ script: k, callbackName: r }); b = "jsonp script tag error listener received the event of type " + a.type + " with src " + m; d.handleScriptError(b, c) }, !1), k.type = "text/javascript", k.src = m, f = DIL.variables.scriptNodeList[0], f.parentNode.insertBefore(k, f)), h.sent.push(c), h.declaredId.declaredId.request = null)
        }, fireCORS: function (c, a) {
            var d = this, h = p, f = this.corsMetadata.corsType, k = c.corsSrc,
                m = c.corsInstance, s = c.corsPostData, r = c.postCallbackFn, n = "function" === typeof r; if (!h.abortRequests && !R) {
                    h.firing = !0; try {
                        m.open("post", k, !0), "XMLHttpRequest" === f && (m.withCredentials = !0, m.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"), m.onreadystatechange = function () {
                            if (4 === this.readyState && 200 === this.status) a: {
                                var f; try { if (f = JSON.parse(this.responseText), f !== Object(f)) { d.handleCORSError(c, a, "Response is not JSON"); break a } } catch (k) {
                                    d.handleCORSError(c, a, "Error parsing response as JSON");
                                    break a
                                } B && (z.ibsDeleted.push(f.ibs), delete f.ibs); try { var m = c.callbackFn; h.firing = !1; h.fired.push(c); h.num_of_cors_responses++; m(f, a); n && r(f, a) } catch (s) { s.message = "DIL handleCORSResponse caught error with message " + s.message; b = s.message; e.push(b); s.filename = s.filename || "dil.js"; s.partner = g; DIL.errorModule.handleError(s); try { m({ error: s.name + "|" + s.message }, a), n && r({ error: s.name + "|" + s.message }, a) } catch (x) { } } finally { h.registerRequest() }
                            }
                        }), m.onerror = function () { d.handleCORSError(c, a, "onerror") }, m.ontimeout =
                            function () { d.handleCORSError(c, a, "ontimeout") }, m.send(s)
                    } catch (x) { this.handleCORSError(c, a, "try-catch") } h.sent.push(c); h.declaredId.declaredId.request = null
                }
        }, handleCORSError: function (c, a, b) { p.num_of_cors_errors++; p.corsErrorSources.push(b); "ontimeout" === b || F || (c.tag = "script", this.fireScript(c, a)) }, handleScriptError: function (c, a) { p.num_of_jsonp_errors++; this.handleRequestError(c, a) }, handleRequestError: function (c, a) { var b = p; e.push(c); b.abortRequests = !0; b.firing = !1; b.errored.push(a); b.registerRequest() }
    },
        w = { isValidPdata: function (c) { return c instanceof Array && this.removeEmptyArrayValues(c).length ? !0 : !1 }, isValidLogdata: function (c) { return !this.isEmptyObject(c) }, isEmptyObject: function (c) { if (c !== Object(c)) return !0; for (var a in c) if (c.hasOwnProperty(a)) return !1; return !0 }, removeEmptyArrayValues: function (c) { for (var a = 0, b = c.length, h, d = [], a = 0; a < b; a++) h = c[a], "undefined" !== typeof h && null !== h && "" !== h && d.push(h); return d }, isPopulatedString: function (c) { return "string" === typeof c && c.length } }, v = {
            addListener: function () {
                if (document.addEventListener) return function (c,
                    a, b) { c.addEventListener(a, function (c) { "function" === typeof b && b(c) }, !1) }; if (document.attachEvent) return function (c, a, b) { c.attachEvent("on" + a, function (c) { "function" === typeof b && b(c) }) }
            }(), convertObjectToKeyValuePairs: function (c, a, b) { var d = [], e, f; a || (a = "="); for (e in c) c.hasOwnProperty(e) && (f = c[e], "undefined" !== typeof f && null !== f && "" !== f && d.push(e + a + (b ? encodeURIComponent(f) : f))); return d }, encodeAndBuildRequest: function (a, b) { return this.map(a, function (a) { return encodeURIComponent(a) }).join(b) }, map: function (a,
                b) { if (Array.prototype.map) return a.map(b); if (void 0 === a || null === a) throw new TypeError; var d = Object(a), h = d.length >>> 0; if ("function" !== typeof b) throw new TypeError; for (var e = Array(h), f = 0; f < h; f++) f in d && (e[f] = b.call(b, d[f], f, d)); return e }, filter: function (a, b) { if (!Array.prototype.filter) { if (void 0 === a || null === a) throw new TypeError; var d = Object(a), h = d.length >>> 0; if ("function" !== typeof b) throw new TypeError; for (var e = [], f = 0; f < h; f++) if (f in d) { var g = d[f]; b.call(b, g, f, d) && e.push(g) } return e } return a.filter(b) },
            getCookie: function (a) { a += "="; var b = document.cookie.split(";"), d, h, e; d = 0; for (h = b.length; d < h; d++) { for (e = b[d]; " " === e.charAt(0);) e = e.substring(1, e.length); if (0 === e.indexOf(a)) return decodeURIComponent(e.substring(a.length, e.length)) } return null }, setCookie: function (a, b, d, e, f, g) { var k = new Date; d && (d *= 6E4); document.cookie = a + "=" + encodeURIComponent(b) + (d ? ";expires=" + (new Date(k.getTime() + d)).toUTCString() : "") + (e ? ";path=" + e : "") + (f ? ";domain=" + f : "") + (g ? ";secure" : "") }, extendArray: function (a, b) {
                return a instanceof
                    Array && b instanceof Array ? (Array.prototype.push.apply(a, b), !0) : !1
            }, extendObject: function (a, b, d) { var e; if (a === Object(a) && b === Object(b)) { for (e in b) !b.hasOwnProperty(e) || !w.isEmptyObject(d) && e in d || (a[e] = b[e]); return !0 } return !1 }, getMaxCookieExpiresInMinutes: function () { return ((new Date(y.COOKIE_MAX_EXPIRATION_DATE)).getTime() - (new Date).getTime()) / 1E3 / 60 }, getCookieField: function (a, b) {
                var d = this.getCookie(a), e = decodeURIComponent; if ("string" === typeof d) {
                    var d = d.split("|"), f, g; f = 0; for (g = d.length - 1; f < g; f++) if (e(d[f]) ===
                        b) return e(d[f + 1])
                } return null
            }, getDilCookieField: function (a) { return this.getCookieField(y.DIL_COOKIE_NAME, a) }, setCookieField: function (a, b, d) { var e = this.getCookie(a), f = !1, g = encodeURIComponent; b = g(b); d = g(d); if ("string" === typeof e) { var e = e.split("|"), k, g = 0; for (k = e.length - 1; g < k; g++) if (e[g] === b) { e[g + 1] = d; f = !0; break } f || (g = e.length, e[g] = b, e[g + 1] = d) } else e = [b, d]; this.setCookie(a, e.join("|"), this.getMaxCookieExpiresInMinutes(), "/", this.getDomain(), !1) }, setDilCookieField: function (a, b) {
                return this.setCookieField(y.DIL_COOKIE_NAME,
                    a, b)
            }, getDomain: function (a) { !a && window.location && (a = window.location.hostname); if (a) if (/^[0-9.]+$/.test(a)) a = ""; else { var b = a.split("."), d = b.length - 1, e = d - 1; 1 < d && 2 >= b[d].length && (2 === b[d - 1].length || 0 > ",DOMAIN_2_CHAR_EXCEPTIONS,".indexOf("," + b[d] + ",")) && e--; if (0 < e) for (a = ""; d >= e;) a = b[d] + (a ? "." : "") + a, d-- } return a }
        }; "error" === g && 0 === k && v.addListener(window, "load", function () { DIL.windowLoaded = !0 }); var S = !1, H = function () {
            S || (S = !0, p.registerRequest(), U(), q || p.abortRequests || z.attachIframe(), p.readyToRemove = !0,
                p.requestRemoval())
        }, U = function () { q || setTimeout(function () { N || p.firstRequestHasFired || ("function" === typeof I ? K.afterResult(I).submit() : K.submit()) }, DIL.constants.TIME_TO_DEFAULT_REQUEST) }; C = document; "error" !== g && (DIL.windowLoaded ? H() : "complete" !== C.readyState && "loaded" !== C.readyState ? v.addListener(window, "load", function () { DIL.windowLoaded = !0; H() }) : (DIL.windowLoaded = !0, H())); if ("error" !== g) try { DIL.xd.receiveMessage(function (a) { z.receiveMessage(a.data) }, z.getIframeHost(z.url)) } catch (V) { } p.declaredId.setDeclaredId(s,
            "init"); p.processVisitorAPI(); this.api = K; this.getStuffedVariable = function (a) { var b = J.stuffed[a]; b || "number" === typeof b || (b = v.getCookie(a)) || "number" === typeof b || (b = ""); return b }; this.validators = w; this.helpers = v; this.constants = y; this.log = e; T && (this.pendingRequest = u, this.requestController = p, this.setDestinationPublishingUrl = f, this.destinationPublishing = z, this.requestProcs = D, this.variables = J, this.callWindowLoadFunctions = H)
}, function () {
    var a = document, d; null == a.readyState && a.addEventListener && (a.readyState =
        "loading", a.addEventListener("DOMContentLoaded", d = function () { a.removeEventListener("DOMContentLoaded", d, !1); a.readyState = "complete" }, !1))
}(), DIL.extendStaticPropertiesAndMethods = function (a) { var d; if (a === Object(a)) for (d in a) a.hasOwnProperty(d) && (this[d] = a[d]) }, DIL.extendStaticPropertiesAndMethods({
    version: "6.10", jsonVersion: 1, constants: { TIME_TO_DEFAULT_REQUEST: 50 }, variables: { scriptNodeList: document.getElementsByTagName("script"), scriptsRemoved: [], callbacksRemoved: [] }, windowLoaded: !1, dils: {}, isAddedPostWindowLoad: function (a) {
        this.windowLoaded =
            "function" === typeof a ? !!a() : "boolean" === typeof a ? a : !0
    }, create: function (a) { try { return new DIL(a) } catch (d) { throw Error("Error in attempt to create DIL instance with DIL.create(): " + d.message); } }, registerDil: function (a, d, e) { d = d + "$" + e; d in this.dils || (this.dils[d] = a) }, getDil: function (a, d) { var e; "string" !== typeof a && (a = ""); d || (d = 0); e = a + "$" + d; return e in this.dils ? this.dils[e] : Error("The DIL instance with partner = " + a + " and containerNSID = " + d + " was not found") }, dexGetQSVars: function (a, d, e) {
        d = this.getDil(d,
            e); return d instanceof this ? d.getStuffedVariable(a) : ""
    }, xd: {
        postMessage: function (a, d, e) { var b = 1; d && (window.postMessage ? e.postMessage(a, d.replace(/([^:]+:\/\/[^\/]+).*/, "$1")) : d && (e.location = d.replace(/#.*$/, "") + "#" + +new Date + b++ + "&" + a)) }, receiveMessage: function (a, d) {
            var e; try {
                if (window.postMessage) if (a && (e = function (b) { if ("string" === typeof d && b.origin !== d || "[object Function]" === Object.prototype.toString.call(d) && !1 === d(b.origin)) return !1; a(b) }), window.addEventListener) window[a ? "addEventListener" :
                    "removeEventListener"]("message", e, !1); else window[a ? "attachEvent" : "detachEvent"]("onmessage", e)
            } catch (b) { }
        }
    }
}), DIL.errorModule = function () {
    var a = DIL.create({ partner: "error", containerNSID: 0, disableDestinationPublishingIframe: !0 }), d = { harvestererror: 14138, destpuberror: 14139, dpmerror: 14140, generalerror: 14137, error: 14137, noerrortypedefined: 15021, evalerror: 15016, rangeerror: 15017, referenceerror: 15018, typeerror: 15019, urierror: 15020 }, e = !1; return {
        activate: function () { e = !0 }, handleError: function (b) {
            if (!e) return "DIL error module has not been activated";
            b !== Object(b) && (b = {}); var f = b.name ? (b.name + "").toLowerCase() : "", g = []; b = { name: f, filename: b.filename ? b.filename + "" : "", partner: b.partner ? b.partner + "" : "no_partner", site: b.site ? b.site + "" : document.location.href, message: b.message ? b.message + "" : "" }; g.push(f in d ? d[f] : d.noerrortypedefined); a.api.pixels(g).logs(b).useImageRequest().submit(); return "DIL error report sent"
        }, pixelMap: d
    }
}(), DIL.tools = {}, DIL.modules = {
    helpers: {
        handleModuleError: function (a, d, e) {
            var b = ""; d = d || "Error caught in DIL module/submodule: ";
            a === Object(a) ? b = d + (a.message || "err has no message") : (b = d + "err is not a valid object", a = {}); a.message = b; e instanceof DIL && (a.partner = e.api.getPartner()); DIL.errorModule.handleError(a); return this.errorMessage = b
        }
    }
});
DIL.tools.getSearchReferrer = function (a, d) {
    var e = DIL.getDil("error"), b = DIL.tools.decomposeURI(a || document.referrer), f = "", g = "", k = { queryParam: "q" }; return (f = e.helpers.filter([d === Object(d) ? d : {}, { hostPattern: /aol\./ }, { hostPattern: /ask\./ }, { hostPattern: /bing\./ }, { hostPattern: /google\./ }, { hostPattern: /yahoo\./, queryParam: "p" }], function (a) { return !(!a.hasOwnProperty("hostPattern") || !b.hostname.match(a.hostPattern)) }).shift()) ? {
        valid: !0, name: b.hostname, keywords: (e.helpers.extendObject(k, f), g = k.queryPattern ?
            (f = ("" + b.search).match(k.queryPattern)) ? f[1] : "" : b.uriParams[k.queryParam], decodeURIComponent(g || "").replace(/\+|%20/g, " "))
    } : { valid: !1, name: "", keywords: "" }
};
DIL.tools.decomposeURI = function (a) { var d = DIL.getDil("error"), e = document.createElement("a"); e.href = a || document.referrer; return { hash: e.hash, host: e.host.split(":").shift(), hostname: e.hostname, href: e.href, pathname: e.pathname.replace(/^\//, ""), protocol: e.protocol, search: e.search, uriParams: function (a, e) { d.helpers.map(e.split("&"), function (d) { d = d.split("="); a[d.shift()] = d.shift() }); return a }({}, e.search.replace(/^(\/|\?)?|\/$/g, "")) } };
DIL.tools.getMetaTags = function () { var a = {}, d = document.getElementsByTagName("meta"), e, b, f, g, k; e = 0; for (f = arguments.length; e < f; e++) if (g = arguments[e], null !== g) for (b = 0; b < d.length; b++) if (k = d[b], k.name === g) { a[g] = k.content; break } return a };
DIL.modules.siteCatalyst = {
    dil: null, handle: DIL.modules.helpers.handleModuleError, init: function (a, d, e, b) {
        try {
            var f = this, g = { name: "DIL Site Catalyst Module Error" }, k = function (a) { g.message = a; DIL.errorModule.handleError(g); return a }; this.options = b === Object(b) ? b : {}; this.dil = null; if (d instanceof DIL) this.dil = d; else return k("dilInstance is not a valid instance of DIL"); g.partner = d.api.getPartner(); if (a !== Object(a)) return k("siteCatalystReportingSuite is not an object"); window.AppMeasurement_Module_DIL = a.m_DIL =
                function (a) {
                    var b = "function" === typeof a.m_i ? a.m_i("DIL") : this; if (b !== Object(b)) return k("m is not an object"); b.trackVars = f.constructTrackVars(e); b.d = 0; b.s = a; b._t = function () {
                        var a, b, d = "," + this.trackVars + ",", e = this.s, g, r = []; g = []; var n = {}, q = !1; if (e !== Object(e)) return k("Error in m._t function: s is not an object"); if (this.d) {
                            if ("function" === typeof e.foreachVar) e.foreachVar(function (a, b) { "undefined" !== typeof b && (n[a] = b, q = !0) }, this.trackVars); else {
                                if (!(e.va_t instanceof Array)) return k("Error in m._t function: s.va_t is not an array");
                                if (e.lightProfileID) (a = e.lightTrackVars) && (a = "," + a + "," + e.vl_mr + ","); else if (e.pe || e.linkType) a = e.linkTrackVars, e.pe && (b = e.pe.substring(0, 1).toUpperCase() + e.pe.substring(1), e[b] && (a = e[b].trackVars)), a && (a = "," + a + "," + e.vl_l + "," + e.vl_l2 + ","); if (a) { b = 0; for (r = a.split(","); b < r.length; b++) 0 <= d.indexOf("," + r[b] + ",") && g.push(r[b]); g.length && (d = "," + g.join(",") + ",") } g = 0; for (b = e.va_t.length; g < b; g++) a = e.va_t[g], 0 <= d.indexOf("," + a + ",") && "undefined" !== typeof e[a] && null !== e[a] && "" !== e[a] && (n[a] = e[a], q = !0)
                            } f.includeContextData(e,
                                n).store_populated && (q = !0); q && this.d.api.signals(n, "c_").submit()
                        }
                    }
                }; a.loadModule("DIL"); a.DIL.d = d; return g.message ? g.message : "DIL.modules.siteCatalyst.init() completed with no errors"
        } catch (q) { return this.handle(q, "DIL.modules.siteCatalyst.init() caught error with message ", this.dil) }
    }, constructTrackVars: function (a) {
        var d = [], e, b, f, g, k; if (a === Object(a)) {
            e = a.names; if (e instanceof Array && (f = e.length)) for (b = 0; b < f; b++) g = e[b], "string" === typeof g && g.length && d.push(g); a = a.iteratedNames; if (a instanceof Array &&
                (f = a.length)) for (b = 0; b < f; b++) if (e = a[b], e === Object(e) && (g = e.name, k = parseInt(e.maxIndex, 10), "string" === typeof g && g.length && !isNaN(k) && 0 <= k)) for (e = 0; e <= k; e++) d.push(g + e); if (d.length) return d.join(",")
        } return this.constructTrackVars({ names: "pageName channel campaign products events pe pev1 pev2 pev3".split(" "), iteratedNames: [{ name: "prop", maxIndex: 75 }, { name: "eVar", maxIndex: 250 }] })
    }, includeContextData: function (a, d) {
        var e = {}, b = !1; if (a.contextData === Object(a.contextData)) {
            var f = a.contextData, g = this.options.replaceContextDataPeriodsWith,
                k = this.options.filterFromContextVariables, q = {}, n, r, m, x; "string" === typeof g && g.length || (g = "_"); if (k instanceof Array) for (n = 0, r = k.length; n < r; n++) m = k[n], this.dil.validators.isPopulatedString(m) && (q[m] = !0); for (x in f) !f.hasOwnProperty(x) || q[x] || !(k = f[x]) && "number" !== typeof k || (x = ("contextData." + x).replace(/\./g, g), d[x] = k, b = !0)
        } e.store_populated = b; return e
    }
};
DIL.modules.GA = {
    submitUniversalAnalytics: function (a, d, e) { try { var b = a.getAll()[0], f = b[e || "b"].data.keys; a = {}; var g, k, q, n; g = 0; for (k = f.length; g < k; g++) q = f[g], n = b.get(q), "undefined" === typeof n || "function" === typeof n || n === Object(n) || /^_/.test(q) || /^&/.test(q) || (a[q] = n); d.api.signals(a, "c_").submit(); return a } catch (r) { return "Caught error with message: " + r.message } }, dil: null, arr: null, tv: null, errorMessage: "", defaultTrackVars: ["_setAccount", "_setCustomVar", "_addItem", "_addTrans", "_trackSocial"], defaultTrackVarsObj: null,
    signals: {}, hasSignals: !1, handle: DIL.modules.helpers.handleModuleError, init: function (a, d, e) {
        try {
            this.tv = this.arr = this.dil = null; this.errorMessage = ""; this.signals = {}; this.hasSignals = !1; var b = { name: "DIL GA Module Error" }, f = ""; d instanceof DIL ? (this.dil = d, b.partner = this.dil.api.getPartner()) : (f = "dilInstance is not a valid instance of DIL", b.message = f, DIL.errorModule.handleError(b)); a instanceof Array && a.length ? this.arr = a : (f = "gaArray is not an array or is empty", b.message = f, DIL.errorModule.handleError(b));
            this.tv = this.constructTrackVars(e); this.errorMessage = f
        } catch (g) { this.handle(g, "DIL.modules.GA.init() caught error with message ", this.dil) } finally { return this }
    }, constructTrackVars: function (a) {
        var d = [], e, b, f, g; if (this.defaultTrackVarsObj !== Object(this.defaultTrackVarsObj)) { f = this.defaultTrackVars; g = {}; e = 0; for (b = f.length; e < b; e++) g[f[e]] = !0; this.defaultTrackVarsObj = g } else g = this.defaultTrackVarsObj; if (a === Object(a)) {
            a = a.names; if (a instanceof Array && (b = a.length)) for (e = 0; e < b; e++) f = a[e], "string" === typeof f &&
                f.length && f in g && d.push(f); if (d.length) return d
        } return this.defaultTrackVars
    }, constructGAObj: function (a) { var d = {}; a = a instanceof Array ? a : this.arr; var e, b, f, g; e = 0; for (b = a.length; e < b; e++) f = a[e], f instanceof Array && f.length && (f = [], g = a[e], f instanceof Array && g instanceof Array && Array.prototype.push.apply(f, g), g = f.shift(), "string" === typeof g && g.length && (d[g] instanceof Array || (d[g] = []), d[g].push(f))); return d }, addToSignals: function (a, d) {
        if ("string" !== typeof a || "" === a || null == d || "" === d) return !1; this.signals[a] instanceof
            Array || (this.signals[a] = []); this.signals[a].push(d); return this.hasSignals = !0
    }, constructSignals: function () {
        var a = this.constructGAObj(), d = {
            _setAccount: function (a) { this.addToSignals("c_accountId", a) }, _setCustomVar: function (a, b, d) { "string" === typeof b && b.length && this.addToSignals("c_" + b, d) }, _addItem: function (a, b, d, e, f, g) {
                this.addToSignals("c_itemOrderId", a); this.addToSignals("c_itemSku", b); this.addToSignals("c_itemName", d); this.addToSignals("c_itemCategory", e); this.addToSignals("c_itemPrice", f); this.addToSignals("c_itemQuantity",
                    g)
            }, _addTrans: function (a, b, d, e, f, g, k, n) { this.addToSignals("c_transOrderId", a); this.addToSignals("c_transAffiliation", b); this.addToSignals("c_transTotal", d); this.addToSignals("c_transTax", e); this.addToSignals("c_transShipping", f); this.addToSignals("c_transCity", g); this.addToSignals("c_transState", k); this.addToSignals("c_transCountry", n) }, _trackSocial: function (a, b, d, e) {
                this.addToSignals("c_socialNetwork", a); this.addToSignals("c_socialAction", b); this.addToSignals("c_socialTarget", d); this.addToSignals("c_socialPagePath",
                    e)
            }
        }, e = this.tv, b, f, g, k, q, n; b = 0; for (f = e.length; b < f; b++) if (g = e[b], a.hasOwnProperty(g) && d.hasOwnProperty(g) && (n = a[g], n instanceof Array)) for (k = 0, q = n.length; k < q; k++) d[g].apply(this, n[k])
    }, submit: function () {
        try { if ("" !== this.errorMessage) return this.errorMessage; this.constructSignals(); return this.hasSignals ? (this.dil.api.signals(this.signals).submit(), "Signals sent: " + this.dil.helpers.convertObjectToKeyValuePairs(this.signals, "=", !0) + this.dil.log) : "No signals present" } catch (a) {
            return this.handle(a, "DIL.modules.GA.submit() caught error with message ",
                this.dil)
        }
    }, Stuffer: {
        LIMIT: 5, dil: null, cookieName: null, delimiter: null, errorMessage: "", handle: DIL.modules.helpers.handleModuleError, callback: null, v: function () { return !1 }, init: function (a, d, e) {
            try { this.callback = this.dil = null, this.errorMessage = "", a instanceof DIL ? (this.dil = a, this.v = this.dil.validators.isPopulatedString, this.cookieName = this.v(d) ? d : "aam_ga", this.delimiter = this.v(e) ? e : "|") : this.handle({ message: "dilInstance is not a valid instance of DIL" }, "DIL.modules.GA.Stuffer.init() error: ") } catch (b) {
                this.handle(b,
                    "DIL.modules.GA.Stuffer.init() caught error with message ", this.dil)
            } finally { return this }
        }, process: function (a) {
            var d, e, b, f, g, k; k = !1; var q = 1; if (a === Object(a) && (d = a.stuff) && d instanceof Array && (e = d.length)) for (a = 0; a < e; a++) if ((b = d[a]) && b === Object(b) && (f = b.cn, g = b.cv, f === this.cookieName && this.v(g))) { k = !0; break } if (k) {
                d = g.split(this.delimiter); "undefined" === typeof window._gaq && (window._gaq = []); b = window._gaq; a = 0; for (e = d.length; a < e && !(k = d[a].split("="), g = k[0], k = k[1], this.v(g) && this.v(k) && b.push(["_setCustomVar",
                    q++, g, k, 1]), q > this.LIMIT); a++); this.errorMessage = 1 < q ? "No errors - stuffing successful" : "No valid values to stuff"
            } else this.errorMessage = "Cookie name and value not found in json"; if ("function" === typeof this.callback) return this.callback()
        }, submit: function () {
            try { var a = this; if ("" !== this.errorMessage) return this.errorMessage; this.dil.api.afterResult(function (d) { a.process(d) }).submit(); return "DIL.modules.GA.Stuffer.submit() successful" } catch (d) {
                return this.handle(d, "DIL.modules.GA.Stuffer.submit() caught error with message ",
                    this.dil)
            }
        }
    }
};
DIL.modules.Peer39 = {
    aid: "", dil: null, optionals: null, errorMessage: "", calledBack: !1, script: null, scriptsSent: [], returnedData: [], handle: DIL.modules.helpers.handleModuleError, init: function (a, d, e) {
        try {
            this.dil = null; this.errorMessage = ""; this.calledBack = !1; this.optionals = e === Object(e) ? e : {}; e = { name: "DIL Peer39 Module Error" }; var b = [], f = ""; this.isSecurePageButNotEnabled(document.location.protocol) && (f = "Module has not been enabled for a secure page", b.push(f), e.message = f, DIL.errorModule.handleError(e)); d instanceof
                DIL ? (this.dil = d, e.partner = this.dil.api.getPartner()) : (f = "dilInstance is not a valid instance of DIL", b.push(f), e.message = f, DIL.errorModule.handleError(e)); "string" === typeof a && a.length ? this.aid = a : (f = "aid is not a string or is empty", b.push(f), e.message = f, DIL.errorModule.handleError(e)); this.errorMessage = b.join("\n")
        } catch (g) { this.handle(g, "DIL.modules.Peer39.init() caught error with message ", this.dil) } finally { return this }
    }, isSecurePageButNotEnabled: function (a) {
        return "https:" === a && !0 !== this.optionals.enableHTTPS ?
            !0 : !1
    }, constructSignals: function () { var a = this, d = this.constructScript(), e = DIL.variables.scriptNodeList[0]; window["afterFinished_" + this.aid] = function () { try { var b = a.processData(p39_KVP_Short("c_p", "|").split("|")); b.hasSignals && a.dil.api.signals(b.signals).submit() } catch (d) { } finally { a.calledBack = !0, "function" === typeof a.optionals.afterResult && a.optionals.afterResult() } }; e.parentNode.insertBefore(d, e); this.scriptsSent.push(d); return "Request sent to Peer39" }, processData: function (a) {
        var d, e, b, f, g = {}, k =
            !1; this.returnedData.push(a); if (a instanceof Array) for (d = 0, e = a.length; d < e; d++) b = a[d].split("="), f = b[0], b = b[1], f && isFinite(b) && !isNaN(parseInt(b, 10)) && (g[f] instanceof Array || (g[f] = []), g[f].push(b), k = !0); return { hasSignals: k, signals: g }
    }, constructScript: function () {
        var a = document.createElement("script"), d = this.optionals, e = d.scriptId, b = d.scriptSrc, d = d.scriptParams; a.id = "string" === typeof e && e.length ? e : "peer39ScriptLoader"; a.type = "text/javascript"; "string" === typeof b && b.length ? a.src = b : (a.src = document.location.protocol +
            "//stags.peer39.net/" + this.aid + "/trg_" + this.aid + ".js", "string" === typeof d && d.length && (a.src += "?" + d)); return a
    }, submit: function () { try { return "" !== this.errorMessage ? this.errorMessage : this.constructSignals() } catch (a) { return this.handle(a, "DIL.modules.Peer39.submit() caught error with message ", this.dil) } }
};

var mscomDil = DIL.create({
    partner: 'mscom',
    containerNSID: 0,
    secureDataCollection: false,
    disableDefaultRequest: true,
    visitorService: {
        namespace: 'EA76ADE95776D2EC7F000101@AdobeOrg'
    }
});

var meta = document.getElementsByTagName("meta");

for (index = 0; index < meta.length; ++index) {
    if (meta[index].name) {
        met_name = meta[index].name;
        met_value = meta[index].content;
        if (met_name.indexOf("ms.") > -1) {
            var msobject = new Object;
            met_name = "c_" + met_name;
            msobject[met_name] = met_value;
            mscomDil.api.signals(msobject, "");
        }

    }
}

mscomDil.api.submit();