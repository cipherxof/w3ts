import { Timer } from "../handles/timer";
import { addInitHook } from "../hooks/index";

let elapsedTime = 0.0;
let gameTimer: Timer | undefined;

export function getElapsedTime() {
  if (!gameTimer) return 0;
  return elapsedTime + gameTimer.elapsed;
}

addInitHook("main", () => {
  gameTimer = Timer.create().start(30, true, () => {
    elapsedTime += 30;
  });
});
