import { FC } from 'react';
import Link from 'next/link';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOnOutlined';
import InfoIcon from '@material-ui/icons/InfoOutlined';

const Footer: FC = () => {
  return (
    <div className="h-16 w-full">
      <footer className="flex h-16 shadow bg-white items-center w-full fixed bottom-0">
        <nav className="w-full h-full">
          <ul className="flex w-full h-full justify-evenly items-center">
            <li>
              <Link href="/tid">
                <a className="text-center">
                  <AccessTimeIcon fontSize="large" />
                  <div>Tid</div>
                </a>
              </Link>
            </li>
            <li>
              <Link href="/billigst">
                <a className="text-center">
                  <MonetizationOnIcon fontSize="large" />
                  <div>Pris</div>
                </a>
              </Link>
            </li>
            <li>
              <Link href="/about">
                <a className="text-center">
                  <InfoIcon fontSize="large" />
                  <div>Info</div>
                </a>
              </Link>
            </li>
          </ul>
        </nav>
      </footer>
    </div>
  );
};

export default Footer;
