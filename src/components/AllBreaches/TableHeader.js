import * as React from "react";
import PropTypes from "prop-types";
import TableHead from "@mui/material/TableHead";
import TableSortLabel from "@mui/material/TableSortLabel";
import { visuallyHidden } from "@mui/utils";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import Box from "@mui/material/Box";

const headCells = [
  {
    id: "Name",
    numeric: false,
    disablePadding: false,
    label: "Name",
  },
  {
    id: "Domain",
    numeric: true,
    disablePadding: false,
    label: "Domain",
  },
  {
    id: "BreachDate",
    numeric: true,
    disablePadding: false,
    label: "BreachDate",
  },
  {
    id: "AddedDate",
    numeric: true,
    disablePadding: false,
    label: "AddedDate",
  },
  {
    id: "ModifiedDate",
    numeric: true,
    disablePadding: false,
    label: "ModifiedDate",
  },
];

function EnhancedTableHead(props) {
  const { order, orderBy, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? "right" : "left"}
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
};

export default EnhancedTableHead;
