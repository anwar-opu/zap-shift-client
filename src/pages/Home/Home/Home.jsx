import HowItWorks from "../HowItWorks/HowItWorks";
import OurServices from "../OurServices/OurServices";
import Banner from "../Banner/Banner";
import Brands from "../Brands/Brands";
import WhyChooseUs from "../WhyChooseUs/WhyChooseUs";
import MerchantSatisfaction from "../MerchantSatisfaction/MerchantSatisfaction";
import Reviews from "../Reviews/Reviews";
import FrequentlyAsked from "../FrequentlyAsked/FrequentlyAsked";

const reviewsPromise = fetch("/data/reviews.json").then((res) => res.json());

const Home = () => {
  return (
    <div>
      <Banner></Banner>
      <HowItWorks></HowItWorks>
      <OurServices></OurServices>
      <Brands></Brands>
      <WhyChooseUs></WhyChooseUs>
      <MerchantSatisfaction></MerchantSatisfaction>
      <Reviews reviewsPromise={reviewsPromise}></Reviews>
      <FrequentlyAsked></FrequentlyAsked>
    </div>
  );
};

export default Home;
