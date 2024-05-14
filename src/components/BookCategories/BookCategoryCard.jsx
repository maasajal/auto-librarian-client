import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProvider";
import { Fade } from "react-awesome-reveal";

const BookCategoryCard = ({ categoryBook }) => {
  const { loading } = useContext(AuthContext);
  const { image, category, button } = categoryBook;
  return (
    <>
      {!loading ? (
        <div className="card shadow-xl border border-[#055c36]">
          <Fade direction="up">
            <figure>
              <img src={image} alt={category} className="rounded-t-xl" />
            </figure>
            <div className="card-body items-center text-center">
              <h2 className="card-title font-bold font-PlayFair">{category}</h2>
              <div className="card-actions">
                <Link
                  to={`/books/${category.toLowerCase()}`}
                  className="btn bg-gradient-to-br from-[#055c36] to-[#727d61] text-white"
                >
                  {button}
                </Link>
              </div>
            </div>
          </Fade>
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
export default BookCategoryCard;
