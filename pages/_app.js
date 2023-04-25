import Header from '@/components/Header';
import Footer from '@/components/Footer';

import '@/styles/globals.css';
import { CartProvider } from 'react-use-cart';
export default function App({ Component, pageProps }) {
  return (
    <div>
      <CartProvider>
        <Header />
        <Component {...pageProps} />
        <Footer />
      </CartProvider>
    </div>
  );
}
