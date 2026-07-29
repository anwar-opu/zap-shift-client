import { useForm } from "react-hook-form";
import useAuth from "../../../hooks/useAuth";
import { useState } from "react";
import Loading from "../../../components/Loading/Loading";

const ForgotPassword = () => {
  const [resetLoading, setResetLoading] = useState(false);
  const { resetPassword } = useAuth();
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const handleForgotPassword = (data) => {
    setResetLoading(true);
    setMessage("");
    setError("");

    resetPassword(data.email)
      .then(() => {
        setMessage("Password reset email sent! Check your inbox.");
        reset();
      })
      .catch((err) => {
        setError(err.message);
      })
      .finally(() => {
        setResetLoading(false);
      });
  };
  return (
    <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
      <div className="card-body">
        <h3 className="text-3xl font-bold">Reset your password</h3>
        <form
          onSubmit={handleSubmit(handleForgotPassword)}
          className="fieldset"
        >
          <label className="label">Email</label>
          <input
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Enter a valid email address",
              },
            })}
            type="email"
            className="input"
            placeholder="Email"
          />
          {/* email error handle */}
          {errors.email && (
            <p className="text-red-500">{errors.email.message}</p>
          )}

          <button
            disabled={resetLoading}
            className="btn btn-primary text-secondary w-fit"
          >
            {resetLoading ? (
              <Loading fullScreen={false} size="sm" />
            ) : (
              "Send reset link"
            )}
          </button>
        </form>
        {message && <p className="text-green-500 mt-3">{message}</p>}
        {error && <p className="text-red-600 mt-3">{error}</p>}
      </div>
    </div>
  );
};

export default ForgotPassword;
