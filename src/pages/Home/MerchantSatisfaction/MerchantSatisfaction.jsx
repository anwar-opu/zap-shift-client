import boxImg from "../../../assets/location-merchant.png";
import bgImg from "../../../assets/be-a-merchant-bg.png";
const MerchantSatisfaction = () => {
  return (
    <div
      className="bg-secondary p-10 flex gap-5 rounded-3xl m-5 bg-contain bg-no-repeat bg-top"
      style={{ backgroundImage: `url(${bgImg})` }}
    >
      <div className="flex flex-col gap-5 justify-center ">
        <h3 className="text-white text-3xl font-bold">
          Merchant and Customer Satisfaction is Our First Priority
        </h3>
        <p className="text-gray-300">
          We offer the lowest delivery charge with the highest value along with
          100% safety of your product. Pathao courier delivers your parcels in
          every corner of Bangladesh right on time.
        </p>
        <div className="flex gap-5 font-bold items-center ">
          <button className="text-secondary bg-primary btn border-none shadow-none rounded-3xl">
            Become a Merchant
          </button>
          <button className="text-primary bg-secondary border-primary btn shadow-none rounded-3xl">
            Earn with ZapShift Courier
          </button>
        </div>
      </div>
      <div className="w-full">
        <img src={boxImg} alt="" />
      </div>
    </div>
  );
};

export default MerchantSatisfaction;
