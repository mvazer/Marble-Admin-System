export const formatCurrency = (value, currency='₼') =>
  new Intl.NumberFormat("az-AZ", { style: "currency", currency: "AZN" })
    .format(value)
    .replace("AZN", currency);

export function formatNumber(num) {
  if (Math.abs(num) >= 1000) {
    // const formatted = (Math.abs(num) / 1000).toFixed(2);
    const formatted = (num / 1000).toFixed(2);
    return `${formatted}k`;
  } else {
    return num.toString();
  }
}

export function formatCurrencyNumber(num) {
  return "₼ " + formatNumber(num);
}

export function formatSquareMeters(number) {
  return (
    number.toLocaleString("en-US", {
      style: "decimal",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }) + " m²"
  );
}
