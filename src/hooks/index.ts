const oldMain = main;
const oldConfig = config;

type scriptHookSignature = () => void;

const hooksMainBefore: Array<scriptHookSignature> = [];
const hooksMainAfter: Array<scriptHookSignature> = [];
const hooksConfigBefore: Array<scriptHookSignature> = [];
const hooksConfigAfter: Array<scriptHookSignature> = [];

function hookedMain() {
  hooksMainBefore.forEach(func => func());
  oldMain();
  hooksMainAfter.forEach(func => func());
}

function hookedConfig() {
  hooksConfigBefore.forEach(func => func());
  oldConfig();
  hooksConfigAfter.forEach(func => func());
}

main = hookedMain;
config = hookedConfig;

var entryPoints: { [key: string]: Array<scriptHookSignature>; } = {
  "main::before": hooksMainBefore,
  "main::after": hooksMainAfter,
  "config::before": hooksConfigBefore,
  "config::after": hooksConfigAfter,
};

export function addScriptHook(entryPoint: string, hook: scriptHookSignature): boolean {
  if (!(entryPoint in entryPoints)) {
    return false;
  }
  entryPoints[entryPoint].push(hook);
  return true;
}
