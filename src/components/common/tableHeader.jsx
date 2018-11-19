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

  renderSortIcon = column => {
    const { sortColum } = this.props;
    if (column.path !== sortColum.path) return null;
    if (sortColum.order === "asc") return <i className="fa fa-sort-asc" />;
    return <i className="fa fa-sort-desc" />;
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
              {column.label} {this.renderSortIcon(column)}
            </th>
          ))}
        </tr>
      </thead>
    );
  }
}

export default TableHeader;
