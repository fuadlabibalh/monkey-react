import { RouterObjects } from "../../RouterProvider";
import { BasenameRouter } from "../../RouterProvider";
import { Navigate } from "react-router-dom";

/**
 *
 * @param routers @type {RouterObjects[]}
 * @param isPermit @type {boolean}
 * @param defaultPath @type {string}
 * @param levelOrLevel @type {roleOrLevelCallback}
 * @returns routerbase for lazy loader
 */

export interface roleOrLevelCallback {
	(child: RouterObjects): boolean;
}

export function getBasename(
	routers: BasenameRouter[],
	isPermit?: boolean,
	levelOrLevel?: roleOrLevelCallback
): RouterObjects[] {
	// checking cannot use char "/" for define default path

	// check browser location for get sub path and matching with basename
	let [_, basename] = window.location.pathname?.split("/");
	let baserouters = routers.find((e) => e.index === true);
	if (basename!!) {
		// set router basename
		baserouters = routers.find((e) => e.basename === basename);
		// set router defaultpath if not found router basename with browser router
		// if (!baserouters && defaultPath!!) {
		//   baserouters = routers.find((e) => e.basename === defaultPath);
		// }
	}
	// set default baseroute when not any basename from browser location
	// else if (defaultPath!!) {
	//   baserouters = routers.find((e) => e.basename === defaultPath);
	// }

	let tempRouters: RouterObjects[] = baserouters?.routers as RouterObjects[];

	let result: RouterObjects[] = [];
	// remap router with basename prefix like "/v2"+"/path"
	for (let i = 0; i < tempRouters?.length; i++) {
		let el = tempRouters[i];

		let temp: RouterObjects = {
			...el,
			...(el.path ? { path: `/${baserouters?.basename}/${el?.path}` } : {}),
			...(!el.permit ? { permit: false } : { permit: el?.permit }),
		};
		// create default navigation when permit is false with matching with field permit & create index router
		let typeEl: any = temp?.element?.valueOf();
		if (
			!isPermit &&
			!temp?.permit &&
			temp?.index &&
			typeEl?.type?.name === "Navigate"
		) {
			temp = {
				index: true,
				element: (
					<Navigate
						to={`/${baserouters?.basename}/${baserouters?.authPath!}`}
					/>
				),
			};
			result.push({ ...temp });
		}
		// add all router without permit
		else if (!isPermit && !temp?.permit) {
			result.push({ ...temp });
		}
		// add all router if permit is true
		if (isPermit) {
			if (
				temp?.permit &&
				typeof levelOrLevel === "function" &&
				Array.isArray(temp.children) &&
				!temp.index
			) {
				let child: RouterObjects[] = [
					temp.children?.find((e) => e?.index === true) as RouterObjects,
				];
				let filter = filterLevelOrRole(temp?.children, levelOrLevel);
				child = [child[0], ...filter];
				temp.children = child;
			}
			result.push({ ...temp });
		}
	}
	// create prefix basename router to navigate default or index router
	result.unshift({
		path: baserouters?.basename,
		element: result.find((e) => e.index === true)?.element,
	});
	// create default navigation when not found router or navigate to default not found router if any define path "[*]"
	let routePath = window.location.pathname;
	// check router is define router return to navigate to index
	let checkinRouterDef = tempRouters.filter((e) => {
		let temp = e.path?.split("/")[0];
		return routePath.includes(temp!);
	})[0];
	// cehck default "*" router define to global not found
	let notFoundRoute = result.find(
		(e) => e.path === `/${baserouters?.basename}/*`
	)?.element || (
			<Navigate to={`/${baserouters?.basename}/${baserouters?.authPath!}`} />
		);
	//create element if notfound with default route define "*" or when not define navigate to index element
	checkinRouterDef && !isPermit &&
		result.push({
			path: routePath,
			element: (
				<Navigate to={`/${baserouters?.basename}/${baserouters?.authPath!}`} />
			),
		} as RouterObjects);

	!checkinRouterDef &&
		result.push({
			path: routePath,
			element: notFoundRoute,
		} as RouterObjects);
	// warning any wrong define params or etc.
	if (!basename && !result?.length)
		console.warn(
			`[getBasename]: basename must be define "index=true" or default path must be define with basename`
		);
	if (basename && !result.length)
		console.warn(`router path [/${basename}] not found`);
	return result;
}

