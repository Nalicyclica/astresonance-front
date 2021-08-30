const ErrorList: React.FC<{errors: string[]}> = ({errors}) => {
  const errorList = errors.map((error_message)=>
    <p className="mb-1">{error_message}</p>
  );

  return(
    <div className="flex flex-col justify-center items-center text-red-500 text-sm">
      {errorList}
    </div>
  );
};

export default ErrorList;