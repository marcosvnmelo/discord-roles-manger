import React, { PropsWithChildren } from 'react';

const Auth: React.FC<PropsWithChildren> = ({ children }) => {
  return <div className="dark">{children}</div>;
};

export default Auth;
