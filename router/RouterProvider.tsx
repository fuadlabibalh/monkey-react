import { getBasename2, roleOrLevelCallback } from "./security/authorization/permitRouter";
import { ReactNode } from "react";
import { RouteObject, HashRouter } from "react-router-dom";
import {
	BrowserRouter,
	Route,
	Routes,
	RouteProps,
	RouterProps,
} from "react-router-dom";


export type RouterObjects = RouteObject & {
	index?: boolean;
	element?: ReactNode | JSX.Element;
	path?: string;
	level?: any;
	children?: RouterObjects[];
	permit?: boolean;
};

export interface MainRouters {
	index?: true;
	path?: string;
	element?: ReactNode;
	children?: MainRouters[];
}

function generateBaseRoutes(listRouter: MainRouters[]) {
	return listRouter.map((e: MainRouters, idx: number) => {
		if (e?.children!)
			return (
				<Route {...(e as RouterProps)} key={"r" + idx}>
					{generateBaseRoutes(e.children as MainRouters[])}
				</Route>
			);
		else return <Route {...(e as RouteProps)} key={"r" + idx} />;
	});
}

export interface BasenameRouter {
	basename: string;
	index?: boolean;
	authPath?: string;
	routers?: RouterObjects[];
}

export interface RouterProviderProps extends React.HTMLAttributes<HTMLDivElement> {
	routers: BasenameRouter[];
	isPermit: boolean;
	defaultPath?: string;
	levelOrRole?: roleOrLevelCallback
}

function RouterProvider({
	routers,
	isPermit,
	levelOrRole,
}: RouterProviderProps) {
	return (
		<BrowserRouter>
			<Routes>{generateBaseRoutes(getBasename2(routers, isPermit, levelOrRole) as MainRouters[])}</Routes>
		</BrowserRouter>
	);
}

export default RouterProvider;

export const BrowserRouterProvider = RouterProvider

export function HashRouterProvider({
	routers,
	isPermit,
	levelOrRole,
}: RouterProviderProps) {
	return (
		<HashRouter>
			<Routes>{generateBaseRoutes(getBasename2(routers, isPermit, levelOrRole) as MainRouters[])}</Routes>
		</HashRouter>
	);
}
