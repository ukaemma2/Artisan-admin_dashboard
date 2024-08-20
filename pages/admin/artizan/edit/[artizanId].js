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
import { authAxios, parseCookies, UNAUTHENTICATED_RESPONSE } from "../../../../utility/apihelp";
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

import {
  Grid,
  TextField,
  Button,
  CircularProgress,
  Fab,
} from "@material-ui/core";

export const getInitialProps = async ({ req }) => {
  const token = parseCookies(req);
  if (!token) return UNAUTHENTICATED_RESPONSE;

  const props = { fallback: false };

  try {
    const { data } = await authAxios(token).get(`/admins/artizans`);
    props.paths = data.map((artid) => {
      return {
        params: {
          artizanId: `${artid.email}`,
        },
      };
    });
  } catch (error) {
    throw error;
  }
  return props;
};

export const getServerSideProps = async ({ params: { artizanId }, req }) => {
  const token = parseCookies(req);
  const props = { token }; 
  if (!token) return UNAUTHENTICATED_RESPONSE;

  try {
    const { data } = await authAxios(token).get(
      `admins/artizans/${artizanId}`
    );
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

  const [artizan, setAtizan] = useState({
    email: artisansData.email,
    short_description: artisansData.short_description,
    phone_number: artisansData.phone_number,
    certifications: artisansData.certifications,
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
    short_description,
    certifications,
    phone_number,
    rating,
    password,
    verified_at,
    address,
    first_name,
  } = artizan;

  const handleCreateAtizans = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const requestBody = {
        last_name: artizan.last_name,
        first_name: artizan.first_name,
        short_description: artizan.short_description,
        certifications: artizan.certifications,
        phone_number: artizan.phone_number,
        password: artizan.password,
        address: artizan.address,
        email: artizan.email,
        verified_at: artizan.verified_at,
      };
      await authAxios(token).put(
        `admins/artizans/update/${artisansData.email}`,
        requestBody
      );
      setLoading(false);
      setSuccess("Artizan Edited Successfully");
      return router.push(`/admin/artizans`);
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
    setAtizan({ ...artizan, [name]: value });
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
                <h4 className={classes.cardTitleWhitew}>Edit Artizans</h4>
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
                        type="text"
                        label="Short_description"
                        color="primary"
                        required
                        name="short_description"
                        value={short_description}
                        onChange={handleInputChange}
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
                        type="text"
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
                        label="Certifications"
                        color="primary"
                        required
                        name="certifications"
                        value={certifications}
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
                        label="verified_at:"
                        color="primary"
                        name="verified"
                        value={verified_at}
                        onChange={handleInputChange}
                      />
                      <div>Upload your certificate</div>
                      <TextField
                        fullWidth
                        accept="image/*"
                        className={classess.input}
                        id="contained-button-file"
                        label=""
                        type="file"
                      />
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
