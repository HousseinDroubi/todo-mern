import "./TextArea.css";

const TextArea = ({ text, setText }) => {
  return (
    <textarea
      value={text}
      className="input-text h-160"
      placeholder="Enter todo title"
      onChange={(e) => {
        setText(e.target.value);
      }}
    ></textarea>
  );
};

export default TextArea;
