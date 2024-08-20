 import React, { useState } from 'react'
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
    width: "50%",
  },
});
export const getServerSideProps = async({ req }) => {
  let token = parseCookies(req);

  if (!token) return UNAUTHENTICATED_RESPONSE;

  const props = { token };

  try {
    const { data } = await authAxios(token).get(`/admin/payments`);
    props.payments = data;
  } catch {
    throw error;
  }

  return {
    props,
  };
};

const Payment = ({payments}) => {
  const useStyles = makeStyles(styles);
  const classes = useStyles();
  const classess = useStyless();
  const [search, setSearch] = useState("");
  const router = useRouter();

 
  return (
    <div>
       <Card>
        <CardHeader color="primary">
          <h4 className={classess.cardTitleWhite}>Payment History</h4>
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
          <TableContainer component={Paper}>
            <Table className={classess.table} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell align="right">No.</StyledTableCell>
                  <StyledTableCell align="right">ID</StyledTableCell>
                  <StyledTableCell align="right">Artizan Full Name</StyledTableCell>
                  <StyledTableCell align="right">Amount Paid</StyledTableCell>
                  <StyledTableCell align="right">Payment Status</StyledTableCell>
                  <StyledTableCell align="right">Transanction ID</StyledTableCell>
                  <StyledTableCell align="right">Service Request ID</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {payments &&
                  payments
                    .filter((payment) => {
                      if (search === "") {
                        return payment;
                      } else if (
                        payment?.first_name
                          .toString()
                          .toLowerCase()
                          .includes(search.toString().toLowerCase()) ||
                          payment?.last_name
                          .toString()
                          .toLowerCase()
                          .includes(search.toString().toLowerCase()) ||
                          payment?.status
                          .toString()
                          .toLowerCase()
                          .includes(search.toString().toLowerCase())
                      ) {
                        return payment;
                      }
                    })
                    .map((payment, index) => {
                      return (
                        <StyledTableRow
                          className={classess.data}
                          key={payment._id}
                        >
                          <StyledTableCell align="right">
                            {index + 1}
                          </StyledTableCell>
                          <StyledTableCell align="right">
                            {payment?._id}
                          </StyledTableCell>
                          <StyledTableCell align="right">
                            {payment?.first_name + ' ' + payment?.last_name} 
                          </StyledTableCell>
                          <StyledTableCell align="right">
                            {payment?.amount}
                          </StyledTableCell>
                          <StyledTableCell align="right">
                            {payment?.status}
                          </StyledTableCell>
                          <StyledTableCell align="right">
                            {payment?.transaction_id}
                          </StyledTableCell>
                          <StyledTableCell align="right">
                            {payment?.service_reques}
                          </StyledTableCell>
                        </StyledTableRow>
                      );
                    })}
                {!payments && (
                  <StyledTableRow>
                    <StyledTableCell
                      key={payments.sizes}
                      component="th"
                      scope="row"
                    >
                      <CircularProgress size={16} />
                    </StyledTableCell>
                  </StyledTableRow>
                )}
                {payments && !payments.length && (
                  <StyledTableCell
                    key={payments.notFound}
                    component="th"
                    scope="row"
                  >
                    <p>No Payment has been made!!</p>
                  </StyledTableCell>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </CardBody>
      </Card>
    </div>
  )
}
Payment.layout = Admin;

export default Payment



