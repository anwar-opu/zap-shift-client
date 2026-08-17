import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const AssignedDeliveries = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { data: parcels = [], refetch } = useQuery({
    queryKey: ["parcels", user.email, "driver_assigned"],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `parcels/rider?riderEmail=${user.email}&deliveryStatus=driver_assigned`,
      );

      return res.data;
    },
  });

  const handleDeliveryStatusUpdate = (parcel, status) => {
    let message = `Parcel Status is Updated with ${status.split("_").join(" ")}`;
    
    const statusInfo = {
      deliveryStatus: status,
      riderId: parcel.riderId,
      trackingId: parcel.trackingId,
    };

    axiosSecure
      .patch(`/parcels/${parcel._id}/status`, statusInfo)
      .then((res) => {
        if (res.data.modifiedCount) {
          refetch();
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: message,
            showConfirmButton: false,
            timer: 2500,
          });
        }
      });
  };

  return (
    <div>
      <h3 className="text-4xl text-secondary">
        Parcels Pending Pickup{parcels.length}
      </h3>
      <div className="overflow-x-auto">
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Confirm</th>
              <th>Other Actions</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {parcels.map((parcel, index) => (
              <tr key={parcel._id}>
                <th>{index + 1}</th>
                <td>{parcel.parcelName}</td>
                <td>
                  {parcel.deliveryStatus === "driver_assigned" ? (
                    <>
                      <button
                        onClick={() => {
                          handleDeliveryStatusUpdate(parcel, "rider_arriving");
                        }}
                        className="btn btn-primary text-secondary mr-2"
                      >
                        Accept
                      </button>
                      <button className="btn btn-warning text-secondary">
                        Reject
                      </button>
                    </>
                  ) : (
                    <>
                      <span className="text-green-500">Accepted</span>
                    </>
                  )}
                </td>
                <td>
                  <button
                    onClick={() => {
                      handleDeliveryStatusUpdate(parcel, "parcel_pickup");
                    }}
                    className="btn btn-primary text-secondary mr-2"
                  >
                    Marks as Picked Up
                  </button>
                  <button
                    onClick={() => {
                      handleDeliveryStatusUpdate(parcel, "parcel_delivered");
                    }}
                    className="btn btn-primary text-secondary mr-2"
                  >
                    Marks as Delivered
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AssignedDeliveries;
