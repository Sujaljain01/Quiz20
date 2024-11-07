import type { AppProps } from 'next/app';
import { Toaster } from 'react-hot-toast';
import '../styles/globals.css';
import '../utils/translation';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Component {...pageProps} />
      <Toaster />
      <footer className="bg-gray-800 text-white p-4 text-center">
  <p>Contact: sujaljain.r@gmail.com | &copy; 2024 Sujal Jain. All rights reserved.</p>
</footer>
    </>
  );
}

export default MyApp;