"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BrowserRouterProvider = void 0;
exports.HashRouterProvider = HashRouterProvider;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const permitRouter_1 = require("./security/authorization/permitRouter");
const react_router_dom_1 = require("react-router-dom");
const react_router_dom_2 = require("react-router-dom");
function generateBaseRoutes(listRouter) {
    return listRouter.map((e, idx) => {
        if (e?.children)
            return ((0, react_1.createElement)(react_router_dom_2.Route, { ...e, key: "r" + idx }, generateBaseRoutes(e.children)));
        else
            return (0, react_1.createElement)(react_router_dom_2.Route, { ...e, key: "r" + idx });
    });
}
function RouterProvider({ routers, isPermit, levelOrRole, }) {
    return ((0, jsx_runtime_1.jsx)(react_router_dom_2.BrowserRouter, { children: (0, jsx_runtime_1.jsx)(react_router_dom_2.Routes, { children: generateBaseRoutes((0, permitRouter_1.getBasename2)(routers, isPermit, levelOrRole)) }) }));
}
exports.default = RouterProvider;
exports.BrowserRouterProvider = RouterProvider;
function HashRouterProvider({ routers, isPermit, levelOrRole, }) {
    return ((0, jsx_runtime_1.jsx)(react_router_dom_1.HashRouter, { children: (0, jsx_runtime_1.jsx)(react_router_dom_2.Routes, { children: generateBaseRoutes((0, permitRouter_1.getBasename2)(routers, isPermit, levelOrRole)) }) }));
}
