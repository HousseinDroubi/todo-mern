const BoxResult = ({ resultContents }) => {
  return (
    <h4 className={`${resultContents.isError ? "color-red" : "color-green"}`}>
      {resultContents.text}
    </h4>
  );
};

export default BoxResult;
