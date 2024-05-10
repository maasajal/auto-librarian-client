import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
const AddBook = () => {
  const schema = yup
    .object({
      photo: yup.string().required(),
      category: yup.string().required(),
      name: yup.string().required(),
      authorName: yup.string().required(),
      quantity: yup.number().positive().integer().required(),
      rating: yup.number().integer().required(),
      description: yup.string().required(),
      aboutBook: yup.string().required(),
    })
    .required();

  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      name: "",
      photo: "",
      category: "",
      authorName: "",
      quantity: "",
      rating: "",
      description: "",
      aboutBook: "",
    },
  });
  const onSubmit = (data) => {
    console.log(data);
    const photo = data.photo;
    const category = data.category;
    const name = data.name;
    const authorName = data.authorName;
    const quantity = data.quantity;
    const rating = data.rating;
    const description = data.description;
    const aboutBook = data.aboutBook;
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
    <div>
      <div className="max-w-lg mx-auto text-center space-y-4">
        <h1 className="text-3xl font-bold font-PlayFair text-center">
          Add an Interesting Book
        </h1>
        <p>
          Expand our literary universe by adding a new book. Contribute to our
          collection and share the joy of reading with others.
        </p>
      </div>
      <div className="flex flex-col md:flex-row items-center justify-between gap-8 py-20">
        <div className="card w-full shadow-2xl bg-gradient-to-br from-[#055c36] to-[#727d61] mx-auto p-8 text-white">
          <form onSubmit={handleSubmit(onSubmit)} className="py-12 space-y-8">
            <h2 className="text-center text-3xl font-PlayFair">
              Enter Book Info
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="flex items-center border-b-2 border-[#055c36]">
                <label htmlFor="photo" className="mr-2">
                  Photo URL<span className="text-red-500">*</span>
                </label>
                <input
                  id="photo"
                  {...register("photo", {
                    required: "Photo is required!",
                  })}
                  type="text"
                  placeholder="Enter book photo url"
                  className="p-2 flex-grow bg-transparent"
                />
                {errors.photo && showErrorAlert(errors.photo.message)}
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
                <label htmlFor="authorName" className="mr-2">
                  Author Name<span className="text-red-500">*</span>
                </label>
                <input
                  id="authorName"
                  {...register("authorName", {
                    required: {
                      value: true,
                      message: "Book author name is required!",
                    },
                  })}
                  type="text"
                  placeholder="Enter Book author name"
                  className="p-2 flex-grow bg-transparent"
                />
                {errors.authorName && showErrorAlert(errors.authorName.message)}
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
                <label htmlFor="aboutBook" className="mr-2">
                  About Book<span className="text-red-500">*</span>
                </label>
                <textarea
                  id="aboutBook"
                  {...register("aboutBook", {
                    required: "About book is required!",
                  })}
                  placeholder="Enter something about the book"
                  className="p-2 flex-grow bg-transparent"
                />
                {errors.aboutBook && showErrorAlert(errors.aboutBook.message)}
              </div>
            </div>
            <div className="form-control">
              <input
                type="submit"
                value="Add Book"
                className="btn bg-gradient-to-r from-[#727d61] to-[#055c36] text-white"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default AddBook;
