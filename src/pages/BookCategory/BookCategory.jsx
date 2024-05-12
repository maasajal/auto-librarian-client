import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CategoriesCard from "./CategoriesCard";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const BookCategory = () => {
  const category = useParams();
  const axiosSecure = useAxiosSecure();
  const [bookCategory, setBookCategory] = useState([]);
  useEffect(() => {
    const fetchCategoryBooks = async () => {
      const response = await axiosSecure.get("/books");
      setBookCategory(response.data);
    };
    fetchCategoryBooks();
  }, [category, bookCategory]);

  return (
    <div className="max-w-7xl mx-auto px-3 md:px-8 lg:px-14">
      <div className="my-20">
        <div className="max-w-lg mx-auto text-center space-y-4">
          <h1 className="text-3xl font-bold font-PlayFair text-center">
            Category book items
          </h1>
          <p>
            Explore a diverse collection of captivating books spanning various
            genres, authors, and themes, offering an enriching reading
            experience for every literary enthusiast.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 my-24">
          {bookCategory
            .filter(
              (book) =>
                book.category.toLowerCase() === category.category.toLowerCase()
            )
            .map((cat) => (
              <CategoriesCard keys={cat._id} categoryBook={cat} />
            ))}
        </div>
      </div>
    </div>
  );
};
export default BookCategory;
