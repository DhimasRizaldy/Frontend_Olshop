import React from 'react';

const AboutUs = () => {
  const companyInfo = {
    logo: 'https://ik.imagekit.io/xnl4hkzkx/putrakom.jpg?updatedAt=1726633748001',
    welcomeMessage: 'Selamat datang di Putra Komputer',
    tagline: 'Solusi satu atap untuk semua kebutuhan komputer Anda.',
    missionTitle: 'Misi Kami',
    missionDescription: `Di Putra Komputer, misi kami adalah menyediakan layanan dan produk komputer berkualitas tinggi 
      untuk membantu Anda tetap unggul di era digital. Kami berdedikasi untuk menawarkan solusi yang andal dan berkualitas tinggi 
      yang disesuaikan dengan kebutuhan Anda, baik sebagai bisnis maupun individu.`,
    teamTitle: 'Tim Kami',
    teamDescription: `Tim kami yang berpengalaman memiliki hasrat terhadap teknologi dan berkomitmen untuk memberikan 
      layanan yang luar biasa. Dari menyelesaikan masalah teknis hingga memberikan saran ahli, kami di sini untuk mendukung Anda 
      di setiap langkah.`,
    contactTitle: 'Hubungi Kami',
    contactDescription: `Ada pertanyaan atau memerlukan bantuan? Jangan ragu untuk menghubungi kami di 
      <a href="mailto:putrakomputerbdl@gmail.com" class="text-blue-500 hover:underline">putrakomputerbdl@gmail.com</a>.`,
    backToHomeText: 'Kembali ke Beranda',
    backToHomeLink: '/',
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 mt-12">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
        Tentang Kami
      </h1>

      <div className="bg-white shadow-lg rounded-lg p-6 md:p-8">
        <div className="text-center mb-6">
          <img
            src={companyInfo.logo}
            alt="Logo Putra Komputer"
            className="mx-auto rounded-3xl mb-4"
            width={300}
            height={300}
          />
          <h2 className="text-2xl font-semibold text-gray-800">
            {companyInfo.welcomeMessage}
          </h2>
          <p className="text-gray-600 mt-2">{companyInfo.tagline}</p>
        </div>

        <div className="md:flex md:justify-between md:gap-8">
          <div className="md:w-1/2 mb-6 md:mb-0">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              {companyInfo.missionTitle}
            </h3>
            <p className="text-gray-700 leading-relaxed">
              {companyInfo.missionDescription}
            </p>
          </div>

          <div className="md:w-1/2">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              {companyInfo.teamTitle}
            </h3>
            <p className="text-gray-700 leading-relaxed">
              {companyInfo.teamDescription}
            </p>
          </div>
        </div>

        <div className="mt-8 text-center">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            {companyInfo.contactTitle}
          </h3>
          <p
            className="text-gray-700 mb-4"
            dangerouslySetInnerHTML={{ __html: companyInfo.contactDescription }}
          />
          <a
            href={companyInfo.backToHomeLink}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
          >
            {companyInfo.backToHomeText}
          </a>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
