import React from 'react';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getProduct } from '../../../../services/admin/product/services-product';

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

    const Product = {
      name,
      categoryId,
      price,
      promoPrice,
      weight,
      stock,
      description
    };

    setIsLoading(true);

    try {
      await addProduct(Product);
      toast.success('Product added successfully!');
      setName('');
      setCategoryId('');
      setPrice('');
      setPromoPrice('');
      setWeight(false);
      setStock([]);
      setDescription('');
      
    } catch (error) {
      toast.error('Failed to add Product');
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <form onSubmit={handleSubmit}>
      {/* Toast Container for notifications */}
      <ToastContainer />

      <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
        <div className="w-full sm:w-1/2">
          <label
            className="mb-3 block font-medium text-black dark:text-white"
            htmlFor="name"
          >
            Name
          </label>
          <div className="relative">
            <input
              className="w-full rounded border border-stroke py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
              type="text"
              name="name"
              id="name"
              placeholder="Product Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
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
