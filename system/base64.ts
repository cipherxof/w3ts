/** @noSelfInFile */

declare function base64Encode(data: string): string;
declare function base64Decode(data: string): string;
declare function include(s: string): void;

include("node_modules/w3ts/lua/base64.lua");

export { base64Encode, base64Decode };
