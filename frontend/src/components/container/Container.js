const Container = ({ children }) => {
  return (
    <article className="flex flex-column j-c-c a-i-c min-h-100vh">
      {children}
    </article>
  );
};

export default Container;
