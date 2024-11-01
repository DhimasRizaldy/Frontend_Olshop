import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import DropdownUser from './DropdownUser';
import DarkModeSwitcher from './DarkModeSwitcher';
import { getWHOAMI } from '../../services/auth/admin/getDataUser';
import { getAllNotification } from '../../services/admin/notification/services-notification';
import Button from '../Elements/Button/Index';
import { IoMdNotificationsOutline } from 'react-icons/io';

const Header = (props: {
  sidebarOpen: string | boolean | undefined;
  setSidebarOpen: (arg0: boolean) => void;
}) => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [unreadNotificationsCount, setUnreadNotificationsCount] = useState(0);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await getWHOAMI();
        setUserData(response.data); // Adjust based on your actual response structure
      } catch (error) {
        console.error('Gagal mengambil data pengguna', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await getAllNotification();
        const unreadCount = response.data.filter(
          (notification) => !notification.isRead,
        ).length;
        setUnreadNotificationsCount(unreadCount);
      } catch (error) {
        console.error('Gagal mengambil notifikasi', error);
      }
    };

    fetchNotifications();
  }, []);

  const isUserLoggedIn = userData !== null;

  return (
    <header className="sticky top-0 z-999 flex w-full bg-white drop-shadow-1 dark:bg-boxdark dark:drop-shadow-none">
      <div className="flex flex-grow items-center justify-between px-4 py-4 shadow-2 md:px-6 2xl:px-11">
        <div className="flex items-center gap-2 sm:gap-4 lg:hidden">
          {/* <!-- Tombol Hamburger --> */}
          <button
            aria-controls="sidebar"
            onClick={(e) => {
              e.stopPropagation();
              props.setSidebarOpen(!props.sidebarOpen);
            }}
            className="z-99999 block rounded-sm border border-stroke bg-white p-1.5 shadow-sm dark:border-strokedark dark:bg-boxdark lg:hidden"
          >
            <span className="relative block h-5.5 w-5.5 cursor-pointer">
              <span className="du-block absolute right-0 h-full w-full">
                <span
                  className={`relative left-0 top-0 my-1 block h-0.5 w-0 rounded-sm bg-black delay-[0] duration-200 ease-in-out dark:bg-white ${
                    !props.sidebarOpen && '!w-full delay-300'
                  }`}
                ></span>
                <span
                  className={`relative left-0 top-0 my-1 block h-0.5 w-0 rounded-sm bg-black delay-150 duration-200 ease-in-out dark:bg-white ${
                    !props.sidebarOpen && 'delay-400 !w-full'
                  }`}
                ></span>
                <span
                  className={`relative left-0 top-0 my-1 block h-0.5 w-0 rounded-sm bg-black delay-200 duration-200 ease-in-out dark:bg-white ${
                    !props.sidebarOpen && '!w-full delay-500'
                  }`}
                ></span>
              </span>
              <span className="absolute right-0 h-full w-full rotate-45">
                <span
                  className={`absolute left-2.5 top-0 block h-full w-0.5 rounded-sm bg-black delay-300 duration-200 ease-in-out dark:bg-white ${
                    !props.sidebarOpen && '!h-0 !delay-[0]'
                  }`}
                ></span>
                <span
                  className={`delay-400 absolute left-0 top-2.5 block h-0.5 w-full rounded-sm bg-black duration-200 ease-in-out dark:bg-white ${
                    !props.sidebarOpen && '!h-0 !delay-200'
                  }`}
                ></span>
              </span>
            </span>
          </button>
          {/* <!-- Tombol Hamburger --> */}

          <Link className="block flex-shrink-0 lg:hidden" to="/dashboard">
            <img src="/images/logo.png" alt="Logo" width={50} />
          </Link>
        </div>

        <div className="hidden sm:block"></div>

        <div className="flex items-center gap-3 2xsm:gap-7">
          <ul className="flex items-center gap-2 2xsm:gap-4">
            {/* <!-- Pengalih Mode Gelap --> */}
            <DarkModeSwitcher />
            {/* <!-- Pengalih Mode Gelap --> */}
            {/* <!-- Area Menu Notifikasi --> */}
            <Link
              to={'/notification-all'}
              className="relative text-black hover:text-blue-500"
            >
              <IoMdNotificationsOutline size={25} />
              {unreadNotificationsCount > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full">
                  {unreadNotificationsCount}
                </span>
              )}
            </Link>
            {/* <!-- Area Menu Notifikasi --> */}
          </ul>

          {!loading && !isUserLoggedIn && (
            <div className="flex items-center gap-2">
              <Link to="/login">
                <Button
                  type="button"
                  classname="px-4 py-2 font-medium text-white bg-primary border border-primary rounded-lg hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50 transition"
                >
                  Masuk
                </Button>
              </Link>
            </div>
          )}

          {isUserLoggedIn && <DropdownUser />}
        </div>
      </div>
    </header>
  );
};

export default Header;
