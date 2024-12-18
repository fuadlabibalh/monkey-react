import { jsx as _jsx } from "react/jsx-runtime";
import { createElement as _createElement } from "react";
import { getBasename2 } from "./security/authorization/permitRouter";
import { HashRouter } from "react-router-dom";
import { BrowserRouter, Route, Routes, } from "react-router-dom";
function generateBaseRoutes(listRouter) {
    return listRouter.map((e, idx) => {
        if (e?.children)
            return (_createElement(Route, { ...e, key: "r" + idx }, generateBaseRoutes(e.children)));
        else
            return _createElement(Route, { ...e, key: "r" + idx });
    });
}
function RouterProvider({ routers, isPermit, levelOrRole, }) {
    return (_jsx(BrowserRouter, { children: _jsx(Routes, { children: generateBaseRoutes(getBasename2(routers, isPermit, levelOrRole)) }) }));
}
export default RouterProvider;
export const BrowserRouterProvider = RouterProvider;
export function HashRouterProvider({ routers, isPermit, levelOrRole, }) {
    return (_jsx(HashRouter, { children: _jsx(Routes, { children: generateBaseRoutes(getBasename2(routers, isPermit, levelOrRole)) }) }));
}
