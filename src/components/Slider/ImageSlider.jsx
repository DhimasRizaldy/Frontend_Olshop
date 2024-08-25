import React, { useState, useEffect, useRef } from 'react';

const ImageSlider = () => {
  const [index, setIndex] = useState(0);
  const sliderRef = useRef(null);
  const images = [
    'https://via.placeholder.com/1200x400',
    'https://via.placeholder.com/1200x400',
    'https://via.placeholder.com/1200x400',
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