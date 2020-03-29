/** @noSelfInFile */

declare var main: () => void;
declare var config: () => void;

const oldMain = main;
const oldConfig = config;

type scriptHookSignature = () => void;

const hooksMainBefore: scriptHookSignature[] = [];
const hooksMainAfter: scriptHookSignature[] = [];
const hooksConfigBefore: scriptHookSignature[] = [];
const hooksConfigAfter: scriptHookSignature[] = [];

function hookedMain() {
  hooksMainBefore.forEach((func) => func());
  oldMain();
  hooksMainAfter.forEach((func) => func());
}

function hookedConfig() {
  hooksConfigBefore.forEach((func) => func());
  oldConfig();
  hooksConfigAfter.forEach((func) => func());
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
