const WhyChooseUsCard = ({ image, title, description }) => {
  return (
    <div className="bg-white flex flex-row gap-5 p-5 rounded-2xl m-5">
      <img className="w-50 h-50" src={image} alt="" />
      <div className="ml-5 w-px bg-gray-300 "></div>
      <div className="flex flex-col justify-center ">
        <h3 className="font-extrabold text-2xl text-secondary">{title}</h3>
        <p className="text-gray-400">{description}</p>
      </div>
    </div>
  );
};

export default WhyChooseUsCard;
