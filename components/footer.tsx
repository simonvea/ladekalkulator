import { FC } from 'react';
import Link from 'next/link';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOnOutlined';
import InfoIcon from '@mui/icons-material/InfoOutlined';

const Footer: FC = () => {
  return (
    <div className="h-20 w-full">
      <footer className="flex h-24 shadow bg-white items-center w-full fixed bottom-0 py-4">
        <nav className="w-full h-full">
          <ul className="flex w-full h-full justify-evenly items-center">
            <li>
              <Link href="/billigst" className="text-center">

                <MonetizationOnIcon fontSize="large" />
                <div>Pris</div>

              </Link>
            </li>
            <li>
              <Link href="/tid" className="text-center">

                <AccessTimeIcon fontSize="large" />
                <div>Tid</div>

              </Link>
            </li>
            <li>
              <Link href="/about" className="text-center">

                <InfoIcon fontSize="large" />
                <div>Info</div>

              </Link>
            </li>
          </ul>
        </nav>
      </footer>
    </div>
  );
};

export default Footer;
