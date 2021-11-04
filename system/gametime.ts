import { Timer } from "../handles/timer";
import { addScriptHook, W3TS_HOOK } from "../hooks/index";

let elapsedTime = 0.0;
let gameTimer: Timer | undefined;

export function getElapsedTime() {
  if (!gameTimer) return 0;
  return elapsedTime + gameTimer.elapsed;
}

addScriptHook(W3TS_HOOK.MAIN_AFTER, () => {
  gameTimer = Timer.create().start(30, true, () => {
    elapsedTime += 30;
  });
});
