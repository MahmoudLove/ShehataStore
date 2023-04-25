import { useState, useRef } from 'react';

import { BsPencilFill } from 'react-icons/bs';

export default function UserInfo({ user, setUser }) {
  const [userInfoState, setUserInfoState] = useState(true);
  const [passwordInfoState, setPasswordInfoState] = useState(true);
  const [verificationInfoState, setVerificationInfoState] = useState(false);

  const userFormRef = useRef();
  const passwordFormRef = useRef();
  const verificationFormRef = useRef();

  if (!user) return <div>loading</div>;
  const handleScroll = (element) => {
    window.scrollTo({
      top: element.offsetTop,
      left: 0,
      behavior: 'smooth',
    });
  };
  const handleUserInfoSubmit = async (e) => {
    e.preventDefault();
    const userFormData = new FormData(userFormRef.current);

    const userData = {
      email: userFormData.get('email') || user.email,
      name: userFormData.get('name') || user.name,
      location: userFormData.get('location') || user.location,
      id: user.id,
    };
    const res = await fetch('/api/getUser', {
      headers: {
        'Content-Type': 'application/json',
      },

      method: 'PUT',
      body: JSON.stringify({ userData }),
    }).then((res) => res.json());
    if (res.status === 'success') setUser(res.user);
  };
  const handlePasswordInfoSubmit = async (e) => {
    e.preventDefault();
    const passwordFormData = new FormData(passwordFormRef.current);

    const passwordData = {
      oldPassword: passwordFormData.get('oldPassword'),
      newPassword: passwordFormData.get('newPassword'),
      id: user.id,
    };
    const res = await fetch('/api/getUser', {
      headers: {
        'Content-Type': 'application/json',
      },

      method: 'PATCH',
      body: JSON.stringify({ passwordData }),
    }).then((res) => res.json());
  };

  const handleSendPin = async (e) => {
    e.preventDefault();
    const userData = {
      id: user.id,
    };
    const res = await fetch('/api/verifyUser', {
      headers: {
        'Content-Type': 'application/json',
      },

      method: 'POST',
      body: JSON.stringify({ userData }),
    }).then((res) => res.json());
    console.log(res);
  };
  const handlePinSubmit = async (e) => {
    const userFormData = new FormData(verificationFormRef.current);
    const userData = {
      pin: userFormData.get('verification'),
      id: user.id,
    };
    e.preventDefault();
    const res = await fetch('/api/verifyUser', {
      headers: {
        'Content-Type': 'application/json',
      },

      method: 'PATCH',
      body: JSON.stringify({ userData }),
    }).then((res) => res.json());
    console.log(res);
  };
  return (
    <section>
      <form ref={userFormRef} className="my-3">
        <div className="flex justify-between">
          <span>User Info</span>
          <BsPencilFill
            title="update your informations"
            onClick={() => {
              setUserInfoState(!userInfoState);
              setTimeout(() => {
                userFormRef.current.name.focus();
              }, 300);
            }}
          />
        </div>
        <div className="my-2">
          <label htmlFor="name" className="block text-xs mb-1">
            Name
          </label>
          <input
            id="name"
            name="name"
            disabled={userInfoState}
            type="text"
            placeholder={user.name}
            className=" bg-red-100/20 outline-none focus:border-red-400 focus:scale-105 
            placeholder:text-black/70 border border-black rounded-sm w-full"
          />
        </div>
        <div className="my-2">
          <label htmlFor="email" className="block text-xs mb-1">
            email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            disabled={userInfoState}
            placeholder={user.email}
            className="bg-red-100/20 outline-none focus:border-red-400 focus:scale-105
            placeholder:text-black/70 border border-black rounded-sm w-full"
          />
        </div>
        <div className="my-2">
          <label htmlFor="location" className="block text-xs mb-1">
            location
          </label>
          <input
            id="location"
            name="location"
            disabled={userInfoState}
            placeholder={user.location}
            className="bg-red-100/20 outline-none focus:border-red-400 focus:scale-105
            placeholder:text-black/70 border border-black rounded-sm w-full"
          />
        </div>
        {!userInfoState && (
          <div className="text-center">
            <button
              onClick={handleUserInfoSubmit}
              type="submit"
              className="bg-black/80 text-white w-[60%] p-2"
            >
              Submit
            </button>
          </div>
        )}
      </form>
      <form ref={passwordFormRef}>
        <div className="flex justify-between">
          <span>Password</span>
          <BsPencilFill
            title="update your informations"
            onClick={() => {
              setPasswordInfoState(!passwordInfoState);
              setTimeout(() => {
                passwordFormRef.current.oldPassword.focus();
              }, 300);
            }}
          />
        </div>
        <div className="my-2">
          <label htmlFor="oldPassword" className="block text-xs mb-1">
            Your Old Password
          </label>
          <input
            id="oldPassword"
            name="oldPassword"
            disabled={passwordInfoState}
            type="password"
            min={8}
            className="bg-red-100/20 outline-none focus:border-red-400 focus:scale-105
            placeholder:text-black/70 border border-black rounded-sm w-full"
          />
        </div>
        <div className="my-2">
          <label htmlFor="newPassword" className="block text-xs mb-1">
            Your New Password
          </label>
          <input
            id="newPassword"
            name="newPassword"
            disabled={passwordInfoState}
            type="password"
            min={8}
            className="bg-red-100/20 outline-none focus:border-red-400 focus:scale-105
            placeholder:text-black/70 border border-black rounded-sm w-full"
          />
        </div>
        {!passwordInfoState && (
          <div className="text-center">
            <button
              onClick={handlePasswordInfoSubmit}
              type="submit"
              className="bg-black/80 text-white w-[60%] p-2"
            >
              Submit
            </button>
          </div>
        )}
      </form>
      <h3>Verfication State</h3>
      {user.verifed ? (
        <h2>
          Your Account is verified
          <span className="text-red-500 text-2xl">&#10003; 🎉</span>
        </h2>
      ) : (
        <form ref={verificationFormRef}>
          <h2 className="inline">
            your account isnot verified to be able to order
          </h2>
          <button
            type="button"
            className="p-1 m-2 bg-red-500 text-white -skew-x-12"
            onClick={() => {
              setVerificationInfoState(!verificationInfoState);
              setTimeout(() => {
                if (!verificationInfoState) {
                  verificationFormRef.current.verification.focus();
                  handleScroll(verificationFormRef.current.verification);
                }
              }, 300);
            }}
          >
            Verify Now
          </button>
          {verificationInfoState && (
            <div className="my-2">
              <h3 htmlFor="verification" className="block text-xs mb-1">
                Your will recieve A PIN in Your Email : {user.email} click on
                send PIN and write the recieved PIN in the field below
              </h3>
              <span className="text-red-500" onClick={handleSendPin}>
                Send PIN
              </span>
              <input
                id="verification"
                name="verification"
                type="number"
                min={6}
                max={6}
                required
                className="bg-red-100/20 outline-none focus:border-red-400 focus:scale-105
            placeholder:text-black/70 border border-black rounded-sm w-full"
              />
              <span
                className="text-red-500 text-[10px]"
                onClick={handleSendPin}
              >
                send agian
              </span>
              <div className="text-center">
                <button
                  onClick={handlePinSubmit}
                  type="submit"
                  className="bg-black/80 text-white w-[30%] p-2 m-2"
                >
                  Submit
                </button>
              </div>
            </div>
          )}
        </form>
      )}
    </section>
  );
}