const filterLevelOrRole = (
	route: RouterObjects[],
	levelOrLevel: roleOrLevelCallback
) => {
	let temp = route;
	temp = temp.filter((e) => {
		if (e.children) {
			e.children = filterLevelOrRole(e.children, levelOrLevel);
		}
		return levelOrLevel(e);
	});
	return temp;
};


// export function getBasename2(
// 	routers: BasenameRouter[],
// 	isPermit?: boolean,
// 	levelOrLevel?: roleOrLevelCallback
// ): RouterObjects[] {
// 	// checking cannot use char "/" for define default path
// 	let [_, basename] = window.location.pathname?.split("/");

// 	// check browser location for get sub path and matching with basename
// 	let baserouters = getBaseRouter(routers, basename)
// 	let tempRouters: RouterObjects[] = baserouters?.routers as RouterObjects[]
// 	if (!isPermit && !baserouters?.authPath) {
// 		console.warn("isPermit set to[true] value if no Permission or auth router / define authPath in baserouter when router isdefine")
// 		return []
// 	}
// 	// remap router with basename prefix like "/v2"+"/path or if index "/path"
// 	let result: RouterObjects[] = remapRouterBase(!!basename, baserouters, isPermit);
// 	console.log(result, "RES")
// 	// create default navigation when not found router or navigate to default not found router if any define path "[*]"
// 	let routePath = window.location.pathname;
// 	// check router is define router return to navigate to index
// 	let checkinRouterDef = tempRouters.filter((e) => {
// 		console.log(e?.path, "PATH", e)
// 		let temp = e.path?.split("/")[0];
// 		return routePath.includes(e?.path!!);
// 	})[0];
// 	// cehck default "*" router define to global not found
// 	let idxPath = baserouters?.index ? `*` : `/${baserouters?.basename}/*`
// 	let notFoundRoute = getNotFoundRoute(result, idxPath, baserouters)
// 	console.log(notFoundRoute, "NOT", checkinRouterDef)
// 	//create element if notfound with default route define "*" or when not define navigate to index element
// 	if (checkinRouterDef && !isPermit) {
// 		result.push({
// 			path: routePath,
// 			element: (
// 				<Navigate to={!!basename ? `/${baserouters?.authPath!}` : `/${baserouters?.basename}/${baserouters?.authPath!}`} />
// 			),
// 		} as RouterObjects);
// 	}
// 	!checkinRouterDef &&
// 		result.push({
// 			path: routePath,
// 			element: notFoundRoute,
// 		} as RouterObjects);

// 	// warning any wrong define params or etc.
// 	if (!basename && !result?.length)
// 		console.warn(
// 			`[getBasename]: basename must be define "index=true" or default path must be define with basename`
// 		);
// 	if (basename && !result.length)
// 		console.warn(`router path [/${basename}] not found`);
// 	console.log(result, "<<<<")
// 	return result;
// }

// function getBaseRouter(routers: BasenameRouter[], basename: string) {
// 	let baserouters = routers.find((e) => e.index === true);
// 	let baseRouterNonIndex = routers.find((e) => e.basename === basename);

// 	if (basename!! && basename === baseRouterNonIndex?.basename) {
// 		baserouters = baseRouterNonIndex
// 	}
// 	return baserouters
// }

// function getBasenamePath(isBasename: boolean, el: RouterObjects, baserouters?: BasenameRouter) {
// 	console.log(isBasename)
// 	if (!isBasename) {
// 		return `/${el.path ? el?.path : ""}`
// 	}
// 	console.log(el?.path)
// 	return `/${baserouters?.basename}${el?.path ? `/${el?.path}` : ""}`
// }

