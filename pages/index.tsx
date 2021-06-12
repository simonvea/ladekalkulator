import Head from 'next/head';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="h-screen grid grid-rows-3">
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header className="flex justify-center items-center">
        <h1 className="text-2xl">Ladekalkulator</h1>
      </header>
      <main className="flex flex-col items-center space-y-3 justify-center">
        <Link href="/billigst">
          <a className="py-4 px-3 bg-blue-300 rounded mb-2">
            Hvor er det billigst å lade?
          </a>
        </Link>
        <Link href="/tid">
          <a className="py-4 px-3 bg-blue-300 rounded mt-2">
            Hvor lenge må jeg lade?
          </a>
        </Link>
      </main>

      <footer></footer>
    </div>
  );
}
