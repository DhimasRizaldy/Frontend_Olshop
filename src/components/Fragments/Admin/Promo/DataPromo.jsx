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
  getPromo,
  deletePromo,
} from '../../../../services/admin/promo/services-promo';
import { getWHOAMI } from '../../../../services/auth/admin/getDataUser';

const DataPromo = () => {
  const [promo, setPromo] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filterStatus, setFilterStatus] = useState('ALL');
  const [role, setRole] = useState('USER');

  // Fetch promos
  useEffect(() => {
    const fetchPromo = async () => {
      try {
        const response = await getPromo();
        setPromo(response.data || []);
      } catch (error) {
        console.error('Gagal mengambil promo:', error.message);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchPromo();
  }, []);

  // Fetch user role
  useEffect(() => {
    const fetchUserRole = async () => {
      try {
        const response = await getWHOAMI();
        setRole(response.data.user.role);
      } catch (error) {
        console.error('Gagal mengambil peran pengguna:', error.message);
        setError(error.message);
      }
    };
    fetchUserRole();
  }, []);

  // Handle delete
  const handleDelete = async (promoId, promoName) => {
    Swal.fire({
      title: 'Apakah Anda yakin?',
      text: `Anda akan menghapus promo "${promoName}". Tindakan ini tidak dapat dibatalkan!`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Ya, hapus!',
      cancelButtonText: 'Batal',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await deletePromo(promoId);
          if (response.success) {
            Swal.fire(
              'Dihapus!',
              `Promo "${promoName}" telah dihapus.`,
              'success',
            );
            setPromo(promo.filter((promo) => promo.promoId !== promoId));
          }
        } catch (error) {
          console.error('Error menghapus promo:', error.message);
          Swal.fire('Gagal!', error.message, 'error');
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
      name: 'PromoId',
      selector: (row) => row.promoId,
      sortable: true,
    },
    {
      name: 'Kode Promo',
      selector: (row) => row.codePromo,
      sortable: true,
      cell: (row) => (
        <p className="inline-flex rounded-full bg-opacity-10 py-1 px-3 text-sm font-medium bg-success text-success">
          {row.codePromo}
        </p>
      ),
    },
    {
      name: 'Diskon',
      selector: (row) => `${row.discount} %`,
      sortable: true,
      cell: (row) => (
        <p className="inline-flex rounded-full bg-opacity-10 py-1 px-3 text-sm font-medium bg-primary text-primary">
          {row.discount} %
        </p>
      ),
    },
    {
      name: 'Aktif',
      selector: (row) => new Date(row.activeAt).toLocaleDateString('id-ID'),
      sortable: true,
    },
    {
      name: 'Kadaluarsa',
      selector: (row) => new Date(row.expiresAt).toLocaleDateString('id-ID'),
      sortable: true,
    },
    {
      name: 'Aksi',
      cell: (row) => (
        <div className="flex items-center space-x-3.5">
          <Link to={`/detail-promo/${row.promoId}`}>
            <button className="hover:text-primary">
              <FontAwesomeIcon icon={faEye} />
            </button>
          </Link>
          {role === 'ADMIN' && (
            <>
              <Link to={`/edit-promo/${row.promoId}`}>
                <button className="hover:text-primary">
                  <FontAwesomeIcon icon={faPenToSquare} />
                </button>
              </Link>
              <button
                className="hover:text-primary"
                onClick={() => handleDelete(row.promoId, row.codePromo)}
              >
                <FontAwesomeIcon icon={faTrash} />
              </button>
            </>
          )}
        </div>
      ),
    },
  ];

  // Filter promos based on status
  const filteredPromos = promo.filter((promo) => {
    if (filterStatus === 'ALL') return true;
    const currentDate = new Date();
    const expireDate = new Date(promo.expiresAt);
    return filterStatus === 'ACTIVE'
      ? expireDate >= currentDate
      : expireDate < currentDate;
  });

  if (loading) {
    return <div>Memuat...</div>;
  }
  if (error) {
    return <div>Kesalahan: {error}</div>;
  }

  return (
    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="py-6 px-4 md:px-6 xl:px-7.5">
        <h4 className="text-xl font-semibold text-black dark:text-white">
          Data Promo
        </h4>
      </div>
      <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
        <div className="flex justify-between pb-4">
          <div>
            <button
              className={`mr-2 px-4 py-2 rounded-md ${
                filterStatus === 'ALL' ? 'bg-primary text-white' : 'bg-gray-300'
              }`}
              onClick={() => setFilterStatus('ALL')}
            >
              Semua
            </button>
            <button
              className={`mr-2 px-4 py-2 rounded-md ${
                filterStatus === 'ACTIVE'
                  ? 'bg-success text-white'
                  : 'bg-gray-300'
              }`}
              onClick={() => setFilterStatus('ACTIVE')}
            >
              Aktif
            </button>
            <button
              className={`px-4 py-2 rounded-md ${
                filterStatus === 'EXPIRED'
                  ? 'bg-primary text-white'
                  : 'bg-gray-300'
              }`}
              onClick={() => setFilterStatus('EXPIRED')}
            >
              Kadaluarsa
            </button>
          </div>
        </div>
        <DataTable
          columns={columns}
          data={filteredPromos}
          pagination
          highlightOnHover
          pointerOnHover
          responsive
          striped
          noDataComponent="Tidak ada promo tersedia."
        />
      </div>
    </div>
  );
};

export default DataPromo;
