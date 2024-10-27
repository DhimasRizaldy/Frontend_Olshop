import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { fetchWaybillInfo } from '../../../../services/users/rajaongkir/rajaongkir-services';

const OrderTrackings = () => {
  const [trackingNumber, setTrackingNumber] = useState('');
  const [trackingDetails, setTrackingDetails] = useState(null);

  const couriers = [
    { id: 'jne', name: 'JNE' },
    { id: 'pos', name: 'POS' },
    { id: 'tiki', name: 'TIKI' },
    { id: 'jnt', name: 'J&T' },
    { id: 'sicepat', name: 'SiCepat' },
  ]; // Example couriers, update this list as needed

  const handleSubmit = async (e) => {
    e.preventDefault();

    let found = false;

    for (const courier of couriers) {
      try {
        // Fetch tracking details from API
        const data = await fetchWaybillInfo(trackingNumber, courier.id);
        const { result } = data;

        // Check if the tracking number is empty
        if (result && result.summary && result.summary.waybill_number) {
          const trackingDetails = {
            trackingNumber: result.summary.waybill_number,
            status: result.summary.status,
            courier: result.summary.courier_name,
            estimatedDelivery: result.summary.waybill_date, // Update sesuai dengan data yang relevan
            statusUpdates: result.manifest.map((entry) => ({
              status: entry.manifest_description,
              timestamp: `${entry.manifest_date} ${entry.manifest_time}`,
            })),
            deliveryAddress: {
              street: result.details.receiver_address1,
              city: result.details.receiver_city,
              state: '', // Update jika ada informasi provinsi
              postalCode: '', // Update jika ada informasi kode pos
              country: '', // Update jika ada informasi negara
            },
          };

          setTrackingDetails(trackingDetails);
          toast.success('Data resi berhasil ditemukan!');
          found = true;
          break;
        }
      } catch (error) {
        console.error(
          `Terjadi kesalahan saat mengambil data resi untuk kurir ${courier.name}:`,
          error,
        );
      }
    }

    if (!found) {
      toast.error(
        'Data resi tidak ditemukan. Pastikan nomor resi dan kurir sudah benar.',
      );
      setTrackingDetails(null);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 mt-10">
      <div className="bg-white shadow-md rounded-lg p-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-center mb-8">
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
              className="w-full sm:flex-1 p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              className="w-full sm:w-auto mt-4 sm:mt-0 sm:ml-4 bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
              <ul className="space-y-2">
                {trackingDetails.statusUpdates.map((update, index) => (
                  <li
                    key={index}
                    className="flex items-center justify-between py-2 border-b border-gray-200"
                  >
                    <span className="font-medium">{update.status}</span>
                    <span className="text-gray-600 text-sm">
                      {update.timestamp}
                    </span>
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

      {/* Toast Container */}
      <ToastContainer />
    </div>
  );
};

export default OrderTrackings;
