import Rating from "react-rating";
import { useLoaderData } from "react-router";
import { Link } from "react-router-dom";

const BookDetails = () => {
  const bookDetails = useLoaderData();
  console.log(bookDetails);
  const {
    _id,
    image,
    name,
    authorName,
    category,
    quantity,
    rating,
    description,
    aboutBook,
  } = bookDetails;

  return (
    <div className="max-w-7xl mx-auto px-3 md:px-8 lg:px-14">
      <div className="my-24">
        <div className="max-w-lg mx-auto text-center space-y-4">
          <h1 className="text-3xl font-bold font-PlayFair text-center">
            Categories list of Books
          </h1>
          <p>
            Explore a diverse collection of captivating books spanning various
            genres, authors, and themes, offering an enriching reading
            experience for every literary enthusiast.
          </p>
        </div>
        <div className="card card-side bg-base-100 shadow-xl">
          <figure className="w-1/3">
            <img src={image} alt={name} />
          </figure>
          <div className="card-body">
            <h2 className="card-title">Book Name: {name}</h2>
            <p>Author Name: {authorName}</p>
            <p>Category: {category}</p>
            <p>Available of the book: {quantity} pcs</p>
            <p className="flex items-center gap-3">
              <span>Rating: {rating}</span>
              <Rating initialRating={rating} readonly />
            </p>
            <p>Short Description: {description} </p>
            <p>About Book: {aboutBook} </p>
            <div className="card-actions grid grid-cols-1 md:grid-cols-2">
              <Link to={`/borrow-book/${_id}`} className="btn btn-outline">
                Borrow Book
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default BookDetails;
