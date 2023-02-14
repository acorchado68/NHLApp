import { Home } from "./components/Home";
import { Standings } from "./components/Standings/Standings";
import { Statistics } from "./components/Statistics/Statistics";
import { Schedule } from "./components/Schedule/Schedule";

const AppRoutes = [
  {
    index: true,
    path: '/',
    element: <Home />
  },
  {
    path: '/standings',
    element: <Standings />
  },
  {
    path: '/statistics',
    element: <Statistics />
  },
  {
    path: '/schedule',
    element: <Schedule />
  },
];

export default AppRoutes;
