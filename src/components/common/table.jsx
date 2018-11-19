import React from "react";
import TableHeader from "./tableHeader";
import TableBody from "./tableBody";

const Table = ({ sortColum, columns, data, onSorting }) => {
  return (
    <table className="table mt-4 mb-4">
      <TableHeader
        columns={columns}
        sortColum={sortColum}
        onSorting={onSorting}
      />

      <TableBody columns={columns} data={data} />
    </table>
  );
};

export default Table;
