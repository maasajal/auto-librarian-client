import Rating from "react-rating";
import { Link } from "react-router-dom";

const CategoriesCard = ({ categoryBook }) => {
  const { _id, image, name, author_name, category, rating } = categoryBook;

  return (
    <div className="card card-side bg-base-100 shadow-xl">
      <figure className="w-1/4">
        <img src={image} alt={name} />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{name}</h2>
        <p>By: {author_name}</p>
        <p>{category}</p>
        <p className="flex items-center gap-3">
          <span>Rating: {rating}</span>
          <Rating initialRating={rating} readonly />
        </p>
        <div className="card-actions">
          <Link to={`/book/${_id}`} className="btn btn-outline">
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};
export default CategoriesCard;
