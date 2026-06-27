import { i as __toESM } from "../_runtime.mjs";
import { a as require_jsx_runtime, o as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { a as useAuth } from "./auth-context-rnFr6IQp.mjs";
import { v as useRouter } from "../_libs/@tanstack/react-router+[...].mjs";
import { F as Lock, I as LoaderCircle, N as Mail, it as ArrowRight } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/login-lU6LRp6a.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function LoginPage() {
	const { login, register } = useAuth();
	const router = useRouter();
	const [isLogin, setIsLogin] = (0, import_react.useState)(true);
	const [email, setEmail] = (0, import_react.useState)("");
	const [password, setPassword] = (0, import_react.useState)("");
	const [fullName, setFullName] = (0, import_react.useState)("");
	const [loading, setLoading] = (0, import_react.useState)(false);
	const [error, setError] = (0, import_react.useState)("");
	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!email || !password || !isLogin && !fullName) {
			setError("Please fill in all fields.");
			return;
		}
		setError("");
		setLoading(true);
		try {
			if (isLogin) await login(email, password);
			else await register(email, password, fullName);
			setTimeout(() => {
				router.navigate({ to: "/dashboard" });
			}, 500);
		} catch (err) {
			setError(err?.message || "Invalid credentials. Please try again.");
			setLoading(false);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-background text-foreground flex items-center justify-center relative overflow-hidden px-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-[color:var(--primary)]/10 blur-[100px] pointer-events-none" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-[color:var(--ai)]/10 blur-[100px] pointer-events-none" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "w-full max-w-md",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "text-center mb-10",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "h-14 w-14 mx-auto rounded-2xl grid place-items-center mb-6 shadow-xl",
							style: { background: "var(--gradient-aurora)" },
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-white text-2xl font-bold",
								children: "A"
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "text-3xl font-bold tracking-tight mb-2",
							children: "Welcome"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-muted-foreground text-sm",
							children: isLogin ? "Sign in to access the Aurora TIA platform." : "Create a new account to get started."
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					onSubmit: handleSubmit,
					className: "glass p-8 rounded-3xl border border-border/50 shadow-2xl relative z-10",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex bg-muted p-1 rounded-xl mb-6",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => {
									setIsLogin(true);
									setError("");
								},
								className: `flex-1 py-2 text-sm font-medium rounded-lg transition ${isLogin ? "bg-background shadow text-foreground" : "text-muted-foreground hover:text-foreground"}`,
								children: "Log In"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => {
									setIsLogin(false);
									setError("");
								},
								className: `flex-1 py-2 text-sm font-medium rounded-lg transition ${!isLogin ? "bg-background shadow text-foreground" : "text-muted-foreground hover:text-foreground"}`,
								children: "Register"
							})]
						}),
						error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mb-6 p-3 rounded-xl bg-destructive/10 border border-destructive/20 text-destructive text-sm font-medium text-center",
							children: error
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-5",
							children: [
								!isLogin && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
										className: "text-sm font-medium",
										children: "Full Name"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "relative",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											type: "text",
											value: fullName,
											onChange: (e) => setFullName(e.target.value),
											className: "w-full h-12 px-4 rounded-xl bg-background border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition text-sm",
											placeholder: "John Doe",
											required: true
										})
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
										className: "text-sm font-medium",
										children: "Email Address"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "relative",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mail, { className: "absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											type: "email",
											value: email,
											onChange: (e) => setEmail(e.target.value),
											className: "w-full h-12 pl-11 pr-4 rounded-xl bg-background border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition text-sm",
											placeholder: "name@company.com",
											required: true
										})]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
										className: "text-sm font-medium",
										children: "Password"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "relative",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lock, { className: "absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											type: "password",
											value: password,
											onChange: (e) => setPassword(e.target.value),
											className: "w-full h-12 pl-11 pr-4 rounded-xl bg-background border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition text-sm",
											placeholder: "••••••••",
											required: true
										})]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "submit",
									disabled: loading,
									className: "w-full h-12 mt-4 rounded-xl bg-primary text-primary-foreground font-semibold text-sm transition hover-glow flex items-center justify-center gap-2 disabled:opacity-70",
									children: loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-5 w-5 animate-spin" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
										isLogin ? "Log In" : "Register",
										" ",
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-4 w-4" })
									] })
								})
							]
						})
					]
				})]
			})
		]
	});
}
//#endregion
export { LoginPage as component };
