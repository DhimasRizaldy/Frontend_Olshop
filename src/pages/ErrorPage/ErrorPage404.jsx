const ErrorPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="p-10 text-center bg-white rounded-lg shadow-lg">
        <h1 className="mb-5 text-5xl font-bold text-red-500">Oops!</h1>
        <p className="my-5 text-xl text-gray-700">
          Sorry, an unexpected error has occurred.
        </p>
        <p className="text-lg text-gray-500">
          Page not found.
        </p>
      </div>
    </div>
  );
};

export default ErrorPage;
