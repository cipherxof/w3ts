/** @noSelfInFile */

declare var main: () => void;
declare var config: () => void;

const oldMain = main;
const oldConfig = config;

type scriptHookSignature = () => void;

export const hooksMainBefore: scriptHookSignature[] = [];
export const hooksMainAfter: scriptHookSignature[] = [];
export const hooksConfigBefore: scriptHookSignature[] = [];
export const hooksConfigAfter: scriptHookSignature[] = [];

export const executeHooksMainBefore = () => hooksMainBefore.forEach((func) => func());
export const executeHooksMainAfter = () => hooksMainAfter.forEach((func) => func());

export function hookedMain() {
  executeHooksMainBefore();
  oldMain();
  executeHooksMainAfter();
}

export const executeHooksConfigBefore = () => hooksConfigBefore.forEach((func) => func());
export const executeHooksConfigAfter = () => hooksConfigAfter.forEach((func) => func());

export function hookedConfig() {
  executeHooksConfigBefore();
  oldConfig();
  executeHooksConfigAfter();
}

main = hookedMain;
config = hookedConfig;

export enum W3TS_HOOK {
  MAIN_BEFORE = "main::before",
  MAIN_AFTER = "main::after",
  CONFIG_BEFORE = "config::before",
  CONFIG_AFTER = "config::after"
}

const entryPoints: { [key: string]: scriptHookSignature[]; } = {
  [W3TS_HOOK.MAIN_BEFORE]: hooksMainBefore,
  [W3TS_HOOK.MAIN_AFTER]: hooksMainAfter,
  [W3TS_HOOK.CONFIG_BEFORE]: hooksConfigBefore,
  [W3TS_HOOK.CONFIG_AFTER]: hooksConfigAfter,
};

export function addScriptHook(entryPoint: string, hook: scriptHookSignature): boolean {
  if (!(entryPoint in entryPoints)) {
    return false;
  }
  entryPoints[entryPoint].push(hook);
  return true;
}
