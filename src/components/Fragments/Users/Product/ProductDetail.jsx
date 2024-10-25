import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import { getProductById } from '../../../../services/admin/product/services-product';
import { formatRupiah } from '../../../../utils/constants/function';
import SkeletonProductDetails from './SkeletonProductDetails';
import { createCarts } from '../../../../services/users/carts/services-carts';
import AddReview from '../Review/AddReview';

const ProductDetails = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [hasPurchased, setHasPurchased] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await getProductById(productId);
        setProduct(response.data);

        const userId = localStorage.getItem('userId');
        const purchased = response.data.carts.some(
          (cart) => cart.userId === userId && cart.isCheckout,
        );
        setHasPurchased(purchased);
      } catch (error) {
        console.error('Gagal mengambil data produk:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  const handleAddToCart = async () => {
    try {
      const response = await createCarts({ productId });
      if (response.success) {
        Swal.fire({
          title: 'Ditambahkan ke Keranjang',
          text: 'Produk telah ditambahkan ke keranjang Anda.',
          icon: 'success',
          confirmButtonText: 'OK',
        }).then((result) => {
          if (result.isConfirmed) {
            window.location.href = '/carts';
          }
        });
      } else {
        Swal.fire({
          title: 'Gagal',
          text: 'Gagal menambahkan produk ke keranjang.',
          icon: 'error',
          confirmButtonText: 'OK',
        });
      }
    } catch (error) {
      console.error('Kesalahan saat menambahkan produk ke keranjang:', error);
      Swal.fire({
        title: 'Gagal',
        text: 'Anda terdeteksi belum login, silahkan login terlebih dahulu.',
        icon: 'error',
        confirmButtonText: 'OK',
      });
    }
  };

  const handleContactAdmin = () => {
    const message = `Halo Admin, saya ingin menanyakan tentang produk berikut:\n\nNama Produk: ${product.name}\nHarga: ${formatRupiah(product.promoPrice > 0 ? product.promoPrice : product.price)}\nLink Produk: ${window.location.href}\nGambar Produk: ${product.image}`;
    const waNumber = '6289521937647';
    const waLink = `https://wa.me/${waNumber}?text=${encodeURIComponent(message)}`;

    window.open(waLink, '_blank');
  };

  const handleOpenModal = () => {
    if (hasPurchased) {
      setIsModalOpen(true);
    } else {
      Swal.fire({
        title: 'Peringatan',
        text: 'Anda belum membeli produk ini.',
        icon: 'warning',
        confirmButtonText: 'OK',
      });
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleReviewAdded = () => {
    console.log('Review berhasil ditambahkan');
  };

  const renderStars = (rating) => {
    const roundedRating = Math.round(rating);
    return (
      <div className="flex items-center">
        {[...Array(5)].map((_, index) => (
          <svg
            key={index}
            className={`w-6 h-6 ${index < roundedRating ? 'text-yellow-500' : 'text-gray-300'} mr-1`}
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 21 12 17.27 5.82 21 7 14.14 2 9.27l6.91-1.01L12 2z" />
          </svg>
        ))}
      </div>
    );
  };

  const formatNumber = (number) => {
    return number.toLocaleString('id-ID');
  };

  if (loading) {
    return <SkeletonProductDetails />;
  }

  if (!product) {
    return <div>Produk tidak ditemukan</div>;
  }

  const roundedAverageRating = Math.round(product.averageRating);

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 mt-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex justify-center items-center">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-auto rounded-lg shadow-md"
          />
        </div>
        <div>
          <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
          <p className="text-gray-600 mb-4">{product.description}</p>
          <div className="mb-4">
            {product.promoPrice > 0 ? (
              <>
                <p className="text-gray-500 line-through">
                  {formatRupiah(product.price)}
                </p>
                <p className="text-red-500 font-bold">
                  {formatRupiah(product.promoPrice)}
                </p>
              </>
            ) : (
              <p className="text-gray-500 font-bold">
                {formatRupiah(product.price)}
              </p>
            )}
          </div>
          <div className="flex items-center mb-4">
            {renderStars(roundedAverageRating)}
            <p className="text-gray-600 ml-2">{roundedAverageRating}/5</p>
          </div>
          <div className="mb-4">
            <p className="text-gray-700">
              <strong>Stok:</strong> {formatNumber(product.stock)}
            </p>
            <p className="text-gray-700">
              <strong>Berat:</strong> {formatNumber(product.weight)} gram
            </p>
            <p className="text-gray-700">
              <strong>Kategori:</strong>{' '}
              {product.category?.name || 'Kategori Tidak Diketahui'}
            </p>
            <p className="text-gray-700">
              <strong>Terjual:</strong> {formatNumber(product.totalSold)}
            </p>
            <p className="text-gray-700">
              <strong>Ulasan:</strong> {formatNumber(product.totalReview)}
            </p>
          </div>
          <div className="mb-4 flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0">
            <button
              className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition duration-300"
              onClick={handleAddToCart}
            >
              Tambah ke Keranjang
            </button>
            <button
              className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 transition duration-300"
              onClick={handleContactAdmin}
            >
              Tanya Admin
            </button>
            <button
              className="bg-yellow-600 text-white px-6 py-2 rounded-md hover:bg-yellow-700 transition duration-300"
              onClick={handleOpenModal}
            >
              Berikan Ulasan
            </button>
          </div>
        </div>
      </div>
      <div className="mt-6" id="product-reviews">
        <h2 className="text-2xl font-bold mb-4">Ulasan Produk</h2>
        {product.ratings.length === 0 ? (
          <p className="text-gray-600">Produk belum memiliki ulasan</p>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {product.ratings.map((review, index) => (
              <div
                key={index}
                className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
              >
                <div className="flex items-start gap-4">
                  <img
                    src={review.image}
                    alt={`Review ${index}`}
                    className="w-16 h-16 rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <div className="mb-2">
                      <p className="text-gray-700 font-bold">
                        {review.products?.name || 'Produk Tidak Diketahui'}
                      </p>
                    </div>
                    <div className="flex items-center mb-2">
                      {renderStars(review.rating)}
                    </div>
                    <p className="text-gray-700">
                      <strong>
                        {review.users?.username || 'Pengguna Tidak Diketahui'}:
                      </strong>{' '}
                      {review.review}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      {isModalOpen && (
        <AddReview
          productId={productId}
          onClose={handleCloseModal}
          onReviewAdded={handleReviewAdded}
        />
      )}
    </div>
  );
};

export default ProductDetails;
