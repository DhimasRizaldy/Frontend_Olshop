const Label = (props) => {
  const { htmlFor, children, classname } = props;
  return (
    <label htmlFor={htmlFor} className={classname}>
      {children}
    </label>
  );
};

export default Label;
