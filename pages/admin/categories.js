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

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

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

  image: {
    width: "100%",
  },

});

export const getServerSideProps = async ({ req }) => {
  let token = parseCookies(req);

  if (!token) return UNAUTHENTICATED_RESPONSE;

  const props = { token }; 

  try {
    const { data } = await authAxios(token).get(`/categories`);
    props.categories = data;
  } catch {
    throw error;
  }

  return {
    props,
  };
};

function Category({ categories, token }) {
  const useStyles = makeStyles(styles);
  const classes = useStyles();
  const classess = useStyless();
  const [message, setMessage] = useState("");
  const [search, setSearch] = useState("");
  const router = useRouter();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const dataLimit = 10;
  let pageLimit;

  const deleteCategory = async (categoryId) => {
    if (window.confirm(`Are you sure you wanna delete this Category?`)) {
      const res = await authAxios(token).delete(`/admins/categories/${categoryId}`);

      res.data;
      if (res.status === 200) {
        setSuccess(`You have successfully deleted this Category`);

        return router.push(`/admin/categories`);
      } else {
        setError("Oops! Something Went wrong.");
      }
    }
  };

  const filteredCategories = categories.filter( category => {
    if (search === "") {
      return category;
    } else if (
      category.name
        .toString()
        .toLowerCase()
        .includes(search.toString().toLowerCase()) ||
      category._id
        .toString()
        .toLowerCase()
        .includes(search.toString().toLowerCase())
    ) {
      return category;
    }
  })

  const CategoryRows = ({ index, category}) => {

    let count = 10* (currentPage - 1) + index

    return (
      <>
        <StyledTableRow
          className={classess.data}
          key={category._id}
        >
          <StyledTableCell align="right">
            {count + 1}
          </StyledTableCell>
          <StyledTableCell align="right">
            {category._id} 
          </StyledTableCell>
          <StyledTableCell align="right">
            {category.name}
          </StyledTableCell>
          <StyledTableCell align="right">
            <img
              src={category.image_url}
              className={classess.image}
            />
          </StyledTableCell>
          <StyledTableCell align="right">
            N{category.amount}
          </StyledTableCell>
          <StyledTableCell align="right">
            <Link
              href={`/admin/categories/edit/${category._id}`}
              className={classes.edit}
            >
              <Tooltip
                id="tooltip-top"
                title="Edit Category"
                placement="top"
                classes={{ tooltip: classes.tooltip }}
              >
                <IconButton
                  aria-label="Edit"
                  className={classes.tableActionButton}
                >
                  <Edit
                    className={
                      classes.tableActionButtonIcon +
                      " " +
                      classes.edit
                    }
                  />
                </IconButton>
              </Tooltip>
            </Link>
          </StyledTableCell>
          <StyledTableCell align="right">
            <div
              onClick={() => deleteCategory(category._id)}
              className={classes.delete}
            >
              {category.isDeleting ? (
                <span className={classes.editing}></span>
              ) : (
                <span>
                  <Tooltip
                    id="tooltip-top-start"
                    title="Delete Category"
                    placement="top"
                    classes={{ tooltip: classes.tooltip }}
                  >
                    <IconButton
                      aria-label="Close"
                      className={classes.tableActionButton}
                    >
                      <Close
                        className={
                          classes.tableActionButtonIcon +
                          "  " +
                          classes.close
                        }
                      />
                    </IconButton>
                  </Tooltip>
                </span>
              )}
            </div>
          </StyledTableCell>
          <Link href={`/admin/categories/${category._id}`}>
            <StyledTableCell align="right">
              <Button className={classess.buttt}>
                View...
              </Button>
            </StyledTableCell>
          </Link>
        </StyledTableRow>
       </>
    )
  }

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
    return filteredCategories.slice(startIndex, endIndex);
  };

  const getPaginationGroup = () => {
    pageLimit = Math.ceil(categories.length / dataLimit);
    let start = Math.floor((currentPage - 1) / pageLimit) * pageLimit;
    return new Array(pageLimit).fill().map((_, count) => start + count + 1);
  };
  

  return (
    <div>
      {message && <Alert severity="error">{message}</Alert>}
      {success && <Alert severity="success">{success}</Alert>}

      <Card>
        <CardHeader color="primary">
          <h4 className={classess.cardTitleWhite}>Categories</h4>
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
          <Link href="/admin/categories/add" className={classes.edit}>
            <Button className={classess.buttt}>Add Category</Button>
          </Link>

          <TableContainer component={Paper}>
            <Table className={classess.table} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell align="right">No.</StyledTableCell>
                  <StyledTableCell align="right">ID</StyledTableCell>
                  <StyledTableCell align="right">Names</StyledTableCell>
                  <StyledTableCell align="right">Avatar</StyledTableCell>
                  <StyledTableCell align="right">Amount</StyledTableCell>
                  <StyledTableCell align="right">Edit</StyledTableCell>
                  <StyledTableCell align="right">Delete</StyledTableCell>
                  <StyledTableCell align="right">View Category</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
              {getPaginatedData().map((d, count) => {
                  return <CategoryRows key={count} index={count} category={d} />;
                })}
              </TableBody>
            </Table>
          </TableContainer>
          <div className="pagination">
            {dataLimit < filteredCategories.length ? (
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

Category.layout = Admin;

export default Category;
