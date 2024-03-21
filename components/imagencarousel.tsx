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
  draggable: false
};

const ImageCarousel = ({ images }) => {
  return (
    <Slider {...settings}>
      {images.map((image) => (
        <div key={image.id} style={{width:"100%", height:"100%", padding: "1px"}}>
          <Image src={image.url} alt={image.alt} width={800} height={440} style={{padding:"1px"}}/>
        </div>
      ))}
    </Slider>
  );
};

export default ImageCarousel;