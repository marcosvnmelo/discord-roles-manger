import React, { PropsWithChildren } from 'react';

const Main: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="dark">
      <div className="md:h-screen bg-gray-50 dark:bg-gray-900">{children}</div>
    </div>
  );
};

export default Main;
