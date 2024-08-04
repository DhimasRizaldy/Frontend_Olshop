const Input = (props) => {
  const { type, placeholder, name, classname } = props;
  return (
    <input
      type={type}
      className={classname}
      placeholder={placeholder}
      name={name}
      id={name}
    />
  );
};

export default Input;
