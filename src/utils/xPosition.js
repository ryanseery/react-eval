/**
 * @param {Number} x / number to bring to .0
 * @return {Number} ex: 40.9
 */
export function xPosition(x) {
  if (x >= 10) {
    return Number.parseFloat(x).toPrecision(3);
  }
  return Number.parseFloat(x).toPrecision(2);
}
