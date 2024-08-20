import React, { useEffect, useState } from 'react';
import {
  faPenToSquare,
  faTrash,
  faEye,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import DataTable from 'react-data-table-component';
import {
  getSupplier,
  deleteSupplier,
} from '../../../../services/admin/supplier/services-supplier';

const DataSupplier = () => {
  const [suppliers, setSupplier] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  // get supplier
  useEffect(() => {
    const fetchSupplier = async () => {
      try {
        const response = await getSupplier();
        setSupplier(response.data || []); // Simpan data kategori dalam state
      } catch (error) {
        console.error('Fetch supplier failed:', error.message);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchSupplier();
  }, []);

  // handle delete
  const handleDelete = async (supplierId, supplierName) => {
    Swal.fire({
      title: 'Are you sure?',
      text: `You are about to delete the supplier "${supplierName}". You won't be able to revert this!`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await deleteSupplier(supplierId);
          if (response.success) {
            Swal.fire(
              'Deleted!',
              `Supplier "${supplierName}" has been deleted.`,
              'success',
            );
            // Update state to remove the deleted supplier
            setSupplier(
              suppliers.filter(
                (supplier) => supplier.supplierId !== supplierId,
              ),
            );
          }
        } catch (error) {
          console.error('Error deleting supplier:', error.message);
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
      name: 'SupplierId',
      selector: (row) => row.supplierId,
      sortable: true,
    },
    {
      name: 'Name',
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: 'Email',
      selector: (row) => row.email,
      sortable: true,
    },
    {
      name: 'Address',
      selector: (row) => row.address,
      sortable: true,
    },
    {
      name: 'PhoneNumber',
      selector: (row) => row.phoneNumber,
      sortable: true,
    },
    {
      name: 'Action',
      cell: (row) => (
        <div className="flex items-center space-x-3.5">
          <Link to={`/detail-supplier/${row.supplierId}`}>
            <button className="hover:text-primary">
              <FontAwesomeIcon icon={faEye} />
            </button>
          </Link>
          <Link to={`/edit-supplier/${row.supplierId}`}>
            <button className="hover:text-primary">
              <FontAwesomeIcon icon={faPenToSquare} />
            </button>
          </Link>
          <button
            className="hover:text-primary"
            onClick={() => handleDelete(row.supplierId, row.name)}
          >
            <FontAwesomeIcon icon={faTrash} />
          </button>
        </div>
      ),
    },
  ];

  // Filter suppliers based on search term
  const filteredSuppliers = suppliers.filter(
    (supplier) =>
      supplier.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      supplier.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      supplier.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
      supplier.phoneNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      supplier.supplierId
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
          Data Supplier
        </h4>
      </div>
      <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
        <div className="flex justify-end pb-4">
          <input
            type="text"
            placeholder="Search by name, email, address or phone number"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          />
        </div>
        <DataTable
          columns={columns}
          data={filteredSuppliers}
          pagination
          highlightOnHover
          pointerOnHover
          responsive
          striped
          noDataComponent="No supplier available."
        />
      </div>
    </div>
  );
};

export default DataSupplier;
