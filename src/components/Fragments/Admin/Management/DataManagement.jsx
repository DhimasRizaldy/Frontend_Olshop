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
  getManageStok,
  deleteManageStok,
} from '../../../../services/admin/manageStok/services-manageStok';
import { formatRupiah } from '../../../../utils/constants/function';

const DataManagement = () => {
  const [manageStoks, setManageStok] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Format tanggal ke MM/DD/YYYY
  const formatTanggal = (tanggal) => {
    const date = new Date(tanggal);
    return date.toLocaleDateString('en-US'); // Mengubah ke format MM/DD/YYYY
  };

  // Format number with thousands separator
  const formatNumber = (value) => {
    return new Intl.NumberFormat('id-ID').format(value);
  };

  // get manage stok
  useEffect(() => {
    const fetchManageStok = async () => {
      try {
        const response = await getManageStok();
        setManageStok(response.data || []); // Simpan data stok dalam state
      } catch (error) {
        console.error('Fetch manage stok gagal:', error.message);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchManageStok();
  }, []);

  // handle delete
  const handleDelete = async (manageStockId, manageStokName) => {
    Swal.fire({
      title: 'Apakah Anda yakin?',
      text: `Anda akan menghapus stok produk "${manageStokName}". Data yang dihapus tidak bisa dikembalikan!`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Ya, hapus!',
      cancelButtonText: 'Batal',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await deleteManageStok(manageStockId);
          if (response.success) {
            Swal.fire(
              'Terhapus!',
              `Stok produk "${manageStokName}" berhasil dihapus.`,
              'success',
            );
            // Update state untuk menghapus data yang dihapus
            setManageStok(
              manageStoks.filter(
                (manageStok) => manageStok.manageStockId !== manageStockId,
              ),
            );
          }
        } catch (error) {
          console.error('Gagal menghapus stok produk:', error.message);
          Swal.fire('Error', error.message, 'error');
        }
      }
    });
  };

  // Format Rupiah with "Rp" and dot separator for thousands
  const formatRupiah = (value) => {
    if (!value) return '';
    return `Rp ${value.replace(/\D/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, '.')}`;
  };

  const columns = [
    {
      name: 'No',
      selector: (row, index) => index + 1,
      sortable: true,
      width: '80px',
    },
    {
      name: 'ID MProduk',
      selector: (row) => row.manageStockId,
      sortable: true,
    },
    {
      name: 'ID Suplier',
      selector: (row) => row.supplier.name,
      sortable: true,
    },
    {
      name: 'ID Produk',
      selector: (row) => row.product.name,
      sortable: true,
    },
    {
      name: 'Stok Masuk',
      selector: (row) => formatNumber(row.stockIn), // Use thousands separator for stockIn
      sortable: true,
    },
    {
      name: 'Harga Modal',
      selector: (row) =>
        row.purchasePrice ? formatRupiah(row.purchasePrice.toString()) : 'N/A',
      sortable: true,
    },
    {
      name: 'Tanggal Stok Masuk',
      selector: (row) => formatTanggal(row.dateStockIn), // Format tanggal ke MM/DD/YYYY
      sortable: true,
    },
    {
      name: 'Aksi',
      cell: (row) => (
        <div className="flex items-center space-x-3.5">
          <Link to={`/detail-management/${row.manageStockId}`}>
            <button className="hover:text-primary">
              <FontAwesomeIcon icon={faEye} />
            </button>
          </Link>
          <Link to={`/edit-management/${row.manageStockId}`}>
            <button className="hover:text-primary">
              <FontAwesomeIcon icon={faPenToSquare} />
            </button>
          </Link>
          <button
            className="hover:text-primary"
            onClick={() => handleDelete(row.manageStockId, row.product.name)}
          >
            <FontAwesomeIcon icon={faTrash} />
          </button>
        </div>
      ),
    },
  ];

  // Filter manage stok berdasarkan search term
  const filteredManageStoks = manageStoks.filter(
    (manageStok) =>
      manageStok.product.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      manageStok.supplier.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      manageStok.manageStockId
        .toString()
        .toLowerCase()
        .includes(searchTerm.toLowerCase()),
  );

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
          Data Manajemen Produk
        </h4>
      </div>
      <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
        <div className="flex justify-end pb-4">
          <input
            type="text"
            placeholder="Cari berdasarkan produk, supplier, atau ID"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          />
        </div>
        <DataTable
          columns={columns}
          data={filteredManageStoks}
          pagination
          highlightOnHover
          pointerOnHover
          responsive
          striped
          noDataComponent="Data stok produk tidak tersedia."
        />
      </div>
    </div>
  );
};

export default DataManagement;
