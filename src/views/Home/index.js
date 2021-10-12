import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import SecurityIcon from "@mui/icons-material/Security";
import AllBreaches from "../../components/AllBreaches";
import Title from "../../components/Title";
import {
  AppBar,
  toolbarStyles,
  flexGrow,
  containerStyles,
  tableWrapper,
  submitBtn,
  formWrapper,
} from "./styles";
import validators from "../../utils/validators";
import { fetchBreachesReqAction } from "../../store/breaches/actions";

function Dashboard() {
  const dispatch = useDispatch();
  const breachesData = useSelector(({ breachesData }) => breachesData);
  const [validEmail, setValidEmail] = useState(true);

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = data.get("email");

    if (validators.email(email)) {
      setValidEmail(true);
      dispatch(fetchBreachesReqAction({ email }));
    } else {
      setValidEmail(false);
    }
  };

  return (
    <Box sx={flexGrow}>
      <CssBaseline />
      <AppBar position="absolute">
        <Toolbar sx={toolbarStyles}>
          <Typography
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
            sx={flexGrow}
          >
            Security Breaches
          </Typography>
          <IconButton color="inherit">
            <SecurityIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Box component="main" sx={containerStyles}>
        <Toolbar />
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
          <Grid container spacing={3}>
            {/* Submit email to get all breaches */}
            <Grid item xs={12}>
              <Paper sx={formWrapper}>
                <Box
                  component="form"
                  onSubmit={handleSubmit}
                  noValidate
                  sx={{ mt: 1 }}
                >
                  <Title>Email Form</Title>
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    autoFocus
                    error={!validEmail}
                    helperText={!validEmail ? "Invalid email address!" : ""}
                  />
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={submitBtn}
                  >
                    Submit
                  </Button>
                </Box>
              </Paper>
            </Grid>

            {/* All Breaches */}
            <Grid item xs={12}>
              <Paper sx={tableWrapper}>
                <AllBreaches breachesData={breachesData} />
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
}

export default Dashboard;
