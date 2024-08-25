import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-black text-white py-8">
      <div className="max-w-6xl mx-auto px-4 py-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        <div>
          <h3 className="text-xl font-semibold mb-4">Putra Komputer</h3>
          <p className="text-gray-400 mb-4">
            Your one-stop shop for all the latest tech products and accessories.
          </p>
          <p className="text-gray-400">
            © 2024 Toko Online. All rights reserved.
          </p>
        </div>
        <div>
          <h4 className="text-lg font-semibold mb-4">Useful Links</h4>
          <ul className="text-gray-400 space-y-2">
            <li>
              <Link to={'/about-us'} className="hover:text-blue-400">
                About Us
              </Link>
            </li>
            <li>
              <Link to={'/privacy-policy'} className="hover:text-blue-400">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link to={'/term-conditions'} className="hover:text-blue-400">
                Terms & Conditions
              </Link>
            </li>
            <li>
              <Link to={'/contact-us'} className="hover:text-blue-400">
                Contact Us
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="text-lg font-semibold mb-4">Customer Service</h4>
          <ul className="text-gray-400 space-y-2">
            <li>
              <Link to={'/faqs'} className="hover:text-blue-400">
                FAQs
              </Link>
            </li>
            <li>
              <Link to={'/order-tracking'} className="hover:text-blue-400">
                Order Tracking
              </Link>
            </li>
            
          </ul>
        </div>
        <div>
          <h4 className="text-lg font-semibold mb-4">Follow Us</h4>
          <div className="flex space-x-4">
            <a
              href="/"
              className="text-gray-400 hover:text-blue-400"
              aria-label="Follow us on Twitter"
            >
              <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                <path d="M23.99 4.57c-.88.39-1.83.66-2.82.78a4.9 4.9 0 002.14-2.7c-.94.56-1.98.97-3.09 1.2A4.83 4.83 0 0016.67 3c-2.72 0-4.92 2.16-4.92 4.83 0 .38.04.76.12 1.12C7.64 8.75 4.07 6.84 1.64 3.99a4.77 4.77 0 00-.67 2.43c0 1.68.87 3.17 2.2 4.04a4.91 4.91 0 01-2.22-.6v.06c0 2.35 1.68 4.31 3.91 4.75a4.9 4.9 0 01-2.22.08 4.82 4.82 0 004.5 3.31 9.66 9.66 0 01-5.96 2.04c-.38 0-.77-.02-1.15-.06a13.68 13.68 0 007.4 2.15c8.86 0 13.71-7.34 13.71-13.7 0-.21 0-.42-.02-.63a9.66 9.66 0 002.4-2.44l-.04-.02z" />
              </svg>
            </a>
            <a
              href="/"
              className="text-gray-400 hover:text-blue-400"
              aria-label="Follow us on Facebook"
            >
              <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                <path d="M22.68 0H1.32A1.33 1.33 0 000 1.32v21.36C0 23.87.53 24 1.32 24h11.52v-9.3H9.83v-3.62h3V8.84c0-3 1.82-4.63 4.49-4.63 1.27 0 2.37.09 2.69.13v3.12h-1.84c-1.44 0-1.71.68-1.71 1.68v2.21h3.43l-.46 3.62h-2.97V24h5.84c.79 0 1.32-.53 1.32-1.32V1.32A1.33 1.33 0 0022.68 0z" />
              </svg>
            </a>
            <a
              href="/"
              className="text-gray-400 hover:text-blue-400"
              aria-label="Follow us on Instagram"
            >
              <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                <path d="M12 2.163c3.214 0 3.584.012 4.849.07 1.366.062 2.633.337 3.608 1.312.975.975 1.25 2.242 1.312 3.608.058 1.265.07 1.635.07 4.849s-.012 3.584-.07 4.849c-.062 1.366-.337 2.633-1.312 3.608-.975.975-2.242 1.25-3.608 1.312-1.265.058-1.635.07-4.849.07s-3.584-.012-4.849-.07c-1.366-.062-2.633-.337-3.608-1.312-.975-.975-1.25-2.242-1.312-3.608-.058-1.265-.07-1.635-.07-4.849s.012-3.584.07-4.849c.062-1.366.337-2.633 1.312-3.608.975-.975 2.242-1.25 3.608-1.312C8.416 2.175 8.786 2.163 12 2.163m0-2.163C8.741 0 8.332.011 7.052.07 5.77.129 4.543.405 3.64 1.308 2.737 2.211 2.461 3.438 2.403 4.72 2.344 6 .333 6.741.333 12s-.011 6.332.07 7.052c.059 1.282.335 2.509 1.238 3.412.904.903 2.131 1.179 3.412 1.238 1.28.059 1.689.07 4.949.07s3.669-.011 4.949-.07c1.281-.059 2.509-.335 3.412-1.238.903-.904 1.179-2.131 1.238-3.412.059-1.28.07-1.689.07-4.949s-.011-3.669-.07-4.949c-.059-1.281-.335-2.509-1.238-3.412-.904-.903-2.131-1.179-3.412-1.238C15.669.011 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zm0 10.162a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100-2.881 1.44 1.44 0 000 2.881z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
