import { howItWorksData } from "./howItWorks.data";
import HowItWorksCard from "./HowItWorksCard";

const HowItWorks = () => {
  return (
    <div className="p-5 max-w-11/12 mx-auto">
      <h3 className="font-bold text-secondary text-2xl pb-5">How it Works</h3>
      <div className="grid grid-cols-4 gap-5">
        {howItWorksData.map((item) => (
          <HowItWorksCard
            key={item.id}
            // step={item.step}
            icon={item.icon}
            title={item.title}
            description={item.description}
          ></HowItWorksCard>
        ))}
      </div>
    </div>
  );
};

export default HowItWorks;
