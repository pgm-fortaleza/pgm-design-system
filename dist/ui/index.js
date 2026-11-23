import { Fragment as e, cloneElement as t, forwardRef as n, useEffect as r, useId as i, useRef as a, useState as o } from "react";
import { Fragment as s, jsx as c, jsxs as l } from "react/jsx-runtime";
var u = {
	button: "pgm-button-2ZuB7d",
	text: "pgm-text-IDK7tH",
	outlined: "pgm-outlined-jlrKyV",
	filled: "pgm-filled-inpPbv",
	tonal: "pgm-tonal-Seo7FI",
	elevated: "pgm-elevated-XOzEX6",
	small: "pgm-small-l39ohd",
	medium: "pgm-medium-KTxdkd",
	large: "pgm-large-6bsb72",
	round: "pgm-round-McmJ9S",
	square: "pgm-square-uZuq2k",
	iconOnly: "pgm-iconOnly-WCpTSh",
	fullWidth: "pgm-fullWidth-36oJTK",
	icon: "pgm-icon--43u5r",
	label: "pgm-label-UJ3Ztm",
	visuallyHidden: "pgm-visuallyHidden-uQvElJ"
}, d = {
	filled: u.filled,
	tonal: u.tonal,
	outlined: u.outlined,
	text: u.text,
	elevated: u.elevated
}, f = {
	small: u.small,
	medium: u.medium,
	large: u.large
}, p = n(function(e, t) {
	let { variant: n = "filled", size: r = "small", shape: i = "round", icon: a, trailingIcon: o, fullWidth: p = !1, disabled: m = !1, className: h, children: g, "aria-label": _, ...v } = e, y = g === void 0, b = [
		u.button,
		d[n],
		f[r],
		i === "square" ? u.square : u.round,
		y ? u.iconOnly : void 0,
		p ? u.fullWidth : void 0,
		h
	].filter(Boolean).join(" "), x = /* @__PURE__ */ l(s, { children: [
		a && /* @__PURE__ */ c("span", {
			className: u.icon,
			"aria-hidden": "true",
			children: a
		}),
		y ? /* @__PURE__ */ c("span", {
			className: u.visuallyHidden,
			children: _
		}) : /* @__PURE__ */ c("span", {
			className: u.label,
			children: g
		}),
		o && /* @__PURE__ */ c("span", {
			className: u.icon,
			"aria-hidden": "true",
			children: o
		})
	] });
	if ("href" in v && v.href !== void 0) {
		let { href: e, onClick: n, ...r } = v;
		return /* @__PURE__ */ c("a", {
			...r,
			"aria-label": y ? void 0 : _,
			ref: t,
			className: b,
			href: m ? void 0 : e,
			"aria-disabled": m || void 0,
			tabIndex: m ? -1 : r.tabIndex,
			onClick: m ? (e) => e.preventDefault() : n,
			children: x
		});
	}
	let { type: S = "button", ...C } = v;
	return /* @__PURE__ */ c("button", {
		...C,
		"aria-label": y ? void 0 : _,
		ref: t,
		type: S,
		className: b,
		disabled: m,
		children: x
	});
}), m = {
	tooltip: "pgm-tooltip-UA7H96",
	open: "pgm-open-cK0c-u",
	surface: "pgm-surface-X2ssZV",
	top: "pgm-top-m2tnnD",
	topStart: "pgm-topStart-q0BZdz",
	topEnd: "pgm-topEnd-ogUJkO",
	bottom: "pgm-bottom-9Twz48",
	bottomStart: "pgm-bottomStart-EiTttZ",
	bottomEnd: "pgm-bottomEnd-bEOrLB"
}, h = {
	top: m.top,
	"top-start": m.topStart,
	"top-end": m.topEnd,
	bottom: m.bottom,
	"bottom-start": m.bottomStart,
	"bottom-end": m.bottomEnd
};
function g({ children: e, text: n, placement: r = "top", describes: a = !0, className: s }) {
	let [u, d] = o(!1), f = i(), p = a ? [e.props["aria-describedby"], f].filter(Boolean).join(" ") : e.props["aria-describedby"], g = [
		m.tooltip,
		h[r],
		u ? m.open : void 0,
		s
	].filter(Boolean).join(" ");
	return /* @__PURE__ */ l("span", {
		className: g,
		onBlur: (e) => {
			e.currentTarget.contains(e.relatedTarget) || d(!1);
		},
		onFocus: () => d(!0),
		onKeyDown: (e) => {
			e.key === "Escape" && d(!1);
		},
		onMouseEnter: () => d(!0),
		onMouseLeave: () => d(!1),
		children: [t(e, { "aria-describedby": p || void 0 }), /* @__PURE__ */ c("span", {
			className: m.surface,
			id: f,
			role: "tooltip",
			"aria-hidden": !a || !u,
			children: n
		})]
	});
}
var _ = {
	iconButton: "pgm-iconButton-JAF-aL",
	standard: "pgm-standard-TKjxpO",
	outlined: "pgm-outlined-eT6Kl0",
	filled: "pgm-filled-DoiQ0A",
	tonal: "pgm-tonal--DwqBU",
	small: "pgm-small-1mgH-H",
	medium: "pgm-medium--YYLUS",
	large: "pgm-large-jZ1eKX",
	icon: "pgm-icon-2DDWye",
	visuallyHidden: "pgm-visuallyHidden-hf5qz8"
}, v = {
	standard: _.standard,
	filled: _.filled,
	tonal: _.tonal,
	outlined: _.outlined
}, y = {
	small: _.small,
	medium: _.medium,
	large: _.large
}, b = n(function(e, t) {
	let { icon: n, label: r, variant: i = "standard", size: a = "small", tooltip: o = !1, type: s = "button", className: u, ...d } = e, f = /* @__PURE__ */ l("button", {
		...d,
		ref: t,
		type: s,
		className: [
			_.iconButton,
			v[i],
			y[a],
			u
		].filter(Boolean).join(" "),
		children: [/* @__PURE__ */ c("span", {
			className: _.icon,
			"aria-hidden": "true",
			children: n
		}), /* @__PURE__ */ c("span", {
			className: _.visuallyHidden,
			children: r
		})]
	});
	return o ? /* @__PURE__ */ c(g, {
		text: r,
		describes: !1,
		placement: o === !0 ? "top" : o,
		children: f
	}) : f;
}), x = {
	dialog: "pgm-dialog-gyl5pF",
	enter: "pgm-enter-yI27Ma",
	small: "pgm-small-b9WfG0",
	medium: "pgm-medium-YLYCA2",
	large: "pgm-large-G6sAHU",
	surface: "pgm-surface-wj-OBm",
	header: "pgm-header-bdJRpy",
	icon: "pgm-icon-VHyTcF",
	title: "pgm-title-glVA6q",
	content: "pgm-content-eXA1D1",
	actions: "pgm-actions-JRD2KZ"
}, S = {
	small: x.small,
	medium: x.medium,
	large: x.large
};
function C({ open: e, onClose: t, title: n, icon: o, closeLabel: s, actions: u, headerActions: d, size: f = "medium", dismissible: p = !0, className: m, children: h }) {
	let g = a(null), _ = a(!1), v = i();
	return r(() => {
		let t = g.current;
		if (!t || (e && !t.open && t.showModal(), !e && t.open && t.close(), !e)) return;
		let { overflow: n } = document.body.style;
		return document.body.style.overflow = "hidden", () => {
			document.body.style.overflow = n;
		};
	}, [e]), /* @__PURE__ */ c("dialog", {
		ref: g,
		className: [
			x.dialog,
			S[f],
			m
		].filter(Boolean).join(" "),
		"aria-labelledby": n ? v : void 0,
		onCancel: (e) => {
			e.preventDefault(), p && t();
		},
		onMouseDown: (e) => {
			_.current = e.target === e.currentTarget;
		},
		onClick: (e) => {
			p && _.current && e.target === e.currentTarget && t(), _.current = !1;
		},
		children: e && /* @__PURE__ */ l("div", {
			className: x.surface,
			children: [
				(n || s || d) && /* @__PURE__ */ l("div", {
					className: x.header,
					children: [
						o && /* @__PURE__ */ c("span", {
							className: x.icon,
							"aria-hidden": "true",
							children: o
						}),
						n && /* @__PURE__ */ c("h2", {
							id: v,
							className: x.title,
							children: n
						}),
						d,
						s && /* @__PURE__ */ c(b, {
							label: s,
							onClick: t,
							icon: /* @__PURE__ */ c("svg", {
								viewBox: "0 0 24 24",
								width: "24",
								height: "24",
								fill: "currentColor",
								focusable: "false",
								children: /* @__PURE__ */ c("path", { d: "M6.4 19 5 17.6 10.6 12 5 6.4 6.4 5 12 10.6 17.6 5 19 6.4 13.4 12 19 17.6 17.6 19 12 13.4Z" })
							})
						})
					]
				}),
				/* @__PURE__ */ c("div", {
					className: x.content,
					children: h
				}),
				u && /* @__PURE__ */ c("div", {
					className: x.actions,
					children: u
				})
			]
		})
	});
}
var w = {
	rail: "pgm-rail-bvns5-",
	section: "pgm-section-9BctHN",
	sectionLabel: "pgm-sectionLabel-1jsZ5a",
	item: "pgm-item-XEXI9L",
	active: "pgm-active-U3hSUu",
	icon: "pgm-icon--hpb6P",
	label: "pgm-label-zCKyAC"
}, T = ({ children: e, ...t }) => /* @__PURE__ */ c("a", {
	...t,
	children: e
});
function E({ label: t, sections: n, onNavigate: r, renderLink: a = T, className: o }) {
	let u = i();
	return /* @__PURE__ */ c("nav", {
		"aria-label": t,
		className: [w.rail, o].filter(Boolean).join(" "),
		children: n.filter((e) => e.items.length > 0).map((t) => {
			let n = `${u}-${t.key}`;
			return /* @__PURE__ */ l("div", {
				role: "group",
				"aria-labelledby": n,
				className: w.section,
				children: [/* @__PURE__ */ c("span", {
					id: n,
					className: w.sectionLabel,
					children: t.label
				}), t.items.map((t) => /* @__PURE__ */ c(e, { children: a({
					href: t.href,
					className: [w.item, t.active ? w.active : void 0].filter(Boolean).join(" "),
					"aria-current": t.active ? "page" : void 0,
					onClick: r ? () => r() : void 0,
					children: /* @__PURE__ */ l(s, { children: [/* @__PURE__ */ c("span", {
						"aria-hidden": "true",
						className: `material-symbols-sharp ${w.icon}`,
						children: t.icon
					}), /* @__PURE__ */ c("span", {
						className: w.label,
						children: t.label
					})] })
				}) }, t.key))]
			}, t.key);
		})
	});
}
var D = {
	pill: "pgm-pill-8q-5Aq",
	selected: "pgm-selected-gOqDPh",
	check: "pgm-check-qPvXeu",
	label: "pgm-label-96-kku"
}, O = n(function(e, t) {
	let { selected: n, onChange: r, onClick: i, type: a = "button", className: o, children: s, ...u } = e;
	return /* @__PURE__ */ l("button", {
		...u,
		ref: t,
		type: a,
		"aria-pressed": n,
		className: [
			D.pill,
			n ? D.selected : void 0,
			o
		].filter(Boolean).join(" "),
		onClick: (e) => {
			i?.(e), e.defaultPrevented || r(!n);
		},
		children: [n && /* @__PURE__ */ c("svg", {
			className: D.check,
			viewBox: "0 0 24 24",
			"aria-hidden": "true",
			focusable: "false",
			children: /* @__PURE__ */ c("path", { d: "M9.55 18 3.85 12.3l1.43-1.43 4.27 4.28 9.17-9.18 1.43 1.43Z" })
		}), /* @__PURE__ */ c("span", {
			className: D.label,
			children: s
		})]
	});
}), k = {
	skeleton: "pgm-skeleton-CB4uFW",
	pulse: "pgm-pulse-8RWFnB",
	text: "pgm-text--A8IFh",
	rect: "pgm-rect-do1uRo",
	circle: "pgm-circle-DYcl8F"
}, A = {
	text: k.text,
	rect: k.rect,
	circle: k.circle
};
function j({ shape: e = "text", width: t, height: n, className: r }) {
	return /* @__PURE__ */ c("span", {
		"aria-hidden": "true",
		className: [
			k.skeleton,
			A[e],
			r
		].filter(Boolean).join(" "),
		style: {
			width: t,
			height: n
		}
	});
}
var M = {
	region: "pgm-region-Y66iVb",
	snackbar: "pgm-snackbar-I-JX2X",
	enter: "pgm-enter-6rLKDE",
	message: "pgm-message-Xwrtgt"
};
// src/components/Snackbar/Snackbar.tsx
function N({ message: e, onClose: t, duration: n = 4e3 }) {
	return r(() => {
		if (!e) return;
		let r = window.setTimeout(t, n);
		return () => window.clearTimeout(r);
	}, [
		e,
		n,
		t
	]), /* @__PURE__ */ c("div", {
		className: M.region,
		role: "status",
		"aria-live": "polite",
		children: e && /* @__PURE__ */ c("div", {
			className: M.snackbar,
			children: /* @__PURE__ */ c("span", {
				className: M.message,
				children: e
			})
		})
	});
}
var P = {
	tag: "pgm-tag-PW9rmB",
	dot: "pgm-dot-3stUL1",
	success: "pgm-success-iYRmcW",
	warning: "pgm-warning-qwxvaw",
	error: "pgm-error-fUOr0Y",
	info: "pgm-info-NJ1r0x",
	secondary: "pgm-secondary-3diook",
	neutral: "pgm-neutral-UKiuwX"
}, F = {
	success: P.success,
	warning: P.warning,
	error: P.error,
	info: P.info,
	secondary: P.secondary,
	neutral: P.neutral
};
function I({ tone: e = "neutral", dot: t = !0, className: n, children: r, ...i }) {
	return /* @__PURE__ */ l("span", {
		...i,
		className: [
			P.tag,
			F[e],
			n
		].filter(Boolean).join(" "),
		children: [t && /* @__PURE__ */ c("span", {
			"aria-hidden": "true",
			className: P.dot
		}), r]
	});
}
var L = {
	container: "pgm-container-Kb-5qP",
	table: "pgm-table-Dkosn-",
	headerCell: "pgm-headerCell-vZciRs",
	row: "pgm-row-DD8KmZ",
	cell: "pgm-cell-nJrDKD",
	alignStart: "pgm-alignStart-65i5rJ",
	alignCenter: "pgm-alignCenter-YiUQyx",
	alignEnd: "pgm-alignEnd-Qro5FG",
	compactList: "pgm-compactList-Rt-SLd",
	compactItem: "pgm-compactItem-fwUE2T",
	empty: "pgm-empty-O1nyDu",
	visuallyHidden: "pgm-visuallyHidden-R8taXi",
	hideOnCompact: "pgm-hideOnCompact-WtFeDs",
	pagination: "pgm-pagination-xnrjkm",
	paginationRange: "pgm-paginationRange-11i1Wn"
}, R = {
	start: L.alignStart,
	center: L.alignCenter,
	end: L.alignEnd
}, z = (e) => Array.from({ length: e }, (e, t) => t);
function B({ caption: e, columns: t, rows: n, rowKey: r, loading: i = !1, loadingRows: a = 5, emptyState: o, renderCompactRow: s, className: u }) {
	let d = !i && n.length === 0;
	return /* @__PURE__ */ l("div", {
		className: [L.container, u].filter(Boolean).join(" "),
		"aria-busy": i,
		children: [
			/* @__PURE__ */ l("table", {
				className: [L.table, s ? L.hideOnCompact : void 0].filter(Boolean).join(" "),
				children: [
					/* @__PURE__ */ c("caption", {
						className: L.visuallyHidden,
						children: e
					}),
					/* @__PURE__ */ c("thead", { children: /* @__PURE__ */ c("tr", { children: t.map((e) => /* @__PURE__ */ c("th", {
						scope: "col",
						className: `${L.headerCell} ${R[e.align ?? "start"]}`,
						style: e.width ? { width: e.width } : void 0,
						children: /* @__PURE__ */ c("span", {
							className: e.srOnlyHeader ? L.visuallyHidden : void 0,
							children: e.header
						})
					}, e.key)) }) }),
					/* @__PURE__ */ l("tbody", { children: [i && z(a).map((e) => /* @__PURE__ */ c("tr", {
						className: L.row,
						children: t.map((e) => /* @__PURE__ */ c("td", {
							className: L.cell,
							children: /* @__PURE__ */ c(j, {})
						}, e.key))
					}, `skeleton-${e}`)), !i && n.map((e) => /* @__PURE__ */ c("tr", {
						className: L.row,
						children: t.map((t) => /* @__PURE__ */ c("td", {
							className: `${L.cell} ${R[t.align ?? "start"]}`,
							children: t.render(e)
						}, t.key))
					}, r(e)))] })
				]
			}),
			s && /* @__PURE__ */ l("ul", {
				className: L.compactList,
				"aria-label": e,
				children: [i && z(a).map((e) => /* @__PURE__ */ l("li", {
					className: L.compactItem,
					children: [/* @__PURE__ */ c(j, {}), /* @__PURE__ */ c(j, { width: "50%" })]
				}, `skeleton-${e}`)), !i && n.map((e) => /* @__PURE__ */ c("li", {
					className: L.compactItem,
					children: s(e)
				}, r(e)))]
			}),
			i && /* @__PURE__ */ c("span", {
				className: L.visuallyHidden,
				role: "status",
				children: e
			}),
			d && o && /* @__PURE__ */ c("div", {
				className: L.empty,
				children: o
			})
		]
	});
}
// src/components/Table/Pagination.tsx
var V = (e, t, n) => `${e}–${t} de ${n}`, H = (e) => /* @__PURE__ */ c("svg", {
	viewBox: "0 0 24 24",
	width: "24",
	height: "24",
	fill: "currentColor",
	focusable: "false",
	children: /* @__PURE__ */ c("path", { d: e })
});
function U({ page: e, perPage: t, total: n, onChange: r, disabled: i = !1, label: a = "Paginação", previousLabel: o = "Página anterior", nextLabel: s = "Próxima página", formatRange: u = V }) {
	if (n <= t) return null;
	let d = Math.ceil(n / t), f = (e - 1) * t + 1, p = Math.min(e * t, n);
	return /* @__PURE__ */ l("nav", {
		className: L.pagination,
		"aria-label": a,
		children: [
			/* @__PURE__ */ c("span", {
				className: L.paginationRange,
				"aria-live": "polite",
				children: u(f, p, n)
			}),
			/* @__PURE__ */ c(b, {
				label: o,
				tooltip: !0,
				disabled: i || e <= 1,
				onClick: () => r(e - 1),
				icon: H("M14 18 8 12l6-6 1.4 1.4-4.6 4.6 4.6 4.6Z")
			}),
			/* @__PURE__ */ c(b, {
				label: s,
				tooltip: !0,
				disabled: i || e >= d,
				onClick: () => r(e + 1),
				icon: H("M12.6 12 8 7.4 9.4 6l6 6-6 6L8 16.6Z")
			})
		]
	});
}
export { p as Button, C as Dialog, b as IconButton, E as NavigationRail, U as Pagination, O as Pill, j as Skeleton, N as Snackbar, I as StatusTag, B as Table, g as Tooltip };

//# sourceMappingURL=index.js.map