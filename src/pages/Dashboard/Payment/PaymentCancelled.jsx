import { Link } from "react-router";

const PaymentCancelled = () => {
  return (
    <div>
      <h3 className="text-4xl"> Payment Cancelled, Please try again</h3>
      <Link to="/dashboard/my-parcels">
        <button className="btn btn-primary text-secondary">Try Again</button>
      </Link>
    </div>
  );
};

export default PaymentCancelled;
