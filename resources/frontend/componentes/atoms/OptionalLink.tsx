import { Link } from '@inertiajs/react';
import React, { PropsWithChildren } from 'react';

type OptionalLinkProps = {
  href: string;
  external?: boolean;
  disabled?: boolean;
};

const OptionalLink: React.FC<PropsWithChildren<OptionalLinkProps>> = ({
  children,
  href,
  external,
  disabled,
}) => {
  if (disabled) {
    return <>{children}</>;
  }

  return external ? <a href={href}>{children}</a> : <Link href={href}>{children}</Link>;
};

export default OptionalLink;
