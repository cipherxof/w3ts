import { Timer } from "../handles/timer";

let elapsedTime = 0.00;

const gameTimer = new Timer().start(30, true, () => {
  elapsedTime += 30;
});

export function getElapsedTime() {
  return elapsedTime + gameTimer.elapsed;
}
