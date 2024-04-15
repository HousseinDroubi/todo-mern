import "./Box.css";

const Box = ({ children, className }) => {
  return (
    <section
      className={`box flex flex-column a-i-c j-c-s-e mt-20 ${className}`}
    >
      {children}
    </section>
  );
};
export default Box;
