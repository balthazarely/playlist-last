/**
 * Higher-order function for async/await error handling
 * @param {function} fn an async function
 * @returns {function}
 */

export const catchErrors = (fn) => {
  return function (...args) {
    return fn(...args).catch((err) => {
      console.error(err);
    });
  };
};

export function millisToMinutesAndSeconds(millis) {
  var minutes = Math.floor(millis / 60000);
  var seconds = ((millis % 60000) / 1000).toFixed(0);
  return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
}

export function listNamesFunction(people) {
  const names = people.map(({ name }) => name);
  const finalName = names.pop();
  return names.length ? names.join(", ") + " & " + finalName : finalName;
}
