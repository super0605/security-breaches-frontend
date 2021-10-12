import * as React from "react";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import Stack from "@mui/material/Stack";
import CircularProgress from "@mui/material/CircularProgress";
import Title from "../../components/Title";
import EnhancedTableHead from "./TableHeader";
import EnhancedTableToolbar from "./TableToolbar";
import { createData, getComparator, stableSort } from "../../utils/helpers";

function EnhancedTable({ breachesData }) {
  const [rowsData, setRowsData] = React.useState([]);
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("calories");
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  React.useEffect(() => {
    const { breaches } = breachesData;
    if (!breaches || breaches !== undefined || breaches.length === 0) {
      setRowsData([]);
    }

    const generatedRows = generateRows(breaches);

    setRowsData(generatedRows);
  }, [breachesData]);

  const generateRows = (breaches) =>
    Array.from(breaches, (item) => {
      return createData(
        item.Name,
        item.Domain,
        item.BreachDate,
        item.AddedDate,
        item.ModifiedDate
      );
    });

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = rowsData.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rowsData.length) : 0;

  const handleSearch = (evt) => {
    const searchedVal = evt.target.value;
    const { breaches } = breachesData;
    const generatedRows =
      breaches.length > 0 ? generateRows(breachesData.breaches) : [];

    if (!searchedVal) {
      setRowsData(generatedRows);
    } else {
      const filteredRows = generatedRows.filter((row) => {
        return row.Name.toLowerCase().includes(searchedVal.toLowerCase());
      });
      setRowsData(filteredRows);
    }
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Title>All Breaches</Title>
      <Paper sx={{ width: "100%", mb: 2 }}>
        <EnhancedTableToolbar handleSearch={handleSearch} />
        <TableContainer>
          {breachesData.loading ? (
            <Stack
              sx={{ color: "grey.500", flex: 1 }}
              spacing={2}
              direction="row"
            >
              <CircularProgress color="secondary" />
            </Stack>
          ) : (
            <Table
              sx={{ minWidth: 750 }}
              aria-labelledby="tableTitle"
              size={dense ? "small" : "medium"}
            >
              <EnhancedTableHead
                numSelected={selected.length}
                order={order}
                orderBy={orderBy}
                onSelectAllClick={handleSelectAllClick}
                onRequestSort={handleRequestSort}
                rowCount={rowsData.length}
              />

              <TableBody>
                {/* if you don't need to support IE11, you can replace the `stableSort` call with:
                 rows.slice().sort(getComparator(order, orderBy)) */}
                {stableSort(rowsData, getComparator(order, orderBy))
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => {
                    const isItemSelected = isSelected(row.Name);
                    const labelId = `enhanced-table-checkbox-${index}`;

                    return (
                      <TableRow
                        hover
                        onClick={(event) => handleClick(event, row.Name)}
                        aria-checked={isItemSelected}
                        tabIndex={-1}
                        key={row.Name}
                        selected={isItemSelected}
                      >
                        <TableCell component="th" id={labelId} scope="row">
                          {row.Name}
                        </TableCell>
                        <TableCell align="right">{row.Domain}</TableCell>
                        <TableCell align="right">{row.BreachDate}</TableCell>
                        <TableCell align="right">{row.AddedDate}</TableCell>
                        <TableCell align="right">{row.ModifiedDate}</TableCell>
                      </TableRow>
                    );
                  })}
                {emptyRows > 0 && (
                  <TableRow
                    style={{
                      height: (dense ? 33 : 53) * emptyRows,
                    }}
                  >
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
              </TableBody>
            </Table>
          )}
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rowsData.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      <FormControlLabel
        control={<Switch checked={dense} onChange={handleChangeDense} />}
        label="Dense padding"
      />
    </Box>
  );
}

export default EnhancedTable;
