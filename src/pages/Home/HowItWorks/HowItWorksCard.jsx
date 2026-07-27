import { Navigation, PackageCheck, PackagePlus, Truck } from "lucide-react";

const iconMap = {
  PackagePlus: PackagePlus,
  Truck: Truck,
  Navigation: Navigation,
  PackageCheck: PackageCheck,
};
const HowItWorksCard = ({ icon, title, description }) => {
  const IconComponent = iconMap[icon];
  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm flex flex-col items-center">
      {/* <p className=" font-semibold text-secondary text-3xl" >{step}</p> */}
      <div className=" icon my-2">{IconComponent && <IconComponent size={32} />}</div>
      <h3 className="text-secondary font-bold text-xl">{title}</h3>
      <p className="text-[#606060] text-center">{description}</p>
    </div>
  );
};

export default HowItWorksCard;
