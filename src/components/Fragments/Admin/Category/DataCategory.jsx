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
  getCategories,
  deleteCategory,
} from '../../../../services/admin/category/services-category';

const DataCategory = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await getCategories();
        setCategories(response.data || []);
      } catch (error) {
        console.error('Gagal mengambil data kategori:', error.message);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  const handleDelete = async (categoryId, categoryName) => {
    Swal.fire({
      title: 'Apakah Anda yakin?',
      text: `Anda akan menghapus kategori "${categoryName}". Tindakan ini tidak bisa dibatalkan!`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Ya, hapus!',
      cancelButtonText: 'Batal',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await deleteCategory(categoryId);
          if (response.success) {
            Swal.fire(
              'Dihapus!',
              `Kategori "${categoryName}" telah dihapus.`,
              'success',
            );
            setCategories(
              categories.filter(
                (category) => category.categoryId !== categoryId,
              ),
            );
          }
        } catch (error) {
          Swal.fire(
            'Gagal!',
            `Terjadi kesalahan saat menghapus kategori "${categoryName}".`,
            'error',
          );
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
      name: 'ID Kategori',
      selector: (row) => row.categoryId,
      sortable: true,
    },
    {
      name: 'Nama Kategori',
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: 'Aksi',
      cell: (row) => (
        <div className="flex items-center space-x-3.5">
          <Link to={`/detail-category/${row.categoryId}`}>
            <button className="hover:text-primary">
              <FontAwesomeIcon icon={faEye} />
            </button>
          </Link>
          <Link to={`/edit-category/${row.categoryId}`}>
            <button className="hover:text-primary">
              <FontAwesomeIcon icon={faPenToSquare} />
            </button>
          </Link>
          <button
            className="hover:text-primary"
            onClick={() => handleDelete(row.categoryId, row.name)}
          >
            <FontAwesomeIcon icon={faTrash} />
          </button>
        </div>
      ),
    },
  ];

  // Filter categories based on search term
  const filteredCategories = categories.filter(
    (category) =>
      category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      category.categoryId
        .toString()
        .toLowerCase()
        .includes(searchTerm.toLowerCase()),
  );

  if (loading) {
    return <div>Memuat data...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="py-6 px-4 md:px-6 xl:px-7.5">
        <h4 className="text-xl font-semibold text-black dark:text-white">
          Data Kategori
        </h4>
      </div>
      <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
        <div className="flex justify-end pb-4">
          <input
            type="text"
            placeholder="Cari berdasarkan nama atau ID"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          />
        </div>
        <DataTable
          columns={columns}
          data={filteredCategories}
          pagination
          highlightOnHover
          pointerOnHover
          responsive
          striped
          noDataComponent="Tidak ada kategori yang tersedia."
        />
      </div>
    </div>
  );
};

export default DataCategory;
