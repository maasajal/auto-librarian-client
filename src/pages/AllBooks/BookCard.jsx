import Rating from "react-rating";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { MdDeleteOutline } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { Slide } from "react-awesome-reveal";
import { useContext } from "react";
import { AuthContext } from "../../providers/AuthProvider";

const BookCard = ({ allBooks, allBookList, setAllBookList, librarian }) => {
  const { loading } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const handleDelete = async (id) => {
    console.log("Delete", id);
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        const { data } = await axiosSecure.delete(`/books/${id}`);
        if (data.deletedCount > 0) {
          Swal.fire({
            title: "Deleted!",
            text: "Item deleted successfully!",
            icon: "success",
          });
          const remainingItems = await allBookList.filter(
            (book) => book._id !== id
          );
          setAllBookList(remainingItems);
        }
      } catch (error) {
        console.error("Error deleting item:", error);
      }
    }
  };

  return (
    <>
      {!loading ? (
        <div className="card card-side shadow-xl border border-[#055c36] items-center">
          <figure className="w-1/3">
            <Slide direction="up">
              <img src={allBooks.image} alt={allBooks.name} />
            </Slide>
          </figure>
          <div className="card-body">
            <Slide direction="up">
              <h2 className="card-title">{allBooks.name}</h2>
              <p>By: {allBooks.author_name}</p>
              <p>{allBooks.category}</p>
              <p className="flex items-center gap-3">
                <span>Rating: {allBooks.rating}</span>
                <Rating initialRating={allBooks.rating} readonly />
              </p>
              {librarian ? (
                <div className="card-actions grid grid-cols-1 md:grid-cols-2">
                  <Link
                    onClick={() => handleDelete(allBooks._id)}
                    className="btn btn-outline text-[#055c36]"
                  >
                    <MdDeleteOutline className="text-2xl" /> Delete
                  </Link>
                  <Link
                    to={`/update-book/${allBooks._id}`}
                    className="btn btn-outline text-[#055c36]"
                  >
                    <FaEdit className="text-lg" /> Update
                  </Link>
                </div>
              ) : (
                <div className="card-actions">
                  <Link
                    to={`/book/${allBooks._id}`}
                    className="btn btn-outline text-[#055c36]"
                  >
                    View Details
                  </Link>
                </div>
              )}
            </Slide>
          </div>
        </div>
      ) : (
        <div>
          <span className="loading loading-ring loading-xs"></span>
          <span className="loading loading-ring loading-sm"></span>
          <span className="loading loading-ring loading-md"></span>
          <span className="loading loading-ring loading-lg"></span>
        </div>
      )}
    </>
  );
};
export default BookCard;
