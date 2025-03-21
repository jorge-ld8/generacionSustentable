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
  adaptiveHeight: true
};

const ImageCarousel = ({ images }) => {
  return (
    <div style={{ width: '100%', maxWidth: '900px', margin: '0 auto', overflow: 'hidden' }}>
      <Slider {...settings}>
        {images.map((image) => (
          <div key={image.id} style={{padding: "5px", textAlign:"center", height: "auto"}}>
            <div style={{ position: 'relative', width: '100%', height: '0', paddingBottom: '56.25%' }}>
              <Image 
                src={image.url} 
                alt={image.alt}
                fill={true}
                style={{
                  objectFit: "contain",
                  position: "absolute",
                  top: 0,
                  left: 0
                }} 
                unoptimized
              />
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default ImageCarousel;