import {
  Banknote,
  Boxes,
  MapPinned,
  RotateCcw,
  Warehouse,
  Zap,
} from "lucide-react";

const iconMap = {
  Zap: Zap,
  MapPinned: MapPinned,
  Boxes: Boxes,
  Banknote: Banknote,
  Warehouse: Warehouse,
  RotateCcw: RotateCcw,
};
const OurServicesCard = ({ icon, title, description }) => {
  const IconComponent = iconMap[icon];
  return (
    <div>
      <div className="bg-white rounded-2xl p-5 shadow-sm flex flex-col justify-center items-center h-86.5">
        {/* <p className=" font-semibold text-secondary text-3xl" >{step}</p> */}
        <div className=" icon my-2">
          {IconComponent && <IconComponent size={32} />}
        </div>
        <h3 className="text-secondary font-bold text-xl">{title}</h3>
        <p className="text-[#606060] text-center">{description}</p>
      </div>
    </div>
  );
};

export default OurServicesCard;
