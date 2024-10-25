import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-black text-white py-8">
      <div className="max-w-6xl mx-auto px-4 py-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        <div>
          <h3 className="text-xl font-semibold mb-4">Putra Komputer</h3>
          <p className="text-gray-400 mb-4">
            Putra Komputer adalah toko yang menyediakan berbagai produk
            teknologi terbaru dan aksesoris. Kami berkomitmen untuk memberikan
            produk berkualitas dengan harga terbaik.
          </p>
          <p className="text-gray-400 mb-4">
            Alamat: Jl. Teuku Cik Ditiro No.9, Sumber Rejo, Kec. Kemiling, Kota
            Bandar Lampung, Lampung 35155
          </p>
          <p className="text-gray-400 mb-4">Telp/Wa: 6281340670831</p>
          <a
            href="https://www.google.com/maps/dir/-5.3938214,105.2061343/putra+komputer/@-5.3945439,105.2056097,16z/data=!3m1!4b1!4m9!4m8!1m1!4e1!1m5!1m1!1s0x2e40d076c5333a25:0x7731f28950f848d!2m2!1d105.214407!2d-5.3952394?entry=ttu&g_ep=EgoyMDI0MDkxMS4wIKXMDSoASAFQAw%3D%3D"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300"
          >
            Lihat di Maps
          </a>
          <p className="text-gray-400 mt-4">
            © 2024 Putra Komputer. Semua hak dilindungi.
          </p>
        </div>
        <div>
          <h4 className="text-lg font-semibold mb-4">Tautan Berguna</h4>
          <ul className="text-gray-400 space-y-2">
            <li>
              <Link to={'/about-us'} className="hover:text-blue-400">
                Tentang Kami
              </Link>
            </li>
            <li>
              <Link to={'/privacy-policy'} className="hover:text-blue-400">
                Kebijakan Privasi
              </Link>
            </li>
            <li>
              <Link to={'/term-conditions'} className="hover:text-blue-400">
                Syarat & Ketentuan
              </Link>
            </li>
            <li>
              <Link to={'/contact-us'} className="hover:text-blue-400">
                Hubungi Kami
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="text-lg font-semibold mb-4">Layanan Pelanggan</h4>
          <ul className="text-gray-400 space-y-2">
            <li>
              <Link to={'/faqs'} className="hover:text-blue-400">
                FAQs
              </Link>
            </li>
            <li>
              <Link to={'/order-tracking'} className="hover:text-blue-400">
                Pelacakan Pesanan
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="text-lg font-semibold mb-4">Ikuti Kami</h4>
          <div className="flex space-x-4">
            <a
              href="https://wa.me/6281340670831"
              className="text-gray-400 hover:text-blue-400"
              aria-label="Hubungi kami di WhatsApp"
            >
              <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                <path d="M20.52 3.48A11.94 11.94 0 0012 0C5.37 0 0 5.37 0 12c0 2.12.55 4.15 1.6 5.95L0 24l6.24-1.6A11.94 11.94 0 0012 24c6.63 0 12-5.37 12-12 0-3.2-1.25-6.2-3.48-8.52zM12 22c-1.85 0-3.68-.5-5.28-1.45l-.38-.22-3.7.95.98-3.6-.25-.39A9.94 9.94 0 012 12c0-5.52 4.48-10 10-10s10 4.48 10 10-4.48 10-10 10zm5.27-7.73c-.27-.14-1.6-.79-1.85-.88-.25-.09-.43-.14-.6.14-.18.27-.69.88-.85 1.06-.16.18-.31.2-.58.07-.27-.14-1.14-.42-2.17-1.34-.8-.71-1.34-1.58-1.5-1.85-.16-.27-.02-.42.12-.56.12-.12.27-.31.41-.46.14-.16.18-.27.27-.45.09-.18.05-.34-.02-.48-.07-.14-.6-1.45-.82-1.98-.22-.53-.44-.46-.6-.46-.16 0-.34-.02-.52-.02-.18 0-.48.07-.73.34-.25.27-.96.94-.96 2.3 0 1.36.99 2.68 1.13 2.87.14.18 1.95 2.98 4.73 4.18.66.28 1.18.45 1.58.58.66.21 1.26.18 1.73.11.53-.08 1.6-.65 1.83-1.28.23-.63.23-1.17.16-1.28-.07-.11-.25-.18-.52-.31z" />
              </svg>
            </a>
            <a
              href="https://www.tokopedia.com/putracomputerbdl?utm_source=whatsapp&utm_medium=share&utm_campaign=Shop-69897620-13841899-101022-no%20image&_branch_match_id=1311366890085418335&_branch_referrer=H4sIAAAAAAAAA8soKSkottLXL8nPzi9ITclM1MvJzMvWz06OCg6JcnMyKEmyrytKTUstKsrMS49PKsovL04tsnXOKMrPTQUAlxeAPjwAAAA%3D%3D"
              className="text-gray-400 hover:text-blue-400"
              aria-label="Ikuti kami di Tokopedia"
            >
              <img
                src="https://ik.imagekit.io/xnl4hkzkx/png-transparent-tokopedia-android-online-shopping-android-shopping-mall-owl-bird-thumbnail-removebg-preview.png?updatedAt=1726592580506"
                alt="Tokopedia"
                className="w-6 h-6"
              />
            </a>
            <a
              href="https://www.instagram.com/putracomputer_bdl/"
              className="text-gray-400 hover:text-blue-400"
              aria-label="Ikuti kami di Instagram"
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
