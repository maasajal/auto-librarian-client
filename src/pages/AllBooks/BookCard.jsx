import Rating from "react-rating";
import { Link } from "react-router-dom";

const BookCard = ({ allBooks }) => {
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
          <Link to={`${allBooks._id}`} className="btn btn-outline">
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
