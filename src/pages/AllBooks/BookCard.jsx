import Rating from "react-rating";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { MdDeleteOutline } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const BookCard = ({ allBooks, allBookList, setAllBookList }) => {
    const axiosSecure = useAxiosSecure();
  const handleDelete = async (id) => {
    console.log("Delete", id);
    const url = `/books/${id}`;
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
        const response = await axiosSecure.delete(url);
        if (response.data.deletedCount > 0) {
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
    <div className="card card-side bg-base-100 shadow-xl">
      <figure className="w-1/4">
        <img src={allBooks.image} alt={allBooks.name} />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{allBooks.name}</h2>
        <p>By: {allBooks.authorName}</p>
        <p>{allBooks.category}</p>
        <p className="flex items-center gap-3">
          <span>Rating: {allBooks.rating}</span>
          <Rating initialRating={allBooks.rating} readonly />
        </p>
        <div className="card-actions grid grid-cols-1 md:grid-cols-2">
          <Link
            onClick={() => handleDelete(allBooks._id)}
            className="btn btn-outline"
          >
            <MdDeleteOutline className="text-2xl" /> Delete
          </Link>
          <Link to={`/update-book/${allBooks._id}`} className="btn btn-outline">
            <FaEdit className="text-lg" /> Update
          </Link>
        </div>
      </div>
    </div>
  );
};
export default BookCard;
