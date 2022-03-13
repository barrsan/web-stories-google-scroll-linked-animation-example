export const getPercent = ({ partial, total }) =>
  parseInt((100 * partial) / total, 10);
