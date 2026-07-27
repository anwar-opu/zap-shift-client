const AboutUs = () => {
  return (
    <div className="bg-white p-5 my-5 rounded-3xl">
      <h3 className="text-3xl font-bold text-secondary">About Us</h3>
      <p className="text-gray-500 mt-5">
        Enjoy fast, reliable parcel delivery with real-time tracking and zero{" "}
        <br />
        hassle. From personal packages to business shipments — we deliver on
        time, every time.
      </p>
      <hr className="border-t-2 border-dotted border-gray-400 mt-10" />

      {/* tab switching daisy Ui */}

      {/* name of each tab group should be unique */}
      <div className="tabs tabs-lift mt-5">
        <input
          type="radio"
          name="my_tabs_3"
          className="tab font-bold"
          aria-label="Story"
          defaultChecked
        />
        <div className="tab-content bg-base-100 border-base-300 p-6">
          Our story began with a simple mission — to make delivery reliable and
          stress-free for everyone in Bangladesh.
        </div>

        <input
          type="radio"
          name="my_tabs_3"
          className="tab font-bold"
          aria-label="Mission"
        />
        <div className="tab-content bg-base-100 border-base-300 p-6">
          Our mission is to connect every corner of the country with fast, safe,
          and affordable delivery service.
        </div>

        <input
          type="radio"
          name="my_tabs_3"
          className="tab font-bold"
          aria-label="Success"
        />
        <div className="tab-content bg-base-100 border-base-300 p-6">
          We have delivered thousands of parcels successfully with a 98% on-time
          delivery rate.
        </div>

        <input
          type="radio"
          name="my_tabs_3"
          className="tab font-bold"
          aria-label="Team & Others"
        />
        <div className="tab-content bg-base-100 border-base-300 p-6">
          Our team consists of dedicated professionals working around the clock
          to ensure smooth operations.
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
