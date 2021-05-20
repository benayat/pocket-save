const flattenCollection = (collection) => {
  let collectionInput = [];
  for (let i = 0; i < collection.length; i++) {
    let temp = Object.assign(
      {},
      ...(function _flatten(o) {
        return [].concat(
          ...Object.keys(o).map((k) =>
            typeof o[k] === "object" ? _flatten(o[k]) : { [k]: o[k] }
          )
        );
      })(collection[i])
    );
    collectionInput.push(temp);
  }
  return collectionInput;
};
export { flattenCollection };
