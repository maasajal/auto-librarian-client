import { useLoaderData } from "react-router";
import Banner from "../../components/Banner/Banner";
import { useEffect, useState } from "react";
import BookCategoryCard from "../../components/BookCategories/BookCategoryCard";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { Helmet } from "react-helmet";
import { Bounce, Rotate, Slide, Zoom } from "react-awesome-reveal";
import { FaBookAtlas } from "react-icons/fa6";
import { FaFileAudio } from "react-icons/fa";
import { PiVideoDuotone } from "react-icons/pi";
import { GiMusicalScore, GiNewspaper } from "react-icons/gi";

const Home = () => {
  const axiosSecure = useAxiosSecure();
  const [bookCategory, setBookCategory] = useState([]);

  const getAllBooks = async () => {
    const { data } = await axiosSecure.get("/book-categories");
    setBookCategory(data);
  };

  useEffect(() => {
    getAllBooks();
  }, []);

  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Home | Auto Librarian</title>
      </Helmet>
      <Zoom>
        <Banner sliderData={bookCategory} />
      </Zoom>
      <div className="max-w-7xl mx-auto px-3 md:px-8 lg:px-14">
        <div className="my-24">
          <Slide direction="up">
            <div className="max-w-lg mx-auto text-center space-y-4">
              <h1 className="text-3xl font-bold font-PlayFair text-center">
                Categories list of Books
              </h1>
              <p>
                Explore a diverse collection of captivating books spanning
                various genres, authors, and themes, offering an enriching
                reading experience for every literary enthusiast.
              </p>
            </div>
          </Slide>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 my-10">
            {bookCategory.map((book) => (
              <BookCategoryCard key={book._id} categoryBook={book} />
            ))}
          </div>
        </div>
        <Zoom>
          <div className="my-24 bg-[#055c36] py-20 text-white space-y-5 rounded-xl">
            <h2 className="text-3xl text-center font-PlayFair">
              Digital Resources in Librarian
            </h2>
            <div className="flex flex-wrap items-center justify-center gap-8 px-2 py-5">
              <Rotate>
                <div className="card items-center justify-center px-5">
                  <div className="p-10 bg-[#144f35] rounded-full">
                    <FaBookAtlas className="text-5xl" />
                  </div>
                  <div className="card-body items-center">
                    <h2 className="card-title">eBooks</h2>
                  </div>
                </div>
              </Rotate>
              <Rotate>
                <div className="card items-center justify-center px-5">
                  <div className="p-10 bg-[#144f35] rounded-full">
                    <FaFileAudio className="text-5xl" />
                  </div>
                  <div className="card-body items-center">
                    <h2 className="card-title">AudioBooks</h2>
                  </div>
                </div>
              </Rotate>
              <Rotate>
                <div className="card items-center justify-center px-5">
                  <div className="p-10 bg-[#144f35] rounded-full">
                    <PiVideoDuotone className="text-5xl" />
                  </div>
                  <div className="card-body items-center">
                    <h2 className="card-title">Videos</h2>
                  </div>
                </div>
              </Rotate>
              <Rotate>
                <div className="card items-center justify-center px-5">
                  <div className="p-10 bg-[#144f35] rounded-full">
                    <GiNewspaper className="text-5xl" />
                  </div>
                  <div className="card-body items-center">
                    <h2 className="card-title">Magazines</h2>
                  </div>
                </div>
              </Rotate>
              <Rotate>
                <div className="card items-center justify-center px-5">
                  <div className="p-10 bg-[#144f35] rounded-full">
                    <GiMusicalScore className="text-5xl" />
                  </div>
                  <div className="card-body items-center">
                    <h2 className="card-title">Music</h2>
                  </div>
                </div>
              </Rotate>
            </div>
          </div>
        </Zoom>
        <Zoom>
          <div
            className="hero my-20 rounded-xl"
            style={{
              backgroundImage: "url(https://i.ibb.co/gD88G4m/library.jpg)",
            }}
          >
            <div className="hero-overlay bg-opacity-60 rounded-xl"></div>
            <div className="hero-content text-center text-neutral-content py-28 md:py-36 lg:py-48 rounded-xl">
              <div className="max-w-md space-y-8">
                <Zoom>
                  <h1 className="mb-5 text-5xl font-bold border-b-2 pb-5">
                    Places To Study
                  </h1>
                  <p className="mb-5">
                    There are group study rooms, individual study carrels,
                    computers labs, and other spaces to study in the Libraries.
                  </p>
                </Zoom>
                <Bounce>
                  <button className="btn border-none text-white bg-gradient-to-br from-[#055c36] to-[#727d61]">
                    Reserve a Group Room
                  </button>
                </Bounce>
              </div>
            </div>
          </div>
        </Zoom>
      </div>
    </div>
  );
};
export default Home;
