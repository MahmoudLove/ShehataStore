import { useState, useRef } from 'react';
import { useRouter } from 'next/router';

import { FaEye, FaEyeSlash, FaSpinner } from 'react-icons/fa';
import { setCookie, getCookie } from 'cookies-next';

export default function LogStatePage() {
  const [logState, setLogState] = useState('signup');
  const [password, setPassword] = useState('password');
  const [isLoading, setIsLoading] = useState(false);
  const formRef = useRef(null);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(false);
    const formData = new FormData(formRef.current);
    let orderData = {};
    if (logState === 'login') {
      orderData = {
        email: formData.get('email'),
        password: formData.get('password'),
        logState: 'login',
      };
      const { user, status } = await fetch('/api/logstatus', {
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify({ orderData }),
      }).then((res) => res.json());
      setCookie('jwt', cookie, {
        maxAge: 60 * 60 * 24 * 7 * 12,
        path: '/',
      });
      return;
    }

    orderData = {
      email: formData.get('email'),
      password: formData.get('password'),
      name: formData.get('name'),
      phone: formData.get('phone'),
      location: formData.get('location'),
      logState: 'signup',
    };

    const { user, cookie } = await fetch('/api/logstatus', {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
      logState: 'signup',
      body: JSON.stringify({ orderData }),
    }).then((res) => res.json());

    setCookie('jwt', cookie, {
      maxAge: 60 * 60 * 24 * 7 * 12,
      path: '/',
    });
    router.reload();
  };
  const invertPassword = () => {
    if (password === 'password') return setPassword('text');
    return setPassword('password');
  };
  return (
    <main>
      <div className="">
        <form
          className="flex flex-col gap-6 p-2 mx-2 my-4 bg-red-100/80 "
          ref={formRef}
          onSubmit={handleSubmit}
        >
          <div className="grid grid-cols-[70px_1fr] gap-4">
            <label htmlFor="email">EMAIL</label>
            <input
              type="email"
              id="email"
              name="email"
              className="bg-red-100/20 grow focus:border-2 focus:outline-none focus:border-red-400 border-2 border-black rounded-sm"
            />
          </div>
          <div className="grid grid-cols-[70px_1fr] gap-4 relative">
            <button
              className="absolute top-[50%] right-[2%] translate-y-[-50%]"
              onClick={invertPassword}
            >
              {password === 'password' ? 'show' : 'hide'}
            </button>
            <label htmlFor="password">PASSWORD</label>
            <input
              type={password}
              id="password"
              name="password"
              className="bg-red-100/20 grow focus:border-2 focus:outline-none focus:border-red-400 border-2 border-black rounded-sm"
            />
          </div>
          {logState === 'signup' && (
            <div className="grid grid-cols-[70px_1fr] gap-4">
              <label htmlFor="name">NAME</label>
              <input
                id="name"
                minLength={10}
                type="text"
                name="name"
                className=" bg-red-100/20 grow focus:border-2 focus:outline-none focus:border-red-400 border-2 border-black rounded-sm"
              />
            </div>
          )}
          {logState === 'signup' && (
            <div className="grid grid-cols-[70px_1fr] gap-4">
              <label htmlFor="phone">PHONE</label>
              <input
                id="phone"
                type="number"
                // max={11}
                // min={11}
                name="phone"
                className=" bg-red-100/20 grow focus:border-2 focus:outline-none focus:border-red-400 border-2 border-black rounded-sm"
              />
            </div>
          )}
          {logState === 'signup' && (
            <div className="grid grid-cols-[70px_1fr] gap-4">
              <label htmlFor="location">LOCATION</label>
              <input
                id="location"
                type="text"
                name="location"
                className=" bg-red-100/20 grow focus:border-2 focus:outline-none focus:border-red-400 border-2 border-black rounded-sm"
              />
            </div>
          )}
          <div className="text-center">
            <button
              type="submit"
              className="bg-black/80 text-white w-[60%] p-2"
            >
              {logState === 'signup' ? 'SIGNUP' : 'LOGIN'}
            </button>
          </div>
          <div className="flex justify-center -mb-6">
            <button
              type="button"
              onClick={() => setLogState('signup')}
              className={`bg-blue-100 p-2 text-black ${
                logState === 'signup'
                  ? '!bg-red-500 text-white shadow-sm shadow-black'
                  : ''
              }`}
            >
              Sign Up
            </button>
            <button
              type="button"
              onClick={() => setLogState('login')}
              className={`bg-blue-100 p-2 text-black hover:scale-105 ${
                logState === 'login'
                  ? '!bg-red-500 text-white shadow-sm shadow-black'
                  : ''
              }`}
            >
              Already have an Account
            </button>
            {isLoading && <FaSpinner className="animate-spin" />}
          </div>
        </form>
      </div>
    </main>
  );
}
