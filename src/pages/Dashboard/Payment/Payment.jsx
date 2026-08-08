import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Loading from "../../../components/Loading/Loading";

const Payment = () => {
  const { parcelId } = useParams();
  const axiosSecure = useAxiosSecure();

  const { isLoading, data: parcel } = useQuery({
    queryKey: ["parcels", parcelId],
    queryFn: async () => {
      const res = await axiosSecure.get(`/parcels/${parcelId}`);
      return res.data;
    },
  });

  if (isLoading) {
    return <Loading></Loading>;
  }

  const handlePayment = async () => {
    const paymentInfo = {
      cost: parcel.cost,
      parcelId: parcel._id,
      parcelName: parcel.parcelName,
      senderEmail: parcel.senderEmail,
    };

    const res = await axiosSecure.post("/create-checkout-session", paymentInfo);

    window.location.href = res.data.url;
    console.log(res.data);
  };

  return (
    <div>
      <h2>
        Please Pay ${parcel.cost} for: {parcel.parcelName}
      </h2>
      <button
        onClick={handlePayment}
        className="btn btn-primary text-secondary"
      >
        Pay Now
      </button>
    </div>
  );
};

export default Payment;
