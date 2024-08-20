import {
    grayColor,
    whiteColor,
    blackColor,
    hexToRgb,
    primaryColor,
  } from "assets/jss/nextjs-material-dashboard.js";
  
const loginStyle = {
  cardCategoryWhitew: {
    color: "rgba(255,255,255,.62)",
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "0",
    textAlign: "center",
    fontWeight: "800"
  },
  cardsbodies: {
    marginTop: "2em"
  },
  ContainerTop: {
    
  },
  cardTitleWhitew: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
    textAlign: "center",
  },
  data: {
    borderBottom: '1px solid purple',
    cursor: 'pointer'
  },
  button: {
      backgroundColor: primaryColor[0],
  color: whiteColor,
  boxShadow:
    "0 2px 2px 0 rgba(" +
    hexToRgb(grayColor[0]) +
    ", 0.14), 0 3px 1px -2px rgba(" +
    hexToRgb(grayColor[0]) +
    ", 0.2), 0 1px 5px 0 rgba(" +
    hexToRgb(grayColor[0]) +
    ", 0.12)",
  border: "none",
  borderRadius: "7px",
  position: "relative",
  padding: "12px 30px",
  margin: ".3125rem 1px",
  fontSize: "12px",
  fontWeight: "400",
  textTransform: "uppercase",
  letterSpacing: "0",
  willChange: "box-shadow, transform",
  marginTop: "15em",
  transition:
    "box-shadow 0.2s cubic-bezier(0.4, 0, 1, 1), background-color 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
  lineHeight: "1.42857143",
  textAlign: "center",
  whiteSpace: "nowrap",
  verticalAlign: "middle",
  touchAction: "manipulation",
  cursor: "pointer",
  "&:hover,&:focus": {
    color: whiteColor,
    backgroundColor: grayColor[0],
    fontWeight: "800",
    boxShadow:
      "0 14px 26px -12px rgba(" +
      hexToRgb(grayColor[0]) +
      ", 0.42), 0 4px 23px 0px rgba(" +
      hexToRgb(blackColor) +
      ", 0.12), 0 8px 10px -5px rgba(" +
      hexToRgb(grayColor[0]) +
      ", 0.2)",
    },
  },
  
    
}
export default loginStyle