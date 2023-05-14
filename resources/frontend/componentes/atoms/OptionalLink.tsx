import { Link } from '@inertiajs/react';
import React, { PropsWithChildren } from 'react';

type OptionalLinkProps = {
  href: string;
  disabled?: boolean;
};

const OptionalLink: React.FC<PropsWithChildren<OptionalLinkProps>> = ({
  children,
  href,
  disabled,
}) => {
  return disabled ? <>{children}</> : <Link href={href}>{children}</Link>;
};

export default OptionalLink;
