import { makeStyles } from "@material-ui/core/styles";
import styles from "assets/jss/nextjs-material-dashboard/views/loginStyle.js";
import Card from "components/Card/Card.js";
import Container from "@material-ui/core/Container";
import CardHeader from "components/Card/CardHeader.js";
import Admin from "layouts/Admin.js";
import CardBody from "components/Card/CardBody.js";
import { useRouter } from "next/router";
import AddPhotoAlternateIcon from "@material-ui/icons/AddPhotoAlternate";
import React, { useState } from "react";
import {
  authAxios,
  parseCookies,
  UNAUTHENTICATED_RESPONSE,
} from "../../../../utility/apihelp";
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
    const { data } = await authAxios(token).get(`/admins/service_requests`);
    props.paths = data.map((user) => {
      return {
        params: {
          serviceRequestId: `${user?.user?._id}`,
        },
      };
    });
  } catch (error) {
    throw error;
  }

  return props;
};

export const getServerSideProps = async ({
  params: { serviceRequestId },
  req,
}) => {
  const token = parseCookies(req);
  const props = { token };

  if (!token) return UNAUTHENTICATED_RESPONSE;

  try {
    const { data } = await authAxios(token).get(
      `/admins/service_requests/${serviceRequestId}`
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

  const [serviceRequest, setServiceRequest] = useState({
    status: artisansData.status,
    artizanCoordinates_trailLongitude: artisansData.coordinates_tail,
    artizanCoordinates_trailLatitude: artisansData.coordinates_tail,
    userCoordinates_trailLongitude: artisansData.coordinates_tail,
    userCoordinates_trailLatitude: artisansData.coordinates_tail,
  });

  const {
    status,
    artizanCoordinates_trailLongitude,
    artizanCoordinates_trailLatitude,
    userCoordinates_trailLongitude,
    userCoordinates_trailLatitude,
  } = serviceRequest;

  const handleCreateUsers = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const requestBody = {
        status: serviceRequest.status,
        coordinates_trail: [
          [
            parseFloat(serviceRequest.artizanCoordinates_trailLongitude),
            parseFloat(serviceRequest.artizanCoordinates_trailLatitude),
          ],
          [
            parseFloat(serviceRequest.userCoordinates_trailLongitude),
            parseFloat(serviceRequest.userCoordinates_trailLatitude),
          ],
        ],
      };
      await authAxios(token).put(
        `/admins/service_requests/update/${artisansData._id}`,
        requestBody
      );
      setLoading(false);
      setSuccess("Service-request Edited Successfully");
      return router.push(`/admin/service-request`);
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
    setServiceRequest({ ...serviceRequest, [name]: value });
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
                <h4 className={classes.cardTitleWhitew}>
                  Edit Service Request
                </h4>
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
                        label="Status"
                        color="primary"
                        name="status"
                        value={status}
                        onChange={handleInputChange}
                      />
                      <TextField
                        fullWidth
                        type="text"
                        label="Artizan Coordinates Trail Longitude"
                        color="primary"
                        name="artizanCoordinates_trailLongitude"
                        value={artizanCoordinates_trailLongitude}
                        onChange={handleInputChange}
                      />
                      <TextField
                        fullWidth
                        type="text"
                        label="Artizan Coordinates Trail Latitude"
                        color="primary"
                        name="artizanCoordinates_trailLatitude"
                        value={artizanCoordinates_trailLatitude}
                        onChange={handleInputChange}
                      />
                      <TextField
                        fullWidth
                        type="text"
                        label="User Coordinates Trail Longitude"
                        color="primary"
                        name="userCoordinates_trailLongitude"
                        value={userCoordinates_trailLongitude}
                        onChange={handleInputChange}
                      />
                      <TextField
                        fullWidth
                        type="text"
                        label="User Coordinates Trail Latitude"
                        color="primary"
                        name="userCoordinates_trailLatitude"
                        value={userCoordinates_trailLatitude}
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
