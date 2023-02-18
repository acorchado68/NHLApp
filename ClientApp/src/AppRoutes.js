import { Home } from "./components/Home";
import { Standings } from "./components/Standings/Standings";
import { Statistics } from "./components/Statistics/Statistics";
import { Schedule } from "./components/Schedule/Schedule";
import { Players } from "./components/Players/Players"

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
  {
    path: '/players',
    element: <Players />
  },
];

export default AppRoutes;
