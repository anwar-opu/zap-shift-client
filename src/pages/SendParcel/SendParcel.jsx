import { useForm, useWatch } from "react-hook-form";
import { useLoaderData, useNavigate } from "react-router";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";

const SendParcel = () => {
  const {
    register,
    handleSubmit,
    control,
    // formState: { errors },
  } = useForm();

  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const navigate = useNavigate();

  const serviceCenters = useLoaderData();
  const regionDuplicates = serviceCenters.map(
    (serviceCenter) => serviceCenter.region,
  );
  const regions = [...new Set(regionDuplicates)];

  // 
  const senderRegion = useWatch({ control, name: "senderRegion" });
  const receiverRegion = useWatch({ control, name: "receiverRegion" });

  const districtsByRegion = (region) => {
    const regionDistricts = serviceCenters.filter((c) => c.region == region);
    const districts = regionDistricts.map((d) => d.district);
    return districts;
  };

  const handleSendParcel = (data) => {
    console.log(data);

    const isDocument = data.parcelType === "document";
    const isSameDistrict = data.senderDistrict === data.receiverDistrict;
    const parcelWeight = parseFloat(data.parcelWeight);

    let cost = 0;
    if (isDocument) {
      cost = isSameDistrict ? 60 : 80;
    } else {
      if (parcelWeight < 3) {
        cost = isSameDistrict ? 110 : 150;
      } else {
        const minimumCharge = isSameDistrict ? 110 : 150;
        const extraWeight = parcelWeight - 3;
        const extraCharge = isSameDistrict
          ? extraWeight * 40
          : extraWeight * 40 + 40;
        cost = minimumCharge + extraCharge;
      }
    }
    console.log("cost", cost);
    data.cost = cost;

    Swal.fire({
      title: "Agree with the cost?",
      text: `You will be charged ${cost} taka`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Confirm and continue payment",
    }).then((result) => {
      if (result.isConfirmed)
        // save the parcel info to the data base

        axiosSecure.post("/parcels", data).then((res) => {
          console.log("after", res.data);
          if (res.data.insertedId) {
            navigate("/dashboard/my-parcels");
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "Parcel has created Please Pay!",
              showConfirmButton: false,
              timer: 2500,
            });
          }
        });
    });
  };
  return (
    <div className="p-10 bg-white rounded-2xl my-5 space-y-5">
      <h3 className="text-4xl font-bold text-secondary">Send Parcel</h3>
      <p className="text-2xl font-bold text-secondary">
        Enter your parcel details
      </p>
      <form onSubmit={handleSubmit(handleSendParcel)}>
        {/* parcel type */}
        <div className="flex flex-row gap-5">
          <label className="label">
            <input
              type="radio"
              value="document"
              {...register("parcelType")}
              className="radio"
              defaultChecked
            />
            Document
          </label>
          <label className="label">
            <input
              type="radio"
              value="non-document"
              {...register("parcelType")}
              className="radio"
            />
            Non Document
          </label>
        </div>

        {/* parcel Info  */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 my-5">
          <fieldset className="fieldset ">
            <label className="label">Parcel Name</label>
            <input
              type="text"
              {...register("parcelName")}
              className="input w-full"
              placeholder="Parcel Name"
            />
          </fieldset>
          <fieldset className="fieldset">
            <label className="label">Parcel Weight (KG)</label>
            <input
              type="number"
              {...register("parcelWeight")}
              className="input w-full"
              placeholder="Parcel Weight (KG)"
            />
          </fieldset>
        </div>

        <hr className="border border-dotted border-gray-300" />

        {/* details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 my-5">
          {/* sender details */}
          <fieldset className="fieldset">
            <h3 className="text-2xl font-bold text-secondary">
              Sender Details
            </h3>
            {/* sender Name */}
            <label className="label">Sender Name</label>
            <input
              type="text"
              {...register("senderName")}
              defaultValue={user?.displayName}
              className="input w-full"
              placeholder="Sender Name"
            />

            {/* sender email */}
            <label className="label">Sender Email</label>
            <input
              type="text"
              {...register("senderEmail")}
              defaultValue={user?.email}
              className="input w-full"
              placeholder="Sender Email"
            />

            {/* sender address */}
            <label className="label">Sender Address</label>
            <input
              type="text"
              {...register("senderAddress")}
              className="input w-full"
              placeholder="Address"
            />

            {/*  Sender Phone No */}
            <label className="label">Sender Phone No</label>
            <input
              type="number"
              {...register("senderPhone")}
              className="input w-full"
              placeholder="Sender Phone No"
            />

            {/* sender region  */}
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Sender Regions</legend>
              <select
                {...register("senderRegion")}
                defaultValue="Pick a region"
                className="select"
              >
                <option disabled={true}>Pick a region</option>

                {regions.map((region, index) => (
                  <option key={index} value={region}>
                    {region}
                  </option>
                ))}
              </select>
            </fieldset>

            {/* sender districts  */}
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Sender District</legend>
              <select
                {...register("senderDistrict")}
                defaultValue="Pick a district"
                className="select"
              >
                <option disabled={true}>Pick a district</option>

                {districtsByRegion(senderRegion).map((d, index) => (
                  <option key={index} value={d}>
                    {d}
                  </option>
                ))}
              </select>
            </fieldset>

            {/*  Sender  Pickup Instruction  */}
            <label className="label">Pickup Instruction</label>
            <input
              type="text"
              {...register("senderPickInstruction")}
              className="input w-full size-20"
              placeholder="Pickup Instruction"
            />
          </fieldset>

          {/* receiver details */}

          <fieldset className="fieldset">
            <h3 className="text-2xl font-bold text-secondary">
              Receiver Details
            </h3>
            {/* Receiver Name */}
            <label className="label">Receiver Name</label>
            <input
              type="text"
              {...register("receiverName")}
              className="input w-full"
              placeholder="Receiver Name"
            />

            {/* Receiver Email */}
            <label className="label">Receiver Email</label>
            <input
              type="text"
              {...register("receiverEmail")}
              className="input w-full"
              placeholder="Receiver Email"
            />

            {/* Receiver address */}
            <label className="label">Receiver Address</label>
            <input
              type="text"
              {...register("receiverAddress")}
              className="input w-full"
              placeholder="Address"
            />

            {/*  Receiver Phone No */}
            <label className="label">Receiver Phone No</label>
            <input
              type="number"
              {...register("receiverPhone")}
              className="input w-full"
              placeholder="Receiver Phone No"
            />

            {/* receiver region  */}
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Receiver Regions</legend>
              <select
                {...register("receiverRegion")}
                defaultValue="Pick a region"
                className="select"
              >
                <option disabled={true}>Pick a region</option>

                {regions.map((region, index) => (
                  <option key={index} value={region}>
                    {region}
                  </option>
                ))}
              </select>
            </fieldset>

            {/* receiver districts  */}
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Receiver District</legend>
              <select
                {...register("receiverDistrict")}
                defaultValue="Pick a district"
                className="select"
              >
                <option disabled={true}>Pick a district</option>

                {districtsByRegion(receiverRegion).map((d, index) => (
                  <option key={index} value={d}>
                    {d}
                  </option>
                ))}
              </select>
            </fieldset>

            {/*  Receiver  instruction  */}
            <label className="label">Delivery Instruction</label>
            <input
              type="text"
              {...register("receiverDeliveryInstruction")}
              className="input w-full size-20"
              placeholder="Delivery Instruction"
            />
          </fieldset>
        </div>
        <small className="text-secondary mt-3 block">
          * PickUp Time 4pm-7pm Approx.
        </small>
        <input
          type="submit"
          value="Proceed to Confirm Booking"
          className="btn btn-primary text-secondary mt-5"
        />
      </form>
    </div>
  );
};

export default SendParcel;
