import React, { useEffect, useState } from "react";
// @material-ui/core components
import { withStyles, makeStyles } from "@material-ui/core/styles";

// layout for this page
import Admin from "layouts/Admin.js";
// core components
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import { useRouter } from "next/router";
import Link from "next/link";
import styles from "assets/jss/nextjs-material-dashboard/components/tasksStyle.js";
import MuiAlert from "@material-ui/lab/Alert";
import {
  authAxios,
  parseCookies,
  UNAUTHENTICATED_RESPONSE,
} from "../../utility/apihelp";

import Edit from "@material-ui/icons/Edit";
import Close from "@material-ui/icons/Close";
import {
  TextField,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Tooltip,
  IconButton,
  Table,
  CircularProgress,
  Button,
} from "@material-ui/core";

import "../../assets/css/styles.css";
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export const getServerSideProps = async ({ req }) => {
  const token = parseCookies(req);
  const props = { token };
  if (!token) return UNAUTHENTICATED_RESPONSE;

  try {
    const { data } = await authAxios(token).get(`/admins/users`);
    props.users = data;
  } catch (error) {
    throw error;
  }
  return {
    props,
  };
};

function Users({ users, token }) {
  const router = useRouter();
  const useStyles = makeStyles(styles);
  const classes = useStyles();
  const classess = useStyless();
  const [message, setMessage] = useState("");
  const [search, setSearch] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const dataLimit = 10;
  let pageLimit;

  const deleteArtizan = async (userId) => {

    if (window.confirm(`Are you sure you wanna delete this User?`)) {
      try {
        const { data } = await authAxios(token).delete(
          `/admins/users/${userId}`
        );
        if (data.status === 200)
          setSuccess(`You have successfully deleted this User`);
      } catch (error) {
        throw error;
      }
      return setTimeout(() => router.push(`/admin/users`));
    } else {
      setError("Oops! Something Went wrong.");
    }
  };

  const filteredUsers = users.filter((user) => {
    if (search === "") {
      return user;
    } else if (
      user.email
        .toString()
        .toLowerCase()
        .includes(search.toString().toLowerCase())||
      user.email
        .toString()
        .toLowerCase()
        .includes(search.toString().toLowerCase())
    ) {
      return user;
    }
  });

  const UserRows = ({ index, user }) => {
    let idx = 10 * (currentPage - 1) + index;
    return (
      <>
        <StyledTableRow className={classess.data} key={user._id}>
          <StyledTableCell align="right">{idx + 1}</StyledTableCell>
          <StyledTableCell align="right">
            {user.first_name + "  " + user.last_name}
          </StyledTableCell>
          <StyledTableCell align="right">{user.email}</StyledTableCell>
          <StyledTableCell align="right">{user.phone_number}</StyledTableCell>
          <StyledTableCell align="right">{user.address}</StyledTableCell>
          <StyledTableCell align="right">
            <Link
              href={`/admin/user/edit/${user._id}`}
              className={classes.edit}
            >
              <Tooltip
                id="tooltip-top"
                title="Edit Users"
                placement="top"
                classes={{ tooltip: classes.tooltip }}
              >
                <IconButton
                  aria-label="Edit"
                  className={classes.tableActionButton}
                >
                  <Edit
                    className={
                      classes.tableActionButtonIcon + " " + classes.edit
                    }
                  />
                </IconButton>
              </Tooltip>
            </Link>
          </StyledTableCell>
          <StyledTableCell align="right">
            <div
              onClick={() => deleteArtizan(user.email)}
              className={classes.delete}
            >
              {user.isDeleting ? (
                <span className={classes.editing}></span>
              ) : (
                <span>
                  <Tooltip
                    id="tooltip-top-start"
                    title="Delete User"
                    placement="top"
                    classes={{ tooltip: classes.tooltip }}
                  >
                    <IconButton
                      aria-label="Close"
                      className={classes.tableActionButton}
                    >
                      <Close
                        className={
                          classes.tableActionButtonIcon + "  " + classes.close
                        }
                      />
                    </IconButton>
                  </Tooltip>
                </span>
              )}
            </div>
          </StyledTableCell>
          <Link href={`/admin/user/${user._id}`}>
            <StyledTableCell align="right">
              <Button className={classess.buttt}>View...</Button>
            </StyledTableCell>
          </Link>
        </StyledTableRow>
        {!users && (
          <StyledTableRow>
            <StyledTableCell key={user.sizes} component="th" scope="row">
              <CircularProgress size={16} />
            </StyledTableCell>
          </StyledTableRow>
        )}
        {users && !users.length && (
          <StyledTableCell key={user.notFound} component="th" scope="row">
            <p>No User Record</p>
          </StyledTableCell>
        )}
      </>
    );
  };

  function goToNextPage() {
    setCurrentPage((page) => page + 1);
  }

  function goToPreviousPage() {
    setCurrentPage((page) => page - 1);
  }

  function changePage(event) {
    const pageNumber = Number(event.target.textContent);
    setCurrentPage(pageNumber);
  }

  const getPaginatedData = () => {
    const startIndex = currentPage * dataLimit - dataLimit;
    const endIndex = startIndex + dataLimit;
    return filteredUsers.slice(startIndex, endIndex);
  };

  const getPaginationGroup = () => {
    pageLimit = Math.ceil(users.length / dataLimit);
    let start = Math.floor((currentPage - 1) / pageLimit) * pageLimit;
    return new Array(pageLimit).fill().map((_, idx) => start + idx + 1);
  };

  return (
    <div>
      {message && <Alert severity="error">{message}</Alert>}
      {success && <Alert severity="success">{success}</Alert>}

      <Card>
        <CardHeader color="primary">
          <h4 className={classess.cardTitleWhite}>Users</h4>
        </CardHeader>
        <CardBody>
          <div className={classess.searchWrapper}>
            <TextField
              type="Search"
              placeholder="Search"
              onChange={(e) => {
                setSearch(e.target.value);
              }}
            />
          </div>
          <Link href="/admin/user/add" className={classes.edit}>
            <Button className={classess.buttt}>Add Users</Button>
          </Link>
          <TableContainer component={Paper}>
            <Table className={classess.table} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell align="right">No.</StyledTableCell>
                  <StyledTableCell align="right">Full Name</StyledTableCell>
                  <StyledTableCell align="right">Email Address</StyledTableCell>
                  <StyledTableCell align="right">Phone Number</StyledTableCell>
                  <StyledTableCell align="right">Address</StyledTableCell>
                  <StyledTableCell align="right">Edit</StyledTableCell>
                  <StyledTableCell align="right">Delete</StyledTableCell>
                  <StyledTableCell align="right">View User</StyledTableCell>
                </TableRow>
              </TableHead>
              
              <TableBody>
                {getPaginatedData().map((d, idx) => {
                  return <UserRows key={idx} index={idx} user={d} />;
                })}
              </TableBody>
            </Table>
          </TableContainer>

          <div className="pagination">
            {dataLimit < filteredUsers.length ? (
              <>
                <button
                  onClick={goToPreviousPage}
                  disabled={currentPage === 1}
                  className={`prev ${currentPage === 1 ? "disabled" : ""}`}
                >
                  prev
                </button>

                {/* show page numbers */}
                {getPaginationGroup().map((item, index) => (
                  <button
                    key={index}
                    onClick={changePage}
                    className={`paginationItem ${
                      currentPage === item ? "active" : null
                    }`}
                  >
                    <span>{item}</span>
                  </button>
                ))}

                {/* next button */}
                <button
                  onClick={goToNextPage}
                  disabled={currentPage === pageLimit}
                  className={`next ${
                    currentPage === pageLimit ? "disabled" : ""
                  }`}
                >
                  next
                </button>
              </>
            ) : (
              <></>
            )}
          </div>
        </CardBody>
      </Card>
      {error && <Alert severity="error">{error}</Alert>}
    </div>
  );
}

Users.layout = Admin;

export default Users;

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
    borderBottom: theme.palette.common.black,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const useStyless = makeStyles({
  table: {
    minWidth: 700,
    borderBottom: "1px solid purple",
  },
  cardCategoryWhite: {
    color: "rgba(255,255,255,.62)",
    margin: "0",
    fontSize: "14px",
    marginBottom: "0",
    marginTop: "0",
  },
  data: {
    borderBottom: "1px solid purple",
  },
  buttt: {
    backgroundColor: "purple",
    marginBottom: "1em",
    color: "white",
    fontWeight: "600",
    "&:hover,&:focus": {
      color: "purple",
      backgroundColor: "gray",
      fontWeight: "800",
    },
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
});
