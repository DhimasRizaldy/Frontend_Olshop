import React from 'react';
import CardDataStats from '../../../components/CardDataStats';
import DefaultLayout from '../../../layout/DefaultLayout';
import {
  faUsers,
  faUser,
  faBoxesStacked,
  faCartShopping,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import DataTransaction from '../../../components/Fragments/Admin/Transaction/DataTransaction.jsx';
import DataRating from '../../../components/Fragments/Admin/Rating/DataRating.jsx';

const ECommerce: React.FC = () => {
  return (
    <DefaultLayout>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
        <CardDataStats title="Total Users" total="3.500">
          <FontAwesomeIcon icon={faUsers} />
        </CardDataStats>
        <CardDataStats title="Total Admin" total="2">
          <FontAwesomeIcon icon={faUser} />
        </CardDataStats>
        <CardDataStats title="Total Product" total="2.450">
          <FontAwesomeIcon icon={faBoxesStacked} />
        </CardDataStats>
        <CardDataStats title="Total Transaction" total="1.200">
          <FontAwesomeIcon icon={faCartShopping} />
        </CardDataStats>
      </div>
      <div className="mt-4 flex flex-col gap-10">
        <DataRating />
      </div>
      <div className="mt-4 flex flex-col gap-10">
        <DataTransaction />
      </div>
    </DefaultLayout>
  );
};

export default ECommerce;
