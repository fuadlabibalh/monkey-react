import { RouterObjects } from "../../RouterProvider";
import { BasenameRouter } from "../../RouterProvider";
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
export declare function getBasename(routers: BasenameRouter[], isPermit?: boolean, levelOrLevel?: roleOrLevelCallback): RouterObjects[];
export declare function getBasename2(routers: BasenameRouter[], isPermit?: boolean, levelOrLevel?: roleOrLevelCallback): RouterObjects[];
