import { useForm } from "react-hook-form";
import useAuth from "../../../hooks/useAuth";
import { Link, useLocation, useNavigate } from "react-router";
import SocialLogin from "../SocialLogin/SocialLogin";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { signInUser } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogin = (data) => {
    signInUser(data.email, data.password)
      .then((res) => {
        console.log(res.user);
        navigate(location?.state || "/");
      })
      .catch((error) => console.log(error.message));
  };

  return (
    <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
      <div className="card-body">
        <div>
          <h1 className="text-4xl font-bold">Welcome Back</h1>
          <p className="text-2xl ">Login with ZapShift</p>
        </div>
        <form onSubmit={handleSubmit(handleLogin)}>
          <fieldset className="fieldset">
            {/* email */}
            <label className="label">Email</label>
            <input
              type="email"
              {...register("email", { required: true })}
              className="input"
              placeholder="Email"
            />
            {errors.email?.type === "required" && (
              <p className="text-red-500">Email is Required</p>
            )}

            {/* password */}
            <label className="label">Password</label>
            <input
              type="password"
              {...register("password", { required: true, minLength: 6 })}
              className="input"
              placeholder="Password"
            />
            {errors.password?.type === "required" && (
              <p className="text-red-500">Password is Required</p>
            )}

            <div>
              <Link
                to="/forgotPassword"
                className="link link-hover text-gray-500"
              >
                Forgot password?
              </Link>
            </div>
            <button className="btn btn-primary text-secondary mt-4">
              Login
            </button>

            <div>
              <p className="text-gray-500 ">
                Don’t have any account?{"  "}
                <Link
                  state={location?.state}
                  className="text-primary link-hover"
                  to="/register"
                >
                  Register
                </Link>
              </p>
            </div>
          </fieldset>
        </form>
        <SocialLogin />
      </div>
    </div>
  );
};

export default Login;
