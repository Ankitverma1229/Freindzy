import ErrorImage from "../assets/error.svg";

const ErrorPage = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div>
        <img src={ErrorImage} alt="Error" className="h-80" />
      </div>
    </div>
  );
};

export default ErrorPage;
