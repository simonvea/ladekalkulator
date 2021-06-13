import Link from 'next/link';
import { useEffect, useState } from 'react';

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
    <div className="h-screen grid grid-rows-2">
      <header className="flex flex-col justify-evenly items-center">
        <h1 className="text-2xl">Ladekalkulator</h1>
        <img
          src="/images/logo192x192.png"
          height={192}
          width={192}
          alt="Ladekalkulator logo. Ladestasjon med kalkulator."
        />
      </header>
      <main className="flex flex-col items-center space-y-5 justify-center mx-auto w-56">
        <Link href="/billigst">
          <a className="text-center py-4 bg-blue-300 rounded w-full">
            Hvor er det billigst å lade?
          </a>
        </Link>
        <Link href="/tid">
          <a className="text-center py-4 bg-blue-300 rounded w-full">
            Hvor lenge må jeg lade?
          </a>
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
    </div>
  );
}
