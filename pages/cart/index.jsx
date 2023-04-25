import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { getCookie } from 'cookies-next';

import ProductQuantity from '@/components/ProductQuantity';
import { useCart } from 'react-use-cart';
export default function CartPage() {
  const { items, updateItemQuantity, removeItem, emptyCart } = useCart();
  const [itemsState, setItemsState] = useState([]);
  const [orderDeliverd, setOrderDeliverd] = useState(false);
  const [user, setUser] = useState(null);
  const [location, setLocation] = useState();
  useEffect(() => {
    setItemsState(items);
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
  }, [items]);

  if (orderDeliverd)
    return (
      <div>Order placed successfully our customer service will contact you</div>
    );
  if (!itemsState.length)
    return (
      <div className="text-center text-4">
        YOUR CART IS EMPTY....GO TO
        <Link href="/store" className="text-red-400">
          STORE
        </Link>
      </div>
    );

  const overAll = itemsState.reduce(
    (acc, curr) => {
      acc.totalPrice +=
        Math.floor(curr.price * (1 - curr.discount / 100)) * curr.quantity;
      acc.totalAmount += curr.quantity;
      return acc;
    },
    { totalPrice: 0, totalAmount: 0 }
  );
  const confirmOrder = async (e) => {
    e.preventDefault();
    const userData = {
      location: location || user.location,
      id: user.id,
      items: items,
      email: user.email,
      phone: user.phone,
      totalAmount: overAll.totalAmount,
      totalPrice: overAll.totalPrice,
    };
    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userData }),
      }).then((res) => res.json());
      // setOrderDeliverd(true);
      // emptyCart();
    } catch (err) {}
  };
  return (
    <main className="mb-5">
      <div className="grid grid-cols-[repeat(auto-fit,minmax(7rem,1fr))] gap-x-4 gap-y-4] mb-4">
        {itemsState.map((pro) => {
          return (
            <div key={pro.id} className="shadow-md shadow-black/.1">
              {' '}
              <Image
                src="/test.png"
                alt={pro.name}
                width={350}
                height={100}
                placeholder="blur"
                blurDataURL="data:image/webp;base64,UklGRlIDAABXRUJQVlA4WAoAAAAgAAAAiAAAiAAASUNDUMgBAAAAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAAAAAAAAAAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADZWUDggZAEAALANAJ0BKokAiQA+7WSoTbo0qKYul8y7QB2JZ27gOEjf0R59QeYkPwbIEq79OvQEcy8pi/sXSEbyFER9oGR4E71U1lySnyMNRThCD+Ci+mYwOywxjbAaBaKxf1AlecN/1KX7cUlxtl35P6/1/lak5vcAxb99MBgA/vDQ0qoNh4QigGbZIMX3uRDXuwLn6c/7SEOqqvMBUWhkGmLj2z2gopn++l6DAZF1MXos/vYZi9VkE1xkEhiT5s7P5xLcM+RG/bS3LafvQ/zNnUlbmTGpMGSJFOnPTCcFm3Hoa65bQRTYuaefz+tS07j1OWVR1V2oCnSeSjQXY0Zt2MMpRy0IiPQllebUWNx9egyZxNgSi8H2fgOGzFc0VbYl39KCqHV7bq+t+DZmHbhxlXEkVZTODhwnS5G9Feha/aVrx2Gmg58u7ujqV1pRWObntTUB7rS1dMmM+E838QJa0YcyDQd8AEd4W0AA"
                style={{
                  maxWidth: '100%',
                  height: 'auto',
                }}
              />
              <div className="flex justify-between">
                <span>
                  {pro.name} {pro.variant}
                </span>
                <span>{pro.type} </span>
              </div>
              <div className="flex justify-between">
                <span>
                  {Math.floor(pro.price * (1 - pro.discount / 100))}
                  {pro.discount && (
                    <sup className="line-through">{pro.price}</sup>
                  )}
                </span>
                <span>
                  {pro.discount ? `-${pro.discount}%` : 'No Discount'}
                </span>
              </div>
              <h3 className="mt-2">
                Quantity: <span className="text-red-400"> {pro.quantity}</span>
              </h3>
              <h3 className="my-2">
                Price:
                <span className="text-red-400">
                  {Math.floor(pro.price * (1 - pro.discount / 100)) *
                    pro.quantity}
                </span>
              </h3>
              <ProductQuantity
                quantity={pro.quantity}
                isMultiple
                customDecrement={() =>
                  updateItemQuantity(pro.id, pro.quantity - 1)
                }
                customIncrement={() =>
                  updateItemQuantity(pro.id, pro.quantity + 1)
                }
              />
              <button
                className="bg-red-400 p-1 w-full mt-3"
                onClick={() => removeItem(pro.id)}
              >
                Remove Item
              </button>
            </div>
          );
        })}
      </div>
      <h2 className="text-center text-xl">
        Total Price is :
        <span className="text-red-400 font-bold text-xl">
          {overAll.totalPrice}
        </span>
      </h2>
      <h2 className="text-center text-xl">
        Total items is :
        <span className="text-red-400 font-bold text-xl">
          {overAll.totalAmount}
        </span>
      </h2>
      {!user ? (
        <h3>Yoy must login to continue shipping</h3>
      ) : (
        <div>
          <form>
            <h1 className="my-2">
              our customer service will contant you via Email :{user.email}
              or Phone {user.phone}
              order will be shipped to &ldquo;
              {user.location}&ldquo; if you wanna change shipping location write
              the new location below
            </h1>
            <input
              type="text"
              minLength={15}
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder={user.location}
              className="bg-red-100/20 outline-none focus:border-red-400 
            placeholder:text-black/70 border border-black rounded-sm w-full"
            />
            <div className="my-2 text-center">
              <button
                onClick={confirmOrder}
                type="submit"
                className="bg-black/80 text-white w-[60%] p-2"
              >
                Confirm Order
              </button>
            </div>
          </form>
        </div>
      )}
    </main>
  );
}
