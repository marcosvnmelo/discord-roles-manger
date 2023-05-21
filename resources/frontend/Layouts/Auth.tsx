import React, { PropsWithChildren } from 'react';
import Flash from '../componentes/atoms/Flash';
import CustomToastContainer from '../services/toast';

const Auth: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="dark">
      {children}
      <CustomToastContainer />
      <Flash />
    </div>
  );
};

export default Auth;
