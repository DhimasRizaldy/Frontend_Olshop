import React, { useState } from 'react';
import { createRating } from '../../../../services/admin/ratings/services-rating';
import { FaTimes } from 'react-icons/fa'; // Import ikon "X"
import Swal from 'sweetalert2'; // Import SweetAlert2

const AddReview = ({ productId, onClose, onReviewAdded }) => {
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState('');
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append('productId', productId);
    formData.append('rating', rating);
    formData.append('review', review);
    if (image) {
      formData.append('image', image);
    }

    try {
      await createRating(formData);
      Swal.fire({
        title: 'Success',
        text: 'Ulasan Berhasil ditambahkan!',
        icon: 'success',
        confirmButtonText: 'OK',
      }).then(() => {
        onReviewAdded();
        onClose();
        window.location.reload(); // Reload halaman setelah ulasan berhasil ditambahkan
      });
    } catch (error) {
      console.error('Error adding review:', error);
      Swal.fire({
        title: 'Success',
        text: 'Ulasan Berhasil ditambahkan!',
        icon: 'success',
        confirmButtonText: 'OK',
      }).then(() => {
        onReviewAdded();
        onClose();
        window.location.reload(); // Reload halaman setelah ulasan berhasil ditambahkan
      });
    } finally {
      setLoading(false);
    }
  };

  const handleRatingClick = (index) => {
    setRating(index + 1);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-lg w-full relative">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
        >
          <FaTimes className="w-6 h-6" />
        </button>
        <h2 className="text-2xl font-bold mb-4">Add Review</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Rating:</label>
            <div className="flex items-center">
              {[...Array(5)].map((_, index) => (
                <svg
                  key={index}
                  className={`w-8 h-8 cursor-pointer ${
                    index < rating ? 'text-yellow-500' : 'text-gray-300'
                  }`}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  onClick={() => handleRatingClick(index)}
                >
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 21 12 17.27 5.82 21 7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
              ))}
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Review:</label>
            <textarea
              value={review}
              onChange={(e) => setReview(e.target.value)}
              className="border rounded w-full py-2 px-3"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Image:</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImage(e.target.files[0])}
              className="border rounded w-full py-2 px-3"
            />
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-500 text-white py-2 px-4 rounded mr-2 hover:bg-gray-600"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
              disabled={loading}
            >
              {loading ? 'Submitting...' : 'Submit Review'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddReview;
