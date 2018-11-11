import React, { Component } from "react";

class TableHeader extends Component {
  raiseSort = column => {
    const sortColum = { ...this.props.sortColum };
    if (sortColum.column === column)
      sortColum.order = sortColum.order === "asc" ? "desc" : "asc";
    else {
      sortColum.column = column;
      sortColum.order = "asc";
    }
    this.props.onSorting(sortColum);
  };
  render() {
    return (
      <thead className="thead-dark">
        <tr>
          {this.props.columns.map(column => (
            <th
              key={column.path || column.key}
              onClick={() => this.raiseSort(column.path)}
            >
              {column.label}
            </th>
          ))}
        </tr>
      </thead>
    );
  }
}

export default TableHeader;
