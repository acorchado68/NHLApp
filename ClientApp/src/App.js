import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Home } from './components/Home';
import { Layout } from './components/Layout';
import { Players } from './components/Players/Players';
import { Standings } from './components/Standings/Standings';
import { Statistics } from './components/Statistics/Statistics';
import Team from './components/Team/Team';
import './custom.css';

export default function App() {
    
    return (
      <Layout>
        <Routes>
          <Route exact path='/' index element={<Home />} />
          <Route exact path='/standings' element={<Standings />} />
          <Route exact path='/statistics' element={<Statistics />} />
          <Route exact path='/players' element={<Players />} />
          <Route exact path='/players/:id' element={<Players />} />
          <Route exact path='/team/:id' element={<Team />} />
        </Routes>
      </Layout>
    );
}
