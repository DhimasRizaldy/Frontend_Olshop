import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import {
  faPenToSquare,
  faTrash,
  faEye,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import {
  getProduct,
  deleteProduct,
} from '../../../../services/admin/product/services-product';
import { formatRupiah } from '../../../../utils/constants/function';

const DataProduct = () => {
  const [products, setProduct] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // get product
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await getProduct();
        // console.log('API Response:', response);
        setProduct(response.data || []); // Simpan data kategori dalam state
      } catch (error) {
        console.error('Fetch product failed:', error.message);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, []);

  // handle delete
  const handleDelete = async (productId, productName) => {
    Swal.fire({
      title: 'Are you sure?',
      text: `You are about to delete the product "${productName}". You won't be able to revert this!`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await deleteProduct(productId);
          if (response.success) {
            Swal.fire(
              'Deleted!',
              `Product "${productName}" has been deleted.`,
              'success',
            );
            // Update state to remove the deleted product
            setProduct(
              products.filter((product) => product.productId !== productId),
            );
          } else {
            Swal.fire('Error!', response.message, 'error');
          }
        } catch (error) {
          console.error('Delete product failed:', error.message);
          Swal.fire('Error!', error.message, 'error');
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
          Data Product
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
                  ProductId
                </th>
                <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white xl:pl-8">
                  Image
                </th>
                <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white xl:pl-8">
                  Name
                </th>
                <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                  CategoryId
                </th>
                <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                  Price
                </th>
                <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                  Promo
                </th>
                <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                  Weight
                </th>
                <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                  Stock
                </th>
                <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                  Description
                </th>
                <th className="py-4 px-4 font-medium text-black dark:text-white">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {products.length > 0 ? (
                products.map((product, index) => (
                  <tr key={product.productId}>
                    <td className="border-b border-[#eee] py-5 px-4 pl-6 dark:border-strokedark xl:pl-9">
                      <p className="text-black dark:text-white">{index + 1}</p>
                    </td>
                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                      <p
                        className={`inline-flex rounded-full bg-opacity-10 py-1 px-3 text-sm font-medium`}
                      >
                        {product.productId}
                      </p>
                    </td>
                    <td className="border-b border-[#eee] py-5 px-4 pl-6 dark:border-strokedark xl:pl-8">
                      {product.image ? (
                        <img
                          src={product.image}
                          alt="image"
                          className="h-10 w-10 rounded-full object-cover"
                        />
                      ) : (
                        <p className="text-black dark:text-white">No image</p>
                      )}
                    </td>
                    <td className="border-b border-[#eee] py-5 px-6 pl-6 dark:border-strokedark xl:pl-8">
                      <p className="text-black dark:text-white">
                        {product.name}
                      </p>
                    </td>
                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                      <p className="text-black dark:text-white">
                        {product.category.name}
                      </p>
                    </td>
                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                      <p className="text-black dark:text-white">
                        {formatRupiah(product.price)}
                      </p>
                    </td>
                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                      <p className="text-black dark:text-white">
                        {formatRupiah(product.promoPrice)}
                      </p>
                    </td>
                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                      <p className="text-black dark:text-white">
                        {product.weight} Gr
                      </p>
                    </td>
                    <td className="border-b border-[#eee] py-5 px-6 dark:border-strokedark">
                      <p className="text-black dark:text-white">
                        {product.stock}
                      </p>
                    </td>
                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                      <p className="text-black dark:text-white">
                        {product.description.length > 15
                          ? `${product.description.slice(0, 15)}...`
                          : product.description}
                      </p>
                    </td>
                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                      <div className="flex items-center space-x-3.5">
                        <Link to={`/detail-product/${product.productId}`}>
                          <button className="hover:text-primary">
                            <FontAwesomeIcon icon={faEye} />
                          </button>
                        </Link>
                        <Link to={`/edit-product/${product.productId}`}>
                          <button className="hover:text-primary">
                            <FontAwesomeIcon icon={faPenToSquare} />
                          </button>
                        </Link>
                        <button
                          className="hover:text-primary"
                          onClick={() =>
                            handleDelete(product.productId, product.name)
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
                  <td colSpan="10" className="text-center py-5">
                    No product available.
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

export default DataProduct;
