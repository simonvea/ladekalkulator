import 'tailwindcss/tailwind.css';
import { AppProps } from 'next/app';
import Head from 'next/head';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta
          name="viewport"
          content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no"
        />
        <meta
          name="description"
          content="Ladekalkulatoren hjelper deg i å finne ut hvor lenge du må lade og hvor mye det koster."
        />
        <meta name="keywords" content="ladepris,ladehastighet" />
        <title>Ladekalkulator</title>

        <meta name="screen-orientation" content="portrait"></meta>
        <link rel="manifest" href="/manifest.json" />
        <link
          href="images/logo120x120.png"
          rel="apple-touch-icon"
          sizes="120x120"
        />
        <link
          href="images/logo180x180.png"
          rel="apple-touch-icon"
          sizes="180x180"
        />
        <meta name="theme-color" content="#ffffff" />
        <meta name="mobile-web-app-capable" content="yes" />

        <meta name="apple-mobile-web-app-title" content="Ladekalkulator" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta
          name="apple-mobile-web-app-status-bar-style"
          content="default"
        ></meta>
      </Head>
      <Component {...pageProps} />
    </>
  );
}
