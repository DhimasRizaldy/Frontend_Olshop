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

  // get manage stok
  useEffect(() => {
    const fetchManageStok = async () => {
      try {
        const response = await getManageStok();
        setManageStok(response.data || []); // Simpan data kategori dalam state
      } catch (error) {
        console.error('Fetch manage stok failed:', error.message);
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
      title: 'Are you sure?',
      text: `You are about to delete the manage stok "${manageStokName}". You won't be able to revert this!`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await deleteManageStok(manageStockId);
          if (response.success) {
            Swal.fire(
              'Deleted!',
              `Manage stok "${manageStokName}" has been deleted.`,
              'success',
            );
            // Update state to remove the deleted manage stok
            setManageStok(
              manageStoks.filter(
                (manageStok) => manageStok.manageStockId !== manageStockId,
              ),
            );
          }
        } catch (error) {
          console.error('Error deleting manage stok:', error.message);
          Swal.fire('Error', error.message, 'error');
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
      name: 'MProductId',
      selector: (row) => row.manageStockId,
      sortable: true,
    },
    {
      name: 'SupplierId',
      selector: (row) => row.supplier.name,
      sortable: true,
    },
    {
      name: 'ProductId',
      selector: (row) => row.product.name,
      sortable: true,
    },
    {
      name: 'StockIn',
      selector: (row) => row.stockIn,
      sortable: true,
    },
    {
      name: 'PurchasePrice',
      selector: (row) =>
        row.purchasePrice ? formatRupiah(row.purchasePrice.toString()) : 'N/A',
      sortable: true,
    },
    {
      name: 'DateStockIn',
      selector: (row) => row.dateStockIn,
      sortable: true,
    },
    {
      name: 'Action',
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

  // Filter manage stoks based on search term
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
          Data Management Product
        </h4>
      </div>
      <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
        <div className="flex justify-end pb-4">
          <input
            type="text"
            placeholder="Search by product, supplier or ID"
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
          noDataComponent="No manage stok available."
        />
      </div>
    </div>
  );
};

export default DataManagement;
