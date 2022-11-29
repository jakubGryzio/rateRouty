import React from "react";

const ValueButton = (props) => {
  return (
    <button className={props.className} onClick={props.onClick}>
      {props.value}
    </button>
  );
};

export default ValueButton;
