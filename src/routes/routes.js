import CalendarApp from "../pages/Calendar";
import HomePageApp from "../pages/HomePage";
import DashBoardApp from "../components/DashBoard";
import ForgotPasswordApp from "../components/Forgot-password";

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
  {
    path: "/forgotPassword",
    component: ForgotPasswordApp,
  },
];

export default Router;
