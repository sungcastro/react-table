import React from "react";

const ListGroup = ({
  items,
  textProperty,
  valueProperty,
  onItemSelect,
  selectedItem
}) => {
  return (
    <div className="mt-5">
      <ul className="list-group">
        {items.map(item => (
          <li
            key={item[valueProperty]}
            className={
              item === selectedItem
                ? "list-group-item active"
                : "btn list-group-item"
            }
            onClick={() => onItemSelect(item)}
          >
            {item[textProperty]}
          </li>
        ))}
      </ul>
    </div>
  );
};

ListGroup.defaultProps = {
  textProperty: "name",
  valueProperty: "_id"
};

export default ListGroup;
