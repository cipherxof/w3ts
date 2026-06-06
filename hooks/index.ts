/** @noSelfInFile */

// 'dom' library is disabled, hence declaring this manually.
type VoidFunction = () => void;

type W3tsHookType =
  | "main::before"
  | "main::after"
  | "config::before"
  | "config::after";

export type ValidInitializationFunctionName =
  | "main"
  | "config"
  | "InitGlobals"
  | "InitCustomTriggers"
  | "RunInitializationTriggers"
  | "MarkGameStarted";

const globalTable = globalThis as unknown as Record<
  string,
  undefined | VoidFunction
>;

const wasCalled = {} as Record<ValidInitializationFunctionName, boolean>;

export const addInitHook = (
  entryFnName: ValidInitializationFunctionName,
  hookCallbackFn: VoidFunction,
  callBefore = false
) => {
  const old = globalTable[entryFnName];
  if (wasCalled[entryFnName]) {
    error(`w3ts: ${entryFnName} was already called before addInitHook`, 3);
    return false;
  }
  if (typeof old !== "function") {
    error(`w3ts: invalid function provided to addInitHook`, 3);
    return false;
  }
  globalTable[entryFnName] = () => {
    wasCalled[entryFnName] = true;
    globalTable[entryFnName] = undefined;
    if (!callBefore) {
      old();
    }
    pcall(hookCallbackFn);
    if (callBefore) {
      old();
    }
  };
  return true;
};

/**
 * @deprecated use `addInitHook` with string literals instead.
 */
export enum W3TS_HOOK {
  MAIN_BEFORE = "main::before",
  MAIN_AFTER = "main::after",
  CONFIG_BEFORE = "config::before",
  CONFIG_AFTER = "config::after",
}

/**
 * @deprecated use `addInitHook` with string literals instead.
 */
export const addScriptHook = (
  entryPoint: W3tsHookType,
  hook: VoidFunction
) => {
  const [funcName, whenToCall] = entryPoint.split("::") as [
    "main" | "config",
    "before" | "after"
  ];
  return addInitHook(funcName, hook, whenToCall === "before");
};
