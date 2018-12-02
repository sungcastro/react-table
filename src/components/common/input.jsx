import React from "react";

const Input = ({ name, type, label, value, onChange }) => {
  return (
    <div className="form-group">
      <label htmlFor={name}> {label} </label>
      <input
        id={name}
        type={type}
        className="form-control"
        name={name}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default Input;
