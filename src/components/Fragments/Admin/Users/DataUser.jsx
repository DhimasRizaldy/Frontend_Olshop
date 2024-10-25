import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import DataTable from 'react-data-table-component';
import {
  getUser,
  deleteUser,
} from '../../../../services/admin/user/services-user';

const DataUser = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState('SEMUA');

  // Mendapatkan data user
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await getUser();
        setUsers(response.data || []);
      } catch (error) {
        console.error('Gagal mengambil data user:', error.message);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  // Fungsi untuk menghapus user
  const handleDelete = async (userId, username, userRole) => {
    const deleteUserAndReload = async () => {
      try {
        await deleteUser(userId);
        Swal.fire(
          'Sukses!',
          `Pengguna "${username}" berhasil dihapus.`,
          'success',
        ).then(() => {
          window.location.reload(); // Reload halaman setelah berhasil menghapus
        });
      } catch (error) {
        console.error('Error menghapus user:', error.message);
        Swal.fire(
          'Gagal!',
          `Gagal menghapus pengguna "${username}".`,
          'error',
        ).then(() => {
          window.location.reload(); // Reload halaman setelah gagal menghapus
        });
      }
    };

    if (userRole === 'ADMIN') {
      Swal.fire({
        title: 'Hapus Admin?',
        text: `Anda akan menghapus pengguna Admin "${username}". Anda yakin ingin melanjutkan?`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Ya, hapus Admin!',
      }).then((result) => {
        if (result.isConfirmed) {
          deleteUserAndReload();
        }
      });
    } else {
      Swal.fire({
        title: 'Apakah Anda yakin?',
        text: `Anda akan menghapus pengguna "${username}". Tindakan ini tidak dapat dibatalkan!`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Ya, hapus!',
      }).then((result) => {
        if (result.isConfirmed) {
          deleteUserAndReload();
        }
      });
    }
  };

  // Kolom tabel
  const columns = [
    {
      name: 'No',
      selector: (row, index) => index + 1,
      sortable: true,
      width: '80px',
    },
    {
      name: 'ID Pengguna',
      selector: (row) => row.userId,
      sortable: true,
    },
    {
      name: 'Nama Pengguna',
      selector: (row) => row.username,
      sortable: true,
    },
    {
      name: 'Email',
      selector: (row) => row.email,
      sortable: true,
    },
    {
      name: 'Akses',
      cell: (row) => (
        <p
          className={`inline-flex rounded-full bg-opacity-10 py-1 px-3 text-sm font-medium ${
            row.role === 'USER'
              ? 'bg-success text-success'
              : row.role === 'ADMIN'
                ? 'bg-primary text-primary'
                : 'bg-warning text-warning'
          }`}
        >
          {row.role}
        </p>
      ),
      sortable: true,
    },
    {
      name: 'Aksi',
      cell: (row) => (
        <div className="flex items-center space-x-3.5">
          <button
            className="hover:text-primary"
            onClick={() => handleDelete(row.userId, row.username, row.role)}
          >
            <FontAwesomeIcon icon={faTrash} />
          </button>
        </div>
      ),
    },
  ];

  // Filter data berdasarkan peran dan pencarian
  const filteredUsers = users.filter(
    (user) =>
      (filterRole === 'SEMUA' || user.role === filterRole) &&
      (user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.userId
          .toString()
          .toLowerCase()
          .includes(searchTerm.toLowerCase())),
  );

  if (loading) {
    return <div>Memuat data...</div>;
  }

  if (error) {
    return <div>Kesalahan: {error}</div>;
  }

  return (
    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="py-6 px-4 md:px-6 xl:px-7.5">
        <h4 className="text-xl font-semibold text-black dark:text-white">
          Data Pengguna
        </h4>
      </div>
      <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
        <div className="flex justify-between pb-4">
          <div>
            <button
              className={`mr-2 px-4 py-2 rounded-md ${
                filterRole === 'SEMUA' ? 'bg-primary text-white' : 'bg-gray-300'
              }`}
              onClick={() => setFilterRole('SEMUA')}
            >
              Semua
            </button>
            <button
              className={`mr-2 px-4 py-2 rounded-md ${
                filterRole === 'USER' ? 'bg-success text-white' : 'bg-gray-300'
              }`}
              onClick={() => setFilterRole('USER')}
            >
              Pengguna
            </button>
            <button
              className={`px-4 py-2 rounded-md ${
                filterRole === 'ADMIN' ? 'bg-primary text-white' : 'bg-gray-300'
              }`}
              onClick={() => setFilterRole('ADMIN')}
            >
              Admin
            </button>
          </div>
          <input
            type="text"
            placeholder="Cari berdasarkan nama pengguna, email, peran, atau ID"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          />
        </div>
        <DataTable
          columns={columns}
          data={filteredUsers}
          pagination
          highlightOnHover
          pointerOnHover
          responsive
          striped
          noDataComponent="Tidak ada data pengguna."
        />
      </div>
    </div>
  );
};

export default DataUser;
