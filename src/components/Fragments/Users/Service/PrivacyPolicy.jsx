import React from 'react';

const PrivacyPolicys = () => {
  const privacyPolicy = {
    title: 'Kebijakan & Privasi',
    sections: [
      {
        heading: 'Pendahuluan',
        content: `Selamat datang di Putra Komputer. Kami berkomitmen untuk melindungi privasi Anda dan memastikan pengalaman Anda bersama kami aman. Dokumen Kebijakan & Privasi ini menjelaskan bagaimana kami mengumpulkan, menggunakan, dan melindungi informasi Anda.`,
      },
      {
        heading: '1. Pengumpulan Informasi',
        content: `Kami dapat mengumpulkan informasi pribadi dari Anda, termasuk tetapi tidak terbatas pada nama, alamat email, dan rincian kontak saat Anda menggunakan situs web atau layanan kami. Informasi ini dikumpulkan untuk memberikan layanan yang lebih baik dan meningkatkan pengalaman pengguna.`,
      },
      {
        heading: '2. Penggunaan Informasi',
        content: `Informasi yang kami kumpulkan dapat digunakan untuk:`,
        list: [
          'Meningkatkan situs web dan layanan kami',
          'Menanggapi permintaan layanan pelanggan',
          'Mengirim email berkala terkait layanan kami',
          'Memproses transaksi dan mengelola pesanan Anda',
        ],
      },
      {
        heading: '3. Keamanan Data',
        content: `Kami menerapkan berbagai langkah keamanan untuk menjaga keselamatan informasi pribadi Anda. Ini termasuk enkripsi, kontrol akses. Namun, tidak ada metode transmisi melalui internet atau penyimpanan elektronik yang sepenuhnya aman. Kami berusaha menggunakan cara yang diterima secara komersial untuk melindungi informasi pribadi Anda, tetapi kami tidak dapat menjamin keamanannya secara mutlak.`,
      },
      {
        heading: '4. Cookies',
        content: `Situs web kami menggunakan cookies untuk meningkatkan pengalaman pengguna. Cookies adalah file kecil yang disimpan di perangkat Anda yang membantu kami mengingat preferensi Anda dan memahami bagaimana Anda berinteraksi dengan situs kami. Anda dapat memilih untuk menonaktifkan cookies melalui pengaturan browser Anda, tetapi ini dapat memengaruhi pengalaman Anda di situs web kami.`,
      },
      {
        heading: '5. Layanan Pihak Ketiga',
        content: `Kami mungkin menggunakan layanan pihak ketiga untuk menyediakan fitur atau fungsionalitas tertentu di situs web kami. Pihak ketiga ini mungkin memiliki kebijakan privasi mereka sendiri, dan kami mendorong Anda untuk meninjaunya. Kami tidak bertanggung jawab atas praktik privasi pihak ketiga tersebut.`,
      },
      {
        heading: '6. Perubahan pada Kebijakan Ini',
        content: `Kami dapat memperbarui dokumen Kebijakan & Privasi ini dari waktu ke waktu. Perubahan apa pun akan diposting di halaman ini dengan tanggal efektif yang diperbarui. Kami mendorong Anda untuk meninjau kebijakan ini secara berkala untuk tetap mendapat informasi tentang bagaimana kami melindungi informasi Anda.`,
      },
      {
        heading: '7. Hubungi Kami',
        content: `Jika Anda memiliki pertanyaan atau kekhawatiran tentang dokumen Kebijakan & Privasi ini, silakan hubungi kami di <a href="mailto:support@putrakomputer.com" class="text-blue-500 hover:underline">support@putrakomputer.com</a>.`,
      },
    ],
    backToHomeText: 'Kembali ke Beranda',
    backToHomeLink: '/',
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 mt-12">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
        {privacyPolicy.title}
      </h1>

      <div className="bg-white shadow-lg rounded-lg p-6 md:p-8">
        {privacyPolicy.sections.map((section, index) => (
          <div key={index} className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              {section.heading}
            </h2>
            <p
              className="text-gray-700 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: section.content }}
            />
            {section.list && (
              <ul className="list-disc list-inside mt-2 text-gray-700">
                {section.list.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            )}
          </div>
        ))}

        <div className="text-center mt-8">
          <a
            href={privacyPolicy.backToHomeLink}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
          >
            {privacyPolicy.backToHomeText}
          </a>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicys;
