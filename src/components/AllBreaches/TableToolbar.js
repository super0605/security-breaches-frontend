import * as React from "react";
import PropTypes from "prop-types";
import Toolbar from "@mui/material/Toolbar";
import { alpha } from "@mui/material/styles";
import FormControl from "@mui/material/FormControl";
import Input from "@mui/material/Input";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import FilterListIcon from "@mui/icons-material/FilterList";

const EnhancedTableToolbar = (props) => {
  const { handleSearch } = props;
  const [searchable, setSearchable] = React.useState(false);

  const handleClose = () => {
    setSearchable(false);
  };

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(searchable && {
          bgcolor: (theme) =>
            alpha(
              theme.palette.primary.main,
              theme.palette.action.activatedOpacity
            ),
        }),
      }}
    >
      {searchable ? (
        <FormControl variant="standard">
          <Input
            id="input-with-icon-adornment"
            placeholder="Search by name"
            startAdornment={
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            }
            onChange={(evt) => handleSearch(evt)}
          />
        </FormControl>
      ) : (
        <Typography
          sx={{ flex: "1 1 100%" }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          Breaches
        </Typography>
      )}

      {searchable ? (
        <Tooltip title="Close">
          <IconButton onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Search By Name">
          <IconButton onClick={() => setSearchable(true)}>
            <FilterListIcon />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  handleSearch: PropTypes.func,
};

export default EnhancedTableToolbar;
