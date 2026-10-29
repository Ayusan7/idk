export function getStockLimit(stockQuantity) {
  if (
    stockQuantity === null ||
    stockQuantity === undefined ||
    stockQuantity === ''
  ) {
    return Infinity;
  }

  const quantity = Number(stockQuantity);
  return Number.isFinite(quantity)
    ? Math.max(0, Math.floor(quantity))
    : Infinity;
}
