import { ourServicesData } from "./ourServices.data";
import OurServicesCard from "./OurServicesCard";

const OurServices = () => {
  return (
    <div className="bg-secondary p-20 rounded-2xl my-5">
      <h3 className="text-white text-2xl font-bold text-center">
        Our Services
      </h3>
      <p className="text-gray-300 text-center mb-5">
        Enjoy fast, reliable parcel delivery with real-time tracking and zero
        hassle. From personal packages to <br /> business shipments — we deliver
        on time, every time.
      </p>
      <div className="grid grid-cols-3 gap-6 ">
        {ourServicesData.map((item) => (
          <OurServicesCard
            key={item.id}
            icon={item.icon}
            title={item.title}
            description={item.description}
          ></OurServicesCard>
        ))}
      </div>
    </div>
  );
};

export default OurServices;
