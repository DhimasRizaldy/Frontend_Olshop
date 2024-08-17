import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import {
  getUser,
  deleteUser,
} from '../../../../services/admin/user/services-user';

const DataUser = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
  const handleDelete = async (userId, username) => {
    Swal.fire({
      title: 'Are you sure?',
      text: `You are about to delete the user "${username}". You won't be able to revert this!`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await deleteUser(userId);
          if (response.success) {
            Swal.fire(
              'Deleted!',
              `Users "${username}" has been deleted.`,
              'success',
            );
          } else {
            Swal.fire(
              'Deleted!',
              `Users "${username}" has been deleted.`,
              'success',
            );
          }
        } catch (error) {
          console.error('Error deleting user:', error.message);
          Swal.fire(
            'Deleted!',
            `Users "${username}" has been deleted.`,
            'success',
          );
        } finally {
          // Update state to remove the deleted user
          setUsers(users.filter((user) => user.userId !== userId));
          // Reload the page after 2 seconds
          setTimeout(() => {
            window.location.reload();
          }, 2000);
        }
      }
    });
  };

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
        <div className="max-w-full overflow-x-auto">
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-gray-2 text-left dark:bg-meta-4">
                <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white xl:pl-8">
                  No
                </th>
                <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white xl:pl-8">
                  UserId
                </th>
                <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                  Username
                </th>
                <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                  Email
                </th>
                <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                  Role
                </th>
                <th className="py-4 px-4 font-medium text-black dark:text-white">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {users.length > 0 ? (
                users.map((user, index) => (
                  <tr key={user.userId}>
                    <td className="border-b border-[#eee] py-5 px-4 pl-6 dark:border-strokedark xl:pl-9">
                      <p className="text-black dark:text-white">{index + 1}</p>
                    </td>
                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                      <p
                        className={`inline-flex rounded-full bg-opacity-10 py-1 px-3 text-sm font-medium`}
                      >
                        {user.userId}
                      </p>
                    </td>
                    <td className="border-b border-[#eee] py-5 px-5 dark:border-strokedark xl:pl-6">
                      <p className="text-black dark:text-white">
                        {user.username}
                      </p>
                    </td>
                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                      <p className="text-black dark:text-white">{user.email}</p>
                    </td>
                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                      <p
                        className={`inline-flex rounded-full bg-opacity-10 py-1 px-3 text-sm font-medium ${
                          user.role === 'USER'
                            ? 'bg-success text-success'
                            : user.role === 'ADMIN'
                              ? 'bg-primary text-primary'
                              : 'bg-warning text-warning'
                        }`}
                      >
                        {user.role}
                      </p>
                    </td>
                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                      <div className="flex items-center space-x-3.5">
                        <button
                          className="hover:text-primary"
                          onClick={() =>
                            handleDelete(user.userId, user.username)
                          }
                        >
                          <FontAwesomeIcon icon={faTrash} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="text-center py-5">
                    No users available.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DataUser;
