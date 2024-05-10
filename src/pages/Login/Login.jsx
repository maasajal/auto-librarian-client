import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import loginImg from "../../assets/images/login.svg";
import { FaEye, FaEyeSlash, FaGithub, FaGoogle } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useState } from "react";
const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const onSubmit = (data) => console.log(data);
  const [showPassword, setShowPassword] = useState(false);
  // Display SweetAlert error for form validation
  const showErrorAlert = (errorMessage) => {
    Swal.fire({
      title: "Error!",
      text: errorMessage,
      icon: "error",
      confirmButtonText: "Try Again",
    });
  };

  return (
    <div>
      <div className="max-w-lg mx-auto text-center space-y-4">
        <h1 className="text-3xl font-bold font-PlayFair text-center">
          Login Member
        </h1>
        <p>
          Enter the gateway to knowledge and adventure. Log in to access our
          vast library of resources and embark on a journey of learning and
          discovery.
        </p>
      </div>
      <div className="flex flex-col md:flex-row items-center justify-between gap-8 py-20">
        <div className="card w-full shadow-2xl bg-gradient-to-br from-[#055c36] to-[#727d61] mx-auto px-8 text-white py-12">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            <h2 className="text-center text-3xl font-PlayFair">Sign In Now</h2>
            <div className="flex items-center border-b-2 border-[#055c36]">
              <label htmlFor="email" className="mr-2">
                Email<span className="text-red-500">*</span>
              </label>
              <input
                id="email"
                {...register("email", {
                  required: "Email is required!",
                })}
                type="email"
                placeholder="Enter your email"
                className="p-2  flex-grow bg-transparent"
              />
              {errors.email && showErrorAlert(errors.email.message)}
            </div>
            <div className="flex relative items-center border-b-2 border-[#055c36]">
              <label htmlFor="password" className="mr-2">
                Password<span className="text-red-500">*</span>
              </label>
              <input
                id="password"
                {...register("password", {
                  required: true,
                  minLength: {
                    value: 6,
                    message: "Password should not be less than 6 characters!",
                  },
                  pattern: {
                    value: /^(?=.*[A-Z])(?=.*[!@#$%^&*])/,
                    message:
                      "Password must contain at least one capital letter and one special character (! @ # $ % ^ & *)",
                  },
                })}
                type={showPassword ? "text" : "password"}
                placeholder="Enter a password"
                className="p-2 flex-grow bg-transparent"
              />
              <span
                className="absolute right-2 bottom-3"
                onClick={() => setShowPassword(!showPassword)}
              >
                {!showPassword ? <FaEye /> : <FaEyeSlash />}
              </span>
              {errors.password && showErrorAlert(errors.password.message)}
            </div>
            <div className="form-control">
              <input
                type="submit"
                value="Sign In"
                className="btn bg-gradient-to-r from-[#727d61] to-[#055c36] text-white"
              />
            </div>
          </form>
          <div className="divider">OR Login With</div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <button className="btn bg-gradient-to-r from-[#727d61] to-[#055c36] text-white">
              <FaGoogle /> Google
            </button>
            <button className="btn bg-gradient-to-r from-[#727d61] to-[#055c36] text-white">
              <FaGithub /> GitHub
            </button>
          </div>
          <div className="mt-10">
            <p>
              Do you have an Account?
              <Link to="/register" className="underline p-2">
                Sign up now!
              </Link>
            </p>
          </div>
        </div>
        <img
          src={loginImg}
          alt="Login or Register image"
          className="hidden md:flex w-full"
        />
      </div>
    </div>
  );
};
export default Login;
