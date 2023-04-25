import { BsWhatsapp, BsInstagram, BsFacebook } from 'react-icons/bs';
export default function Footer() {
  return (
    <footer className="fixed bottom-0 w-full bg-red-100/60">
      <ul className="flex justify-between">
        <li>
          <a href="#" className="text-sm">
            FaceBook <BsFacebook className="inline-block" />
          </a>
        </li>
        <li>
          <a href="#">
            Instegram <BsInstagram className="inline-block" />
          </a>
        </li>
        <li>
          WhatSapp <BsWhatsapp className="inline-block" />
        </li>
      </ul>
    </footer>
  );
}
