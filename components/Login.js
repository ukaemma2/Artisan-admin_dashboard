import { makeStyles } from "@material-ui/core/styles";
import styles from "assets/jss/nextjs-material-dashboard/views/loginStyle.js";
import Card from "components/Card/Card.js";
import Container from "@material-ui/core/Container";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import { CircularProgress, Button } from "@material-ui/core";
import { useState, useContext } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import UserContext from "../utility/useContext";
import { baseUrl, adminToken } from "../utility/apihelp";
import MuiAlert from "@material-ui/lab/Alert";
import { useCookies } from "react-cookie";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const Login = () => {
  const router = useRouter();
  const useStyles = makeStyles(styles);
  const classes = useStyles();
  const email = useFormInput("");
  const password = useFormInput("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState();
  const { dispatch } = useContext(UserContext);
  const [cookie, setCookie] = useCookies([]);
  const handleSubmit = (e) => {
    e.preventDefault();

    const loginParams = {
      email: email.value,
      password: password.value,
    };

    setError(null);
    setLoading(true);

    axios
      .post(`${baseUrl}/auth/admin/login`, loginParams, {})
      .then((response) => {
        setLoading(false);
        setSuccess("Success");
        let data = {
          token: response.data.session.access_token,
          email: response.data.admin.email,
        };
        setCookie("user", JSON.stringify(data), {
          path: "/",
          maxAge: 3600, // Expires after 1hr
          sameSite: true,
        });

        dispatch({ type: "login" });
        return router.push("/admin/dashboard");
      })
      .catch((error) => {
        setLoading(false);

        if (
          error.response.status === 401 ||
          error.response.status === 400 ||
          error.response.status === 404
        )
          setError(error.response.data.message);
        else if (email.value === "" || password.value === "")
          setError("Fields are required");
        else {
          setError("Something went wrong, please try again");
        }
      });
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
                <h4 className={classes.cardTitleWhitew}>Welcome Back</h4>
                <p className={classes.cardCategoryWhitew}>
                  Great to have you back
                </p>
              </CardHeader>
              <CardBody>
                <Container sm="true">
                  <form onSubmit={handleSubmit} autoComplete="email">
                    <Grid item xs={12} sm={12} md={12}>
                      <TextField
                        fullWidth
                        label="Email"
                        type="email"
                        color="primary"
                        required
                        {...email}
                      />
                      <TextField
                        fullWidth
                        type="password"
                        {...password}
                        label="Password"
                        color="primary"
                        required
                      />
                      <Button
                        fullWidth
                        type="submit"
                        variant="contained"
                        className={classes.button}
                        disabled={loading}
                      >
                        {loading && <CircularProgress size={16} />}
                        {!loading && "Login"}
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

export default Login;
