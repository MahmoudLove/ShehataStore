import { Html, Head, Main, NextScript } from 'next/document';
import ReactModal from 'react-modal';
export default function Document() {
  ReactModal.setAppElement('portal');
  return (
    <Html lang="en">
      <Head />
      <body>
        <Main />
        <NextScript />
        <div id="portal"></div>
      </body>
    </Html>
  );
}
