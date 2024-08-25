import React, { useState, useEffect, useRef } from 'react';

const ImageSlider = () => {
  const [index, setIndex] = useState(0);
  const sliderRef = useRef(null);
  const images = [
    'https://ik.imagekit.io/xnl4hkzkx/Biru%20Modern%20Spanduk%20Servis%20Laptop%20dan%20Komputer%20Banner%20(1).png?updatedAt=1724598177686',
    'https://ik.imagekit.io/xnl4hkzkx/Blue%20and%20Purple%20Gradient%20Laptop%20Sale%20Banner%20(1).png?updatedAt=1724598929215',
    'https://ik.imagekit.io/xnl4hkzkx/Biru%20Putih%20Ilustrasi%20Modern%20Promo%20Diskon%20Tahun%20Baru%20Banner%20(1).png?updatedAt=1724599258757',
  ];

  const showSlide = (i) => {
    const totalImages = images.length;
    setIndex((prevIndex) => (i + totalImages) % totalImages);
  };

  const nextSlide = () => {
    showSlide(index + 1);
  };

  const prevSlide = () => {
    showSlide(index - 1);
  };

  useEffect(() => {
    const slider = sliderRef.current;
    slider.style.transform = `translateX(-${index * 100}%)`;
  }, [index]);

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000); // Ganti gambar setiap 5 detik

    return () => clearInterval(interval); // Bersihkan interval saat komponen di-unmount
  }, [index]);

  return (
    <div className="relative overflow-hidden rounded-lg shadow-lg mb-6 mt-10">
      <div
        className="flex transition-transform duration-500 ease-in-out"
        ref={sliderRef}
      >
        {images.map((image, imgIndex) => (
          <div className="min-w-full" key={imgIndex}>
            <img
              src={image}
              alt={`Slider Image ${imgIndex + 1}`}
              className="w-full h-auto object-cover"
            />
          </div>
        ))}
      </div>
      <button
        className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white text-black p-2 rounded-full shadow"
        onClick={prevSlide}
      >
        &#9664;
      </button>
      <button
        className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white text-black p-2 rounded-full shadow"
        onClick={nextSlide}
      >
        &#9654;
      </button>
    </div>
  );
};

export default ImageSlider;
