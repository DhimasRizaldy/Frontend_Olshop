const Input = (props) => {
  const { type, placeholder, name, classname, value, onChange } = props;
  return (
    <input
      type={type}
      className={classname}
      placeholder={placeholder}
      name={name}
      id={name}
      value={value}
      onChange={onChange}
    />
  );
};

export default Input;
