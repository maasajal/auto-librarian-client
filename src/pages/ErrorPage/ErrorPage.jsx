import { Helmet } from "react-helmet";
import Navbar from "../../components/Header/Navbar";

const ErrorPage = () => {
  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <title>404 - page not found! </title>
      </Helmet>
      <Navbar />
      <div className="text-center my-10">
        <h1 className="text-8xl text-red-800 font-extrabold">Oops!</h1>
        <h2 className="text-5xl py-12">404 - Page not found!</h2>
        <p className="mb-8">Sorry, we did not find this page...</p>
      </div>
    </div>
  );
};
export default ErrorPage;
