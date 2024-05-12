import { Link } from "react-router-dom";

const BookCategoryCard = ({ categoryBook }) => {
  const { image, category, button } = categoryBook;
  return (
    <div className="card shadow-xl border border-[#055c36]">
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
    </div>
  );
};
export default BookCategoryCard;
