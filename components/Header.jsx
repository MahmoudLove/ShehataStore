import { useEffect, useState } from 'react';
import Link from 'next/link';
import { getCookie } from 'cookies-next';
import { useCart } from 'react-use-cart';
import { BsFillCartFill } from 'react-icons/bs';
export default function Header() {
  const [cartlenth, setCartLength] = useState(0);
  const [user, setUser] = useState(null);

  const { items } = useCart();

  useEffect(() => {
    setCartLength(items.length);

    const verifyUser = async () => {
      const jwt = getCookie('jwt');
      if (!jwt) return;
      const { user } = await fetch('/api/getUser', {
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify({ jwt }),
      }).then((res) => res.json());
      if (user) {
        setUser(user);
      }
    };
    verifyUser();
  }, [items]);

  return (
    <header className="sticky top-0 bg-red-100/60">
      <ul className="flex justify-between items-center bg-red-100/.1">
        <li className="uppercase text-base">
          <Link href="/user">
            {user ? user.name.split(' ')[0] : 'some guy'}
          </Link>
        </li>
        <li className="uppercase text-base">
          <Link href="/store">Store</Link>
        </li>
        <li>
          <Link href="/logstatus"> LogIn</Link>
        </li>
        <li className="relative">
          <Link href="/cart">
            <BsFillCartFill className="inline-block text-2xl" />
            <span className="absolute top-[50%] right-[50%] translate-x-[50%] translate-y-[-50%] text-red-300 text-sm">
              {cartlenth}
            </span>
          </Link>
        </li>
      </ul>
    </header>
  );
}
