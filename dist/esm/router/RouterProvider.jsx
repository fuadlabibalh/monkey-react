import { getBasename2 } from "./security/authorization/permitRouter";
import { HashRouter } from "react-router-dom";
import { BrowserRouter, Route, Routes, } from "react-router-dom";
function generateBaseRoutes(listRouter) {
    return listRouter.map((e, idx) => {
        if (e?.children)
            return (<Route {...e} key={"r" + idx}>
					{generateBaseRoutes(e.children)}
				</Route>);
        else
            return <Route {...e} key={"r" + idx}/>;
    });
}
function RouterProvider({ routers, isPermit, levelOrRole, }) {
    return (<BrowserRouter>
			<Routes>{generateBaseRoutes(getBasename2(routers, isPermit, levelOrRole))}</Routes>
		</BrowserRouter>);
}
export default RouterProvider;
export const BrowserRouterProvider = RouterProvider;
export function HashRouterProvider({ routers, isPermit, levelOrRole, }) {
    return (<HashRouter>
			<Routes>{generateBaseRoutes(getBasename2(routers, isPermit, levelOrRole))}</Routes>
		</HashRouter>);
}
