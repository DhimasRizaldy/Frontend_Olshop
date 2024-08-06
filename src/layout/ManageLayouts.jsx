import React from 'react';

const ManageLayouts = (props) => {
  const { children, title } = props;
  return (
    <div className="grid grid-cols-5 gap-8 mt-10 justify-center">
      <div className="col-span-5 xl:col-span-3">
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          {/* <div className="border-b border-stroke py-4 px-7 dark:border-strokedark">
            <h3 className="text-xl font-semibold text-black dark:text-white">
              {TitleBar({ title })}
            </h3>
          </div> */}
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
    displayText = 'Add Data Product';
  } else if (title === 'editProduct') {
    displayText = 'Edit Data Product';
  } else if (title === 'detailProduct') {
    displayText = 'Detail Data Product';
  } else if (title === 'addUsers') {
    displayText = 'Add Data Users';
  } else if (title === 'editUsers') {
    displayText = 'Edit Data Users';
  } else if (title === 'detailUsers') {
    displayText = 'Detail Data Users';
  } else if (title === 'addManagement') {
    displayText = 'Add Data Management';
  } else if (title === 'editManagement') {
    displayText = 'Edit Data Management';
  } else if (title === 'detailManagement') {
    displayText = 'Detail Data Management';
  } else if (title === 'addSupplier') {
    displayText = 'Add Data Supplier';
  } else if (title === 'editSupplier') {
    displayText = 'Edit Data Supplier';
  } else if (title === 'detailSupplier') {
    displayText = 'Detail Data Supplier';
  } else if (title === 'addCategory') {
    displayText = 'Add Data Category';
  } else if (title === 'editCategory') {
    displayText = 'Edit Data Category';
  } else if (title === 'detailCategory') {
    displayText = 'Detail Data Category';
  } else if (title === 'addPromo') {
    displayText = 'Add Data Promo';
  } else if (title === 'editPromo') {
    displayText = 'Edit Data Promo';
  } else if (title === 'detailPromo') {
    displayText = 'Detail Data Promo';
  } else if (title === 'addTransaction') {
    displayText = 'Add Data Transaction';
  } else if (title === 'editTransaction') {
    displayText = 'Edit Data Transaction';
  } else if (title === 'detailTransaction') {
    displayText = 'Detail Data Transaction';
  } else if (title === 'addRating') {
    displayText = 'Add Data Rating';
  } else if (title === 'editRating') {
    displayText = 'Edit Data Rating';
  } else if (title === 'detailRating') {
    displayText = 'Detail Data Rating';
  }
};

export default ManageLayouts;
