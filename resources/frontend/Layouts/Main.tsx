import { Breadcrumb } from 'flowbite-react';
import React, { PropsWithChildren, useEffect, useState } from 'react';
import Flash from '../componentes/atoms/Flash';
import CustomToastContainer from '../services/toast';

const Main: React.FC<PropsWithChildren> = ({ children }) => {
  const [path, setPath] = useState<
    {
      name: string;
      url: string;
    }[]
  >([]);

  useEffect(() => {
    const url = window.location.pathname;
    const path = url.split('/').filter(x => x);
    const paths = path.map((x, i) => {
      return {
        name: x.charAt(0).toUpperCase() + x.slice(1),
        url: `/${path.slice(0, i + 1).join('/')}`,
      };
    });

    setPath(paths);
  }, []);

  return (
    <div className="dark">
      <div className="md:h-screen bg-gray-50 dark:bg-gray-900">
        <Breadcrumb className="bg-gray-100 dark:bg-gray-800">
          <Breadcrumb.Item href="/" className="text-gray-500 dark:text-gray-400">
            Home
          </Breadcrumb.Item>
          {path.map((x, i) => (
            <Breadcrumb.Item
              key={i}
              href={i === path.length - 1 ? undefined : x.url}
              className="text-gray-500 dark:text-gray-400"
            >
              {x.name}
            </Breadcrumb.Item>
          ))}
        </Breadcrumb>
        {children}
      </div>
      <CustomToastContainer />
      <Flash />
    </div>
  );
};

export default Main;
