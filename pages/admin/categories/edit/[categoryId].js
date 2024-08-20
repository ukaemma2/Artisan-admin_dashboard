import { makeStyles } from "@material-ui/core/styles";
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
import {
  authAxios,
  parseCookies,
  UNAUTHENTICATED_RESPONSE,
} from "../../../../utility/apihelp";

export const getInitialProps = async ({ req }) => {
  const token = parseCookies(req);
  if (!token) return UNAUTHENTICATED_RESPONSE;

  const props = { fallback: false };

  try {
    const { data } = await authAxios(token).get(`/categories`);

    props.paths = data.map((category) => {
      return {
        params: {
          categoryId: `${category._id}`,
        },
      };
    });
  } catch (error) {
    throw error;
  }

  return props;
};

export const getServerSideProps = async ({ params: { categoryId }, req }) => {
  const token = parseCookies(req);
  const props = { token };

  if (!token) return UNAUTHENTICATED_RESPONSE;

  try {
    const { data } = await authAxios(token).get(`/categories/${categoryId}`);
    props.categoryData = data;
  } catch (error) {
    throw error;
  }

  return {
    props,
  };
};

const add = ({ categoryData, token }) => {
  const router = useRouter();
  const useStyles = makeStyles(styles);
  const classes = useStyles();
  const [loading, setLoading] = useState();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [category, setUser] = useState({
    active: categoryData.active,
    name: categoryData.name,
    image_url: categoryData.image_url,
    amount: categoryData.amount
  });

  const { active, name, image_url, amount } = category;

  const handleCreateCategory = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const requestBody = {
        active: category.active,
        name: category.name,
        image_url: category.image_url,
        amount: category.amount,
      };
      await authAxios(token).put(`admins/categories/${categoryData._id}`, requestBody);
      setLoading(false);
      setSuccess("Artizan Edited Successfully");
      return router.push(`/admin/categories`);
    } catch (error) {
      setLoading(false);
      if (error.response.status === 401 || error.response.status === 400)
        setError(error.response.data.message);
      else {
        setError("Something went wrong, please try again");
      }
    }
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...category, [name]: value });
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
                <h4 className={classes.cardTitleWhitew}>Edit Category</h4>
                <p className={classes.cardCategoryWhitew}>
                  The choice is yours
                </p>
              </CardHeader>
              <CardBody>
                <Container sm="true">
                  <form onSubmit={handleCreateCategory} autoComplete="email">
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
                        name="name"
                        value={name}
                        onChange={handleInputChange}
                      />
                      <TextField
                        fullWidth
                        type="text"
                        label="Avatar"
                        color="primary"
                        name="image_url"
                        value={image_url}
                        onChange={handleInputChange}
                      />
                      <TextField
                        fullWidth
                        type="text"
                        label="Amount"
                        color="primary"
                        name="amount"
                        value={amount}
                        onChange={handleInputChange}
                      />
                      <TextField
                        fullWidth
                        type="text"
                        label="Activeness"
                        color="primary"
                        name="active"
                        value={active}
                        onChange={handleInputChange}
                      />
                      <Button
                        fullWidth
                        type="submit"
                        variant="contained"
                        className={classes.button}
                        disabled={loading}
                      >
                        {loading && <CircularProgress size={16} />}
                        {!loading && "Submit Changes"}
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

add.layout = Admin;
export default add;
