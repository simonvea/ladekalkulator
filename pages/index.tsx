import Link from 'next/link';
import Image from 'next/image';
import logo from '../public/images/logo192x192.png';
import { useEffect, useState } from 'react';
import Footer from '../components/footer';
import Header from '../components/header';

export default function Home() {
  const [deferredPrompt, setDeferredPrompt] =
    useState<BeforeInstallPromptEvent>(null);
  const [showInstall, setShowInstall] = useState(false);

  useEffect(() => {
    window.addEventListener(
      'beforeinstallprompt',
      (e: BeforeInstallPromptEvent) => {
        // Prevent Chrome 67 and earlier from automatically showing the prompt
        e.preventDefault();

        // Stash the event so it can be triggered later.
        setDeferredPrompt(e);
        // Update UI to notify the user they can add to home screen
        setShowInstall(true);
      }
    );
  }, []);

  const handleClickInstall = () => {
    setShowInstall(false);

    if (deferredPrompt) {
      deferredPrompt.prompt();

      deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
          console.log('Brukeren aksepterte A2HS prompt');
        } else {
          console.log('Brukeren avslo A2HS prompt');
        }
        setDeferredPrompt(null);
      });
    }
  };

  return (
    <div className="h-screen grid grid-rows-3">
      <Header title="Ladekalkulator" />
      <main className="flex flex-col items-center space-y-5 justify-center mx-auto w-56">
        <div>
          <Image
            src={logo}
            height={192}
            width={192}
            alt="Ladekalkulator logo. Ladestasjon med kalkulator."
          />
        </div>
        <Link href="/billigst" className="text-center py-4 bg-blue-300 rounded w-full">
          
            Hvor er det billigst å lade?
          
        </Link>
        <Link href="/tid" className="text-center py-4 bg-blue-300 rounded w-full">
          
            Hvor lenge må jeg lade?
          
        </Link>
        <button
          onClick={handleClickInstall}
          className={`bg-green-300 rounded text-center py-4 w-full ${
            showInstall ? 'block' : 'hidden'
          }`}
        >
          Legg til hjem-skjerm
        </button>
      </main>
      <Footer />
    </div>
  );
}
