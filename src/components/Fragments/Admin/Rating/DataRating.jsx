import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import {
  faPenToSquare,
  faTrash,
  faEye,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import { getRating } from '../../../../services/admin/ratings/services-rating';

const DataRating = () => {
  const [ratings, setRatings] = useState([]);
  const [filteredRatings, setFilteredRatings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState(0);

  useEffect(() => {
    const fetchRating = async () => {
      try {
        const response = await getRating();
        if (response.success) {
          setRatings(response.data || []);
          setFilteredRatings(response.data || []);
        } else {
          setError(response.message || 'Failed to fetch ratings');
        }
      } catch (error) {
        console.error('Fetch rating failed:', error.message);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchRating();
  }, []);

  useEffect(() => {
    if (filter === 0) {
      setFilteredRatings(ratings);
    } else {
      setFilteredRatings(ratings.filter((rating) => rating.rating === filter));
    }
  }, [filter, ratings]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const columns = [
    {
      name: 'No',
      selector: (row, index) => index + 1,
      sortable: true,
    },
    {
      name: 'RatingId',
      selector: (row) => row.ratingId,
      sortable: true,
    },
    {
      name: 'User',
      selector: (row) => row.users?.username || 'N/A',
      sortable: true,
    },
    {
      name: 'Product',
      selector: (row) => row.products?.name || 'N/A',
      sortable: true,
    },
    {
      name: 'Rating',
      selector: (row) => row.rating,
      sortable: true,
      cell: (row) => (
        <div>
          {[...Array(row.rating)].map((_, i) => (
            <span key={i} className="text-yellow-500">
              ★
            </span>
          ))}
          {[...Array(5 - row.rating)].map((_, i) => (
            <span key={i} className="text-gray-300">
              ★
            </span>
          ))}
        </div>
      ),
    },
    {
      name: 'Review',
      selector: (row) => row.review || 'No review',
      sortable: true,
    },
    {
      name: 'Image',
      cell: (row) =>
        row.image ? (
          <img
            src={row.image}
            alt="rating"
            className="h-10 w-10 rounded-full object-cover"
          />
        ) : (
          <p>No image</p>
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

  return (
    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="py-6 px-4 md:px-6 xl:px-7.5 flex justify-between items-center">
        <h4 className="text-xl font-semibold text-black dark:text-white">
          Data Rating
        </h4>
        <div>
          <label htmlFor="filter" className="mr-2 text-black dark:text-white">
            Filter by Rating:
          </label>
          <select
            id="filter"
            value={filter}
            onChange={(e) => setFilter(Number(e.target.value))}
            className="border border-gray-300 rounded-md p-2"
          >
            <option value={0}>All</option>
            <option value={1}>1 Star</option>
            <option value={2}>2 Stars</option>
            <option value={3}>3 Stars</option>
            <option value={4}>4 Stars</option>
            <option value={5}>5 Stars</option>
          </select>
        </div>
      </div>

      <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
        <DataTable
          columns={columns}
          data={filteredRatings}
          pagination
          highlightOnHover
          pointerOnHover
        />
      </div>
    </div>
  );
};

export default DataRating;
