export function roundDecimal(
  originalNumber: number,
  numberOfDecimals: number = 3
): number {
  const factorOfTen = Math.pow(10, numberOfDecimals);
  return !Number.isInteger(numberOfDecimals)
    ? originalNumber
    : Math.round(originalNumber * factorOfTen) / factorOfTen;
}
