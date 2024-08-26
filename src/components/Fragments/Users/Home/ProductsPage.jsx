import React, { useState } from 'react';
import Header from '../../../Header/Header';
import ProductNew from './ProductNew';

const ProductsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div>
      <Header onSearch={setSearchTerm} /> {/* Pass search handler */}
      <ProductNew searchTerm={searchTerm} /> {/* Pass search term */}
    </div>
  );
};

export default ProductsPage;
