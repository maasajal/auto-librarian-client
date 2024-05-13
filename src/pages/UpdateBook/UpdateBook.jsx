import { useLoaderData, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const UpdateBook = () => {
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const editBook = useLoaderData();
  const schema = yup
    .object({
      image: yup.string().required(),
      category: yup.string().required(),
      name: yup.string().required(),
      author_name: yup.string().required(),
      quantity: yup.number().positive().integer().required(),
      rating: yup.number().integer().required(),
      description: yup.string().required(),
      contents: yup.string().required(),
    })
    .required();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      name: `${editBook.name}`,
      image: `${editBook.image}`,
      category: `${editBook.category}`,
      author_name: `${editBook.author_name}`,
      quantity: `${editBook.quantity}`,
      rating: `${editBook.rating}`,
      description: `${editBook.description}`,
      contents: `${editBook.contents}`,
    },
  });
  const url = `/books/${editBook._id}`;
  const onSubmit = async (data) => {
    try {
      const response = await axiosSecure.put(url, data);
      if (response.data.modifiedCount > 0) {
        Swal.fire({
          title: "Success!",
          text: "Update item successfully!",
          icon: "success",
          confirmButtonText: "Cool",
        });
        navigate("/all-books");
      }
    } catch (error) {
      console.error("Error", error);
      Swal.fire({
        title: "Error!",
        text: `An error occurred while updating book. Please try again later. ${error.message}`,
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

  return (
    <div className="max-w-7xl mx-auto px-3 md:px-8 lg:px-14">
      <div className="max-w-lg mx-auto text-center space-y-4">
        <h1 className="text-3xl font-bold font-PlayFair text-center">
          Update the Book
        </h1>
        <p>
          UpdateBook component is designed to facilitate the seamless
          modification of book details through a form interface, ensuring
          efficient management and accurate representation of book information
          within the library system.
        </p>
      </div>
      <div className="flex flex-col md:flex-row items-center justify-between gap-8 py-20">
        <div className="card w-full shadow-2xl bg-gradient-to-br from-[#055c36] to-[#727d61] mx-auto p-8 text-white">
          <form onSubmit={handleSubmit(onSubmit)} className="py-12 space-y-8">
            <h2 className="text-center text-3xl font-PlayFair">
              Enter Update Info
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="flex items-center border-b-2 border-[#055c36]">
                <label htmlFor="image" className="mr-2">
                  Photo URL<span className="text-red-500">*</span>
                </label>
                <input
                  id="image"
                  {...register("image", {
                    required: "Photo is required!",
                  })}
                  type="text"
                  placeholder="Enter book photo url"
                  className="p-2 flex-grow bg-transparent"
                />
                {errors.image && showErrorAlert(errors.image.message)}
              </div>
              <div className="flex items-center border-b-2 border-[#055c36]">
                <label htmlFor="category" className="mr-2">
                  Category<span className="text-red-500">*</span>
                </label>
                <input
                  id="category"
                  {...register("category", {
                    required: "Category is required!",
                  })}
                  type="text"
                  placeholder="Enter book category"
                  className="p-2  flex-grow bg-transparent"
                />
                {errors.category && showErrorAlert(errors.category.message)}
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="flex items-center border-b-2 border-[#055c36]">
                <label htmlFor="name" className="mr-2">
                  Book Name<span className="text-red-500">*</span>
                </label>
                <input
                  id="name"
                  {...register("name", {
                    required: {
                      value: true,
                      message: "Book Name is required!",
                    },
                  })}
                  type="text"
                  placeholder="Enter Book name"
                  className="p-2 flex-grow bg-transparent"
                />
                {errors.name && showErrorAlert(errors.name.message)}
              </div>
              <div className="flex items-center border-b-2 border-[#055c36]">
                <label htmlFor="author_name" className="mr-2">
                  Author Name<span className="text-red-500">*</span>
                </label>
                <input
                  id="author_name"
                  {...register("author_name", {
                    required: {
                      value: true,
                      message: "Book author name is required!",
                    },
                  })}
                  type="text"
                  placeholder="Enter Book author name"
                  className="p-2 flex-grow bg-transparent"
                />
                {errors.author_name &&
                  showErrorAlert(errors.author_name.message)}
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="flex items-center border-b-2 border-[#055c36]">
                <label htmlFor="quantity" className="mr-2">
                  Quantity of the book<span className="text-red-500">*</span>
                </label>
                <input
                  id="quantity"
                  {...register("quantity", {
                    min: {
                      value: 1,
                      message:
                        "Quantity cannot be negative! It should be at least one!",
                    },
                    required: {
                      value: true,
                      message: "Quantity is required!",
                    },
                  })}
                  type="number"
                  placeholder="Quantity of the book"
                  className="p-2 flex-grow bg-transparent"
                />
                {errors.quantity && showErrorAlert(errors.quantity.message)}
              </div>
              <div className="flex items-center border-b-2 border-[#055c36]">
                <label htmlFor="rating" className="mr-2">
                  Rating<span className="text-red-500">*</span>
                </label>
                <select
                  id="rating"
                  {...register("rating", {
                    required: "About-book is required!",
                  })}
                  type="number"
                  className="p-2 flex-grow bg-transparent"
                  defaultValue={"Give a rating on the book"}
                >
                  <option disabled>Give a rating on the book</option>
                  <option value={1}>1</option>
                  <option value={2}>2</option>
                  <option value={3}>3</option>
                  <option value={4}>4</option>
                  <option value={5}>5</option>
                </select>
                {errors.rating && showErrorAlert(errors.rating.message)}
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="flex items-center border-b-2 border-[#055c36]">
                <label htmlFor="description" className="mr-2">
                  Short Description<span className="text-red-500">*</span>
                </label>
                <textarea
                  id="description"
                  {...register("description", {
                    required: "description is required!",
                  })}
                  placeholder="Enter short description"
                  className="p-2 flex-grow bg-transparent"
                />
                {errors.description &&
                  showErrorAlert(errors.description.message)}
              </div>
              <div className="flex items-center border-b-2 border-[#055c36]">
                <label htmlFor="contents" className="mr-2">
                  Book Contents<span className="text-red-500">*</span>
                </label>
                <textarea
                  id="contents"
                  {...register("contents", {
                    required: "Book Contents is required!",
                  })}
                  placeholder="Enter something about the book"
                  className="p-2 flex-grow bg-transparent"
                />
                {errors.contents && showErrorAlert(errors.contents.message)}
              </div>
            </div>
            <div className="form-control">
              <input
                type="submit"
                value="Update Book"
                className="btn bg-gradient-to-r from-[#727d61] to-[#055c36] text-white"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default UpdateBook;
