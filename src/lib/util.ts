export const randomInt = (min: number, max: number) => {
  const interval = max - min + 1;
  return Math.floor(Math.random() * interval + min);
};

export function randomPick<T>(arr: Array<T>): T | undefined {
  return arr[randomInt(0, arr.length - 1)];
}

export const range = (s: number, e: number): Array<number> => {
  return Array.from({ length: e - s + 1 }, (_, k) => k + s);
};
