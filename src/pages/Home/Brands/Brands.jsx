import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import amazonImg from "../../../assets/brands/amazon.png";
import amazonVectorImg from "../../../assets/brands/amazon_vector.png";
import casioImg from "../../../assets/brands/casio.png";
import moonStarImg from "../../../assets/brands/moonstar.png";
import randstadImg from "../../../assets/brands/randstad.png";
import starImg from "../../../assets/brands/star.png";
import starPeopleImg from "../../../assets/brands/start_people.png";
import { Autoplay } from "swiper/modules";

const Brands = () => {
  return (
    <div className="my-20 pt-5 pb-3">
      <h3 className="font-extrabold text-2xl text-secondary text-center">
        We've helped thousands of sales teams
      </h3>
      <div className="mt-10">
        <Swiper
          slidesPerView={3}
          //   centeredSlides={true}
          spaceBetween={30}
          grabCursor={true}
          loop={true}
          speed={4000}
          autoplay={{
            delay: 1,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          modules={[Autoplay]}
        >
          <SwiperSlide>
            <img src={amazonImg} alt="" />
          </SwiperSlide>
          <SwiperSlide>
            <img src={amazonVectorImg} alt="" />
          </SwiperSlide>
          <SwiperSlide>
            <img src={casioImg} alt="" />
          </SwiperSlide>
          <SwiperSlide>
            <img src={moonStarImg} alt="" />
          </SwiperSlide>
          <SwiperSlide>
            <img src={randstadImg} alt="" />
          </SwiperSlide>
          <SwiperSlide>
            <img src={starImg} alt="" />
          </SwiperSlide>
          <SwiperSlide>
            <img src={starPeopleImg} alt="" />
          </SwiperSlide>
        </Swiper>
      </div>

      <hr className="border-t-2 border-dotted border-gray-400 mt-10" />
    </div>
  );
};

export default Brands;
