import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import Rating from "react-rating";
import { useLoaderData, useNavigate } from "react-router";
import Swal from "sweetalert2";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import { Helmet } from "react-helmet";
import { Slide } from "react-awesome-reveal";

const BookDetails = () => {
  const bookDetails = useLoaderData();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const [startDate, setStartDate] = useState(new Date());
  const [borrowQuantity, setBorrowQuantity] = useState([]);
  const bbId = borrowQuantity.map((bookId) => bookId.id);
  console.log(bbId);

  const getBorrowedBooks = async () => {
    const { data } = await axiosSecure.get(`/borrowed-books/${user.email}`, {
      withCredentials: true,
    });
    setBorrowQuantity(data);
  };
  useEffect(() => {
    getBorrowedBooks();
  }, [user]);

  const {
    _id,
    image,
    name,
    author_name,
    category,
    quantity,
    rating,
    description,
    contents,
  } = bookDetails;

  const schema = yup
    .object({
      borrow_date: yup.date().required(),
      return_date: yup.date().required(),
      id: yup.string().required(),
      name: yup.string().required(),
      email: yup.string().required(),
    })
    .required();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      id: `${_id}`,
      return_date: null,
      image: `${image}`,
      name: `${name}`,
      category: `${category}`,
      borrow_date: `${startDate}`,
      display_name: `${user.displayName}`,
      email: `${user.email}`,
    },
  });

  const onSubmit = async (newData) => {
    // console.log(data);
    try {
      if (bbId) {
        const { data } = await axiosSecure.post("/borrow-books", newData);
        if (data.insertedId) {
          Swal.fire({
            title: "Success!",
            text: "Borrow book successfully!",
            icon: "success",
            confirmButtonText: "Cool",
          });
          reset();
          navigate(`/borrowed-books`);
        }
      } else {
        showErrorAlert("Borrowing not allow for a book twice");
        // return;
      }
    } catch (err) {
      //   console.log(err);
      Swal.fire({
        title: "Error!",
        text: `An error occurred while borrowing book. Please try again. ${err.message}`,
        icon: "error",
        confirmButtonText: "Try Again",
      });
    }
  };

  // Display SweetAlert error for form validation
  const showErrorAlert = (errorMessage) => {
    Swal.fire({
      title: "Error!",
      text: errorMessage,
      icon: "error",
      confirmButtonText: "Try Again",
    });
  };

  const handleQuantity = async (id, quantity) => {
    // console.log(id, quantity);
    const borrowId = borrowQuantity.map((bookId) => bookId.id === id);
    console.log(borrowId);
    // {
    //   !bbId
    //     ? await axiosSecure.patch(`/borrow-book/${id}`, {
    //         quantity,
    //       })
    //     : showErrorAlert("Borrowing not allow for a book twice");
    // }
    // if (!bbId) {
    //   showErrorAlert("Borrowing not allow for a book twice");
    //   return;
    // } else {
    //   const { data } = await axiosSecure.patch(`/borrow-book/${id}`, {
    //     quantity,
    //   });
    // }
    const { data } = await axiosSecure.patch(`/borrow-book/${id}`, {
      quantity,
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-3 md:px-8 lg:px-14">
      <Helmet>
        <meta charSet="utf-8" />
        <title>Details - {name}</title>
      </Helmet>
      <div className="my-20">
        <Slide direction="up">
          <div className="max-w-lg mx-auto text-center space-y-2">
            <h1 className="text-3xl font-bold font-PlayFair text-center">
              Categories list of Books
            </h1>
            <p>
              Explore a diverse collection of captivating books spanning various
              genres, authors, and themes, offering an enriching reading
              experience for every literary enthusiast.
            </p>
          </div>
        </Slide>
        <div className="card card-side border border-[#055c36] shadow-xl my-20">
          <figure className="w-1/3">
            <Slide direction="up">
              <img src={image} alt={name} />
            </Slide>
          </figure>
          <div className="card-body">
            <Slide direction="up">
              <h2 className="card-title">Book Name: {name}</h2>
              <p>Author Name: {author_name}</p>
              <p>Category: {category}</p>
              <p>Available of the book: {quantity} pcs</p>
              <p className="flex items-center gap-3">
                <span>Rating: {rating}</span>
                <Rating initialRating={rating} readonly />
              </p>
              <p>Short Description: {description} </p>
              <p>Book Contents: {contents} </p>
              <div
                className="card-actions grid grid-cols-1 md:grid-cols-2"
                title={
                  quantity < 1 ? "Book is not available!" : "Borrow the Book!"
                }
              >
                <label
                  htmlFor={
                    borrowQuantity.length >= 3
                      ? showErrorAlert("You cannot borrow more than 3 books")
                      : "borrow_modals"
                  }
                  disabled={quantity < 1}
                  className="btn btn-outline text-[#055c36]"
                >
                  Borrow Book
                </label>
              </div>
              <input
                type="checkbox"
                id="borrow_modals"
                className="modal-toggle"
              />
              <div className="modal" role="dialog">
                <div className="modal-box text-black">
                  <h3 className="font-bold text-lg">Borrow the book: {name}</h3>
                  <p className="py-4">
                    Available book{" "}
                    <span className="bg-[#055c36] px-4 py-1 text-white rounded-full">
                      {quantity}
                    </span>{" "}
                    pcs
                  </p>
                  <div className="py-10">
                    <form
                      method="dialog"
                      onSubmit={handleSubmit(onSubmit)}
                      className="space-y-5"
                    >
                      {/* Sending this data to borrowed_books collection */}
                      <div className="hidden">
                        <input type="text" {...register("id")} /> <br />
                        <input type="text" {...register("image")} /> <br />
                        <input type="text" {...register("name")} /> <br />
                        <input type="text" {...register("category")} /> <br />
                        <DatePicker
                          {...register("borrow_date")}
                          selected={startDate}
                          onChange={(date) => setStartDate(date)}
                        />
                      </div>
                      <div className="flex items-center border-b-2 border-[#055c36]">
                        <label htmlFor="return_date" className="mr-2">
                          Book Return Date
                          <span className="text-red-500">*</span>
                        </label>
                        <input
                          id="return_date"
                          {...register("return_date", {
                            required: {
                              value: true,
                              message: "Book return date is required!",
                            },
                          })}
                          type="date"
                          className="p-2 flex-grow bg-transparent"
                        />
                        {errors.return_date &&
                          showErrorAlert(errors.return_date.message)}
                      </div>
                      <div className="flex items-center border-b-2 border-[#055c36]">
                        <label htmlFor="display_name" className="mr-2">
                          User Name<span className="text-red-500">*</span>
                        </label>
                        <input
                          id="display_name"
                          {...register("display_name", {
                            required: {
                              value: true,
                              message: "Name is required!",
                            },
                          })}
                          type="text"
                          disabled
                          className="p-2 flex-grow bg-transparent"
                        />
                        {errors.display_name &&
                          showErrorAlert(errors.display_name.message)}
                      </div>
                      <div className="flex items-center border-b-2 border-[#055c36]">
                        <label htmlFor="email" className="mr-2">
                          User Email<span className="text-red-500">*</span>
                        </label>
                        <input
                          id="email"
                          {...register("email", {
                            required: {
                              value: true,
                              message: "User email is required!",
                            },
                          })}
                          type="email"
                          disabled
                          className="p-2 flex-grow bg-transparent"
                        />
                        {errors.email && showErrorAlert(errors.email.message)}
                      </div>
                      {/* if there is a button in form, it will close the modal */}
                      <div
                        className="flex justify-between items-center mt-10"
                        title={
                          borrowQuantity.length >= 3
                            ? "You cannot borrow more than 3 books!"
                            : "Borrow the Book!"
                        }
                      >
                        <button
                          onClick={() => handleQuantity(_id, quantity)}
                          disabled={borrowQuantity.length >= 3}
                          className="btn bg-gradient-to-r from-[#727d61] to-[#055c36] text-white"
                        >
                          Submit
                        </button>
                        <label
                          className="btn bg-gradient-to-r from-[#727d61] to-[#055c36] text-white"
                          htmlFor="borrow_modals"
                        >
                          Close
                        </label>
                      </div>
                    </form>
                  </div>
                </div>
                <label className="modal-backdrop" htmlFor="borrow_modals">
                  Close
                </label>
              </div>
            </Slide>
          </div>
        </div>
      </div>
    </div>
  );
};
export default BookDetails;
