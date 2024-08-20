import { makeStyles, useTheme } from "@material-ui/core/styles";
import styles from "assets/jss/nextjs-material-dashboard/views/loginStyle.js";
import Card from "components/Card/Card.js";
import Container from "@material-ui/core/Container";
import CardHeader from "components/Card/CardHeader.js";
import Admin from "layouts/Admin.js";
import CardBody from "components/Card/CardBody.js";
import { useRouter } from "next/router";
import React, { useState } from "react";
import MuiAlert from "@material-ui/lab/Alert";
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
const useStyless = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    maxWidth: 300,
  },
  chips: {
    display: "flex",
    flexWrap: "wrap",
  },
  chip: {
    margin: 2,
  },
  noLabel: {
    marginTop: theme.spacing(3),
  },
  table: {
    minWidth: 700,
  },
  cardCategoryWhite: {
    color: "rgba(255,255,255,.62)",
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "0",
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "500",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
    textAlign: "center",
  },
  searchWrapper: {
    textAlign: "center",
    marginBottom: "2em",
  },
  input: {
    display: "none",
  },
  button: {
    color: "purple",
    margin: 10,
  },
  secondaryButton: {
    color: "gray",
    margin: 10,
  },
}));

import { Grid, TextField, Button, CircularProgress } from "@material-ui/core";
import { authAxios, UNAUTHENTICATED_RESPONSE, parseCookies } from "../../../utility/apihelp";

export const getServerSideProps = async ({ req }) => {
  const token = parseCookies(req);
  const props = { token };

  if (!token) return UNAUTHENTICATED_RESPONSE;

  return {
    props,
  };
};

const add = ({ token }) => {
  const router = useRouter();
  const useStyles = makeStyles(styles);
  const classes = useStyles();
  const [loading, setLoading] = useState();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const name = useFormInput("");
  const image_url = useFormInput("");
  const active = useFormInput("");
  const amount = useFormInput("");

  const handleCreateAtizans = async (e) => {
    e.preventDefault();

    const users = {
      name: name.value,
      image_url: image_url.value,
      active: active.value,
      amount: amount.value,
    };
    setError(null);
    setLoading(true);
    try {
      await authAxios(token).post(`/admins/categories/create`, users);
      setLoading(false);
      setSuccess("Category added successfully");
      return router.push("/admin/categories");
    } catch (error) {
      setLoading(false);
      if (error.response.status === 401 || error.response.status === 400)
        setError(error.response.data.message);
      else {
        setError("Something went wrong, please try again");
      }
    }
  };

  return (
    <div>
      {success && <Alert severity="success">{success}</Alert>}
      <div className={classes.cardsbodies}></div>
      <Container sm="true">
        <Grid container spacing={3}>
          <Grid item xs={12} sm={12} md={2}></Grid>
          <Grid item xs={12} sm={12} md={8}>
            <Card>
              <CardHeader color="primary">
                <h4 className={classes.cardTitleWhitew}>Add Category</h4>
                <p className={classes.cardCategoryWhitew}>
                  The choice is yours
                </p>
              </CardHeader>
              <CardBody>
                <Container sm="true">
                  <form onSubmit={handleCreateAtizans} autoComplete="email">
                    <Grid
                      item
                      xs={12}
                      sm={12}
                      md={12}
                      className={classes.formControl}
                    >
                      <TextField
                        fullWidth
                        type="text"
                        label="Name"
                        color="primary"
                        required
                        {...name}
                      />

                      <TextField
                        fullWidth
                        type="text"
                        label="Amount"
                        color="primary"
                        required
                        {...amount}
                      />
                       <TextField
                        fullWidth
                        type="text"
                        label="Active"
                        color="primary"
                        required
                        {...active}
                      />

                      <TextField
                        fullWidth
                        type="text"
                        label="Image Url"
                        color="primary"
                        required
                        {...image_url}
                      />
                      <Button
                        fullWidth
                        type="submit"
                        variant="contained"
                        className={classes.button}
                        disabled={loading}
                      >
                        {loading && <CircularProgress size={16} />}
                        {!loading && "Add Artizan"}
                      </Button>
                      {error && <Alert severity="error">{error}</Alert>}
                    </Grid>
                  </form>
                </Container>
              </CardBody>
            </Card>
          </Grid>
          <Grid item xs={12} sm={12} md={2}></Grid>
        </Grid>
      </Container>
    </div>
  );
};

const useFormInput = (initialValue) => {
  const [value, setValue] = useState(initialValue);

  const handleChange = (e) => {
    setValue(e.target.value);
  };
  return {
    value,
    onChange: handleChange,
  };
};

add.layout = Admin;
export default add;
