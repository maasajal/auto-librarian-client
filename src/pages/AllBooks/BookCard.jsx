import Rating from "react-rating";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const BookCard = ({ allBooks, allBookList, setAllBookList }) => {
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
        const response = await fetch(
          `http://localhost:5000/books/${id}`,
          {
            method: "DELETE",
          }
        );
        const data = await response.json();
        console.log(data);
        if (data.deletedCount > 0) {
          Swal.fire({
            title: "Deleted!",
            text: "Item deleted successfully!",
            icon: "success",
          });
          const remainingItems = await allBookList.filter(
            (craft) => craft._id !== id
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
            Delete
          </Link>
          <Link to={`/update/${allBooks._id}`} className="btn btn-outline">
            Update
          </Link>
        </div>
      </div>
    </div>
  );
};
export default BookCard;
