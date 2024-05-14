import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import AddBook from "../pages/AddBook/AddBook";
import PrivateRoute from "./PrivateRoute";
import useAxiosSecure from "../hooks/useAxiosSecure";
import AllBooks from "../pages/AllBooks/AllBooks";
import UpdateBook from "../pages/UpdateBook/UpdateBook";
import BookCategory from "../pages/BookCategory/BookCategory";
import BookDetails from "../pages/BookDetails/BookDetails";
import BorrowedBooks from "../pages/BorrowedBooks/BorrowedBooks";
import AllBooksByLibrarian from "../pages/AllBooks/AllBooksByLibrarian";

const axiosSecure = useAxiosSecure();

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/books/:category",
        element: (
          <PrivateRoute>
            <BookCategory />
          </PrivateRoute>
        ),
      },
      {
        path: "/book/:id",
        element: (
          <PrivateRoute>
            <BookDetails />
          </PrivateRoute>
        ),
        loader: ({ params }) =>
          fetch(`${import.meta.env.VITE_API_URL}/books/${params.id}`),
      },
      {
        path: "/borrowed-books",
        element: (
          <PrivateRoute>
            <BorrowedBooks />
          </PrivateRoute>
        ),
      },
      {
        path: "/add-book",
        element: (
          <PrivateRoute>
            <AddBook />
          </PrivateRoute>
        ),
      },
      {
        path: "/all-books",
        element: (
          <PrivateRoute>
            <AllBooks />
          </PrivateRoute>
        ),
        loader: () => axiosSecure.get("/books"),
      },
      {
        path: "/all-books/:email",
        element: (
          <PrivateRoute>
            <AllBooksByLibrarian />
          </PrivateRoute>
        ),
      },
      {
        path: "/update-book/:id",
        element: (
          <PrivateRoute>
            <UpdateBook />
          </PrivateRoute>
        ),
        loader: ({ params }) =>
          fetch(`${import.meta.env.VITE_API_URL}/books/${params.id}`),
      },
    ],
  },
]);
export default router;
