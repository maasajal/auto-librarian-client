import { Link, NavLink } from "react-router-dom";
import logo from "../../assets/logo.png";
import "./Navbar.css";
import { useContext } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import Swal from "sweetalert2";
const Navbar = () => {
  const { user, logOut, loading } = useContext(AuthContext);
  const handleSignOut = () => {
    logOut()
      .then(() => {
        Swal.fire({
          title: "Success!",
          text: "You have sign out successfully!",
          icon: "success",
          confirmButtonText: "Cool",
        });
        console.log("LouOut");
      })
      .catch((error) => console.error(error));
  };

  const navLinks = (
    <>
      <li key="home" className="hover:text-white">
        <NavLink to="/">Home</NavLink>
      </li>
      <li key="add-book" className="hover:text-white">
        <NavLink to="/add-book">Add book</NavLink>
      </li>
      <li key="all-books" className="hover:text-white">
        <NavLink to="/all-books">All Books</NavLink>
      </li>
      <li key="borrowed-books" className="hover:text-white">
        <NavLink to="/borrowed-books">Borrowed Books</NavLink>
      </li>
    </>
  );
  return (
    <div className="navbar py-5 md:py-5 md:px-14">
      <div className="navbar-start">
        <div className="dropdown text-[#055c36]">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
          >
            {navLinks}
          </ul>
        </div>
        <a className="btn btn-ghost h-full w-40">
          <img src={logo} alt="Car doctor logo" />
        </a>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 text-[#055c36]">{navLinks}</ul>
      </div>
      <div className="navbar-end user flex gap-7">
        {user && (
          <div
            className="dropdown dropdown-end mr-1 tooltip tooltip-bottom tooltip-primary z-10"
            data-tip={
              !user.displayName ? "User Name not found!" : user.displayName
            }
          >
            {!loading ? (
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="w-10 rounded-full">
                  <img
                    src={!user.photoURL ? "userPhoto" : user.photoURL}
                    alt="Logged user photo"
                  />
                </div>
              </div>
            ) : (
              <span className="loading loading-infinity loading-lg"></span>
            )}
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li>
                <NavLink to="/user-profile" className="py-3 hover:text-white">
                  User Profile
                </NavLink>
              </li>
              <li>
                <NavLink to="/update-profile" className="py-3 hover:text-white">
                  Update Profile
                </NavLink>
              </li>
            </ul>
          </div>
        )}
        {user ? (
          <Link
            to="/"
            onClick={handleSignOut}
            className="btn btn-outline text-[#055c36] px-5"
          >
            Sign Out
          </Link>
        ) : (
          <>
            <Link to="/login" className="btn btn-outline text-[#055c36] px-5">
              Login
            </Link>
          </>
        )}
      </div>
    </div>
  );
};
export default Navbar;
