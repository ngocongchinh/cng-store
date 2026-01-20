interface ErrorMessageProps {
  message?: string;
}

export default function ErrorMessage({ message }: ErrorMessageProps) {
  return (
    <div className="p-4 text-center" role="alert">
      <p className="text-red-600 mb-2">
        {message || "An error occurred. Please try again."}
      </p>
    </div>
  );
}
