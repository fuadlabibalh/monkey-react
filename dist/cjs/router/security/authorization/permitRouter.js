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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBasename = getBasename;
exports.getBaseRouters = getBaseRouters;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_router_dom_1 = require("react-router-dom");
function getBasename(routers, isPermit, levelOrLevel) {
    // checking cannot use char "/" for define default path
    var _a, _b, _c, _d, _e, _f;
    // check browser location for get sub path and matching with basename
    var _g = (_a = window.location.pathname) === null || _a === void 0 ? void 0 : _a.split("/"), _ = _g[0], basename = _g[1];
    var baserouters = routers.find(function (e) { return e.index === true; });
    if (basename) {
        // set router basename
        baserouters = routers.find(function (e) { return e.basename === basename; });
        // set router defaultpath if not found router basename with browser router
        // if (!baserouters && defaultPath!!) {
        //   baserouters = routers.find((e) => e.basename === defaultPath);
        // }
    }
    // set default baseroute when not any basename from browser location
    // else if (defaultPath!!) {
    //   baserouters = routers.find((e) => e.basename === defaultPath);
    // }
    var tempRouters = baserouters === null || baserouters === void 0 ? void 0 : baserouters.routers;
    var result = [];
    // remap router with basename prefix like "/v2"+"/path"
    for (var i = 0; i < (tempRouters === null || tempRouters === void 0 ? void 0 : tempRouters.length); i++) {
        var el = tempRouters[i];
        var temp = __assign(__assign(__assign({}, el), (el.path ? { path: "/".concat(baserouters === null || baserouters === void 0 ? void 0 : baserouters.basename, "/").concat(el === null || el === void 0 ? void 0 : el.path) } : {})), (!el.permit ? { permit: false } : { permit: el === null || el === void 0 ? void 0 : el.permit }));
        // create default navigation when permit is false with matching with field permit & create index router
        var typeEl = (_b = temp === null || temp === void 0 ? void 0 : temp.element) === null || _b === void 0 ? void 0 : _b.valueOf();
        if (!isPermit &&
            !(temp === null || temp === void 0 ? void 0 : temp.permit) &&
            (temp === null || temp === void 0 ? void 0 : temp.index) &&
            ((_c = typeEl === null || typeEl === void 0 ? void 0 : typeEl.type) === null || _c === void 0 ? void 0 : _c.name) === "Navigate") {
            temp = {
                index: true,
                element: ((0, jsx_runtime_1.jsx)(react_router_dom_1.Navigate, { to: "/".concat(baserouters === null || baserouters === void 0 ? void 0 : baserouters.basename, "/").concat(baserouters === null || baserouters === void 0 ? void 0 : baserouters.authPath) })),
            };
            result.push(__assign({}, temp));
        }
        // add all router without permit
        else if (!isPermit && !(temp === null || temp === void 0 ? void 0 : temp.permit)) {
            result.push(__assign({}, temp));
        }
        // add all router if permit is true
        if (isPermit) {
            if ((temp === null || temp === void 0 ? void 0 : temp.permit) &&
                typeof levelOrLevel === "function" &&
                Array.isArray(temp.children) &&
                !temp.index) {
                var child = [
                    (_d = temp.children) === null || _d === void 0 ? void 0 : _d.find(function (e) { return (e === null || e === void 0 ? void 0 : e.index) === true; }),
                ];
                var filter = filterLevelOrRole(temp === null || temp === void 0 ? void 0 : temp.children, levelOrLevel);
                child = __spreadArray([child[0]], filter, true);
                temp.children = child;
            }
            result.push(__assign({}, temp));
        }
    }
    // create prefix basename router to navigate default or index router
    result.unshift({
        path: baserouters === null || baserouters === void 0 ? void 0 : baserouters.basename,
        element: (_e = result.find(function (e) { return e.index === true; })) === null || _e === void 0 ? void 0 : _e.element,
    });
    // create default navigation when not found router or navigate to default not found router if any define path "[*]"
    var routePath = window.location.pathname;
    // check router is define router return to navigate to index
    var checkinRouterDef = tempRouters.filter(function (e) {
        var _a;
        var temp = (_a = e.path) === null || _a === void 0 ? void 0 : _a.split("/")[0];
        return routePath.includes(temp);
    })[0];
    // cehck default "*" router define to global not found
    var notFoundRoute = ((_f = result.find(function (e) { return e.path === "/".concat(baserouters === null || baserouters === void 0 ? void 0 : baserouters.basename, "/*"); })) === null || _f === void 0 ? void 0 : _f.element) || ((0, jsx_runtime_1.jsx)(react_router_dom_1.Navigate, { to: "/".concat(baserouters === null || baserouters === void 0 ? void 0 : baserouters.basename, "/").concat(baserouters === null || baserouters === void 0 ? void 0 : baserouters.authPath) }));
    //create element if notfound with default route define "*" or when not define navigate to index element
    checkinRouterDef && !isPermit &&
        result.push({
            path: routePath,
            element: ((0, jsx_runtime_1.jsx)(react_router_dom_1.Navigate, { to: "/".concat(baserouters === null || baserouters === void 0 ? void 0 : baserouters.basename, "/").concat(baserouters === null || baserouters === void 0 ? void 0 : baserouters.authPath) })),
        });
    !checkinRouterDef &&
        result.push({
            path: routePath,
            element: notFoundRoute,
        });
    // warning any wrong define params or etc.
    if (!basename && !(result === null || result === void 0 ? void 0 : result.length))
        console.warn("[getBasename]: basename must be define \"index=true\" or default path must be define with basename");
    if (basename && !result.length)
        console.warn("router path [/".concat(basename, "] not found"));
    return result;
}
var filterLevelOrRole = function (route, levelOrLevel) {
    var temp = route;
    temp = temp.filter(function (e) {
        if (e.children) {
            e.children = filterLevelOrRole(e.children, levelOrLevel);
        }
        return levelOrLevel(e);
    });
    return temp;
};
function getBaseRouters(routers, isPermit, levelOrLevel) {
    var pathname = window.location.pathname;
    var _a = pathname.split("/"), prefix = _a[1];
    // select basename router
    var findRouter = getBaseRouterWithPrefix(prefix, routers);
    if (!findRouter) {
        return { routers: [] };
    }
    var result = (findRouter === null || findRouter === void 0 ? void 0 : findRouter.routers) || [];
    result = result.map(function (e) {
        if (!(e === null || e === void 0 ? void 0 : e.permit))
            e.permit = false;
        return e;
    });
    // navigate to auth when permit router true and isPermit false
    if (!isPermit) {
        result = result.map(function (e) {
            // permit without prefix
            if (e.permit && findRouter.basename !== prefix) {
                e = __assign(__assign({}, e), { permit: false, element: (0, jsx_runtime_1.jsx)(react_router_dom_1.Navigate, { to: "/" + (findRouter === null || findRouter === void 0 ? void 0 : findRouter.authPath) || "" }) });
            }
            // permit with prefix
            else if (e.permit) {
                e = __assign(__assign({}, e), { permit: false, element: (0, jsx_runtime_1.jsx)(react_router_dom_1.Navigate, { to: "/" + prefix + "/" + (findRouter === null || findRouter === void 0 ? void 0 : findRouter.authPath) || "" }) });
            }
            return e;
        });
    }
    // add prefix with basename prefix
    if (prefix === findRouter.basename) {
        result = addingPrefix(result, prefix);
    }
    // filter with level
    if (levelOrLevel && typeof levelOrLevel === "function") {
        result = filterLevelOrRole(result, levelOrLevel);
    }
    return { routers: result, layout: findRouter.layout };
}
function getBaseRouterWithPrefix(prefix, routers) {
    var find = routers.find(function (e) { return (e === null || e === void 0 ? void 0 : e.basename) === prefix; });
    // default with index
    if (!find)
        find = routers.find(function (e) { return e === null || e === void 0 ? void 0 : e.index; });
    // create warning when not found 
    if (!find)
        console.warn("routers basename ".concat(prefix, " not found will be define with index prop"));
    return find;
}
function addingPrefix(router, prefix) {
    var result = [];
    for (var i = 0; i < router.length; i++) {
        var route = router[i];
        // add prefix if router path match with basename
        if (prefix) {
            if (route.index) {
                var index = route.index, less = __rest(route, ["index"]);
                route = __assign(__assign({}, less), { path: prefix });
            }
            else {
                if (route.path === "*")
                    route = __assign(__assign({}, route), { path: "*" });
                else
                    route = __assign(__assign({}, route), { path: prefix + ((route === null || route === void 0 ? void 0 : route.path) ? "/" + route.path : "") });
            }
        }
        result.push(route);
    }
    return result;
}
//# sourceMappingURL=permitRouter.js.map