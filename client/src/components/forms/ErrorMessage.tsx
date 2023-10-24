type Props = { errors: string[] };

const ErrorMessage: React.FC<Props> = ({ errors }) => {
  return (
    <>
      {errors.map((error, index) => (
        <p className="text-sm text-red-500 mt-0.5" key={index}>
          {error}
        </p>
      ))}
    </>
  );
};

export default ErrorMessage;
