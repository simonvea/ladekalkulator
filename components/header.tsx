import React, { FC } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';

type HeaderProps = {
  title?: string;
};

const Header: FC<HeaderProps> = ({ title }) => {
  const router = useRouter();
  const isHomeScreen = router.pathname === '/';

  return (
    <div className="h-16 w-screen">
      <header className="h-16 shadow w-screen fixed top-0 bg-white grid grid-cols-3 items-center">
        {!isHomeScreen && (
          <Link href="/">
            <a className="ml-4 justify-self-start text-center">
              <ArrowBackIosIcon />
            </a>
          </Link>
        )}
        {title && (
          <h1 className="text-2xl justify-self-center col-start-2">{title}</h1>
        )}
      </header>
    </div>
  );
};

export default Header;
