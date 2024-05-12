import { useLoaderData } from "react-router";
import Banner from "../../components/Banner/Banner";
import { useState } from "react";
import BookCategoryCard from "../../components/BookCategories/BookCategoryCard";

const Home = () => {
  const data = useLoaderData();
  const books = data.data;
  const [bookCategory, setBookCategory] = useState(books);
  // console.log(books);
  return (
    <div>
      <Banner sliderData={books} />
      <div className="max-w-7xl mx-auto px-3 md:px-8 lg:px-14">
        <div className="my-24">
          <div className="max-w-lg mx-auto text-center space-y-4">
            <h1 className="text-3xl font-bold font-PlayFair text-center">
              Categories list of Books
            </h1>
            <p>
              Explore a diverse collection of captivating books spanning various
              genres, authors, and themes, offering an enriching reading
              experience for every literary enthusiast.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 my-10">
            {bookCategory.map((book) => (
              <BookCategoryCard key={book._id} categoryBook={book} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Home;
