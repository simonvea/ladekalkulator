import React, { FC } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';

type HeaderProps = {
  title?: string;
  backArrow?: boolean;
};

const Header: FC<HeaderProps> = ({ title, backArrow }) => {
  const router = useRouter();

  const goBack = () => router.back();

  return (
    <div className="h-14 w-screen">
      <header className="h-14 shadow w-screen fixed top-0 bg-white grid grid-cols-3 items-center">
        {backArrow && (
          <Link href="/">
            <a className="ml-3 justify-self-start text-center" onClick={goBack}>
              <ArrowBackIosIcon />
            </a>
          </Link>
        )}
        {title && (
          <h1 className="text-xl justify-self-center col-start-2">{title}</h1>
        )}
      </header>
    </div>
  );
};

export default Header;
