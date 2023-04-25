import { ShimmerImage } from '@/components/ui';
import React from 'react';
import { Carousel as ReactCarousel } from 'react-responsive-carousel';
import Image from 'next/image';

const Carousel = ({ images, width, height, containerHeight, ...props }) => {
  return (
    <ReactCarousel
      showIndicators
      showStatus={false}
      className={containerHeight}
      showThumbs={false}
      autoPlay
      interval={10000}
    >
      {images.map((asset) => (
        <ShimmerImage
          src={asset?.image?.url}
          alt={asset?.name}
          width={width}
          height={height}
          key={asset?.id}
          {...props}
        />
      ))}
    </ReactCarousel>
  );
};

export default Carousel;
