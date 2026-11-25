import '../styles/global.css';

// Import Google Fonts using Next.js font optimization.
import { Outfit, Roboto_Mono } from 'next/font/google';

// Primary font for the application.
const outfit = Outfit({
  subsets: ['latin'],
  weight: ['400', '800'],
});

// Secondary font for technical information.
const robotoMono = Roboto_Mono({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-roboto-mono',
});

// Wrap every page with the shared fonts.
export default function App({ Component, pageProps }) {
  return (
    <div className={`${outfit.className} ${robotoMono.variable}`}>
      <Component {...pageProps} />
    </div>
  );
}