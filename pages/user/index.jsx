import { useState, useEffect } from 'react';

import { getCookie } from 'cookies-next';
import OrdersInfo from '@/components/OrdersInfo';
import UserInfo from '@/components/UserInfo';

export default function UserPage() {
  const [user, setUser] = useState(null);
  const [tab, setTab] = useState('userInfo');

  useEffect(() => {
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
      if (user) setUser(user);
    };
    verifyUser();
  }, []);

  return (
    <main>
      <figure className="p-2 mx-2 my-8 bg-red-100/80 ">
        <div className="-mt-6">
          <button
            onClick={() => setTab('orders')}
            className={`-skew-x-12 w-[50%] p-2 bg-blue-100 text-black ${
              tab === 'orders'
                ? '!bg-red-500 text-white shadow-sm shadow-black -translate-y-1'
                : ''
            }`}
          >
            <span className="skew-x-12">My Orders</span>
          </button>
          <button
            onClick={() => setTab('userInfo')}
            className={`-skew-x-12 w-[50%] p-2 bg-blue-100 text-black ${
              tab === 'userInfo'
                ? '!bg-red-500 text-white shadow-sm shadow-black -translate-y-1'
                : ''
            }`}
          >
            <span className="skew-x-12">User Info</span>
          </button>
        </div>
        {tab === 'userInfo' ? (
          <UserInfo user={user} setUser={setUser} />
        ) : (
          <OrdersInfo user={user} />
        )}
      </figure>
    </main>
  );
}
