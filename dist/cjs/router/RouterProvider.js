"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BrowserRouterProvider = void 0;
exports.HashRouterProvider = HashRouterProvider;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var permitRouter_1 = require("./security/authorization/permitRouter");
var react_2 = require("react");
var react_router_dom_1 = require("react-router-dom");
var react_router_dom_2 = require("react-router-dom");
function generateBaseRoutes(listRouter) {
    return listRouter.map(function (e, idx) {
        if (e === null || e === void 0 ? void 0 : e.children) {
            var eProps = e;
            return ((0, react_1.createElement)(react_router_dom_2.Route, __assign({}, eProps, { key: "r" + idx }), generateBaseRoutes(e.children)));
        }
        else
            return (0, react_1.createElement)(react_router_dom_2.Route, __assign({}, e, { key: "r" + idx }));
    });
}
function RouterProvider(_a) {
    var routers = _a.routers, isPermit = _a.isPermit, levelOrRole = _a.levelOrRole;
    var _b = (0, react_2.useMemo)(function () { return (0, permitRouter_1.getBaseRouters)(routers, isPermit, levelOrRole); }, [routers, isPermit]), Layout = _b.layout, baserouters = _b.routers;
    return Layout ? ((0, jsx_runtime_1.jsx)(Layout, { children: (0, jsx_runtime_1.jsx)(react_router_dom_2.BrowserRouter, { children: (0, jsx_runtime_1.jsx)(react_router_dom_2.Routes, { children: generateBaseRoutes(baserouters) }) }) })) : ((0, jsx_runtime_1.jsx)(react_router_dom_2.BrowserRouter, { children: (0, jsx_runtime_1.jsx)(react_router_dom_2.Routes, { children: generateBaseRoutes(baserouters) }) }));
}
exports.default = RouterProvider;
exports.BrowserRouterProvider = RouterProvider;
function HashRouterProvider(_a) {
    var routers = _a.routers, isPermit = _a.isPermit, levelOrRole = _a.levelOrRole;
    var _b = (0, react_2.useMemo)(function () { return (0, permitRouter_1.getBaseRouters)(routers, isPermit, levelOrRole); }, [routers, isPermit]), Layout = _b.layout, baserouters = _b.routers;
    return ((0, jsx_runtime_1.jsx)(react_router_dom_1.HashRouter, { children: (0, jsx_runtime_1.jsx)(react_router_dom_2.Routes, { children: Layout ? ((0, jsx_runtime_1.jsx)(Layout, { children: generateBaseRoutes(baserouters) })) : generateBaseRoutes(baserouters) }) }));
}
//# sourceMappingURL=RouterProvider.js.map