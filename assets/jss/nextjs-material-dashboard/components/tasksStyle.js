import {
  defaultFont,
  primaryColor,
  dangerColor,
  grayColor,
  hexToRgb,
  whiteColor,
  blackColor,
} from "assets/jss/nextjs-material-dashboard.js";
import tooltipStyle from "assets/jss/nextjs-material-dashboard/tooltipStyle.js";
import checkboxAdnRadioStyle from "assets/jss/nextjs-material-dashboard/checkboxAdnRadioStyle.js";
const tasksStyle = {
  ...tooltipStyle,
  ...checkboxAdnRadioStyle,
  table: {
    marginBottom: "0",
    overflow: "visible",
  },
  tableRow: {
    position: "relative",
    borderBottom: "1px solid " + grayColor[5],
  },
  data: {
    borderBottom: '1px solid purple',
    cursor: 'pointer'
  },
  tableActions: {
    display: "flex",
    border: "none",
    padding: "12px 8px !important",
    verticalAlign: "middle",
  },
  tableCell: {
    ...defaultFont,
    padding: "8px",
    verticalAlign: "middle",
    border: "none",
    lineHeight: "1.42857143",
    fontSize: "14px",
  },
  tableCellRTL: {
    textAlign: "right",
  },
  tableActionButton: {
    width: "27px",
    height: "27px",
    padding: "0",
  },
  data: {
    cursor: 'pointer',
    boxShadow:
      "0 12px 20px -10px rgba(" +
      hexToRgb(whiteColor) +
      ", 0.28), 0 4px 20px 0px rgba(" +
      hexToRgb(blackColor) +
      ", 0.12), 0 7px 8px -5px rgba(" +
      hexToRgb(whiteColor) +
      ", 0.2)",
  },
  tableActionButtonIcon: {
    width: "17px",
    height: "17px",
  },
  edit: {
    backgroundColor: "transparent",
    color: primaryColor[0],
    boxShadow: "none",
  },
  close: {
    backgroundColor: "transparent",
    color: dangerColor[0],
    boxShadow: "none",
  },
};
export default tasksStyle;
