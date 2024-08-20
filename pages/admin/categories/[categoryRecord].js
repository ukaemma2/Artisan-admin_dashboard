import React from "react";
// @material-ui/core components
import { withStyles, makeStyles } from "@material-ui/core/styles";

// layout for this page
import Admin from "layouts/Admin.js";
// core components
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import {
  authAxios,
  parseCookies,
  UNAUTHENTICATED_RESPONSE,
} from "../../../utility/apihelp";
import {
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Table,
  Fab,
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
    cursor: "pointer",
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
  button: {
    color: "purple",
    marginBottom: "2em",
  },
  image: {
    width: "30%",
  },
});

export const getInitialProps = async ({ req }) => {
  const cookie = parseCookies(req);
  const props = { cookie, fallback: false };

  if (!cookie) return UNAUTHENTICATED_RESPONSE;

  try {
    const { data } = await authAxios(token).get(`/categories`);
    data = await response.data;
    props.paths = data.map((artid) => {
      return {
        params: {
          categoryRecord: `${artid._id}`,
        },
      };
    });
  } catch (error) {
    throw error;
  }

  return props;
};

export const getServerSideProps = async ({
  params: { categoryRecord },
  req,
}) => {
  const token = parseCookies(req);
  const props = { token, fallback: false };

  if (!token) return UNAUTHENTICATED_RESPONSE;

  try {
    const res = await authAxios(token).get(`/categories/${categoryRecord}`);
    props.category = await res.data;
  } catch (error) {
    throw error;
  }

  return {
    props,
  };
};

function CategoryRecord({ category }) {
  const classess = useStyless();
  return (
    <div>
      <Card>
        <CardHeader color="primary">
          <h4 className={classess.cardTitleWhite}>Category Details</h4>
        </CardHeader>
        <CardBody>
          <TableContainer component={Paper}>
            <Table className={classess.table} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell align="right">Role</StyledTableCell>
                  <StyledTableCell align="right">Avata</StyledTableCell>
                  <StyledTableCell align="right">ID</StyledTableCell>
                  <StyledTableCell align="right">Amount</StyledTableCell>

                </TableRow>
              </TableHead>
              <TableBody>
                <StyledTableRow className={classess.data} key={category._id}>
                  <StyledTableCell align="right">
                    {category.name}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    <img src={category.image_url} className={classess.image} />
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {category._id}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {category.amount}
                  </StyledTableCell>
                </StyledTableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </CardBody>
      </Card>
    </div>
  );
}

CategoryRecord.layout = Admin;

export default CategoryRecord;
