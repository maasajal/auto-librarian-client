# Auto Librarian is an e-Library

## Demos

- Live Client Site Link: [https://auto-e-librarian.web.app](https://auto-e-librarian.web.app)

- Live Server Site Link: [https://auto-librarian.vercel.app](https://auto-librarian.vercel.app)

- Run the project on your Local machine

  - Clone: `git clone https://github.com/maasajal/auto-librarian-client.git`
  - Change Directory: `cd auto-librarian-client`
  - Install packages: `npm i` or `npm install`
  - create a .env.local file and add firebase config code. example code at the end
  - Run: `npm run dev`

## [Server side Repo Link](https://github.com/maasajal/auto-librarian-server)

## About the project

Auto Librarian is an innovative e-library project designed to revolutionize the way users access and interact with digital books. Here's a brief overview highlighting its key features:

- Extensive Digital Collection: Access a vast collection of digital books covering various genres, authors, and topics, providing users with a diverse reading experience.
- User-Friendly Interface: Navigate through the e-library seamlessly with an intuitive and user-friendly interface, making it easy for users to discover, borrow, and enjoy their favorite books.
- Multiple Viewing Options: Choose between Card View and Table View to customize the display of books based on personal preferences, enhancing the browsing experience.
- Interactive Borrowing System: Borrow books directly from the platform with a simple click, allowing users to enjoy their selected titles hassle-free and track their borrowing history.
- Secure Authentication: Ensure user data security and privacy with secure authentication mechanisms, including JWT tokens, providing a safe and reliable environment for users to explore and engage with the e-library.

### Features and Packages

- Swiper Slider
- Sweet Alert Toaster
- React Hook Form
- User register using Firebase auth
- User login using email and password
- Login with Google
- Login with GitHub
- Mongodb database
- Node.js server
- Methods: ["GET", "POST", "PUT", "DELETE", "PATCH"]
- View details for login user
- Borrow and Return book for login user
- JsonWebToken (jwt)

### Challenge Requirements

1. Use the JWT token for doing the CRUD operations in the `All Books` and `Add Book` routes.
2. Filter by “Show available books” on the All Books page. By clicking this button, only available books will be shown.
3. Card View and Table View Implement on the All Books page.
4. Implementing a dark/light theme toggle for the all pages.

### Librarian role

- Email: `auto@librarian.com`
- Password: `1234$R`

```
  VITE_APIKEY=
  VITE_AUTHDOMAIN=
  VITE_PROJECTID=
  VITE_STORAGEBUCKET=
  VITE_MESSAGINGSENDERID=
  VITE_APPID=
```
