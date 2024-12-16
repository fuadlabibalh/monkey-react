import { roleOrLevelCallback } from "./security/authorization/permitRouter";
import { ReactNode } from "react";
import { RouteObject } from "react-router-dom";
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
    levelOrRole?: roleOrLevelCallback;
}
declare function RouterProvider({ routers, isPermit, levelOrRole, }: RouterProviderProps): import("react").JSX.Element;
export default RouterProvider;
export declare const BrowserRouterProvider: typeof RouterProvider;
export declare function HashRouterProvider({ routers, isPermit, levelOrRole, }: RouterProviderProps): import("react").JSX.Element;
