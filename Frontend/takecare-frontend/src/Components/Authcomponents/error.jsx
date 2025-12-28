const ErrorMessage = ({ message }) => {
  if (!message) return null;

  return (
    <div className="mb-4">
      <div className="bg-red-100 text-red-700 border border-red-300 px-4 py-3 rounded-xl shadow-sm">
        {message}
      </div>
    </div>
  );
};

export default ErrorMessage;
