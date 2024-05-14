import Rating from "react-rating";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { MdDeleteOutline } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const BookCard = ({ allBooks, allBookList, setAllBookList, librarian }) => {
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
    <div className="card card-side shadow-xl border border-[#055c36]">
      <figure className="w-1/4">
        <img src={allBooks.image} alt={allBooks.name} />
      </figure>
      <div className="card-body">
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
      </div>
    </div>
  );
};
export default BookCard;
