import React, { useEffect, useState } from 'react';
import { getPromo } from '../../../../services/admin/promo/services-promo';
import SkeletonPromo from './SkeletonPromo';

const VoucherPromos = () => {
  const [promos, setPromos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPromos = async () => {
      try {
        const response = await getPromo();
        if (response.success) {
          setPromos(response.data);
        } else {
          setError('Gagal mengambil data promosi');
        }
      } catch (error) {
        console.error('Error mengambil data promosi:', error);
        setError('Terjadi kesalahan saat mengambil data promosi');
      } finally {
        setLoading(false);
      }
    };

    fetchPromos();
  }, []);

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-6 mt-12">
        <h1 className="text-3xl font-bold mb-6">Diskon</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, index) => (
            <SkeletonPromo key={index} /> // Render skeleton loaders
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return <p className="text-red-500 text-center">{error}</p>;
  }

  if (promos.length === 0) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-6 mt-12 text-center">
        <h1 className="text-3xl font-bold mb-6">Tidak Ada Diskon Tersedia</h1>
        <p className="text-gray-600">
          Saat ini tidak ada promosi yang tersedia. Silakan periksa kembali
          nanti.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 mt-12">
      <h1 className="text-3xl font-bold mb-6">Diskon</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {promos.map((promo) => (
          <div
            key={promo.promoId}
            className={`bg-white shadow-md rounded-lg p-4 border-l-4 ${
              new Date(promo.expiresAt) < new Date()
                ? 'border-red-500 opacity-50'
                : 'border-green-500'
            }`}
          >
            <h2 className="text-xl font-semibold mb-2">
              {promo.discount}% Off
            </h2>
            <p className="text-gray-600 mb-4">
              Gunakan kode: <span className="font-bold">{promo.codePromo}</span>
              <br />
              <span
                className={`font-bold ${
                  new Date(promo.expiresAt) < new Date()
                    ? 'text-red-600'
                    : 'text-green-600'
                }`}
              >
                {new Date(promo.expiresAt) < new Date()
                  ? `Kedaluwarsa pada: ${new Date(promo.expiresAt).toLocaleDateString()}`
                  : `Berlaku hingga: ${new Date(promo.expiresAt).toLocaleDateString()}`}
              </span>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VoucherPromos;
