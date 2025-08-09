import { Link } from "react-router-dom";

const NotFoundPage: React.FC<object> = () => {
  return (
    <>
      <h1 className="">404 Not Found</h1>
      <p className="">This page does not exist</p>
      <Link to="/" className="">
        Go Back
      </Link>
    </>
  );
};

export default NotFoundPage;
