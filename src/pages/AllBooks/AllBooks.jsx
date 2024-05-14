import { useContext, useState } from "react";
import { useLoaderData } from "react-router-dom";
import BookCard from "./BookCard";
import TableViews from "./TableViews";
import { AuthContext } from "../../providers/AuthProvider";

const AllBooks = () => {
  const getAllBooks = useLoaderData();
  const [allBookList, setAllBookList] = useState(getAllBooks.data);
  const [views, setViews] = useState(true);

  const { user } = useContext(AuthContext);
  console.log(user);
  const librarian = user.email === "auto@librarian.com";
  console.log(librarian);

  const handleFilter = () => {
    const showAvailableBook = allBookList.filter((book) => book.quantity > 0);
    setAllBookList(showAvailableBook);
  };
  const handleCardView = () => {
    setViews(true);
  };
  const handleTableView = () => {
    setViews(false);
  };
  return (
    <div className="max-w-7xl mx-auto px-3 md:px-8 lg:px-14 my-20">
      <div className="max-w-lg mx-auto text-center space-y-4">
        <h1 className="text-3xl font-bold font-PlayFair text-center">
          All Books from Auto Librarian{" "}
          <span className="bg-[#055c36] text-white p-2 rounded-xl">
            {allBookList.length}
          </span>
        </h1>
        <p>
          Explore a diverse collection of captivating books spanning various
          genres, authors, and themes, offering an enriching reading experience
          for every literary enthusiast.
        </p>
      </div>
      <div className="flex justify-between">
        <div className="space-y-3">
          <h3 className="text-2xl font-PlayFair">Filter by: </h3>
          <button
            onClick={handleFilter}
            className="btn bg-[#055c36] text-white"
          >
            Show available books
          </button>
        </div>
        <div className="dropdown dropdown-hover">
          <div
            tabIndex={0}
            role="button"
            className="btn m-1 text-2xl font-PlayFair bg-[#055c36] text-white"
          >
            View by:
          </div>
          <ul
            tabIndex={0}
            className="dropdown-content z-[1] menu p-2 rounded-box w-full"
          >
            <li>
              <a onClick={handleCardView}>Card View</a>
            </li>
            <li>
              <a onClick={handleTableView}>Table View</a>
            </li>
          </ul>
        </div>
      </div>
      {views ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-16">
          {allBookList.map((book) => (
            <BookCard
              key={book._id}
              allBooks={book}
              allBookList={allBookList}
              setAllBookList={setAllBookList}
              librarian={librarian}
            />
          ))}
        </div>
      ) : (
        <div className="my-14">
          <TableViews
            allBookList={allBookList}
            setAllBookList={setAllBookList}
            librarian={librarian}
          />
        </div>
      )}
    </div>
  );
};
export default AllBooks;
