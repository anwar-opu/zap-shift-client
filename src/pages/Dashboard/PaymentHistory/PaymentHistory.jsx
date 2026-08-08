import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const PaymentHistory = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { data: payments = [] } = useQuery({
    queryKey: ["payments", user.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/payments?email=${user.email}`);
      return res.data;
    },
  });

  console.log(payments);

  return (
    <div>
      <h3 className="text-4xl font-bold text-secondary">
        Payment History {payments.length}
      </h3>
      <div className="overflow-x-auto">
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr>
              <th>Parcel Info</th>
              <th>Paid At</th>
              <th>Recipient Info</th>
              <th>Tracking Number</th>
              <th>Payment Info</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {payments.map((payment) => (
              <tr key={payment._id}>
                <td>{payment.parcelName}</td>
                <td>{payment.paidAt}</td>
                <td>{payment.trackingId}</td>
                <td>${payment.amount}</td>
                <td>
                  <button className="btn btn-primary text-secondary">
                    View
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

export default PaymentHistory;
