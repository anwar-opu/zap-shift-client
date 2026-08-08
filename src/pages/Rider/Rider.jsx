import { useForm, useWatch } from "react-hook-form";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useLoaderData } from "react-router";
import riderImg from "./../../assets/agent-pending.png";
import Swal from "sweetalert2";

const Rider = () => {
  const {
    register,
    handleSubmit,
    control,
    // formState: { errors },
  } = useForm();
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const serviceCenters = useLoaderData();
  const regionDuplicates = serviceCenters.map(
    (serviceCenter) => serviceCenter.region,
  );
  const regions = [...new Set(regionDuplicates)];

  //
  const riderRegion = useWatch({ control, name: "riderRegion" });

  const districtsByRegion = (region) => {
    const regionDistricts = serviceCenters.filter((c) => c.region == region);
    const districts = regionDistricts.map((d) => d.district);
    return districts;
  };

  const handleRiderApplication = (data) => {
    console.log(data);
    axiosSecure.post("/riders", data).then((res) => {
      if (res.data.insertedId) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title:
            "Your Application has been submitted, we will reach out to you 14 days ",
          showConfirmButton: false,
          timer: 2500,
        });
      }
    });
  };

  return (
    <div className="bg-white rounded-xl p-5 mt-5">
      <h2 className="text-4xl font-bold text-secondary">Be a Rider</h2>
      <p className="text-gray-500 my-3 ">
        Enjoy fast, reliable parcel delivery with real-time tracking and zero{" "}
        <br />
        hassle. From personal packages to business shipments — we deliver on
        time, every time.
      </p>
      <form onSubmit={handleSubmit(handleRiderApplication)}>
        <hr className="border border-dotted border-gray-300" />

        {/* details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 my-5">
          {/* Rider details */}
          <fieldset className="fieldset">
            <h3 className="text-2xl font-bold text-secondary">
              Tell us about yourself
            </h3>
            {/* rider Name */}
            <label className="label">Rider Name</label>
            <input
              type="text"
              {...register("riderName")}
              defaultValue={user?.displayName}
              className="input w-full"
              placeholder="Rider Name"
            />

            {/* rider email */}
            <label className="label">Rider Email</label>
            <input
              type="text"
              {...register("riderEmail")}
              defaultValue={user?.email}
              className="input w-full"
              placeholder="Rider Email"
            />

            {/* rider address */}
            <label className="label">Rider Address</label>
            <input
              type="text"
              {...register("riderAddress")}
              className="input w-full"
              placeholder="Address"
            />

            {/*  Rider Phone No */}
            <label className="label">Rider Phone No</label>
            <input
              type="number"
              {...register("riderPhone")}
              className="input w-full"
              placeholder="Rider Phone No"
            />

            {/* rider region  */}
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Rider Regions</legend>
              <select
                {...register("riderRegion")}
                defaultValue="Pick a region"
                className="select w-full"
              >
                <option disabled={true}>Pick a region</option>

                {regions.map((region, index) => (
                  <option key={index} value={region}>
                    {region}
                  </option>
                ))}
              </select>
            </fieldset>

            {/* rider districts  */}
            <fieldset className="fieldset w-full ">
              <legend className="fieldset-legend">Rider District</legend>
              <select
                {...register("riderDistrict")}
                defaultValue="Pick a district"
                className="select w-full"
              >
                <option disabled={true}>Pick a district</option>

                {districtsByRegion(riderRegion).map((d, index) => (
                  <option key={index} value={d}>
                    {d}
                  </option>
                ))}
              </select>
            </fieldset>

            {/*  Rider Driving License Number */}
            <label className="label">Driving License Number</label>
            <input
              type="text"
              {...register("riderDrivingLicense")}
              className="input w-full"
              placeholder="Driving License Number"
            />
            {/*  Rider Bike Brand Model and Year */}
            <label className="label">NID NO</label>
            <input
              type="text"
              {...register("riderNIDNo")}
              className="input w-full"
              placeholder="NID NO"
            />

            {/*  Rider Bike Brand Model and Year */}
            <label className="label">Bike Brand Model and Year</label>
            <input
              type="text"
              {...register("riderBikeModelYear")}
              className="input w-full"
              placeholder="Bike Brand Model and Year"
            />

            {/*  Rider Bike Registration Number */}
            <label className="label">Bike Registration Number</label>
            <input
              type="text"
              {...register("riderBikeRegNumber")}
              className="input w-full"
              placeholder="Bike Registration Number"
            />

            {/*  Rider  Your self */}
            <label className="label">Tell Us About Yourself</label>
            <input
              type="text"
              {...register("riderYourSelf")}
              className="input w-full size-20"
              placeholder="Tell Us About Yourself"
            />

            {/* submit btn */}
            <input
              type="submit"
              value="Submit"
              className="btn btn-primary text-secondary mt-5 w-full"
            />
          </fieldset>

          {/* Rider Img  */}

          <img className="" src={riderImg} alt="" />
        </div>
      </form>
    </div>
  );
};

export default Rider;
