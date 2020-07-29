/**
 * @param {String} key / key of object you want to check against value
 * @param {String} value / value to compare on object to remove
 * @param {Array} arr / array to update and send back
 * @returns {[Object, Array]} object that was removed from array and updated array.
 */
export function getUpdatedArray(key, value, arr) {
  const objToSendBack = arr.find((item) => item[key] === value);

  const arrToSendBack = arr.filter((item) => item[key] !== value);

  return [objToSendBack, arrToSendBack];
}
