import { useQuery } from "@tanstack/react-query";
import Loading from "../../../components/Loading/Loading";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { FaEye, FaUserCheck } from "react-icons/fa";
import { IoPersonRemove } from "react-icons/io5";
import { MdDelete } from "react-icons/md";
import Swal from "sweetalert2";
import { useRef, useState } from "react";

const ApproveRiders = () => {
  const axiosSecure = useAxiosSecure();
  const modalRef = useRef(null);
  const [selectedRider, setSelectedRider] = useState(null);

  const {
    refetch,
    isLoading,
    data: riders = [],
  } = useQuery({
    queryKey: ["riders", "pending"],
    queryFn: async () => {
      const res = await axiosSecure.get("/riders");
      return res.data;
    },
  });

  if (isLoading) {
    return <Loading></Loading>;
  }

  const updateRiderStatus = (rider, status) => {
    const updateInfo = { status: status, email: rider.riderEmail };
    axiosSecure.patch(`/riders/${rider._id}`, updateInfo).then((res) => {
      if (res.data.modifiedCount) {
        refetch();
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: `Rider status to set to ${status}`,
          showConfirmButton: false,
          timer: 2500,
        });
      }
    });
  };

  const handleApproval = (rider) => {
    updateRiderStatus(rider, "approved");
  };

  const handleRejection = (rider) => {
    updateRiderStatus(rider, "rejected");
  };

  const handleView = (rider) => {
    setSelectedRider(rider);
    modalRef.current.showModal();
  };

  return (
    <div className="bg-white my-5 p-5 rounded-2xl">
      <h3 className="text-4xl text-secondary">
        Riders Pending Approval:{riders.length}
      </h3>

      <div className="overflow-x-auto">
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Email</th>
              <th>District</th>
              <th>Application Status</th>
              <th>Work Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {riders.map((rider, index) => (
              <tr key={rider._id}>
                <th>{index + 1}</th>
                <td>{rider.riderName}</td>
                <td>{rider.riderEmail}</td>
                <td>{rider.riderDistrict}</td>
                <td
                  className={`${rider.status == "pending" ? "text-yellow-500" : rider.status == "approved" ? "text-green-500" : "text-red-500"}`}
                >
                  {rider.status}
                </td>
                <td>{rider.workStatus}</td>
                <td className="text-center">
                  <button
                    onClick={() => handleView(rider)}
                    className="btn bg-green-300 mr-2"
                  >
                    <FaEye />
                  </button>
                  <button
                    onClick={() => handleApproval(rider)}
                    className="btn bg-green-500 mr-2"
                  >
                    <FaUserCheck />
                  </button>

                  <button
                    onClick={() => handleRejection(rider)}
                    className="btn bg-yellow-500 mr-2"
                  >
                    <IoPersonRemove />
                  </button>

                  <button
                    // onClick={() => handleDeleted(rider)}
                    className="btn bg-red-500"
                  >
                    <MdDelete />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Open the modal using document.getElementById('ID').showModal() method */}

      <dialog
        ref={modalRef}
        id="my_modal_5"
        className="modal modal-bottom sm:modal-middle"
      >
        <div className="modal-box">
          <h3 className="font-bold text-lg">Rider Details</h3>
          {selectedRider && (
            <div>
              <p className="py-4">
                <span className="font-semibold">Name: </span>
                {selectedRider.riderName}
              </p>
              <p className="py-4">
                <span className="font-semibold">Email: </span>
                {selectedRider.riderEmail}
              </p>
              <p className="py-4">
                <span className="font-semibold">Address: </span>
                {selectedRider.riderAddress}
              </p>
              <p className="py-4">
                <span className="font-semibold">Phone Number: </span>
                {selectedRider.riderPhone}
              </p>
              <p className="py-4">
                <span className="font-semibold">Region: </span>
                {selectedRider.riderRegion}
              </p>
              <p className="py-4">
                <span className="font-semibold">District: </span>
                {selectedRider.riderDistrict}
              </p>
              <p>
                <span className="font-semibold">Status:</span>{" "}
                <span
                  className={`${selectedRider.status == "pending" ? "text-yellow-500" : selectedRider.status == "approved" ? "text-green-500" : "text-red-500"}`}
                >
                  {selectedRider.status}
                </span>
              </p>
              <p>
                <span className="font-semibold">Bike Model & Year:</span>{" "}
                {selectedRider.riderBikeModelYear}
              </p>
              {/* Add any other rider fields you have, e.g.: */}

              {selectedRider.riderNIDNo && (
                <p>
                  <span className="font-semibold">NID:</span>{" "}
                  {selectedRider.riderNIDNo}
                </p>
              )}
            </div>
          )}

          <div className="modal-action">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default ApproveRiders;

// _id
// 6a76ca1951d005045371b518
// riderName
// "Md. Anwar Hossain"
// riderEmail
// "md.anwar.hossain.cse@gmail.com"
// riderAddress
// "459/3 South Kafrul"
// riderPhone
// "01951667696"
// riderRegion
// "Dhaka"
// riderDistrict
// "Faridpur"
// riderDrivingLicense
// "20102003"
// riderNIDNo
// "1234567890"
// riderBikeModelYear
// "Toyota 2025"
// riderBikeRegNumber
// "12345"
// riderYourSelf
// "i am a student "
// status
// "pending"
// createdAt
// 2026-08-08T06:18:01.661+00:00
