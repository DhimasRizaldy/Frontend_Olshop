import React, { useRef, useEffect, useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css'; // Import CSS untuk skeleton loader
import { getCategories } from '../../../../services/admin/category/services-category';

const CategorySkeleton = () => (
  <div className="bg-white rounded-full px-6 py-3 shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer whitespace-nowrap">
    <Skeleton width={100} height={20} />
  </div>
);

const CategorySlider = () => {
  const [categories, setCategories] = useState([]); // State untuk menyimpan kategori
  const [isLoading, setIsLoading] = useState(true); // State untuk melacak status pemuatan data
  const sliderRef = useRef(null); // Gunakan useRef untuk mendapatkan referensi ke elemen slider

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await getCategories();
        const categoriesData = response.data; // Asumsikan data kategori ada di response.data
        setCategories(categoriesData); // Set kategori ke state
      } catch (error) {
        console.error('Error fetching categories:', error);
      } finally {
        setIsLoading(false); // Set loading menjadi false setelah data diambil atau terjadi error
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    const categorySlider = sliderRef.current;

    // Fungsi untuk menangani event wheel
    const handleWheel = (event) => {
      event.preventDefault(); // Mencegah perilaku scroll default
      categorySlider.scrollLeft += event.deltaY; // Menggeser slider berdasarkan deltaY
    };

    // Tambahkan event listener untuk event wheel
    categorySlider.addEventListener('wheel', handleWheel);

    // Bersihkan event listener ketika komponen di-unmount
    return () => {
      categorySlider.removeEventListener('wheel', handleWheel);
    };
  }, []); // Dependensi array kosong berarti useEffect hanya akan berjalan sekali ketika komponen dipasang

  return (
    <div className="max-w-6xl mx-auto px-4 py-4 overflow-x-auto">
      <h2 className="text-xl font-bold mb-4">Kategori Produk</h2>
      {/* Gunakan ref untuk menghubungkan div ini ke sliderRef */}
      <div className="flex space-x-4" ref={sliderRef}>
        {isLoading
          ? Array.from({ length: 6 }, (_, index) => (
              <CategorySkeleton key={index} /> // Tampilkan skeleton loader jika sedang memuat
            ))
          : categories.map((category, index) => (
              <div
                key={index}
                className="bg-white rounded-full px-6 py-3 shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer whitespace-nowrap"
              >
                {category.name}{' '}
                {/* Asumsi nama kategori ada di properti 'name' */}
              </div>
            ))}
      </div>
    </div>
  );
};

export default CategorySlider;
