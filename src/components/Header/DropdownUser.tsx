import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CookieKeys, CookieStorage } from '../../utils/constants/cookies';
import defaultUser from '../../images/user/default-user.png';
import {
  useUserGetData,
  getUserData,
  getWHOAMI, // Import fungsi getWHOAMI
} from '../../services/auth/admin/getDataUser';
import { getProfile } from '../../services/admin/profile/services-profile';

const DropdownUser = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const trigger = useRef(null);
  const dropdown = useRef(null);
  const navigate = useNavigate();
  const [imageProfile, setImageProfile] = useState(null);
  const [userRole, setUserRole] = useState(''); // State untuk menyimpan role pengguna

  // Ambil token dari cookies atau localStorage
  const token =
    CookieStorage.get(CookieKeys.AuthToken) ||
    localStorage.getItem(CookieKeys.AuthToken);

  // Ambil data pengguna menggunakan useUserGetData
  const { data, error, isLoading } = useUserGetData();

  // get profile
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await getProfile();
        setImageProfile(response.data.imageProfile || null);
      } catch (error) {
        console.error('Gagal mengambil profil:', error);
      }
    };
    fetchProfile();
  }, []);

  // Ambil role pengguna saat komponen di-mount
  useEffect(() => {
    const fetchUserRole = async () => {
      try {
        const response = await getWHOAMI(); // Panggil getWHOAMI untuk mendapatkan data pengguna
        const user = response.data.user; // Asumsi bahwa response mengikuti struktur yang diberikan

        setUserRole(user.role); // Setel state userRole berdasarkan peran pengguna
      } catch (error) {
        console.error('Gagal mengambil data pengguna:', error);
        // Tambahkan handling error di sini jika diperlukan
      }
    };

    fetchUserRole();
  }, []); // Hapus navigasi otomatis dengan mengosongkan dependensi useEffect

  // Tutup dropdown saat klik di luar
  useEffect(() => {
    const clickHandler = ({ target }) => {
      if (!dropdown.current) return;
      if (
        !dropdownOpen ||
        dropdown.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setDropdownOpen(false);
    };
    document.addEventListener('click', clickHandler);
    return () => document.removeEventListener('click', clickHandler);
  }, [dropdownOpen]);

  // Tutup dropdown jika tombol esc ditekan
  useEffect(() => {
    const keyHandler = ({ keyCode }) => {
      if (!dropdownOpen || keyCode !== 27) return;
      setDropdownOpen(false);
    };
    document.addEventListener('keydown', keyHandler);
    return () => document.removeEventListener('keydown', keyHandler);
  }, [dropdownOpen]);

  // Fungsi untuk logout
  const handleLogout = () => {
    // Hapus token dari cookies
    CookieStorage.remove(CookieKeys.AuthToken);

    // Hapus token, transactionId, dan userId dari localStorage
    localStorage.removeItem(CookieKeys.AuthToken);
    localStorage.removeItem('transactionId');
    localStorage.removeItem('userId');

    // Arahkan ke halaman login dan reload halaman
    navigate('/');
    window.location.reload();
  };

  // Menampilkan konten berdasarkan status loading dan error
  if (isLoading) return <p>Memuat...</p>;
  if (error) return <p>{error.toString()}</p>;

  // Ambil username, email, dan role dari token
  const userDataFromToken = token ? getUserData(token) : {};
  const email = userDataFromToken.email || 'email tidak tersedia';
  const role = userDataFromToken.role || 'USER';

  return (
    <div className="relative">
      <Link
        ref={trigger}
        onClick={() => setDropdownOpen(!dropdownOpen)}
        className="flex items-center gap-4"
        to="#"
      >
        <span className="hidden text-right lg:block">
          <span className="block text-sm font-medium text-black dark:text-white">
            {email}
          </span>
          <span className="block text-xs">{role}</span>
        </span>

        <span className="h-12 w-12 rounded-full">
          <img
            src={imageProfile || defaultUser}
            alt="User"
            className="rounded-full"
            width={50}
          />
        </span>

        <svg
          className="hidden fill-current sm:block"
          width="12"
          height="8"
          viewBox="0 0 12 8"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M0.410765 0.910734C0.736202 0.585297 1.26384 0.585297 1.58928 0.910734L6.00002 5.32148L10.4108 0.910734C10.7362 0.585297 11.2638 0.585297 11.5893 0.910734C11.9147 1.23617 11.9147 1.76381 11.5893 2.08924L6.58928 7.08924C6.26384 7.41468 5.7362 7.41468 5.41077 7.08924L0.410765 2.08924C0.0853277 1.76381 0.0853277 1.23617 0.410765 0.910734Z"
            fill=""
          />
        </svg>
      </Link>

      {/* Dropdown */}
      <div
        ref={dropdown}
        onFocus={() => setDropdownOpen(true)}
        onBlur={() => setDropdownOpen(false)}
        className={`absolute right-0 mt-4 flex w-62.5 flex-col rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark ${
          dropdownOpen ? 'block' : 'hidden'
        }`}
      >
        <ul className="flex flex-col gap-5 border-b border-stroke px-6 py-7.5 dark:border-strokedark">
          {/* Tampilkan link berdasarkan role pengguna */}
          {userRole === 'USER' && (
            <li>
              <Link
                to="/users/profile"
                className="flex items-center gap-3.5 text-sm font-medium duration-300 ease-in-out hover:text-primary lg:text-base"
              >
                Profil Pengguna
              </Link>
            </li>
          )}
          {userRole === 'ADMIN' && (
            <li>
              <Link
                to="/admin/profile"
                className="flex items-center gap-3.5 text-sm font-medium duration-300 ease-in-out hover:text-primary lg:text-base"
              >
                Profil Admin
              </Link>
            </li>
          )}
          {/* Tambahkan item tambahan berdasarkan role lainnya jika diperlukan */}
        </ul>
        <button
          onClick={handleLogout}
          className="flex items-center gap-3.5 px-6 py-4 text-sm font-medium duration-300 ease-in-out hover:text-primary lg:text-base"
        >
          Keluar
        </button>
      </div>
    </div>
  );
};

export default DropdownUser;
