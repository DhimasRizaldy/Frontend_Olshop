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
  const [filterRole, setFilterRole] = useState('ALL');

  // get user
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await getUser();
        setUsers(response.data || []); // Simpan data user dalam state
      } catch (error) {
        console.error('Fetch user failed:', error.message);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  // handle delete
const handleDelete = async (userId, username, userRole) => {
  const deleteUserAndReload = async () => {
    try {
      const response = await deleteUser(userId);
      Swal.fire(
        'Success!',
        `User "${username}" has been deleted successfully.`,
        'success',
      ).then(() => {
        window.location.reload(); // Reload page after successful deletion
      });
    } catch (error) {
      console.error('Error deleting user:', error.message);
      Swal.fire('Error!', `Failed to delete user "${username}".`, 'error').then(
        () => {
          window.location.reload(); // Reload page after failure
        },
      );
    }
  };

  if (userRole === 'ADMIN') {
    Swal.fire({
      title: 'Delete Admin?',
      text: `You are about to delete an Admin user "${username}". Are you sure you want to proceed?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete Admin!',
    }).then((result) => {
      if (result.isConfirmed) {
        deleteUserAndReload();
      }
    });
  } else {
    Swal.fire({
      title: 'Are you sure?',
      text: `You are about to delete the user "${username}". You won't be able to revert this!`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        deleteUserAndReload();
      }
    });
  }
};


  const columns = [
    {
      name: 'No',
      selector: (row, index) => index + 1,
      sortable: true,
      width: '80px',
    },
    {
      name: 'UserId',
      selector: (row) => row.userId,
      sortable: true,
    },
    {
      name: 'Username',
      selector: (row) => row.username,
      sortable: true,
    },
    {
      name: 'Email',
      selector: (row) => row.email,
      sortable: true,
    },
    {
      name: 'Role',
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
      name: 'Action',
      cell: (row) => (
        <div className="flex items-center space-x-3.5">
          <button
            className="hover:text-primary"
            onClick={() => handleDelete(row.userId, row.username)}
          >
            <FontAwesomeIcon icon={faTrash} />
          </button>
        </div>
      ),
    },
  ];

  // Filter users based on search term and role
  const filteredUsers = users.filter(
    (user) =>
      (filterRole === 'ALL' || user.role === filterRole) &&
      (user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.userId
          .toString()
          .toLowerCase()
          .includes(searchTerm.toLowerCase())),
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
          Data Users
        </h4>
      </div>
      <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
        <div className="flex justify-between pb-4">
          <div>
            <button
              className={`mr-2 px-4 py-2 rounded-md ${
                filterRole === 'ALL' ? 'bg-primary text-white' : 'bg-gray-300'
              }`}
              onClick={() => setFilterRole('ALL')}
            >
              All
            </button>
            <button
              className={`mr-2 px-4 py-2 rounded-md ${
                filterRole === 'USER' ? 'bg-success text-white' : 'bg-gray-300'
              }`}
              onClick={() => setFilterRole('USER')}
            >
              User
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
            placeholder="Search by username, email, role or ID"
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
          noDataComponent="No users available."
        />
      </div>
    </div>
  );
};

export default DataUser;
