// routes for dashboard sidebars
// @material-ui/icons
import Dashboard from "@material-ui/icons/Dashboard";
import Person from "@material-ui/icons/Person";
import People from "@material-ui/icons/People";
import Notifications from "@material-ui/icons/Notifications";
import PanToolIcon from '@material-ui/icons/PanTool';
import PaymentIcon from '@material-ui/icons/Payment';



const dashboardRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: Dashboard,
    layout: "/admin",
  },
  {
    path: "/users",
    name: "Users",
    icon: People,
    layout: "/admin",
  },
  {
    path: "/artizans",
    name: "Artizans",
    icon: Person,
    layout: "/admin",
  },
  {
    path: "/service-request",
    name: "Service Request",
    icon: Person,

    layout: "/admin",
  },
  {
    path: "/categories",
    name: "Categories",
    icon: PanToolIcon,

    layout: "/admin",
  },
  {
    path: "/payment",
    name: "Payment History",
    icon: PaymentIcon,

    layout: "/admin",
  },
  {
    path: "/notifications",
    name: "Notifications",
    icon: Notifications,

    layout: "/admin",
  },
 
 
];

export default dashboardRoutes;
