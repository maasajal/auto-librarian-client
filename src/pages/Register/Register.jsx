import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import loginImg from "../../assets/images/login.svg";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useContext, useState } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import { updateProfile } from "firebase/auth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { Helmet } from "react-helmet";
const Register = () => {
  const { createUser } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      photo: "",
      email: "",
      password: "",
    },
  });
  const onSubmit = async (data) => {
    // console.log(data);
    const name = data.name;
    const photo = data.photo;
    const email = data.email;
    const password = data.password;
    try {
      const response = await createUser(email, password);
      const user = response.user;
      // console.log(user);
      updateProfile(user, { displayName: name, photoURL: photo });
      const { data } = await axiosSecure.post(
        "/jwt",
        {
          email: user?.email,
        },
        { withCredentials: true }
      );

      Swal.fire({
        title: "Success!",
        text: `Welcome ${user.displayName ? user.displayName : user.email}`,
        icon: "success",
        confirmButtonText: "Cool",
      });
      reset();
      navigate(location?.state ? location.state : "/");
    } catch (err) {
      console.error(err);
      Swal.fire({
        title: "Error!",
        text: `${err.message}`,
        icon: "error",
        confirmButtonText: "Try Again",
      });
    }
  };
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
    <div className="max-w-7xl mx-auto px-3 md:px-8 lg:px-14">
      <Helmet>
        <meta charSet="utf-8" />
        <title>Register for Membership</title>
      </Helmet>
      <div className="max-w-lg mx-auto text-center space-y-4">
        <h1 className="text-3xl font-bold font-PlayFair text-center">
          Register Membership
        </h1>
        <p>
          Unlock a world of literary possibilities by registering with us today,
          and gain access to a vast collection of books, resources, and endless
          opportunities for growth and exploration.
        </p>
      </div>
      <div className="flex flex-col md:flex-row items-center justify-between gap-8 py-20">
        <div className="card w-full shadow-2xl bg-gradient-to-br from-[#055c36] to-[#727d61] mx-auto p-8 text-white">
          <form onSubmit={handleSubmit(onSubmit)} className="py-12 space-y-8">
            <h2 className="text-center text-3xl font-PlayFair">Sign Up Now</h2>
            <div className="flex items-center border-b-2 border-[#055c36]">
              <label htmlFor="name" className="mr-2">
                Name<span className="text-red-500">*</span>
              </label>
              <input
                id="name"
                {...register("name", {
                  required: {
                    value: true,
                    message: "Name is required!",
                  },
                })}
                type="text"
                placeholder="Enter your name"
                className="p-2 flex-grow bg-transparent"
              />
              {errors.name && showErrorAlert(errors.name.message)}
            </div>
            <div className="flex items-center border-b-2 border-[#055c36]">
              <label htmlFor="photo" className="mr-2">
                Photo<span className="text-red-500">*</span>
              </label>
              <input
                id="photo"
                {...register("photo", {
                  required: "Photo is required!",
                })}
                type="text"
                placeholder="Enter your photo url"
                className="p-2 flex-grow bg-transparent"
              />
              {errors.photo && showErrorAlert(errors.photo.message)}
            </div>
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
            <div className="relative flex items-center border-b-2 border-[#055c36]">
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
                value="Sign Up"
                className="btn bg-gradient-to-r from-[#727d61] to-[#055c36] text-white"
              />
            </div>
          </form>
          <div>
            <p>
              Already have an Account?
              <Link to="/login" className="underline p-2">
                Sign In now!
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
export default Register;
