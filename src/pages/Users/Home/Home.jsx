import UserLayouts from '../../../layout/UserLayouts';
import ProductNew from '../../../components/Fragments/Users/Home/ProductNew';
import ImageSlider from '../../../components/Slider/ImageSlider';
import CategorySlider from '../../../components/Fragments/Users/Home/CategorySlider';
import ProductDiscount from '../../../components/Fragments/Users/Home/ProductDiscount';

const Home = () => {
  return (
    <UserLayouts>
      <ImageSlider />
      <CategorySlider />
      <ProductNew />
      <ProductDiscount />
    </UserLayouts>
  );
};

export default Home;
