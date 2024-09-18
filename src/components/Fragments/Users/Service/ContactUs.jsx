import React from 'react';

const ContactUsMe = () => {
  const contactInfo = {
    title: 'Hubungi Kami',
    introduction:
      'Kami senang mendengar dari Anda. Silakan isi formulir di bawah ini dan kami akan segera menghubungi Anda.',
    form: {
      nameLabel: 'Nama',
      emailLabel: 'Email',
      messageLabel: 'Pesan',
      submitButtonText: 'Kirim Pesan',
    },
    contactDetails: {
      title: 'Informasi Kontak Kami',
      address:
        'Jl. Teuku Cik Ditiro No.9, Sumber Rejo, Kec. Kemiling, Kota Bandar Lampung, Lampung 35155',
      phone: '081340670831',
      email: 'putrakomputerbdl@gmail.com',
      hours: 'Senin - Sabtu (9 pagi - 5 sore)',
    },
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 mt-12">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
        {contactInfo.title}
      </h1>

      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Get in Touch
        </h2>
        <p className="text-gray-600 mb-6">{contactInfo.introduction}</p>

        <form action="#" method="POST" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                {contactInfo.form.nameLabel}
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                {contactInfo.form.emailLabel}
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="message"
              className="block text-sm font-medium text-gray-700"
            >
              {contactInfo.form.messageLabel}
            </label>
            <textarea
              id="message"
              name="message"
              rows="4"
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white px-4 py-2 rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            {contactInfo.form.submitButtonText}
          </button>
        </form>
      </div>

      <div className="mt-12 bg-white shadow-md rounded-lg p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          {contactInfo.contactDetails.title}
        </h2>
        <p className="text-gray-600 mb-2">
          <strong>Alamat:</strong> {contactInfo.contactDetails.address}
        </p>
        <p className="text-gray-600 mb-2">
          <strong>Telepon:</strong> {contactInfo.contactDetails.phone}
        </p>
        <p className="text-gray-600 mb-2">
          <strong>Email:</strong> {contactInfo.contactDetails.email}
        </p>
        <p className="text-gray-600 mb-2">
          <strong>Jam Kerja:</strong> {contactInfo.contactDetails.hours}
        </p>
      </div>
    </div>
  );
};

export default ContactUsMe;
