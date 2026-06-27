globalThis.__nitro_main__ = import.meta.url;
import { a as FastResponse, n as HTTPError, r as defineLazyEventHandler, t as H3Core } from "./_libs/h3+rou3+srvx.mjs";
import { t as HookableCore } from "./_libs/hookable.mjs";
//#region #nitro-vite-setup
function lazyService(loader) {
	let promise, mod;
	return { fetch(req) {
		if (mod) return mod.fetch(req);
		if (!promise) promise = loader().then((_mod) => mod = _mod.default || _mod);
		return promise.then((mod) => mod.fetch(req));
	} };
}
var services = { ["ssr"]: lazyService(() => import("./_ssr/ssr.mjs")) };
globalThis.__nitro_vite_envs__ = services;
//#endregion
//#region #nitro/virtual/public-assets-data
var public_assets_data_default = {
	"/assets/agents-D_X4yzGS.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"11db-10MNQ+hxywYuSm/ueZdUgtrEFHs\"",
		"mtime": "2026-06-27T23:21:08.653Z",
		"size": 4571,
		"path": "../public/assets/agents-D_X4yzGS.js"
	},
	"/assets/analytics-DM2il-_h.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"14bb-wlC+rad65gXE+wg7hRlcvW1/Pcs\"",
		"mtime": "2026-06-27T23:21:08.653Z",
		"size": 5307,
		"path": "../public/assets/analytics-DM2il-_h.js"
	},
	"/assets/approvals-C5MNmFic.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1efd-dtWYXOItgH+DoiuVXpOL9YN4UbU\"",
		"mtime": "2026-06-27T23:21:08.654Z",
		"size": 7933,
		"path": "../public/assets/approvals-C5MNmFic.js"
	},
	"/assets/AreaChart-bF90_p-g.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"463c-lYkVT9Q0XMyHo9HpyvhWxnQrHPw\"",
		"mtime": "2026-06-27T23:21:08.652Z",
		"size": 17980,
		"path": "../public/assets/AreaChart-bF90_p-g.js"
	},
	"/assets/clients-Cr_SO4_0.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"217c-68XYtKArfkZPLs/8HNBHvejzR/c\"",
		"mtime": "2026-06-27T23:21:08.655Z",
		"size": 8572,
		"path": "../public/assets/clients-Cr_SO4_0.js"
	},
	"/assets/circle-x-Bm8v6TVC.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"cf-F/SJXd0IYo0UI82ZrTOE5W/3L6E\"",
		"mtime": "2026-06-27T23:21:08.655Z",
		"size": 207,
		"path": "../public/assets/circle-x-Bm8v6TVC.js"
	},
	"/assets/copilot-fEf7v6lv.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"164d-5ZSXplPDasr4NBIQNTadloU8qm4\"",
		"mtime": "2026-06-27T23:21:08.656Z",
		"size": 5709,
		"path": "../public/assets/copilot-fEf7v6lv.js"
	},
	"/assets/createLucideIcon-G1Dj9I4e.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"4a5-Tck1ncstYybTMJjlBrLc2T6CG7w\"",
		"mtime": "2026-06-27T23:21:08.656Z",
		"size": 1189,
		"path": "../public/assets/createLucideIcon-G1Dj9I4e.js"
	},
	"/assets/document-viewer-BS3LaXJo.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"3ec9-o3qCAKQFnzCRsOhLq2jRGkk9LhQ\"",
		"mtime": "2026-06-27T23:21:08.657Z",
		"size": 16073,
		"path": "../public/assets/document-viewer-BS3LaXJo.js"
	},
	"/assets/dashboard-BZn7cI-j.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"920b-83YJnr7KCce/X7qA/TaMrlUgfVE\"",
		"mtime": "2026-06-27T23:21:08.656Z",
		"size": 37387,
		"path": "../public/assets/dashboard-BZn7cI-j.js"
	},
	"/assets/download-DVPIYzCu.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"e8-QnwIIJukL8OTlK5gYkoxuFaQfTI\"",
		"mtime": "2026-06-27T23:21:08.657Z",
		"size": 232,
		"path": "../public/assets/download-DVPIYzCu.js"
	},
	"/assets/exceptions-ClWkbJ2Y.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"a01-YDTBcLUmZOpdllG2W/paftwgxr4\"",
		"mtime": "2026-06-27T23:21:08.657Z",
		"size": 2561,
		"path": "../public/assets/exceptions-ClWkbJ2Y.js"
	},
	"/assets/inbox-C20bWTGh.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2248-usvbrKD494Wdu4nb+SFsYSI0sok\"",
		"mtime": "2026-06-27T23:21:08.658Z",
		"size": 8776,
		"path": "../public/assets/inbox-C20bWTGh.js"
	},
	"/assets/invoices-CX2sqJ9p.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"e59-OIzmxLo2QP/7mIsRLCSvxr/CO0M\"",
		"mtime": "2026-06-27T23:21:08.658Z",
		"size": 3673,
		"path": "../public/assets/invoices-CX2sqJ9p.js"
	},
	"/assets/loader-circle-Crhp-Dwa.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"90-AkRtIorOEMc//rnqo6m9Fp6phUQ\"",
		"mtime": "2026-06-27T23:21:08.658Z",
		"size": 144,
		"path": "../public/assets/loader-circle-Crhp-Dwa.js"
	},
	"/assets/mail-CytzAS98.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"d5-FCB9Yx5cIrxhAJbxfSHaDxRSvys\"",
		"mtime": "2026-06-27T23:21:08.659Z",
		"size": 213,
		"path": "../public/assets/mail-CytzAS98.js"
	},
	"/assets/login-CFp9HR2x.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"12ea-NHq2c7slkYZ/2R95XZ7E0NqlCFk\"",
		"mtime": "2026-06-27T23:21:08.659Z",
		"size": 4842,
		"path": "../public/assets/login-CFp9HR2x.js"
	},
	"/assets/paperclip-DgEdwfgl.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"e9-WD+jwJ0fBf329gNlElcrVnV94mg\"",
		"mtime": "2026-06-27T23:21:08.660Z",
		"size": 233,
		"path": "../public/assets/paperclip-DgEdwfgl.js"
	},
	"/assets/plug-HYWM2JXG.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"11e-K5WUKrwccepnXzzb3shBsXaelfc\"",
		"mtime": "2026-06-27T23:21:08.660Z",
		"size": 286,
		"path": "../public/assets/plug-HYWM2JXG.js"
	},
	"/assets/plus-iHabRmCn.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"99-njjXX7NFtTL7RrkIz9UG/10Q4a4\"",
		"mtime": "2026-06-27T23:21:08.661Z",
		"size": 153,
		"path": "../public/assets/plus-iHabRmCn.js"
	},
	"/assets/refresh-cw-BukW42eS.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"141-m7bXVZpDq911+r9fCGRKdx5om3k\"",
		"mtime": "2026-06-27T23:21:08.661Z",
		"size": 321,
		"path": "../public/assets/refresh-cw-BukW42eS.js"
	},
	"/assets/rules-CuN28dET.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"11ff-fjla7QGVBEaEzxNT69c0iBXU2yc\"",
		"mtime": "2026-06-27T23:21:08.661Z",
		"size": 4607,
		"path": "../public/assets/rules-CuN28dET.js"
	},
	"/assets/scan-line-CKnqs1WG.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"460-MXuLRmCi80IhY+YU8mAtGhG2orY\"",
		"mtime": "2026-06-27T23:21:08.661Z",
		"size": 1120,
		"path": "../public/assets/scan-line-CKnqs1WG.js"
	},
	"/assets/LineChart-wP1AgdLl.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"5c108-bOS4f3ot/eQqQiXn3WWay339+9E\"",
		"mtime": "2026-06-27T23:21:08.652Z",
		"size": 377096,
		"path": "../public/assets/LineChart-wP1AgdLl.js"
	},
	"/assets/index-By_w88xV.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"5d725-RQiQhHIVZRl+SuxvXYBiqUs0nLM\"",
		"mtime": "2026-06-27T23:21:08.651Z",
		"size": 382757,
		"path": "../public/assets/index-By_w88xV.js"
	},
	"/assets/settings-2RSiQNiA.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1ac5-QXFpQ74ETgzIWVY97fR/tF2rZIY\"",
		"mtime": "2026-06-27T23:21:08.662Z",
		"size": 6853,
		"path": "../public/assets/settings-2RSiQNiA.js"
	},
	"/assets/shield-alert-BMe303Pw.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"161-/xnC5HrYeeLFLmw8AFeIDb5H82A\"",
		"mtime": "2026-06-27T23:21:08.662Z",
		"size": 353,
		"path": "../public/assets/shield-alert-BMe303Pw.js"
	},
	"/assets/trust-hfOn9aQC.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1655-SCOl09xWz1R7WFU4bfhiEgdI2a8\"",
		"mtime": "2026-06-27T23:21:08.663Z",
		"size": 5717,
		"path": "../public/assets/trust-hfOn9aQC.js"
	},
	"/assets/shield-check-CRE8vV3M.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"140-ugZz/PDcwDVeY/MZmW/484FB5UM\"",
		"mtime": "2026-06-27T23:21:08.663Z",
		"size": 320,
		"path": "../public/assets/shield-check-CRE8vV3M.js"
	},
	"/assets/ui-bits-C6TsRLHL.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"6b3e-df9eMY9LrqvTlgV95kor+u1eELg\"",
		"mtime": "2026-06-27T23:21:08.663Z",
		"size": 27454,
		"path": "../public/assets/ui-bits-C6TsRLHL.js"
	},
	"/assets/styles-B4D0UH7e.css": {
		"type": "text/css; charset=utf-8",
		"etag": "\"17a1c-5G+sVAdRHIw/MzAs2JW+A+gTaMA\"",
		"mtime": "2026-06-27T23:21:08.664Z",
		"size": 96796,
		"path": "../public/assets/styles-B4D0UH7e.css"
	},
	"/assets/zap-D2sy0Pw_.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"106-BgN1+tVwfFP53jK7cmWlGCVewf4\"",
		"mtime": "2026-06-27T23:21:08.664Z",
		"size": 262,
		"path": "../public/assets/zap-D2sy0Pw_.js"
	}
};
//#endregion
//#region #nitro/virtual/public-assets
var publicAssetBases = {};
function isPublicAssetURL(id = "") {
	if (public_assets_data_default[id]) return true;
	for (const base in publicAssetBases) if (id.startsWith(base)) return true;
	return false;
}
//#endregion
//#region node_modules/nitro/dist/runtime/internal/route-rules.mjs
var headers = ((m) => function headersRouteRule(event) {
	for (const [key, value] of Object.entries(m.options || {})) event.res.headers.set(key, value);
});
//#endregion
//#region #nitro/virtual/routing
var findRouteRules = /* @__PURE__ */ (() => {
	const $0 = [{
		name: "headers",
		route: "/assets/**",
		handler: headers,
		options: { "cache-control": "public, max-age=31536000, immutable" }
	}];
	return (m, p) => {
		let r = [];
		if (p.charCodeAt(p.length - 1) === 47) p = p.slice(0, -1) || "/";
		let s = p.split("/");
		if (s.length > 1) {
			if (s[1] === "assets") r.unshift({
				data: $0,
				params: { "_": s.slice(2).join("/") }
			});
		}
		return r;
	};
})();
var _lazy_omBDqV = defineLazyEventHandler(() => import("./_chunks/ssr-renderer.mjs"));
var findRoute = /* @__PURE__ */ (() => {
	const data = {
		route: "/**",
		handler: _lazy_omBDqV
	};
	return ((_m, p) => {
		return {
			data,
			params: { "_": p.slice(1) }
		};
	});
})();
[].filter(Boolean);
//#endregion
//#region node_modules/nitro/dist/runtime/internal/error/prod.mjs
var errorHandler = (error, event) => {
	const res = defaultHandler(error, event);
	return new FastResponse(typeof res.body === "string" ? res.body : JSON.stringify(res.body, null, 2), res);
};
function defaultHandler(error, event) {
	const unhandled = error.unhandled ?? !HTTPError.isError(error);
	const { status = 500, statusText = "" } = unhandled ? {} : error;
	if (status === 404) {
		const url = event.url || new URL(event.req.url);
		const baseURL = "/";
		if (/^\/[^/]/.test(baseURL) && !url.pathname.startsWith(baseURL)) return {
			status: 302,
			headers: new Headers({ location: `${baseURL}${url.pathname.slice(1)}${url.search}` })
		};
	}
	const headers = new Headers(unhandled ? {} : error.headers);
	headers.set("content-type", "application/json; charset=utf-8");
	return {
		status,
		statusText,
		headers,
		body: {
			error: true,
			...unhandled ? {
				status,
				unhandled: true
			} : typeof error.toJSON === "function" ? error.toJSON() : {
				status,
				statusText,
				message: error.message
			}
		}
	};
}
//#endregion
//#region #nitro/virtual/error-handler
var errorHandlers = [errorHandler];
async function error_handler_default(error, event) {
	for (const handler of errorHandlers) try {
		const response = await handler(error, event, { defaultHandler });
		if (response) return response;
	} catch (error) {
		console.error(error);
	}
}
//#endregion
//#region #nitro/virtual/app
function createNitroApp() {
	const captureError = (error, errorCtx) => {
		if (errorCtx?.event) {
			const errors = errorCtx.event.req.context?.nitro?.errors;
			if (errors) errors.push({
				error,
				context: errorCtx
			});
		}
	};
	const h3App = createH3App({ onError(error, event) {
		return error_handler_default(error, event);
	} });
	let appHandler = (req) => {
		req.context ||= {};
		req.context.nitro = req.context.nitro || { errors: [] };
		return h3App.fetch(req);
	};
	return {
		fetch: appHandler,
		h3: h3App,
		hooks: void 0,
		captureError
	};
}
function createH3App(config) {
	const h3App = new H3Core(config);
	h3App["~findRoute"] = (event) => findRoute(event.req.method, event.url.pathname);
	h3App["~getMiddleware"] = (event, route) => {
		const pathname = event.url.pathname;
		const method = event.req.method;
		const middleware = [];
		const routeRules = getRouteRules(method, pathname);
		event.context.routeRules = routeRules?.routeRules;
		if (routeRules?.routeRuleMiddleware.length) middleware.push(...routeRules.routeRuleMiddleware);
		if (route?.data?.middleware?.length) middleware.push(...route.data.middleware);
		return middleware;
	};
	return h3App;
}
//#endregion
//#region node_modules/nitro/dist/runtime/internal/app.mjs
var APP_ID = "default";
function useNitroApp() {
	let instance = useNitroApp._instance;
	if (instance) return instance;
	instance = useNitroApp._instance = createNitroApp();
	globalThis.__nitro__ = globalThis.__nitro__ || {};
	globalThis.__nitro__[APP_ID] = instance;
	return instance;
}
function useNitroHooks() {
	const nitroApp = useNitroApp();
	const hooks = nitroApp.hooks;
	if (hooks) return hooks;
	return nitroApp.hooks = new HookableCore();
}
function getRouteRules(method, pathname) {
	const m = findRouteRules(method, pathname);
	if (!m?.length) return { routeRuleMiddleware: [] };
	const routeRules = {};
	for (const layer of m) for (const rule of layer.data) {
		const currentRule = routeRules[rule.name];
		if (currentRule) {
			if (rule.options === false) {
				delete routeRules[rule.name];
				continue;
			}
			if (typeof currentRule.options === "object" && typeof rule.options === "object") currentRule.options = {
				...currentRule.options,
				...rule.options
			};
			else currentRule.options = rule.options;
			currentRule.route = rule.route;
			currentRule.params = {
				...currentRule.params,
				...layer.params
			};
		} else if (rule.options !== false) routeRules[rule.name] = {
			...rule,
			params: layer.params
		};
	}
	const middleware = [];
	const orderedRules = Object.values(routeRules).sort((a, b) => (a.handler?.order || 0) - (b.handler?.order || 0));
	for (const rule of orderedRules) {
		if (rule.options === false || !rule.handler) continue;
		middleware.push(rule.handler(rule));
	}
	return {
		routeRules,
		routeRuleMiddleware: middleware
	};
}
//#endregion
//#region node_modules/nitro/dist/presets/cloudflare/runtime/_module-handler.mjs
function createHandler(hooks) {
	const nitroApp = useNitroApp();
	const nitroHooks = useNitroHooks();
	return {
		async fetch(request, env, context) {
			globalThis.__env__ = env;
			augmentReq(request, {
				env,
				context
			});
			const ctxExt = {};
			const url = new URL(request.url);
			if (hooks.fetch) {
				const res = await hooks.fetch(request, env, context, url, ctxExt);
				if (res) return res;
			}
			return await nitroApp.fetch(request);
		},
		scheduled(controller, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:scheduled", {
				controller,
				env,
				context
			}) || Promise.resolve());
		},
		email(message, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:email", {
				message,
				event: message,
				env,
				context
			}) || Promise.resolve());
		},
		queue(batch, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:queue", {
				batch,
				event: batch,
				env,
				context
			}) || Promise.resolve());
		},
		tail(traces, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:tail", {
				traces,
				env,
				context
			}) || Promise.resolve());
		},
		trace(traces, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:trace", {
				traces,
				env,
				context
			}) || Promise.resolve());
		}
	};
}
function augmentReq(cfReq, ctx) {
	const req = cfReq;
	req.ip = cfReq.headers.get("cf-connecting-ip") || void 0;
	req.runtime ??= { name: "cloudflare" };
	req.runtime.cloudflare = {
		...req.runtime.cloudflare,
		...ctx
	};
	req.waitUntil = ctx.context?.waitUntil.bind(ctx.context);
}
//#endregion
//#region node_modules/nitro/dist/presets/cloudflare/runtime/cloudflare-module.mjs
var cloudflare_module_default = createHandler({ fetch(cfRequest, env, context, url) {
	if (env.ASSETS && isPublicAssetURL(url.pathname)) return env.ASSETS.fetch(cfRequest);
} });
//#endregion
export { cloudflare_module_default as default };
