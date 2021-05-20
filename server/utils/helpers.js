const urlTrim = (url) => {
  return url.slice(-1) === "/" ? url.slice(0, -1) : url;
};
module.exports = urlTrim;
