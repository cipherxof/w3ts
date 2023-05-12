import { Timer } from "../handles/timer";

export * from "./color";

export async function sleep(howMuch: number): Promise<null> {
  return new Promise((resolve, reject) => {
    const t = Timer.create();
    t.start(howMuch, false, () => {
      t.destroy();
      resolve(null);
    });
  });
}
