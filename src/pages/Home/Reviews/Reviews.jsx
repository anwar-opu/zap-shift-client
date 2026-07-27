import { use } from "react";
import ReviewsCard from "./ReviewsCard";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectCoverflow, Pagination } from "swiper/modules";

import customerTopImg from "./../../../assets/customer-top.png";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";

const Reviews = ({ reviewsPromise }) => {
  const reviews = use(reviewsPromise);
  console.log(reviews);
  return (
    <div>
      <div className="flex flex-col gap-5 items-center my-10">
        <img src={customerTopImg} alt="" />
        <h1 className="text-4xl font-extrabold text-secondary ">
          What our customers are sayings
        </h1>
        <p className="text-gray-500 text-center">
          Enhance posture, mobility, and well-being effortlessly with Posture
          Pro. Achieve proper alignment,
          <br />
          reduce pain, and strengthen your body with ease!
        </p>
      </div>
      <div>
        <>
          <Swiper
            loop={true}
            effect={"coverflow"}
            grabCursor={true}
            centeredSlides={true}
            slidesPerView={3}
            coverflowEffect={{
              rotate: 30,
              stretch: "50%",
              depth: 200,
              modifier: 1,
              scale: 0.75,
              slideShadows: true,
            }}
            autoplay={{
              delay: 2000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            pagination={true}
            modules={[EffectCoverflow, Pagination, Autoplay]}
            className="mySwiper"
          >
            {reviews.map((item) => (
              <SwiperSlide key={item.id}>
                <ReviewsCard item={item}></ReviewsCard>
              </SwiperSlide>
            ))}
          </Swiper>
        </>
      </div>
    </div>
  );
};

export default Reviews;
