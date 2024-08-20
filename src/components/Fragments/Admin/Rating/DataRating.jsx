import React, { useEffect, useState } from 'react';
import {
  faPenToSquare,
  faTrash,
  faEye,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import DataTable from 'react-data-table-component';
import { getRating } from '../../../../services/admin/ratings/services-rating';

const DataRating = () => {
  const [ratings, setRating] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filterRating, setFilterRating] = useState('ALL');

  // get rating
  useEffect(() => {
    const fetchRating = async () => {
      try {
        const response = await getRating();
        setRating(response.data || []); // Simpan data rating dalam state
      } catch (error) {
        console.error('Fetch rating failed:', error.message);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchRating();
  }, []);

  const columns = [
    {
      name: 'No',
      selector: (row, index) => index + 1,
      sortable: true,
      width: '80px',
    },
    {
      name: 'RatingId',
      selector: (row) => row.ratingId,
      sortable: true,
    },
    {
      name: 'UserId',
      selector: (row) => row.userId,
      sortable: true,
    },
    {
      name: 'ProductId',
      selector: (row) => row.productId,
      sortable: true,
    },
    {
      name: 'Rating',
      selector: (row) => row.rating,
      sortable: true,
    },
    {
      name: 'Review',
      selector: (row) => row.review,
      sortable: true,
    },
    {
      name: 'Image',
      selector: (row) => row.image,
      cell: (row) =>
        row.image ? (
          <img
            src={row.image}
            alt="image"
            className="h-10 w-10 rounded-full object-cover"
          />
        ) : (
          <p className="text-black dark:text-white">No image</p>
        ),
    },
    {
      name: 'Action',
      cell: (row) => (
        <div className="flex items-center space-x-3.5">
          <Link to={`/detail-rating/${row.ratingId}`}>
            <button className="hover:text-primary">
              <FontAwesomeIcon icon={faEye} />
            </button>
          </Link>
          <Link to={`/edit-rating/${row.ratingId}`}>
            <button className="hover:text-primary">
              <FontAwesomeIcon icon={faPenToSquare} />
            </button>
          </Link>
          <button className="hover:text-primary">
            <FontAwesomeIcon icon={faTrash} />
          </button>
        </div>
      ),
    },
  ];

  // Filter ratings based on rating value
  const filteredRatings = ratings.filter((rating) => {
    if (filterRating === 'ALL') return true;
    return rating.rating === parseInt(filterRating);
  });

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="py-6 px-4 md:px-6 xl:px-7.5">
        <h4 className="text-xl font-semibold text-black dark:text-white">
          Data Rating
        </h4>
      </div>
      <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
        <div className="flex justify-between pb-4">
          <div>
            <button
              className={`mr-2 px-4 py-2 rounded-md ${
                filterRating === 'ALL' ? 'bg-primary text-white' : 'bg-gray-300'
              }`}
              onClick={() => setFilterRating('ALL')}
            >
              All
            </button>
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                className={`mr-2 px-4 py-2 rounded-md ${
                  filterRating === star.toString()
                    ? 'bg-success text-white'
                    : 'bg-gray-300'
                }`}
                onClick={() => setFilterRating(star.toString())}
              >
                {star} Star
              </button>
            ))}
          </div>
        </div>
        <DataTable
          columns={columns}
          data={filteredRatings}
          pagination
          highlightOnHover
          pointerOnHover
          responsive
          striped
          noDataComponent="No ratings available."
        />
      </div>
    </div>
  );
};

export default DataRating;
