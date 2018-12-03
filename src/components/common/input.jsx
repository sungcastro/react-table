import React from "react";

const Input = ({ name, type, label, value, error, onChange }) => {
  return (
    <div className="form-group">
      <label htmlFor={name}> {label} </label>
      <input
        id={name}
        className="form-control"
        type={type}
        name={name}
        value={value}
        onChange={onChange}
      />
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};

export default Input;
