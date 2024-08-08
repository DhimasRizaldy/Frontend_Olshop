export const formatRupiah = (number) => {
  if (typeof number !== "number") {
    return "Input not number";
  }

  const formatter = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  });

  return formatter.format(number);
};
