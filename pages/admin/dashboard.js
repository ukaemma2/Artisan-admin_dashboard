import React, { useEffect, useState } from "react";
// @material-ui/core
// @material-ui/icons
import Accessibility from "@material-ui/icons/Accessibility";
import PanToolIcon from "@material-ui/icons/PanTool";
import BugReport from "@material-ui/icons/BugReport";
import Info from "@material-ui/icons/Info";
import Check from "@material-ui/icons/Check";
// layout for this page
import Admin from "layouts/Admin.js";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Tasks from "components/Tasks/Tasks.js";
import CustomTabs from "components/CustomTabs/CustomTabs.js";
import DashboardGridItem from "components/DashboardGridItem/DashboardGridItem.js";
import { bugs, pending, resolved } from "variables/general.js";
import {
  authAxios,
  UNAUTHENTICATED_RESPONSE,
  parseCookies,
} from "../../utility/apihelp";
import MuiAlert from "@material-ui/lab/Alert";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export const getServerSideProps = async ({ req }) => {

  const token = parseCookies(req);
  const props = { token };
  if(!token) return UNAUTHENTICATED_RESPONSE;
 

  try {
    {
      // users
      const { data } = await authAxios(token).get(`/admins/users`);
      props.users = data;
    }

    {
      // artizans
      const { data } = await authAxios(token).get(`/admins/artizans`);
      props.artizans = data;
    }

    {
      // service requests

      const { data } = await authAxios(token).get(`/admins/service_requests`);
      props.serviceRequests = data;
    }

    {
      // categories
      const { data } = await authAxios(token).get(`/categories`);
      props.categoryBodies = data;
    }
  } catch (error) {
    throw error;
  }

  return {
    props,
  };
};
function Dashboard({
  users,
  artizans,
  serviceRequests,
  categoryBodies,
  token,
  
}) {

  const cardData = [
    {
      category: "Total Users",
      count: users.length,
      DangerChild: Accessibility,
      linkHref: "/admin/user-profile",
      linkText: "USERS",
    },
    {
      category: "Total Artizans",
      count: artizans.length,
      DangerChild: Accessibility,
      linkHref: "/artizans-profile",
      linkText: "ARTIZANS",
    },
    {
      category: "Total Categories",
      count: categoryBodies.length,
      DangerChild: PanToolIcon,
      linkHref: "/artizans-profile" /* Is this right? */,
      linkText: "CATEGORIES",
    },
    {
      category: "Total Requests",
      count: serviceRequests.length,
      DangerChild: Accessibility,
      linkHref: "/artizans-profile" /* Is this right? */,
      linkText: "SERVICE REQUESTS",
    },
  ];

  return (
    <div>
      <GridContainer>
        {cardData.map((datum, idx) => (
          <DashboardGridItem key={idx} {...datum} />
        ))}

        <GridContainer>
          <GridItem xs={12} sm={12} md={6}>
            <CustomTabs
              title="Users:"
              headerColor="dark"
              tabs={[
                {
                  tabName: "A/D",
                  tabIcon: BugReport,
                  tabContent: (
                    <Tasks
                      checkedIndexes={[0, 3]}
                      tasksIndexes={[0, 1, 2, 3]}
                      tasks={bugs}
                    />
                  ),
                },
                {
                  tabName: "Activated",
                  tabIcon: Info,
                  tabContent: (
                    <Tasks
                      checkedIndexes={[0]}
                      tasksIndexes={[0, 1]}
                      tasks={pending}
                    />
                  ),
                },
                {
                  tabName: "Deactivated",
                  tabIcon: Check,
                  tabContent: (
                    <Tasks
                      checkedIndexes={[1]}
                      tasksIndexes={[0, 1, 2]}
                      tasks={resolved}
                    />
                  ), 
                },
              ]}
            />
          </GridItem>
          <GridItem xs={12} sm={12} md={6}>
            <CustomTabs
              title="Artizans:"
              headerColor="dark"
              tabs={[
                {
                  tabName: "A/D",
                  tabIcon: BugReport,
                  tabContent: (
                    <Tasks
                      checkedIndexes={[0, 3]}
                      tasksIndexes={[0, 1, 2, 3]}
                      tasks={bugs}
                    />
                  ),
                },
                {
                  tabName: "Activated",
                  tabIcon: Info,
                  tabContent: (
                    <Tasks
                      checkedIndexes={[0]}
                      tasksIndexes={[0, 1]}
                      tasks={pending}
                    />
                  ),
                },
                {
                  tabName: "Deactivated",
                  tabIcon: Check,
                  tabContent: (
                    <Tasks
                      checkedIndexes={[1]}
                      tasksIndexes={[0, 1, 2]}
                      tasks={resolved}
                    />
                  ),
                },
              ]}
            />
          </GridItem>
        </GridContainer>
      </GridContainer>
    </div>
  );
}

Dashboard.layout = Admin;

export default Dashboard;
