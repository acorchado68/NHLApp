import { Home } from "./components/Home";
import { Standings } from "./components/Standings/Standings";
import { Statistics } from "./components/Statistics/Statistics";
import { Players } from "./components/Players/Players"
import { default as Team } from "./components/Team/Team";

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
    path: '/players',
    element: <Players />
  },
  {
    path: '/team/:id',
    element: <Team />
  },
];

export default AppRoutes;
