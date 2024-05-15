import React from 'react';
import Image from 'next/image';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from 'react-slick';

const settings = {
  dots: true,
  infinite: true,
  speed: 400,
  slidesToShow: 1,
  slidesToScroll: 1,
};

const ImageCarousel = ({ images }) => {
  return (
    <Slider {...settings}>
      {images.map((image) => (
        <div key={image.id} style={{padding: "1px", textAlign:"center"}}>
          <Image src={image.url} alt={image.alt} width={780} height={440} style={{margin: "0 auto"}} unoptimized/>
        </div>
      ))}
    </Slider>
  );
};

export default ImageCarousel;