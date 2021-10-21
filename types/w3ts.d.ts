/** @noSelfInFile * */

/**
 * This macro will inject the contents of the specified file into the source
 * where it is called. Paths are relative to the project's root.
 * @example
 * include("node_modules/resource/file.lua")
 */
declare function include(path: string): void;

/**
 * @param any Expression to be evaluated by Node.
 */
declare function compiletime(any: any): any;