// function remapRouterBase(isBasename: boolean, baserouters?: BasenameRouter, isPermit?: boolean) {
// 	let tempRouters: RouterObjects[] = baserouters?.routers as RouterObjects[]
// 	let result: RouterObjects[] = [];
// 	for (let i = 0; i < tempRouters?.length; i++) {
// 		let el = tempRouters[i];
// 		let temp: RouterObjects = {
// 			...el,
// 			path: getBasenamePath(isBasename, el, baserouters),
// 			...(!el.permit ? { permit: false } : { permit: el?.permit }),
// 		};
// 		// create default navigation when permit is false with matching with field permit & create index router
// 		let typeEl: any = temp?.element;
// 		if (
// 			!isPermit &&
// 			!temp?.permit &&
// 			temp?.index &&
// 			typeEl?.type?.name === "Navigate"
// 		) {
// 			temp = {
// 				index: true,
// 				element: (
// 					<Navigate
// 						to={baserouters?.index ? `/${baserouters?.authPath!}` : `/${baserouters?.basename}/${baserouters?.authPath!}`}
// 					/>
// 				),
// 			};
// 			result.push({ ...temp });
// 		}
// 		// add all router without permit
// 		else if (!isPermit && !temp?.permit) {
// 			result.push({ ...temp });
// 		}
// 		// add all router if permit is true

// 	}
// 	return result
// }

// function getNotFoundRoute(result: RouterObjects[], idxPath: string, baserouters?: BasenameRouter) {
// 	return result.find(
// 		(e) => e.path === idxPath
// 	)?.element || (
// 			<Navigate to={baserouters?.index ? `/${baserouters?.authPath!}` : `/${baserouters?.basename}/${baserouters?.authPath!}`} />
// 		);
// }

interface BaseRouter {
	routers: RouterObjects[],
	layout?: React.ComponentType<{ children: React.ReactNode }>;
}

export function getBaseRouters(routers: BasenameRouter[], isPermit?: boolean, levelOrLevel?: roleOrLevelCallback): BaseRouter {
	let pathname = window.location.pathname
	const [, prefix] = pathname.split("/")
	// select basename router
	let findRouter = getBaseRouterWithPrefix(prefix, routers)
	if (!findRouter) {
		return { routers: []}
	}

	let result: RouterObjects[] = findRouter?.routers || []
	result = result.map((e) => {
		if (!e?.permit) e.permit = false
		return e
	})

	// navigate to auth when permit router true and isPermit false

	if (!isPermit) {
		result = result.map((e) => {
			// permit without prefix
			if (e.permit!! && findRouter.basename !== prefix) {
				e = { ...e, permit: false, element: <Navigate to={"/" + findRouter?.authPath || ""} /> }
			}
			// permit with prefix
			else if (e.permit!!) {
				e = { ...e, permit: false, element: <Navigate to={"/" + prefix + "/" + findRouter?.authPath || ""} /> }
			}
			return e
		})
	}

	// add prefix with basename prefix
	if (prefix === findRouter.basename) {
		result = addingPrefix(result as RouterObjects[], prefix)
	}
	// filter with level
	if (levelOrLevel!! && typeof levelOrLevel === "function") {
		result = filterLevelOrRole(result, levelOrLevel)
	}
	return {routers: result, layout: findRouter.layout}
}

function getBaseRouterWithPrefix(prefix: string | null | undefined, routers: BasenameRouter[]): BasenameRouter | undefined {
	let find = routers.find(e => e?.basename === prefix)
	// default with index
	if (!find) find = routers.find(e => e?.index!!)
	// create warning when not found 
	if (!find) console.warn(`routers basename ${prefix} not found will be define with index prop`)
	return find
}

function addingPrefix(router: RouterObjects[], prefix?: string) {
	let result: RouterObjects[] = []
	for (let i = 0; i < router.length; i++) {
		let route = router[i]
		// add prefix if router path match with basename
		if (prefix!!) {
			if (route.index!!) {
				const { index, ...less } = route
				route = { ...less, path: prefix }
			} else {
				if (route.path === "*") route = { ...route, path: "*" }
				else route = { ...route, path: prefix + (route?.path ? "/" + route.path : "") }

			}
		}

		result.push(route)
	}
	return result
}