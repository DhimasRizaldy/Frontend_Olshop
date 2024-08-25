import React, { useState } from 'react';

const OrderTrackings = () => {
  const [trackingNumber, setTrackingNumber] = useState('');
  const [trackingDetails, setTrackingDetails] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Simulasi data tracking
    // Gantilah dengan API atau logika yang sesuai di aplikasi Anda
    const mockTrackingDetails = {
      trackingNumber: 'JNE1234567890',
      status: 'Dalam Perjalanan',
      courier: 'JNE',
      estimatedDelivery: '2024-08-30',
      statusUpdates: [
        {
          status: 'Paket Diterima di Hub JNE',
          timestamp: '2024-08-22 10:00 AM',
        },
        { status: 'Dalam Perjalanan', timestamp: '2024-08-23 12:00 PM' },
        { status: 'Dalam Pengiriman', timestamp: '2024-08-24 08:00 AM' },
        { status: 'Terkirim', timestamp: '2024-08-24 03:00 PM' },
      ],
      deliveryAddress: {
        street: '123 Main St',
        city: 'Contoh Kota',
        state: 'Contoh Provinsi',
        postalCode: '12345',
        country: 'Contoh Negara',
      },
    };

    // Simulasikan pengambilan data
    setTrackingDetails(mockTrackingDetails);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 mt-10">
      <div className="bg-white shadow-md rounded-lg p-6">
        <h1 className="text-3xl font-bold text-center mb-8">
          Lacak Pengiriman Anda
        </h1>

        {/* Tracking Form */}
        <div className="mb-8">
          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row items-center justify-between"
          >
            <input
              type="text"
              placeholder="Masukkan Nomor Resi"
              value={trackingNumber}
              onChange={(e) => setTrackingNumber(e.target.value)}
              className="flex-1 p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              className="mt-4 sm:mt-0 sm:ml-4 bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Lacak
            </button>
          </form>
        </div>

        {/* Tracking Details */}
        {trackingDetails && (
          <div>
            <div className="border-b border-gray-200 pb-4 mb-4">
              <h2 className="text-2xl font-semibold mb-2">
                Informasi Pelacakan
              </h2>
              <p className="text-gray-600 mb-2">
                <strong>Nomor Resi:</strong> {trackingDetails.trackingNumber}
              </p>
              <p className="text-gray-600 mb-2">
                <strong>Status:</strong>
                <span className="bg-green-500 text-white py-1 px-2 rounded-full text-xs ml-2">
                  {trackingDetails.status}
                </span>
              </p>
              <p className="text-gray-600 mb-2">
                <strong>Kurir:</strong> {trackingDetails.courier}
              </p>
              <p className="text-gray-600 mb-2">
                <strong>Perkiraan Pengiriman:</strong>{' '}
                {trackingDetails.estimatedDelivery}
              </p>
            </div>

            <div className="border-b border-gray-200 pb-4 mb-4">
              <h2 className="text-xl font-semibold mb-2">Status Saat Ini</h2>
              <ul>
                {trackingDetails.statusUpdates.map((update, index) => (
                  <li
                    key={index}
                    className="flex justify-between py-2 border-b"
                  >
                    <span>{update.status}</span>
                    <span className="text-gray-600">{update.timestamp}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-2">Alamat Pengiriman</h2>
              <p className="text-gray-600 mb-2">
                <strong>Jalan:</strong> {trackingDetails.deliveryAddress.street}
              </p>
              <p className="text-gray-600 mb-2">
                <strong>Kota:</strong> {trackingDetails.deliveryAddress.city}
              </p>
              <p className="text-gray-600 mb-2">
                <strong>Provinsi:</strong>{' '}
                {trackingDetails.deliveryAddress.state}
              </p>
              <p className="text-gray-600 mb-2">
                <strong>Kode Pos:</strong>{' '}
                {trackingDetails.deliveryAddress.postalCode}
              </p>
              <p className="text-gray-600 mb-2">
                <strong>Negara:</strong>{' '}
                {trackingDetails.deliveryAddress.country}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderTrackings;
