
import Dashboard from "@material-ui/icons/Dashboard";
import Person from "@material-ui/icons/Person";

const dashboardRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: Dashboard,

    layout: "/admin",
  },
  {
    path: "/user-profile",
    name: "Users",
    icon: Person,

    layout: "/admin",
  },
  {
    path: "/artizan",
    name: "Artizan",
    icon: Person,

    layout: "/admin",
  },
 
];

export default dashboardRoutes;
