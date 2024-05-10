import { FaGoogle, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";
import logo from "../../assets/logo.png";
import { Link } from "react-router-dom";
const Footer = () => {
  return (
    <div>
      <footer className="flex flex-wrap flex-col text-center md:flex-row justify-between gap-8 md:text-start py-10 px-8 md:px-14 bg-[#727d61] text-white mt-10">
        <aside>
          <img src={logo} alt="Car doctor logo" className="w-40 rounded-3xl" />
          <p className="py-5 leading-6 max-w-sm">
            Explore boundless knowledge within the pages of our library, where
            every story unfolds a new chapter of learning and discovery.
          </p>
        </aside>
        <nav className="flex flex-col gap-5">
          <h6 className="text-2xl font-semibold mb-5">Home</h6>
          <Link to="/" className="link link-hover">
            Home
          </Link>
          <Link to="/category-books" className="link link-hover">
            Categories Books
          </Link>
          <Link to="/about-us" className="link link-hover">
            About Us
          </Link>
          <Link to="/contact" className="link link-hover">
            Contact
          </Link>
        </nav>
        <nav className="flex flex-col gap-5">
          <h6 className="text-2xl font-semibold mb-5">e-Library</h6>
          <Link to="/" className="link link-hover">
            Borrow Books
          </Link>
          <Link to="/return-policy" className="link link-hover">
            Return Policy
          </Link>
          <Link to="/add-book" className="link link-hover">
            Add Book
          </Link>
          <Link to="/all-books" className="link link-hover">
            All Books
          </Link>
        </nav>
        <nav className="flex flex-col gap-5">
          <h6 className="text-2xl font-semibold mb-5">Social Links</h6>
          <div className="grid grid-flow-col gap-2">
            <a className="btn rounded-full bg-slate-600 text-white border-none">
              <FaGoogle />
            </a>
            <a className="btn rounded-full bg-slate-600 text-white border-none">
              <FaTwitter />
            </a>
            <a className="btn rounded-full bg-slate-600 text-white border-none">
              <FaInstagram />
            </a>
            <a className="btn rounded-full bg-slate-600 text-white border-none">
              <FaLinkedin />
            </a>
          </div>
        </nav>
      </footer>
      <footer className="footer footer-center p-4 bg-[#727d61] text-white border-t border-[#055c36]">
        <aside>
          <p>
            Copyright © 2024 - All right reserved by{" "}
            <a href="/">Auto Librarian</a>
          </p>
        </aside>
      </footer>
    </div>
  );
};
export default Footer;
