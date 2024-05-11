import { useLoaderData } from "react-router";
import Banner from "../../components/Banner/Banner";

const Home = () => {
  const data = useLoaderData();
  const books = data.data;
  console.log(books);
  return (
    <div>
      <Banner sliderData={books} />
      <div className="max-w-7xl mx-auto px-3 md:px-8 lg:px-14">

      </div>
    </div>
  );
};
export default Home;
