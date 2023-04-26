import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';

import ProductQuantity from '@/components/ProductQuantity';

import { Carousel } from 'react-responsive-carousel';
import { useCart } from 'react-use-cart';
import { FaWindowClose } from 'react-icons/fa';
import ReactModal from 'react-modal';
import ProductsModel from '@/DB/models/productsModel';
import { dbConnect } from '@/utils/DB';

export default function ProductPage({ product }) {
  const variants = ['10Ml', 'Red', 'Blue'];
  const [variant, setVariant] = useState();
  const { addItem, inCart, updateItemQuantity } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [modalState, setModalState] = useState(false);
  const [price, setPrice] = useState(product.price);
  product.priceDiscount = 10;

  const addToCart = () => {
    if (!variant) setVariant(variants[1]);
    if (variant) {
      const cartId = `${product.name}${variant}`;
      if (inCart(cartId)) {
        return updateItemQuantity(cartId, quantity);
      }
      return addItem({
        id: cartId,
        name: product.name,
        variant,
        quantity,
        price: product.price,
        discount: product.priceDiscount,
        image: product.image,
      });
    }
  };
  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
  };
  return (
    <div className="mb-8">
      <div className="text-center mb-5">
        <Image
          width={500}
          height={500}
          className="w-[80%] inline-block"
          src="/test.png"
          alt={product.name}
          placeholder="blur"
          blurDataURL="data:image/webp;base64,UklGRlIDAABXRUJQVlA4WAoAAAAgAAAAiAAAiAAASUNDUMgBAAAAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAAAAAAAAAAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADZWUDggZAEAALANAJ0BKokAiQA+7WSoTbo0qKYul8y7QB2JZ27gOEjf0R59QeYkPwbIEq79OvQEcy8pi/sXSEbyFER9oGR4E71U1lySnyMNRThCD+Ci+mYwOywxjbAaBaKxf1AlecN/1KX7cUlxtl35P6/1/lak5vcAxb99MBgA/vDQ0qoNh4QigGbZIMX3uRDXuwLn6c/7SEOqqvMBUWhkGmLj2z2gopn++l6DAZF1MXos/vYZi9VkE1xkEhiT5s7P5xLcM+RG/bS3LafvQ/zNnUlbmTGpMGSJFOnPTCcFm3Hoa65bQRTYuaefz+tS07j1OWVR1V2oCnSeSjQXY0Zt2MMpRy0IiPQllebUWNx9egyZxNgSi8H2fgOGzFc0VbYl39KCqHV7bq+t+DZmHbhxlXEkVZTODhwnS5G9Feha/aVrx2Gmg58u7ujqV1pRWObntTUB7rS1dMmM+E838QJa0YcyDQd8AEd4W0AA"
          style={{
            width: 'auto',
            height: 'auto',
          }}
        />
      </div>
      <h2 className="font-bold tezt-2xl text-center">{product.name}</h2>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
        tempus ultricies sodales. Fusce ultricies sagittis urna, id consectetur
        metus. Maecenas aliquet nisl non egestas ornare. Nullam massa nunc,
        posuere consequat tellus vitae, varius commodo risus. Praesent nec purus
        feugiat, laoreet orci eget, egestas turpis.
      </p>
      {variants.length > 1 && (
        <div className="flex justify-around">
          {variants.map((varia) => {
            return (
              <figure
                onClick={() => setVariant(varia)}
                key={varia}
                className={`w-11 h-11 border border-black p-1 text-center ${
                  varia === variant ? 'border-2' : ''
                }`}
              >
                {varia}
              </figure>
            );
          })}
        </div>
      )}
      <div className="flex flex-col gap-2 items-center">
        <span className="uppercase">Quantity</span>
        <ProductQuantity quantity={quantity} setQuantity={setQuantity} />
      </div>
      <div className="text-center">
        <button
          className="uppercase w-[80%] bg-red-300 p-2 text-2xl"
          onClick={() => {
            addToCart();
            setModalState(true);
          }}
        >
          add to cart
        </button>
        <ReactModal
          isOpen={modalState}
          onRequestClose={() => setModalState(false)}
          style={customStyles}
          ariaHideApp={false}
        >
          <FaWindowClose
            className="absolute top-[5%] right-[5%]"
            onClick={() => setModalState(false)}
          />
          <h1>Product Was Added To cart</h1>
          <h3>Go To Home Page</h3>
          <h3>Go To Cart Page</h3>
        </ReactModal>
      </div>
    </div>
  );
}

export const getStaticPaths = async () => {
  await dbConnect();

  let paths = [];
  let products = await ProductsModel.find();
  if (products) {
    console.log('found');
    paths = [
      ...paths,
      ...products.map((product) => ({
        params: { slug: product.nameSlug },
      })),
    ];
  }
  return {
    paths,
    fallback: 'blocking',
  };
};

export const getStaticProps = async (context) => {
  await dbConnect();

  const nameSlug = context.params.slug;
  console.log(nameSlug);
  let product = await ProductsModel.findOne({ nameSlug });
  console.log(product);
  product = {
    name: product.name,
    price: product.price,
    type: product.type || 'Cream',
    ratingsAverage: product.ratingsAverage || 'hi',
    productType: product.productType || 'hi',
    productImage: product.productImage || 'hi',
    slug: product.slug,
    nameSlug: product.nameSlug,
    // id,
  };
  return {
    props: {
      product,
    },
  };
};
