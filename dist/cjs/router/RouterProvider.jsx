"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BrowserRouterProvider = void 0;
exports.HashRouterProvider = HashRouterProvider;
const permitRouter_1 = require("./security/authorization/permitRouter");
const react_router_dom_1 = require("react-router-dom");
const react_router_dom_2 = require("react-router-dom");
function generateBaseRoutes(listRouter) {
    return listRouter.map((e, idx) => {
        if (e?.children)
            return (<react_router_dom_2.Route {...e} key={"r" + idx}>
					{generateBaseRoutes(e.children)}
				</react_router_dom_2.Route>);
        else
            return <react_router_dom_2.Route {...e} key={"r" + idx}/>;
    });
}
function RouterProvider({ routers, isPermit, levelOrRole, }) {
    return (<react_router_dom_2.BrowserRouter>
			<react_router_dom_2.Routes>{generateBaseRoutes((0, permitRouter_1.getBasename2)(routers, isPermit, levelOrRole))}</react_router_dom_2.Routes>
		</react_router_dom_2.BrowserRouter>);
}
exports.default = RouterProvider;
exports.BrowserRouterProvider = RouterProvider;
function HashRouterProvider({ routers, isPermit, levelOrRole, }) {
    return (<react_router_dom_1.HashRouter>
			<react_router_dom_2.Routes>{generateBaseRoutes((0, permitRouter_1.getBasename2)(routers, isPermit, levelOrRole))}</react_router_dom_2.Routes>
		</react_router_dom_1.HashRouter>);
}
