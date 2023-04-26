// import Image from 'next/image';
// import Link from 'next/link';
// import { useState } from 'react';
// import slugify from 'slugify';

// import { dbConnect } from '@/utils/DB';
// import ProductsModel from '@/DB/models/productsModel';
// import CategoriesModel from '@/DB/models/categoriesModel';
// export default function Store({ products, categories }) {
//   const [selectedCategories, setSelectedCategories] = useState([]);

//   const handleCategoryChange = (e) => {
//     if (e.target.checked) {
//       setSelectedCategories([...selectedCategories, e.target.id]);
//     } else {
//       setSelectedCategories(
//         selectedCategories.filter((category) => category !== e.target.id)
//       );
//     }
//   };

//   const filteredProducts = products.filter((pro) => {
//     if (selectedCategories.length === 0) {
//       return true;
//     }

//     return selectedCategories.some((category) => pro?.slug === category);
//   });
//   return (
//     // <div className="grid grid-cols-[repeat(auto-fit,minmax(7rem,1fr))] gap-x-4 gap-y-4] shadow-md shadow-black/.1">
//     <main>
//       <div className="p-5 pb-0 border-b-2 border-red-300">
//         <h1 className="text-center text-2xl pb-1 border-b-2 border-red-300 text-[#EB5757] uppercase font-bold">
//           Choose your category
//         </h1>
//         <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4">
//           {/* categories checkboxes */}
//           {categories.map((category) => (
//             <div
//               key={category.slug}
//               className="flex items-center justify-start"
//             >
//               <input
//                 type="checkbox"
//                 className="mr-2 accent-black"
//                 id={category.slug}
//                 onChange={handleCategoryChange}
//               />
//               <label htmlFor={category.slug} className="text-lg">
//                 {category.name?.toUpperCase()}
//               </label>
//             </div>
//           ))}
//         </div>
//       </div>
//       <div className="grid grid-cols-[repeat(auto-fit,minmax(7rem,1fr))] gap-x-4 gap-y-4]">
//         {filteredProducts.map((pro) => {
//           pro.priceDiscount = 10;
//           return (
//             <Link key={pro.id} href={`/products/${pro.nameSlug}`}>
//               <div className="shadow-md shadow-black/.1">
//                 <Image
//                   src="/test.png"
//                   alt={pro.name}
//                   width={350}
//                   height={100}
//                   placeholder="blur"
//                   blurDataURL="data:image/webp;base64,UklGRlIDAABXRUJQVlA4WAoAAAAgAAAAiAAAiAAASUNDUMgBAAAAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAAAAAAAAAAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADZWUDggZAEAALANAJ0BKokAiQA+7WSoTbo0qKYul8y7QB2JZ27gOEjf0R59QeYkPwbIEq79OvQEcy8pi/sXSEbyFER9oGR4E71U1lySnyMNRThCD+Ci+mYwOywxjbAaBaKxf1AlecN/1KX7cUlxtl35P6/1/lak5vcAxb99MBgA/vDQ0qoNh4QigGbZIMX3uRDXuwLn6c/7SEOqqvMBUWhkGmLj2z2gopn++l6DAZF1MXos/vYZi9VkE1xkEhiT5s7P5xLcM+RG/bS3LafvQ/zNnUlbmTGpMGSJFOnPTCcFm3Hoa65bQRTYuaefz+tS07j1OWVR1V2oCnSeSjQXY0Zt2MMpRy0IiPQllebUWNx9egyZxNgSi8H2fgOGzFc0VbYl39KCqHV7bq+t+DZmHbhxlXEkVZTODhwnS5G9Feha/aVrx2Gmg58u7ujqV1pRWObntTUB7rS1dMmM+E838QJa0YcyDQd8AEd4W0AA"
//                   style={{
//                     maxWidth: '100%',
//                     height: 'auto',
//                   }}
//                 />
//                 <div className="flex justify-between">
//                   <span>{pro.name} </span>
//                   <span>{pro.type} </span>
//                 </div>
//                 <div className="flex justify-between">
//                   <span>
//                     {Math.floor(pro.price * (1 - pro.priceDiscount / 100))}
//                     {pro.priceDiscount && (
//                       <sup className="line-through">{pro.price}</sup>
//                     )}
//                   </span>
//                   <span>
//                     {pro.priceDiscount
//                       ? `${pro.priceDiscount}%`
//                       : 'No Discount'}
//                   </span>
//                 </div>
//               </div>
//             </Link>
//           );
//         })}
//       </div>
//     </main>
//   );
// }

// export async function getStaticProps(context) {
//   await dbConnect();

//   let products = await ProductsModel.find();
//   const proData = products.map((pro) => {
//     // const id = `${pro._id}`;
//     return {
//       name: pro.name,
//       price: pro.price,
//       type: pro.type || 'Cream',
//       ratingsAverage: pro.ratingsAverage || 'hi',
//       productType: pro.productType || 'hi',
//       productImage: pro.productImage || 'hi',
//       slug: pro.slug,
//       nameSlug: pro.nameSlug,
//       // id,
//     };
//   });
//   let categories = await CategoriesModel.find();
//   categories = categories.map((pro) => {
//     const id = `${pro.id}`;
//     return { id, name: pro.name, slug: pro.slug };
//   });

//   return { props: { products: proData, categories } };
// }
