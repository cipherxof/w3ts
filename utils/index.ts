import { Timer } from "../handles/timer";

export * from "./color";

export async function sleep(howMuch: number): Promise<null> {
  return await new Promise((resolve, reject) => {
    const t = new Timer();
    t.start(howMuch, false, () => {
      t.destroy();
      resolve(null);
    });
  });
}
