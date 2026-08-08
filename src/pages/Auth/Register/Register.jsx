import { useForm } from "react-hook-form";
import useAuth from "../../../hooks/useAuth";
import { Link, useLocation, useNavigate } from "react-router";
import SocialLogin from "../SocialLogin/SocialLogin";
import axios from "axios";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { registerUser, updateUserProfile } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();

  const handleRegistration = (data) => {
    const profileImg = data.photo[0];

    registerUser(data.email, data.password)
      .then(() => {
        // 1. store the image and get photo url
        const formData = new FormData();
        formData.append("image", profileImg);

        // 2. send the photo to store and get img url
        const imageAPI_URL = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_host_key}`;
        axios.post(imageAPI_URL, formData).then((res) => {
          const photoURL = res.data.data.url;

          const userInfo = {
            email: data.email,
            displayName: data.name,
            photoURL: photoURL,
          };
          // create user in the database
          axiosSecure.post("/users", userInfo).then((res) => {
            if (res.data.insertedId) {
              console.log("user created in database successfully");
            }
          });

          //update user profile to firebase
          const userProfile = {
            displayName: data.name,
            photoURL: photoURL,
          };

          updateUserProfile(userProfile)
            .then(() => {
              console.log("User Profile updated");
              navigate(location?.state || "/");
            })
            .catch((error) => {
              console.log(error);
            });
        });
      })
      .catch((error) => console.log(error.message));
  };

  return (
    <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
      <div className="p-3">
        <h1 className="text-4xl font-bold ">Create an Account</h1>
        <h3 className="text-2xl "> Register with ZapShift</h3>
      </div>
      <form className="card-body " onSubmit={handleSubmit(handleRegistration)}>
        <fieldset className="fieldset ">
          {/* photo */}
          <label className="label">Upload Image</label>
          <input
            type="file"
            {...register("photo", { required: true })}
            className="file-input w-full"
            placeholder="Your Photo"
          />
          {/* error for name required */}
          {errors.photo?.type === "required" && (
            <p className="text-red-500">Image is Required</p>
          )}

          {/* name */}
          <label className="label">Name</label>
          <input
            type="text"
            {...register("name", { required: true })}
            className="input w-full"
            placeholder="Enter your name"
          />
          {/* error for name required */}
          {errors.name?.type === "required" && (
            <p className="text-red-500">Name is Required</p>
          )}

          {/* email */}
          <label className="label">Email</label>
          <input
            type="email"
            {...register("email", { required: true })}
            className="input w-full"
            placeholder="Email"
          />
          {/* error for email required */}
          {errors.email?.type === "required" && (
            <p className="text-red-500">Email is Required</p>
          )}

          {/* password */}
          <label className="label">Password</label>
          <input
            type="password"
            {...register("password", {
              required: true,
              minLength: 6,
              pattern:
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>]).{6,}$/,
            })}
            className="input w-full"
            placeholder="Password"
          />

          {/* error for password required and min length */}
          {errors.password?.type === "required" && (
            <p className="text-red-500">Password is Required</p>
          )}
          {errors.password?.type === "minLength" && (
            <p className="text-red-500">Password must be 6 char or longer</p>
          )}
          {errors.password?.type === "pattern" && (
            <p className="text-red-500">
              Password must have at least one uppercase, one lowercase, and one
              special character
            </p>
          )}

          <button className="btn btn-primary mt-4 text-secondary w-full">
            Register
          </button>
          <p className="text-gray-500 ">
            Already have an account?{" "}
            <Link
              state={location?.state}
              className="text-primary link-hover"
              to="/login"
            >
              Login
            </Link>
          </p>
        </fieldset>
      </form>
      <SocialLogin type="register" />
    </div>
  );
};

export default Register;
