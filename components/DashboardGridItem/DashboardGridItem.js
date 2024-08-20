import Accessibility from "@material-ui/icons/Accessibility";
import PanToolIcon from "@material-ui/icons/PanTool";
import Icon from "@material-ui/core/Icon";
import Link from "next/link";
import styles from "assets/jss/nextjs-material-dashboard/views/dashboardStyle.js";
import { makeStyles } from "@material-ui/core/styles";

import GridItem from "../Grid/GridItem";
import { Card, CardHeader, CardIcon, CardFooter } from "../Card";
import Danger from "../Typography/Danger.js";

export default function DashboardGridItem({
  category,
  count,
  DangerChild,
  linkHref,
  linkText,
}) {
  const useStyles = makeStyles(styles);
  const classes = useStyles();

  return (
    <GridItem xs={12} sm={3} md={3}>
      <Card>
        <CardHeader color="primary" stats icon>
          <CardIcon color="dark">
            <Icon>
              {DangerChild === Accessibility ? (
                <Accessibility />
              ) : (
                <PanToolIcon />
              )}
            </Icon>
          </CardIcon>
          <p className={classes.cardCategory}>{category}</p>
          <h3 className={classes.cardTitle}>
            <div>{count}</div>
          </h3>
        </CardHeader>
        <CardFooter stats>
          <div className={classes.stats}>
            <Danger>
              <DangerChild />
            </Danger>
            <Link href={linkHref}>
              <a onClick={(e) => e.preventDefault()}>{linkText}</a>
            </Link>
          </div>
        </CardFooter>
      </Card>
    </GridItem>
  );
}
