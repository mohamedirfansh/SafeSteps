import { Badge, Sidebar, TextInput } from 'flowbite-react';
import type { FC } from 'react';
import { useEffect, useState } from 'react';
import {
  HiChartPie,
  HiLogin,
  HiPencil,
  HiSearch,
  HiUsers,
} from 'react-icons/hi';

const ExampleSidebar: FC = function () {
  const [currentPage, setCurrentPage] = useState('');

  useEffect(() => {
    const newPage = window.location.pathname;

    setCurrentPage(newPage);
  }, [setCurrentPage]);

  return (
    <Sidebar aria-label="Sidebar with multi-level dropdown example">
      <div className="flex h-full flex-col justify-between py-2">
        <div>
          <form className="pb-3 md:hidden">
            <TextInput
              icon={HiSearch}
              type="search"
              placeholder="Search"
              required
              size={32}
            />
          </form>
          <Sidebar.Items>
            <Sidebar.ItemGroup>
              <Sidebar.Item
                href="/"
                icon={HiChartPie}
                className={
                  '/' === currentPage ? 'bg-gray-100 dark:bg-gray-700' : ''
                }
              >
                Dashboard
              </Sidebar.Item>
              <Sidebar.Item
                href="/patients/list"
                icon={HiUsers}
                className={
                  '/patients/list' === currentPage
                    ? 'bg-gray-100 dark:bg-gray-700'
                    : ''
                }
              >
                Patients list
              </Sidebar.Item>
              <Sidebar.Item href="/authentication/sign-in" icon={HiLogin}>
                Sign in
              </Sidebar.Item>
              <Sidebar.Item href="/authentication/sign-up" icon={HiPencil}>
                Sign up
              </Sidebar.Item>
            </Sidebar.ItemGroup>
            <Sidebar.CTA>
              <div className="mb-3 flex items-center">
                <Badge color="purple">New</Badge>
              </div>
              <p className="mb-3 text-sm text-blue-900 dark:text-blue-400">
                Checkout the new darkmode toggle at the top!
              </p>
              {/* <a
                className="text-sm text-blue-900 underline hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                href="#"
              >
                Turn new navigation off
              </a> */}
            </Sidebar.CTA>
          </Sidebar.Items>
        </div>
      </div>
    </Sidebar>
  );
};

export default ExampleSidebar;
