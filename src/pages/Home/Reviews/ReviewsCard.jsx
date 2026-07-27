import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";

import quoteImg from "../../../assets/reviewQuote.png";

const ReviewsCard = ({ item }) => {
  const { userName, user_email, review, user_photoURL } = item;
  return (
    <div className="bg-white p-5 space-y-4 m-5 ">
      <img src={quoteImg} alt="" />
      <p className="text-gray-500 text-sm">{review}</p>
      <hr className="text-gray-300 border-dotted" />
      <div className="flex flex-row items-center gap-5">
        <img src={user_photoURL} alt="" className="w-16 h-16 rounded-full " />
        <div>
          <h4 className="font-bold mt-3">{userName}</h4>

          <p>{user_email}</p>
        </div>
      </div>
    </div>
  );
};

export default ReviewsCard;

//  "id": "5f47ac10b4f1c03e8c123456",
//     "user_email": "john.doe@example.com",
//     "userName": "John Doe",
//     "delivery_email": "delivery1@example.com",
//     "ratings": 4.5,
//     "review": "Smooth delivery and polite staff.",
//     "parcel_id": "5f47ac10b4f1c03e8c654321",
//     "pick_up_email": "pickup1@example.com",
//     "user_photoURL": "https://randomuser.me/api/portraits/men/10.jpg",
//     "date": "2024-05-08T14:30:00.000Z"
