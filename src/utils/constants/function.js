export const formatRupiah = (number) => {
  if (isNaN(number)) return ''; // Handle non-numeric input

  // Convert the number to an integer if it's a floating-point number
  const integerPart = Math.floor(number);

  // Format the integer part
  const formattedNumber = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0, // Ensures no decimal places
    maximumFractionDigits: 0, // Ensures no decimal places
  }).format(integerPart);

  return formattedNumber;
};

export const formatDate = (isoDate) => {
  const date = new Date(isoDate);
  return date.toISOString().split('T')[0]; // Mengambil bagian 'yyyy-MM-dd'
};
