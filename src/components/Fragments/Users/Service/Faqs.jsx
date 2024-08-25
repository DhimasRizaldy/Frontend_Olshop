import React from 'react';

const FaqsMe = () => {
  const faqsData = [
    {
      question: 'Apa itu Putra Komputer?',
      answer:
        'Putra Komputer adalah penyedia layanan IT dan teknologi yang menawarkan berbagai produk dan layanan untuk memenuhi kebutuhan teknologi Anda.',
    },
    {
      question: 'Bagaimana cara menghubungi layanan pelanggan?',
      answer:
        'Anda dapat menghubungi layanan pelanggan kami melalui email di support@putrakomputer.com atau melalui telepon di (123) 456-7890.',
    },
    {
      question: 'Apakah saya bisa mengembalikan produk?',
      answer:
        'Ya, kami memiliki kebijakan pengembalian produk. Silakan baca kebijakan pengembalian kami di halaman Kebijakan Pengembalian untuk informasi lebih lanjut.',
    },
    {
      question: 'Bagaimana cara melacak pesanan saya?',
      answer:
        'Setelah pesanan Anda dikirim, Anda akan menerima email dengan nomor pelacakan. Anda dapat menggunakan nomor tersebut untuk melacak status pengiriman pesanan Anda.',
    },
    {
      question: 'Apakah ada biaya pengiriman?',
      answer:
        'Biaya pengiriman bervariasi tergantung pada lokasi dan jenis layanan pengiriman yang dipilih. Biaya pengiriman akan ditampilkan pada halaman checkout sebelum Anda menyelesaikan pesanan.',
    },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 mt-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">
        Pertanyaan yang Sering Diajukan (FAQ)
      </h1>

      <div className="bg-white shadow-md rounded-lg p-6">
        {faqsData.map((faq, index) => (
          <div key={index} className="mb-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              {faq.question}
            </h2>
            <p className="text-gray-600">{faq.answer}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FaqsMe;
