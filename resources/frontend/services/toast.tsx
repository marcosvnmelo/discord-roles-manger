import React from 'react';
import { ToastContainer } from 'react-toastify';

const CustomToastContainer: React.FC = () => {
  return (
    <ToastContainer
      position="bottom-right"
      autoClose={3000}
      hideProgressBar={false}
      newestOnTop
      pauseOnHover
      theme="dark"
      toastClassName="bg-gray-800"
    />
  );
};

export default CustomToastContainer;
