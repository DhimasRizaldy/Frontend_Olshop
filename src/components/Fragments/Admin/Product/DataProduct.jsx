import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import {
  faPenToSquare,
  faTrash,
  faEye,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import DataTable from 'react-data-table-component';
import {
  getProduct,
  deleteProduct,
} from '../../../../services/admin/product/services-product';
import { formatRupiah } from '../../../../utils/constants/function';
import { getWHOAMI } from '../../../../services/auth/admin/getDataUser';

const DataProduct = () => {
  const [products, setProduct] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filterStock, setFilterStock] = useState('ALL');
  const [filterTotalSold, setFilterTotalSold] = useState('ALL');
  const [searchTerm, setSearchTerm] = useState('');
  const [role, setRole] = useState('USER'); // Default role or set as needed

  // Get products
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await getProduct();
        setProduct(response.data || []);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, []);

  // Fetch user role
  useEffect(() => {
    const fetchUserRole = async () => {
      try {
        const response = await getWHOAMI();
        setRole(response.data.user.role);
      } catch (error) {
        setError(error.message);
      }
    };
    fetchUserRole();
  }, []);

  // Handle delete
  const handleDelete = async (productId, productName) => {
    Swal.fire({
      title: 'Are you sure?',
      text: `You are about to delete the product "${productName}". You won't be able to revert this!`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await deleteProduct(productId);
          if (response.success) {
            Swal.fire(
              'Deleted!',
              `Product "${productName}" has been deleted.`,
              'success',
            );
            setProduct(
              products.filter((product) => product.productId !== productId),
            );
          } else {
            Swal.fire('Error!', response.message, 'error');
          }
        } catch (error) {
          Swal.fire('Error!', error.message, 'error');
        }
      }
    });
  };

  const columns = [
    {
      name: 'No',
      selector: (row, index) => index + 1,
      sortable: true,
      width: '80px',
    },
    {
      name: 'ProductId',
      selector: (row) => row.productId,
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
      name: 'Name',
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: 'CategoryId',
      selector: (row) => row.category.name,
      sortable: true,
    },
    {
      name: 'Price',
      selector: (row) => formatRupiah(row.price),
      sortable: true,
    },
    {
      name: 'Promo',
      selector: (row) => formatRupiah(row.promoPrice),
      sortable: true,
    },
    {
      name: 'Weight',
      selector: (row) => `${row.weight} Gr`,
      sortable: true,
    },
    {
      name: 'Stock',
      selector: (row) => row.stock,
      sortable: true,
    },
    {
      name: 'Total Terjual',
      selector: (row) => row.totalSold,
      sortable: true,
    },
    {
      name: 'Total Review',
      selector: (row) => row.totalReview,
      sortable: true,
    },
    {
      name: 'Description',
      selector: (row) =>
        row.description.length > 15
          ? `${row.description.slice(0, 15)}...`
          : row.description,
      sortable: true,
    },
    {
      name: 'Action',
      cell: (row) => (
        <div className="flex items-center space-x-3.5">
          <Link to={`/detail-product/${row.productId}`}>
            <button className="hover:text-primary">
              <FontAwesomeIcon icon={faEye} />
            </button>
          </Link>
          {role === 'ADMIN' && (
            <>
              <Link to={`/edit-product/${row.productId}`}>
                <button className="hover:text-primary">
                  <FontAwesomeIcon icon={faPenToSquare} />
                </button>
              </Link>
              <button
                className="hover:text-primary"
                onClick={() => handleDelete(row.productId, row.name)}
              >
                <FontAwesomeIcon icon={faTrash} />
              </button>
            </>
          )}
        </div>
      ),
    },
  ];

  // Filter products based on stock and totalSold
  const filteredProducts = products.filter((product) => {
    const matchesStock =
      filterStock === 'ALL' ||
      (filterStock === 'ABOVE_10' ? product.stock > 10 : product.stock < 3);
    const matchesTotalSold =
      filterTotalSold === 'ALL' ||
      (filterTotalSold === 'HIGH_SOLD'
        ? product.totalSold > 5
        : product.totalSold < 5);
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    return matchesStock && matchesTotalSold && matchesSearch;
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
          Data Product
        </h4>
      </div>
      <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
        <div className="flex justify-between pb-4">
          <div>
            {/* Filter by Stock */}
            <div>
              <label
                htmlFor="stockFilter"
                className="mr-2 text-black dark:text-white"
              >
                Filter by Stock:
              </label>
              <select
                id="stockFilter"
                value={filterStock}
                onChange={(e) => setFilterStock(e.target.value)}
                className="border border-gray-300 rounded-md p-2"
              >
                <option value="ALL">All</option>
                <option value="ABOVE_10">Stock Diatas 10</option>
                <option value="BELOW_3">Stock Dibawah 3</option>
              </select>
            </div>

            {/* Filter by Total Sold */}
            <div className="mt-4">
              <label
                htmlFor="totalSoldFilter"
                className="mr-2 text-black dark:text-white"
              >
                Filter by Total Sold:
              </label>
              <select
                id="totalSoldFilter"
                value={filterTotalSold}
                onChange={(e) => setFilterTotalSold(e.target.value)}
                className="border border-gray-300 rounded-md p-2"
              >
                <option value="ALL">All</option>
                <option value="HIGH_SOLD">Tejual Terbanyak</option>
                <option value="LOW_SOLD">Terjual Sedikit</option>
              </select>
            </div>
          </div>

          {/* Search by name */}
          <div>
            <input
              type="text"
              placeholder="Search by name"
              className="px-4 py-2 border rounded-md"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        <DataTable
          columns={columns}
          data={filteredProducts}
          pagination
          highlightOnHover
          pointerOnHover
          responsive
          striped
          noDataComponent="No products available."
        />
      </div>
    </div>
  );
};

export default DataProduct;
