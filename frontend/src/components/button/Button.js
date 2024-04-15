import "./Button.css";

const Button = ({ buttonText, buttonFun }) => {
  return (
    <button onClick={buttonFun} className="button">
      {buttonText}
    </button>
  );
};

export default Button;
