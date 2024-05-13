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
  draggable: false,
  arrows: true
};

const ImageCarousel = ({ images }) => {
  return (
    <Slider {...settings}>
      {images.map((image) => (
        <div key={image.id} style={{padding: "1px", textAlign:"center"}}>
          <Image src={image.url} alt={image.alt} width={800} height={440} style={{padding:"1px", margin: "0 auto"}} unoptimized/>
        </div>
      ))}
      <style jsx>{`
          .slick-slide {
            width: calc(100% + 1px);
          }
          .slick-active {
            text-align: center;
            margin: 0 auto;
          }
          .slick-list{
            display: flex;
            justify-content: center;
          }
          `
          }
      </style>
    </Slider>
  );
};

export default ImageCarousel;