import { useContext, useState } from "react";
import { useLoaderData } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProvider";

const BorrowedBooks = () => {
  const borrowedBooks = useLoaderData();
  const { user } = useContext(AuthContext);
  const myBorrowList = borrowedBooks.data.filter(
    (book) => book.email === user.email
  );
  const [borrowList, setBorrowList] = useState(myBorrowList);

  console.log(myBorrowList);
  return (
    <div className="max-w-7xl mx-auto px-3 md:px-8 lg:px-14">
      <div className="my-20">
        <div className="max-w-lg mx-auto text-center space-y-4">
          <h1 className="text-3xl font-bold font-PlayFair text-center">
            Borrow book items
          </h1>
          <p>
            Explore the collection of borrowed books and manage your reading
            list effortlessly on the borrowed books page.
          </p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 my-24">
          {borrowList.map((book) => (
            <div className="card card-side bg-base-100 shadow-xl">
              <figure className="w-1/4">
                <img src={book?.image} alt={book?.name} />
              </figure>
              <div className="card-body space-y-3">
                <h2 className="card-title">{book?.name}</h2>
                <p>Category: {book?.category}</p>
                <p>
                  Borrowed Date:{" "}
                  <span className="bg-gradient-to-r from-[#055c36] to-[#727d61] text-white p-2 rounded-xl">
                    {book?.borrow_date}
                  </span>{" "}
                </p>
                <p>
                  Return Date:{" "}
                  <span className="bg-gradient-to-r from-[#055c36] to-[#727d61] text-white p-2 rounded-xl">
                    {book?.return_date}
                  </span>{" "}
                </p>
                <div className="card-actions">
                  <button className="btn bg-gradient-to-r from-[#055c36] to-[#727d61] text-white w-full">
                    Return
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default BorrowedBooks;
