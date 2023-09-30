export function getRandomInt(min: number = 1, bound: number = 6) {
  bound = Number.isInteger(bound) ? bound : Math.floor(bound);
  min = Number.isInteger(min) ? min : Math.floor(min);

  if (bound < min) {
    [min, bound] = [bound, min];
  }

  const range = bound - min + 1;
  return Math.floor(Math.random() * range) + min;
}
