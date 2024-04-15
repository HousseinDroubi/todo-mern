import "./InputText.css";

const InputText = ({ isPassword, placeholder, text, setText }) => {
  return (
    <input
      value={text}
      onChange={(e) => {
        setText(e.target.value);
      }}
      type={isPassword ? "password" : "text"}
      className="input-text"
      placeholder={placeholder}
    />
  );
};

export default InputText;
