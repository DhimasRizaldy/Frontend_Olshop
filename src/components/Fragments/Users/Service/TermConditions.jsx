import React from 'react';

const TermCondition = () => {
  const termsConditions = {
    title: 'Syarat & Ketentuan',
    sections: [
      {
        heading: 'Pendahuluan',
        content: `Selamat datang di Putra Komputer. Syarat dan Ketentuan ini menjelaskan aturan dan peraturan penggunaan situs web dan layanan kami. Dengan mengakses atau menggunakan situs web kami, Anda setuju untuk mematuhi syarat-syarat ini.`,
      },
      {
        heading: '1. Penggunaan Situs Web Kami',
        content: `Anda harus menggunakan situs web kami sesuai dengan semua undang-undang dan peraturan yang berlaku. Anda setuju untuk tidak terlibat dalam aktivitas apa pun yang mengganggu atau mengganggu operasi situs web.`,
      },
      {
        heading: '2. Hak Kekayaan Intelektual',
        content: `Semua konten, termasuk teks, grafik, dan logo, di situs web kami adalah milik Putra Komputer atau pemberi lisensinya. Anda tidak boleh memperbanyak, mendistribusikan, atau membuat karya turunan dari konten ini tanpa izin kami.`,
      },
      {
        heading: '3. Batasan Tanggung Jawab',
        content: `Putra Komputer tidak bertanggung jawab atas kerusakan yang timbul dari penggunaan atau ketidakmampuan untuk menggunakan situs web atau layanan kami. Kami tidak menjamin bahwa situs web kami akan tersedia atau bebas dari kesalahan.`,
      },
      {
        heading: '4. Perubahan Syarat',
        content: `Kami berhak untuk memperbarui atau memodifikasi Syarat dan Ketentuan ini kapan saja. Perubahan apa pun akan berlaku segera setelah diposting di situs web kami.`,
      },
      {
        heading: '5. Hubungi Kami',
        content: `Jika Anda memiliki pertanyaan tentang Syarat dan Ketentuan ini, silakan hubungi kami di <a href="mailto:putrakomputerbdl@gmail.com" class="text-blue-500 hover:underline">putrakomputerbdl@gmail.com</a>.`,
      },
    ],
    backToHomeText: 'Kembali ke Beranda',
    backToHomeLink: '/',
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 mt-12">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
        {termsConditions.title}
      </h1>

      <div className="bg-white shadow-lg rounded-lg p-6 md:p-8">
        {termsConditions.sections.map((section, index) => (
          <div key={index} className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              {section.heading}
            </h2>
            <p
              className="text-gray-700 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: section.content }}
            />
          </div>
        ))}

        <div className="text-center mt-8">
          <a
            href={termsConditions.backToHomeLink}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
          >
            {termsConditions.backToHomeText}
          </a>
        </div>
      </div>
    </div>
  );
};

export default TermCondition;
