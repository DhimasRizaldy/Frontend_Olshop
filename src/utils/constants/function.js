export const formatRupiah = (number) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
  }).format(number);
};

export const formatDate = (isoDate) => {
  const date = new Date(isoDate);
  return date.toISOString().split('T')[0]; // Mengambil bagian 'yyyy-MM-dd'
};

