import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import bannerImage1 from "../../../assets/banner/banner1.png";
import bannerImage2 from "../../../assets/banner/banner2.png";
import bannerImage3 from "../../../assets/banner/banner3.png";

const Banner = () => {
  return (
    <div className="mt-5">
      <Carousel autoPlay={true} infiniteLoop={true}>
        <div>
          <img src={bannerImage1} />
        </div>
        <div>
          <img src={bannerImage2} />
        </div>
        <div>
          <img src={bannerImage3} />
        </div>
      </Carousel>
    </div>
  );
};

export default Banner;
