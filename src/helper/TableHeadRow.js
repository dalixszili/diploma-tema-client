import React from "react";

import { TableCell, TableSortLabel } from "@mui/material";

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

export function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

export function sortedRowData(data, comp) {
  const stabilizedRows = data.map((row, index) => [row, index]);
  stabilizedRows.sort((a, b) => {
    const order = comp(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedRows.map((row) => row[0]);
}

function TableHeadRow({ data, order, orderBy, setOrder, setOrderBy }) {
  // táblázat rendezés
  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    if (orderBy !== property) {
      setOrderBy(property);
    }
  };

  return (
    <>
      {data.map((item, index) => (
        <TableCell key={index}>
          <TableSortLabel
            active={orderBy === item.name}
            direction={orderBy === item.name ? order : "asc"}
            onClick={() => handleRequestSort(item.name)}
          >
            {item.label}
          </TableSortLabel>
        </TableCell>
      ))}
    </>
  );
}

export default TableHeadRow;
