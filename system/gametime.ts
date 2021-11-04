import { Timer } from "../handles/timer";
import { addScriptHook, W3TS_HOOK } from "../hooks/index";

let elapsedTime = 0.0;
<<<<<<< HEAD

const gameTimer = Timer.create().start(30, true, () => {
  elapsedTime += 30;
});
=======
let gameTimer: Timer | undefined;
>>>>>>> 463d183f464089dbb20e0d50de5ded990d4aac94

export function getElapsedTime() {
  if (!gameTimer) return 0;
  return elapsedTime + gameTimer.elapsed;
}

addScriptHook(W3TS_HOOK.MAIN_AFTER, () => {
  gameTimer = new Timer().start(30, true, () => {
    elapsedTime += 30;
  });
});
