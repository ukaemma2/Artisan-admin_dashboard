import { makeStyles, useTheme } from "@material-ui/core/styles";
import styles from "assets/jss/nextjs-material-dashboard/views/loginStyle.js";
import Card from "components/Card/Card.js";
import Container from "@material-ui/core/Container";
import CardHeader from "components/Card/CardHeader.js";
import Admin from "layouts/Admin.js";
import CardBody from "components/Card/CardBody.js";
import { useRouter } from "next/router";
import AddPhotoAlternateIcon from "@material-ui/icons/AddPhotoAlternate";
import React, { useState } from "react";
import { baseUrl, authAxios, parseCookies } from "../../../../utility/apihelp";
import MuiAlert from "@material-ui/lab/Alert";
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

baseUrl;
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

import {
  Grid,
  TextField,
  Button,
  CircularProgress,
  Fab,
} from "@material-ui/core";

export const getInitialProps = async ({ req }) => {
  const token = parseCookies(req);
  const props = { fallback: false };
  if (!token) return UNAUTHENTICATED_RESPONSE;

  try {
    const { data } = await authAxios(token).get(`/admins/users`);
    props.paths = data.map((user) => {
      return {
        params: {
          userId: `${user._id}`,
        },
      };
    });
  } catch (error) {
    throw error;
  }
  return props;
};

export const getServerSideProps = async ({ params: { userId }, req }) => {
  const token = parseCookies(req);
  const props = { token };
  try {
    const { data } = await authAxios(token).get(`/admins/users/${userId}`);
    props.artisansData = data;
  } catch (error) {
    throw error;
  }

  return {
    props,
  };
};

const add = ({ artisansData, token }) => {
  const router = useRouter();
  const useStyles = makeStyles(styles);
  const classes = useStyles();
  const classess = useStyless();
  const [loading, setLoading] = useState();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [user, setUser] = useState({
    email: artisansData.email,
    phone_number: artisansData.phone_number,
    rating: artisansData.rating,
    password: artisansData.password,
    address: artisansData.address,
    first_name: artisansData.first_name,
    last_name: artisansData.last_name,
    verified_at: '2021-12-06T10:25:56.577+00:00',
  });

  const {
    email,
    last_name,
    phone_number,
    rating,
    password,
    first_name,
    address,
    verified_at,
  } = user;

  const handleCreateUsers = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const requestBody = {
        last_name: user.last_name,
        first_name: user.first_name,
        address: user.address,
        password: user.password,
        phone_number: user.phone_number,
        rating: user.rating,
        email: user.email,
        verified_at: user.verified_at,
      };
      await authAxios(token).put(
        `/admins/users/update/${artisansData.email}`,
        requestBody
      );
      setLoading(false);
      setSuccess("Artizan Edited Successfully");
      return router.push(`/admin/users`);
    } catch (error) {
      setLoading(false);
      setError("Something went wrong, please try again");
    }
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
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
                <h4 className={classes.cardTitleWhitew}>Edit Users</h4>
                <p className={classes.cardCategoryWhitew}>
                  The choice is yours
                </p>
              </CardHeader>
              <CardBody>
                <Container sm="true">
                  <form onSubmit={handleCreateUsers} autoComplete="email">
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
                        label="First Name"
                        color="primary"
                        required
                        name="first_name"
                        value={first_name}
                        onChange={handleInputChange}
                      />
                      <TextField
                        fullWidth
                        type="text"
                        label="Last Name"
                        color="primary"
                        required
                        name="last_name"
                        value={last_name}
                        onChange={handleInputChange}
                      />
                      <TextField
                        fullWidth
                        type="Email"
                        label="Email"
                        color="primary"
                        required
                        name="email"
                        value={email}
                        onChange={handleInputChange}
                      />
                      <TextField
                        fullWidth
                        accept="image/*"
                        className={classess.input}
                        id="contained-button-file"
                        label=""
                        type="file"
                      />
                      <TextField
                        fullWidth
                        type="text"
                        label="Phone Number"
                        color="primary"
                        required
                        name="phone_number"
                        value={phone_number}
                        onChange={handleInputChange}
                      />
                      <TextField
                        fullWidth
                        type="number"
                        label="Rating"
                        color="primary"
                        required
                        name="rating"
                        value={rating}
                        onChange={handleInputChange}
                      />
                      <TextField
                        fullWidth
                        type="text"
                        label="Adress"
                        color="primary"
                        required
                        name="address"
                        value={address}
                        onChange={handleInputChange}
                      />
                      <TextField
                        fullWidth
                        type="password"
                        label="Password"
                        color="primary"
                        required
                        name="password"
                        value={password}
                        onChange={handleInputChange}
                      />
                       <TextField
                        fullWidth
                        type="text"
                        label="Verified_at:"
                        color="primary"
                        required
                        name="verified_at"
                        value={verified_at}
                        onChange={handleInputChange}
                      />

                      <div>Upload your certificate</div>

                      <label htmlFor="contained-button-file">
                        <Fab component="span" className={classess.button}>
                          <AddPhotoAlternateIcon />
                        </Fab>
                      </label>
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
