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
  // Handle delete
  const handleDelete = async (productId, productName) => {
    Swal.fire({
      title: 'Apakah Anda yakin?',
      text: `Anda akan menghapus produk "${productName}". Tindakan ini tidak dapat dibatalkan!`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Ya, hapus!',
      cancelButtonText: 'Batal',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await deleteProduct(productId);
          if (response.success) {
            Swal.fire(
              'Terhapus!',
              `Produk "${productName}" telah dihapus.`,
              'success',
            );
            setProduct(
              products.filter((product) => product.productId !== productId),
            );
          } else {
            Swal.fire('Gagal!', response.message, 'error');
          }
        } catch (error) {
          Swal.fire('Gagal!', error.message, 'error');
        }
      }
    });
  };

  const formatNumber = (number) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  };

  const columns = [
    {
      name: 'No',
      selector: (row, index) => index + 1,
      sortable: true,
      width: '80px',
    },
    {
      name: 'ID Produk',
      selector: (row) => row.productId,
      sortable: true,
    },
    {
      name: 'Foto Produk',
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
      name: 'Nama Produk',
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: 'ID Kategori',
      selector: (row) => row.category.name,
      sortable: true,
    },
    {
      name: 'Harga',
      selector: (row) => formatRupiah(row.price),
      sortable: true,
    },
    {
      name: 'Harga Promo',
      selector: (row) => formatRupiah(row.promoPrice),
      sortable: true,
    },
    {
      name: 'Berat',
      selector: (row) => `${formatNumber(row.weight)} Gr`,
      sortable: true,
    },
    {
      name: 'Stok',
      selector: (row) => formatNumber(row.stock),
      sortable: true,
    },
    {
      name: 'Total Terjual',
      selector: (row) => formatNumber(row.totalSold),
      sortable: true,
    },
    {
      name: 'Total Review',
      selector: (row) => formatNumber(row.totalReview),
      sortable: true,
    },
    {
      name: 'Dekskripsi',
      selector: (row) =>
        row.description.length > 15
          ? `${row.description.slice(0, 15)}...`
          : row.description,
      sortable: true,
    },
    {
      name: 'Aksi',
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
          Data Produk
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
                Filter By Stok:
              </label>
              <select
                id="stockFilter"
                value={filterStock}
                onChange={(e) => setFilterStock(e.target.value)}
                className="border border-gray-300 rounded-md p-2"
              >
                <option value="ALL">Semua</option>
                <option value="ABOVE_10">Stok Diatas 10</option>
                <option value="BELOW_3">Stok Dibawah 3</option>
              </select>
            </div>

            {/* Filter by Total Sold */}
            <div className="mt-4">
              <label
                htmlFor="totalSoldFilter"
                className="mr-2 text-black dark:text-white"
              >
                Filter by Total Terjual:
              </label>
              <select
                id="totalSoldFilter"
                value={filterTotalSold}
                onChange={(e) => setFilterTotalSold(e.target.value)}
                className="border border-gray-300 rounded-md p-2"
              >
                <option value="ALL">Semua</option>
                <option value="HIGH_SOLD">Tejual Terbanyak</option>
                <option value="LOW_SOLD">Terjual Sedikit</option>
              </select>
            </div>
          </div>

          {/* Search by name */}
          <div>
            <input
              type="text"
              placeholder="Cari Nama Produk..."
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
          noDataComponent="Tidak ada data yang sesuai."
        />
      </div>
    </div>
  );
};

export default DataProduct;
