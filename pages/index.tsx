import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="h-screen grid grid-rows-2">
      <header className="flex flex-col justify-evenly items-center">
        <h1 className="text-2xl">Ladekalkulator</h1>
        <Image
          src="/images/logo192x192.png"
          height={189}
          width={189}
          alt="Ladekalkulator logo. Ladestasjon med kalkulator."
        />
      </header>
      <main className="flex flex-col items-center space-y-3 justify-center mx-auto w-56">
        <Link href="/billigst">
          <a className="text-center py-4 bg-blue-300 rounded mb-2 w-full">
            Hvor er det billigst å lade?
          </a>
        </Link>
        <Link href="/tid">
          <a className="text-center py-4 bg-blue-300 rounded mt-2 w-full">
            Hvor lenge må jeg lade?
          </a>
        </Link>
      </main>
    </div>
  );
}
