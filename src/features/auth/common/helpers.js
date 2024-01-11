export const reshapeByKey = (obj, valKey) =>
  Object.fromEntries(
    Object.entries(obj).map(([key, val]) => [key, val[valKey]]),
  );
