import CalendarApp from "../pages/Calendar";
import HomePageApp from "../pages/HomePage";
import DashBoardApp from "../components/DashBoard";

export const Router = [
  {
    path: "/calendar",
    component: CalendarApp,
  },
  {
    path: "/homePage",
    component: HomePageApp,
  },
  {
    path: "/dashBoard",
    component: DashBoardApp,
  },
];

export default Router;
