import React from 'react';
import AddAddress from '../../Admin/Address/AddModalAddress';

const ModalAddAddress = ({ show, onClose }) => {
  if (!show) {
    return null;
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow-lg z-50 w-full max-w-lg">
        <h2 className="text-lg font-bold mb-4">Tambah Alamat</h2>
        <AddAddress onClose={onClose} />
        <button
          onClick={onClose}
          className="mt-4 bg-gray-300 text-black px-4 py-2 rounded-md hover:bg-gray-400 transition duration-300"
        >
          Tutup
        </button>
      </div>
      <div className="fixed inset-0 bg-black opacity-50"></div>
    </div>
  );
};

export default ModalAddAddress;
