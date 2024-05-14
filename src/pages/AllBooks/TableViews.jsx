import Rating from "react-rating";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { MdDeleteOutline } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { Slide } from "react-awesome-reveal";

const TableViews = ({ allBookList, setAllBookList, librarian }) => {
  console.log(allBookList);
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
    <div className="overflow-x-auto">
      <Slide direction="right">
        <table className="table">
          {/* head */}
          <thead className="text-[#055c36] text-lg">
            <tr>
              <th>Serial</th>
              <th>Book Photo, Name & Category</th>
              <th>Quantity</th>
              <th>Book Rating</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {allBookList.map((book, idx) => (
              <tr key={idx}>
                <th>
                  <label>
                    <p>{idx + 1}</p>
                  </label>
                </th>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle w-12 h-12">
                        <img src={book.image} alt={book.name} />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">{book.name}</div>
                      <div className="text-sm opacity-50">{book.category}</div>
                    </div>
                  </div>
                </td>
                <td>{book.quantity}</td>
                <td>
                  <p className="flex items-center gap-3">
                    <span>Rating: {book.rating}</span>
                    <Rating initialRating={book.rating} readonly />
                  </p>
                </td>
                <th className="flex items-center gap-2">
                  {librarian ? (
                    <div className="card-actions grid grid-cols-1 md:grid-cols-2">
                      <Link
                        onClick={() => handleDelete(book._id)}
                        className="btn btn-outline"
                      >
                        <MdDeleteOutline className="text-2xl" />
                      </Link>
                      <Link
                        to={`/update-book/${book._id}`}
                        className="btn btn-outline"
                      >
                        <FaEdit className="text-lg" />
                      </Link>
                    </div>
                  ) : (
                    <div className="card-actions">
                      <Link
                        to={`/book/${book._id}`}
                        className="btn btn-outline text-[#055c36]"
                      >
                        View Details
                      </Link>
                    </div>
                  )}
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </Slide>
    </div>
  );
};
export default TableViews;
