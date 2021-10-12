import MuiAppBar from "@mui/material/AppBar";
import { styled } from "@mui/material/styles";

const drawerWidth = 240;

export const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

export const containerStyles = {
  backgroundColor: (theme) =>
    theme.palette.mode === "light"
      ? theme.palette.grey[100]
      : theme.palette.grey[900],
  flexGrow: 1,
  height: "100vh",
  overflow: "auto",
};

export const tableWrapper = { p: 2, display: "flex", flexDirection: "column" };

export const formWrapper = { p: 2, display: "flex", flexDirection: "column" };

export const submitBtn = { mt: 3, mb: 2 };

export const toolbarStyles = {
  pr: "24px", // keep right padding when drawer closed
};

export const flexGrow = { flexGrow: 1 };
