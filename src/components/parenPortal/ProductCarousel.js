import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./ProductCarousel.css";

const productImages = [
  "https://product-images-2025.s3.ap-south-1.amazonaws.com/1.jpeg",
  "https://product-images-2025.s3.ap-south-1.amazonaws.com/10.jpeg",
  "https://product-images-2025.s3.ap-south-1.amazonaws.com/11.jpeg",
  "https://product-images-2025.s3.ap-south-1.amazonaws.com/2.jpeg",
  "https://product-images-2025.s3.ap-south-1.amazonaws.com/3.jpeg",
  "https://product-images-2025.s3.ap-south-1.amazonaws.com/4.jpeg",
  "https://product-images-2025.s3.ap-south-1.amazonaws.com/5.jpeg",
  "https://product-images-2025.s3.ap-south-1.amazonaws.com/6.jpeg",
  "https://product-images-2025.s3.ap-south-1.amazonaws.com/7.jpeg",
  "https://product-images-2025.s3.ap-south-1.amazonaws.com/8.jpeg",
  "https://product-images-2025.s3.ap-south-1.amazonaws.com/9.jpeg",
  "https://product-images-2025.s3.ap-south-1.amazonaws.com/Gaudium+blue+tee.png",
  "https://product-images-2025.s3.ap-south-1.amazonaws.com/Gaudium+byellow+tee.png",
  "https://product-images-2025.s3.ap-south-1.amazonaws.com/Gaudium+green+tee.png",
  "https://product-images-2025.s3.ap-south-1.amazonaws.com/Gaudium+red+tee.png",
  "https://product-images-2025.s3.ap-south-1.amazonaws.com/knit+back+shirt.jpeg",
];

const ProductCarousel = () => {
  return (
    <Swiper
      modules={[Navigation, Pagination, Autoplay]}
      spaceBetween={20}
      slidesPerView={3} // Default: 2 images at a time
      breakpoints={{
        0: { slidesPerView: 1 }, // Mobile: Show 1 image
        768: { slidesPerView: 3 }, // Tablet/Desktop: Show 2 images
      }}
      navigation
      pagination={{ clickable: true }}
      autoplay={{ delay: 3000 }}
      loop
      style={{ width: "100%", maxWidth: "100%", margin: "auto" }}
    >
      {productImages.map((image, index) => (
        <SwiperSlide key={index}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: "250px",
            }}
          >
            <img
              src={image}
              alt={`Product ${index + 1}`}
              style={{
                maxWidth: "100%",
                maxHeight: "100%",
                objectFit: "contain",
              }}
            />
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default ProductCarousel;
