import React from 'react';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { addProduct } from '../../../../services/admin/category/services-product';

const AddProduct = () => {
  const [name, setName] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [price, setPrice] = useState('');
  const [promoPrice, setPromoPrice] = useState('');
  const [weight, setWeight] = useState(false);
  const [stock, setStock] = useState([]);
  const [description, setDescription] = useState([]);

  useEffect(() => {
    // Fetch category when the component mounts
    const fetchcategory = async () => {
      try {
        const categoryResponse = await getCategory();
        // console.log(categoryResponse.data);

        const categoryOptions = categoryResponse.data.map((category) => ({
          value: category.categoryId,
          label: category.name, // assuming categoryName is the name field
        }));

        setCategoryOptions(categoryOptions);
      } catch (error) {
        toast.error('Failed to fetch categories');
        console.error('Error fetching categories:', error);
      }
    };

    fetchcategory();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // console.log('categoryId:');

    if (!categoryId) {
      toast.error('Please fill in all fields');
      return;
    }

    const manageStokData = {
      supplierId,
      productId,
      stockIn: parseInt(stockIn, 10),
      dateStockIn: new Date(dateStockIn).toISOString(),
    };

    setIsLoading(true);

    try {
      await addManageStok(manageStokData);
      toast.success('Manage Stock added successfully!');
      setSupplierId('');
      setProductId('');
      setStockIn('');
      setDateStockIn('');
    } catch (error) {
      toast.error('Failed to add manage Stock');
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <form action="#">
      <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
      <div className="w-full sm:w-1/2">
          <label
            className="mb-3 block font-medium text-black dark:text-white"
          >
            Name
          </label>
          <div className="relative">
            <input
              className="w-full rounded border border-stroke py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
              type="text"
              name="Name"
              id="Name"
            />
          </div>
        </div>
        <div className="w-full sm:w-1/2">
          <label
            className="mb-3 block font-medium text-black dark:text-white"
          >
            Category Id
          </label>
          <div className="relative">
            <input
              className="w-full rounded border border-stroke py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
              type="text"
              name="CategoryId"
              id="CategoryId"
            />
          </div>
        </div>
      </div>
      <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
      <div className="w-full sm:w-1/2">
          <label
            className="mb-3 block font-medium text-black dark:text-white"
          >
            Price
          </label>
          <div className="relative">
            <input
              className="w-full rounded border border-stroke py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
              type="text"
              name="Price"
              id="Price"
            />
          </div>
        </div>
        <div className="w-full sm:w-1/2">
          <label
            className="mb-3 block font-medium text-black dark:text-white"
          >
            Promo Price
          </label>
          <div className="relative">
            <input
              className="w-full rounded border border-stroke py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
              type="text"
              name="promoPrice"
              id="promoPrice"
            />
          </div>
        </div>
      </div>
      <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
      <div className="w-full sm:w-1/2">
          <label
            className="mb-3 block font-medium text-black dark:text-white"
          >
            Weight
          </label>
          <div className="relative">
            <input
              className="w-full rounded border border-stroke py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
              type="text"
              name="Weight"
              id="Weight"
            />
          </div>
        </div>
        <div className="w-full sm:w-1/2">
          <label
            className="mb-3 block font-medium text-black dark:text-white"
          >
            Stock
          </label>
          <div className="relative">
            <input
              className="w-full rounded border border-stroke py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
              type="text"
              name="Stock"
              id="Stock"
            />
          </div>
        </div>
      </div>
      <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
      <div className="w-full sm:w-1/2">
          <label
            className="mb-3 block font-medium text-black dark:text-white"
          >
            description
          </label>
          <div className="relative">
            <input
              className="w-full rounded border border-stroke py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
              type="text"
              name="description"
              id="description"
            />
          </div>
        </div>
        <div className="w-full sm:w-1/2">
          <label
            className="mb-3 block font-medium text-black dark:text-white"
          >
            Image
          </label>
          <div className="relative">
            <input
              className="w-full rounded border border-stroke py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
              type="text"
              name="Image"
              id="Image"
            />
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-4.5">
        <Link to="/product">
          <button
            className="flex justify-center rounded border border-stroke py-2 px-6 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-white"
            type="submit"
          >
            Cancel
          </button>
        </Link>
        <button
          className="flex justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:bg-opacity-90"
          type="submit"
        >
          Save
        </button>
      </div>
    </form>
  );
};

export default AddProduct;
