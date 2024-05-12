import { useLoaderData } from "react-router-dom";
import BookCard from "./BookCard";
import { useState } from "react";

const AllBooks = () => {
  const getAllBooks = useLoaderData();
  const [allBookList, setAllBookList] = useState(getAllBooks.data);
  return (
    <div className="max-w-7xl mx-auto px-3 md:px-8 lg:px-14">
      <div className="max-w-lg mx-auto text-center space-y-4">
        <h1 className="text-3xl font-bold font-PlayFair text-center">
          All Books from Auto Librarian
        </h1>
        <p>
          Explore a diverse collection of captivating books spanning various
          genres, authors, and themes, offering an enriching reading experience
          for every literary enthusiast.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-16">
        {allBookList.map((book) => (
          <BookCard
            key={book._id}
            allBooks={book}
            allBookList={allBookList}
            setAllBookList={setAllBookList}
          />
        ))}
      </div>
    </div>
  );
};
export default AllBooks;
