import classes from "./Input.module.css";

const Input = (props) => {
  return (
    <div className={`${classes.inputForm} ${props.invalidClass}`}>
      <input
        type={props.type}
        id={props.id}
        placeholder={props.placeholder}
        onChange={props.onChange}
        onBlur={props.onBlur}
        value={props.value}
      />
    </div>
  );
};

export default Input;
