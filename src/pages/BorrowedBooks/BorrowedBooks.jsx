import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet";

const BorrowedBooks = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const [borrowList, setBorrowList] = useState([]);

  const getBorrowedBooks = async () => {
    const { data } = await axiosSecure(`/borrowed-books/${user.email}`, {
      withCredentials: true,
    });
    // console.log(data);
    setBorrowList(data);
  };
  useEffect(() => {
    getBorrowedBooks();
  }, [user]);
  //   console.log(myBorrowList);

  const handleReturn = async (id) => {
    console.log("Return", id);
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, return it!",
    });

    if (result.isConfirmed) {
      try {
        const { data } = await axiosSecure.delete(`/borrowed-books/${id}`);
        await axiosSecure.patch(`/return-book/${id}`);
        if (data.deletedCount > 0) {
          Swal.fire({
            title: "Return!",
            text: "Book return successfully!",
            icon: "success",
          });
          getBorrowedBooks();
        }
      } catch (error) {
        console.error("Error returning item:", error);
        Swal.fire({
          title: "Error!",
          text: `An error occurred: ${error.message}`,
          icon: "error",
          confirmButtonText: "Try Again",
        });
      }
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-3 md:px-8 lg:px-14">
      <Helmet>
        <meta charSet="utf-8" />
        <title>Borrowed Books - {user.displayName} </title>
      </Helmet>
      <div className="my-20">
        <div className="max-w-lg mx-auto text-center space-y-4">
          <h1 className="text-3xl font-bold font-PlayFair text-center">
            Borrowed book {borrowList.length > 1 ? "items" : "item"}:{" "}
            <span className="bg-[#055c36] text-white p-2 rounded-xl">
              {borrowList.length}
            </span>
          </h1>
          <p>
            Explore the collection of borrowed books and manage your reading
            list effortlessly on the borrowed books page.
          </p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 my-24">
          {borrowList.map((book) => (
            <div
              className="card card-side shadow-xl border border-[#055c36]"
              key={book._id}
            >
              <figure className="w-1/4">
                <img src={book?.image} alt={book?.name} />
              </figure>
              <div className="card-body space-y-3">
                <h2 className="card-title">{book?.name}</h2>
                <p>Category: {book?.category}</p>
                <p>
                  Borrowed Date:{" "}
                  <span className="bg-gradient-to-r from-[#055c36] to-[#727d61] text-white p-2 rounded-xl">
                    {new Date(book.borrow_date).toDateString()}
                  </span>{" "}
                </p>
                <p>
                  Return Date:{" "}
                  <span className="bg-gradient-to-r from-[#055c36] to-[#727d61] text-white p-2 rounded-xl">
                    {new Date(book.return_date).toDateString()}
                  </span>{" "}
                </p>
                <div className="card-actions">
                  <button
                    onClick={() => handleReturn(book.id)}
                    className="btn bg-gradient-to-r from-[#055c36] to-[#727d61] text-white w-full"
                  >
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
