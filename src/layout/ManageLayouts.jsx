import React from 'react';

const ManageLayouts = (props) => {
  const { children, title } = props;
  return (
    <div className="grid grid-cols-5 gap-8 mt-10 justify-center">
      <div className="col-span-5 xl:col-span-3">
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="border-b border-stroke py-4 px-7 dark:border-strokedark">
            <TitleBar title={title} />
          </div>
          <div className="p-7">{children}</div>
        </div>
      </div>
    </div>
  );
};

// manage title layout
const TitleBar = ({ title }) => {
  let displayText;
  if (title === 'addProduct') {
    displayText = 'Tambah Data Produk';
  } else if (title === 'editProduct') {
    displayText = 'Edit Data Produk';
  } else if (title === 'detailProduct') {
    displayText = 'Detail Data Produk';
  } else if (title === 'addUsers') {
    displayText = 'Tambah Data Pengguna';
  } else if (title === 'editUsers') {
    displayText = 'Edit Data Pengguna';
  } else if (title === 'detailUsers') {
    displayText = 'Detail Data Pengguna';
  } else if (title === 'addManagement') {
    displayText = 'Tambah Data Manajemen';
  } else if (title === 'editManagement') {
    displayText = 'Edit Data Manajemen';
  } else if (title === 'detailManagement') {
    displayText = 'Detail Data Manajemen';
  } else if (title === 'AddSupplier') {
    displayText = 'Tambah Data Suplier';
  } else if (title === 'editSupplier') {
    displayText = 'Edit Data Suplier';
  } else if (title === 'detailSupplier') {
    displayText = 'Detail Data Suplier';
  } else if (title === 'addCategory') {
    displayText = 'Tambah Data Kategori';
  } else if (title === 'editCategory') {
    displayText = 'Edit Data Kategori';
  } else if (title === 'detailCategory') {
    displayText = 'Detail Data Kategori';
  } else if (title === 'addPromo') {
    displayText = 'Tambah Data Promo';
  } else if (title === 'editPromo') {
    displayText = 'Edit Data Promo';
  } else if (title === 'detailPromo') {
    displayText = 'Detail Data Promo';
  } else if (title === 'addTransaction') {
    displayText = 'Tambah Data Transaksi';
  } else if (title === 'editTransaction') {
    displayText = 'Edit Data Transaksi';
  } else if (title === 'detailTransaction') {
    displayText = 'Detail Data Transaksi';
  } else if (title === 'addRating') {
    displayText = 'Tambah Data Penilaian';
  } else if (title === 'editRating') {
    displayText = 'Edit Data Penilaian';
  } else if (title === 'detailRating') {
    displayText = 'Detail Data Penilaian';
  }

  return (
    <h3 className="text-xl font-semibold text-black dark:text-white">
      {displayText}
    </h3>
  );
};

export default ManageLayouts;
