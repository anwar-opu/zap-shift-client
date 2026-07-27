import { whyChooseUsData } from "./whyChooseUs.data";
import WhyChooseUsCard from "./WhyChooseUsCard";

const WhyChooseUs = () => {
  return (
    <div>
      {whyChooseUsData.map((data) => (
        <WhyChooseUsCard
          key={data.id}
          image={data.image}
          title={data.title}
          description={data.description}
        ></WhyChooseUsCard>
      ))}
    </div>
  );
};

export default WhyChooseUs;
