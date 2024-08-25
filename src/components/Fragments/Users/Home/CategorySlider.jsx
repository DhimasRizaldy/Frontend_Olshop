import React, { useRef, useEffect } from 'react';

const CategorySlider = () => {
  const sliderRef = useRef(null); // Gunakan useRef untuk mendapatkan referensi ke elemen slider

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
        {[
          'Laptop',
          'Printer',
          'Keyboard',
          'Mouse',
          'Headset',
          'Monitor',
          'Laptop',
          'Printer',
          'Keyboard',
          'Mouse',
          'Headset',
          'Monitor',
        ].map((category, index) => (
          <div
            key={index}
            className="bg-white rounded-full px-6 py-3 shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer whitespace-nowrap"
          >
            {category}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategorySlider;
