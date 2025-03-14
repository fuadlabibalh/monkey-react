import { getBaseRouters, roleOrLevelCallback } from "./security/authorization/permitRouter";
import { ReactNode, useMemo } from "react";
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
		if (e?.children!) {
			let eProps = e as unknown
			return (
				<Route {...(eProps as RouterProps)} key={"r" + idx}>
					{generateBaseRoutes(e.children as MainRouters[])}
				</Route>
			);
		}
		else return <Route {...(e as RouteProps)} key={"r" + idx} />;
	});
}

export interface BasenameRouter {
	basename: string;
	index?: boolean;
	authPath?: string;
	layout?: React.ComponentType<{ children: React.ReactNode }>;
	routers?: RouterObjects[];
}

export interface RouterProviderProps extends React.HTMLAttributes<HTMLDivElement> {
	routers: BasenameRouter[];
	isPermit: boolean;
	defaultPath?: string;
	layout?: React.ComponentType<{ children: React.ReactNode }>;
	levelOrRole?: roleOrLevelCallback
}

function RouterProvider({
	routers,
	isPermit,
	levelOrRole,
}: RouterProviderProps) {
	const { layout: Layout, routers: baserouters } = useMemo(() => getBaseRouters(routers, isPermit, levelOrRole), [routers, isPermit])
	return Layout!! ? (
		<Layout>
			<BrowserRouter>
				<Routes>
					{generateBaseRoutes(baserouters as MainRouters[])}
				</Routes>
			</BrowserRouter>
		</Layout>
	) : (
		<BrowserRouter>
			<Routes>
				{generateBaseRoutes(baserouters as MainRouters[])}
			</Routes>
		</BrowserRouter>
	)

}
export default RouterProvider;

export const BrowserRouterProvider = RouterProvider

export function HashRouterProvider({
	routers,
	isPermit,
	levelOrRole,
}: RouterProviderProps) {
	const { layout: Layout, routers: baserouters } = useMemo(() => getBaseRouters(routers, isPermit, levelOrRole), [routers, isPermit])
	return (
		<HashRouter>
			<Routes>
				{
					Layout!! ? (
						<Layout>
							{generateBaseRoutes(baserouters as MainRouters[])}
						</Layout>
					) : generateBaseRoutes(baserouters as MainRouters[])
				}
			</Routes>
		</HashRouter>
	);
}
