const Button = (props) => {
  const {
    children,
    classname = "bg-black",
    onClick = () => {},
    type = "button",
  } = props;
  return (
    <button className={`${classname}`} type={type} onClick={() => onClick()}>
      {children}
    </button>
  );
};

export default Button;
