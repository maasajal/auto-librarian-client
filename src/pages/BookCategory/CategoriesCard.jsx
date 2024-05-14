import { useContext } from "react";
import Rating from "react-rating";
import { Link } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProvider";
import { Slide } from "react-awesome-reveal";

const CategoriesCard = ({ categoryBook }) => {
  const { loading } = useContext(AuthContext);

  const { _id, image, name, author_name, category, rating } = categoryBook;

  return (
    <>
      {!loading ? (
        <div className="card card-side border border-[#055c36] shadow-xl">
          <figure className="w-1/3">
            <Slide direction="up">
              <img src={image} alt={name} />
            </Slide>
          </figure>
          <div className="card-body">
            <Slide direction="up">
              <h2 className="card-title">{name}</h2>
              <p>By: {author_name}</p>
              <p>{category}</p>
              <p className="flex items-center gap-3">
                <span>Rating: {rating}</span>
                <Rating initialRating={rating} readonly />
              </p>
              <div className="card-actions">
                <Link
                  to={`/book/${_id}`}
                  className="btn btn-outline text-[#055c36]"
                >
                  View Details
                </Link>
              </div>
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
export default CategoriesCard;
