import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectFade, Navigation, Pagination, Autoplay } from "swiper/modules";

import { Fade, Bounce, Slide } from "react-awesome-reveal";
// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./Banner.css";

const Banner = ({ sliderData }) => {
  return (
    <div>
      <Swiper
        spaceBetween={30}
        slidesPerView={1} // Display one slide per page
        centeredSlides={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        effect={"fade"}
        navigation={true}
        pagination={{
          clickable: true,
        }}
        modules={[Autoplay, EffectFade, Navigation, Pagination]}
        className="mySwiper"
      >
        {sliderData.map((book) => (
          <SwiperSlide key={book._id}>
            <div
              className="hero"
              style={{
                backgroundImage: `url(${book.image})`,
              }}
            >
              <div className="hero-overlay bg-opacity-60"></div>
              <div className="hero-content text-center text-white py-20 md:py-52">
                <Fade>
                  <div className="max-w-3xl">
                    <h1 className="mb-8 text-5xl font-bold font-PlayFair">
                      {book.category}
                    </h1>
                    <Bounce>
                      <Link
                        to={`/book-categories/${book.category.toLowerCase()}`}
                        className="btn px-6 border-none text-white uppercase bg-gradient-to-br from-[#055c36] to-[#727d61]"
                      >
                        {book.button}
                      </Link>
                    </Bounce>
                  </div>
                </Fade>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
export default Banner;
