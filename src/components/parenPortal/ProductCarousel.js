import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./ProductCarousel.css";

const productImages = [
  "https://res.cloudinary.com/dwgfx9feh/image/upload/v1742543201/product1_yvygvw.png",
  "https://res.cloudinary.com/dwgfx9feh/image/upload/v1742543343/2_gwapw6.jpg",
  "https://res.cloudinary.com/dwgfx9feh/image/upload/v1742543521/3_glg5ck.jpg",
  "https://res.cloudinary.com/dwgfx9feh/image/upload/v1742543521/4_yjw96g.jpg",
  "https://res.cloudinary.com/dwgfx9feh/image/upload/v1742543521/5_lgmwpd.jpg",
  "https://res.cloudinary.com/dwgfx9feh/image/upload/v1742543521/6_exkun8.jpg",
  "https://res.cloudinary.com/dwgfx9feh/image/upload/v1742543522/7_qn9rqi.jpg",
  "https://res.cloudinary.com/dwgfx9feh/image/upload/v1742543525/8_icgob0.jpg",
  "https://res.cloudinary.com/dwgfx9feh/image/upload/v1742543520/9_rmkmeq.jpg",
  "https://res.cloudinary.com/dwgfx9feh/image/upload/v1742543521/10_moc0sn.jpg",
  "https://res.cloudinary.com/dwgfx9feh/image/upload/v1742543521/11_rgzyxj.jpg",
  "https://res.cloudinary.com/dwgfx9feh/image/upload/v1742543521/12_wcngt9.jpg",
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
